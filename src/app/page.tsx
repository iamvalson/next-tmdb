import { getCast, getMovie, getMovies } from "@/features/movies/services";
import { getPerson } from "@/features/people/services";
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
  const movie = await getMovie(first.id);
  const cast = await getCast(first.id, 3);
  const person = await getPerson(cast[0].id);

  console.log("Trending:", trending.results.length, "movies");
  console.log("Movie:", movie?.title, movie?.runtime);
  console.log(
    "Cast:",
    cast.map((c) => c.name),
  );
  console.log("Person:", person?.name);
  console.log("Missing movie:", await getMovie(999999999)); // should be null

  return <p>Check your terminal.</p>;
}
