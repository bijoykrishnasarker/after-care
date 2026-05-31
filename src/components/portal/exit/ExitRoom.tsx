"use client";

import { RoomExperienceLayout } from "@/components/portal/shared/RoomExperienceLayout";

export function ExitRoom() {
  return (
    <RoomExperienceLayout
      slug="exit"
      title="The Exit"
      bodyCopy="The door has always been here. Leaving is not erasure. You carry every room, every feeling, every version of yourself that had to survive to arrive at this threshold. Step through. The world is not the same — neither are you. That is the point."
      quote="I walked out. And the world was still there, waiting."
      footerLine="This is not an ending, it is a departure."
      showTitleDivider
      quoteVariant="plain"
      releaseHint="Words vanish when you pause."
      clearReleaseOnPause
    />
  );
}
