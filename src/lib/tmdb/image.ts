const IMAGE_BASE = "https://image.tmdb.org/t/p";

export type PosterSize = "w185" | "w342" | "w500" | "w780";
export type ProfileSize = "w185" | "h632";
export type BackdropSize = "w780" | "w1280" | "original";

/** Returns a full image URL, or null when TMDB has no image */
export function tmdbImage(
  path: string | null | undefined,
  size: PosterSize | ProfileSize | BackdropSize = "w500",
): string | null {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}
