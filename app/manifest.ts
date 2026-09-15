import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Donisl · Menu',
    short_name: 'Donisl',
    description: 'Mobile menu for restaurant Donisl in Munich, with an optional AI assistant.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF6EF',
    theme_color: '#9E1B1B',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
