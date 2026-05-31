import { NextResponse } from "next/server";
import { CHECKOUT } from "@/lib/checkout";
import { getStripeServer, isStripeConfigured } from "@/lib/stripe";

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Stripe is not configured. Add your API keys to .env.local." },
      { status: 503 },
    );
  }

  let email: string | undefined;
  try {
    const body = (await request.json()) as { email?: string };
    email = body.email?.trim();
  } catch {
    email = undefined;
  }

  try {
    const stripe = getStripeServer();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: CHECKOUT.amount,
      currency: CHECKOUT.currency,
      automatic_payment_methods: { enabled: true },
      receipt_email: email,
      metadata: {
        product: CHECKOUT.productName,
        ...(email ? { email } : {}),
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe payment intent error:", error);
    return NextResponse.json(
      { error: "Unable to start checkout. Please try again." },
      { status: 500 },
    );
  }
}
