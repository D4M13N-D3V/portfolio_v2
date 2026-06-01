/// <reference path="../pb_data/types.d.ts" />

// Add the documentation link to the MechanicBuddy project description so it
// appears (and is linkified by the UI) on already-seeded databases too.

const NEW_DESCRIPTION =
  'A self-hosted workshop management platform for vehicle service centers — work orders, client/vehicle profiles, inventory, invoicing and PDF generation. Layered .NET 9 API with NHibernate and a Next.js frontend, shipped as a Docker Compose stack. Full documentation at https://docs.mechanicbuddy.app/.';

const OLD_DESCRIPTION =
  'A self-hosted workshop management platform for vehicle service centers — work orders, client/vehicle profiles, inventory, invoicing and PDF generation. Layered .NET 9 API with NHibernate and a Next.js frontend, shipped as a Docker Compose stack.';

migrate(
  (db) => {
    const dao = new Dao(db);
    try {
      const rec = dao.findFirstRecordByFilter('projects', 'slug = "mechanicbuddy"');
      rec.set('description', NEW_DESCRIPTION);
      dao.saveRecord(rec);
    } catch (_) {
      // record not present (e.g. fresh DB seeded with a newer description); ignore
    }
  },
  (db) => {
    const dao = new Dao(db);
    try {
      const rec = dao.findFirstRecordByFilter('projects', 'slug = "mechanicbuddy"');
      rec.set('description', OLD_DESCRIPTION);
      dao.saveRecord(rec);
    } catch (_) {
      /* ignore */
    }
  },
);
