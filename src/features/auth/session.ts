import "server-only";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { safeAuthRedirect } from "./redirect";

export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function requireUser(returnTo: string) {
  const user = await getCurrentUser();
  if (!user)
    redirect(
      `/login?callbackUrl=${encodeURIComponent(safeAuthRedirect(returnTo))}`,
    );
  return user;
}
