import Image from "next/image";
import { UserRound } from "lucide-react";
import { tmdbImage } from "@/lib/tmdb/image";
import { formatDate } from "@/lib/utils";
import type { Person } from "../types";

export function PersonProfile({ person }: { person: Person }) {
  const photo = tmdbImage(person.profile_path, "h632");

  return (
    <section
      aria-labelledby="person-title"
      className="flex flex-col gap-8 md:flex-row md:items-start"
    >
      <div className="relative mx-auto aspect-[2/3] w-full max-w-xs shrink-0 overflow-hidden rounded-xl bg-muted md:mx-0 md:w-64">
        {photo ? (
          <Image
            src={photo}
            alt={`Portrait of ${person.name}`}
            fill
            sizes="(max-width: 767px) 320px, 256px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <UserRound aria-hidden="true" className="size-10" />
            <span>Photo unavailable</span>
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1 space-y-6">
        <h1
          id="person-title"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {person.name}
        </h1>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-muted-foreground">Birthday</dt>
            <dd className="mt-1 font-medium">{formatDate(person.birthday)}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Birthplace</dt>
            <dd className="mt-1 font-medium">
              {person.place_of_birth || "Unknown"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Known for</dt>
            <dd className="mt-1 font-medium">
              {person.known_for_department || "Unknown"}
            </dd>
          </div>
        </dl>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Biography</h2>
          <p className="leading-relaxed whitespace-pre-line text-muted-foreground">
            {person.biography || "No biography is available for this person."}
          </p>
        </div>
      </div>
    </section>
  );
}
