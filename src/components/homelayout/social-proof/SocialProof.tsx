"use client";

import { Reveal } from "../mirror-reality/Reveal";

const testimonials = [
  {
    quote:
      "I didn't realize how much I was still holding until I walked through the first room.",
    name: "Sarah M.",
    label: "After 6 years",
  },
  {
    quote:
      "Room 3 was the moment something actually shifted. I stopped performing fine.",
    name: "James R.",
    label: "Room 3 changed me",
  },
  {
    quote:
      "I finished all seven in one weekend. I haven't checked their profile since.",
    name: "Elena K.",
    label: "Completed all 7 rooms",
  },
] as const;

const stats = [
  { value: "2,000+", label: "People served" },
  { value: "4.9/5", label: "Average rating" },
  { value: "92%", label: "Complete all 7 rooms" },
] as const;

export function SocialProof() {
  return (
    <section
      id="social-proof"
      className="bg-app px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="md:ml-12 lg:ml-20 xl:ml-28">
          <Reveal className="text-center lg:text-left">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-500 sm:text-[11px]">
              From people who&apos;ve been through it
            </p>
            <h2 className="mt-4 text-[clamp(2rem,5vw,3.25rem)] font-medium leading-tight text-app">
              You&apos;re not alone in this.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {testimonials.map((item, index) => (
              <Reveal key={item.name} delay={120 + index * 100}>
                <article className="group flex h-full flex-col border border-app bg-surface/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600 hover:bg-surface-elevated/80 hover:shadow-[0_12px_40px_rgba(255,255,255,0.06)] sm:p-7">
                  <p className="flex-1 text-sm italic leading-relaxed text-neutral-200 transition-colors duration-300 group-hover:text-app sm:text-[15px]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="mt-6 border-t border-app pt-5 transition-colors duration-300 group-hover:border-neutral-700">
                    <p className="text-sm text-app">— {item.name}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-neutral-500 transition-colors duration-300 group-hover:text-neutral-400">
                      {item.label}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={480} className="mt-14 border-t border-app pt-12 sm:mt-16">
            <div className="grid min-w-0 grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
              {stats.map((item) => (
                <div key={item.label} className="min-w-0 text-center lg:text-left">
                  <p className="text-[clamp(1.25rem,4.5vw,2.25rem)] font-medium leading-none text-app sm:text-3xl lg:text-4xl">
                    {item.value}
                  </p>
                  <p className="mt-1.5 text-[8px] uppercase leading-snug tracking-[0.1em] text-neutral-500 sm:mt-2 sm:text-[10px] sm:tracking-[0.16em] lg:text-[11px] lg:tracking-[0.2em]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
