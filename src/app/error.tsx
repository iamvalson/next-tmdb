"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { Button, buttonVariants } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function AppError({ error, retry }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-semibold">Unable to load this page</h1>
        <ErrorMessage message="Something went wrong while loading your content. Please try again." />
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => retry()}>Try again</Button>
          <Link
            href="/dashboard"
            className={buttonVariants({ variant: "outline" })}
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
