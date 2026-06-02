/// <reference path="../pb_data/types.d.ts" />

// Replace the original seeded blog post with the "Many Agents, One Context Layer"
// writeup. We update the existing record (rather than mutating the DB out of band)
// so a fresh boot and an already-seeded deploy converge on the same content. Keep
// this in sync with src/data/posts.ts, which mirrors the seed for the cold-DB
// fallback. The down migration restores the original AI-dev-environment post.

const NEW_CONTENT = `I don't use "an AI assistant." I use five or six of them, each picked for a different job — and the thing that makes that workable isn't any single model. It's a shared context layer underneath all of them. This is a tour of how the whole environment fits together: the agents I reach for, the MCP servers that give every one of them the same view of my work, the local model I run on a 32 GB Mac, and the review loop that keeps me in control.

## The roster — right tool for the job

No single agent wins everything. The skill is matching the task to the tool:

- **Claude Code** — agentic coding at the highest quality. My default for anything that touches code I actually care about.
- **Claude Desktop** — planning, co-work, remote dispatch, and broader agentic tasks.
- **opencode** — a lighter terminal agent, and what I point at my local model.
- **Antigravity** — an agentic IDE, and my backup when Claude Code is busy.
- **OpenClaw** — an always-on personal agent: morning briefings, inbox triage, notes, scheduled jobs.
- **Gemini** (desktop + CLI) — research, document generation, image and video; the CLI doubles as a backup.
- **llama.cpp + Qwen** — a local model for the runs I want to keep offline, private, or simply off the cloud meter.

## Every agent starts blind

Each of these is great in isolation — and isolation is exactly the problem. Open a fresh session and the agent knows nothing about my repositories, my inbox, or what I have loaded in my IDE. For a while I re-explained my world every single session.

The fix is the Model Context Protocol. Instead of teaching every tool about my work separately, I stand up a handful of MCP servers **once** and point all of the clients at them.

## The context layer — four servers, shared by all

| Server | What it gives every agent |
| --- | --- |
| **GitHub** (remote, OAuth) | PRs on my repos, PRs and issues assigned to me, reviews, CI status |
| **Proton Mail Bridge** (local) | Read, search and triage my mail — it never leaves the machine |
| **Rider** (local) | Live context from the JetBrains solution I actually have open |
| **Puppeteer** (local) | Drive a real Chromium — navigate, click, screenshot, smoke-test |

The payoff is that context follows me across tools. I can ask Claude Code to "review the PR assigned to me," ask Antigravity "what changed in the file I have open in Rider," and ask Claude Desktop "did the reviewer email me back about that PR" — and every one of them already has the answer in reach. Fix a server once and every agent benefits; there's no per-tool config to keep in sync.

Only one secret lives in the whole setup — the local Proton Bridge password. GitHub uses OAuth, so there's no token to rotate or leak, and the mail and source-code servers are localhost-only.

## Skills — what the agents reliably *do*

MCP is what the agents can *see*. Skills are what they reliably *do* with it — small, auto-triggered playbooks. The lucky break is that opencode loads the same \`~/.claude/skills/*/SKILL.md\` format as Claude Code and Claude Desktop, so I author each skill once and three tools pick it up. A \`pr-review\` skill pulls a diff and reviews it with live IDE context; \`standup\` stitches together PRs awaiting review, my open PRs, and unread mail about my repos; \`email-to-action\` turns the inbox into a list of things that need a reply. Each is read-only by default — anything that posts a review, pushes, or sends mail asks first.

## The local tier — Qwen on a 32 GB Mac

The part I'm proudest of, and the most honest about, is the local model. A Mac's unified memory means the GPU can see all of the RAM — but 32 GB is *tight* for a model like this. You build \`llama.cpp\` from source (the models are new enough that bugfixes land weekly), download a quantized Qwen small enough to fit, and serve it locally:

\`\`\`bash
llama-server -m ~/models/Qwen3.6-35B-A3B-UD-IQ4_XS.gguf \\
  --mmproj ~/models/mmproj-BF16.gguf \\
  -c 131072 --batch-size 256 -ngl 99 -np 1 \\
  --host 127.0.0.1 --port 8899
\`\`\`

Then I point opencode at \`http://127.0.0.1:8899/v1\` and work with it much like any other agent. A few notes on the knobs: the \`IQ4_XS\` quantization buys back several GB over the more common \`Q4_K_M\`, and you need every one of them; \`-c 131072\` pins context to 128K (Qwen gets confused below that, and 256K won't fit); \`-np 1\` queues requests instead of running them in parallel, which matters when memory is this scarce.

So — is it any good? For *some* tasks, genuinely yes. The classic win is the adapter pattern: "here's a thing that works and a test suite that proves it; build a compatible thing that passes the same tests." Hand it that and a local Qwen will grind out a real implementation — with more guidance than Opus would need, but far less effort than writing it by hand. Where it struggles is anything that won't fit in its head: a large codebase overflows the context window, and the occasional spatial or geometric bug is one it can *name* correctly and then flail at fixing. It'll sometimes print a thinking trace and just stop.

I keep it around anyway, because the question my wife and I keep asking is a real one: as the AI-financing bubble wobbles, how much of this can we run at home? Today it's "cool and useful." On a box with twice the RAM and a stronger GPU it might cross into routinely offloading work from the expensive cloud providers — and that's worth finding out.

## The loop — how a task actually moves

None of this is autopilot. A change moves through a loop with a human gate at every step:

1. **Analyze** the problem with a model, and have it open issues on GitHub — through the same MCP server every other agent uses.
2. **Review** what it filed, leave notes, and have it do a second pass against those notes.
3. **Plan** — have it draft an approach; I tweak and approve before any code is written.
4. **Open a PR**, then review the diff by hand.
5. **Review pass** with my notes and a smoke-test added to the PR, then merge.
6. **Verify** the changes actually landed where they should, and run the smoke test myself.

The thread running through all of it: the agent proposes, I decide. Nothing reaches \`main\` without a read-through.

On top of the interactive loop, OpenClaw runs standing jobs on a schedule — a morning cybersecurity briefing (news, exploits, fresh vulnerabilities), a tech-news digest, and an inbox summary with action items — all reading from the same shared context layer the interactive agents use.

## Why it works

Three things turn this from a pile of novelties into actual leverage:

- **One context layer, many clients.** Re-explaining my world to each tool was the tax; MCP removes it. Fix a server once and every agent gets the benefit.
- **A tiered model strategy.** Cloud Opus for the hard, correctness-critical work; a local model for the cheap, private, or offline runs. The skill is picking the right brain for the job.
- **A loop with a human at every gate.** Review every diff, let the agent run the verification, keep the secrets out of its reach.

That's the whole game: give every agent the same grounded view of my work, keep a person on the decisions, and let each tool do the part it's actually best at.`;

const OLD_CONTENT = `Most of my day-to-day work now runs through an AI-assisted workflow. Here is how I have my environment wired up so the tooling actually accelerates real engineering instead of getting in the way.

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

migrate(
  (db) => {
    const dao = new Dao(db);
    const post = dao.findFirstRecordByFilter(
      'posts',
      'slug = "how-i-set-up-my-ai-development-environment"',
    );

    post.set('title', 'Many Agents, One Context Layer: My AI Engineering Environment');
    post.set('slug', 'many-agents-one-context-layer');
    post.set(
      'excerpt',
      'I run a handful of AI agents — cloud and local — each for a different job, all sharing one MCP context layer for GitHub, email, my IDE and the browser. Here is how the whole environment fits together, down to a local Qwen model on a 32 GB Mac.',
    );
    post.set('content', NEW_CONTENT);
    post.set('published_at', '2026-06-02 12:00:00.000Z');
    post.set('reading_minutes', 7);

    // Add the Self-Hosting tag alongside the existing AI / Dev Tools tags.
    try {
      const selfHosting = dao.findFirstRecordByFilter('tags', 'slug = "self-hosting"');
      const tags = post.get('tags') || [];
      if (selfHosting && tags.indexOf(selfHosting.id) === -1) {
        tags.push(selfHosting.id);
        post.set('tags', tags);
      }
    } catch (_) {
      /* tag is optional — skip if the seed tags aren't present */
    }

    dao.saveRecord(post);
  },
  (db) => {
    const dao = new Dao(db);
    const post = dao.findFirstRecordByFilter('posts', 'slug = "many-agents-one-context-layer"');

    post.set('title', 'How I Set Up My Environment for AI-Assisted Development');
    post.set('slug', 'how-i-set-up-my-ai-development-environment');
    post.set(
      'excerpt',
      'My day-to-day now runs through an AI-assisted workflow. Here is how I wire up the editor, project memory and a containerized stack so the tooling accelerates real engineering.',
    );
    post.set('content', OLD_CONTENT);
    post.set('published_at', '2026-05-20 12:00:00.000Z');
    post.set('reading_minutes', 4);

    try {
      const selfHosting = dao.findFirstRecordByFilter('tags', 'slug = "self-hosting"');
      if (selfHosting) {
        const tags = (post.get('tags') || []).filter((id) => id !== selfHosting.id);
        post.set('tags', tags);
      }
    } catch (_) {
      /* ignore */
    }

    dao.saveRecord(post);
  },
);
