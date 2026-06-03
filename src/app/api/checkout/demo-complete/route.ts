import { NextResponse } from "next/server";
import { grantAccess } from "@/lib/access-store";
import { isPortalDemoAccessEnabled } from "@/lib/demo-access";
import {
  getPaymentMethod,
  PAYMENT_METHODS,
  type PaymentMethodId,
} from "@/lib/payment-methods";
import { createSession } from "@/lib/session";

function isPaymentMethodId(value: string): value is PaymentMethodId {
  return PAYMENT_METHODS.some((method) => method.id === value);
}

export async function POST(request: Request) {
  if (!isPortalDemoAccessEnabled()) {
    return NextResponse.json(
      {
        error:
          "Live checkout requires Stripe. Add STRIPE keys to .env.local and restart the dev server.",
      },
      { status: 403 },
    );
  }

  try {
    const body = (await request.json()) as {
      email?: string;
      paymentMethod?: string;
    };
    const email = body.email?.trim();
    const paymentMethod = body.paymentMethod?.trim() ?? "visa";

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    if (!isPaymentMethodId(paymentMethod)) {
      return NextResponse.json({ error: "Invalid payment method." }, { status: 400 });
    }

    const method = getPaymentMethod(paymentMethod);

    await grantAccess({
      email,
      paymentIntentId: `demo-${method.id}-${email.toLowerCase()}`,
    });

    await createSession(email);

    return NextResponse.json({ ok: true, paymentMethod: method.id });
  } catch (error) {
    console.error("Demo checkout error:", error);
    return NextResponse.json(
      { error: "Unable to complete demo checkout." },
      { status: 500 },
    );
  }
}
