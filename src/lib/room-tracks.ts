import type { RoomSlug } from "@/lib/rooms";

export type RoomTrack = {
  id: string;
  title: string;
  src: string;
};

export const roomTracks: Record<RoomSlug, RoomTrack[]> = {
  collapse: [
    { id: "collapse-01", title: "Ground Zero", src: "/audio/collapse/01.mp3" },
    { id: "collapse-02", title: "Aftershock", src: "/audio/collapse/02.mp3" },
    { id: "collapse-03", title: "Still Falling", src: "/audio/collapse/03.mp3" },
  ],
  withdrawal: [
    { id: "withdrawal-01", title: "Going Quiet", src: "/audio/withdrawal/01.mp3" },
    { id: "withdrawal-02", title: "Empty Room", src: "/audio/withdrawal/02.mp3" },
    { id: "withdrawal-03", title: "First Breath", src: "/audio/withdrawal/03.mp3" },
  ],
  ghost: [
    { id: "ghost-01", title: "Muscle Memory", src: "/audio/ghost/01.mp3" },
    { id: "ghost-02", title: "Reach", src: "/audio/ghost/02.mp3" },
    { id: "ghost-03", title: "Nowhere to Land", src: "/audio/ghost/03.mp3" },
  ],
  mirror: [
    { id: "mirror-01", title: "What You Saw", src: "/audio/mirror/01.mp3" },
    { id: "mirror-02", title: "Reflection", src: "/audio/mirror/02.mp3" },
    { id: "mirror-03", title: "Unfiltered", src: "/audio/mirror/03.mp3" },
  ],
  frequency: [
    { id: "frequency-01", title: "Signal Return", src: "/audio/frequency/01.mp3" },
    { id: "frequency-02", title: "Tuning In", src: "/audio/frequency/02.mp3" },
    { id: "frequency-03", title: "Resonance", src: "/audio/frequency/03.mp3" },
  ],
  exit: [
    { id: "exit-01", title: "Leaving Slow", src: "/audio/exit/01.mp3" },
    { id: "exit-02", title: "Door Open", src: "/audio/exit/02.mp3" },
    { id: "exit-03", title: "Crossing Out", src: "/audio/exit/03.mp3" },
  ],
  arrival: [
    { id: "arrival-01", title: "Soft Landing", src: "/audio/arrival/01.mp3" },
    { id: "arrival-02", title: "New Ground", src: "/audio/arrival/02.mp3" },
    { id: "arrival-03", title: "Hold", src: "/audio/arrival/03.mp3" },
  ],
};

export function getRoomTracks(slug: RoomSlug) {
  return roomTracks[slug];
}
