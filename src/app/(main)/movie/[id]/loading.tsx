import { Skeleton } from "@/components/ui/skeleton";

export default function MovieLoading() {
  return (
    <div role="status" aria-busy="true">
      <span className="sr-only">Loading movie details…</span>
      <div aria-hidden="true" className="space-y-8">
        <Skeleton className="h-5 w-40" />
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          <Skeleton className="mx-auto aspect-[2/3] w-full max-w-xs shrink-0 rounded-xl md:mx-0 md:w-64" />
          <div className="flex-1 space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }, (_, index) => (
                <Skeleton key={index} className="h-12" />
              ))}
            </div>
            <div className="space-y-3">
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} className="h-4" />
              ))}
            </div>
          </div>
        </div>
        <Skeleton className="h-8 w-24" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="aspect-[2/3] rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
