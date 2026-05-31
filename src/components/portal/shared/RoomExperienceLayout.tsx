"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MoodSelector } from "@/components/portal/shared/MoodSelector";
import { ReleaseField } from "@/components/portal/shared/ReleaseField";
import { RoomProgressDots } from "@/components/portal/shared/RoomProgressDots";
import { SonicHealingPlayer } from "@/components/portal/shared/SonicHealingPlayer";
import { getRoomNav, getRoomPath } from "@/lib/room-navigation";
import { getRoomTracks } from "@/lib/room-tracks";
import type { RoomSlug } from "@/lib/rooms";

type RoomExperienceLayoutProps = {
  slug: RoomSlug;
  title: string;
  bodyCopy: string;
  quote: string;
  footerLine: string;
  roomLabelColor?: string;
  showTitleDivider?: boolean;
  quoteVariant?: "accent-border" | "subtle-box" | "left-border" | "plain";
  releaseHint?: string;
  clearReleaseOnEnter?: boolean;
  clearReleaseOnPause?: boolean;
  releasePlaceholder?: string;
};

export function RoomExperienceLayout({
  slug,
  title,
  bodyCopy,
  quote,
  footerLine,
  roomLabelColor = "text-neutral-500",
  showTitleDivider = false,
  quoteVariant = "accent-border",
  releaseHint,
  clearReleaseOnEnter = false,
  clearReleaseOnPause = false,
  releasePlaceholder,
}: RoomExperienceLayoutProps) {
  const nav = getRoomNav(slug);
  const tracks = getRoomTracks(slug);
  const { current, prev, next } = nav;

  const topLeftHref = prev ? getRoomPath(prev.slug) : "/portal/architecture";
  const topLeftLabel = prev ? `Room ${Number(prev.number)}` : "Portal";

  const nextRoomNumber = next ? Number(next.number) : null;

  return (
    <div className="flex min-h-screen flex-col bg-app text-app">
      <header className="border-b border-app/80 px-6 py-5 sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <Link
            href={topLeftHref}
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-app"
          >
            <span aria-hidden>← </span>
            {topLeftLabel}
          </Link>

          <RoomProgressDots activeIndex={nav.index} />

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {next ? (
              <Link
                href={getRoomPath(next.slug)}
                className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-app"
              >
                Room {nextRoomNumber}
                <span aria-hidden> →</span>
              </Link>
            ) : (
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-700">
                Final
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-10 px-6 py-10 sm:px-10 lg:grid-cols-2 lg:gap-14 lg:px-14 lg:py-14">
        <section className="flex flex-col justify-between">
          <div>
            <p className={`text-[10px] uppercase tracking-[0.22em] ${roomLabelColor}`}>
              Room {current.number}
            </p>
            <h1 className="mt-4 font-serif-display text-4xl leading-tight text-headline sm:text-5xl lg:text-[3.25rem]">
              {title}
            </h1>

            {showTitleDivider && (
              <span className="mt-6 block h-px w-12 bg-neutral-700" aria-hidden />
            )}

            <p className="mt-8 max-w-lg text-sm leading-[1.85] text-neutral-400 sm:text-[15px]">
              {bodyCopy}
            </p>

            {quoteVariant === "accent-border" ? (
              <blockquote className="mt-10 border-t border-[#9B4545]/40 pt-8">
                <p className="font-serif-display text-lg italic leading-relaxed text-neutral-300 sm:text-xl">
                  &ldquo;{quote}&rdquo;
                </p>
              </blockquote>
            ) : quoteVariant === "left-border" ? (
              <blockquote className="mt-10 border-l border-neutral-700 pl-5">
                <p className="font-serif-display text-lg italic leading-relaxed text-neutral-300 sm:text-xl">
                  &ldquo;{quote}&rdquo;
                </p>
              </blockquote>
            ) : quoteVariant === "plain" ? (
              <blockquote className="mt-10">
                <p className="font-serif-display text-lg italic leading-relaxed text-neutral-300 sm:text-xl">
                  &ldquo;{quote}&rdquo;
                </p>
              </blockquote>
            ) : (
              <blockquote className="mt-10 border border-app/80 bg-surface/20 px-5 py-6">
                <p className="font-serif-display text-lg italic leading-relaxed text-neutral-300 sm:text-xl">
                  &ldquo;{quote}&rdquo;
                </p>
              </blockquote>
            )}
          </div>

          <p className="mt-12 text-[10px] uppercase tracking-[0.22em] text-neutral-600 lg:mt-0">
            {footerLine}
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <SonicHealingPlayer tracks={tracks} />
          <MoodSelector />
          <ReleaseField
            hint={releaseHint}
            placeholder={releasePlaceholder}
            clearOnEnter={clearReleaseOnEnter}
            clearOnPause={clearReleaseOnPause}
          />
        </section>
      </main>

      <footer className="border-t border-app/80 px-6 py-5 sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <Link
            href="/portal/architecture"
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-app"
          >
            <span aria-hidden>← </span>
            All rooms
          </Link>

          {next ? (
            <Link
              href={getRoomPath(next.slug)}
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-app"
            >
              Continue to next room<span aria-hidden> →</span>
            </Link>
          ) : (
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-700">
              Journey complete
            </span>
          )}
        </div>
      </footer>
    </div>
  );
}
