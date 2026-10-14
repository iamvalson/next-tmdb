import { MovieCard } from "@/features/movies/components/MovieCard";
import type { PersonMovieCredit } from "../types";

export function Filmography({ credits }: { credits: PersonMovieCredit[] }) {
  // A person may have several credits for the same movie; show its card once.
  const movies = Array.from(
    new Map(credits.map((credit) => [credit.id, credit])).values(),
  );

  return (
    <section aria-labelledby="filmography-title" className="space-y-4">
      <h2 id="filmography-title" className="text-2xl font-semibold">
        Filmography
      </h2>
      {movies.length === 0 ? (
        <p className="text-muted-foreground">
          No movies are available to display for this person.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <li key={movie.id} className="min-w-0">
              <MovieCard movie={movie} headingLevel={3} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
