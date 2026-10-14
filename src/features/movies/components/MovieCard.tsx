import Image from "next/image";
import Link from "next/link";
import { ImageOff, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { tmdbImage } from "@/lib/tmdb/image";
import { formatRating, getYear } from "@/lib/utils";
import type { Movie } from "../types";

type MovieCardProps = {
  movie: Pick<
    Movie,
    "id" | "title" | "poster_path" | "release_date" | "vote_average"
  >;
  headingLevel?: 2 | 3;
};

export function MovieCard({ movie, headingLevel = 2 }: MovieCardProps) {
  const poster = tmdbImage(movie.poster_path);
  const rating = formatRating(movie.vote_average);
  const Title = headingLevel === 3 ? "h3" : "h2";

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group block h-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      <Card className="h-full gap-0 py-0 transition-shadow group-hover:ring-2 group-hover:ring-primary/40">
        <div className="relative aspect-[2/3] overflow-hidden bg-muted">
          {poster ? (
            <Image
              src={poster}
              alt={`${movie.title} poster`}
              fill
              sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, 300px"
              className="object-cover transition-transform motion-safe:group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center text-muted-foreground">
              <ImageOff aria-hidden="true" className="size-8" />
              <span className="text-sm">Poster unavailable</span>
            </div>
          )}
        </div>
        <CardContent className="gap-2 p-4">
          <Title className="line-clamp-2 min-h-10 leading-5 font-semibold">
            {movie.title}
          </Title>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
            <span>{getYear(movie.release_date)}</span>
            <span
              className="inline-flex items-center gap-1"
              aria-label={
                rating === "N/A"
                  ? "Not yet rated"
                  : `Rating: ${rating} out of 10`
              }
            >
              <Star aria-hidden="true" className="size-4 text-amber-500" />
              {rating}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
