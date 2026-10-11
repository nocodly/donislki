/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  // The menu moved to Kellno. Printed QR codes still point here, so send every visit on — temporary (307),
  // not permanent, so browsers do not remember it and it can be switched off by removing this block.
  async redirects() {
    return [
      {
        source: '/:path((?!api/).*)',
        destination: 'https://kellno.com/m/donisl?s=qr',
        permanent: false,
      },
    ];
  },
  images: {
    // Dish photos are static and only change on a new deploy (fresh container,
    // fresh image cache) — cache the optimized output aggressively instead of
    // the 60s default, and let the optimizer serve AVIF/WebP when supported.
    minimumCacheTTL: 2592000, // 30 days
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
