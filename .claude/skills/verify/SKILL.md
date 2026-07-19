---
name: verify
description: Build, launch, and drive the Navrine Atlas Next.js app to verify changes at the browser surface
---

# Verify Navrine Atlas

## Build & launch

```bash
npm run build          # Next 16 / Turbopack; typecheck runs here
npm run start -- -p 3177   # production server (run in background)
```

## Gotchas

- **`/` is NOT `src/app/page.tsx`.** `next.config.ts` has a `beforeFiles` rewrite
  mapping `/` → `/index.html`, the static Framer export in `public/index.html`.
  Changes to the home experience usually mean editing the injected `<script>`
  blocks near the end of `public/index.html` (nav hijack, live search).
  `public/` files are served live by `next start` — no rebuild needed for them.
- All other routes (`/search`, `/aesthetics/[slug]`, `/prompts/[slug]`, …) are
  the app router as normal.
- The Framer page builds its DOM client-side; wait for injected elements
  (e.g. `input.atlas-real-input`) rather than SSR markup.
- Framer sections are separate stacking contexts — overlays must be portaled to
  `document.body` to render above later sections.

## Drive

Playwright works via a scratchpad install (`npm i playwright` in a temp dir,
chromium already provisioned). Drive `http://localhost:3177`. Home search:
type into `input.atlas-real-input`, results render in `.atlas-search-panel`
(rows `.atlas-search-row`). Full search page cards: `.signal-card .card-title`.
Search data comes from `/search-index.json` (prerendered from
`src/lib/search-index.ts`).
