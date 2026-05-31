export const rooms = [
  {
    slug: "collapse",
    number: "01",
    name: "The Collapse",
    line1: "Where the structure falls.",
    line2: "The beginning of the end.",
  },
  {
    slug: "withdrawal",
    number: "02",
    name: "The Withdrawal",
    line1: "The quiet after the storm.",
    line2: "The body knows when to go still.",
  },
  {
    slug: "ghost",
    number: "03",
    name: "The Ghost",
    line1: "Conversations with shadows.",
    line2: "Love with nowhere to land.",
  },
  {
    slug: "mirror",
    number: "04",
    name: "The Mirror",
    line1: "Facing the reflection.",
    line2: "Who remains when it's gone.",
  },
  {
    slug: "frequency",
    number: "05",
    name: "The Frequency",
    line1: "Tuning into a new signal.",
    line2: "Something is shifting beneath the static.",
  },
  {
    slug: "exit",
    number: "06",
    name: "The Exit",
    line1: "The doorway out.",
    line2: "Not an erasure, a departure.",
  },
  {
    slug: "arrival",
    number: "07",
    name: "The Arrival",
    line1: "You survived.",
    line2: "Now you breathe.",
    isFinal: true,
  },
] as const;

export type Room = (typeof rooms)[number];
export type RoomSlug = Room["slug"];

export function getRoom(slug: string) {
  return rooms.find((room) => room.slug === slug);
}

export const mainRooms = rooms.filter(
  (room) => !("isFinal" in room && room.isFinal),
);
export const finalRoom = rooms.find(
  (room) => "isFinal" in room && room.isFinal,
)!;
