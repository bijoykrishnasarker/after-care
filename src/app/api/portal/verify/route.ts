import { NextResponse } from "next/server";
import { grantAccess, hasAccess } from "@/lib/access-store";
import { isPortalDemoAccessEnabled } from "@/lib/demo-access";
import { createSession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    let allowed = await hasAccess(email);

    if (!allowed && isPortalDemoAccessEnabled()) {
      await grantAccess({
        email,
        paymentIntentId: `demo-${email.toLowerCase()}`,
      });
      allowed = true;
    }

    if (!allowed) {
      return NextResponse.json(
        { error: "No active access found for this email." },
        { status: 403 },
      );
    }

    await createSession(email);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Portal verify error:", error);
    return NextResponse.json({ error: "Unable to verify access." }, { status: 500 });
  }
}
