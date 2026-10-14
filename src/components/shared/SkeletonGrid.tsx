import { Skeleton } from "@/components/ui/skeleton";

type SkeletonGridProps = {
  count?: number;
  label?: string;
};

export function SkeletonGrid({
  count = 8,
  label = "Loading content…",
}: SkeletonGridProps) {
  return (
    <div role="status" aria-busy="true">
      <span className="sr-only">{label}</span>
      <div
        aria-hidden="true"
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="aspect-[2/3] w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
