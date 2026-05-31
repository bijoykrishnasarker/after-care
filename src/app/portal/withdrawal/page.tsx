import { WithdrawalRoom } from "@/components/portal/withdrawal/WithdrawalRoom";
import { requirePortalSession } from "@/lib/portal-auth";

export default async function WithdrawalPage() {
  await requirePortalSession();
  return <WithdrawalRoom />;
}
