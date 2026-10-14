import { env } from "@/lib/env";
import "server-only";

export class TmdbError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "TmdbError";
  }
}

type FetchOptions = {
  params?: Record<string, string | number | undefined>;
  revalidate?: number; // seconds to cache the response
};

export async function tmdbFetch<T>(
  endpoint: string,
  { params = {}, revalidate = 3600 }: FetchOptions = {},
): Promise<T> {
  const url = new URL(`${env.TMDB_BASE_URL}${endpoint}`);
  const headers: HeadersInit = { Accept: "application/json" };

  // TMDB gives two credentials. A long token starting with "eyJ" is the
  // "API Read Access Token" (Bearer). A short one is the v3 "API Key".
  if (env.TMDB_API_KEY.startsWith("eyJ")) {
    headers.Authorization = `Bearer ${env.TMDB_API_KEY}`;
  } else {
    url.searchParams.set("api_key", env.TMDB_API_KEY);
  }

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  const res = await fetch(url, { headers, next: { revalidate } });

  if (!res.ok) {
    throw new TmdbError(
      res.status,
      `TMDB request failed (${res.status}): ${endpoint}`,
    );
  }

  return res.json() as Promise<T>;
}
