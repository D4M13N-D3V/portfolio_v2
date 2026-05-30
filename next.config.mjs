/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a minimal standalone server bundle for small Docker images.
  output: 'standalone',
  reactStrictMode: true,
  images: {
    // Allow images served from the PocketBase instance (covers and post images).
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'pocketbase' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
};

export default nextConfig;
