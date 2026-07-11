# Navrine Atlas — "The Orbit" Homepage Design

**Date:** 2026-07-04
**Scope:** Homepage showcase redesign with a WebGL 3D hero. Sub-pages are untouched except that shared Header/Footer styling is refined to match.

## Goal

Turn the Navrine Atlas homepage into a signature piece: a refined dark-editorial page whose hero is a 3D constellation of the Atlas's own content. The 3D must be meaningful (built from real data), performant, and degrade gracefully.

## Aesthetic direction

Refined dark editorial:

- Canvas: near-black `#070708` with a faint film-grain overlay.
- Typography: **Fraunces** (serif display — headline, section numerals, pull quotes) + **Space Grotesk** (UI, body, labels), loaded via `next/font/google`.
- Accents used surgically, one per section: cobalt `#4D8DFF`, magenta `#FF4FD8`, lime `#B8FF4D`.
- Hairline borders (`1px` at 8–12% white), generous whitespace, oversized magazine-style section indices ("01 — Signals").

## Architecture

- `src/app/page.tsx` — server component composing the page sections.
- New dependencies: `three`, `@react-three/fiber`, `@react-three/drei`.
- The 3D hero is a client component loaded via dynamic import with a styled static fallback (same headline/layout, no canvas), so first paint is instant.
- Per AGENTS.md, the Next.js 16 docs in `node_modules/next/dist/docs/` must be read before writing code; conventions there override assumptions.

### Components

| Component | Purpose |
|---|---|
| `src/components/hero/OrbitHero.tsx` | Client wrapper: dynamic import, error boundary, reduced-motion + WebGL detection, static fallback |
| `src/components/hero/OrbitScene.tsx` | R3F canvas: camera rig, lights, fog, card field |
| `src/components/hero/OrbitCard.tsx` | One glass card pane (title, category, palette glow) |
| `src/components/home/*` | Below-fold sections: TagMarquee, SignalsBento, PaletteStrip, TrendsTicker, ClosingCta |

## The Orbit hero

- 10–14 glass card panes built from `ATLAS_DATA.featuredSignals` (titles, categories, palettes) drifting in a loose elliptical orbit around the headline.
- Materials: transmission/glass-like panes; each card's palette rendered as an inner glow gradient. Soft scene fog; two colored point lights (cobalt + magenta) for depth.
- Interactions: mouse → subtle camera parallax; hover → card brightens, tilts toward viewer, shows title; scroll → camera dollies forward as the hero hands off to content.
- Performance/safety: device pixel ratio capped at 2; `prefers-reduced-motion` renders a static composition (no drift, no parallax); missing WebGL or a scene error swaps in the static fallback via error boundary. No blank screens possible.

## Page flow (below the hero)

1. **Tag marquee** — ribbon of aesthetic tags, slow auto-scroll, pauses on hover.
2. **Featured Signals bento** — grid from `featuredSignals`, CSS 3D tilt-on-hover, palette swatch reveal.
3. **Palettes strip** — horizontal scroll of color palettes.
4. **Trends ticker** — list with strength meters.
5. **Closing CTA** — panel with a small secondary 3D chrome element echoing the hero.

Existing `Header.tsx` / `Footer.tsx` restyled to match the system.

## Data & error handling

- All content sourced from `src/data/data.ts`; no new data layer.
- Scene failures are contained by the error boundary → static hero.

## Verification

- `next build` and lint pass clean.
- Dev-server visual verification of: hero scene, static fallback, reduced-motion mode, and mobile layout.

**Mobile rule (explicit):** below 768px the scene still renders but with a reduced card count (~8), no hover interactions, and DPR capped at 1.5. The static fallback is used only for reduced-motion, missing WebGL, or scene errors — same as desktop.

## Out of scope

- Redesigning the ~15 sub-pages.
- New content/data authoring.
- CMS or backend work.
