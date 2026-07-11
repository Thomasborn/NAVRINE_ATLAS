export default function AboutPage() {
  return (
    <section>
      <div className="shell" style={{ marginTop: '2rem', maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <div className="section-head" style={{ borderBottom: 'none', marginBottom: '2rem', textAlign: 'center' }}>
          <div className="head-meta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="eyebrow" style={{ marginBottom: '1rem' }}>About Navrine</span>
            <h1 className="display" style={{ marginTop: '1rem', fontSize: '4rem' }}>Mapping the <em>signals</em>.</h1>
          </div>
        </div>

        <div style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-2)' }}>
          <p style={{ marginBottom: '2rem', color: 'var(--text-1)', fontSize: '1.5rem', lineHeight: 1.6 }}>Navrine Atlas is an editorial platform and visual culture index tracking the aesthetic signals that shape modern design, branding, and creative direction.</p>
          
          <h3 style={{ color: 'var(--text-1)', marginTop: '3rem', marginBottom: '1rem' }}>The Mission</h3>
          <p style={{ marginBottom: '1.5rem' }}>We believe that taste is not entirely subjective. Taste is the result of continuous exposure, curation, and the ability to spot patterns across different disciplines. The Atlas was built to make this process explicit rather than implicit.</p>
          
          <h3 style={{ color: 'var(--text-1)', marginTop: '3rem', marginBottom: '1rem' }}>For Founders & Designers</h3>
          <p style={{ marginBottom: '1.5rem' }}>Whether you are a founder trying to establish the visual positioning of a new SaaS product, or a creative director building a campaign system, the Atlas provides the reference material needed to make intentional choices.</p>

          <div style={{ marginTop: '4rem', padding: '3rem', background: 'var(--surface-1)', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-1)', marginBottom: '1rem' }}>Built by Navrine Studio</h3>
            <p style={{ marginBottom: '2rem' }}>The Atlas is maintained by the design and cultural research team at Navrine Studio.</p>
            <a href="/studio" className="btn btn-ghost">Visit Navrine Studio<span className="btn-icon"></span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
