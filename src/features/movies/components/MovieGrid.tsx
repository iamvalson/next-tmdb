import { Film } from "lucide-react";
import type { Movie } from "../types";
import { MovieCard } from "./MovieCard";

export function MovieGrid({ movies }: { movies: Movie[] }) {
  if (movies.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center">
        <Film
          aria-hidden="true"
          className="mx-auto mb-3 size-8 text-muted-foreground"
        />
        <p className="font-medium">No movies found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try another category.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <li key={movie.id} className="min-w-0">
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
}
