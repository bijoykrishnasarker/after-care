import { ExitRoom } from "@/components/portal/exit/ExitRoom";
import { requirePortalSession } from "@/lib/portal-auth";

export default async function ExitPage() {
  await requirePortalSession();
  return <ExitRoom />;
}
