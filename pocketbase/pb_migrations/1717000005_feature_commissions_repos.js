/// <reference path="../pb_data/types.d.ts" />

// Mark the Commissions.app Web UI and GitOps Deployment projects as featured
// (the Core API was already featured). Append-only so databases that already
// applied 1717000004 pick up the change. Mirror of src/data/projects.ts.

const SLUGS = ['commissions-app-ui', 'commissions-app-argocd'];

function setFeatured(db, value) {
  const dao = new Dao(db);
  for (const slug of SLUGS) {
    try {
      const rec = dao.findFirstRecordByFilter('projects', `slug = "${slug}"`);
      rec.set('featured', value);
      dao.saveRecord(rec);
    } catch (_) {
      /* record not present; ignore */
    }
  }
}

migrate(
  (db) => setFeatured(db, true),
  (db) => setFeatured(db, false),
);
