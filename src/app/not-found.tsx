import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { SearchX } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Page not found | ${siteConfig.name}`,
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <SearchX aria-hidden="true" className="size-12 text-muted-foreground" />
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        The page you requested doesn’t exist. Visit the dashboard to explore
        movies.
      </p>
      <Link
        href="/dashboard"
        className={buttonVariants({ variant: "outline" })}
      >
        Back to dashboard
      </Link>
    </main>
  );
}
