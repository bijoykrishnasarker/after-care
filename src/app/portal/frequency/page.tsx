import { FrequencyRoom } from "@/components/portal/frequency/FrequencyRoom";
import { requirePortalSession } from "@/lib/portal-auth";

export default async function FrequencyPage() {
  await requirePortalSession();
  return <FrequencyRoom />;
}
