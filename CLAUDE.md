# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Project Overview

`d4m13n.dev` — Damien Ostler's portfolio and blog. A **Next.js 15** (App Router)
frontend backed by **PocketBase**. Blog posts and projects are authored in the
PocketBase admin UI and rendered as markdown. Deploys via Docker Compose (see the
`portfolio-deploy` repo) behind Caddy — no Kubernetes.

## Development Commands

```bash
# Frontend (needs PocketBase running on :8090)
npm install
npm run dev          # dev server at http://localhost:3000
npm run build        # production build (standalone output)
npm run lint

# PocketBase
docker compose up pocketbase -d     # or run the native binary, see pocketbase/README.md

# Full stack in Docker
docker compose up --build           # web :3000, pocketbase :8090
```

## Architecture

- **`src/app/`** — App Router pages. `/`, `/projects`, `/blog`, `/blog/[slug]`,
  `/about`, plus `sitemap.ts` and the `rss.xml` route handler. Pages are server
  components that fetch via `src/lib/content.ts` with `revalidate = 60`.
- **`src/lib/pocketbase.ts`** — PocketBase client factory. Server-side fetches use
  `POCKETBASE_INTERNAL_URL`; the browser uses `NEXT_PUBLIC_POCKETBASE_URL`. Build
  absolute file URLs with `fileUrl()`.
- **`src/lib/content.ts`** — data fetchers (`getPosts`, `getPost`, `getProjects`,
  `getTags`). Each **falls back** to bundled sample data in `src/data/` when
  PocketBase is unreachable, so `npm run build` never fails on a cold DB.
- **`src/data/`** — `resume.ts` (drives `/about`), plus `projects.ts` / `posts.ts`
  fallback content that mirrors the PocketBase seed.
- **`pocketbase/pb_migrations/`** — schema + seed as v0.22 migrations. The pinned
  PocketBase version in `pocketbase/Dockerfile` must match this migration API.

## Conventions

- Styling is MUI with a dark theme + cyan accent (`#4fd1ff`), defined in
  `src/components/ThemeRegistry/theme.ts` (exported as `ACCENT`).
- Post `content` is **markdown**, rendered by `src/components/Markdown.tsx`
  (GFM + raw HTML + heading slugs + `rehype-highlight`).
- `NEXT_PUBLIC_*` values are inlined at build time — they must be passed as Docker
  build args, not just runtime env.

## Gotchas

- Changing the PocketBase schema means writing a new migration in `pb_migrations/`
  (and committing it) — don't mutate the DB out of band, or deploys drift.
- When bumping the PocketBase image version, re-verify migrations apply:
  `pocketbase migrate up --migrationsDir=./pocketbase/pb_migrations`.
