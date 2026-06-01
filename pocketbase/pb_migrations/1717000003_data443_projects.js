/// <reference path="../pb_data/types.d.ts" />

// Add Data443 Risk Mitigation projects Damien worked on. Kept in a separate
// append-only migration so databases already seeded by 1717000002 pick these up
// without re-running the original seed. Mirror of the entries in
// src/data/projects.ts.

const PROJECTS = [
  {
    title: 'Araloc / Secure Content Manager',
    slug: 'araloc-secure-content-manager',
    description:
      'Data443’s secure content management and digital-rights-management platform for sharing sensitive documents with full control — track, restrict and revoke access even after distribution. Built and maintained features across the ASP.NET / ASP.NET MVC product and its supporting Web Services.',
    technologies: ['.NET Framework', 'ASP.NET MVC', 'C#', 'Web Services', 'DRM', 'SQL Server'],
    category: 'software',
    repo_url: '',
    demo_url: '',
    featured: false,
    sort: 5,
  },
  {
    title: 'ClassiDocs',
    slug: 'classidocs',
    description:
      'Data443’s data classification and governance platform. Developed and maintained a microservices-based classification and discovery engine on the .NET Framework, integrating GroupDocs and CData connectors with an Angular / jQuery front end over SQL Server.',
    technologies: ['.NET Framework', 'Microservices', 'SQL Server', 'Angular', 'jQuery', 'GroupDocs', 'CData'],
    category: 'software',
    repo_url: '',
    demo_url: '',
    featured: false,
    sort: 6,
  },
  {
    title: 'FileFacets / Data Identification Manager',
    slug: 'filefacets-data-identification-manager',
    description:
      'Data443’s sensitive-data discovery and identification platform. Modernized a legacy .NET Framework + Angular application into a scalable, Kubernetes-based distributed system (.NET 6 → 8), adding RabbitMQ, Kafka, SQS and Redis messaging and caching across EKS, ECS and on-premises deployments.',
    technologies: ['.NET 6–8', 'Microservices', 'Kubernetes', 'RabbitMQ', 'Kafka', 'Redis', 'AWS (EKS/ECS)', 'Angular'],
    category: 'software',
    repo_url: '',
    demo_url: '',
    featured: false,
    sort: 7,
  },
  {
    title: 'Cyren Threat Intelligence',
    slug: 'cyren-threat-intelligence',
    description:
      'Threat-intelligence data pipeline (Data443 / Cyren). Modernized core pipeline components — refactored Java/Spring microservices and ported backend API-interaction daemons to run natively on ARM architecture.',
    technologies: ['Java', 'Spring', 'Microservices', 'ARM', '.NET', 'CI/CD'],
    category: 'software',
    repo_url: '',
    demo_url: '',
    featured: false,
    sort: 8,
  },
];

migrate(
  (db) => {
    const dao = new Dao(db);
    const projectsCol = dao.findCollectionByNameOrId('projects');
    for (const p of PROJECTS) {
      const rec = new Record(projectsCol, p);
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
