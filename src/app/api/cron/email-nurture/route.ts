import { NextResponse } from "next/server";
import { sendNurtureEmail } from "@/lib/email";
import { getLeadsForNurture, markLeadEmailSent } from "@/lib/leads-store";

const NURTURE_SCHEDULE_DAYS = [2, 5] as const;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const leads = await getLeadsForNurture(3);
  let sent = 0;

  for (const lead of leads) {
    const subscribedAt = new Date(lead.subscribedAt);
    const daysSince = Math.floor(
      (Date.now() - subscribedAt.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (lead.nurtureStep === 1 && daysSince >= NURTURE_SCHEDULE_DAYS[0]) {
      await sendNurtureEmail({ email: lead.email, step: 1 });
      await markLeadEmailSent(lead.email, 2);
      sent += 1;
      continue;
    }

    if (lead.nurtureStep === 2 && daysSince >= NURTURE_SCHEDULE_DAYS[1]) {
      await sendNurtureEmail({ email: lead.email, step: 2 });
      await markLeadEmailSent(lead.email, 3);
      sent += 1;
    }
  }

  return NextResponse.json({ ok: true, processed: leads.length, sent });
}
