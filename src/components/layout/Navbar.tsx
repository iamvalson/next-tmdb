import Link from "next/link";
import { Film } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Navbar() {
  return (
    <header className="border-b bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded-md focus:bg-background focus:p-3 focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-sm font-semibold focus-visible:outline-2 focus-visible:outline-ring"
        >
          <Film aria-hidden="true" className="size-5 text-primary" />
          {siteConfig.name}
        </Link>
        <nav aria-label="Main navigation" className="flex flex-wrap gap-4">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
