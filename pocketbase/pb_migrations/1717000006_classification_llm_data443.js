/// <reference path="../pb_data/types.d.ts" />

// Clarify that the CPU-Optimized Classification LLM was Data443 work — part of
// the Cyren Threat Intelligence pipeline for URL categorization. Append-only so
// already-seeded databases pick up the change. Mirror of src/data/projects.ts.

const SLUG = 'classification-llm';

const NEW = {
  description:
    'A custom, lightweight LLM fine-tuned for CPU execution, built at Data443 as part of the Cyren Threat Intelligence pipeline for URL categorization. Reached 92% top-3 accuracy at a fraction of the compute cost, backed by an event-driven MLOps pipeline that version-controls datasets and opens deployment PRs automatically.',
  technologies: ['LLM Fine-Tuning', 'MLOps', 'Threat Intelligence', 'Python', 'Kubernetes', 'CI/CD'],
};

const OLD = {
  description:
    'A custom, lightweight LLM fine-tuned for CPU execution that reached 92% top-3 accuracy for URL categorization at a fraction of the compute cost, backed by an event-driven MLOps pipeline.',
  technologies: ['LLM Fine-Tuning', 'MLOps', 'Python', 'Kubernetes', 'CI/CD'],
};

function apply(db, values) {
  const dao = new Dao(db);
  try {
    const rec = dao.findFirstRecordByFilter('projects', `slug = "${SLUG}"`);
    rec.set('description', values.description);
    rec.set('technologies', values.technologies);
    dao.saveRecord(rec);
  } catch (_) {
    /* record not present; ignore */
  }
}

migrate(
  (db) => apply(db, NEW),
  (db) => apply(db, OLD),
);
