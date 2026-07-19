import { ATLAS_DATA } from '@/data/data';
import { sampleAtlasEntries } from '@/data/seed';

export interface SearchDoc {
  key: string;
  title: string;
  meta: string;
  detail: string;
  href: string;
  haystack: string;
  palette?: string[];
}

const CATEGORY_ROUTES: Record<string, string> = {
  'Trend': '/trends',
  'Aesthetic': '/aesthetics',
  'Design Concept': '/design-concepts',
  'Taste': '/taste',
  'Photography': '/photography',
  'Visual Culture': '/visual-culture',
};

function stripHtml(s: string) {
  return s.replace(/<[^>]*>/g, '');
}

export function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];
  const seen = new Set<string>();
  const detailSlugs = new Set(ATLAS_DATA.featuredSignals.map(f => f.id));

  for (const e of sampleAtlasEntries) {
    seen.add(e.slug);
    docs.push({
      key: `entry-${e.slug}`,
      title: e.title,
      meta: e.category,
      detail: e.subtitle,
      href: detailSlugs.has(e.slug) ? `/aesthetics/${e.slug}` : (CATEGORY_ROUTES[e.category] ?? '/trends'),
      palette: e.colorPalette,
      haystack: [
        e.title, e.subtitle, e.description, e.category, e.region, e.era,
        e.typographyStyle, e.photographyStyle, e.uiStyle,
        ...e.mood, ...e.industries, ...e.platforms, ...e.visualTraits, ...e.useCases,
      ].join(' ').toLowerCase(),
    });
  }

  for (const s of ATLAS_DATA.featuredSignals) {
    if (seen.has(s.id)) continue;
    docs.push({
      key: `signal-${s.id}`,
      title: s.title,
      meta: s.category,
      detail: s.desc,
      href: `/aesthetics/${s.id}`,
      palette: s.palette,
      haystack: [s.title, s.desc, s.category, s.useCase].join(' ').toLowerCase(),
    });
  }

  for (const a of ATLAS_DATA.aesthetics) {
    if (docs.some(d => d.title.toLowerCase() === a.name.toLowerCase())) continue;
    docs.push({
      key: `aesthetic-${a.name}`,
      title: a.name,
      meta: 'Aesthetic',
      detail: a.traits,
      href: '/aesthetics',
      palette: a.palette,
      haystack: [a.name, a.traits, 'aesthetic'].join(' ').toLowerCase(),
    });
  }

  for (const p of ATLAS_DATA.photoStyles) {
    docs.push({
      key: `photo-${p.num}`,
      title: p.name,
      meta: 'Photography',
      detail: p.meta.join(' · '),
      href: '/photography',
      haystack: [p.name, ...p.meta, 'photography', 'photo style'].join(' ').toLowerCase(),
    });
  }

  for (const p of ATLAS_DATA.prompts) {
    docs.push({
      key: `prompt-${p.title}`,
      title: p.title,
      meta: `Prompt · ${p.tool}`,
      detail: stripHtml(p.body),
      href: `/prompts/${p.title.toLowerCase().replace(/ /g, '-')}`,
      haystack: [p.title, p.tool, p.category, ...p.tags, stripHtml(p.body), 'prompt'].join(' ').toLowerCase(),
    });
  }

  for (const v of ATLAS_DATA.viralSignals) {
    docs.push({
      key: `viral-${v.num}`,
      title: v.title,
      meta: `Viral Signal · ${v.platform}`,
      detail: v.why,
      href: '/viral-signals',
      haystack: [v.title, v.why, v.platform, ...v.tags, 'trend', 'viral'].join(' ').toLowerCase(),
    });
  }

  for (const t of ATLAS_DATA.tasteProfiles) {
    docs.push({
      key: `taste-${t.id}`,
      title: t.name,
      meta: 'Taste Profile',
      detail: t.industries,
      href: '/taste',
      palette: t.palette,
      haystack: [t.name, t.industries, t.type, t.photo, t.ui, t.prompt, t.personality, 'taste', 'brand concept'].join(' ').toLowerCase(),
    });
  }

  return docs;
}

export function searchDocs(docs: SearchDoc[], query: string, max = 8): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return docs
    .map(doc => {
      const title = doc.title.toLowerCase();
      let score = 0;
      if (title === q) score = 100;
      else if (title.startsWith(q)) score = 80;
      else if (title.includes(q)) score = 60;
      else if (terms.every(t => doc.haystack.includes(t))) score = 30;
      else if (doc.haystack.includes(q)) score = 20;
      return { doc, score };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map(r => r.doc);
}
