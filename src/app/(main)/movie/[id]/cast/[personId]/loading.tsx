import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonGrid } from "@/components/shared/SkeletonGrid";

export default function PersonLoading() {
  return (
    <div className="space-y-8">
      <div aria-hidden="true" className="space-y-8">
        <Skeleton className="h-5 w-48" />
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          <Skeleton className="mx-auto aspect-[2/3] w-full max-w-xs shrink-0 rounded-xl md:mx-0 md:w-64" />
          <div className="flex-1 space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {Array.from({ length: 3 }, (_, index) => (
                <Skeleton key={index} className="h-12" />
              ))}
            </div>
            <Skeleton className="h-6 w-32" />
            <div className="space-y-3">
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} className="h-4" />
              ))}
            </div>
          </div>
        </div>
        <Skeleton className="h-8 w-40" />
      </div>
      <SkeletonGrid label="Loading cast member and filmography…" />
    </div>
  );
}
