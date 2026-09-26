'use client';
import { useState } from 'react';
import Link from 'next/link';

interface CatalogLayoutProps {
  title: string;
  description: string;
  entries: any[];
}

export default function CatalogLayout({ title, description, entries }: CatalogLayoutProps) {
  const [sort, setSort] = useState<'Newest' | 'A–Z' | 'Signal'>('Newest');
  const nextSort = () => setSort(sort === 'Newest' ? 'A–Z' : sort === 'A–Z' ? 'Signal' : 'Newest');
  const sorted = sort === 'A–Z' ? [...entries].sort((a, b) => a.title.localeCompare(b.title))
    : sort === 'Signal' ? [...entries].sort((a, b) => (b.strength ?? 0) - (a.strength ?? 0))
    : entries;

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
            <button type="button" className="pill" onClick={nextSort}>Sort · {sort}</button>
          </div>
        </div>

        <div className="bento">
          {sorted.map(s => {
            const isLightCard = ["vintage-pop-campaign", "cool-blue-minimal-saas", "chrome-future-poster"].includes(s.id);
            const lightClass = isLightCard ? "card-light" : "";

            return (
              <article key={s.id} className={`signal-card span-2 ${lightClass}`}>
                <div className="card-top">
                  <span className="pill accent">{s.category}</span>
                </div>

                {s.moodClass && (
                  <div className="signal-visual">
                    <div className={`mood ${s.moodClass}`}></div>
                  </div>
                )}

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
