"use client";

import { Reveal } from "../mirror-reality/Reveal";

const objections = [
  {
    question: "What if I'm not ready?",
    answer: "You're already feeling it. This just gives it direction.",
  },
  {
    question: "What if I still love them?",
    answer: "That's exactly why you need this.",
  },
  {
    question: "What if it doesn't work?",
    answer: "It works if you stop avoiding what you feel.",
  },
] as const;

export function ObjectionBreaker() {
  return (
    <section
      id="objection-breaker"
      className="bg-app px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="md:ml-12 lg:ml-20 xl:ml-28">
          <div className="max-w-2xl space-y-12 sm:space-y-16">
            {objections.map((item, index) => (
              <Reveal key={item.question} delay={index * 100}>
                <div
                  className={
                    index < objections.length - 1
                      ? "border-b border-app pb-12 sm:pb-16"
                      : ""
                  }
                >
                  <h3 className="text-[clamp(1.5rem,4vw,2.25rem)] font-medium italic leading-snug text-app">
                    {item.question}
                  </h3>
                  <div className="mt-5 border-l-2 border-red-800 pl-5 sm:mt-6 sm:pl-6">
                    <p className="text-sm leading-relaxed text-prose-soft sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
