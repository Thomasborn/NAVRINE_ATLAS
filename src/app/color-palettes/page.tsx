import { ATLAS_DATA as D } from '@/data/data';

export default function ColorPalettesPage() {
  const palettes = D.tasteProfiles.map((p: any) => ({
    name: p.name,
    colors: p.palette,
    use: p.industries
  })).concat(D.aesthetics.map((a: any) => ({
    name: a.name,
    colors: a.palette,
    use: a.traits
  })));

  return (
    <section>
      <div className="shell" style={{ marginTop: '2rem' }}>
        <div className="section-head">
          <div className="head-meta">
            <span className="eyebrow">Visual Assets</span>
            <h2 className="section-title">Color <em>Palettes</em>.</h2>
            <p className="lede">The precise color values driving modern design concepts, extracted from our taste index and aesthetic library.</p>
          </div>
          <div className="head-aside">
            <span className="pill">Copy hex codes</span>
          </div>
        </div>

        <div className="bento">
          {palettes.map((p, idx) => (
            <article key={idx} className="signal-card span-1">
              <div className="card-top">
                <span className="pill accent">{p.name}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', gap: '4px', height: '60px', borderRadius: '8px', overflow: 'hidden' }}>
                  {p.colors.map((c: string, i: number) => (
                    <div key={i} style={{ flex: 1, background: c }} />
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '4px', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                  {p.colors.map((c: string, i: number) => (
                    <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-3)' }}>{c}</span>
                  ))}
                </div>
              </div>

              <div className="card-foot" style={{ marginTop: '1.5rem' }}>
                <span className="meta" style={{ fontSize: '0.875rem' }}>{p.use.substring(0, 40)}...</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
