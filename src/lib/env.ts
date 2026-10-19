import "server-only";
import { z } from "zod";

const envSchema = z.object({
  TMDB_API_KEY: z.string().min(1, "TMDB_API_KEY is required"),
  TMDB_BASE_URL: z.url().default("https://api.themoviedb.org/3"),

  AUTH_SECRET: z.string().min(1, "AUTH_SECRET is required"),
  AUTH_GITHUB_ID: z.string().min(1, "AUTH_GITHUB_ID is required"),
  AUTH_GITHUB_SECRET: z.string().min(1, "AUTH_GITHUB_SECRET is required"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const invalidVariables = Object.keys(parsed.error.flatten().fieldErrors);

  throw new Error(
    `Invalid environment variables: ${invalidVariables.join(", ")}. ` +
      "Set them in .env.local for local development or in your hosting provider's " +
      "environment settings for the deployment being built, then rebuild.",
  );
}

export const env = parsed.data;
