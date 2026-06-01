/// <reference path="../pb_data/types.d.ts" />

// Update the MechanicBuddy project for the live demo: white-label SaaS framing,
// the provisioned-only demo (tenant-config automation not yet exposed), the demo
// login, the demo URL and the Docker-not-Kubernetes deployment note. Append-only
// so already-seeded databases pick up the change. Mirror of src/data/projects.ts.

const NEW_DESCRIPTION =
  'A white-label workshop management SaaS for vehicle service centers — work orders, client/vehicle profiles, inventory, invoicing and PDF generation. Layered .NET 9 API with NHibernate and a Next.js frontend. The full platform automates tenant provisioning and configuration for each workshop; the live demo currently exposes a single provisioned application (the tenant-configuration automation isn’t available in the demo yet) and is deployed with Docker rather than Kubernetes. Try the demo at https://mechanicbuddydemo.d4m13n.dev/ with admin / demopassword!. Full documentation at https://docs.mechanicbuddy.app/.';

const NEW_DEMO_URL = 'https://mechanicbuddydemo.d4m13n.dev/';
const NEW_TECH = ['.NET 9', 'ASP.NET Core', 'NHibernate', 'PostgreSQL', 'Next.js', 'Docker', 'Multi-tenant SaaS'];

const OLD_DESCRIPTION =
  'A self-hosted workshop management platform for vehicle service centers — work orders, client/vehicle profiles, inventory, invoicing and PDF generation. Layered .NET 9 API with NHibernate and a Next.js frontend, shipped as a Docker Compose stack. Full documentation at https://docs.mechanicbuddy.app/.';

const OLD_DEMO_URL = 'https://mechanicbuddy.app/';
const OLD_TECH = ['.NET 9', 'ASP.NET Core', 'NHibernate', 'PostgreSQL', 'Next.js', 'Docker'];

function apply(db, description, demoUrl, tech) {
  const dao = new Dao(db);
  try {
    const rec = dao.findFirstRecordByFilter('projects', 'slug = "mechanicbuddy"');
    rec.set('description', description);
    rec.set('demo_url', demoUrl);
    rec.set('technologies', tech);
    dao.saveRecord(rec);
  } catch (_) {
    // record not present; ignore
  }
}

migrate(
  (db) => apply(db, NEW_DESCRIPTION, NEW_DEMO_URL, NEW_TECH),
  (db) => apply(db, OLD_DESCRIPTION, OLD_DEMO_URL, OLD_TECH),
);
