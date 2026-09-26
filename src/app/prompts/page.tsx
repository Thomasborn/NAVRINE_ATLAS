'use client';
import { useState } from 'react';
import { ATLAS_DATA as D } from '@/data/data';

export default function PromptsPage() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState(false);
  // "Filter · Tool" cycles All → each tool → All
  const tools = [...new Set(D.prompts.map(p => p.tool))];
  const [tool, setTool] = useState<string | null>(null);
  const nextTool = () => setTool(tool === null ? tools[0] : tools[tools.indexOf(tool) + 1] ?? null);
  const shown = D.prompts.filter(p => tool === null || p.tool === tool);
  const copyAll = () => {
    navigator.clipboard?.writeText(shown.map(p => `${p.title} (${p.tool})\n${p.body.replace(/<[^>]+>/g, "")}`).join("\n\n"));
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 1400);
  };
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
            <button type="button" className="pill" onClick={copyAll}>{allCopied ? "Copied ✓" : "Copy all"}</button>
            <button type="button" className={`pill ${tool ? "active" : ""}`} onClick={nextTool}>Filter · {tool ?? "Tool"}</button>
          </div>
        </div>

        <div className="prompt-grid">
          {shown.map((p, i) => (
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
                  {p.tags.map(t => <span key={t} className="pill">{t}</span>)}
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
