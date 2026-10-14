import { TmdbError, tmdbFetch } from "@/lib/tmdb/client";
import type { Person, PersonMovieCredit } from "./types";

export async function getPerson(id: string | number): Promise<Person | null> {
  try {
    return await tmdbFetch<Person>(`/person/${id}`);
  } catch (error) {
    if (error instanceof TmdbError && error.status === 404) return null;
    throw error;
  }
}

/** Their most popular movies that have a poster. */
export async function getPersonCredits(id: string | number, limit = 24) {
  const data = await tmdbFetch<{ cast: PersonMovieCredit[] }>(
    `/person/${id}/movie_credits`,
  );

  return data.cast
    .filter((c) => c.poster_path)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}
