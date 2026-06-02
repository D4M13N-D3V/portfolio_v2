/// <reference path="../pb_data/types.d.ts" />

// Repoint the live demo URLs after moving the demos behind a single Cloudflare
// tunnel on d4m13n.dev (one-level subdomains, covered by the *.d4m13n.dev cert):
//   MechanicBuddy demo  -> https://demo-mechanicbuddy.d4m13n.dev/
//   MechanicBuddy portal-> https://mechanicbuddy.d4m13n.dev/  (in the description)
//   Commissions API     -> https://api-commissions.d4m13n.dev/
//   Commissions UI      -> https://commissions.d4m13n.dev/
// MechanicBuddy now links both surfaces in the description and shows the
// admin / demo login. Append-only so already-seeded databases pick up the
// change. Mirror of src/data/projects.ts.

const UPDATES = {
  mechanicbuddy: {
    description:
      'A white-label workshop management SaaS for vehicle service centers — work orders, client/vehicle profiles, inventory, invoicing and PDF generation. Layered .NET 9 API with NHibernate and a Next.js frontend. The full platform automates tenant provisioning and configuration for each workshop; the live demo currently exposes a single provisioned application (the tenant-configuration automation isn’t available in the demo yet) and is deployed with Docker rather than Kubernetes. Try the workshop demo at https://demo-mechanicbuddy.d4m13n.dev/ and log in with admin / demo. Explore the SaaS management portal at https://mechanicbuddy.d4m13n.dev/. Full documentation at https://docs.mechanicbuddy.app/.',
    demo_url: 'https://demo-mechanicbuddy.d4m13n.dev/',
    old_description:
      'A white-label workshop management SaaS for vehicle service centers — work orders, client/vehicle profiles, inventory, invoicing and PDF generation. Layered .NET 9 API with NHibernate and a Next.js frontend. The full platform automates tenant provisioning and configuration for each workshop; the live demo currently exposes a single provisioned application (the tenant-configuration automation isn’t available in the demo yet) and is deployed with Docker rather than Kubernetes. Try the demo at https://mechanicbuddydemo.d4m13n.dev/ with admin / demopassword!. Full documentation at https://docs.mechanicbuddy.app/.',
    old_demo_url: 'https://mechanicbuddydemo.d4m13n.dev/',
  },
  'commissions-app-core-api': {
    description:
      'The .NET 8 core API and database layer for Commissions.app, an art-commission SaaS platform that lets creatives sell their services without heavy moderation. Microservice backend documented with Swagger and containerized with Docker. The live demo API is currently deployed with Docker rather than Kubernetes at https://api-commissions.d4m13n.dev/; sign in with demo@d4m13n.dev / d3m0p4ssw0rd!@.',
    demo_url: 'https://api-commissions.d4m13n.dev/',
    old_description:
      'The .NET 8 core API and database layer for Commissions.app, an art-commission SaaS platform that lets creatives sell their services without heavy moderation. Microservice backend documented with Swagger and containerized with Docker. The live demo API is currently deployed with Docker rather than Kubernetes at https://comissionsappdemoapi.d4m13n.dev/; sign in with demo@d4m13n.dev / d3m0p4ssw0rd!@.',
    old_demo_url: 'https://comissionsappdemoapi.d4m13n.dev/',
  },
  'commissions-app-ui': {
    description:
      'The Next.js frontend for Commissions.app, with Auth0 authentication and SSR. Lets creatives list services and clients browse and commission work. The live demo is currently deployed with Docker rather than Kubernetes at https://commissions.d4m13n.dev/; sign in with demo@d4m13n.dev / d3m0p4ssw0rd!@.',
    demo_url: 'https://commissions.d4m13n.dev/',
    old_description:
      'The Next.js frontend for Commissions.app, with Auth0 authentication and SSR. Lets creatives list services and clients browse and commission work. The live demo is currently deployed with Docker rather than Kubernetes at https://comissionsappdemo.d4m13n.dev/; sign in with demo@d4m13n.dev / d3m0p4ssw0rd!@.',
    old_demo_url: 'https://comissionsappdemo.d4m13n.dev/',
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
