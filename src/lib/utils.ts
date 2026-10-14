export { cn } from "cn";

export function formatDate(date?: string | null) {
  if (!date) return "Unknown";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatRuntime(minutes?: number | null) {
  if (!minutes) return "N/A";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function formatRating(rating?: number | null) {
  return rating ? rating.toFixed(1) : "N/A";
}

export function getYear(date?: string | null) {
  return date ? new Date(date).getFullYear().toString() : "TBA";
}
