import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://donislki.nocodly.com'),
  title: 'Donisl · Menu',
  description: 'Mobile menu for restaurant Donisl in Munich, with an optional AI assistant.',
  openGraph: {
    title: 'Donisl · Menu',
    description: 'Mobile menu for restaurant Donisl in Munich, with an optional AI assistant.',
    url: '/',
    siteName: 'Donisl',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Donisl · Menu',
    description: 'Mobile menu for restaurant Donisl in Munich, with an optional AI assistant.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#9E1B1B',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
