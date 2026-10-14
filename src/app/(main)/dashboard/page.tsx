import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { DEFAULT_CATEGORY, movieCategories, siteConfig } from "@/config/site";
import { CategoryFilter } from "@/features/movies/components/CategoryFilter";
import { MovieGrid } from "@/features/movies/components/MovieGrid";
import { getMovies } from "@/features/movies/services";

export const metadata: Metadata = { title: `Dashboard | ${siteConfig.name}` };

export default async function DashboardPage({
  searchParams,
}: PageProps<"/dashboard">) {
  const { category: requestedCategory } = await searchParams;
  const category =
    movieCategories.find((item) => item.value === requestedCategory)?.value ??
    DEFAULT_CATEGORY;
  const movies = await getMovies(category);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Discover movies"
        description="Find your next watch among trending, popular, top-rated, and upcoming movies."
      />
      <CategoryFilter category={category} />
      <MovieGrid movies={movies.results} />
    </div>
  );
}
