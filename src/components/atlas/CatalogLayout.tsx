import { AtlasEntry } from '@/data/seed';
import Link from 'next/link';

interface CatalogLayoutProps {
  title: string;
  description: string;
  entries: any[];
}

export default function CatalogLayout({ title, description, entries }: CatalogLayoutProps) {
  return (
    <section>
      <div className="shell" style={{ marginTop: '2rem' }}>
        <div className="section-head">
          <div className="head-meta">
            <span className="eyebrow">Atlas Catalog</span>
            <h2 className="section-title">{title}</h2>
            <p className="lede">{description}</p>
          </div>
          <div className="head-aside">
            <span className="pill">Sort · Newest</span>
          </div>
        </div>

        <div className="bento">
          {entries.map(s => {
            const isLightCard = ["vintage-pop-campaign", "cool-blue-minimal-saas", "chrome-future-poster"].includes(s.id);
            const lightClass = isLightCard ? "card-light" : "";

            return (
              <article key={s.id} className={`signal-card span-2 ${lightClass}`}>
                <div className="card-top">
                  <span className="pill accent">{s.category}</span>
                </div>

                <div>
                  <div className="card-title">{s.title}</div>
                  <p className="card-desc">{s.desc}</p>
                </div>

                <div className="swatches">
                  {s.palette?.map((c: string, i: number) => <span key={i} className="swatch" style={{background:c}}></span>)}
                </div>

                <div className="card-foot">
                  <span className="meta">{s.useCase}</span>
                  <Link href={`/aesthetics/${s.id}`} className="open-link">
                    Open Atlas Entry <span className="arr">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
