/// <reference path="../pb_data/types.d.ts" />

// Add selected public GitHub projects: Godot template, GunLocker, FileTree and
// Toxcord. Mirror of the entries in src/data/projects.ts.

const PROJECTS = [
  {
    title: 'Godot Project Template',
    slug: 'godot-template',
    description:
      'An open-source template repository for Godot projects with CI/CD baked in — automated exports and release pipelines so new games start with a working build-and-ship setup. My most-starred project on GitHub.',
    technologies: ['Godot', 'GDScript', 'CI/CD', 'GitHub Actions'],
    category: 'game',
    repo_url: 'https://github.com/D4M13N-D3V/godot_template',
    demo_url: '',
    featured: false,
    sort: 13,
  },
  {
    title: 'GunLocker',
    slug: 'gunlocker',
    description:
      'A personal inventory and logbook application for tracking firearms, gear, ammunition and range activities. Self-hostable web app shipped with Docker.',
    technologies: ['JavaScript', 'Node.js', 'Docker', 'Web App'],
    category: 'software',
    repo_url: 'https://github.com/D4M13N-D3V/gunlocker',
    demo_url: '',
    featured: false,
    sort: 14,
  },
  {
    title: 'FileTree',
    slug: 'file-tree',
    description:
      'A desktop tool that analyzes what is consuming space on your local drives and recommends ways to slim it down. Built with Tauri — a Rust core behind a TypeScript UI.',
    technologies: ['Tauri', 'Rust', 'TypeScript', 'Desktop App'],
    category: 'software',
    repo_url: 'https://github.com/D4M13N-D3V/file_tree',
    demo_url: '',
    featured: false,
    sort: 15,
  },
  {
    title: 'Toxcord',
    slug: 'toxcord',
    description:
      'A privacy-focused Tox messaging client with optional I2P support, written in Rust with a TypeScript front end. An exploration of anonymous, serverless peer-to-peer communication.',
    technologies: ['Rust', 'TypeScript', 'Tox', 'I2P', 'P2P'],
    category: 'software',
    repo_url: 'https://github.com/D4M13N-D3V/Toxcord',
    demo_url: '',
    featured: false,
    sort: 16,
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
