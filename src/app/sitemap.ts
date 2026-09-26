import type { MetadataRoute } from 'next';
import { ATLAS_DATA as D } from '@/data/data';
import { libraryAesthetics } from '@/data/aesthetics';

const BASE = 'https://atlas.navrine.com';

const PAGES = [
  '', '/trends', '/aesthetics', '/design-concepts', '/taste', '/photography', '/viral-signals',
  '/color-palettes', '/typography', '/prompts', '/assets', '/journal', '/moodboard',
  '/visual-culture', '/search', '/submit', '/studio', '/about',
];

// Slugs mirror the lookups in the [slug] pages
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map(p => `${BASE}${p}`),
    ...[...D.featuredSignals, ...libraryAesthetics].map(s => `${BASE}/aesthetics/${s.id}`),
    ...D.prompts.map(p => `${BASE}/prompts/${p.title.toLowerCase().replace(/ /g, '-')}`),
    ...D.assets.map(a => `${BASE}/assets/${a.title.toLowerCase().replace(/ /g, '-')}`),
    ...D.journal.map(j => `${BASE}/journal/${j.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`),
  ].map(url => ({ url }));
}
