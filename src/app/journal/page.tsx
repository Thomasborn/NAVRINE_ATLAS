import { ATLAS_DATA as D } from '@/data/data';
import Link from 'next/link';

export default function JournalPage() {
  const [feature, ...rest] = D.journal;
  return (
    <section id="journal">
      <div className="shell" style={{ marginTop: '2rem' }}>
        <div className="section-head">
          <div className="head-meta">
            <span className="eyebrow">The Journal</span>
            <h2 className="section-title">Field notes on <em>visual culture</em>.</h2>
            <p className="lede">Essays, playbooks, and field notes for designers, founders, and creative directors. SEO &amp; GEO-tuned for Google AI Overview, Perplexity, and Pinterest discovery.</p>
          </div>
          <div className="head-aside">
            <span className="pill">All essays</span>
            <span className="pill">RSS</span>
          </div>
        </div>

        <div className="journal-grid">
          <article className="journal-card jr-feature">
            <div className="jr-visual"><div className={`mood ${feature.visual}`}></div></div>
            <div className="jr-body">
              <div className="jr-meta">
                {feature.meta.map((m: string, i: number) => (
                  <span key={i}>
                    <span>{m}</span>
                    {i < feature.meta.length - 1 && <span style={{color:"var(--text-4)", margin: "0 4px"}}>·</span>}
                  </span>
                ))}
              </div>
              <h3 className="jr-title">{feature.title}</h3>
              <p className="jr-excerpt">{feature.excerpt}</p>
              <div className="jr-foot">
                <span>By the Atlas Editors</span>
                <Link href={`/journal/${feature.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="read">Read essay →</Link>
              </div>
            </div>
          </article>

          {rest.map((j: any, idx: number) => {
            const isWide = idx === 4;
            return (
              <article key={j.title} className={`journal-card ${isWide ? "jr-wide" : "compact"}`}>
                <div className="jr-visual"><div className={`mood ${j.visual}`}></div></div>
                <div className="jr-body">
                  <div className="jr-meta">
                    {j.meta.map((m: string, i: number) => (
                      <span key={i}>
                        <span>{m}</span>
                        {i < j.meta.length - 1 && <span style={{color:"var(--text-4)", margin: "0 4px"}}>·</span>}
                      </span>
                    ))}
                  </div>
                  <h3 className="jr-title">{j.title}</h3>
                  <p className="jr-excerpt">{j.excerpt}</p>
                  <div className="jr-foot">
                    <span>{isWide ? "By the Atlas Editors" : "Atlas Editors"}</span>
                    <Link href={`/journal/${j.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="read">{isWide ? "Read essay →" : "Read →"}</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
