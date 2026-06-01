/// <reference path="../pb_data/types.d.ts" />

// Feature the GunLocker project and add its live demo URL. Append-only so
// already-seeded databases pick up the change. Mirror of src/data/projects.ts.

const DEMO_URL = 'https://gunlocker.d4m13n.dev/';

function apply(db, featured, demoUrl) {
  const dao = new Dao(db);
  try {
    const rec = dao.findFirstRecordByFilter('projects', 'slug = "gunlocker"');
    rec.set('featured', featured);
    rec.set('demo_url', demoUrl);
    dao.saveRecord(rec);
  } catch (_) {
    // record not present; ignore
  }
}

migrate(
  (db) => apply(db, true, DEMO_URL),
  (db) => apply(db, false, ''),
);
