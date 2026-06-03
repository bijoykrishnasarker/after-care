"use client";

import { useCallback, useState, type ReactNode } from "react";
import { hexToRgb } from "@/lib/room-color";

type GlowState = { x: number; y: number; on: boolean };

type RoomColorAmbienceProps = {
  color: string;
  children: ReactNode;
  className?: string;
};

export function RoomColorAmbience({
  color,
  children,
  className = "",
}: RoomColorAmbienceProps) {
  const [glow, setGlow] = useState<GlowState>({ x: 0, y: 0, on: false });
  const { r, g, b } = hexToRgb(color);

  const setFromEvent = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setGlow({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      on: true,
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    setGlow((current) => ({ ...current, on: false }));
  }, []);

  return (
    <div
      className={`room-ambience relative min-h-screen ${className}`.trim()}
      style={{ "--room-accent": color } as React.CSSProperties}
      onMouseEnter={setFromEvent}
      onMouseMove={setFromEvent}
      onMouseLeave={onMouseLeave}
    >
      <div className="room-ambience-base" aria-hidden />
      <div
        className={`room-ambience-spotlight${glow.on ? " is-on" : ""}`}
        style={{
          background: glow.on
            ? `radial-gradient(720px circle at ${glow.x}px ${glow.y}px, rgba(${r}, ${g}, ${b}, 0.09), transparent 58%)`
            : undefined,
        }}
        aria-hidden
      />
      <div
        className={`room-ambience-spotlight${glow.on ? " is-on" : ""}`}
        style={{
          background: glow.on
            ? `radial-gradient(320px circle at ${glow.x}px ${glow.y}px, rgba(${r}, ${g}, ${b}, 0.12), transparent 62%)`
            : undefined,
        }}
        aria-hidden
      />
      {glow.on ? (
        <span
          className="room-ambience-dot is-on"
          style={{
            left: glow.x,
            top: glow.y,
            backgroundColor: color,
            boxShadow: `0 0 8px rgba(${r}, ${g}, ${b}, 0.45), 0 0 18px rgba(${r}, ${g}, ${b}, 0.2)`,
          }}
          aria-hidden
        />
      ) : null}
      <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
    </div>
  );
}
