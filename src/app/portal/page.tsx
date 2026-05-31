import { redirect } from "next/navigation";
import { PortalLogin } from "@/components/portal/PortalLogin";
import { getSession } from "@/lib/session";

type PortalPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  "missing-token": "Access link is missing a token.",
  "invalid-token": "This access link is invalid or expired.",
};

export default async function PortalPage({ searchParams }: PortalPageProps) {
  const session = await getSession();
  const params = await searchParams;

  if (session) {
    redirect("/portal/architecture");
  }

  return (
    <PortalLogin errorMessage={params.error ? errorMessages[params.error] : null} />
  );
}
