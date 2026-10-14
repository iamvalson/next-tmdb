# Next-TMDB Movie Explorer

A movie explorer built for an industrial training project with Next.js App Router, TypeScript, TMDB, and GitHub authentication.

## Features

- GitHub sign-in and sign-out using Auth.js v5.
- Protected dashboard, movie details, and nested cast-member profiles.
- Trending, Popular, Top Rated, and Upcoming filters stored in the URL.
- Responsive movie and cast grids with missing-image fallbacks.
- Person biographies and popularity-ordered filmography linking back to movies.
- Route-specific loading skeletons, not-found screens, and an application error boundary.

## Requirements and stack

Use Node.js 20.9 or newer and pnpm 10.33.2. The `packageManager` field records the pnpm version; use pnpm for dependency management.

The project uses Next.js 16.4.0, React 19.3.0, strict TypeScript, Tailwind CSS, shadcn components backed by Base UI, Auth.js v5 beta, Zod, Lucide, and Prettier with its Tailwind plugin. Native server-side `fetch` handles TMDB requests.

## Local setup

1. Install the locked dependencies:

   ```powershell
   pnpm install --frozen-lockfile
   ```

2. Create your local environment file if it does not already exist:

   ```powershell
   Copy-Item .env.example .env.local
   ```

   Fill in your own credentials. Keep an existing `.env.local` when updating the project.

3. Get a TMDB API credential and register a GitHub OAuth app for local development. Configure:

   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

   Put the GitHub client ID and client secret into `.env.local`. The app uses an OAuth app, not a GitHub personal access token.

4. Generate an authentication secret and copy the output into `AUTH_SECRET`:

   ```powershell
   pnpm exec node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
   ```

5. Start the application:

   ```powershell
   pnpm dev
   ```

   Open `http://localhost:3000`. The homepage redirects to the dashboard; signed-out visitors continue to login. Restart the development server after changing environment variables.

## Environment variables

| Variable             | Purpose                                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TMDB_API_KEY`       | Required TMDB v3 API key or API Read Access Token. The wrapper uses a query parameter for a key or Bearer authorization for a token beginning with `eyJ`. |
| `TMDB_BASE_URL`      | API base URL; defaults to `https://api.themoviedb.org/3`.                                                                                                 |
| `AUTH_SECRET`        | Required secret used by Auth.js to protect session tokens.                                                                                                |
| `AUTH_GITHUB_ID`     | Required GitHub OAuth app client ID.                                                                                                                      |
| `AUTH_GITHUB_SECRET` | Required GitHub OAuth app client secret.                                                                                                                  |

Zod validates configuration in `src/lib/env.ts`. That module is server-only. `.env.local` is ignored by Git; `.env.example` contains placeholders and is tracked.

For a hosted installation, configure the real HTTPS origin and its matching GitHub OAuth callback. `AUTH_URL` can specify the public origin when Auth.js cannot infer it correctly. `trustHost` is enabled in `auth.ts`, so the hosting setup must supply trusted host and forwarded headers. Keep a stable `AUTH_SECRET` across application instances.

## Commands

| Command             | Purpose                                                      |
| ------------------- | ------------------------------------------------------------ |
| `pnpm dev`          | Development server.                                          |
| `pnpm lint`         | ESLint checks.                                               |
| `pnpm format`       | Apply Prettier formatting.                                   |
| `pnpm format:check` | Check formatting without changing files.                     |
| `pnpm build`        | Production compilation, TypeScript checks, and prerendering. |
| `pnpm start`        | Serve the completed production build.                        |

To verify and run the production version locally:

```powershell
pnpm lint
pnpm format:check
pnpm build
pnpm start
```

The build may download fonts through `next/font`. Serving uncached movie data and images requires access to TMDB; completing OAuth requires access to GitHub.

## Folder structure

```text
auth.ts                         Auth.js configuration and exports
next.config.ts                  Cache Components, image hosts, and build configuration
.env.example                    Environment template
src/
  proxy.ts                      Early redirects for protected routes
  app/
    layout.tsx                  Root document, fonts, and metadata
    page.tsx                    Redirect to /dashboard
    loading.tsx                 General loading fallback
    error.tsx                   Unexpected-error UI with retry
    not-found.tsx               Unmatched URL screen
    api/auth/[...nextauth]/      Auth.js GET and POST handlers
    (auth)/
      layout.tsx                Centered authentication layout
      login/page.tsx            GitHub login and auth error messages
    (main)/
      layout.tsx                Navbar, main content, and footer
      dashboard/                Category-filtered movie grid and loading state
      movie/[id]/               Movie details, cast, loading, and not-found
        cast/[personId]/        Person profile, filmography, loading, and not-found
  features/
    auth/                       Actions, session checks, redirects, and account UI
    movies/                     Typed services and movie presentation components
    people/                     Typed services, profiles, and filmography
  components/
    ui/                         shadcn primitives
    layout/                     Navbar and footer
    shared/                     Headers, error messages, and skeleton grids
  lib/
    env.ts                      Server-only environment validation
    utils.ts                    Formatting and class-name helpers
    tmdb/client.ts              Shared fetch, credentials, errors, and caching
    tmdb/image.ts               Image URL construction
  config/site.ts                Site details and movie categories
  types/next-auth.d.ts           Session user ID type augmentation
```

Parentheses identify route groups; `(auth)` and `(main)` do not appear in URLs. Square brackets identify dynamic segments. `src/proxy.ts` sits beside `src/app`, following this installed Next.js version's convention.

## How it works

### Authentication

GitHub identifies the user through OAuth. Auth.js processes the callback and stores an encrypted JWT session in a cookie. This implementation does not need a session database. The session callback adds the user ID, and TypeScript augmentation describes that field.

Proxy checks sessions before dashboard and movie routes render. Each protected page also calls `requireUser()` before fetching TMDB data. The original destination is preserved during login; return destinations are restricted to local dashboard or movie paths.

Login and logout use forms connected to server actions. Account information is read on the server and passed to the menu. Session reads depend on request cookies, so the navbar and login page place them behind Suspense boundaries rather than including them in shared cached HTML.

### Server data and presentation

The request flow is:

```text
Page -> feature service -> tmdbFetch -> TMDB
Page -> typed data -> presentation component
```

Pages select the needed data and compose the UI. Services know about endpoints and prepare results. `tmdbFetch` handles URL joining, credentials, query parameters, HTTP errors, and the default one-hour revalidation lifetime. Revalidation controls freshness; it is not a scheduled hourly API request.

TypeScript describes expected data but does not validate each incoming JSON field at runtime. Environment configuration is validated at runtime with Zod.

### Filtering and nested details

The dashboard awaits promised `searchParams`. Its selected category determines both the service request and active filter link. Missing, unknown, or repeated categories select Trending. The URL makes the selection bookmarkable and preserves browser history.

A movie page awaits `params.id`. A person page receives both `params.id` and `params.personId`. Positive safe-integer validation rejects invalid IDs before TMDB requests. Independent requests run concurrently with `Promise.all`.

The parent movie provides context and a back link for a person profile. The nested page verifies that the movie and person exist; it does not independently enforce cast membership. Filmography retains the service's popularity ordering, poster filter, and 24-credit limit, then removes duplicate movie cards. Movie cards link back to the same movie-detail route.

### Loading, missing data, and errors

`loading.tsx` supplies an automatic Suspense fallback while a route waits. The shared layout remains available, and reserved image ratios reduce layout shifts. Cached or prefetched navigation may finish before a loading skeleton is visible.

Services return `null` for a missing detail resource. Pages call `notFound()` to render the nearest not-found screen. Empty arrays are valid results with dedicated empty-state messages. Other failures propagate to the root error boundary, whose `retry()` callback re-fetches and re-renders the failed segment.

An unmatched URL returns HTTP 404. For a missing resource discovered after streaming starts, Next.js can keep HTTP 200 while showing not-found UI and adding `noindex`. The root error boundary does not catch errors inside the root layout itself.

### Accessibility and styling

The app includes a keyboard skip link, visible focus styles, descriptive image alternatives, semantic headings, and screen-reader loading messages. Layouts adapt to narrow screens, long text can wrap, and reduced-motion preferences disable skeleton pulsing and shorten animations. Existing dark theme tokens are available through the `.dark` class; a user-facing theme switcher is not included.

## Supervisor demonstration checklist

1. While signed out, open `/dashboard?category=popular`. Show the redirect to login.
2. Complete GitHub sign-in and confirm the original category opens.
3. Refresh, switch categories, and use browser Back/Forward to demonstrate URL state.
4. Open a movie, select a cast member, and open another movie from filmography.
5. Show the profile's back link and session-aware account menu.
6. Check the same journey at mobile and desktop widths, including long content and keyboard navigation.
7. Visit an unmatched URL, then invalid movie and person IDs while signed in.
8. Use React DevTools to toggle Suspense and error boundaries; demonstrate fallback UI and retry after clearing the forced error.
9. Enable the browser's reduced-motion emulation and inspect a loading fallback.
10. Sign out and confirm protected URLs require login again.
11. Run `pnpm lint`, `pnpm format:check`, and `pnpm build`.

Local integration checks use a short-lived synthetic session to exercise session handling, protected pages, and sign-out. They do not replace testing the real GitHub consent and callback flow in a browser.

## Troubleshooting

- **Invalid environment variables:** check the variable names and replace all placeholders in `.env.local`, then restart the server.
- **GitHub callback mismatch:** ensure the protocol, hostname, port, and `/api/auth/callback/github` path match the OAuth app registration. `localhost` and `127.0.0.1` are different origins.
- **Unable to sign in:** confirm the OAuth client ID and secret belong to the same app, then inspect the server log.
- **TMDB request failure:** check the credential and network connection. The wrapper's HTTP status helps distinguish rejected credentials from missing resources.
- **No loading animation during navigation:** cached/prefetched content can arrive immediately. Use React DevTools to inspect the fallback.
- **Version-specific examples differ:** consult the installed guides in `node_modules/next/dist/docs/`. This project uses promised route parameters, `proxy.ts`, and the error boundary's `retry` callback.
