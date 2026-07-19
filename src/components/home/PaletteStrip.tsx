import Link from 'next/link';
import { ATLAS_DATA } from '@/data/data';

const AESTHETIC_SLUGS: Record<string, string> = {
  'Neo-Y2K': 'neo-y2k-interface',
  'Vintage Pop': 'vintage-pop-campaign',
  'Cyber Street': 'cyber-street-identity',
  'Cool Blue Minimal': 'cool-blue-minimal-saas',
  'Chrome Future': 'chrome-future-poster',
  'Premium Dark': 'premium-dark-dashboard',
  'Asian Pop': 'asian-pop-music-visual',
  'Urban Editorial': 'urban-night-photography',
};

export default function PaletteStrip() {
  return (
    <section className="home-section" id="palettes">
      <header className="section-head">
        <span className="section-index">02</span>
        <h2 className="section-title">Working <em>Palettes</em></h2>
        <p className="section-lede">
          Twelve aesthetic systems, each reduced to its working colors.
        </p>
      </header>
      <div className="palette-strip">
        {ATLAS_DATA.aesthetics.map((a) => {
          const slug = AESTHETIC_SLUGS[a.name];
          const href = slug ? `/aesthetics/${slug}` : `/search?q=${encodeURIComponent(a.name)}`;
          
          return (
            <Link key={a.name} href={href} style={{ textDecoration: 'none', display: 'block' }}>
              <article className="palette-chip" style={{ height: '100%' }}>
                <div className="palette-bars">
                  {a.palette.map((p) => (
                    <span key={p} style={{ background: p }} />
                  ))}
                </div>
                <h3>{a.name}</h3>
                <p>{a.traits}</p>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
