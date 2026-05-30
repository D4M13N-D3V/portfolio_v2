/// <reference path="../pb_data/types.d.ts" />

// Seed the database with real projects, starter tags and a first blog post so
// the site has content on first boot. Safe to run once; the down migration
// removes the seeded records.

const POST_CONTENT = `Most of my day-to-day work now runs through an AI-assisted workflow. Here is how I have my environment wired up so the tooling actually accelerates real engineering instead of getting in the way.

## The shape of the setup

I treat AI tooling like any other part of my toolchain: it lives next to the editor, the terminal and the container runtime, and it has access to exactly the context it needs — no more.

- **Editor + agent in the loop.** I keep an agentic coding assistant attached to the repo so it can read the actual source, run commands, and propose diffs I review before they land.
- **Project memory.** A \`CLAUDE.md\` at the repo root documents the architecture, the commands, and the conventions. This is the single biggest quality lever.
- **Everything containerized.** Postgres, the API and the frontend all come up with one \`docker compose up\`, so the agent (and I) can verify changes end-to-end.

## CLAUDE.md is the contract

When the commands and the architecture are written down, the assistant follows them instead of inventing its own.

\`\`\`markdown
# CLAUDE.md
## Development Commands
- \`docker compose up --build -d\` — start the full stack
- \`npm run dev\` — frontend with hot reload
## Architecture
- Layered .NET API (Http.Api → Core.Application → Infrastructure)
- Next.js App Router frontend talking to PocketBase
\`\`\`

## Guardrails that matter

1. **Review every diff.** The agent proposes; I decide.
2. **Let it run the verification.** Tests, type checks and a quick smoke test catch most regressions.
3. **Keep secrets out.** Env files are git-ignored and mounted read-only.

That combination — real repository access, written-down conventions, and one-command verification — turns the assistant into something that can carry a feature from idea to a reviewable, tested diff.`;

const PROJECTS = [
  {
    title: 'MechanicBuddy',
    slug: 'mechanicbuddy',
    description:
      'A self-hosted workshop management platform for vehicle service centers — work orders, client/vehicle profiles, inventory, invoicing and PDF generation. Layered .NET 9 API with NHibernate and a Next.js frontend, shipped as a Docker Compose stack.',
    technologies: ['.NET 9', 'ASP.NET Core', 'NHibernate', 'PostgreSQL', 'Next.js', 'Docker'],
    category: 'software',
    repo_url: '',
    demo_url: 'https://mechanicbuddy.app/',
    featured: true,
    sort: 1,
  },
  {
    title: 'Commissions.app',
    slug: 'commissions-app',
    description:
      'An art-commission SaaS platform that lets creatives sell their services without heavy moderation. .NET 8 microservice API, a Next.js + Auth0 UI, and Kubernetes delivery via ArgoCD/Helm.',
    technologies: ['.NET 8', 'Microservices', 'Next.js', 'Auth0', 'Kubernetes', 'ArgoCD'],
    category: 'software',
    repo_url: 'https://github.com/D4M13N-D3V/art_platform',
    demo_url: '',
    featured: true,
    sort: 2,
  },
  {
    title: 'meilisearch.NET',
    slug: 'meilisearch-net',
    description:
      'A NuGet package that embeds MeiliSearch directly into a C# application — managing the background process, health checks and API-key lifecycle so you can add full-text search without running a separate service.',
    technologies: ['.NET 8', 'C#', 'MeiliSearch', 'NuGet', 'Ollama'],
    category: 'oss',
    repo_url: 'https://git.d4m13n.dev/damien/meilisearch.NET',
    demo_url: '',
    featured: true,
    sort: 3,
  },
  {
    title: 'CPU-Optimized Classification LLM',
    slug: 'classification-llm',
    description:
      'A custom, lightweight LLM fine-tuned for CPU execution that reached 92% top-3 accuracy for URL categorization at a fraction of the compute cost, backed by an event-driven MLOps pipeline.',
    technologies: ['LLM Fine-Tuning', 'MLOps', 'Python', 'Kubernetes', 'CI/CD'],
    category: 'software',
    repo_url: '',
    demo_url: '',
    featured: false,
    sort: 4,
  },
];

migrate(
  (db) => {
    const dao = new Dao(db);

    // ---- tags ----
    const tagsCol = dao.findCollectionByNameOrId('tags');
    const tagDefs = [
      { name: 'AI', slug: 'ai' },
      { name: 'Dev Tools', slug: 'dev-tools' },
      { name: 'Self-Hosting', slug: 'self-hosting' },
      { name: '.NET', slug: 'dotnet' },
    ];
    const tagIds = {};
    for (const t of tagDefs) {
      const rec = new Record(tagsCol, t);
      dao.saveRecord(rec);
      tagIds[t.slug] = rec.id;
    }

    // ---- projects ----
    const projectsCol = dao.findCollectionByNameOrId('projects');
    for (const p of PROJECTS) {
      const rec = new Record(projectsCol, p);
      dao.saveRecord(rec);
    }

    // ---- first post ----
    const postsCol = dao.findCollectionByNameOrId('posts');
    const post = new Record(postsCol, {
      title: 'How I Set Up My Environment for AI-Assisted Development',
      slug: 'how-i-set-up-my-ai-development-environment',
      excerpt:
        'My day-to-day now runs through an AI-assisted workflow. Here is how I wire up the editor, project memory and a containerized stack so the tooling accelerates real engineering.',
      content: POST_CONTENT,
      published: true,
      published_at: '2026-05-20 12:00:00.000Z',
      reading_minutes: 4,
    });
    post.set('tags', [tagIds['ai'], tagIds['dev-tools']]);
    dao.saveRecord(post);
  },
  (db) => {
    const dao = new Dao(db);

    const safeDelete = (collection, filter) => {
      try {
        const records = dao.findRecordsByFilter(collection, filter, '', 200, 0);
        for (const r of records) dao.deleteRecord(r);
      } catch (_) {
        /* ignore */
      }
    };

    safeDelete('posts', 'slug = "how-i-set-up-my-ai-development-environment"');
    safeDelete('projects', 'slug != ""');
    safeDelete('tags', 'slug != ""');
  },
);
