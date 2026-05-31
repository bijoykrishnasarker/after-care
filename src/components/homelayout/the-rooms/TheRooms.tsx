"use client";

import Link from "next/link";
import { rooms } from "@/lib/rooms";
import { Reveal } from "../mirror-reality/Reveal";

export function TheRooms() {
  return (
    <section
      id="the-rooms"
      className="scroll-mt-16 bg-app px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="md:ml-12 lg:ml-20 xl:ml-28">
          <Reveal className="text-center lg:text-left">
            <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-medium leading-tight text-app">
              There are 7 rooms.
            </h2>
            <p className="mt-3 text-base italic text-neutral-400 sm:text-lg">
              Each one changes something.
            </p>
          </Reveal>

          <ul className="mt-14 sm:mt-16">
            {rooms.map((room, index) => (
              <Reveal key={room.slug} delay={120 + index * 80}>
                <li className="grid gap-3 border-b border-app py-6 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.4fr)] sm:items-center sm:gap-6 sm:py-8">
                  <span className="text-[10px] tracking-widest text-neutral-600 sm:text-[11px]">
                    {room.number}
                  </span>
                  <p className="text-lg italic text-app sm:text-xl">{room.name}</p>
                  <p className="text-sm leading-relaxed text-neutral-500 sm:text-base">
                    {room.line1} {room.line2}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={680} className="mt-14 flex justify-center sm:mt-16 lg:justify-start">
            <Link
              href="#final-close"
              className="group inline-flex flex-col items-center gap-2 lg:items-start"
            >
              <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-app transition-colors duration-300 group-hover:text-neutral-200 sm:text-xs">
                Unlock the rooms
                <span
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </span>
              <span className="h-px w-full bg-white transition-all duration-300 group-hover:w-[105%] group-hover:bg-neutral-300" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
