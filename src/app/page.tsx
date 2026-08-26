'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ATLAS_DATA as D } from '@/data/data';

function SignalStrength({ level }: { level: number }) {
  return (
    <span className="signal-strength" data-level={level}>
      <span className="signal-bars">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </span>
      Signal {['—', 'Low', 'Med', 'High', 'Critical'][level]}
    </span>
  );
}

function Hero() {
  const tags = [
    'Neo-Y2K',
    'Vintage Pop',
    'Cyber Street',
    'Urban Night',
    'Chrome Future',
    'Asian Pop',
    'Indie Poster',
    'Premium Dark',
    'Street Flash',
    'Viral Signal',
    'AI Cover Art',
    'Soft 3D',
    'Notes App Chic',
    'Quiet Luxury',
    'Digital Brutalism',
  ];

  const floatCards = [
    {
      cls: 'fc1',
      title: 'Neo-Y2K',
      cat: 'Aesthetic',
      swatches: ['#4D8DFF', '#FF4FD8', '#E8E8FF', '#1A0A2B'],
    },
    {
      cls: 'fc2',
      title: 'Urban Night',
      cat: 'Photography',
      swatches: ['#FFB84D', '#FF4FD8', '#050505', '#1A0E0A'],
    },
    {
      cls: 'fc3',
      title: 'Chrome Future',
      cat: 'Poster',
      swatches: ['#D8D8D8', '#777', '#F0F0F0', '#555'],
    },
    {
      cls: 'fc4',
      title: 'Asian Pop',
      cat: 'Music Visual',
      swatches: ['#FF4FD8', '#FFB84D', '#2B0A1F'],
    },
    {
      cls: 'fc5',
      title: 'Premium Dark',
      cat: 'Product UI',
      swatches: ['#070707', '#B8FF4D', '#A8A8A0', '#4D8DFF'],
    },
  ];

  return (
    <section className="hero" id="top">
      <div className="hero-grid-bg"></div>
      <div className="hero-glow"></div>
      <div className="hero-glow two"></div>

      <div className="shell">
        <div className="hero-inner">
          <div>
            <div className="hero-meta">
              <span className="pill">
                <span className="dot" style={{ color: 'var(--green)' }}></span>Issue 014 · May 2026
              </span>
              <span className="pill">Visual Culture Catalog</span>
              <span className="pill">ID · EN</span>
            </div>

            <h1 className="display hero-headline">
              The visual culture
              <br />
              map for <em>trends,</em>
              <br />
              aesthetics &amp; <em>taste.</em>
            </h1>

            <p className="hero-sub">
              Navrine Atlas decodes the signals behind modern visual culture — from Neo-Y2K interfaces and urban night photography to TikTok poster trends, premium SaaS direction, and AI prompt grammar. Curated for founders, designers, creators, and cultural builders.
            </p>

            <div className="hero-ctas">
              <a href="#search" className="btn btn-primary">
                Explore the Atlas<span className="btn-icon"></span>
              </a>
              <Link href="/submit" className="btn btn-ghost">
                Build with Navrine Studio<span className="btn-icon"></span>
              </Link>
            </div>

            <div className="hero-tags">
              {tags.map((t) => (
                <span key={t} className="pill">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-panel" aria-hidden="true">
            {floatCards.map((c) => (
              <div key={c.cls} className={`float-card ${c.cls}`}>
                <div className="swatches">
                  {c.swatches.map((s, i) => (
                    <span key={i} className="swatch" style={{ background: s }}></span>
                  ))}
                </div>
                <div className="fc-title">{c.title}</div>
                <div className="fc-meta">
                  <span className="dot" style={{ color: 'var(--green)' }}></span>
                  <span>{c.cat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-foot">
          <div className="hero-stat">
            <div className="num">
              <em>1,284</em>
            </div>
            <div className="lbl">Atlas Entries</div>
          </div>
          <div className="hero-stat">
            <div className="num">86</div>
            <div className="lbl">Aesthetics Tracked</div>
          </div>
          <div className="hero-stat">
            <div className="num">312</div>
            <div className="lbl">Photography Studies</div>
          </div>
          <div className="hero-stat">
            <div className="num">920+</div>
            <div className="lbl">AI Prompts</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const items = [
    'Neo-Y2K +212% week-over-week',
    'Urban Night Photography rising in SEA',
    'Notes App Chic crosses into B2B',
    'Mixed-script poster trend stabilized',
    'Chrome Future peaks in music visuals',
    'Indie sleaze: receding signal',
    'AI album cover packs: new format',
    'Quiet luxury UI: durable',
  ];
  const loop = [...items, ...items];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {loop.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function SearchSection() {
  const [q, setQ] = useState('');
  const [active, setActive] = useState('Category');

  const filters = [
    'Category',
    'Region',
    'Industry',
    'Mood',
    'Color',
    'Era',
    'Platform',
    'Use Case',
  ];
  const chips = [
    'Music startup',
    'TikTok poster trend',
    'Urban photography',
    'Y2K website',
    'Luxury SaaS',
    'Indonesian pop culture',
    'AI album cover',
    'Street campaign',
    'Cool blue minimal',
    'Notes app chic',
    'Chrome future',
  ];

  return (
    <section id="search">
      <div className="shell">
        <div className="section-head">
          <div className="head-meta">
            <span className="eyebrow">02 · Atlas Search</span>
            <h2 className="section-title">
              Search the <em>signals</em>.
            </h2>
            <p className="lede">
              Cross-reference 1,284 atlas entries by aesthetic, region, industry, era, mood, platform, or use case. Built for designers, founders, and creative directors.
            </p>
          </div>
          <div className="head-aside">
            <span>
              <span
                className="dot"
                style={{
                  color: 'var(--green)',
                  display: 'inline-block',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--green)',
                  marginRight: 8,
                }}
              ></span>
              Live index
            </span>
          </div>
        </div>

        <div className="search-card">
          <div className="search-bar">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search aesthetics, trends, prompts, photography styles, or brand concepts…"
            />
            <span className="kbd">⌘ K</span>
          </div>

          <div className="search-filters">
            {filters.map((f) => (
              <button
                key={f}
                className={`pill ${active === f ? 'active' : ''}`}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="search-chips-label">Try a query</div>
          <div className="search-chips">
            {chips.map((c) => (
              <button key={c} className="pill" onClick={() => setQ(c)}>
                <span style={{ color: 'var(--text-3)' }}>→</span>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedSignals() {
  return (
    <section id="trends">
      <div className="shell">
        <div className="section-head">
          <div className="head-meta">
            <span className="eyebrow">03 · Featured Signals</span>
            <h2 className="section-title">
              High-signal <em>directions</em> right now.
            </h2>
            <p className="lede">
              Twelve curated visual directions our editors are tracking this issue, ranked by signal strength across product, music, fashion, and creator culture.
            </p>
          </div>
          <div className="head-aside">
            <span>↻ Refreshed daily</span>
            <Link href="/trends" className="pill">
              View all 86
            </Link>
          </div>
        </div>

        <div className="bento">
          {D.featuredSignals.map((s) => (
            <article key={s.id} className={`signal-card ${s.span}`}>
              <div className="card-top">
                <span className="pill accent">{s.category}</span>
                <SignalStrength level={s.strength} />
              </div>

              <div className="signal-visual">
                <div className={`mood ${s.moodClass}`}></div>
              </div>

              <div>
                <div className="card-title">{s.title}</div>
                <p className="card-desc">{s.desc}</p>
              </div>

              <div className="swatches">
                {s.palette.map((c, i) => (
                  <span key={i} className="swatch" style={{ background: c }}></span>
                ))}
              </div>

              <div className="card-foot">
                <span className="meta">{s.useCase}</span>
                <Link href={`/aesthetics/${s.id}`} className="open-link">
                  Open Atlas Entry <span className="arr">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TasteIndex() {
  const [activeId, setActiveId] = useState('premium-dark');
  const active = D.tasteProfiles.find((p) => p.id === activeId) || D.tasteProfiles[0];

  return (
    <section id="taste">
      <div className="shell">
        <div className="section-head">
          <div className="head-meta">
            <span className="eyebrow">04 · Taste Index</span>
            <h2 className="section-title">
              Map your <em>taste</em>.
            </h2>
            <p className="lede">
              A multi-axis matrix for placing visual directions — minimal to maximal, classic to experimental, corporate to cultural. Click a point to map its full creative profile.
            </p>
          </div>
          <div className="head-aside">
            <span>Axis: Minimal ↔ Maximal · Classic ↔ Experimental</span>
          </div>
        </div>

        <div className="taste-grid">
          <div className="taste-matrix">
            <div className="center-line-h"></div>
            <div className="center-line-v"></div>
            <span className="axis-x" style={{ left: 0, paddingLeft: 32 }}>
              ← Minimal
            </span>
            <span
              className="axis-x"
              style={{ right: 0, paddingRight: 32, justifyContent: 'flex-end' }}
            >
              Maximal →
            </span>
            <span className="axis-y">↑ Classic / Experimental ↓</span>

            {D.tasteProfiles.map((p) => (
              <button
                key={p.id}
                className={`taste-point ${p.id === activeId ? 'active' : ''}`}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                onClick={() => setActiveId(p.id)}
                aria-label={p.name}
              >
                {p.id === activeId && <span className="lbl">{p.name}</span>}
              </button>
            ))}
          </div>

          <div className="taste-detail">
            <div className="td-head">
              <div>
                <span className="eyebrow" style={{ marginBottom: 6, display: 'block' }}>
                  Taste Profile
                </span>
                <h3>{active.name}</h3>
              </div>
              <Link href="/taste" className="btn btn-ghost">
                Open Profile<span className="btn-icon"></span>
              </Link>
            </div>

            <div>
              <div className="td-row">
                <span className="k">Personality</span>
                <span className="v muted">{active.personality}</span>
              </div>
              <div className="td-row">
                <span className="k">Industries</span>
                <span className="v muted">{active.industries}</span>
              </div>
              <div className="td-row">
                <span className="k">Typography</span>
                <span className="v muted">{active.type}</span>
              </div>
              <div className="td-row">
                <span className="k">Photography</span>
                <span className="v muted">{active.photo}</span>
              </div>
              <div className="td-row">
                <span className="k">UI Style</span>
                <span className="v muted">{active.ui}</span>
              </div>
            </div>

            <div>
              <div className="td-row">
                <span className="k">Palette</span>
                <span className="v">
                  <div className="swatches">
                    {active.palette.map((c, i) => (
                      <span key={i} className="swatch" style={{ background: c }}></span>
                    ))}
                  </div>
                </span>
              </div>
              <div className="td-row" style={{ alignItems: 'start' }}>
                <span className="k">Prompt</span>
                <span
                  className="v muted"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12.5,
                    lineHeight: 1.55,
                  }}
                >
                  {active.prompt}
                </span>
              </div>
              <div className="td-row" style={{ borderBottom: 'none' }}>
                <span className="k">Related</span>
                <span className="v muted">
                  {D.tasteProfiles
                    .filter((p) => p.id !== active.id)
                    .slice(0, 3)
                    .map((p) => p.name)
                    .join(' · ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AestheticLibrary() {
  return (
    <section id="aesthetics">
      <div className="shell">
        <div className="section-head">
          <div className="head-meta">
            <span className="eyebrow">05 · Aesthetic Library</span>
            <h2 className="section-title">
              A <em>catalog</em> of aesthetics.
            </h2>
            <p className="lede">
              Browse twelve of the eighty-six aesthetics currently mapped in the atlas. Each entry includes visual traits, palette, typography direction, photography reference, UI treatment, and AI prompt pack.
            </p>
          </div>
          <div className="head-aside">
            <Link href="/aesthetics" className="pill">
              Sort · Newest
            </Link>
            <Link href="/aesthetics" className="pill">
              View all
            </Link>
          </div>
        </div>

        <div className="aesthetic-grid">
          {D.aesthetics.map((a) => (
            <article key={a.name} className="ae-card">
              <div className="ae-visual">
                <div className={`mood ${a.mood}`}></div>
              </div>
              <div className="ae-body">
                <div className="ae-title">{a.name}</div>
                <div className="ae-meta">
                  <span style={{ color: 'var(--text-2)' }}>{a.traits}</span>
                </div>
                <div className="swatches">
                  {a.palette.map((c, i) => (
                    <span key={i} className="swatch" style={{ background: c }}></span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhotographySection() {
  return (
    <section id="photography">
      <div className="shell">
        <div className="section-head">
          <div className="head-meta">
            <span className="eyebrow">06 · Photography Atlas</span>
            <h2 className="section-title">
              Photography <em>styles</em>.
            </h2>
            <p className="lede">
              Curated photography directions for brand, editorial, and campaign work — with lighting, lens, composition, color grading, and example prompts for each.
            </p>
          </div>
          <div className="head-aside">
            <span>312 studies indexed</span>
            <Link href="/photography" className="pill">
              View all
            </Link>
          </div>
        </div>

        <div className="photo-grid">
          {D.photoStyles.map((p) => (
            <article key={p.name} className="photo-card">
              <div className="photo-visual">
                <span className="photo-frame-num">FRAME · {p.num}</span>
                <div className={`mood ${p.visual}`}></div>
              </div>
              <div className="photo-overlay">
                <div className="ph-title">{p.name}</div>
                <div className="ph-meta">
                  {p.meta.map((m, i) => (
                    <React.Fragment key={i}>
                      <span>{m}</span>
                      {i < p.meta.length - 1 && <span className="dot-sep">/</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ViralSignals() {
  return (
    <section id="viral-signals">
      <div className="shell">
        <div className="section-head">
          <div className="head-meta">
            <span className="eyebrow">07 · Viral Signals</span>
            <h2 className="section-title">
              Read what's <em>rising</em>.
            </h2>
            <p className="lede">
              A content-intelligence layer over the atlas. Each signal tracks why a pattern is rising, where it lives, and how to translate it into product or campaign work.
            </p>
          </div>
          <div className="head-aside">
            <span>↻ Updated weekly</span>
          </div>
        </div>

        <div className="viral-grid">
          {D.viralSignals.map((v) => (
            <article key={v.num} className="viral-card">
              <div className="viral-top">
                <span className="viral-num">{v.num}</span>
                <SignalStrength level={v.strength} />
              </div>
              <div className="viral-title">{v.title}</div>
              <p className="viral-why">{v.why}</p>
              <div className="viral-tags">
                {v.tags.map((t) => (
                  <span key={t} className="pill">
                    {t}
                  </span>
                ))}
              </div>
              <div className="viral-foot">
                <span>{v.platform}</span>
                <Link href="/viral-signals" className="turn">
                  Turn into campaign →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function parseBoldText(raw: string) {
  const parts = raw.split(/(<strong>[^<]*<\/strong>)/g);
  return parts.map((part, i) => {
    const m = part.match(/^<strong>([^<]*)<\/strong>$/);
    return m ? <strong key={i}>{m[1]}</strong> : part;
  });
}

function Prompts() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const copy = (idx: number, body: string) => {
    const text = body.replace(/<[^>]+>/g, '');
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1400);
  };
  return (
    <section id="prompts">
      <div className="shell">
        <div className="section-head">
          <div className="head-meta">
            <span className="eyebrow">08 · Prompt Library</span>
            <h2 className="section-title">
              A <em>prompt</em> pack for every direction.
            </h2>
            <p className="lede">
              920+ tuned prompts for image generation, UI, posters, album covers, campaigns, and brand systems. Tagged by tool, output, and atlas entry.
            </p>
          </div>
          <div className="head-aside">
            <Link href="/prompts" className="pill">
              Copy all
            </Link>
            <Link href="/prompts" className="pill">
              Filter · Tool
            </Link>
          </div>
        </div>

        <div className="prompt-grid">
          {D.prompts.map((p, i) => (
            <article key={p.title} className="prompt-card">
              <div className="prompt-head">
                <div>
                  <div className="prompt-title">{p.title}</div>
                </div>
                <span className="prompt-tool">{p.tool}</span>
              </div>

              <div className="prompt-body">
                <button
                  className={`prompt-copy ${copiedIdx === i ? 'copied' : ''}`}
                  onClick={() => copy(i, p.body)}
                >
                  {copiedIdx === i ? 'Copied ✓' : 'Copy'}
                </button>
                <span>{parseBoldText(p.body)}</span>
              </div>

              <div className="prompt-foot">
                <div className="prompt-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="pill">
                      {t}
                    </span>
                  ))}
                </div>
                <Link href="/prompts" className="open-link" style={{ color: 'var(--green)' }}>
                  Open →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Assets() {
  return (
    <section id="assets">
      <div className="shell">
        <div className="section-head">
          <div className="head-meta">
            <span className="eyebrow">09 · Asset Library</span>
            <h2 className="section-title">
              Download &amp; <em>deploy</em>.
            </h2>
            <p className="lede">
              Editable templates, color packs, UI kits, shot lists, and concept boards — designed to drop into a project the same day you find them.
            </p>
          </div>
          <div className="head-aside">
            <Link href="/assets" className="pill">
              Format · All
            </Link>
            <Link href="/assets" className="pill">
              View all
            </Link>
          </div>
        </div>

        <div className="asset-grid">
          {D.assets.map((a) => (
            <article key={a.title} className="asset-card">
              <div className="asset-visual">
                <span className="asset-format">{a.format}</span>
                <div className={`mood ${a.visual}`}></div>
              </div>
              <div className="asset-body">
                <div className="asset-title">{a.title}</div>
                <div className="asset-cat">{a.cat}</div>
                <div className="asset-foot">
                  <Link href="/assets" className="dl">
                    ↓ Download
                  </Link>
                  <span className="size">{a.size}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journal() {
  const [feature, ...rest] = D.journal;
  return (
    <section id="journal">
      <div className="shell">
        <div className="section-head">
          <div className="head-meta">
            <span className="eyebrow">10 · The Journal</span>
            <h2 className="section-title">
              Field notes on <em>visual culture</em>.
            </h2>
            <p className="lede">
              Essays, playbooks, and field notes for designers, founders, and creative directors. SEO &amp; GEO-tuned for Google AI Overview, Perplexity, and Pinterest discovery.
            </p>
          </div>
          <div className="head-aside">
            <Link href="/journal" className="pill">
              All essays
            </Link>
            <Link href="/journal" className="pill">
              RSS
            </Link>
          </div>
        </div>

        <div className="journal-grid">
          <article className="journal-card jr-feature">
            <div className="jr-visual">
              <div className={`mood ${feature.visual}`}></div>
            </div>
            <div className="jr-body">
              <div className="jr-meta">
                {feature.meta.map((m, i) => (
                  <React.Fragment key={i}>
                    <span>{m}</span>
                    {i < feature.meta.length - 1 && <span style={{ color: 'var(--text-4)' }}>·</span>}
                  </React.Fragment>
                ))}
              </div>
              <h3 className="jr-title">{feature.title}</h3>
              <p className="jr-excerpt">{feature.excerpt}</p>
              <div className="jr-foot">
                <span>By the Atlas Editors</span>
                <Link href="/journal" className="read">
                  Read essay →
                </Link>
              </div>
            </div>
          </article>

          {rest.map((j) => (
            <article key={j.title} className="journal-card compact">
              <div className="jr-visual">
                <div className={`mood ${j.visual}`}></div>
              </div>
              <div className="jr-body">
                <div className="jr-meta">
                  {j.meta.map((m, i) => (
                    <React.Fragment key={i}>
                      <span>{m}</span>
                      {i < j.meta.length - 1 && <span style={{ color: 'var(--text-4)' }}>·</span>}
                    </React.Fragment>
                  ))}
                </div>
                <h3 className="jr-title">{j.title}</h3>
                <p className="jr-excerpt">{j.excerpt}</p>
                <div className="jr-foot">
                  <span>Atlas Editors</span>
                  <Link href="/journal" className="read">
                    Read →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Submit() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    category: 'Aesthetic',
    title: '',
    desc: '',
    source: '',
    tags: '',
  });
  const upd = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });
  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <section id="submit">
      <div className="shell">
        <div className="submit-wrap">
          <div className="submit-info">
            <span className="eyebrow" style={{ marginBottom: 18, display: 'block' }}>
              11 · Submit to the Atlas
            </span>
            <h2 className="section-title">
              Spotted a <em>signal</em>?
            </h2>
            <p>
              Submit a trend, aesthetic, photography style, prompt, viral pattern, or asset idea. Editors review every entry. Accepted submissions get a public credit and a permanent Atlas page.
            </p>
            <ul className="info-list">
              <li>
                <span className="ix">01</span>
                <span className="it">Trend &amp; aesthetic submissions</span>
              </li>
              <li>
                <span className="ix">02</span>
                <span className="it">Photography &amp; visual references</span>
              </li>
              <li>
                <span className="ix">03</span>
                <span className="it">Brand concepts &amp; design systems</span>
              </li>
              <li>
                <span className="ix">04</span>
                <span className="it">Viral content patterns</span>
              </li>
              <li>
                <span className="ix">05</span>
                <span className="it">Prompts &amp; asset packs</span>
              </li>
            </ul>
          </div>

          <form className="submit-form" onSubmit={handle}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="sf-name">Name</label>
                <input
                  id="sf-name"
                  value={form.name}
                  onChange={upd('name')}
                  placeholder="Your name"
                />
              </div>
              <div className="form-field">
                <label htmlFor="sf-email">Email</label>
                <input
                  id="sf-email"
                  type="email"
                  value={form.email}
                  onChange={upd('email')}
                  placeholder="you@studio.com"
                />
              </div>
              <div className="form-field">
                <label htmlFor="sf-cat">Category</label>
                <select id="sf-cat" value={form.category} onChange={upd('category')}>
                  <option>Aesthetic</option>
                  <option>Trend</option>
                  <option>Photography Style</option>
                  <option>Brand Concept</option>
                  <option>Viral Pattern</option>
                  <option>Prompt</option>
                  <option>Asset</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="sf-title">Title</label>
                <input
                  id="sf-title"
                  value={form.title}
                  onChange={upd('title')}
                  placeholder="e.g. Notes App Manifesto"
                />
              </div>
              <div className="form-field full">
                <label htmlFor="sf-desc">Description</label>
                <textarea
                  id="sf-desc"
                  value={form.desc}
                  onChange={upd('desc')}
                  placeholder="Why is this rising? Where have you seen it? Who is it for?"
                ></textarea>
              </div>
              <div className="form-field">
                <label htmlFor="sf-src">Source / reference</label>
                <input
                  id="sf-src"
                  value={form.source}
                  onChange={upd('source')}
                  placeholder="URL or @handle"
                />
              </div>
              <div className="form-field">
                <label htmlFor="sf-tags">Tags</label>
                <input
                  id="sf-tags"
                  value={form.tags}
                  onChange={upd('tags')}
                  placeholder="comma, separated, tags"
                />
              </div>
              <div className="form-field full">
                <label>Upload reference</label>
                <div className="upload">Drop image / reference · or click to browse</div>
              </div>
            </div>

            <div className="form-submit">
              <span className="agreement">By submitting you agree to the Atlas editorial guidelines.</span>
              <button type="submit" className="btn btn-primary">
                {submitted ? 'Received ✓' : 'Submit signal'}
                <span className="btn-icon"></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <SearchSection />
      <FeaturedSignals />
      <TasteIndex />
      <AestheticLibrary />
      <PhotographySection />
      <ViralSignals />
      <Prompts />
      <Assets />
      <Journal />
      <Submit />
    </>
  );
}
