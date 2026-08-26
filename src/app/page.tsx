'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './framer.css';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedPrompt, setCopiedPrompt] = useState<number | null>(null);

  const prompts = [
    {
      id: 1,
      title: 'Neo-Y2K Hero Render',
      tool: 'Midjourney v7',
      text: 'Hero product mock for a music creator app, neo-Y2K aesthetic, translucent chrome buttons, soft gradient orb backgrounds, magenta and electric blue, soft 3D lighting, photoreal, --ar 16:9 --style raw --v 7',
      tags: ['3D', 'Hero', 'Brand'],
    },
    {
      id: 2,
      title: 'Urban Night Campaign',
      tool: 'Flux Pro 1.1',
      text: 'Street campaign photograph, night neon Jakarta side street, subject in oversized varsity jacket, sodium amber spill from shop signage, mild motion blur, 35mm, Kodak Portra 800 grain, --ar 4:5',
      tags: ['Photo', 'Campaign', 'Night'],
    },
    {
      id: 3,
      title: 'Premium Dark Dashboard',
      tool: 'v0 / Lovable',
      text: 'Generate a premium dark analytics dashboard for an AI infra product. Background #070707, hairline borders, electric blue accent #4D8DFF, large editorial serif headline, sparse spacing.',
      tags: ['UI', 'SaaS', 'Code'],
    },
    {
      id: 4,
      title: 'Chrome Future Poster',
      tool: 'Midjourney v7',
      text: 'Festival poster, liquid chrome 3D type spelling "ATLAS", floating in soft volumetric light, magenta and cobalt rim, dust particles, Cinema 4D render, octane, photoreal, --ar 2:3',
      tags: ['Poster', '3D', 'Music'],
    },
  ];

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(id);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  return (
    <div className="framer-mode" style={{ minHeight: '100vh', background: '#080808', color: '#fff' }}>
      
      {/* Floating Header */}
      <nav className="framer-nav">
        <div className="framer-nav-logo">
          <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Navrine Atlas</Link>
        </div>
        <div className="framer-nav-links">
          <a href="#discover">Discover</a>
          <a href="#style">Style</a>
          <a href="#create">Create</a>
          <a href="#journal">Jurnal</a>
        </div>
        <a href="#submit" className="framer-nav-btn" style={{ textDecoration: 'none', color: 'inherit' }}>
          Let's Build &rarr;
        </a>
      </nav>

      {/* Main Container */}
      <div className="framer-container">
        {/* Hero Section */}
        <section className="framer-hero" id="discover">
          <div className="framer-hero-grid">
            <div>
              <div className="framer-badge">ISSUE 014 · MAY 2026</div>
              <h1 className="framer-hero-title">
                The visual <i>culture</i> map for trends, <i>aesthetics &</i> taste.
              </h1>
              <p className="framer-hero-desc">
                Navrine Atlas decodes the signals behind modern visual culture — from Neo-Y2K interfaces and urban night photography to poster trends, premium SaaS direction, and AI prompt grammar.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="#signals" className="framer-nav-btn" style={{ background: '#fff', color: '#000', padding: '12px 28px', textDecoration: 'none', fontWeight: 600 }}>
                  Start Exploring
                </a>
                <a href="#search" className="framer-nav-btn" style={{ background: 'transparent', padding: '12px 28px', textDecoration: 'none' }}>
                  View Index
                </a>
              </div>
            </div>

            {/* Interactive Visual Cards */}
            <div className="framer-hero-visual">
              <div className="framer-card" style={{ top: '0', left: '0', transform: 'rotate(-3deg)', zIndex: 1 }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '8px' }}>Neo-Y2K Interface</div>
                <div style={{ fontSize: '0.625rem', fontFamily: 'var(--font-mono)', color: '#a3e635' }}>RISING +212%</div>
                <div style={{ fontSize: '0.8rem', color: '#a1a1aa', marginTop: '8px' }}>Translucent chrome, rounded LCD glyphs, gradient orbs &amp; bubble nav.</div>
              </div>
              <div className="framer-card" style={{ top: '60px', right: '0', transform: 'rotate(5deg)', zIndex: 2 }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '8px' }}>Vintage Pop</div>
                <div style={{ fontSize: '0.625rem', fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>TRENDING</div>
                <div style={{ fontSize: '0.8rem', color: '#a1a1aa', marginTop: '8px' }}>Bleached film tones, halftone print &amp; hand-lettered type.</div>
              </div>
              <div className="framer-card" style={{ bottom: '20px', left: '30px', transform: 'rotate(-2deg)', zIndex: 3 }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '8px' }}>Urban Night</div>
                <div style={{ fontSize: '0.625rem', fontFamily: 'var(--font-mono)', color: '#f43f5e' }}>CRITICAL SIGNAL</div>
                <div style={{ fontSize: '0.8rem', color: '#a1a1aa', marginTop: '8px' }}>Sodium-vapor amber against shop neon, 35mm motion blur.</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Marquee Ticker */}
      <div className="framer-marquee-container">
        <div className="framer-marquee-track">
          <div className="framer-marquee-item"><span>&bull;</span> Neo-Y2K +212% week-over-week</div>
          <div className="framer-marquee-item"><span>&bull;</span> Urban Night Photography rising in SEA</div>
          <div className="framer-marquee-item"><span>&bull;</span> Notes App Chic crosses into B2B</div>
          <div className="framer-marquee-item"><span>&bull;</span> Mixed-script poster trend stabilized</div>
          <div className="framer-marquee-item"><span>&bull;</span> Neo-Y2K +212% week-over-week</div>
          <div className="framer-marquee-item"><span>&bull;</span> Urban Night Photography rising in SEA</div>
          <div className="framer-marquee-item"><span>&bull;</span> Notes App Chic crosses into B2B</div>
          <div className="framer-marquee-item"><span>&bull;</span> Mixed-script poster trend stabilized</div>
        </div>
      </div>

      <div className="framer-container">
        {/* Bento Index / Search Section */}
        <section className="framer-section" id="search">
          <div className="framer-bento-grid">
            <div className="framer-box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1 }}>24.8k</div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#a3e635', marginTop: '8px', letterSpacing: '0.05em' }}>
                CURATED SIGNALS
              </div>
              <div style={{ marginTop: '24px', fontSize: '0.9rem', color: '#a1a1aa' }}>
                1,284 Atlas Entries · 86 Aesthetics · 312 Photography Studies · 920+ Prompts
              </div>
            </div>

            <div className="framer-box">
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#a1a1aa', marginBottom: '16px', borderBottom: '1px solid var(--framer-border)', paddingBottom: '16px' }}>
                LIVE INDEX · SEARCH THE SIGNALS
              </div>
              <div className="framer-box-purple">
                <div className="framer-search">
                  <span style={{ color: '#000', fontSize: '1.1rem' }}>🔍</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Try 'acid graphics', 'neo-brutalism', or 'Y2K'..."
                  />
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
                  {['TYPOGRAPHY', 'MOTION', '3D ASSETS', 'POSTERS', 'BRANDING'].map((cat) => (
                    <span
                      key={cat}
                      className="framer-badge"
                      style={{ cursor: 'pointer', margin: 0, background: searchQuery === cat ? '#fff' : 'transparent', color: searchQuery === cat ? '#000' : '#c7d2fe', borderColor: 'rgba(199, 210, 254, 0.3)' }}
                      onClick={() => setSearchQuery(cat)}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* High Signal Directions */}
        <section className="framer-section" id="signals">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <div className="framer-badge">CURATED TRENDS</div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>High-signal directions right now</h2>
            </div>
            <Link href="/aesthetics" style={{ color: '#a3e635', textDecoration: 'none', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
              ALL AESTHETICS &rarr;
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            <div className="framer-box" style={{ padding: '28px' }}>
              <div className="framer-badge" style={{ borderColor: '#a3e635', color: '#a3e635' }}>CRITICAL SIGNAL</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '12px', marginBottom: '12px' }}>Neo-Y2K Interface</h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Translucent chrome, rounded LCD glyphs, gradient orbs and bubble navigation. Y2K resurrected for AI products.
              </p>
              <Link href="/aesthetics/neo-y2k-interface" style={{ color: '#fff', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', display: 'inline-block', marginTop: '16px' }}>
                EXPLORE SIGNAL &rarr;
              </Link>
            </div>

            <div className="framer-box" style={{ padding: '28px' }}>
              <div className="framer-badge" style={{ borderColor: '#60a5fa', color: '#60a5fa' }}>TRENDING UP</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '12px', marginBottom: '12px' }}>Vintage Pop Campaign</h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Bleached film tones, halftone print, hand-lettered Italian gelateria type. Slow-burn, durable branding style.
              </p>
              <Link href="/aesthetics/vintage-pop-campaign" style={{ color: '#fff', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', display: 'inline-block', marginTop: '16px' }}>
                EXPLORE SIGNAL &rarr;
              </Link>
            </div>

            <div className="framer-box" style={{ padding: '28px' }}>
              <div className="framer-badge" style={{ borderColor: '#f43f5e', color: '#f43f5e' }}>CRITICAL SIGNAL</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '12px', marginBottom: '12px' }}>Urban Night Photography</h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Sodium-vapor amber against shop neon, motion blur on a 35mm. The post-Tokyo, post-Jakarta visual lens.
              </p>
              <Link href="/aesthetics/urban-night-photography" style={{ color: '#fff', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', display: 'inline-block', marginTop: '16px' }}>
                EXPLORE SIGNAL &rarr;
              </Link>
            </div>

            <div className="framer-box" style={{ padding: '28px' }}>
              <div className="framer-badge" style={{ borderColor: '#c084fc', color: '#c084fc' }}>EMERGING</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '12px', marginBottom: '12px' }}>Cyber Street Identity</h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Helvetica condensed, scanline overlay, single-stripe accents. High contrast identity for Web3 and music labels.
              </p>
              <Link href="/aesthetics/cyber-street-identity" style={{ color: '#fff', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', display: 'inline-block', marginTop: '16px' }}>
                EXPLORE SIGNAL &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Prompt Pack Library */}
        <section className="framer-section" id="create" style={{ borderTop: '1px solid var(--framer-border)' }}>
          <div style={{ marginBottom: '40px' }}>
            <div className="framer-badge">CREATIVE TOOLKIT</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>A prompt pack for every direction</h2>
            <p style={{ color: '#a1a1aa', marginTop: '8px' }}>
              920+ tuned prompts for image generation, UI, posters, album covers, and brand systems.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {prompts.map((p) => (
              <div key={p.id} className="framer-box" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#c7d2fe' }}>{p.tool}</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {p.tags.map((t) => (
                        <span key={t} style={{ fontSize: '0.625rem', padding: '2px 6px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', color: '#a1a1aa' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px' }}>{p.title}</h4>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#d4d4d8', background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '8px', lineHeight: 1.5, border: '1px solid rgba(255,255,255,0.05)' }}>
                    "{p.text}"
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(p.text, p.id)}
                  className="framer-nav-btn"
                  style={{ marginTop: '16px', background: copiedPrompt === p.id ? '#a3e635' : 'rgba(255,255,255,0.1)', color: copiedPrompt === p.id ? '#000' : '#fff', cursor: 'pointer', border: 'none' }}
                >
                  {copiedPrompt === p.id ? '✓ Copied Prompt' : 'Copy Prompt'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Journal Section */}
        <section className="framer-section" id="journal" style={{ borderTop: '1px solid var(--framer-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <div className="framer-badge">EDITORIAL &amp; THEORY</div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>Field notes on visual culture</h2>
            </div>
            <Link href="/journal" style={{ color: '#a3e635', textDecoration: 'none', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
              READ ALL ESSAYS &rarr;
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div className="framer-box" style={{ padding: '32px' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#a1a1aa', marginBottom: '12px' }}>
                ESSAY · 12 MIN READ · MAY 2026
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '16px' }}>
                What is visual culture in branding, and why it now beats positioning
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Positioning is a sentence. Visual culture is the sentence's accent, posture, room, and weather. Why the new generation of brands competes on cultural fluency.
              </p>
              <Link href="/journal" style={{ color: '#fff', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', display: 'inline-block', marginTop: '20px' }}>
                Read essay &rarr;
              </Link>
            </div>

            <div className="framer-box" style={{ padding: '32px' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#a1a1aa', marginBottom: '12px' }}>
                PLAYBOOK · 8 MIN READ · MAY 2026
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '16px' }}>
                How to find aesthetic direction for a new startup
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.6 }}>
                A 5-step audit: anchor, adjacency, contrarian, internet-native, and one inherited reference. The framework we use inside Navrine Studio.
              </p>
              <Link href="/journal" style={{ color: '#fff', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', display: 'inline-block', marginTop: '20px' }}>
                Read playbook &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Submit / Contact Footer Banner */}
        <section className="framer-section" id="submit" style={{ borderTop: '1px solid var(--framer-border)', paddingBottom: '120px' }}>
          <div className="framer-box-purple" style={{ textAlign: 'center', padding: '60px 24px', borderRadius: '32px' }}>
            <div className="framer-badge" style={{ background: '#fff', color: '#000', borderColor: '#fff' }}>NAVRINE STUDIO</div>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginTop: '16px', marginBottom: '16px' }}>
              Build your visual identity with Navrine.
            </h2>
            <p style={{ color: '#c7d2fe', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 32px' }}>
              We partner with ambitious founders, creators, and brands to engineer internet-native visual directions.
            </p>
            <a href="mailto:hello@navrine.space" className="framer-nav-btn" style={{ background: '#fff', color: '#000', padding: '16px 36px', fontSize: '1rem', textDecoration: 'none', fontWeight: 700 }}>
              Start a Studio Project &rarr;
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
