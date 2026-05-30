# PocketBase backend

The backend for d4m13n.dev. A single Go binary providing a SQLite database,
REST API, file storage and an admin UI. Schema and seed data are defined as
**migrations** in [`pb_migrations/`](pb_migrations/) so the database is fully
reproducible — they run automatically on `serve`.

## Collections

| Collection         | Purpose                                   | Public read           |
| ------------------ | ----------------------------------------- | --------------------- |
| `posts`            | Blog posts (markdown `content`)           | only `published = true` |
| `tags`             | Post tags                                 | yes                   |
| `projects`         | Portfolio projects                        | yes                   |
| `contact_messages` | Contact-form submissions                  | no (create-only)      |

## Run locally (without Docker)

Download the matching PocketBase binary (v0.22.21) into this folder, then:

```bash
./pocketbase serve --dir=./pb_data --migrationsDir=./pb_migrations
```

- Admin UI / first-run superuser setup: http://127.0.0.1:8090/_/
- REST API: http://127.0.0.1:8090/api/

## Run with Docker

```bash
docker build -t d4m13n-pocketbase .
docker run -p 8090:8090 -v pb_data:/pb/pb_data d4m13n-pocketbase
```

On first boot, open `/_/` to create your superuser admin account. After that you
can write posts (set **published** + **published_at**), manage tags and edit
projects directly in the admin UI — no redeploy required.

## Writing posts

The `content` field is **markdown**. The frontend renders it with GitHub-flavored
markdown and syntax highlighting, so fenced code blocks, tables and headings all
work. Set `reading_minutes` and an optional `cover` image per post.

## Changing the schema

Generate a new migration by editing collections in the admin UI, then run
`./pocketbase migrate collections` to snapshot the change into `pb_migrations/`,
or hand-write a migration following the existing files. Commit the result so the
change deploys reproducibly.
