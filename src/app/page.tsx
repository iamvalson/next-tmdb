import { getCast, getMovie, getMovies } from "@/features/movies/services";
import { getPerson, getPersonCredits } from "@/features/people/services";
import { tmdbImage } from "@/lib/tmdb/image";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/shared/PageHeader";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { SkeletonGrid } from "@/components/shared/SkeletonGrid";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-4 py-8 sm:px-6 lg:px-8"
      >
        <PageHeader
          title="Shared UI preview"
          description="Preview the building blocks for our movie explorer."
          actions={
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                Jump to section <ChevronDown aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem render={<a href="#loading-preview" />}>
                  Loading preview
                </DropdownMenuItem>
                <DropdownMenuItem render={<a href="#diagnostics" />}>
                  TMDB diagnostics
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        />
        <Card>
          <CardHeader>
            <CardTitle>
              <h2>Profile preview</h2>
            </CardTitle>
            <CardDescription>
              Fallback initials appear when an avatar image is unavailable.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-row items-center gap-3">
            <Avatar size="lg" aria-label="Preview user">
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <p className="text-muted-foreground">Movie explorer</p>
          </CardContent>
        </Card>
        <section className="space-y-3" aria-labelledby="error-preview-title">
          <h2 id="error-preview-title" className="text-lg font-semibold">
            Error preview
          </h2>
          <ErrorMessage
            title="Example error message"
            message="This is a preview. When a request fails, its message can appear here."
          />
        </section>
        <section
          id="loading-preview"
          className="space-y-4"
          aria-labelledby="loading-preview-title"
        >
          <h2 id="loading-preview-title" className="text-lg font-semibold">
            Loading preview
          </h2>
          <SkeletonGrid count={4} label="Loading preview placeholders" />
        </section>
        <section
          id="diagnostics"
          className="space-y-3"
          aria-labelledby="diagnostics-title"
        >
          <h2 id="diagnostics-title" className="text-lg font-semibold">
            TMDB diagnostics
          </h2>
          <Suspense fallback={<p role="status">Loading TMDB data...</p>}>
            <TmdbDiagnostics />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
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
