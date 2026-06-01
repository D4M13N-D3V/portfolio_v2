/// <reference path="../pb_data/types.d.ts" />

// Swap meilisearch.NET out of the featured set (GunLocker takes its place — see
// 1717000011) and add the MechanicBuddy source repo link. Append-only so
// already-seeded databases pick up the change. Mirror of src/data/projects.ts.

const MECHANICBUDDY_REPO = 'https://github.com/D4M13N-D3V/MechanicBuddy';

function set(db, slug, field, value) {
  const dao = new Dao(db);
  try {
    const rec = dao.findFirstRecordByFilter('projects', `slug = "${slug}"`);
    rec.set(field, value);
    dao.saveRecord(rec);
  } catch (_) {
    // record not present; ignore
  }
}

migrate(
  (db) => {
    set(db, 'meilisearch-net', 'featured', false);
    set(db, 'mechanicbuddy', 'repo_url', MECHANICBUDDY_REPO);
  },
  (db) => {
    set(db, 'meilisearch-net', 'featured', true);
    set(db, 'mechanicbuddy', 'repo_url', '');
  },
);
