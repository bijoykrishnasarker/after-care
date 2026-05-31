import { ThemeBar } from "@/components/theme/ThemeBar";
import { RoomCard } from "@/components/portal/architecture/RoomCard";
import { finalRoom, mainRooms } from "@/lib/rooms";

export function PortalArchitecture() {
  return (
    <main className="min-h-screen bg-app px-6 py-8 text-app sm:px-10 sm:py-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <ThemeBar maxWidth="max-w-6xl" />

        <div className="mt-10 flex flex-col gap-8 border-b border-app/80 pb-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-serif-display text-4xl text-headline sm:text-5xl">
              The Architecture
            </h1>
            <p className="mt-3 text-sm text-neutral-500">
              Seven rooms. One journey. Enter in order.
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
              Access
            </p>
            <p className="mt-2 font-serif-display text-2xl italic text-[#C9A962]">
              Unlocked
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mainRooms.map((room, index) => (
            <RoomCard key={room.slug} room={room} index={index} />
          ))}
        </div>

        <div className="mt-4">
          <RoomCard room={finalRoom} index={6} />
        </div>

        <footer className="mt-16 border-t border-app/80 pt-8 text-center">
          <p className="text-[9px] uppercase tracking-[0.22em] text-neutral-600">
            Zero tracking / Absolute sanctuary / Aftercare Global
          </p>
        </footer>
      </div>
    </main>
  );
}
