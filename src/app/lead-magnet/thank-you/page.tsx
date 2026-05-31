import type { Metadata } from "next";
import Link from "next/link";
import { LeadCaptureTracker } from "@/components/marketing/LeadCaptureTracker";
import { ThemeBar } from "@/components/theme/ThemeBar";

export const metadata: Metadata = {
  title: "Guide Sent · Aftercare",
};

export default function LeadMagnetThankYouPage() {
  return (
    <>
      <LeadCaptureTracker />
      <main className="min-h-screen bg-app px-6 py-8 text-app sm:py-10">
      <ThemeBar className="mb-12" maxWidth="max-w-md" />
      <div className="mx-auto max-w-md text-center">
        <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
          Check your inbox
        </p>
        <h1 className="mt-4 font-serif-display text-3xl italic text-headline sm:text-4xl">
          Your guide is on the way.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-400">
          We sent a download link to your email. You can also open the guide
          directly below.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          <Link
            href="/downloads/aftercare-guide.pdf"
            className="btn-primary btn-primary--inline gap-2"
          >
            Download guide
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/checkout"
            className="inline-flex items-center justify-center border border-neutral-700 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400 transition-colors hover:border-neutral-500 hover:text-app"
          >
            Get full access
          </Link>
        </div>
      </div>
    </main>
    </>
  );
}
