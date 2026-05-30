import PocketBase from 'pocketbase';

/**
 * Resolve the PocketBase base URL.
 *
 * - On the server (SSR / route handlers) we prefer POCKETBASE_INTERNAL_URL, which
 *   points at the service name inside the Docker network (e.g. http://pocketbase:8090).
 * - In the browser we use the public NEXT_PUBLIC_POCKETBASE_URL.
 */
function resolveBaseUrl(): string {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return (
      process.env.POCKETBASE_INTERNAL_URL ||
      process.env.NEXT_PUBLIC_POCKETBASE_URL ||
      'http://127.0.0.1:8090'
    );
  }
  return process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';
}

/**
 * The public-facing PocketBase origin, used to build absolute file URLs that the
 * browser can load even when SSR fetched through the internal hostname.
 */
export const publicPocketBaseUrl =
  process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';

/**
 * Create a fresh PocketBase client. We intentionally create a new instance per
 * request on the server to avoid sharing auth state between users.
 */
export function createPocketBase(): PocketBase {
  return new PocketBase(resolveBaseUrl());
}

/**
 * Build an absolute, browser-loadable URL for a stored file. Uses the public
 * origin rather than the internal one so images work in the client.
 */
export function fileUrl(
  collection: string,
  recordId: string,
  filename: string,
  thumb?: string,
): string {
  if (!filename) return '';
  const base = publicPocketBaseUrl.replace(/\/$/, '');
  const query = thumb ? `?thumb=${encodeURIComponent(thumb)}` : '';
  return `${base}/api/files/${collection}/${recordId}/${encodeURIComponent(filename)}${query}`;
}
