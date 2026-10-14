import { getCast, getMovie, getMovies } from "@/features/movies/services";
import { getPerson, getPersonCredits } from "@/features/people/services";
import { tmdbImage } from "@/lib/tmdb/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<p role="status">Loading TMDB data...</p>}>
      <TmdbDiagnostics />
    </Suspense>
  );
}

async function TmdbDiagnostics() {
  const trending = await getMovies("trending");
  const first = trending.results[0];
  console.log("Trending:", trending.results.length, "movies");

  if (first) {
    const [movie, cast] = await Promise.all([
      getMovie(first.id),
      getCast(first.id, 3),
    ]);
    console.log("Movie:", movie?.title, movie?.runtime);
    console.log("Cast:", cast?.map((c) => c.name) ?? cast);
    console.log("Poster:", tmdbImage(movie?.poster_path));

    const firstCastMember = cast?.[0];
    if (firstCastMember) {
      const [person, filmography] = await Promise.all([
        getPerson(firstCastMember.id),
        getPersonCredits(firstCastMember.id),
      ]);
      console.log("Person:", person?.name);
      console.log(
        "Filmography:",
        filmography?.map((credit) => credit.title) ?? filmography,
      );
    } else {
      console.log("Person check skipped: no cast member is available.");
    }
  } else {
    console.log("Detail checks skipped: no trending movies are available.");
  }

  const fallback = await getMovies("unknown-category");
  console.log("Default category fallback:", fallback.results.length, "movies");
  console.log("Missing image:", tmdbImage(null));

  const missingId = 999999999;
  const missingResults = await Promise.all([
    getMovie(missingId),
    getCast(missingId),
    getPerson(missingId),
    getPersonCredits(missingId),
  ]);
  console.log("Missing movie, cast, person, filmography:", missingResults);
  if (missingResults.some((result) => result !== null)) {
    throw new Error("Expected all missing TMDB resources to return null.");
  }

  return <p>Check your terminal.</p>;
}
