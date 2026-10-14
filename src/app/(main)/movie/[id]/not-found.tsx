import Link from "next/link";
import { Film } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function MovieNotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <Film aria-hidden="true" className="size-12 text-muted-foreground" />
      <h1 className="text-3xl font-semibold">Movie not found</h1>
      <p className="max-w-md text-muted-foreground">
        We couldn’t find that movie. Browse the dashboard to discover another
        one.
      </p>
      <Link
        href="/dashboard"
        className={buttonVariants({ variant: "outline" })}
      >
        Back to dashboard
      </Link>
    </div>
  );
}
