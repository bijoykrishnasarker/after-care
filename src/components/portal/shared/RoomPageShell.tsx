import Link from "next/link";
import type { Room } from "@/lib/rooms";

type RoomPageShellProps = {
  room: Room;
  children?: React.ReactNode;
};

export function RoomPageShell({ room, children }: RoomPageShellProps) {
  const isFinal = "isFinal" in room && room.isFinal;

  return (
    <main className="min-h-screen bg-app px-6 py-10 text-app sm:px-10 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/portal/architecture"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-app"
        >
          <span aria-hidden>←</span>
          Back to architecture
        </Link>

        <p className="mt-10 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
          Room {room.number}
        </p>
        <h1
          className={`mt-3 font-serif-display text-4xl italic sm:text-5xl ${
            isFinal ? "text-[#C9A962]" : "text-headline"
          }`}
        >
          {room.name}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-400">
          {room.line1}
          <br />
          {room.line2}
        </p>

        {children ?? (
          <div className="mt-10 border border-dashed border-app bg-surface/40 p-8 text-center">
            <p className="text-sm text-neutral-500">
              Room page design coming next — screenshot onujayi build hobe.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
