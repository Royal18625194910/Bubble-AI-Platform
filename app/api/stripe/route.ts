import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const settingsUrl = absoluteUrl("/settings");

export const GET = async () => {
  try {
    // 1、获取userId或user，确保登录, 未登录抛出未验证异常
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user)
      return new NextResponse("Unauthenticated", { status: 401 });

    // 2、根据用户id查找用户订阅数据库内容
    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    // 3、 如果用户订阅存在且具有 Stripe 客户 ID，则创建 Stripe 客户门户会话
    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });
      return NextResponse.json({ url: stripeSession.url });
    }

    // 如果用户没有有效订阅，则创建一个新的 Stripe 支付会话
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      metadata: {
        userId,
      },
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Bubble AI",
              description: "AI Sass平台 Bubble出品",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return NextResponse.json({ message: "[STRIPE_ERROR]", status: 500 });
  }
};
