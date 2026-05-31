"use client";

import { RoomExperienceLayout } from "@/components/portal/shared/RoomExperienceLayout";

export function MirrorRoom() {
  return (
    <RoomExperienceLayout
      slug="mirror"
      title="The Mirror"
      bodyCopy="Look at who remains. Not at what was lost, not at what should have been — but at the exact person standing in this room right now. That person survived things they thought would end them. The mirror is not your enemy here."
      quote="I don't recognise myself without the context of us."
      footerLine="Stay with your own reflection today."
      showTitleDivider
      quoteVariant="plain"
      releaseHint="Words vanish when you pause."
      clearReleaseOnPause
    />
  );
}
