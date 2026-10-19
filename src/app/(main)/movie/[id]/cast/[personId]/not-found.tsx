import Link from "next/link";
import { UserRound } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function PersonNotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <UserRound aria-hidden="true" className="size-12 text-muted-foreground" />
      <h1 className="text-3xl font-semibold">Cast member not found</h1>
      <p className="max-w-md text-muted-foreground">
        The requested movie or person is unavailable. Browse the dashboard to
        explore another cast.
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
