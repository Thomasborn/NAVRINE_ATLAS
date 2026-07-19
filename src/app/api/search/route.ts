import { NextResponse } from 'next/server';
import { sampleAtlasEntries } from '@/data/seed';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const norm = q.trim().toLowerCase();
  
  // Reuse the same search logic as the main search page
  const entries = sampleAtlasEntries.filter(s =>
    [
      s.title, s.subtitle, s.description, s.category, s.region, s.era,
      ...(s.mood ?? []), ...(s.industries ?? []), ...(s.platforms ?? []),
      ...(s.visualTraits ?? []),
    ].join(' ').toLowerCase().includes(norm)
  );

  // Return max 5 results for the dropdown to keep it clean
  return NextResponse.json({ 
    results: entries.slice(0, 5).map(e => ({
      id: e.id,
      slug: e.slug,
      title: e.title,
      category: e.category,
      subtitle: e.subtitle,
      colorPalette: e.colorPalette
    })) 
  });
}
