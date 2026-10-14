export const siteConfig = {
  name: "Next-TMDB",
  description:
    "Discover trending movies, explore cast members, and dive into their filmographies.",
  navLinks: [{ label: "Dashboard", href: "/dashboard" }],
} as const;

/** Dashboard categories. `value` maps to a TMDB endpoint. */
export const movieCategories = [
  { label: "Trending", value: "trending", endpoint: "/trending/movie/week" },
  { label: "Popular", value: "popular", endpoint: "/movie/popular" },
  { label: "Top Rated", value: "top_rated", endpoint: "/movie/top_rated" },
  { label: "Upcoming", value: "upcoming", endpoint: "/movie/upcoming" },
] as const;

export type MovieCategory = (typeof movieCategories)[number]["value"];

export const DEFAULT_CATEGORY: MovieCategory = "trending";
