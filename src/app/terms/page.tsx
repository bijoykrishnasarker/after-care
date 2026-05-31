import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service · Aftercare",
  description: "Terms for using Aftercare and the member portal.",
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" updated="May 22, 2026">
      <p>
        By purchasing or accessing Aftercare, you agree to these Terms of Service. Please
        read them carefully before completing checkout or entering the member portal.
      </p>

      <section>
        <h2>Your purchase</h2>
        <p>
          Aftercare: When It&apos;s Over is a one-time digital purchase that grants
          lifetime access to the private member portal and seven-room audio experience.
          All prices are listed in USD unless otherwise stated at checkout.
        </p>
      </section>

      <section>
        <h2>Access &amp; account</h2>
        <ul>
          <li>Access is tied to the email address used at checkout</li>
          <li>You are responsible for keeping your email secure</li>
          <li>Access is personal and non-transferable unless we agree otherwise in writing</li>
        </ul>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          All content within Aftercare — including audio, copy, design, and portal
          experience — is owned by Aftercare Global. You may not copy, redistribute,
          resell, or publicly share portal materials without written permission.
        </p>
      </section>

      <section>
        <h2>Not medical advice</h2>
        <p>
          Aftercare is a reflective digital experience. It is not therapy, medical care,
          or emergency support. If you are in crisis, contact local emergency services or
          a qualified professional immediately.
        </p>
      </section>

      <section>
        <h2>Refunds</h2>
        <p>
          Because access is delivered digitally and immediately, purchases are generally
          final once portal access is granted. Contact support if you believe a charge
          was made in error.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update these terms from time to time. Continued use of the portal after
          updates constitutes acceptance of the revised terms.
        </p>
      </section>
    </LegalPageLayout>
  );
}
