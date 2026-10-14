import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { tmdbImage } from "@/lib/tmdb/image";
import type { CastMember } from "../types";

type CastListProps = { movieId: number; cast: CastMember[] };

export function CastList({ movieId, cast }: CastListProps) {
  return (
    <section aria-labelledby="cast-title" className="space-y-4">
      <h2 id="cast-title" className="text-2xl font-semibold">
        Cast
      </h2>
      {cast.length === 0 ? (
        <p className="text-muted-foreground">
          No cast information is available for this movie.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {cast.map((member) => {
            const profile = tmdbImage(member.profile_path, "w185");
            return (
              <li key={`${member.id}-${member.order}`} className="min-w-0">
                <Link
                  href={`/movie/${movieId}/cast/${member.id}`}
                  className="group block h-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <Card className="h-full gap-0 py-0 transition-shadow group-hover:ring-2 group-hover:ring-primary/40">
                    <div className="relative aspect-[2/3] overflow-hidden bg-muted">
                      {profile ? (
                        <Image
                          src={profile}
                          alt={member.name}
                          fill
                          sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 240px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-2 p-3 text-center text-muted-foreground">
                          <UserRound aria-hidden="true" className="size-8" />
                          <span className="text-sm">Photo unavailable</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="gap-1 p-4">
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {member.character || "Role not listed"}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
