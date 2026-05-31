"use client";

import { RoomExperienceLayout } from "@/components/portal/shared/RoomExperienceLayout";

export function GhostRoom() {
  return (
    <RoomExperienceLayout
      slug="ghost"
      title="The Ghost"
      bodyCopy="You reach for them in the morning. In the small habits — the way you still cook for two, the way your fingers move toward a phone to share something funny. Grief lives in the muscle memory. This is not a malfunction. This is love with nowhere to land."
      quote="I keep turning to tell you something. Then I remember."
      footerLine="Let yourself miss them. It is allowed."
      quoteVariant="left-border"
      releaseHint="Words vanish when you pause."
      clearReleaseOnPause
    />
  );
}
