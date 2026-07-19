import Link from 'next/link';
import './framer.css';
import { ATLAS_DATA } from '@/data/data';
import LiveSearch from '@/components/home/LiveSearch';

export default function Home() {
  const topSignals = ATLAS_DATA.featuredSignals.slice(0, 3);
  const heroCardStyles = [
    { top: '0', left: '0', transform: 'rotate(-3deg)', zIndex: 1 },
    { top: '60px', right: '0', transform: 'rotate(5deg)', zIndex: 2 },
    { bottom: '40px', left: '40px', transform: 'rotate(-2deg)', zIndex: 3 }
  ];

  const marqueeItems = [...ATLAS_DATA.viralSignals, ...ATLAS_DATA.viralSignals].slice(0, 6);
  const highSignals = ATLAS_DATA.featuredSignals.slice(0, 4);
  const prompts = ATLAS_DATA.prompts.slice(0, 2);

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
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/trends" className="framer-nav-btn" style={{ background: '#fff', color: '#000', padding: '12px 24px', textDecoration: 'none' }}>Start Exploring</Link>
                <Link href="/search" className="framer-nav-btn" style={{ background: 'transparent', padding: '12px 24px', textDecoration: 'none' }}>View Index</Link>
              </div>
            </div>
            <div className="framer-hero-visual">
              {topSignals.map((signal, index) => (
                <Link key={signal.id} href={`/aesthetics/${signal.id}`} className="framer-card" style={{ ...heroCardStyles[index % heroCardStyles.length], textDecoration: 'none' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '8px' }}>{signal.title}</div>
                  <div style={{ fontSize: '0.625rem', fontFamily: 'var(--font-mono)', color: 'var(--framer-text-muted)', textTransform: 'uppercase' }}>
                    {signal.tag || 'TRENDING'}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="framer-marquee-container">
        <div className="framer-marquee-track">
          {marqueeItems.map((v, i) => (
            <Link key={i} href={`/search?q=${encodeURIComponent(v.title)}`} className="framer-marquee-item" style={{ textDecoration: 'none' }}>
              <span>&bull;</span> {v.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="framer-container">
        <section className="framer-section">
          <div className="framer-bento-grid">
            <Link href="/viral-signals" className="framer-box" style={{ display: 'block', textDecoration: 'none' }}>
              <div style={{ fontSize: '3rem', fontWeight: 700 }}>24.8k</div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--framer-text-muted)', marginTop: '8px' }}>CURATED SIGNALS</div>
            </Link>
            <div className="framer-box">
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--framer-text-muted)', marginBottom: '16px', borderBottom: '1px solid var(--framer-border)', paddingBottom: '16px' }}>
                LIVE INDEX · SEARCH THE SIGNALS
              </div>
              <div className="framer-box-purple">
                <LiveSearch />
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
                  <Link href="/search?q=typography" className="framer-badge" style={{ margin: 0, background: 'transparent', borderColor: 'rgba(199, 210, 254, 0.2)', color: '#c7d2fe', textDecoration: 'none' }}>TYPOGRAPHY</Link>
                  <Link href="/search?q=motion" className="framer-badge" style={{ margin: 0, background: 'transparent', borderColor: 'rgba(199, 210, 254, 0.2)', color: '#c7d2fe', textDecoration: 'none' }}>MOTION</Link>
                  <Link href="/search?q=3d" className="framer-badge" style={{ margin: 0, background: 'transparent', borderColor: 'rgba(199, 210, 254, 0.2)', color: '#c7d2fe', textDecoration: 'none' }}>3D ASSETS</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="framer-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '40px', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>High-signal directions right now</div>
            <Link href="/aesthetics" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--framer-text-muted)', textDecoration: 'none' }}>ALL AESTHETICS &rarr;</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {highSignals.map((signal) => (
              <Link key={signal.id} href={`/aesthetics/${signal.id}`} className="framer-box" style={{ padding: '24px', display: 'block', textDecoration: 'none' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>{signal.title}</div>
                <div style={{ color: 'var(--framer-text-muted)' }}>{signal.desc.substring(0, 60)}...</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="framer-section" style={{ borderTop: '1px solid var(--framer-border)' }}>
          <div style={{ marginBottom: '40px', fontSize: '2rem', fontWeight: 700 }}>A prompt pack for every direction</div>
          <div className="framer-box-purple" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {prompts.map((p, index) => (
              <Link key={index} href="/prompts" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: '#c7d2fe', padding: '16px', background: 'rgba(0,0,0,0.4)', borderRadius: '8px', display: 'block', textDecoration: 'none' }}>
                "{p.body.replace(/<[^>]*>/g, '')}"
              </Link>
            ))}
            <Link href="/prompts" className="framer-nav-btn" style={{ alignSelf: 'flex-start', background: '#fff', color: '#000', marginTop: '16px', textDecoration: 'none' }}>Browse All Prompts</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
