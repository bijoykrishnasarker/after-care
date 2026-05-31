import { ArrivalRoom } from "@/components/portal/arrival/ArrivalRoom";
import { requirePortalSession } from "@/lib/portal-auth";

export default async function ArrivalPage() {
  await requirePortalSession();
  return <ArrivalRoom />;
}
