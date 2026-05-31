"use client";

import { RoomExperienceLayout } from "@/components/portal/shared/RoomExperienceLayout";

export function WithdrawalRoom() {
  return (
    <RoomExperienceLayout
      slug="withdrawal"
      title="The Withdrawal"
      bodyCopy="The noise has gone quiet. You have retreated — not because you are weak, but because the body knows when to go still. This silence is not absence. It is the first breath after a very long scream."
      quote="If I close my eyes, maybe yesterday will return."
      footerLine="Breathe into the quiet. It is yours."
      showTitleDivider
      quoteVariant="subtle-box"
      releaseHint="Words vanish when you press enter."
      clearReleaseOnEnter
      releasePlaceholder="Type anything, it won't be saved."
    />
  );
}
