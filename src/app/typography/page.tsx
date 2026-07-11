import { ATLAS_DATA as D } from '@/data/data';

export default function TypographyPage() {
  const fonts = D.tasteProfiles.map((p: any) => ({
    name: p.name,
    type: p.type
  }));

  return (
    <section>
      <div className="shell" style={{ marginTop: '2rem' }}>
        <div className="section-head">
          <div className="head-meta">
            <span className="eyebrow">Visual Assets</span>
            <h2 className="section-title"><em>Typography</em> Stacks.</h2>
            <p className="lede">A breakdown of typography combinations used across various creative directions in the Atlas.</p>
          </div>
        </div>

        <div className="bento">
          {fonts.map((f, idx) => (
            <article key={idx} className="signal-card span-2">
              <div className="card-top">
                <span className="pill accent">{f.name}</span>
              </div>

              <div style={{ margin: '2rem 0' }}>
                <h3 className="display" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Aa</h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-2)' }}>{f.type}</p>
              </div>

              <div className="card-foot">
                <span className="meta">Font Stack</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
