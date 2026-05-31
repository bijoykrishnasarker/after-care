"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeBar } from "@/components/theme/ThemeBar";

export function LeadMagnetPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/leads/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "lead-magnet" }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Unable to submit. Please try again.");
        return;
      }

      router.push("/lead-magnet/thank-you");
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-app px-6 py-12 text-app sm:px-10 sm:py-16">
      <ThemeBar className="mb-10" maxWidth="max-w-6xl" />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>

          <p className="mt-10 text-[10px] uppercase tracking-[0.22em] text-[#9B4545]">
            Free guide
          </p>
          <h1 className="mt-4 font-serif-display text-4xl leading-tight text-headline sm:text-5xl">
            Before the rooms: a quiet place to begin.
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-neutral-400 sm:text-base">
            A short Aftercare guide for the first nights after it ends — when
            silence feels louder than the breakup itself. Enter your email and
            we&apos;ll send it immediately.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-neutral-500">
            <li>— What your nervous system is doing right now</li>
            <li>— Why &ldquo;moving on&rdquo; advice fails</li>
            <li>— How the seven rooms meet you where you are</li>
          </ul>
        </div>

        <div className="border border-app bg-surface p-6 sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
            Get the free guide
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                Email address
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="mt-3 w-full border border-app bg-app px-4 py-3.5 text-sm text-app placeholder:text-neutral-600 outline-none focus:border-neutral-600"
              />
            </label>

            {error && (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-70"
            >
              {loading ? "Sending..." : "Send me the guide"}
              {!loading && <span aria-hidden>→</span>}
            </button>
          </form>

          <p className="mt-4 text-xs leading-relaxed text-neutral-600">
            No spam. Unsubscribe anytime. By submitting, you agree to receive
            Aftercare emails.
          </p>

          <p className="mt-6 text-center">
            <Link href="/checkout" className="text-xs text-neutral-500 hover:text-app">
              Ready for full access? Go to checkout →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
