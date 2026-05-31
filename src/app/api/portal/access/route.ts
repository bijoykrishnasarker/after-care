import { NextResponse } from "next/server";
import { getGrantByToken } from "@/lib/access-store";
import { createSession } from "@/lib/session";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/portal?error=missing-token", request.url));
  }

  const grant = await getGrantByToken(token);
  if (!grant) {
    return NextResponse.redirect(new URL("/portal?error=invalid-token", request.url));
  }

  await createSession(grant.email);

  return NextResponse.redirect(new URL("/portal/architecture", request.url));
}
