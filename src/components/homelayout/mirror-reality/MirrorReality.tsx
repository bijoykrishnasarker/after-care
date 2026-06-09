"use client";

import { Reveal } from "./Reveal";

const stillItems = [
  "still checking your phone",
  "replaying conversations in your head",
  "wondering if they'll reach out",
  "pretending you're fine when you're not",
] as const;

export function MirrorReality() {
  return (
    <section
      id="mirror-reality"
      className="bg-app px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="md:ml-12 lg:ml-20 xl:ml-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-28">
            <Reveal className="flex items-end lg:min-h-[28rem]">
              <p className="font-serif-display text-[clamp(2rem,5vw,3.25rem)] italic leading-snug text-headline">
                Be honest...
              </p>
            </Reveal>
            <div>
              <Reveal delay={80}>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-prose-soft sm:text-[11px]">
                  You&apos;re still:
                </p>
              </Reveal>

              <ul className="mt-6 sm:mt-8">
                {stillItems.map((item, index) => (
                  <Reveal key={item} delay={160 + index * 90}>
                    <li className="flex items-start gap-4 border-b border-app py-5 sm:py-6">
                      <span
                        className="mt-2.5 h-px w-4 shrink-0 bg-red-700 sm:w-5"
                        aria-hidden
                      />
                      <p className="text-base italic leading-relaxed text-prose sm:text-lg">
                        {item}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={520} className="mt-8 space-y-1 sm:mt-10">
                <p className="text-sm text-prose-soft">
                  You told yourself you&apos;d be okay by now.
                </p>
                <p className="text-sm text-prose-soft">But you&apos;re not.</p>
              </Reveal>

              <Reveal delay={620} className="mt-10 sm:mt-12">
                <p className="text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-tight text-app">
                  Because you never
                  <br />
                  <span className="text-prose-muted">actually processed it.</span>
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
