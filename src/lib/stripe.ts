import Stripe from "stripe";

export function getStripeServer() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  return new Stripe(secretKey, {
    apiVersion: "2026-04-22.dahlia",
  });
}

export function isStripeConfigured() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  return Boolean(
    secretKey?.startsWith("sk_") &&
      !secretKey.includes("PASTE") &&
      publishableKey?.startsWith("pk_"),
  );
}
