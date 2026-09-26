import { ATLAS_DATA as D } from '@/data/data';

const BASE = 'https://atlas.navrine.com';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
  const items = D.journal.map(j => {
    const url = `${BASE}/journal/${j.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    return `<item><title>${esc(j.title)}</title><link>${url}</link><guid>${url}</guid><category>${esc(j.meta[0])}</category><description>${esc(j.excerpt)}</description></item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Navrine Atlas — The Journal</title><link>${BASE}/journal</link><description>Field notes on visual culture from Navrine Atlas.</description>${items}</channel></rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
