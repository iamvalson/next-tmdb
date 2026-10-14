import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { LoginButton } from "@/features/auth/components/LoginButton";
import { getCurrentUser } from "@/features/auth/session";
import { safeAuthRedirect } from "@/features/auth/redirect";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: `Sign in | ${siteConfig.name}` };

export default function LoginPage({ searchParams }: PageProps<"/login">) {
  return (
    <Suspense
      fallback={
        <Skeleton
          className="h-64 w-full rounded-xl"
          aria-label="Loading sign-in"
        />
      }
    >
      <LoginContent searchParams={searchParams} />
    </Suspense>
  );
}

async function LoginContent({
  searchParams,
}: Pick<PageProps<"/login">, "searchParams">) {
  const [user, query] = await Promise.all([getCurrentUser(), searchParams]);
  const callbackUrl = safeAuthRedirect(query.callbackUrl);
  if (user) redirect(callbackUrl);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1>Sign in to explore movies</h1>
        </CardTitle>
        <CardDescription>
          Use your GitHub account to browse movies, cast members, and
          filmographies.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {query.error && (
          <ErrorMessage
            title="Unable to sign in"
            message="GitHub sign-in could not be completed. Please try again."
          />
        )}
        <LoginButton callbackUrl={callbackUrl} />
      </CardContent>
    </Card>
  );
}
