/// <reference path="../pb_data/types.d.ts" />

// Add the Data443 ML training-data management platform (Python). Append-only so
// already-seeded databases pick it up. Mirror of the entry in src/data/projects.ts.

const PROJECTS = [
  {
    title: 'ML Training Data Platform',
    slug: 'ml-training-data-platform',
    description:
      'Data443 — an internal platform for managing machine-learning training data and the full training lifecycle. Handled dataset ingestion, correction and manipulation, and orchestrated training execution, exposing a complete API so teams could build further automation on top of the training pipeline. Written in Python.',
    technologies: ['Python', 'MLOps', 'REST API', 'Machine Learning', 'Data Pipelines'],
    category: 'software',
    repo_url: '',
    demo_url: '',
    featured: false,
    sort: 17,
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
