import { rooms, type Room, type RoomSlug } from "@/lib/rooms";

export function getRoomIndex(slug: RoomSlug) {
  return rooms.findIndex((room) => room.slug === slug);
}

export function getRoomNav(slug: RoomSlug) {
  const index = getRoomIndex(slug);
  const current = rooms[index] as Room;

  return {
    index,
    current,
    next: rooms[index + 1] ?? null,
    prev: rooms[index - 1] ?? null,
  };
}

export function getRoomPath(slug: RoomSlug) {
  return `/portal/${slug}`;
}
