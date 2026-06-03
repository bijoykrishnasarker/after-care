"use client";

import { RoomExperienceLayout } from "@/components/portal/shared/RoomExperienceLayout";

export function CollapseRoom() {
  return (
    <RoomExperienceLayout
      slug="collapse"
      title="The Collapse"
      bodyCopy="This is where everything ends. The relationship, the version of yourself you built inside it, the future you mapped out. You are allowed to fall apart here. No witness. No performance. Just the raw physics of loss."
      quote="Everything I thought was permanent dissolved in an instant."
      footerLine="Let the sound hold what words cannot"
      quoteVariant="accent-border"
    />
  );
}
