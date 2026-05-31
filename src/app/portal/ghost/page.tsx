import { GhostRoom } from "@/components/portal/ghost/GhostRoom";
import { requirePortalSession } from "@/lib/portal-auth";

export default async function GhostPage() {
  await requirePortalSession();
  return <GhostRoom />;
}
