import { NextResponse } from 'next/server';
import { sampleAtlasEntries } from '@/data/seed';
import { ATLAS_DATA } from '@/data/data';

const CATEGORY_ROUTES: Record<string, string> = {
  'Trend': '/trends',
  'Aesthetic': '/aesthetics',
  'Design Concept': '/design-concepts',
  'Taste': '/taste',
  'Photography': '/photography',
  'Visual Culture': '/visual-culture',
};

function getHref(slug: string, category: string) {
  const hasDetail = ATLAS_DATA.featuredSignals.some((f: any) => f.id === slug);
  return hasDetail ? `/aesthetics/${slug}` : (CATEGORY_ROUTES[category] ?? '/trends');
}

export async function GET() {
  const docs = sampleAtlasEntries.map(s => {
    const haystack = [
      s.title, s.subtitle, s.description, s.category, s.region, s.era,
      ...(s.mood ?? []), ...(s.industries ?? []), ...(s.platforms ?? []),
      ...(s.visualTraits ?? []),
    ].join(' ').toLowerCase();
    
    return {
      title: s.title,
      detail: s.subtitle || (s.description ? s.description.substring(0, 80) + '...' : ''),
      meta: s.category.toUpperCase(),
      href: getHref(s.slug, s.category),
      haystack: haystack
    };
  });

  return NextResponse.json(docs);
}
