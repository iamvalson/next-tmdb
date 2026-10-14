import {
  DEFAULT_CATEGORY,
  movieCategories,
  type MovieCategory,
} from "@/config/site";
import { TmdbError, tmdbFetch } from "@/lib/tmdb/client";
import type { CastMember, Credits, MovieDetails, MovieList } from "./types";

/** Dashboard list. Unknown categories fall back to the default. */
export async function getMovies(category: string = DEFAULT_CATEGORY, page = 1) {
  const match =
    movieCategories.find((c) => c.value === (category as MovieCategory)) ??
    movieCategories[0];

  return tmdbFetch<MovieList>(match.endpoint, { params: { page } });
}

/** Returns null on 404 so the page can call notFound(). */
export async function getMovie(
  id: string | number,
): Promise<MovieDetails | null> {
  try {
    return await tmdbFetch<MovieDetails>(`/movie/${id}`);
  } catch (error) {
    if (error instanceof TmdbError && error.status === 404) return null;
    throw error;
  }
}

export async function getCast(
  id: string | number,
  limit = 20,
): Promise<CastMember[]> {
  const credits = await tmdbFetch<Credits>(`/movie/${id}/credits`);
  return credits.cast.slice(0, limit);
}
