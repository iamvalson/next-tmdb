import Link from "next/link";
import { movieCategories, type MovieCategory } from "@/config/site";
import { cn } from "@/lib/utils";

export function CategoryFilter({ category }: { category: MovieCategory }) {
  return (
    <nav aria-label="Movie categories" className="flex flex-wrap gap-2">
      {movieCategories.map((item) => (
        <Link
          key={item.value}
          href={`/dashboard?category=${item.value}`}
          aria-current={category === item.value ? "page" : undefined}
          className={cn(
            "rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            category === item.value
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
