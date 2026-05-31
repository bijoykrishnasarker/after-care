import type { Metadata } from "next";
import { LeadMagnetPage } from "@/components/lead-magnet/LeadMagnetPage";

export const metadata: Metadata = {
  title: "Free Guide · Aftercare",
  description: "Download the free Aftercare guide before entering the rooms.",
};

export default function Page() {
  return <LeadMagnetPage />;
}
