"use client";

import Link from "next/link";
import { HoldButton } from "@/components/portal/arrival/HoldButton";
import { MoodSelector } from "@/components/portal/shared/MoodSelector";
import { ReleaseField } from "@/components/portal/shared/ReleaseField";
import { RoomColorAmbience } from "@/components/portal/shared/RoomColorAmbience";
import { RoomProgressDots } from "@/components/portal/shared/RoomProgressDots";
import { SonicHealingPlayer } from "@/components/portal/shared/SonicHealingPlayer";
import { getRoomNav, getRoomPath } from "@/lib/room-navigation";
import { getRoomTracks } from "@/lib/room-tracks";
import { getRoom } from "@/lib/rooms";

const bodyCopy =
  "The worst of it is over. You survived the collapse, the withdrawal, and the ghosts. You faced the mirror. You found your frequency. You walked out the door. Now, in this final room, there is only one thing left to do.";

const quote = "You made it. That was never guaranteed.";

export function ArrivalRoom() {
  const nav = getRoomNav("arrival");
  const tracks = getRoomTracks("arrival");
  const prevRoom = nav.prev;
  const roomColor = getRoom("arrival")?.color ?? "#c9a962";

  return (
    <RoomColorAmbience color={roomColor} className="text-app">
      <header className="border-b border-app/80 bg-transparent px-6 py-5 sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          {prevRoom ? (
            <Link
              href={getRoomPath(prevRoom.slug)}
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-app"
            >
              <span aria-hidden>← </span>
              Room {Number(prevRoom.number)}
            </Link>
          ) : (
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-700">
              Start
            </span>
          )}

          <RoomProgressDots activeIndex={nav.index} />

          <Link
            href="/portal/architecture"
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-[#C9A962]"
          >
            Portal<span aria-hidden> →</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-10 px-6 py-10 sm:px-10 lg:grid-cols-2 lg:gap-14 lg:px-14 lg:py-14">
        <section className="flex flex-col justify-between">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.22em]"
              style={{ color: roomColor }}
            >
              Room 07
            </p>
            <h1 className="mt-4 font-serif-display text-4xl leading-tight text-headline sm:text-5xl lg:text-[3.25rem]">
              The Arrival
            </h1>

            <p className="mt-8 max-w-lg text-sm leading-[1.85] text-neutral-400 sm:text-[15px]">
              {bodyCopy}
            </p>

            <p className="mt-6 text-sm italic text-neutral-500">
              Breathe. Simply breathe.
            </p>

            <HoldButton />

            <blockquote
              className="mt-12 border-t border-l pt-6 pl-5"
              style={{ borderColor: `${roomColor}59` }}
            >
              <p className="font-serif-display text-lg italic leading-relaxed text-neutral-300 sm:text-xl">
                &ldquo;{quote}&rdquo;
              </p>
            </blockquote>
          </div>

          <p className="mt-12 text-[10px] uppercase tracking-[0.22em] text-neutral-600 lg:mt-0">
            Stay here as long as you need. You have arrived.
          </p>
        </section>

        <section className="flex flex-col gap-4 [&_p:first-child]:text-[#C9A962]/70">
          <SonicHealingPlayer tracks={tracks} />
          <MoodSelector />
          <ReleaseField placeholder="Type anything, it won't be saved." />
        </section>
      </main>

      <footer className="border-t border-app/80 bg-transparent px-6 py-5 sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <Link
            href="/portal/architecture"
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-app"
          >
            <span aria-hidden>← </span>
            All rooms
          </Link>

          <Link
            href="/portal/architecture"
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-[#C9A962]"
          >
            Return to portal<span aria-hidden> →</span>
          </Link>
        </div>
      </footer>
    </RoomColorAmbience>
  );
}
