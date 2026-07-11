'use client';
import { Component, type ReactNode, useEffect, useState, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ATLAS_DATA } from '@/data/data';
import type { OrbitCardData } from './cardTexture';

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const OrbitScene = dynamic(() => import('./OrbitScene'), { ssr: false });

class SceneBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function buildCards(): OrbitCardData[] {
  const signals = ATLAS_DATA.featuredSignals.map((s) => ({
    id: s.id,
    title: s.title,
    category: s.category,
    palette: s.palette,
  }));
  const aesthetics = ATLAS_DATA.aesthetics.slice(0, 7).map((a) => ({
    id: `aes-${a.name.toLowerCase().replace(/\s+/g, '-')}`,
    title: a.name,
    category: 'Aesthetic',
    palette: a.palette,
  }));
  return [...signals, ...aesthetics];
}

function StaticOrbit() {
  const cards = buildCards().slice(0, 5);
  return (
    <div className="orbit-static">
      {cards.map((c, i) => (
        <div key={c.id} className={`orbit-static-card osc-${i + 1}`}>
          <div className="osc-swatches">
            {c.palette.slice(0, 4).map((p) => (
              <span key={p} style={{ background: p }} />
            ))}
          </div>
          <div className="osc-title">{c.title}</div>
          <div className="osc-cat">{c.category}</div>
        </div>
      ))}
    </div>
  );
}

export default function OrbitHero() {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const probe = document.createElement('canvas');
      setWebgl(!!(probe.getContext('webgl2') || probe.getContext('webgl')));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const mode: 'pending' | 'scene' | 'static' =
    webgl === null ? 'pending' : reduced || !webgl ? 'static' : 'scene';

  return (
    <section className="orbit-hero" id="top">
      <div className="orbit-hero-canvas" aria-hidden="true">
        {mode === 'scene' && (
          <SceneBoundary fallback={<StaticOrbit />}>
            <OrbitScene cards={buildCards()} isMobile={isMobile} />
          </SceneBoundary>
        )}
        {mode === 'static' && <StaticOrbit />}
      </div>

      <div className="orbit-hero-content shell">
        <div className="orbit-hero-meta">
          <span className="pill">
            <span className="dot dot-green"></span>Issue 014 · May 2026
          </span>
          <span className="pill">Visual Culture Catalog</span>
        </div>
        <h1 className="orbit-headline">
          The visual culture
          <br />
          map for <em>trends,</em>
          <br />
          aesthetics &amp; <em>taste.</em>
        </h1>
        <p className="orbit-sub">
          Navrine Atlas decodes the signals behind modern visual culture — from
          Neo-Y2K interfaces and urban night photography to poster trends,
          premium product direction, and AI prompt grammar.
        </p>
        <div className="orbit-ctas">
          <a href="#signals" className="btn btn-primary">Explore the Atlas</a>
          <Link href="/studio" className="btn btn-ghost">Build with Navrine Studio</Link>
        </div>
      </div>

      <div className="orbit-scroll-cue" aria-hidden="true">
        <span className="orbit-scroll-line"></span>Scroll
      </div>
    </section>
  );
}
