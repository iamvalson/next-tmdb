import type { ReactNode } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-12">
      <Link
        href="/"
        className="rounded-sm text-xl font-semibold focus-visible:outline-2 focus-visible:outline-ring"
      >
        {siteConfig.name}
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </main>
  );
}
