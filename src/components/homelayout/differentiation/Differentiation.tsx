"use client";

import { Reveal } from "../mirror-reality/Reveal";

const designedFor = [
  "break attachment",
  "process unresolved feelings",
  "release what's still sitting in your body",
  "rebuild your sense of self",
] as const;

export function Differentiation() {
  return (
    <section
      id="differentiation"
      className="bg-app px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="md:ml-12 lg:ml-20 xl:ml-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-28">
            <Reveal className="flex items-center">
              <h2 className="text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-tight">
                <span className="block font-medium text-app">
                  This isn&apos;t a book.
                </span>
                <span className="mt-2 block font-normal italic text-prose-muted">
                  This isn&apos;t a course.
                </span>
              </h2>
            </Reveal>
            <div>
              <Reveal delay={100}>
                <h3 className="text-xl font-medium leading-snug text-app sm:text-2xl">
                  You don&apos;t just read this.
                  <br />
                  <span className="font-normal italic text-prose-muted">
                    You enter it.
                  </span>
                </h3>
              </Reveal>

              <Reveal delay={200} className="mt-8 sm:mt-10">
                <p className="text-sm text-prose-soft sm:text-[15px]">
                  Inside, you&apos;ll move through 7 structured emotional
                  environments designed to:
                </p>
              </Reveal>

              <ul className="mt-6 sm:mt-8">
                {designedFor.map((item, index) => (
                  <Reveal key={item} delay={280 + index * 90}>
                    <li className="flex items-start gap-4 border-b border-app py-5 sm:py-6">
                      <span
                        className="mt-2 h-2 w-2 shrink-0 bg-red-700"
                        aria-hidden
                      />
                      <p className="text-base text-prose-muted sm:text-lg">
                        {item}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={680} className="mt-10 sm:mt-12">
                <p className="max-w-md text-base italic leading-relaxed text-prose-soft sm:text-lg">
                  It feels like someone is sitting with you... walking you
                  through it... making sure you don&apos;t avoid the parts that
                  matter.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
