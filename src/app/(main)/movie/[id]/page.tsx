import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site";
import { MovieHero } from "@/features/movies/components/MovieHero";
import { CastList } from "@/features/movies/components/CastList";
import { getCast, getMovie } from "@/features/movies/services";
import { requireUser } from "@/features/auth/session";

export const metadata: Metadata = {
  title: `Movie details | ${siteConfig.name}`,
};

export default async function MoviePage({ params }: PageProps<"/movie/[id]">) {
  const { id } = await params;
  await requireUser(`/movie/${id}`);
  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) notFound();

  const [movie, cast] = await Promise.all([getMovie(id), getCast(id)]);
  if (!movie || cast === null) notFound();

  return (
    <div className="space-y-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
      >
        <ArrowLeft aria-hidden="true" className="size-4" /> Back to dashboard
      </Link>
      <MovieHero movie={movie} />
      <CastList movieId={movie.id} cast={cast} />
    </div>
  );
}
