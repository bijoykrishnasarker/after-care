"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MoodSelector } from "@/components/portal/shared/MoodSelector";
import { ReleaseField } from "@/components/portal/shared/ReleaseField";
import { RoomColorAmbience } from "@/components/portal/shared/RoomColorAmbience";
import { RoomProgressDots } from "@/components/portal/shared/RoomProgressDots";
import { SonicHealingPlayer } from "@/components/portal/shared/SonicHealingPlayer";
import { getRoomNav, getRoomPath } from "@/lib/room-navigation";
import { getRoomTracks } from "@/lib/room-tracks";
import { getRoom, type RoomSlug } from "@/lib/rooms";

type RoomExperienceLayoutProps = {
  slug: RoomSlug;
  title: string;
  bodyCopy: string;
  quote: string;
  footerLine: string;
  showTitleDivider?: boolean;
  quoteVariant?: "accent-border" | "subtle-box" | "left-border" | "plain";
  releaseHint?: string;
  clearReleaseOnEnter?: boolean;
  clearReleaseOnPause?: boolean;
  releasePlaceholder?: string;
};

const portalHeaderClass =
  "border-b border-app/80 bg-transparent px-4 py-4 sm:px-6 sm:py-5 lg:px-14";
const portalHeaderInnerClass =
  "mx-auto flex w-full min-w-0 max-w-7xl items-center justify-between gap-2 sm:gap-4";
const portalNavLinkClass =
  "shrink-0 text-[9px] uppercase tracking-[0.16em] text-neutral-500 transition-colors hover:text-app sm:text-[10px] sm:tracking-[0.2em]";
const portalMainClass =
  "mx-auto grid w-full min-w-0 max-w-7xl flex-1 grid-cols-1 gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10 lg:grid-cols-2 lg:gap-14 lg:px-14 lg:py-14";
const portalCopyClass =
  "max-w-full break-words text-sm leading-[1.85] text-neutral-400 sm:text-[15px]";
const portalQuoteClass =
  "max-w-full break-words font-serif-display text-base italic leading-relaxed text-neutral-300 sm:text-lg lg:text-xl";
const portalTitleClass =
  "mt-4 break-words font-serif-display text-3xl leading-tight text-headline sm:text-4xl lg:text-5xl xl:text-[3.25rem]";

export function RoomExperienceLayout({
  slug,
  title,
  bodyCopy,
  quote,
  footerLine,
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
  const roomColor = getRoom(slug)?.color ?? "#c9a962";

  const topLeftHref = prev ? getRoomPath(prev.slug) : "/portal/architecture";
  const topLeftLabel = prev ? `Room ${Number(prev.number)}` : "Portal";

  const nextRoomNumber = next ? Number(next.number) : null;

  return (
    <RoomColorAmbience color={roomColor} className="text-app">
      <header className={portalHeaderClass}>
        <div className={portalHeaderInnerClass}>
          <Link href={topLeftHref} className={portalNavLinkClass}>
            <span aria-hidden>← </span>
            {topLeftLabel}
          </Link>

          <RoomProgressDots activeIndex={nav.index} />

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <ThemeToggle />
            {next ? (
              <Link href={getRoomPath(next.slug)} className={portalNavLinkClass}>
                Room {nextRoomNumber}
                <span aria-hidden> →</span>
              </Link>
            ) : (
              <span className="text-[9px] uppercase tracking-[0.16em] text-neutral-700 sm:text-[10px] sm:tracking-[0.2em]">
                Final
              </span>
            )}
          </div>
        </div>
      </header>

      <main className={portalMainClass}>
        <section className="flex min-w-0 flex-col justify-between">
          <div className="min-w-0">
            <p
              className="text-[10px] uppercase tracking-[0.22em]"
              style={{ color: roomColor }}
            >
              Room {current.number}
            </p>
            <h1 className={portalTitleClass}>{title}</h1>

            {showTitleDivider && (
              <span className="mt-6 block h-px w-12 bg-neutral-700" aria-hidden />
            )}

            <p className={`mt-8 ${portalCopyClass}`}>{bodyCopy}</p>

            {quoteVariant === "accent-border" ? (
              <blockquote
                className="mt-10 max-w-full border-t pt-8"
                style={{ borderColor: `${roomColor}66` }}
              >
                <p className={portalQuoteClass}>&ldquo;{quote}&rdquo;</p>
              </blockquote>
            ) : quoteVariant === "left-border" ? (
              <blockquote className="mt-10 max-w-full border-l border-neutral-700 pl-5">
                <p className={portalQuoteClass}>&ldquo;{quote}&rdquo;</p>
              </blockquote>
            ) : quoteVariant === "plain" ? (
              <blockquote className="mt-10 max-w-full">
                <p className={portalQuoteClass}>&ldquo;{quote}&rdquo;</p>
              </blockquote>
            ) : (
              <blockquote className="mt-10 max-w-full border border-app/80 bg-surface/20 px-5 py-6">
                <p className={portalQuoteClass}>&ldquo;{quote}&rdquo;</p>
              </blockquote>
            )}
          </div>

          <p className="mt-12 max-w-full break-words text-[10px] uppercase tracking-[0.22em] text-neutral-600 lg:mt-0">
            {footerLine}
          </p>
        </section>

        <section className="flex min-w-0 w-full flex-col gap-4">
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

      <footer className={portalHeaderClass}>
        <div className={portalHeaderInnerClass}>
          <Link href="/portal/architecture" className={portalNavLinkClass}>
            <span aria-hidden>← </span>
            All rooms
          </Link>

          {next ? (
            <Link href={getRoomPath(next.slug)} className={portalNavLinkClass}>
              Continue to next room<span aria-hidden> →</span>
            </Link>
          ) : (
            <span className="text-[9px] uppercase tracking-[0.16em] text-neutral-700 sm:text-[10px] sm:tracking-[0.2em]">
              Journey complete
            </span>
          )}
        </div>
      </footer>
    </RoomColorAmbience>
  );
}
