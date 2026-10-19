import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getMovie } from "@/features/movies/services";
import { getPerson, getPersonCredits } from "@/features/people/services";
import { PersonProfile } from "@/features/people/components/PersonProfile";
import { Filmography } from "@/features/people/components/Filmography";
import { requireUser } from "@/features/auth/session";

export const metadata: Metadata = { title: `Cast member | ${siteConfig.name}` };

export default async function PersonPage({
  params,
}: PageProps<"/movie/[id]/cast/[personId]">) {
  const { id, personId } = await params;
  await requireUser(`/movie/${id}/cast/${personId}`);
  if (
    [id, personId].some(
      (value) =>
        !/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(Number(value)),
    )
  )
    notFound();

  const [movie, person, credits] = await Promise.all([
    getMovie(id),
    getPerson(personId),
    getPersonCredits(personId),
  ]);
  if (!movie || !person || credits === null) notFound();

  return (
    <div className="space-y-8">
      <Link
        href={`/movie/${movie.id}`}
        className="inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
      >
        <ArrowLeft aria-hidden="true" className="size-4 shrink-0" /> Back to{" "}
        {movie.title}
      </Link>
      <PersonProfile person={person} />
      <Filmography credits={credits} />
    </div>
  );
}
