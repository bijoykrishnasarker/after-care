"use client";

import { Reveal } from "../mirror-reality/Reveal";

const feelings = [
  "The connection.",
  "The comfort.",
  "The version of you that felt secure.",
] as const;

export function IdentityShift() {
  return (
    <section
      id="identity-shift"
      className="bg-app px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="md:ml-12 lg:ml-20 xl:ml-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20 xl:gap-28">
            <div>
              <Reveal>
                <h2 className="text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-tight">
                  <span className="block font-medium text-app">
                    You don&apos;t actually
                  </span>
                  <span className="mt-1 block font-normal italic text-prose-muted">
                    want them back.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={120} className="mt-10 border-l-2 border-red-800 pl-5 sm:mt-12 sm:pl-6">
                <p className="text-base italic text-app sm:text-lg">
                  You want the feeling back.
                </p>
              </Reveal>

              <div className="mt-8 space-y-2 sm:mt-10">
                {feelings.map((item, index) => (
                  <Reveal key={item} delay={240 + index * 70}>
                    <p className="text-sm text-prose-soft sm:text-base">{item}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal delay={400}>
              <div className="border border-app bg-surface p-8 sm:p-10 lg:p-12">
                <p className="text-base italic text-prose-soft sm:text-lg">
                  AfterCare doesn&apos;t give you them back.
                </p>
                <p className="mt-6 text-2xl font-medium leading-snug text-app sm:text-3xl">
                  It gives you{" "}
                  <span className="italic">yourself</span> back.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
