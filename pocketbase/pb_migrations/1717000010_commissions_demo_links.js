/// <reference path="../pb_data/types.d.ts" />

// Add the live demo URLs, demo login and Docker-not-Kubernetes note to the
// Commissions.app Core API and Web UI projects. Append-only so already-seeded
// databases pick up the change. Mirror of src/data/projects.ts.

const UPDATES = {
  'commissions-app-core-api': {
    description:
      'The .NET 8 core API and database layer for Commissions.app, an art-commission SaaS platform that lets creatives sell their services without heavy moderation. Microservice backend documented with Swagger and containerized with Docker. The live demo API is currently deployed with Docker rather than Kubernetes at https://comissionsappdemoapi.d4m13n.dev/; sign in with demo@d4m13n.dev / d3m0p4ssw0rd!@.',
    demo_url: 'https://comissionsappdemoapi.d4m13n.dev/',
    old_description:
      'The .NET 8 core API and database layer for Commissions.app, an art-commission SaaS platform that lets creatives sell their services without heavy moderation. Microservice backend documented with Swagger and containerized with Docker.',
    old_demo_url: '',
  },
  'commissions-app-ui': {
    description:
      'The Next.js frontend for Commissions.app, with Auth0 authentication and SSR. Lets creatives list services and clients browse and commission work. The live demo is currently deployed with Docker rather than Kubernetes at https://comissionsappdemo.d4m13n.dev/; sign in with demo@d4m13n.dev / d3m0p4ssw0rd!@.',
    demo_url: 'https://comissionsappdemo.d4m13n.dev/',
    old_description:
      'The Next.js frontend for Commissions.app, with Auth0 authentication and SSR. Lets creatives list services and clients browse and commission work.',
    old_demo_url: '',
  },
};

function apply(db, pick) {
  const dao = new Dao(db);
  for (const slug of Object.keys(UPDATES)) {
    const u = UPDATES[slug];
    try {
      const rec = dao.findFirstRecordByFilter('projects', `slug = "${slug}"`);
      rec.set('description', pick === 'new' ? u.description : u.old_description);
      rec.set('demo_url', pick === 'new' ? u.demo_url : u.old_demo_url);
      dao.saveRecord(rec);
    } catch (_) {
      // record not present; ignore
    }
  }
}

migrate(
  (db) => apply(db, 'new'),
  (db) => apply(db, 'old'),
);
