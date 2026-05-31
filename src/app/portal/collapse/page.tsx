import { CollapseRoom } from "@/components/portal/collapse/CollapseRoom";
import { requirePortalSession } from "@/lib/portal-auth";

export default async function CollapsePage() {
  await requirePortalSession();
  return <CollapseRoom />;
}
