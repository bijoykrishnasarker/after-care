"use client";

import Link from "next/link";
import { Reveal } from "../mirror-reality/Reveal";

export function FinalClose() {
  return (
    <section
      id="final-close"
      className="scroll-mt-16 bg-app px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="md:ml-12 lg:ml-20 xl:ml-28">
          <Reveal>
            <h2 className="text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-tight">
              <span className="font-medium text-app">You have </span>
              <span className="font-normal italic text-neutral-400">two options.</span>
            </h2>
          </Reveal>

          <Reveal delay={100} className="mt-12 grid gap-10 border-y border-app py-10 sm:mt-14 sm:grid-cols-2 sm:gap-12 sm:py-12">
            <div>
              <p className="text-sm leading-relaxed text-neutral-500 sm:text-base">
                Keep doing what you&apos;ve been doing...
              </p>
              <p className="mt-2 text-sm italic text-neutral-500 sm:text-base">
                and stay stuck in it.
              </p>
            </div>
            <div className="sm:border-l sm:border-app sm:pl-12">
              <p className="text-sm leading-relaxed text-neutral-500 sm:text-base">
                Or... Finally face it. Process it.
              </p>
              <p className="mt-2 text-sm italic text-neutral-400 sm:text-base">
                And come out of it different.
              </p>
            </div>
          </Reveal>

          <Reveal delay={220} className="mt-10 text-center sm:mt-12 lg:text-left">
            <p className="text-sm italic text-neutral-500 sm:text-base">
              Because it already ended.
            </p>
          </Reveal>

          <Reveal delay={320} className="mt-10 sm:mt-12">
            <p className="text-sm text-neutral-500 sm:text-base">
              The only question is...
            </p>
            <p className="mt-2 text-[clamp(1.75rem,4vw,2.5rem)] font-medium text-app">
              when will you?
            </p>
          </Reveal>

          <Reveal delay={420} className="mt-10 sm:mt-12">
            <Link
              href="/checkout"
              className="btn-primary btn-primary--inline w-full gap-2 sm:w-auto sm:px-8 sm:text-xs"
            >
              Enter the Aftercare Sanctuary
              <span aria-hidden>→</span>
            </Link>
            <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-neutral-600 sm:text-[11px]">
              Private. Immediate. Yours only.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
