'use client';
import { ATLAS_DATA as D } from '@/data/data';

function SignalStrength({ level }: { level: number }) {
  return (
    <span className="signal-strength" data-level={level}>
      <span className="signal-bars">
        <span></span><span></span><span></span><span></span>
      </span>
      Signal {["—","Low","Med","High","Critical"][level]}
    </span>
  );
}

export default function ViralSignalsPage() {
  return (
    <section id="viral-signals">
      <div className="shell" style={{ marginTop: '2rem' }}>
        <div className="section-head">
          <div className="head-meta">
            <span className="eyebrow">Viral Signals</span>
            <h2 className="section-title">Read what's <em>rising</em>.</h2>
            <p className="lede">A content-intelligence layer over the atlas. Each signal tracks why a pattern is rising, where it lives, and how to translate it into product or campaign work.</p>
          </div>
          <div className="head-aside">
            <span className="pill">↻ Updated weekly</span>
          </div>
        </div>

        <div className="viral-grid">
          {D.viralSignals.map((v: any) => (
            <article key={v.num} className="viral-card">
              <div className="viral-top">
                <span className="viral-num">{v.num}</span>
                <SignalStrength level={v.strength}/>
              </div>
              <div className="viral-title">{v.title}</div>
              <p className="viral-why">{v.why}</p>
              <div className="viral-tags">
                {v.tags.map((t: string) => <span key={t} className="pill">{t}</span>)}
              </div>
              <div className="viral-foot">
                <span>{v.platform}</span>
                <a href="#" className="turn">Turn into campaign →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
