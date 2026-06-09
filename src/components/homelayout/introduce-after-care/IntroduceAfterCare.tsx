"use client";

import Link from "next/link";
import { Reveal } from "../mirror-reality/Reveal";

export function IntroduceAfterCare() {
  return (
    <section
      id="introduce-after-care"
      className="bg-app px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="md:ml-12 lg:ml-20 xl:ml-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-28">
            <div>
              <Reveal>
                <h2 className="text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-tight">
                  <span className="block font-medium text-app">This is what</span>
                  <span className="mt-1 block font-normal italic text-prose-muted">
                    AfterCare is for.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={120} className="mt-10 space-y-2 sm:mt-12">
                <p className="text-sm text-prose-soft sm:text-base">
                  Not to &apos;fix&apos; you.
                </p>
                <p className="text-sm leading-relaxed text-prose-soft sm:text-base">
                  But to{" "}
                  <span className="text-app">
                    guide you through what you&apos;ve been avoiding.
                  </span>
                </p>
              </Reveal>
            </div>
            <div className="flex flex-col">
              <Reveal delay={180}>
                <p className="text-sm leading-relaxed text-prose-soft sm:text-[15px]">
                  <span className="font-medium text-app">
                    AfterCare: When It&apos;s Over
                  </span>{" "}
                  is a private, audio-guided emotional healing experience designed
                  to walk you through the exact phases of letting go.
                </p>
              </Reveal>

              <Reveal delay={280} className="mt-8 border-l border-neutral-700 pl-5 sm:mt-10 sm:pl-6">
                <p className="text-sm italic text-prose-soft sm:text-base">
                  Step by step.
                </p>
                <p className="mt-1 text-sm italic text-prose-soft sm:text-base">
                  Room by room.
                </p>
              </Reveal>

              <Reveal delay={380} className="mt-8 sm:mt-10">
                <p className="text-sm text-prose-soft sm:text-base">
                  So you don&apos;t stay stuck in something that already ended.
                </p>
              </Reveal>

              <Reveal delay={480} className="mt-12 sm:mt-16">
                <Link
                  href="/#the-rooms"
                  scroll
                  className="group inline-flex flex-col items-start gap-2"
                >
                  <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-app transition-colors duration-300 group-hover:text-prose sm:text-xs">
                    Start processing this
                    <span
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    >
                      →
                    </span>
                  </span>
                  <span className="h-px w-full bg-app transition-all duration-300 group-hover:w-[105%] group-hover:bg-[var(--prose-muted)]" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
