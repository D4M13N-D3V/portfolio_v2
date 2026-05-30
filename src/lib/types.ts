// Shared domain types mirroring the PocketBase collections.

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover: string; // PocketBase filename; resolve with fileUrl()
  published: boolean;
  published_at: string; // ISO date
  reading_minutes: number;
  tags: string[]; // tag ids
  expand?: {
    tags?: Tag[];
  };
  created: string;
  updated: string;
}

export type ProjectCategory = 'software' | 'game' | 'oss';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  category: ProjectCategory;
  repo_url: string;
  demo_url: string;
  cover: string;
  featured: boolean;
  sort: number;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}
