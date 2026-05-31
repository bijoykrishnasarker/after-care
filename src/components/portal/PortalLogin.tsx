"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeBar } from "@/components/theme/ThemeBar";

type PortalLoginProps = {
  errorMessage?: string | null;
};

export function PortalLogin({ errorMessage }: PortalLoginProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(errorMessage ?? null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/portal/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Unable to verify access.");
        return;
      }

      router.push("/portal/architecture");
      router.refresh();
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-app px-6 py-8 text-app sm:py-10">
      <ThemeBar className="mb-10 sm:mb-14" maxWidth="max-w-md" />
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="type-kicker">Member portal</p>
          <h1 className="mt-4 font-serif-display text-3xl italic text-headline">
            Enter your sanctuary.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-neutral-400">
            Use the same email from checkout. If you just paid, check your inbox for
            the access link.
          </p>
        </div>

        <form
          className="border border-app bg-surface p-6 sm:p-8"
          onSubmit={handleSubmit}
        >
          <label className="block">
            <span className="field-label">Email address</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="field-input mt-3"
            />
          </label>

          {error && (
            <p className="mt-4 text-sm text-red-400" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-6 disabled:opacity-70"
          >
            {loading ? "Checking access..." : "Enter Portal"}
            {!loading && <span aria-hidden>→</span>}
          </button>
        </form>

        <p className="mt-6 text-center">
          <Link href="/checkout" className="text-xs text-neutral-500 hover:text-app">
            Need access? Go to checkout →
          </Link>
        </p>
      </div>
    </main>
  );
}
