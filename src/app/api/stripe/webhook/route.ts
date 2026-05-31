import { NextResponse } from "next/server";
import Stripe from "stripe";
import { grantAccess } from "@/lib/access-store";
import { sendAccessEmail } from "@/lib/email";
import { getStripeServer } from "@/lib/stripe";

export const runtime = "nodejs";

function getCustomerEmail(paymentIntent: Stripe.PaymentIntent) {
  if (paymentIntent.receipt_email) {
    return paymentIntent.receipt_email;
  }

  const chargeEmail = paymentIntent.latest_charge;
  if (typeof chargeEmail === "object" && chargeEmail && "billing_details" in chargeEmail) {
    const email = chargeEmail.billing_details?.email;
    if (email) return email;
  }

  return paymentIntent.metadata.email ?? null;
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured." },
      { status: 503 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const payload = await request.text();

  let event: Stripe.Event;

  try {
    const stripe = getStripeServer();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook verification failed:", error);
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const stripe = getStripeServer();
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    let email = getCustomerEmail(paymentIntent);

    if (!email && paymentIntent.latest_charge) {
      const chargeId =
        typeof paymentIntent.latest_charge === "string"
          ? paymentIntent.latest_charge
          : paymentIntent.latest_charge.id;
      const charge = await stripe.charges.retrieve(chargeId);
      email =
        charge.billing_details.email ?? charge.receipt_email ?? email ?? null;
    }

    if (!email) {
      console.error("Payment succeeded without customer email:", paymentIntent.id);
      return NextResponse.json({ received: true, warning: "missing_email" });
    }

    const grant = await grantAccess({
      email,
      paymentIntentId: paymentIntent.id,
    });

    await sendAccessEmail({
      email: grant.email,
      accessToken: grant.accessToken,
    });
  }

  return NextResponse.json({ received: true });
}
