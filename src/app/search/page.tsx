'use client';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { buildSearchIndex, searchDocs } from '@/lib/search-index';
import Link from 'next/link';

const INDEX = buildSearchIndex();

function SearchContent() {
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get('q') ?? '');
  const [active, setActive] = useState("Category");

  const filters = ["Category","Region","Industry","Mood","Color","Era","Platform","Use Case"];
  const chips = [
    "Music startup","TikTok poster trend","Urban photography","Y2K website",
    "Luxury SaaS","Indonesian pop culture","AI album cover","Street campaign",
    "Cool blue minimal","Notes app chic","Chrome future"
  ];

  const norm = q.trim();
  const entries = norm ? searchDocs(INDEX, norm, INDEX.length) : INDEX;

  return (
    <section id="search">
      <div className="shell" style={{ marginTop: '2rem' }}>
        <div className="section-head">
          <div className="head-meta">
            <span className="eyebrow">Atlas Search</span>
            <h2 className="section-title">Search the <em>signals</em>.</h2>
            <p className="lede">Cross-reference atlas entries by aesthetic, region, industry, era, mood, platform, or use case.</p>
          </div>
        </div>

        <div className="search-card">
          <div className="search-bar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7"/>
              <path d="m20 20-3.5-3.5"/>
            </svg>
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search aesthetics, trends, prompts, photography styles, or brand concepts…"
            />
            <span className="kbd">⌘ K</span>
          </div>

          <div className="search-filters">
            {filters.map(f => (
              <button
                key={f}
                className={`pill ${active === f ? "active" : ""}`}
                onClick={() => setActive(f)}
              >{f}</button>
            ))}
          </div>

          <div className="search-chips-label">Try a query</div>
          <div className="search-chips">
            {chips.map(c => (
              <button key={c} className="pill" onClick={() => setQ(c)}>
                <span style={{color:"var(--text-3)"}}>→</span>{c}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '4rem' }}>
          {entries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p className="lede">No atlas entries match “{q}”.</p>
              <button className="pill" style={{ marginTop: '1rem' }} onClick={() => setQ("")}>Clear search</button>
            </div>
          ) : (
          <div className="bento">
            {entries.map(doc => (
              <article key={doc.key} className="signal-card span-2">
                <div className="card-top">
                  <span className="pill accent">{doc.meta}</span>
                </div>

                <div>
                  <div className="card-title">{doc.title}</div>
                  <p className="card-desc">{doc.detail.length > 120 ? doc.detail.substring(0, 120) + '…' : doc.detail}</p>
                </div>

                {doc.palette && (
                  <div className="swatches">
                    {doc.palette.map((c, i) => <span key={i} className="swatch" style={{ background: c }}></span>)}
                  </div>
                )}

                <div className="card-foot">
                  <span className="meta">{doc.href.split('/')[1].replace(/-/g, ' ')}</span>
                  <Link href={doc.href} className="open-link">
                    Open Atlas Entry <span className="arr">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchContent />
    </Suspense>
  );
}
