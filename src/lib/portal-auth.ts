import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export async function requirePortalSession() {
  const session = await getSession();
  if (!session) {
    redirect("/portal");
  }
  return session;
}
