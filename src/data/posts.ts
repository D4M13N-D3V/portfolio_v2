import type { Post } from '@/lib/types';

const aiSetupContent = `Most of my day-to-day work now runs through an AI-assisted workflow. Here is how I have my environment wired up so the tooling actually accelerates real engineering instead of getting in the way.

## The shape of the setup

I treat AI tooling like any other part of my toolchain: it lives next to the editor, the terminal and the container runtime, and it has access to exactly the context it needs — no more.

- **Editor + agent in the loop.** I keep an agentic coding assistant attached to the repo so it can read the actual source, run commands, and propose diffs I review before they land.
- **Project memory.** A \`CLAUDE.md\` at the repo root documents the architecture, the commands, and the conventions. This is the single biggest quality lever — the agent stops guessing once it can read how the project really works.
- **Everything containerized.** Postgres, the API and the frontend all come up with one \`docker compose up\`, so the agent (and I) can verify changes end-to-end.

## CLAUDE.md is the contract

The file that makes the difference looks roughly like this:

\`\`\`markdown
# CLAUDE.md

## Development Commands
- \`docker compose up --build -d\` — start the full stack
- \`npm run dev\` — frontend with hot reload
- \`dotnet test\` — run the backend test suite

## Architecture
- Layered .NET API (Http.Api → Core.Application → Infrastructure)
- Next.js App Router frontend talking to PocketBase
\`\`\`

When the commands and the architecture are written down, the assistant follows them instead of inventing its own.

## Guardrails that matter

A few rules keep the workflow safe and fast:

1. **Review every diff.** The agent proposes; I decide. Nothing reaches \`main\` without a read-through.
2. **Let it run the verification.** Tests, type checks and a quick \`docker compose up\` smoke test catch most regressions before I even look.
3. **Keep secrets out.** Env files are git-ignored and mounted read-only; the agent never sees production credentials.

## Why it works

The combination of *real repository access*, *written-down conventions*, and *one-command verification* turns the assistant from a fancy autocomplete into something that can carry a feature from idea to a reviewable, tested diff. That is the whole game.

In the next post I'll walk through the exact Docker Compose stack this very site runs on — Next.js, PocketBase and Caddy on a single VM, no Kubernetes required.`;

/**
 * Build-time fallback posts. Mirrors the shape PocketBase returns (including the
 * `expand.tags` join) so pages render identically whether data comes from the DB
 * or this file. These are also used to seed PocketBase on first run.
 */
export const fallbackPosts: Post[] = [
  {
    id: 'ai-dev-environment',
    slug: 'how-i-set-up-my-ai-development-environment',
    title: 'How I Set Up My Environment for AI-Assisted Development',
    excerpt:
      'My day-to-day now runs through an AI-assisted workflow. Here is how I wire up the editor, project memory and a containerized stack so the tooling accelerates real engineering.',
    content: aiSetupContent,
    cover: '',
    published: true,
    published_at: '2026-05-20T12:00:00.000Z',
    reading_minutes: 4,
    tags: ['tag-ai', 'tag-devtools'],
    expand: {
      tags: [
        { id: 'tag-ai', name: 'AI', slug: 'ai' },
        { id: 'tag-devtools', name: 'Dev Tools', slug: 'dev-tools' },
      ],
    },
    created: '2026-05-20T12:00:00.000Z',
    updated: '2026-05-20T12:00:00.000Z',
  },
];
