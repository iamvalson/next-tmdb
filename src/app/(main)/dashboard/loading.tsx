import { PageHeader } from "@/components/shared/PageHeader";
import { SkeletonGrid } from "@/components/shared/SkeletonGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { movieCategories } from "@/config/site";

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Discover movies"
        description="Find your next watch among trending, popular, top-rated, and upcoming movies."
      />
      <div aria-hidden="true" className="flex flex-wrap gap-2">
        {movieCategories.map((category) => (
          <Skeleton key={category.value} className="h-10 w-24 rounded-lg" />
        ))}
      </div>
      <SkeletonGrid label="Loading movies…" />
    </div>
  );
}
