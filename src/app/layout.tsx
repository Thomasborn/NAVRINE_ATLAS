import type { Metadata } from 'next';
import { Fraunces, Space_Grotesk, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://atlas.navrine.space'),
  title: 'Navrine Atlas — Trend, Aesthetic, Design Concept & Visual Culture Catalog',
  description:
    'Navrine Atlas is a visual culture catalog for discovering trends, aesthetics, design concepts, creative taste, photography styles, viral signals, color palettes, AI prompts, assets, and brand inspiration.',
  openGraph: {
    title: 'Navrine Atlas',
    description:
      'The visual culture catalog for trends, aesthetics, design concepts, and creative direction.',
    url: 'https://atlas.navrine.space',
    siteName: 'Navrine Atlas',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Navrine Atlas Cover',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Navrine Atlas',
    description: 'Read the signals. Build the taste. Design the future.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${grotesk.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <div id="root">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
