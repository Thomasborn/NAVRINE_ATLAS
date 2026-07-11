'use client';
import { useState } from 'react';
import { ATLAS_DATA as D } from '@/data/data';

export default function PromptsPage() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const copy = (idx: number, body: string) => {
    const text = body.replace(/<[^>]+>/g, "");
    navigator.clipboard?.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1400);
  };

  return (
    <section id="prompts">
      <div className="shell" style={{ marginTop: '2rem' }}>
        <div className="section-head">
          <div className="head-meta">
            <span className="eyebrow">Prompt Library</span>
            <h2 className="section-title">A <em>prompt</em> pack for every direction.</h2>
            <p className="lede">920+ tuned prompts for image generation, UI, posters, album covers, campaigns, and brand systems. Tagged by tool, output, and atlas entry.</p>
          </div>
          <div className="head-aside">
            <button className="pill">Copy all</button>
            <button className="pill">Filter · Tool</button>
          </div>
        </div>

        <div className="prompt-grid">
          {D.prompts.map((p: any, i: number) => (
            <article key={p.title} className="prompt-card">
              <div className="prompt-head">
                <span className="prompt-tool">{p.tool}</span>
                {p.category && <span className="prompt-cat">{p.category}</span>}
              </div>
              <div className="prompt-title">{p.title}</div>

              <div className="prompt-body">
                <button
                  className={`prompt-copy ${copiedIdx === i ? "copied" : ""}`}
                  onClick={() => copy(i, p.body)}
                >{copiedIdx === i ? "Copied ✓" : "Copy"}</button>
                <span dangerouslySetInnerHTML={{ __html: p.body }} />
              </div>

              <div className="prompt-foot">
                <div className="prompt-tags">
                  {p.tags.map((t: string) => <span key={t} className="pill">{t}</span>)}
                </div>
                <a href={`/prompts/${p.title.toLowerCase().replace(/ /g, '-')}`} className="open-link" style={{color:"var(--green)"}}>Open →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
