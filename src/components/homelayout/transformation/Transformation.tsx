"use client";

import { Reveal } from "../mirror-reality/Reveal";

const comparisons = [
  {
    before: "emotionally triggered",
    after: "grounded",
  },
  {
    before: "checking for them",
    after: "clear",
  },
  {
    before: 'stuck in "what if"',
    after: "detached (in a healthy way)",
  },
  {
    before: "questioning your worth",
    after: "no longer waiting for closure",
  },
] as const;

export function Transformation() {
  return (
    <section
      id="transformation"
      className="bg-app px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="md:ml-12 lg:ml-20 xl:ml-28">
          <Reveal>
            <h2 className="text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-tight">
              <span className="font-medium text-app">This is what </span>
              <span className="font-normal italic text-prose-muted">changes...</span>
            </h2>
          </Reveal>

          <Reveal delay={100} className="mt-12 sm:mt-16">
            <div className="max-w-3xl">
              <div className="hidden border-b border-app pb-4 sm:grid sm:grid-cols-2 sm:gap-12">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-prose-soft sm:text-[11px]">
                  Before
                </p>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-prose-soft sm:text-[11px]">
                  After
                </p>
              </div>
              <ul>
                {comparisons.map((row, index) => (
                  <Reveal key={row.before} delay={180 + index * 90}>
                    <li className="border-b border-app py-5 sm:grid sm:grid-cols-2 sm:gap-12 sm:py-6">
                      <div className="flex items-start gap-3">
                        <span
                          className="mt-2 h-2 w-2 shrink-0 bg-neutral-600"
                          aria-hidden
                        />
                        <div className="min-w-0">
                          <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-600 sm:hidden">
                            Before
                          </p>
                          <p className="break-words text-sm italic text-prose-soft sm:text-base">
                            {row.before}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-start gap-3 sm:mt-0">
                        <span
                          className="mt-2 h-2 w-2 shrink-0 bg-white"
                          aria-hidden
                        />
                        <div className="min-w-0">
                          <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-600 sm:hidden">
                            After
                          </p>
                          <p className="break-words text-sm text-app sm:text-base">
                            {row.after}
                          </p>
                        </div>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={560} className="mt-10 max-w-xl sm:mt-12">
            <p className="text-base leading-relaxed text-app sm:text-lg">
              You stop needing something...
            </p>
            <p className="mt-2 break-words text-base italic leading-relaxed text-prose-soft sm:text-lg">
              that was never going to give you what you needed.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
