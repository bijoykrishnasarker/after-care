import { handleStripeWebhook } from "@/lib/stripe-webhook";

export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    ok: true,
    endpoint: "/api/webhook/stripe",
    events: ["payment_intent.succeeded"],
  });
}

export async function POST(request: Request) {
  return handleStripeWebhook(request);
}
