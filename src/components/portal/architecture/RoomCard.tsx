"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import type { Room } from "@/lib/rooms";
import { hexToRgb } from "@/lib/room-color";

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

  const onMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      setFromEvent(event);
    },
    [setFromEvent],
  );

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      setFromEvent(event);
    },
    [setFromEvent],
  );

  const onMouseLeave = useCallback(() => {
    setGlow((current) => ({ ...current, on: false }));
  }, []);

  return { glow, onMouseEnter, onMouseMove, onMouseLeave };
}

function CardSpotlight({
  glow,
  color,
}: {
  glow: GlowState;
  color: string;
}) {
  const { r, g, b } = hexToRgb(color);
  const spotClass = `room-card-spotlight${glow.on ? " is-on" : ""}`;

  return (
    <>
      <div
        className={spotClass}
        style={{
          background: glow.on
            ? `radial-gradient(420px circle at ${glow.x}px ${glow.y}px, rgba(${r}, ${g}, ${b}, 0.08), transparent 52%)`
            : undefined,
        }}
        aria-hidden
      />
      <div
        className={spotClass}
        style={{
          background: glow.on
            ? `radial-gradient(180px circle at ${glow.x}px ${glow.y}px, rgba(${r}, ${g}, ${b}, 0.12), transparent 62%)`
            : undefined,
        }}
        aria-hidden
      />
    </>
  );
}

function RoomCursorDot({
  glow,
  color,
}: {
  glow: GlowState;
  color: string;
}) {
  const { r, g, b } = hexToRgb(color);

  return (
    <span
      className={`room-card-cursor-dot${glow.on ? " is-on" : ""}`}
      style={{
        left: glow.on ? glow.x : undefined,
        top: glow.on ? glow.y : undefined,
        backgroundColor: color,
        boxShadow: glow.on
          ? `0 0 6px rgba(${r}, ${g}, ${b}, 0.4), 0 0 14px rgba(${r}, ${g}, ${b}, 0.18)`
          : `0 0 4px rgba(${r}, ${g}, ${b}, 0.28)`,
      }}
      aria-hidden
    />
  );
}

export function RoomCard({ room, index, className = "" }: RoomCardProps) {
  const { glow, onMouseEnter, onMouseMove, onMouseLeave } = useCardSpotlight();
  const isFinal = "isFinal" in room && room.isFinal;
  const cardStyle = { "--room-accent": room.color } as React.CSSProperties;

  if (isFinal) {
    return (
      <Link
        href={`/portal/${room.slug}`}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={cardStyle}
        className={`room-card block${glow.on ? " is-active" : ""} ${className}`}
      >
        <CardSpotlight glow={glow} color={room.color} />

        <div className="relative z-10 flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="room-card-text flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
            <p
              className="font-serif-display text-5xl leading-none opacity-25 sm:text-6xl"
              style={{ color: room.color }}
              aria-hidden
            >
              {room.number}
            </p>
            <div>
              <p
                className="text-[9px] uppercase tracking-[0.22em]"
                style={{ color: room.color }}
              >
                The final room
              </p>
              <h2
                className="mt-2 font-serif-display text-2xl sm:text-3xl"
                style={{ color: room.color }}
              >
                {room.name}
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                {room.line1} {room.line2}
              </p>
            </div>
          </div>
          <span
            className="room-card-arrow self-end text-lg opacity-70 sm:self-center"
            style={{ color: room.color }}
            aria-hidden
          >
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
      style={cardStyle}
      className={`room-card flex min-h-[200px] flex-col p-5 sm:min-h-[220px] sm:p-6${glow.on ? " is-active" : ""} ${className}`}
    >
      <CardSpotlight glow={glow} color={room.color} />
      <RoomCursorDot glow={glow} color={room.color} />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <span className="font-serif-display text-sm text-neutral-600">
            {room.number}
          </span>
          <span className="h-1.5 w-1.5 shrink-0" aria-hidden />
        </div>

        <div className="room-card-text mt-6 flex-1">
          <h2 className="font-serif-display text-xl text-app sm:text-[1.35rem]">
            {room.name}
          </h2>
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
