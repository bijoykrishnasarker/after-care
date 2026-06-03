import { NextResponse } from "next/server";
import { CHECKOUT } from "@/lib/checkout";
import { getStripeServer, isStripeConfigured } from "@/lib/stripe";

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 503 });
  }

  try {
    const body = (await request.json()) as {
      paymentIntentId?: string;
      email?: string;
      paymentMethod?: string;
    };

    const paymentIntentId = body.paymentIntentId?.trim();
    const email = body.email?.trim();
    const paymentMethod = body.paymentMethod?.trim();

    if (!paymentIntentId || !email) {
      return NextResponse.json(
        { error: "Payment intent ID and email are required." },
        { status: 400 },
      );
    }

    const stripe = getStripeServer();
    await stripe.paymentIntents.update(paymentIntentId, {
      receipt_email: email,
      metadata: {
        product: CHECKOUT.productName,
        email,
        ...(paymentMethod ? { paymentMethod } : {}),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Update payment intent error:", error);
    return NextResponse.json({ error: "Unable to update payment." }, { status: 500 });
  }
}
