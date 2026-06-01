/// <reference path="../pb_data/types.d.ts" />

// Add the ASP.NET Webforms technology tag to the Araloc / Secure Content
// Manager project on already-seeded databases too.

const NEW_TECHNOLOGIES = [
  '.NET Framework',
  'ASP.NET MVC',
  'ASP.NET Webforms',
  'C#',
  'Web Services',
  'DRM',
  'SQL Server',
];

const OLD_TECHNOLOGIES = [
  '.NET Framework',
  'ASP.NET MVC',
  'C#',
  'Web Services',
  'DRM',
  'SQL Server',
];

migrate(
  (db) => {
    const dao = new Dao(db);
    try {
      const rec = dao.findFirstRecordByFilter('projects', 'slug = "araloc-secure-content-manager"');
      rec.set('technologies', NEW_TECHNOLOGIES);
      dao.saveRecord(rec);
    } catch (_) {
      // record not present (e.g. fresh DB seeded with a newer tag set); ignore
    }
  },
  (db) => {
    const dao = new Dao(db);
    try {
      const rec = dao.findFirstRecordByFilter('projects', 'slug = "araloc-secure-content-manager"');
      rec.set('technologies', OLD_TECHNOLOGIES);
      dao.saveRecord(rec);
    } catch (_) {
      /* ignore */
    }
  },
);
