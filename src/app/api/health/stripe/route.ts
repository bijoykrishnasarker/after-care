import { NextResponse } from "next/server";
import { isStripeConfigured } from "@/lib/stripe";

export async function GET() {
  const hasSecret = Boolean(process.env.STRIPE_SECRET_KEY?.startsWith("sk_"));
  const hasPublishable = Boolean(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_"),
  );
  const hasWebhook = Boolean(process.env.STRIPE_WEBHOOK_SECRET?.startsWith("whsec_"));
  const isLive =
    process.env.STRIPE_SECRET_KEY?.startsWith("sk_live_") &&
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_live_");

  const ready = isStripeConfigured() && hasWebhook;

  return NextResponse.json(
    {
      ok: ready,
      mode: isLive ? "live" : hasSecret || hasPublishable ? "test" : "missing",
      checks: {
        secretKey: hasSecret,
        publishableKey: hasPublishable,
        webhookSecret: hasWebhook,
      },
      missing: [
        !hasSecret && "STRIPE_SECRET_KEY",
        !hasPublishable && "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
        !hasWebhook && "STRIPE_WEBHOOK_SECRET",
      ].filter(Boolean),
      note: ready
        ? "Stripe checkout and post-payment portal access are configured."
        : "Add missing env vars, create a Stripe webhook for payment_intent.succeeded, then redeploy.",
    },
    { status: ready ? 200 : 503 },
  );
}
