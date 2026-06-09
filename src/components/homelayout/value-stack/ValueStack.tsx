"use client";

import Link from "next/link";
import { Reveal } from "../mirror-reality/Reveal";

const couldItems = [
  "keep carrying this for months",
  "bring it into your next situation",
  'try to "figure it out" alone',
] as const;

const properlyItems = [
  "With structure.",
  "With guidance.",
  "With intention.",
] as const;

const features = [
  "7 private audio experiences",
  "Sequential room progression",
  "Lifetime access",
  "Less than one therapy session",
] as const;

export function ValueStack() {
  return (
    <section
      id="value-stack"
      className="scroll-mt-16 bg-app px-6 py-20 pb-28 sm:px-10 sm:py-24 sm:pb-32 lg:px-16 lg:py-28 xl:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="md:ml-12 lg:ml-20 xl:ml-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20">
            <div>
              <Reveal>
                <h2 className="text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-tight">
                  <span className="font-medium text-app">Let&apos;s be real </span>
                  <span className="font-normal italic text-prose-muted">
                    for a second...
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={100} className="mt-10 sm:mt-12">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-prose-soft sm:text-[11px]">
                  You could:
                </p>
                <ul className="mt-5 space-y-4">
                  {couldItems.map((item, index) => (
                    <li
                      key={item}
                      className="flex items-start gap-4 text-sm text-prose-soft sm:text-base"
                    >
                      <span
                        className="mt-2.5 h-px w-4 shrink-0 bg-neutral-600"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={220} className="mt-10 sm:mt-12">
                <p className="text-sm text-prose-muted sm:text-base">
                  Or... Walk through it properly.
                </p>
                <ul className="mt-5 space-y-4">
                  {properlyItems.map((item) => (
                    <li
                      key={item}
                      className="border-l-2 border-red-800 pl-4 text-sm text-app sm:pl-5 sm:text-base"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div className="relative z-10 border border-app bg-surface p-6 sm:p-8 lg:p-10">
              <p className="text-lg font-medium text-app sm:text-xl">
                AfterCare: When It&apos;s Over
              </p>
              <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.22em] text-prose-soft sm:text-[11px]">
                Full 7-room experience
              </p>

              <div className="mt-8">
                <Link
                  href="/checkout"
                  prefetch
                  className="block font-serif-display text-5xl text-app transition-opacity duration-300 hover:opacity-80 sm:text-6xl"
                >
                  $48.88
                </Link>
                <Link
                  href="/checkout"
                  prefetch
                  className="mt-3 inline-block rounded border border-red-800/80 bg-red-950 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-red-400 shadow-[0_0_14px_rgba(220,38,38,0.25)] transition-all duration-300 hover:border-red-600 hover:bg-red-900 hover:text-red-300 hover:shadow-[0_0_18px_rgba(239,68,68,0.4)] sm:text-[10px]"
                >
                  One-time payment
                </Link>
              </div>

              <ul className="mt-8 space-y-4 border-t border-app pt-8">
                {features.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-prose">
                    <span className="mt-0.5 text-red-600" aria-hidden>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/checkout"
                prefetch
                className="btn-primary mt-8 sm:text-xs"
              >
                Enter Aftercare Now
                <span aria-hidden>→</span>
              </Link>

              <p className="mt-6 text-center text-sm italic text-prose-soft">
                Something you can return to whenever you need.
              </p>

              <Link
                href="/checkout"
                prefetch
                className="mt-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.18em] text-neutral-600 transition-colors duration-300 hover:text-prose-muted"
              >
                <span aria-hidden>🔒</span>
                Secure checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
