'use client';
import { useState } from 'react';
import { ATLAS_DATA as D } from '@/data/data';

export default function AssetsPage() {
  // "Format · All" cycles through the formats in the library
  const formats = [...new Set(D.assets.map(a => a.format))];
  const [format, setFormat] = useState<string | null>(null);
  const nextFormat = () => setFormat(format === null ? formats[0] : formats[formats.indexOf(format) + 1] ?? null);

  return (
    <section id="assets">
      <div className="shell" style={{ marginTop: '2rem' }}>
        <div className="section-head">
          <div className="head-meta">
            <span className="eyebrow">Asset Library</span>
            <h2 className="section-title">Download &amp; <em>deploy</em>.</h2>
            <p className="lede">Editable templates, color packs, UI kits, shot lists, and concept boards — designed to drop into a project the same day you find them.</p>
          </div>
          <div className="head-aside">
            <button type="button" className={`pill ${format ? "active" : ""}`} onClick={nextFormat}>Format · {format ?? "All"}</button>
          </div>
        </div>

        <div className="asset-grid">
          {D.assets.filter(a => format === null || a.format === format).map(a => (
            <article key={a.title} className="asset-card">
              <div className="asset-visual">
                <span className="asset-format">{a.format}</span>
                <div className={`mood ${a.visual}`}></div>
              </div>
              <div className="asset-body">
                <div className="asset-title">{a.title}</div>
                <div className="asset-cat">{a.cat}</div>
                <div className="asset-foot">
                  <a href={`/assets/${a.title.toLowerCase().replace(/ /g, '-')}`} className="dl">↓ Get asset</a>
                  <span className="size">{a.size}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
