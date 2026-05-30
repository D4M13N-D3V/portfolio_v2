# d4m13n.dev — Portfolio & Blog

Personal portfolio and blog for **Damien Ostler** (Senior Full Stack .NET
Developer). A **Next.js** (App Router) frontend backed by **PocketBase**, with a
markdown blog managed from the PocketBase admin UI.

> Looking to deploy this on a VM? See the **[`portfolio-deploy`](../portfolio-deploy)**
> repository, which wires this repo in as a git submodule behind Caddy (automatic
> HTTPS) via Docker Compose — no Kubernetes required.

## Stack

| Layer    | Tech                                                                 |
| -------- | ------------------------------------------------------------------- |
| Frontend | Next.js 15 (App Router), React 18, TypeScript, MUI (dark + cyan)    |
| Content  | PocketBase (SQLite, REST API, admin UI, file storage)              |
| Blog     | Markdown rendered with `react-markdown` + syntax highlighting       |
| SEO      | Metadata API, `sitemap.xml`, `rss.xml`                              |

## Project layout

```
portfolio/
├── src/
│   ├── app/                 # App Router pages: /, /projects, /blog, /about
│   │   ├── blog/[slug]/      # dynamic post page
│   │   ├── rss.xml/          # RSS feed route handler
│   │   └── sitemap.ts        # sitemap
│   ├── components/           # Nav, Hero, cards, Markdown renderer, theme
│   ├── lib/                  # PocketBase client, types, data fetchers
│   └── data/                 # resume + fallback project/post content
├── pocketbase/               # backend: Dockerfile + pb_migrations (schema+seed)
├── Dockerfile                # Next.js standalone image
└── docker-compose.yml        # local single-host stack (web + pocketbase)
```

## Local development

Two services: the PocketBase API and the Next.js dev server.

### 1. Start PocketBase

Either with Docker:

```bash
docker compose up pocketbase -d
```

…or with the native binary (see [`pocketbase/README.md`](pocketbase/README.md)).

The schema and a starter blog post + projects are seeded automatically by the
migrations in `pocketbase/pb_migrations/`. Open http://127.0.0.1:8090/_/ to
create your admin superuser.

### 2. Start the frontend

```bash
cp .env.example .env.local   # adjust if PocketBase isn't on :8090
npm install
npm run dev
```

Open http://localhost:3000.

> The data layer degrades gracefully: if PocketBase is unreachable, pages fall
> back to the bundled sample content in `src/data/`, so `npm run build` always
> succeeds.

### Run the whole stack in Docker

```bash
docker compose up --build
# web:        http://localhost:3000
# pocketbase: http://localhost:8090/_/
```

## Environment variables

| Variable                      | Used by | Description                                            |
| ----------------------------- | ------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_POCKETBASE_URL`  | browser | Public PocketBase origin (inlined at build time)       |
| `POCKETBASE_INTERNAL_URL`     | server  | Internal API URL for SSR (e.g. `http://pocketbase:8090`) |
| `NEXT_PUBLIC_SITE_URL`        | both    | Canonical site URL for SEO / sitemap / RSS             |

## Authoring content

Everything is editable from the PocketBase admin UI without redeploying:

- **Blog posts** — `posts` collection. `content` is markdown. Toggle `published`
  and set `published_at` to go live; add `tags` and an optional `cover` image.
- **Projects** — `projects` collection. `featured` projects appear on the home page.
- **Contact messages** — submissions land in `contact_messages` (admin-only read).

## License

Personal project © Damien Ostler.
