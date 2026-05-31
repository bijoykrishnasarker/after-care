import { Resend } from "resend";
import { CHECKOUT } from "@/lib/checkout";

function getAppUrl() {
  return process.env.APP_URL ?? "http://localhost:3000";
}

function getLeadMagnetUrl() {
  return `${getAppUrl()}/downloads/aftercare-guide.pdf`;
}

type SendResult = { delivered: boolean; mode: "console" | "resend" };

async function deliverEmail(input: {
  to: string;
  subject: string;
  html: string;
  logTag: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "Aftercare <onboarding@resend.dev>";

  if (!apiKey) {
    console.info(`[aftercare-email:${input.logTag}]`, {
      to: input.to,
      subject: input.subject,
    });
    return { delivered: false, mode: "console" };
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to: input.to,
    subject: input.subject,
    html: input.html,
  });

  return { delivered: true, mode: "resend" };
}

export async function sendAccessEmail(input: {
  email: string;
  accessToken: string;
}) {
  const portalLink = `${getAppUrl()}/api/portal/access?token=${input.accessToken}`;
  const checkoutLink = `${getAppUrl()}/checkout`;

  return deliverEmail({
    to: input.email,
    subject: "Your Aftercare access is ready",
    logTag: "access",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <p>Welcome to Aftercare.</p>
        <p>Your payment for <strong>${CHECKOUT.productName}</strong> was successful.</p>
        <p>Click below to enter your private member portal:</p>
        <p><a href="${portalLink}" style="display:inline-block;padding:12px 18px;background:#111;color:#fff;text-decoration:none;">Enter Aftercare Portal</a></p>
        <p>If the button does not work, copy this link:</p>
        <p>${portalLink}</p>
        <p style="color:#666;">Some endings deserve ceremony.</p>
      </div>
    `,
  });
}

export async function sendLeadWelcomeEmail(email: string) {
  const guideUrl = getLeadMagnetUrl();
  const checkoutUrl = `${getAppUrl()}/checkout`;

  return deliverEmail({
    to: email,
    subject: "Your Aftercare guide is ready",
    logTag: "lead-welcome",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <p>You requested the Aftercare guide.</p>
        <p><a href="${guideUrl}" style="display:inline-block;padding:12px 18px;background:#111;color:#fff;text-decoration:none;">Download your free guide</a></p>
        <p>When you are ready for the full seven-room experience:</p>
        <p><a href="${checkoutUrl}">Enter Aftercare — ${CHECKOUT.productName}</a></p>
        <p style="color:#666;">Some endings deserve ceremony.</p>
      </div>
    `,
  });
}

export async function sendNurtureEmail(input: {
  email: string;
  step: 1 | 2;
}) {
  const checkoutUrl = `${getAppUrl()}/checkout`;

  const content =
    input.step === 1
      ? {
          subject: "You do not have to carry this alone",
          body: `<p>Healing is not linear. The guide was only the threshold.</p>
                 <p>The full Aftercare experience walks you through seven private rooms — at your pace, on your terms.</p>`,
        }
      : {
          subject: "The rooms are waiting when you are",
          body: `<p>Many people return to Aftercare not because they are broken, but because they are finally ready.</p>
                 <p>Lifetime access means the rooms remain whenever you need them.</p>`,
        };

  return deliverEmail({
    to: input.email,
    subject: content.subject,
    logTag: `nurture-${input.step}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        ${content.body}
        <p><a href="${checkoutUrl}" style="display:inline-block;padding:12px 18px;background:#111;color:#fff;text-decoration:none;">Get full access</a></p>
        <p style="color:#666;">Aftercare Global</p>
      </div>
    `,
  });
}
