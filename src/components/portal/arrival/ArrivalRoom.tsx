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
      <header className="border-b border-app/80 bg-transparent px-4 py-4 sm:px-6 sm:py-5 lg:px-14">
        <div className="mx-auto flex w-full min-w-0 max-w-7xl items-center justify-between gap-2 sm:gap-4">
          {prevRoom ? (
            <Link
              href={getRoomPath(prevRoom.slug)}
              className="shrink-0 text-[9px] uppercase tracking-[0.16em] text-neutral-500 transition-colors hover:text-app sm:text-[10px] sm:tracking-[0.2em]"
            >
              <span aria-hidden>← </span>
              Room {Number(prevRoom.number)}
            </Link>
          ) : (
            <span className="text-[9px] uppercase tracking-[0.16em] text-neutral-700 sm:text-[10px] sm:tracking-[0.2em]">
              Start
            </span>
          )}

          <RoomProgressDots activeIndex={nav.index} />

          <Link
            href="/portal/architecture"
            className="shrink-0 text-[9px] uppercase tracking-[0.16em] text-neutral-500 transition-colors hover:text-[#C9A962] sm:text-[10px] sm:tracking-[0.2em]"
          >
            Portal<span aria-hidden> →</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto grid w-full min-w-0 max-w-7xl flex-1 grid-cols-1 gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10 lg:grid-cols-2 lg:gap-14 lg:px-14 lg:py-14">
        <section className="flex min-w-0 flex-col justify-between">
          <div className="min-w-0">
            <p
              className="text-[10px] uppercase tracking-[0.22em]"
              style={{ color: roomColor }}
            >
              Room 07
            </p>
            <h1 className="mt-4 break-words font-serif-display text-3xl leading-tight text-headline sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
              The Arrival
            </h1>

            <p className="mt-8 max-w-full break-words text-sm leading-[1.85] text-neutral-400 sm:text-[15px]">
              {bodyCopy}
            </p>

            <p className="mt-6 max-w-full break-words text-sm italic text-neutral-500">
              Breathe. Simply breathe.
            </p>

            <HoldButton />

            <blockquote
              className="mt-12 max-w-full border-t border-l pt-6 pl-5"
              style={{ borderColor: `${roomColor}59` }}
            >
              <p className="max-w-full break-words font-serif-display text-base italic leading-relaxed text-neutral-300 sm:text-lg lg:text-xl">
                &ldquo;{quote}&rdquo;
              </p>
            </blockquote>
          </div>

          <p className="mt-12 max-w-full break-words text-[10px] uppercase tracking-[0.22em] text-neutral-600 lg:mt-0">
            Stay here as long as you need. You have arrived.
          </p>
        </section>

        <section className="flex min-w-0 w-full flex-col gap-4 [&_p:first-child]:text-[#C9A962]/70">
          <SonicHealingPlayer tracks={tracks} />
          <MoodSelector />
          <ReleaseField placeholder="Type anything, it won't be saved." />
        </section>
      </main>

      <footer className="border-t border-app/80 bg-transparent px-4 py-4 sm:px-6 sm:py-5 lg:px-14">
        <div className="mx-auto flex w-full min-w-0 max-w-7xl items-center justify-between gap-2 sm:gap-4">
          <Link
            href="/portal/architecture"
            className="shrink-0 text-[9px] uppercase tracking-[0.16em] text-neutral-500 transition-colors hover:text-app sm:text-[10px] sm:tracking-[0.2em]"
          >
            <span aria-hidden>← </span>
            All rooms
          </Link>

          <Link
            href="/portal/architecture"
            className="shrink-0 text-[9px] uppercase tracking-[0.16em] text-neutral-500 transition-colors hover:text-[#C9A962] sm:text-[10px] sm:tracking-[0.2em]"
          >
            Return to portal<span aria-hidden> →</span>
          </Link>
        </div>
      </footer>
    </RoomColorAmbience>
  );
}
