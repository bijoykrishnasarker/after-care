import { PortalArchitecture } from "@/components/portal/architecture/PortalArchitecture";
import { requirePortalSession } from "@/lib/portal-auth";

export default async function ArchitecturePage() {
  await requirePortalSession();
  return <PortalArchitecture />;
}
