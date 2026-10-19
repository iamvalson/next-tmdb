export function safeAuthRedirect(value: unknown): string {
  if (typeof value !== "string" || !value.startsWith("/")) return "/dashboard";
  try {
    const destination = new URL(value, "https://local.invalid");
    if (
      destination.origin !== "https://local.invalid" ||
      !/^\/(dashboard|movie)(\/|$)/.test(destination.pathname)
    )
      return "/dashboard";
    return destination.pathname + destination.search;
  } catch {
    return "/dashboard";
  }
}
