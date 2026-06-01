/// <reference path="../pb_data/types.d.ts" />

// Replace the single "Commissions.app" project (which pointed at the old
// art_platform repo) with one entry per real repository: core API, web UI and
// the ArgoCD/GitOps deployment. Append-only so already-seeded databases get the
// change. Mirror of the entries in src/data/projects.ts.

const NEW_PROJECTS = [
  {
    title: 'Commissions.app — Core API',
    slug: 'commissions-app-core-api',
    description:
      'The .NET 8 core API and database layer for Commissions.app, an art-commission SaaS platform that lets creatives sell their services without heavy moderation. Microservice backend documented with Swagger and containerized with Docker.',
    technologies: ['.NET 8', 'C#', 'ASP.NET Core', 'PostgreSQL', 'Docker', 'Swagger'],
    category: 'software',
    repo_url: 'https://github.com/D4M13N-D3V/comissions-app-core-api',
    demo_url: '',
    featured: true,
    sort: 2,
  },
  {
    title: 'Commissions.app — Web UI',
    slug: 'commissions-app-ui',
    description:
      'The Next.js frontend for Commissions.app, with Auth0 authentication and SSR. Lets creatives list services and clients browse and commission work.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Auth0'],
    category: 'software',
    repo_url: 'https://github.com/D4M13N-D3V/comissions-app-ui',
    demo_url: '',
    featured: false,
    sort: 9,
  },
  {
    title: 'Commissions.app — GitOps Deployment',
    slug: 'commissions-app-argocd',
    description:
      'GitOps deployment for Commissions.app — Helm charts and ArgoCD application manifests that deploy the platform to Kubernetes, with separate dev configuration.',
    technologies: ['ArgoCD', 'Helm', 'Kubernetes', 'GitOps'],
    category: 'software',
    repo_url: 'https://github.com/D4M13N-D3V/comissions-app-argocd',
    demo_url: '',
    featured: false,
    sort: 10,
  },
];

migrate(
  (db) => {
    const dao = new Dao(db);

    // Remove the old combined entry if present.
    try {
      const old = dao.findFirstRecordByFilter('projects', 'slug = "commissions-app"');
      dao.deleteRecord(old);
    } catch (_) {
      /* already gone; ignore */
    }

    const projectsCol = dao.findCollectionByNameOrId('projects');
    for (const p of NEW_PROJECTS) {
      const rec = new Record(projectsCol, p);
      dao.saveRecord(rec);
    }
  },
  (db) => {
    const dao = new Dao(db);

    // Roll back: remove the three split entries, restore the combined one.
    for (const p of NEW_PROJECTS) {
      try {
        dao.deleteRecord(dao.findFirstRecordByFilter('projects', `slug = "${p.slug}"`));
      } catch (_) {
        /* ignore */
      }
    }

    const projectsCol = dao.findCollectionByNameOrId('projects');
    const restored = new Record(projectsCol, {
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
    });
    dao.saveRecord(restored);
  },
);
