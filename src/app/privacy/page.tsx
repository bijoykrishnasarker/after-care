import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy · Aftercare",
  description: "How Aftercare handles your data and privacy.",
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" updated="May 22, 2026">
      <p>
        Aftercare Global (&ldquo;Aftercare,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) respects
        your privacy. This policy explains what we collect, why we collect it, and how we
        protect your information when you use our website and member portal.
      </p>

      <section>
        <h2>Information we collect</h2>
        <ul>
          <li>Email address provided at checkout or portal login</li>
          <li>Payment information processed securely by Stripe (we do not store card details)</li>
          <li>Basic session data required to keep you signed in to the portal</li>
        </ul>
      </section>

      <section>
        <h2>How we use your information</h2>
        <ul>
          <li>To deliver access to your purchased Aftercare experience</li>
          <li>To send your portal access link and purchase confirmation</li>
          <li>To verify membership when you return to the portal</li>
        </ul>
      </section>

      <section>
        <h2>What we do not do</h2>
        <ul>
          <li>We do not sell your personal information</li>
          <li>We do not use third-party advertising trackers on the member portal</li>
          <li>
            Release-field reflections typed inside rooms are not saved to our servers
          </li>
        </ul>
      </section>

      <section>
        <h2>Data retention</h2>
        <p>
          We retain your email and purchase access record for as long as your lifetime
          access remains active, or as required by law. You may contact us to request
          deletion of your access record, subject to legal and payment obligations.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          For privacy questions, contact Aftercare Global at the support email provided
          on your purchase confirmation.
        </p>
      </section>
    </LegalPageLayout>
  );
}
