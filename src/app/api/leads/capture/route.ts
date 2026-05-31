import { NextResponse } from "next/server";
import { sendLeadWelcomeEmail } from "@/lib/email";
import { captureLead, markLeadEmailSent } from "@/lib/leads-store";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; source?: string };
    const email = body.email?.trim();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const lead = await captureLead({
      email,
      source: body.source ?? "lead-magnet",
    });

    if (lead.isNew) {
      await sendLeadWelcomeEmail(lead.email);
      await markLeadEmailSent(lead.email, 1);
    }

    return NextResponse.json({ ok: true, isNew: lead.isNew });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json({ error: "Unable to capture lead." }, { status: 500 });
  }
}
