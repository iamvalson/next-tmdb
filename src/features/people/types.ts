export type Person = {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
};

export type PersonMovieCredit = {
  id: number;
  title: string;
  character: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  popularity: number;
};

export type PersonMovieCredits = {
  id: number;
  cast: PersonMovieCredit[];
};
