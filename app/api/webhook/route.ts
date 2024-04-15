import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export const POST = async (request: NextRequest) => {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") as string;
  console.log("body", body, signature);

  let event;

  try {
    // 9. 使用 Stripe 模块的 constructEvent 方法来验证 webhook 事件的签名，并解析事件对象
    console.log(process.env.STRIPE_WEBHOOK_SECRET!);

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // 10. 从事件对象中获取 Stripe 支付会话
  const session = event.data.object as Stripe.Checkout.Session;
  // 12. 获取与该会话相关的订阅信息
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  );

  //   在userSubscription表中增加数据
  const createSubscription = async () => {
    await prismadb.userSubscription.create({
      data: {
        userId: session.metadata?.userId + "",
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer + "",
        stripePriceId: subscription.items.data[0].price + "",
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  };

  //   在表中修改数据
  const updateSubscription = async () => {
    await prismadb.userSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  };

  switch (event.type) {
    case "checkout.session.completed":
      // 11. 如果事件类型是 "checkout.session.completed"，则处理该事件

      // 13. 如果会话中缺少用户 id，则返回 400 错误响应
      if (!session.metadata?.userId)
        return new NextResponse("User id is required", { status: 400 });
      // 14. 在数据库中创建用户订阅信息
      await createSubscription();
      break;
    case "invoice.payment_succeeded":
      // 15. 如果事件类型是 "invoice.payment_succeeded"，则处理该事件
      // 16. 更新数据库中的用户订阅信息
      await updateSubscription();
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // 返回 200 成功响应
  return new NextResponse(null, { status: 200 });
};
