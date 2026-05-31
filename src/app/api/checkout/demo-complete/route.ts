import { NextResponse } from "next/server";
import { grantAccess } from "@/lib/access-store";
import { isPortalDemoAccessEnabled } from "@/lib/demo-access";
import { createSession } from "@/lib/session";

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
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    await grantAccess({
      email,
      paymentIntentId: `demo-checkout-${email.toLowerCase()}`,
    });

    await createSession(email);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Demo checkout error:", error);
    return NextResponse.json(
      { error: "Unable to complete demo checkout." },
      { status: 500 },
    );
  }
}
