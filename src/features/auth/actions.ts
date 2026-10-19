"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, signOut } from "../../../auth";
import { safeAuthRedirect } from "./redirect";

export async function login(formData: FormData) {
  try {
    await signIn("github", {
      redirectTo: safeAuthRedirect(formData.get("callbackUrl")),
    });
  } catch (error) {
    // Successful sign-in also throws a Next.js redirect; let that propagate.
    if (error instanceof AuthError) redirect("/login?error=SignInFailed");
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}
