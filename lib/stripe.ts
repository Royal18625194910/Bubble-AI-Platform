import Stripe from "stripe";
console.log("process.env.STRIPE_SECRET_KEY", process.env.STRIPE_SECRET_KEY);

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
  typescript: true,
});
