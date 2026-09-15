/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    // Dish photos are static and only change on a new deploy (fresh container,
    // fresh image cache) — cache the optimized output aggressively instead of
    // the 60s default, and let the optimizer serve AVIF/WebP when supported.
    minimumCacheTTL: 2592000, // 30 days
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
