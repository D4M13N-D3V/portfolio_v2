// Resume content used by the /about page. Sourced from Damien's CV so the site
// stays in sync with the latest experience without hitting the database.

export interface Job {
  role: string;
  company: string;
  location?: string;
  period: string;
  highlights: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const profile = {
  name: 'Damien Ostler',
  handle: 'd4m13n',
  title: 'Senior Full Stack .NET Developer',
  location: 'Morrisville, NC',
  email: 'd4m13n.dev@pm.me',
  summary:
    'Versatile, customer-focused Senior Software Engineer with deep experience modernizing legacy .NET systems, architecting microservices, and integrating AI/ML into production. I blend traditional .NET enterprise engineering and DevOps with AI model fine-tuning and orchestration, and multi-cluster infrastructure automation.',
  socials: {
    github: 'https://github.com/D4M13N-D3V',
    gitea: 'https://git.d4m13n.dev',
    linkedin: 'https://www.linkedin.com/in/damien-ostler-254663110/',
    website: 'https://d4m13n.dev',
  },
};

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages & Web',
    skills: ['C#', '.NET 6–9', '.NET Framework', 'ASP.NET MVC', 'TypeScript', 'React', 'Next.js', 'Angular', 'C/C++', 'Python', 'SQL'],
  },
  {
    category: 'Architecture & Data',
    skills: ['Microservices', 'PostgreSQL', 'SQL Server', 'MongoDB', 'Redis', 'RabbitMQ', 'Kafka', 'SQS', 'SOLR'],
  },
  {
    category: 'AI & ML',
    skills: ['LLM Fine-Tuning', 'Custom Model Training', 'MLOps Pipelines', 'Dataset Lifecycle Management', 'Claude Code Orchestration'],
  },
  {
    category: 'Cloud & DevOps',
    skills: ['AWS (EKS/ECS)', 'Azure', 'Kubernetes', 'Docker', 'ArgoCD', 'CI/CD', 'Prometheus', 'Grafana', 'Linux', 'ARM'],
  },
];

export const experience: Job[] = [
  {
    role: 'Senior Software Engineer',
    company: 'Data443 Risk Mitigation Inc.',
    location: 'Durham, NC',
    period: 'April 2020 – Present',
    highlights: [
      'Modernized a legacy .NET Framework + Angular discovery application into a scalable Kubernetes-based distributed system, refactoring from .NET 6 through .NET 8 with RabbitMQ, Kafka, SQS, ActiveMQ and Redis across EKS, ECS and on-prem.',
      'Architected and fine-tuned a custom CPU-optimized LLM reaching 92% top-3 accuracy for URL categorization, with automated dataset management for bulk import, merging and training.',
      'Built an event-driven, lambda-like training pipeline that version-controls datasets and opens GitHub PRs for deployment, plus automated Kubernetes CI/CD.',
      'Stood up multi-cluster observability with Prometheus and Grafana, exporting telemetry into a centralized management instance.',
      'Modernized the Cyren Threat Intelligence pipeline — refactored Java/Spring microservices and ported backend daemons to run natively on ARM.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Hone.gg',
    period: 'October 2021 – August 2022',
    highlights: [
      'Led development of a dual-component PC optimization system, integrating a C++/C# desktop app with a modern web interface.',
      'Engineered a core optimization engine for gamers achieving an average 35% FPS increase across varied hardware.',
      'Took the product from prototype to a market-ready MVP while coordinating a remote team in a fast-paced startup.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Core Techs, Inc.',
    location: 'Morrisville, NC',
    period: 'February 2020 – April 2020',
    highlights: [
      'Modernized legacy DRM systems in Microsoft Azure, enhancing UIs and API functionality with .NET.',
      'Architected and maintained full software lifecycles for enterprise web apps and plugins supporting 100,000+ users.',
    ],
  },
  {
    role: 'Full Stack .NET Developer',
    company: 'Coder Foundry',
    location: 'Kernersville, NC',
    period: 'September 2019 – December 2019',
    highlights: [
      'Built scalable distributed applications with .NET Framework, ASP.NET MVC and SQL Server.',
      'Engineered responsive front-end interfaces with HTML5, CSS3 and JavaScript.',
    ],
  },
  {
    role: 'Game Developer (Contractor)',
    company: 'Upwork',
    period: 'January 2016 – September 2019',
    highlights: [
      'Programmed core mechanic systems and engine prototypes using expert-level C# and .NET in Unity3D and Unreal Engine.',
      'Pioneered early CI/CD adoption to automate builds and streamline deployments.',
    ],
  },
];
