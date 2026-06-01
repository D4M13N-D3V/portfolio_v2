import type { Project } from '@/lib/types';

/**
 * Real projects, used both as the seed for PocketBase and as a build-time
 * fallback when the database is not yet reachable. Keep in sync with the
 * `projects` collection seed migration.
 */
export const fallbackProjects: Project[] = [
  {
    id: 'mechanicbuddy',
    title: 'MechanicBuddy',
    slug: 'mechanicbuddy',
    description:
      'A self-hosted workshop management platform for vehicle service centers — work orders, client/vehicle profiles, inventory, invoicing and PDF generation. Layered .NET 9 API with NHibernate and a Next.js frontend, shipped as a Docker Compose stack.',
    technologies: ['.NET 9', 'ASP.NET Core', 'NHibernate', 'PostgreSQL', 'Next.js', 'Docker'],
    category: 'software',
    repo_url: '',
    demo_url: 'https://mechanicbuddy.app/',
    cover: '',
    featured: true,
    sort: 1,
  },
  {
    id: 'commissions',
    title: 'Commissions.app',
    slug: 'commissions-app',
    description:
      'An art-commission SaaS platform that lets creatives sell their services without heavy moderation. .NET 8 microservice API, a Next.js + Auth0 UI, and Kubernetes delivery via ArgoCD/Helm.',
    technologies: ['.NET 8', 'Microservices', 'Next.js', 'Auth0', 'Kubernetes', 'ArgoCD'],
    category: 'software',
    repo_url: 'https://github.com/D4M13N-D3V/art_platform',
    demo_url: '',
    cover: '',
    featured: true,
    sort: 2,
  },
  {
    id: 'meilisearch-net',
    title: 'meilisearch.NET',
    slug: 'meilisearch-net',
    description:
      'A NuGet package that embeds MeiliSearch directly into a C# application — managing the background process, health checks and API-key lifecycle so you can add full-text search without running a separate service.',
    technologies: ['.NET 8', 'C#', 'MeiliSearch', 'NuGet', 'Ollama'],
    category: 'oss',
    repo_url: 'https://git.d4m13n.dev/damien/meilisearch.NET',
    demo_url: '',
    cover: '',
    featured: true,
    sort: 3,
  },
  {
    id: 'classification-llm',
    title: 'CPU-Optimized Classification LLM',
    slug: 'classification-llm',
    description:
      'A custom, lightweight LLM fine-tuned for CPU execution that reached 92% top-3 accuracy for URL categorization at a fraction of the compute cost. Backed by an event-driven MLOps pipeline that version-controls datasets and opens deployment PRs automatically.',
    technologies: ['LLM Fine-Tuning', 'MLOps', 'Python', 'Kubernetes', 'CI/CD'],
    category: 'software',
    repo_url: '',
    demo_url: '',
    cover: '',
    featured: false,
    sort: 4,
  },
  {
    id: 'araloc',
    title: 'Araloc / Secure Content Manager',
    slug: 'araloc-secure-content-manager',
    description:
      'Data443’s secure content management and digital-rights-management platform for sharing sensitive documents with full control — track, restrict and revoke access even after distribution. Built and maintained features across the ASP.NET / ASP.NET MVC product and its supporting Web Services.',
    technologies: ['.NET Framework', 'ASP.NET MVC', 'C#', 'Web Services', 'DRM', 'SQL Server'],
    category: 'software',
    repo_url: '',
    demo_url: '',
    cover: '',
    featured: false,
    sort: 5,
  },
  {
    id: 'classidocs',
    title: 'ClassiDocs',
    slug: 'classidocs',
    description:
      'Data443’s data classification and governance platform. Developed and maintained a microservices-based classification and discovery engine on the .NET Framework, integrating GroupDocs and CData connectors with an Angular / jQuery front end over SQL Server.',
    technologies: ['.NET Framework', 'Microservices', 'SQL Server', 'Angular', 'jQuery', 'GroupDocs', 'CData'],
    category: 'software',
    repo_url: '',
    demo_url: '',
    cover: '',
    featured: false,
    sort: 6,
  },
  {
    id: 'filefacets',
    title: 'FileFacets / Data Identification Manager',
    slug: 'filefacets-data-identification-manager',
    description:
      'Data443’s sensitive-data discovery and identification platform. Modernized a legacy .NET Framework + Angular application into a scalable, Kubernetes-based distributed system (.NET 6 → 8), adding RabbitMQ, Kafka, SQS and Redis messaging and caching across EKS, ECS and on-premises deployments.',
    technologies: ['.NET 6–8', 'Microservices', 'Kubernetes', 'RabbitMQ', 'Kafka', 'Redis', 'AWS (EKS/ECS)', 'Angular'],
    category: 'software',
    repo_url: '',
    demo_url: '',
    cover: '',
    featured: false,
    sort: 7,
  },
  {
    id: 'cyren-threat-intel',
    title: 'Cyren Threat Intelligence',
    slug: 'cyren-threat-intelligence',
    description:
      'Threat-intelligence data pipeline (Data443 / Cyren). Modernized core pipeline components — refactored Java/Spring microservices and ported backend API-interaction daemons to run natively on ARM architecture.',
    technologies: ['Java', 'Spring', 'Microservices', 'ARM', '.NET', 'CI/CD'],
    category: 'software',
    repo_url: '',
    demo_url: '',
    cover: '',
    featured: false,
    sort: 8,
  },
];
