// Framer Clone UI - Home Page Layout
import './framer.css';

export default function Home() {
  return (
    <div className="framer-mode">

      <div className="framer-container">
        <section className="framer-hero">
          <div className="framer-hero-grid">
            <div>
              <div className="framer-badge">ISSUE 014 · MAY 2026</div>
              <h1 className="framer-hero-title">
                The visual <i>culture</i> map for trends, <i>aesthetics &</i> taste.
              </h1>
              <p className="framer-hero-desc">
                Discover emerging design patterns and aesthetic movements before they hit the mainstream.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button className="framer-nav-btn" style={{ background: '#fff', color: '#000', padding: '12px 24px' }}>Start Exploring</button>
                <button className="framer-nav-btn" style={{ background: 'transparent', padding: '12px 24px' }}>View Index</button>
              </div>
            </div>
            <div className="framer-hero-visual">
              <div className="framer-card" style={{ top: '0', left: '0', transform: 'rotate(-3deg)', zIndex: 1 }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '8px' }}>Y2K Futurism</div>
                <div style={{ fontSize: '0.625rem', fontFamily: 'var(--font-mono)', color: 'var(--framer-text-muted)' }}>SIGNAL CRITICAL</div>
              </div>
              <div className="framer-card" style={{ top: '60px', right: '0', transform: 'rotate(5deg)', zIndex: 2 }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '8px' }}>Neo-Brutalism</div>
                <div style={{ fontSize: '0.625rem', fontFamily: 'var(--font-mono)', color: 'var(--framer-text-muted)' }}>TRENDING UP</div>
              </div>
              <div className="framer-card" style={{ bottom: '40px', left: '40px', transform: 'rotate(-2deg)', zIndex: 3 }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '8px' }}>Soft Glass</div>
                <div style={{ fontSize: '0.625rem', fontFamily: 'var(--font-mono)', color: 'var(--framer-text-muted)' }}>EMERGING</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="framer-marquee-container">
        <div className="framer-marquee-track">
          <div className="framer-marquee-item"><span>&bull;</span> Notes App Chic crosses into B2B</div>
          <div className="framer-marquee-item"><span>&bull;</span> Mixed-media poster trends</div>
          <div className="framer-marquee-item"><span>&bull;</span> Sodium-vapor photography</div>
          <div className="framer-marquee-item"><span>&bull;</span> Notes App Chic crosses into B2B</div>
          <div className="framer-marquee-item"><span>&bull;</span> Mixed-media poster trends</div>
          <div className="framer-marquee-item"><span>&bull;</span> Sodium-vapor photography</div>
        </div>
      </div>

      <div className="framer-container">
        <section className="framer-section">
          <div className="framer-bento-grid">
            <div className="framer-box">
              <div style={{ fontSize: '3rem', fontWeight: 700 }}>24.8k</div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--framer-text-muted)', marginTop: '8px' }}>CURATED SIGNALS</div>
            </div>
            <div className="framer-box">
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--framer-text-muted)', marginBottom: '16px', borderBottom: '1px solid var(--framer-border)', paddingBottom: '16px' }}>
                LIVE INDEX · SEARCH THE SIGNALS
              </div>
              <div className="framer-box-purple">
                <div className="framer-search">
                  <span style={{ color: '#000' }}>🔍</span>
                  <input type="text" placeholder="Try 'acid graphics' or 'skeuomorphism'" />
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
                  <span className="framer-badge" style={{ margin: 0, background: 'transparent', borderColor: 'rgba(199, 210, 254, 0.2)', color: '#c7d2fe' }}>TYPOGRAPHY</span>
                  <span className="framer-badge" style={{ margin: 0, background: 'transparent', borderColor: 'rgba(199, 210, 254, 0.2)', color: '#c7d2fe' }}>MOTION</span>
                  <span className="framer-badge" style={{ margin: 0, background: 'transparent', borderColor: 'rgba(199, 210, 254, 0.2)', color: '#c7d2fe' }}>3D ASSETS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="framer-section">
          <div style={{ marginBottom: '40px', fontSize: '2rem', fontWeight: 700 }}>High-signal directions right now</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <div className="framer-box" style={{ padding: '24px' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>Y2K Futurism</div>
              <div style={{ color: 'var(--framer-text-muted)' }}>Metallic textures and hyper-brights</div>
            </div>
            <div className="framer-box" style={{ padding: '24px' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>Neo-Brutalism</div>
              <div style={{ color: 'var(--framer-text-muted)' }}>Raw layouts and high contrast</div>
            </div>
            <div className="framer-box" style={{ padding: '24px' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>Soft Glass</div>
              <div style={{ color: 'var(--framer-text-muted)' }}>Muted blurs and translucent panels</div>
            </div>
            <div className="framer-box" style={{ padding: '24px' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>Acid Graphics</div>
              <div style={{ color: 'var(--framer-text-muted)' }}>Melted typography and saturated colors</div>
            </div>
          </div>
        </section>

        <section className="framer-section" style={{ borderTop: '1px solid var(--framer-border)' }}>
          <div style={{ marginBottom: '40px', fontSize: '2rem', fontWeight: 700 }}>A prompt pack for every direction</div>
          <div className="framer-box-purple" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: '#c7d2fe', padding: '16px', background: 'rgba(0,0,0,0.4)', borderRadius: '8px' }}>
              "Create a high-contrast web layout in neo-brutalist style, featuring thick black borders, a vibrant yellow background (#FFD600), and large bold typography."
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: '#c7d2fe', padding: '16px', background: 'rgba(0,0,0,0.4)', borderRadius: '8px' }}>
              "A 3D render of a futuristic chrome object resting on a soft glowing pedestal, Y2K aesthetic, iridescent lighting."
            </div>
            <button className="framer-nav-btn" style={{ alignSelf: 'flex-start', background: '#fff', color: '#000', marginTop: '16px' }}>Copy All Prompts</button>
          </div>
        </section>
      </div>
    </div>
  );
}
