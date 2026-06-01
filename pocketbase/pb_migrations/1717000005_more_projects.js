/// <reference path="../pb_data/types.d.ts" />

// Add the portfolio v2 (this site, featured), Hone.gg, and the old
// personal-website (v1) projects. Mirror of the entries in src/data/projects.ts.

const PROJECTS = [
  {
    title: 'd4m13n.dev — Portfolio & Blog',
    slug: 'portfolio-v2',
    description:
      'This very site — a portfolio with a built-in blog. Next.js (App Router) frontend on a PocketBase backend, dark/cyan MUI theme, a markdown blog with syntax highlighting, RSS and sitemap. Ships as a Dockerized stack behind Caddy, with CI/CD that scans and publishes versioned images to GHCR.',
    technologies: ['Next.js', 'React', 'TypeScript', 'MUI', 'PocketBase', 'Docker', 'Caddy', 'CI/CD'],
    category: 'software',
    repo_url: 'https://github.com/D4M13N-D3V/portfolio_v2',
    demo_url: 'https://d4m13n.dev',
    featured: true,
    sort: 0,
  },
  {
    title: 'Hone.gg',
    slug: 'hone-gg',
    description:
      'A dual-component PC optimization system for gamers — a C++/C# desktop app paired with a modern web interface. The engine applied registry tweaks and system scripts to boost overall in-game performance, achieving an average 35% FPS increase across varied hardware. Took it from prototype to a market-ready MVP while coordinating a remote team in a fast-paced startup.',
    technologies: ['C#', 'C++', '.NET', 'Desktop App', 'Web', 'Windows'],
    category: 'software',
    repo_url: '',
    demo_url: '',
    featured: false,
    sort: 11,
  },
  {
    title: 'Personal Website (v1)',
    slug: 'personal-website-v1',
    description:
      'The previous iteration of my portfolio — a Next.js + MUI single-page site with a project masonry, an experience timeline and a typing intro. Backed by Drizzle ORM over SQLite with NextAuth.',
    technologies: ['Next.js', 'React', 'TypeScript', 'MUI', 'Drizzle ORM', 'SQLite', 'NextAuth'],
    category: 'software',
    repo_url: 'https://github.com/D4M13N-D3V/personal-website',
    demo_url: '',
    featured: false,
    sort: 12,
  },
];

migrate(
  (db) => {
    const dao = new Dao(db);
    const col = dao.findCollectionByNameOrId('projects');
    for (const p of PROJECTS) {
      const rec = new Record(col, p);
      dao.saveRecord(rec);
    }
  },
  (db) => {
    const dao = new Dao(db);
    for (const p of PROJECTS) {
      try {
        const rec = dao.findFirstRecordByFilter('projects', `slug = "${p.slug}"`);
        dao.deleteRecord(rec);
      } catch (_) {
        /* not present; ignore */
      }
    }
  },
);
