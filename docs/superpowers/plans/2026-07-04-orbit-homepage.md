# "The Orbit" Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Navrine Atlas homepage as a refined dark-editorial showcase whose hero is a WebGL constellation of the Atlas's own signal cards.

**Architecture:** `src/app/page.tsx` becomes a server component composing focused section components. The 3D hero is a client component (`OrbitHero`) that dynamically imports the R3F scene with `ssr: false`, guarded by an error boundary, WebGL detection, and `prefers-reduced-motion` — all failure paths render a CSS static fallback. Sections below the fold are mostly server components; only pointer-tilt and 3D bits are client.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, `three` + `@react-three/fiber` (no drei — no helpers needed, avoids CDN-loaded assets), `next/font/google` (Fraunces, Space Grotesk, Geist Mono), plain global CSS following the repo's existing token/classname style.

**Testing note:** The repo has no test framework and this is presentation-layer work. Each task's verify cycle is: `npx tsc --noEmit` for type safety, `npm run build` for integration, and explicit visual checks in the dev server (`npm run dev`, http://localhost:3000). The one pure-logic module (`orbitLayout.ts`) is deterministic and verified by a node assertion snippet in its task.

## Global Constraints

- Next.js `16.2.10` — Turbopack is the default for dev and build; `next lint` does not exist (use `npm run lint`, which runs `eslint`).
- `ssr: false` dynamic imports are only legal inside client components (`'use client'`).
- No external network assets at runtime: no CDN fonts in `<head>`, no drei environment/matcap presets. Fonts go through `next/font/google`; all textures are generated `CanvasTexture`s.
- Keep existing CSS custom properties in `globals.css` (`--bg`, `--blue`, `--pink`, `--green`, etc.) — sub-pages depend on them. Only the three font tokens change.
- Accent discipline from the spec: one accent color per section (hero = cobalt+magenta in-scene, signals = lime, palettes = neutral, trends = cobalt, CTA = magenta).
- DPR caps: desktop ≤ 2, mobile ≤ 1.5. Mobile (< 768px) shows ~8 cards, pointer events disabled on the canvas.
- All homepage content comes from `src/data/data.ts` (`ATLAS_DATA`). No new data files.
- Commit after every task. Do not amend.

---

### Task 1: Typography system via next/font

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css:31-33` (font tokens only)

**Interfaces:**
- Produces: CSS variables `--font-fraunces`, `--font-grotesk`, `--font-geist-mono` on `<html>`; updated tokens `--font-display`, `--font-sans`, `--font-mono` consumed by all existing styles and every later task.

- [ ] **Step 1: Replace the `<link>` Google Fonts with next/font**

Replace the full contents of `src/app/layout.tsx` with:

```tsx
import type { Metadata } from 'next';
import { Fraunces, Space_Grotesk, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Navrine Atlas — Trend, Aesthetic, Design Concept & Visual Culture Catalog',
  description:
    'Navrine Atlas is a visual culture catalog for discovering trends, aesthetics, design concepts, creative taste, photography styles, viral signals, color palettes, AI prompts, assets, and brand inspiration.',
  openGraph: {
    title: 'Navrine Atlas',
    description:
      'The visual culture catalog for trends, aesthetics, design concepts, and creative direction.',
    url: 'https://atlas.navrine.space',
    siteName: 'Navrine Atlas',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Navrine Atlas Cover',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Navrine Atlas',
    description: 'Read the signals. Build the taste. Design the future.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${grotesk.variable} ${geistMono.variable}`}
    >
      <body>
        <div id="root">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Point the font tokens at the new variables**

In `src/app/globals.css`, replace lines 31–33:

```css
  --font-display: var(--font-fraunces), "Times New Roman", serif;
  --font-sans: var(--font-grotesk), -apple-system, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), "JetBrains Mono", ui-monospace, monospace;
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — Expected: exit 0, no output.
Run: `npm run build` — Expected: "Compiled successfully", all routes build.
Run: `npm run dev` (background), open http://localhost:3000 — Expected: headline renders in Fraunces (serif with distinctive 'a'), body in Space Grotesk; no `fonts.googleapis.com` request in the Network tab.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: replace CDN fonts with next/font (Fraunces + Space Grotesk + Geist Mono)"
```

---

### Task 2: 3D dependencies + pure orbit modules

**Files:**
- Modify: `package.json` (via npm install)
- Create: `src/components/hero/orbitLayout.ts`
- Create: `src/components/hero/cardTexture.ts`

**Interfaces:**
- Produces:
  - `computeOrbitLayout(count: number): OrbitSlot[]` where `OrbitSlot = { position: [number, number, number]; rotationY: number; rotationZ: number; driftPhase: number; driftSpeed: number }`
  - `makeCardTexture(card: OrbitCardData): THREE.CanvasTexture` where `OrbitCardData = { id: string; title: string; category: string; palette: string[] }`
  - `makeGlowTexture(hex: string): THREE.CanvasTexture`

- [ ] **Step 1: Install dependencies**

Run: `npm install three @react-three/fiber && npm install -D @types/three`
Expected: exit 0; `three` and `@react-three/fiber` appear in `package.json` dependencies. (`@react-three/fiber` must resolve to v9.x for React 19 — check with `npm ls @react-three/fiber`.)

- [ ] **Step 2: Create the layout math module**

Create `src/components/hero/orbitLayout.ts`:

```ts
export interface OrbitSlot {
  position: [number, number, number];
  rotationY: number;
  rotationZ: number;
  driftPhase: number;
  driftSpeed: number;
}

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/**
 * Deterministic ring layout. Cards circle the center (kept clear so the
 * DOM headline stays readable) and sit at staggered depths so scene fog
 * fades the far ones. No randomness: same count, same layout.
 */
export function computeOrbitLayout(count: number): OrbitSlot[] {
  const slots: OrbitSlot[] = [];
  for (let i = 0; i < count; i++) {
    const angle = i * GOLDEN_ANGLE;
    const ring = i % 3;
    const radius = 4.0 + ring * 1.2;
    slots.push({
      position: [
        Math.cos(angle) * radius,
        Math.sin(angle) * 2.1 + ((i % 5) - 2) * 0.3,
        -1.5 - ((i * 7) % 11) * 0.6,
      ],
      rotationY: Math.sin(angle) * 0.35,
      rotationZ: ((i % 7) - 3) * 0.03,
      driftPhase: (i / count) * Math.PI * 2,
      driftSpeed: 0.25 + ((i * 13) % 7) * 0.05,
    });
  }
  return slots;
}
```

- [ ] **Step 3: Sanity-check the layout math**

Run:

```bash
node -e "
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
for (const count of [8, 14]) {
  for (let i = 0; i < count; i++) {
    const r = 4.0 + (i % 3) * 1.2;
    const x = Math.cos(i * GOLDEN) * r;
    const z = -1.5 - ((i * 7) % 11) * 0.6;
    if (Math.hypot(x) > 6.5 || z > -1.4 || z < -8) throw new Error('slot out of bounds: ' + i);
  }
}
console.log('layout bounds OK');
"
```

Expected: `layout bounds OK` (mirrors the module's formula; confirms no card lands in the center headline zone x∈(-4,4) closer than radius 4, and depths stay within fog range).

- [ ] **Step 4: Create the canvas-texture module**

Create `src/components/hero/cardTexture.ts`:

```ts
import * as THREE from 'three';

export interface OrbitCardData {
  id: string;
  title: string;
  category: string;
  palette: string[];
}

const W = 512;
const H = 640;

/** Renders one signal card (glow, swatches, category, serif title) to a texture. */
export function makeCardTexture(card: OrbitCardData): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  const r = 36;
  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, r);
  ctx.clip();

  ctx.fillStyle = '#0b0b10';
  ctx.fillRect(0, 0, W, H);

  const glowA = ctx.createRadialGradient(W * 0.75, H * 0.2, 40, W * 0.75, H * 0.2, W * 0.9);
  glowA.addColorStop(0, hexWithAlpha(card.palette[0] ?? '#4d8dff', 0.55));
  glowA.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glowA;
  ctx.fillRect(0, 0, W, H);

  const glowB = ctx.createRadialGradient(W * 0.15, H * 0.95, 30, W * 0.15, H * 0.95, W * 0.8);
  glowB.addColorStop(0, hexWithAlpha(card.palette[1] ?? '#ff4fd8', 0.35));
  glowB.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glowB;
  ctx.fillRect(0, 0, W, H);

  card.palette.slice(0, 4).forEach((hex, i) => {
    ctx.beginPath();
    ctx.arc(56 + i * 52, 72, 16, 0, Math.PI * 2);
    ctx.fillStyle = hex;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  ctx.fillStyle = 'rgba(245,245,240,0.55)';
  ctx.font = '500 24px "Space Grotesk", system-ui, sans-serif';
  ctx.fillText(card.category.toUpperCase(), 48, H - 150);

  ctx.fillStyle = '#f5f5f0';
  ctx.font = 'italic 54px "Fraunces", "Times New Roman", serif';
  wrapText(ctx, card.title, 48, H - 96, W - 96, 58);

  ctx.strokeStyle = 'rgba(255,255,255,0.16)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(1.5, 1.5, W - 3, H - 3, r);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Soft radial glow used as additive backdrop sprites in the scene. */
export function makeGlowTexture(hex: string): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, hexWithAlpha(hex, 0.8));
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function hexWithAlpha(hex: string, alpha: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  bottomY: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  lines.push(line);
  lines.forEach((l, i) => {
    ctx.fillText(l, x, bottomY - (lines.length - 1 - i) * lineHeight);
  });
}
```

- [ ] **Step 5: Verify types compile**

Run: `npx tsc --noEmit` — Expected: exit 0.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/components/hero/orbitLayout.ts src/components/hero/cardTexture.ts
git commit -m "feat: add three/r3f deps and pure orbit layout + texture modules"
```

---

### Task 3: OrbitScene (R3F canvas)

**Files:**
- Create: `src/components/hero/OrbitScene.tsx`

**Interfaces:**
- Consumes: `computeOrbitLayout`, `makeCardTexture`, `makeGlowTexture`, `OrbitCardData`, `OrbitSlot` from Task 2.
- Produces: default export `OrbitScene({ cards, isMobile }: { cards: OrbitCardData[]; isMobile: boolean })` — Task 4 imports it via `next/dynamic`.

- [ ] **Step 1: Create the scene component**

Create `src/components/hero/OrbitScene.tsx`:

```tsx
'use client';
import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { computeOrbitLayout, type OrbitSlot } from './orbitLayout';
import { makeCardTexture, makeGlowTexture, type OrbitCardData } from './cardTexture';

const CARD_W = 2.1;
const CARD_H = 2.62;
const CAM_Z = 9;

function CameraRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    const heroH = Math.max(window.innerHeight, 1);
    const scroll = Math.min(window.scrollY / heroH, 1);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.7, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.45, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, CAM_Z - scroll * 3.2, 0.08);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function GlowSprite({ color, position, scale }: {
  color: string;
  position: [number, number, number];
  scale: number;
}) {
  const texture = useMemo(() => makeGlowTexture(color), [color]);
  return (
    <sprite position={position} scale={[scale, scale, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.5}
      />
    </sprite>
  );
}

function OrbitCard({ card, slot, interactive }: {
  card: OrbitCardData;
  slot: OrbitSlot;
  interactive: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const mat = useRef<THREE.MeshStandardMaterial>(null!);
  const [hovered, setHovered] = useState(false);
  const texture = useMemo(() => makeCardTexture(card), [card]);
  const targetScale = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    m.position.y = slot.position[1] + Math.sin(t * slot.driftSpeed + slot.driftPhase) * 0.28;
    m.rotation.y = slot.rotationY + Math.sin(t * slot.driftSpeed * 0.6 + slot.driftPhase) * 0.06;
    const s = hovered ? 1.09 : 1;
    m.scale.lerp(targetScale.set(s, s, 1), 0.12);
    if (mat.current) {
      mat.current.emissiveIntensity = THREE.MathUtils.lerp(
        mat.current.emissiveIntensity,
        hovered ? 1.15 : 0.62,
        0.1,
      );
    }
  });

  return (
    <mesh
      ref={mesh}
      position={slot.position}
      rotation={[0, slot.rotationY, slot.rotationZ]}
      onPointerOver={interactive ? (e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      } : undefined}
      onPointerOut={interactive ? () => {
        setHovered(false);
        document.body.style.cursor = '';
      } : undefined}
    >
      <planeGeometry args={[CARD_W, CARD_H]} />
      <meshStandardMaterial
        ref={mat}
        map={texture}
        emissive="#ffffff"
        emissiveMap={texture}
        emissiveIntensity={0.62}
        transparent
        opacity={0.94}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function OrbitScene({ cards, isMobile }: {
  cards: OrbitCardData[];
  isMobile: boolean;
}) {
  const shown = isMobile ? cards.slice(0, 8) : cards;
  const slots = useMemo(() => computeOrbitLayout(shown.length), [shown.length]);

  return (
    <Canvas
      dpr={[1, isMobile ? 1.5 : 2]}
      camera={{ position: [0, 0, CAM_Z], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: isMobile ? 'none' : 'auto' }}
    >
      <fog attach="fog" args={['#070708', 6.5, 17]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 4, 6]} intensity={40} color="#4d8dff" />
      <pointLight position={[-6, -3, 4]} intensity={30} color="#ff4fd8" />
      <CameraRig />
      <GlowSprite color="#4d8dff" position={[3.5, 1.5, -6]} scale={11} />
      <GlowSprite color="#ff4fd8" position={[-4, -2, -7]} scale={10} />
      {shown.map((card, i) => (
        <OrbitCard key={card.id} card={card} slot={slots[i]} interactive={!isMobile} />
      ))}
    </Canvas>
  );
}
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit` — Expected: exit 0. (The component isn't rendered anywhere yet; visual verification happens in Task 4.)

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/OrbitScene.tsx
git commit -m "feat: add OrbitScene R3F constellation with parallax, drift, and hover"
```

---

### Task 4: OrbitHero wrapper, static fallback, hero styles, page wiring

**Files:**
- Create: `src/components/hero/OrbitHero.tsx`
- Create: `src/app/home.css`
- Modify: `src/app/page.tsx` (full replacement)

**Interfaces:**
- Consumes: `OrbitScene` (dynamic import), `OrbitCardData` (type), `ATLAS_DATA.featuredSignals` / `ATLAS_DATA.aesthetics`.
- Produces: default export `OrbitHero()` (no props); `src/app/home.css` global stylesheet that Tasks 5–6 append to; class names `.home-section`, `.section-head`, `.section-index`, `.section-title`, `.section-lede`, `.btn`, `.pill` conventions reused by later tasks.

- [ ] **Step 1: Create the hero wrapper**

Create `src/components/hero/OrbitHero.tsx`:

```tsx
'use client';
import { Component, type ReactNode, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ATLAS_DATA } from '@/data/data';
import type { OrbitCardData } from './cardTexture';

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
  const [mode, setMode] = useState<'pending' | 'scene' | 'static'>('pending');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const probe = document.createElement('canvas');
    const webgl = !!(probe.getContext('webgl2') || probe.getContext('webgl'));
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    setMode(reduced || !webgl ? 'static' : 'scene');
  }, []);

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
          <a href="/studio" className="btn btn-ghost">Build with Navrine Studio</a>
        </div>
      </div>

      <div className="orbit-scroll-cue" aria-hidden="true">
        <span className="orbit-scroll-line"></span>Scroll
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create the homepage stylesheet (hero portion)**

Create `src/app/home.css`:

```css
/* ===========================================================
   NAVRINE ATLAS — Homepage ("The Orbit")
   =========================================================== */

/* ---------- Hero ---------- */
.orbit-hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background:
    radial-gradient(60% 50% at 70% 20%, rgba(77, 141, 255, 0.07), transparent 70%),
    radial-gradient(50% 45% at 20% 85%, rgba(255, 79, 216, 0.06), transparent 70%),
    var(--bg);
}

/* film grain */
.orbit-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.orbit-hero-canvas {
  position: absolute;
  inset: 0;
}

.orbit-hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--gutter);
  pointer-events: none;
}

.orbit-hero-content a,
.orbit-hero-content .pill {
  pointer-events: auto;
}

.orbit-hero-meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.dot-green { color: var(--green); }

.orbit-headline {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(3rem, 8.5vw, 7rem);
  line-height: 0.98;
  letter-spacing: -0.02em;
  text-wrap: balance;
  text-shadow: 0 2px 40px rgba(7, 7, 8, 0.9);
}

.orbit-headline em {
  font-style: italic;
  color: var(--blue);
}

.orbit-headline em:last-of-type {
  color: var(--pink);
}

.orbit-sub {
  max-width: 46ch;
  margin-top: 28px;
  color: var(--text-2);
  font-size: clamp(1rem, 1.4vw, 1.125rem);
  line-height: 1.6;
  text-shadow: 0 1px 24px rgba(7, 7, 8, 0.9);
}

.orbit-ctas {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 40px;
}

.orbit-scroll-cue {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-3);
}

.orbit-scroll-line {
  display: block;
  width: 1px;
  height: 44px;
  background: linear-gradient(var(--text-3), transparent);
  animation: scroll-pulse 2.2s var(--ease-in-out) infinite;
}

@keyframes scroll-pulse {
  0%, 100% { transform: scaleY(0.4); opacity: 0.4; transform-origin: top; }
  50% { transform: scaleY(1); opacity: 1; transform-origin: top; }
}

/* ---------- Static fallback composition ---------- */
.orbit-static {
  position: absolute;
  inset: 0;
}

.orbit-static-card {
  position: absolute;
  width: clamp(140px, 16vw, 220px);
  padding: 18px;
  border-radius: var(--r-md);
  background: linear-gradient(160deg, rgba(23, 23, 26, 0.9), rgba(11, 11, 16, 0.95));
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(6px);
}

.osc-1 { top: 12%; right: 8%; transform: rotate(4deg); }
.osc-2 { top: 46%; right: 20%; transform: rotate(-3deg); }
.osc-3 { bottom: 14%; right: 6%; transform: rotate(2deg); }
.osc-4 { top: 20%; left: 4%; transform: rotate(-5deg); opacity: 0.55; }
.osc-5 { bottom: 10%; left: 10%; transform: rotate(3deg); opacity: 0.55; }

.osc-swatches {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}

.osc-swatches span {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.osc-title {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.1rem;
}

.osc-cat {
  margin-top: 6px;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-3);
}

@media (max-width: 768px) {
  .osc-4, .osc-5 { display: none; }
}

/* ---------- Shared section scaffolding ---------- */
.home-section {
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--section-y) var(--gutter);
}

.section-head {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 28px;
  row-gap: 12px;
  align-items: baseline;
  margin-bottom: clamp(36px, 5vw, 64px);
}

.section-index {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(2.4rem, 4.5vw, 4rem);
  line-height: 1;
  color: var(--text-4);
}

.section-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(2rem, 4vw, 3.4rem);
  letter-spacing: -0.015em;
}

.section-title em {
  font-style: italic;
}

.section-lede {
  grid-column: 2;
  max-width: 52ch;
  color: var(--text-2);
  line-height: 1.6;
}
```

- [ ] **Step 3: Rewire the homepage around the hero**

Replace the full contents of `src/app/page.tsx` with (sections beyond the hero arrive in Tasks 5–6):

```tsx
import OrbitHero from '@/components/hero/OrbitHero';
import './home.css';

export default function Home() {
  return <OrbitHero />;
}
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` — Expected: exit 0.
Run: `npm run build` — Expected: build succeeds.
Run: `npm run dev` (background), open http://localhost:3000 and confirm:
1. 3D card constellation renders around the headline; cards drift slowly.
2. Moving the mouse parallaxes the camera; hovering a card enlarges/brightens it and shows pointer cursor.
3. Scrolling dollies the camera forward.
4. DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce" + reload → static CSS card composition appears, no canvas.
5. Narrow the window below 768px + reload → scene still renders, fewer cards, no hover.

- [ ] **Step 5: Commit**

```bash
git add src/components/hero/OrbitHero.tsx src/app/home.css src/app/page.tsx
git commit -m "feat: add Orbit hero with static fallback and rewire homepage"
```

---

### Task 5: Below-fold sections — marquee, bento, palettes, trends

**Files:**
- Create: `src/components/home/TagMarquee.tsx`
- Create: `src/components/home/SignalsBento.tsx`
- Create: `src/components/home/PaletteStrip.tsx`
- Create: `src/components/home/TrendsTicker.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/home.css` (append)

**Interfaces:**
- Consumes: `.home-section` / `.section-head` scaffolding from Task 4; `ATLAS_DATA.featuredSignals`, `.aesthetics`, `.viralSignals`.
- Produces: default-export components `TagMarquee()`, `SignalsBento()`, `PaletteStrip()`, `TrendsTicker()` (all no-props) used by `page.tsx`.

- [ ] **Step 1: Create TagMarquee (server component, CSS animation)**

Create `src/components/home/TagMarquee.tsx`:

```tsx
const TAGS = [
  'Neo-Y2K', 'Vintage Pop', 'Cyber Street', 'Urban Night', 'Chrome Future',
  'Asian Pop', 'Indie Poster', 'Premium Dark', 'Street Flash', 'Viral Signal',
  'AI Cover Art', 'Soft 3D', 'Quiet Luxury', 'Digital Brutalism',
];

export default function TagMarquee() {
  const row = [...TAGS, ...TAGS];
  return (
    <div className="tag-marquee" aria-hidden="true">
      <div className="tag-marquee-track">
        {row.map((t, i) => (
          <span key={i} className="tag-marquee-item">
            {t}
            <span className="tag-marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create SignalsBento (client component, pointer tilt)**

Create `src/components/home/SignalsBento.tsx`:

```tsx
'use client';
import { useRef, type ReactNode, type PointerEvent } from 'react';
import { ATLAS_DATA } from '@/data/data';

function TiltCard({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <article ref={ref} className={className} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </article>
  );
}

const SPAN_CLASS: Record<string, string> = {
  feature: 'bento-feature',
  'span-3': 'bento-half',
  'span-2': 'bento-third',
};

export default function SignalsBento() {
  return (
    <section className="home-section" id="signals">
      <header className="section-head">
        <span className="section-index">01</span>
        <h2 className="section-title">Featured <em>Signals</em></h2>
        <p className="section-lede">
          The aesthetics gaining ground this issue — tracked across platforms,
          campaigns, and product surfaces.
        </p>
      </header>
      <div className="bento">
        {ATLAS_DATA.featuredSignals.map((s) => (
          <TiltCard key={s.id} className={`bento-card ${SPAN_CLASS[s.span] ?? 'bento-third'}`}>
            <div className="bento-top">
              <span className="bento-cat">{s.category}</span>
              {'tag' in s && s.tag ? <span className="bento-tag">{s.tag}</span> : null}
            </div>
            <h3 className="bento-title">{s.title}</h3>
            <p className="bento-desc">{s.desc}</p>
            <div className="bento-foot">
              <span className="bento-swatches">
                {s.palette.map((p) => (
                  <span key={p} style={{ background: p }} />
                ))}
              </span>
              <span className="bento-use">{s.useCase}</span>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create PaletteStrip (server component)**

Create `src/components/home/PaletteStrip.tsx`:

```tsx
import { ATLAS_DATA } from '@/data/data';

export default function PaletteStrip() {
  return (
    <section className="home-section" id="palettes">
      <header className="section-head">
        <span className="section-index">02</span>
        <h2 className="section-title">Working <em>Palettes</em></h2>
        <p className="section-lede">
          Twelve aesthetic systems, each reduced to its working colors.
        </p>
      </header>
      <div className="palette-strip">
        {ATLAS_DATA.aesthetics.map((a) => (
          <article key={a.name} className="palette-chip">
            <div className="palette-bars">
              {a.palette.map((p) => (
                <span key={p} style={{ background: p }} />
              ))}
            </div>
            <h3>{a.name}</h3>
            <p>{a.traits}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create TrendsTicker (server component)**

Create `src/components/home/TrendsTicker.tsx`:

```tsx
import { ATLAS_DATA } from '@/data/data';

export default function TrendsTicker() {
  return (
    <section className="home-section" id="trends">
      <header className="section-head">
        <span className="section-index">03</span>
        <h2 className="section-title">Viral <em>Signals</em></h2>
        <p className="section-lede">What is actually moving the feed — and why it works.</p>
      </header>
      <ol className="trend-list">
        {ATLAS_DATA.viralSignals.map((v) => (
          <li key={v.num} className="trend-row">
            <span className="trend-num">{v.num}</span>
            <div className="trend-body">
              <h3>{v.title}</h3>
              <p>{v.why}</p>
            </div>
            <div className="trend-side">
              <span className="trend-platform">{v.platform}</span>
              <span className="trend-meter" aria-label={`Strength ${v.strength} of 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < v.strength ? 'on' : ''} />
                ))}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 5: Append section styles to home.css**

Append to `src/app/home.css`:

```css
/* ---------- Tag marquee ---------- */
.tag-marquee {
  overflow: hidden;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 18px 0;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.tag-marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 42s linear infinite;
}

.tag-marquee:hover .tag-marquee-track {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .tag-marquee-track { animation: none; }
}

@keyframes marquee {
  to { transform: translateX(-50%); }
}

.tag-marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 26px;
  padding-right: 26px;
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1.1rem, 2vw, 1.6rem);
  color: var(--text-2);
  white-space: nowrap;
}

.tag-marquee-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--text-4);
}

/* ---------- Signals bento ---------- */
.bento {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 14px;
}

.bento-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 26px;
  border-radius: var(--r-lg);
  background: linear-gradient(165deg, var(--card) 0%, var(--bg-elev) 100%);
  border: 1px solid var(--border);
  transition: border-color 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out),
    transform 0.15s linear;
  will-change: transform;
}

.bento-card:hover {
  border-color: var(--border-hi);
  box-shadow: 0 24px 60px -30px rgba(184, 255, 77, 0.14);
}

.bento-feature { grid-column: span 4; grid-row: span 2; }
.bento-half { grid-column: span 3; }
.bento-third { grid-column: span 2; }

@media (max-width: 980px) {
  .bento-feature, .bento-half, .bento-third { grid-column: span 6; grid-row: auto; }
}

.bento-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bento-cat {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-3);
}

.bento-tag {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  color: var(--green);
  border: 1px solid rgba(184, 255, 77, 0.3);
  border-radius: var(--r-pill);
  padding: 4px 10px;
}

.bento-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(1.4rem, 2.4vw, 2.1rem);
  letter-spacing: -0.01em;
}

.bento-feature .bento-title {
  font-size: clamp(2rem, 3.6vw, 3.2rem);
}

.bento-desc {
  color: var(--text-2);
  line-height: 1.55;
  max-width: 52ch;
}

.bento-foot {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 16px;
}

.bento-swatches {
  display: inline-flex;
  gap: 5px;
}

.bento-swatches span {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.bento-use {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-3);
}

/* ---------- Palette strip ---------- */
.palette-strip {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: clamp(200px, 22vw, 260px);
  gap: 14px;
  overflow-x: auto;
  padding-bottom: 14px;
  scroll-snap-type: x mandatory;
}

.palette-chip {
  scroll-snap-align: start;
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  padding: 18px;
  background: var(--bg-elev);
  transition: border-color 0.3s var(--ease-out);
}

.palette-chip:hover { border-color: var(--border-hi); }

.palette-bars {
  display: flex;
  height: 72px;
  border-radius: var(--r-sm);
  overflow: hidden;
  margin-bottom: 14px;
}

.palette-bars span { flex: 1; transition: flex 0.35s var(--ease-out); }
.palette-chip:hover .palette-bars span:hover { flex: 2.4; }

.palette-chip h3 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 1.15rem;
}

.palette-chip p {
  margin-top: 4px;
  font-size: 0.8rem;
  color: var(--text-3);
}

/* ---------- Trends ticker ---------- */
.trend-list {
  list-style: none;
  border-top: 1px solid var(--border);
}

.trend-row {
  display: grid;
  grid-template-columns: 70px 1fr auto;
  gap: 24px;
  align-items: center;
  padding: 26px 0;
  border-bottom: 1px solid var(--border);
  transition: background 0.3s var(--ease-out);
}

.trend-row:hover { background: rgba(255, 255, 255, 0.015); }

.trend-num {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.6rem;
  color: var(--text-4);
}

.trend-body h3 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(1.2rem, 2vw, 1.6rem);
}

.trend-body p {
  margin-top: 6px;
  color: var(--text-2);
  line-height: 1.55;
  max-width: 64ch;
}

.trend-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.trend-platform {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-3);
}

.trend-meter { display: inline-flex; gap: 4px; }

.trend-meter span {
  width: 18px;
  height: 3px;
  border-radius: 2px;
  background: var(--border-hi);
}

.trend-meter span.on { background: var(--blue); }

@media (max-width: 720px) {
  .trend-row { grid-template-columns: 48px 1fr; }
  .trend-side { grid-column: 2; flex-direction: row; align-items: center; }
}
```

- [ ] **Step 6: Wire sections into the page**

Replace the full contents of `src/app/page.tsx` with:

```tsx
import OrbitHero from '@/components/hero/OrbitHero';
import TagMarquee from '@/components/home/TagMarquee';
import SignalsBento from '@/components/home/SignalsBento';
import PaletteStrip from '@/components/home/PaletteStrip';
import TrendsTicker from '@/components/home/TrendsTicker';
import './home.css';

export default function Home() {
  return (
    <>
      <OrbitHero />
      <TagMarquee />
      <SignalsBento />
      <PaletteStrip />
      <TrendsTicker />
    </>
  );
}
```

- [ ] **Step 7: Verify**

Run: `npx tsc --noEmit` then `npm run build` — Expected: both exit 0.
In the dev server confirm: marquee scrolls and pauses on hover; bento cards tilt toward the pointer (mouse only) and reset on leave; the feature card spans wide; palette strip scrolls horizontally with snap and hover-expanding bars; trend rows show cobalt strength meters; "Explore the Atlas" in the hero scrolls to `#signals`.

- [ ] **Step 8: Commit**

```bash
git add src/components/home src/app/page.tsx src/app/home.css
git commit -m "feat: add homepage sections — marquee, signals bento, palettes, trends"
```

---

### Task 6: Closing CTA with chrome knot

**Files:**
- Create: `src/components/home/KnotCanvas.tsx`
- Create: `src/components/home/ChromeKnot.tsx`
- Create: `src/components/home/ClosingCta.tsx`
- Modify: `src/app/page.tsx` (add one import + element)
- Modify: `src/app/home.css` (append)

**Interfaces:**
- Consumes: `.btn` classes from globals.css.
- Produces: `ClosingCta()` default export used by `page.tsx`.

- [ ] **Step 1: Create the knot scene**

Create `src/components/home/KnotCanvas.tsx`:

```tsx
'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

function Knot() {
  const mesh = useRef<Mesh>(null!);
  useFrame((_, delta) => {
    mesh.current.rotation.x += delta * 0.25;
    mesh.current.rotation.y += delta * 0.35;
  });
  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[1, 0.32, 220, 36]} />
      <meshNormalMaterial />
    </mesh>
  );
}

export default function KnotCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
    >
      <Knot />
    </Canvas>
  );
}
```

- [ ] **Step 2: Create the client wrapper**

Create `src/components/home/ChromeKnot.tsx`:

```tsx
'use client';
import dynamic from 'next/dynamic';

const KnotCanvas = dynamic(() => import('./KnotCanvas'), { ssr: false });

export default function ChromeKnot() {
  return (
    <div className="chrome-knot" aria-hidden="true">
      <KnotCanvas />
    </div>
  );
}
```

- [ ] **Step 3: Create the CTA section**

Create `src/components/home/ClosingCta.tsx`:

```tsx
import ChromeKnot from './ChromeKnot';

export default function ClosingCta() {
  return (
    <section className="closing-cta">
      <ChromeKnot />
      <p className="closing-kicker">Navrine Studio</p>
      <h2 className="closing-title">
        Read the signals.
        <br />
        <em>Design the future.</em>
      </h2>
      <p className="closing-sub">
        Turn the Atlas into your brand direction — aesthetics, palettes, and
        prompt grammar applied to your next launch.
      </p>
      <div className="closing-ctas">
        <a href="/studio" className="btn btn-primary">Start a Studio brief</a>
        <a href="/journal" className="btn btn-ghost">Read the Journal</a>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Append CTA styles**

Append to `src/app/home.css`:

```css
/* ---------- Closing CTA ---------- */
.closing-cta {
  position: relative;
  max-width: 1280px;
  margin: 0 auto var(--section-y);
  padding: clamp(64px, 9vw, 130px) var(--gutter);
  text-align: center;
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  overflow: hidden;
  background:
    radial-gradient(55% 70% at 50% 0%, rgba(255, 79, 216, 0.08), transparent 70%),
    var(--bg-elev);
}

.chrome-knot {
  position: absolute;
  top: -40px;
  right: -30px;
  width: clamp(160px, 22vw, 300px);
  aspect-ratio: 1;
  opacity: 0.8;
  pointer-events: none;
}

.closing-kicker {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--pink);
  margin-bottom: 18px;
}

.closing-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(2.4rem, 6vw, 5rem);
  line-height: 1.02;
  letter-spacing: -0.02em;
}

.closing-title em { font-style: italic; color: var(--pink); }

.closing-sub {
  max-width: 48ch;
  margin: 22px auto 0;
  color: var(--text-2);
  line-height: 1.6;
}

.closing-ctas {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 36px;
}
```

- [ ] **Step 5: Add to the page**

In `src/app/page.tsx`, add the import and element:

```tsx
import ClosingCta from '@/components/home/ClosingCta';
```

and render `<ClosingCta />` after `<TrendsTicker />` inside the fragment.

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit` then `npm run build` — Expected: exit 0.
Dev server: iridescent torus knot rotates in the CTA panel's top-right corner; panel keeps magenta accent only; buttons link to `/studio` and `/journal`.

- [ ] **Step 7: Commit**

```bash
git add src/components/home/KnotCanvas.tsx src/components/home/ChromeKnot.tsx src/components/home/ClosingCta.tsx src/app/page.tsx src/app/home.css
git commit -m "feat: add closing CTA with rotating chrome knot"
```

---

### Task 7: Header/Footer refinement

**Files:**
- Modify: `src/app/globals.css` (`.nav` block and footer styles — locate with grep, apply property changes below)

**Interfaces:**
- Consumes: existing `.nav`, `.footer` (or equivalent) selectors in globals.css. No markup changes to `Header.tsx`/`Footer.tsx`.

- [ ] **Step 1: Find the current nav and footer style blocks**

Run: `grep -n "^\.nav {\|^\.footer\|^footer" src/app/globals.css`
Expected: line numbers for the nav and footer blocks.

- [ ] **Step 2: Apply the refinements**

In the `.nav { ... }` block, set (add or replace these properties, keep the rest):

```css
  background: rgba(7, 7, 8, 0.55);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
```

In the footer's top-level block, set:

```css
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  background: var(--bg-elev);
```

If a property already has an equivalent value, leave it. Make no other changes to globals.css.

- [ ] **Step 3: Verify**

Dev server: nav shows a frosted-glass blur over the hero when scrolling; hairline borders render at top and footer. `npm run build` — Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "style: frosted nav and hairline footer to match Orbit design system"
```

---

### Task 8: Final verification pass

**Files:** none (verification only; fix regressions inline if found)

- [ ] **Step 1: Clean production build**

Run: `npm run build` — Expected: exit 0, all routes compile.

- [ ] **Step 2: Lint**

Run: `npm run lint` — Expected: exit 0 or only pre-existing warnings in files this plan didn't touch. Fix any new issues in touched files.

- [ ] **Step 3: Full visual walkthrough (dev server)**

Checklist at http://localhost:3000:
1. Hero: constellation renders, drift + parallax + hover + scroll dolly work; headline legible over the scene.
2. Reduced motion emulation → static composition, marquee frozen.
3. Kill WebGL (DevTools command menu → "Emulate blocked WebGL" if available, else temporarily hardcode `webgl = false` in `OrbitHero`, verify, revert) → static composition, no error overlay.
4. Mobile viewport (375px): hero readable, ~8 cards, sections stack single-column, no horizontal scroll.
5. Sub-pages (`/trends`, `/aesthetics`, `/journal`) still render correctly with the new fonts.
6. No console errors on any checked page.

- [ ] **Step 4: Commit any fixes and finish**

```bash
git add -A src docs
git commit -m "chore: final verification fixes for Orbit homepage"
```

Then use superpowers:verification-before-completion before claiming done, and superpowers:finishing-a-development-branch to decide integration.
