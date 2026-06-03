"use client";

import { RoomExperienceLayout } from "@/components/portal/shared/RoomExperienceLayout";

export function FrequencyRoom() {
  return (
    <RoomExperienceLayout
      slug="frequency"
      title="The Frequency"
      bodyCopy="Something is shifting beneath the static. Faint, almost unrecognisable — but it is a signal that belongs only to you. Before everything, there was a version of you tuned to a different frequency. It has been waiting. It is still there."
      quote="There is a life underneath this grief. I'm just learning to hear it."
      footerLine="Turn the volume up on what is emerging."
      showTitleDivider
      quoteVariant="left-border"
      releaseHint="Works better when you pause."
      clearReleaseOnPause
    />
  );
}
