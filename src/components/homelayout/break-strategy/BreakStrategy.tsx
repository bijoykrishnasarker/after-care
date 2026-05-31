"use client";

import { Reveal } from "../mirror-reality/Reveal";

const triedItems = [
  "distracting yourself",
  "staying busy",
  "talking it out",
  "pretending it didn't hurt that much",
] as const;

export function BreakStrategy() {
  return (
    <section
      id="break-strategy"
      className="bg-app px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="md:ml-12 lg:ml-20 xl:ml-28">
          <Reveal>
            <h2 className="max-w-3xl text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-tight">
              <span className="block font-medium text-app">
                What you&apos;ve been doing
              </span>
              <span className="mt-1 block font-normal italic text-neutral-400">
                isn&apos;t healing you.
              </span>
            </h2>
          </Reveal>

         
          <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-2 lg:gap-20 xl:gap-28">
            
            <div>
              <Reveal delay={100}>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-500 sm:text-[11px]">
                  You&apos;ve tried:
                </p>
              </Reveal>

              <ul className="mt-6 sm:mt-8">
                {triedItems.map((item, index) => (
                  <Reveal key={item} delay={180 + index * 90}>
                    <li className="flex items-start gap-4 border-b border-app py-5 sm:py-6">
                      <span
                        className="mt-2.5 h-px w-4 shrink-0 bg-neutral-600 sm:w-5"
                        aria-hidden
                      />
                      <p className="text-base italic leading-relaxed text-neutral-400 sm:text-lg">
                        {item}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-between gap-12 lg:gap-16">
              <Reveal delay={520}>
                <div className="border-l-2 border-red-700 pl-5 sm:pl-6">
                  <p className="text-sm italic text-neutral-500 sm:text-base">
                    But when it gets quiet...
                  </p>
                  <p className="mt-2 text-sm text-app sm:text-base">
                    it all comes back.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={620}>
                <div className="max-w-md">
                  <p className="text-lg font-medium leading-snug text-app sm:text-xl">
                    You don&apos;t move on from something like this by avoiding it.
                  </p>
                  <p className="mt-3 text-lg italic text-neutral-400 sm:text-xl">
                    You move through it.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
