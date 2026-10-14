export type Genre = { id: number; name: string };

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
};

export type MovieDetails = Movie & {
  runtime: number | null;
  tagline: string;
  genres: Genre[];
  status: string;
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
};

export type MovieList = {
  page: number;
  results: Movie[];
  total_pages: number;
};

export type Credits = {
  id: number;
  cast: CastMember[];
};
