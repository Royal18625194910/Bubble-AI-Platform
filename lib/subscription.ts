import {auth, useAuth} from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const checkSubscription = async () => {
  const { userId } = await auth();

  if (!userId) return false;

  // 从订阅表中取出订阅信息
  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripePriceId: true,
      stripeCustomerId: true,
      stripeCurrentPeriodEnd: true,
    },
  });

  console.log("userSubscription", userSubscription);

  //  若无订阅信息，说明用户未订阅，返回false
  if (!userSubscription) return false;

  const isValid =
    (await userSubscription.stripeSubscriptionId) &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
};
