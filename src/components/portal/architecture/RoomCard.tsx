"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import type { Room } from "@/lib/rooms";

type RoomCardProps = {
  room: Room;
  index: number;
  className?: string;
};

type GlowState = { x: number; y: number; on: boolean };

function useCardSpotlight() {
  const [glow, setGlow] = useState<GlowState>({ x: 0, y: 0, on: false });

  const setFromEvent = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setGlow({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      on: true,
    });
  }, []);

  const onMouseEnter = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    setFromEvent(event);
  }, [setFromEvent]);

  const onMouseMove = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    setFromEvent(event);
  }, [setFromEvent]);

  const onMouseLeave = useCallback(() => {
    setGlow((current) => ({ ...current, on: false }));
  }, []);

  return { glow, onMouseEnter, onMouseMove, onMouseLeave };
}

function CardSpotlight({
  glow,
  variant,
}: {
  glow: GlowState;
  variant: "room" | "final";
}) {
  const spotClass = `room-card-spotlight${glow.on ? " is-on" : ""}`;

  if (variant === "final") {
    return (
      <div
        className={spotClass}
        style={{
          background: glow.on
            ? `radial-gradient(500px circle at ${glow.x}px ${glow.y}px, rgba(201,169,98,0.09), transparent 50%)`
            : undefined,
        }}
        aria-hidden
      />
    );
  }

  return (
    <>
      <div
        className={spotClass}
        style={{
          background: glow.on
            ? `radial-gradient(400px circle at ${glow.x}px ${glow.y}px, rgba(255,255,255,0.07), transparent 46%)`
            : undefined,
        }}
        aria-hidden
      />
      <div
        className={spotClass}
        style={{
          background: glow.on
            ? `radial-gradient(240px circle at ${glow.x}px ${glow.y}px, rgba(201,169,98,0.08), transparent 54%)`
            : undefined,
        }}
        aria-hidden
      />
    </>
  );
}

export function RoomCard({ room, index, className = "" }: RoomCardProps) {
  const { glow, onMouseEnter, onMouseMove, onMouseLeave } = useCardSpotlight();
  const isFinal = "isFinal" in room && room.isFinal;

  if (isFinal) {
    return (
      <Link
        href={`/portal/${room.slug}`}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={`room-card block ${className}`}
      >
        <CardSpotlight glow={glow} variant="final" />

        <div className="relative z-10 flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="room-card-text flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
            <p
              className="font-serif-display text-5xl leading-none text-[#C9A962]/25 sm:text-6xl"
              aria-hidden
            >
              {room.number}
            </p>
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#C9A962]">
                The final room
              </p>
              <h2 className="mt-2 font-serif-display text-2xl text-[#C9A962] sm:text-3xl">
                {room.name}
              </h2>
              <p className="mt-2 text-sm text-neutral-500">{room.line1} {room.line2}</p>
            </div>
          </div>
          <span className="room-card-arrow self-end text-lg text-[#C9A962]/70 sm:self-center" aria-hidden>
            →
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/portal/${room.slug}`}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`room-card flex min-h-[200px] flex-col p-5 sm:min-h-[220px] sm:p-6 ${className}`}
    >
      <CardSpotlight glow={glow} variant="room" />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <span className="font-serif-display text-sm text-neutral-600">{room.number}</span>
          <span className="room-card-dot mt-1 h-1 w-1 rounded-full bg-neutral-700" aria-hidden />
        </div>

        <div className="room-card-text mt-6 flex-1">
          <h2 className="font-serif-display text-xl text-app sm:text-[1.35rem]">{room.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-500">
            {room.line1}
            <br />
            {room.line2}
          </p>
        </div>

        <div className="room-card-footer mt-6 flex items-end justify-between">
          <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-600">
            {index + 1} of 7
          </span>
          <span className="room-card-arrow text-base text-neutral-600" aria-hidden>
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
