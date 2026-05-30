import { createPocketBase } from './pocketbase';
import type { Post, Project, Tag } from './types';
import { fallbackProjects } from '@/data/projects';
import { fallbackPosts } from '@/data/posts';

// Revalidation window (seconds) for cached PocketBase reads.
const REVALIDATE = 60;

// Next.js fetch cache options threaded into the PocketBase SDK's fetch calls.
const cacheOpts = { next: { revalidate: REVALIDATE } } as Record<string, unknown>;

/**
 * Fetch published posts, newest first. Falls back to bundled sample posts when
 * PocketBase is unavailable (e.g. first build before the DB is seeded), so the
 * site always renders.
 */
export async function getPosts(tagSlug?: string): Promise<Post[]> {
  try {
    const pb = createPocketBase();
    const filterParts = ['published = true'];
    if (tagSlug) filterParts.push(`tags.slug ?= "${tagSlug}"`);
    const records = await pb.collection('posts').getFullList<Post>({
      filter: filterParts.join(' && '),
      sort: '-published_at',
      expand: 'tags',
      ...cacheOpts,
    });
    return records;
  } catch {
    return fallbackPosts.filter(
      (p) => !tagSlug || p.expand?.tags?.some((t) => t.slug === tagSlug),
    );
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const pb = createPocketBase();
    return await pb
      .collection('posts')
      .getFirstListItem<Post>(`slug = "${slug}" && published = true`, {
        expand: 'tags',
        ...cacheOpts,
      });
  } catch {
    return fallbackPosts.find((p) => p.slug === slug) ?? null;
  }
}

export async function getTags(): Promise<Tag[]> {
  try {
    const pb = createPocketBase();
    return await pb.collection('tags').getFullList<Tag>({ sort: 'name', ...cacheOpts });
  } catch {
    const seen = new Map<string, Tag>();
    for (const p of fallbackPosts) {
      for (const t of p.expand?.tags ?? []) seen.set(t.id, t);
    }
    return [...seen.values()];
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const pb = createPocketBase();
    return await pb
      .collection('projects')
      .getFullList<Project>({ sort: '-featured,sort', ...cacheOpts });
  } catch {
    return fallbackProjects;
  }
}
