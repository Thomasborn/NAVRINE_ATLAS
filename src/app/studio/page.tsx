export default function StudioPage() {
  return (
    <section>
      <div className="shell" style={{ marginTop: '2rem' }}>
        <div className="section-head" style={{ borderBottom: 'none', marginBottom: '1rem' }}>
          <div className="head-meta">
            <span className="eyebrow">Navrine Studio</span>
            <h1 className="display" style={{ marginTop: '1rem', fontSize: '4rem' }}>We build the <em>future</em>.</h1>
            <p className="lede">A design and creative direction studio helping ambitious founders and brands translate cultural signals into high-impact products and campaigns.</p>
          </div>
          <div className="head-aside">
            <a href="mailto:hello@navrine.space" className="btn btn-primary">Work with us<span className="btn-icon"></span></a>
          </div>
        </div>

        <div className="bento" style={{ marginTop: '4rem' }}>
          <article className="signal-card span-2 card-light">
            <div className="card-top">
              <span className="pill accent">Service</span>
            </div>
            <div>
              <div className="card-title">Brand & Positioning</div>
              <p className="card-desc">Translating your product's value into a distinct visual culture and brand identity that resonates with early adopters.</p>
            </div>
          </article>
          <article className="signal-card span-2">
            <div className="card-top">
              <span className="pill accent">Service</span>
            </div>
            <div>
              <div className="card-title">Product UI/UX</div>
              <p className="card-desc">Designing premium, high-conversion web applications, dashboards, and marketing sites with modern aesthetics.</p>
            </div>
          </article>
          <article className="signal-card span-2 card-light">
            <div className="card-top">
              <span className="pill accent">Service</span>
            </div>
            <div>
              <div className="card-title">Creative Direction</div>
              <p className="card-desc">Guiding the visual execution of your campaigns, photography, and motion assets to align with rising trends.</p>
            </div>
          </article>
        </div>

        <div style={{ marginTop: '4rem', padding: '4rem', textAlign: 'center', background: 'var(--surface-1)', borderRadius: '12px' }}>
          <h2 className="section-title">Ready to build?</h2>
          <p className="lede" style={{ margin: '1rem auto 2rem', maxWidth: '600px' }}>Let's discuss your next project. We partner with a select group of clients each quarter.</p>
          <a href="mailto:hello@navrine.space" className="btn btn-ghost">Contact the Studio<span className="btn-icon"></span></a>
        </div>
      </div>
    </section>
  );
}
