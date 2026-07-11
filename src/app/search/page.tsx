'use client';
import { useState } from 'react';
import { sampleAtlasEntries } from '@/data/seed';
import Link from 'next/link';

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState("Category");

  const filters = ["Category","Region","Industry","Mood","Color","Era","Platform","Use Case"];
  const chips = [
    "Music startup","TikTok poster trend","Urban photography","Y2K website",
    "Luxury SaaS","Indonesian pop culture","AI album cover","Street campaign",
    "Cool blue minimal","Notes app chic","Chrome future"
  ];
  
  const entries = sampleAtlasEntries;

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
          <div className="bento">
            {entries.map(s => {
              const isLightCard = ["vintage-pop-campaign", "cool-blue-minimal-saas", "chrome-future-poster"].includes(s.slug);
              const lightClass = isLightCard ? "card-light" : "";

              return (
                <article key={s.id} className={`signal-card span-2 ${lightClass}`}>
                  <div className="card-top">
                    <span className="pill accent">{s.category}</span>
                  </div>

                  <div>
                    <div className="card-title">{s.title}</div>
                    <p className="card-desc">{s.subtitle || s.description.substring(0, 100) + '...'}</p>
                  </div>

                  <div className="swatches">
                    {s.colorPalette.map((c,i) => <span key={i} className="swatch" style={{background:c}}></span>)}
                  </div>

                  <div className="card-foot">
                    <span className="meta">{s.industries?.[0] || 'Various'}</span>
                    <Link href={`/${s.category.toLowerCase().replace(' ', '-')}/${s.slug}`} className="open-link">
                      Open Atlas Entry <span className="arr">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
