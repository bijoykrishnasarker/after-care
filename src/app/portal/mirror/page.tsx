import { MirrorRoom } from "@/components/portal/mirror/MirrorRoom";
import { requirePortalSession } from "@/lib/portal-auth";

export default async function MirrorPage() {
  await requirePortalSession();
  return <MirrorRoom />;
}
