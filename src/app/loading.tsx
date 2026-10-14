import { PageHeader } from "@/components/shared/PageHeader";
import { SkeletonGrid } from "@/components/shared/SkeletonGrid";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Loading…"
        description="Your content will be ready shortly."
      />
      <SkeletonGrid label="Loading page content…" />
    </main>
  );
}
