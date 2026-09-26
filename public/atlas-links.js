// Routes the Framer-exported homepage's buttons, cards, and nav to the Next.js pages.
// The export ships most "buttons" as plain divs and its nav anchors all point at index.html,
// so clicks are resolved here by delegation — this survives Framer re-rendering the DOM on hydration.
(() => {
  const CONTACT = "mailto:hello@navrine.space";
  const key = (s) => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const text = (el) => (el.textContent || "").replace(/\s+/g, " ").trim();

  // Top navigation (inside <nav>)
  const NAV = {
    navrineatlas: "/",
    discover: "/trends",
    style: "/aesthetics",
    create: "/prompts",
    jurnal: "/journal",
    journal: "/journal",
    letsbuild: "/studio",
  };

  // Footer ([data-framer-name="Footer"])
  const FOOTER = {
    navrineatlas: "/",
    buildwithnavrinestudio: "/studio",
    trends: "/trends",
    aesthetics: "/aesthetics",
    designconcepts: "/design-concepts",
    tasteindex: "/taste",
    photography: "/photography",
    viralsignals: "/viral-signals",
    colorpalettes: "/color-palettes",
    typography: "/typography",
    prompts: "/prompts",
    assets: "/assets",
    thejournal: "/journal",
    fieldnotes: "/journal",
    playbooks: "/journal",
    submitsignal: "/submit",
    newsletter: CONTACT + "?subject=Subscribe%20to%20the%20Navrine%20Atlas%20newsletter",
    navrinestudio: "/studio",
    casestudies: "/studio",
    hireus: "/studio",
    press: CONTACT + "?subject=Press%20enquiry",
    contact: CONTACT,
    terms: "/about",
    privacy: "/about",
    rss: "/rss.xml",
    sitemap: "/sitemap.xml",
  };

  // Standalone CTAs elsewhere on the page (texts are unique on the page)
  const CTA = {
    issue014may2026: "/journal",
    visualculturecatalog: "/visual-culture",
    iden: "/about",
    exploreatlas: "/aesthetics",
    consultationwithnavrinestudio: "/studio",
    viewall86: "/aesthetics",
    filtertool: "/prompts",
    startastudiobrief: "/studio",
    readthejournal: "/journal",
    allessays: "/journal",
    rss: "/rss.xml",
    searchaestheticstrendspromptsphotographystylesorbrandconcepts: "/search",
    category: "/search", region: "/search", industry: "/search", mood: "/search",
    color: "/search", era: "/search", platform: "/search", usecase: "/search",
  };

  // Search suggestion chips — matched case-sensitively so "CHROME FUTURE" doesn't catch the hero card title
  const CHIPS = ["MUSIC STARTUP", "TIKTOK POSTER TREND", "URBAN PHOTOGRAPHY", "Y2K WEBSITE", "LUXURY SAAS",
    "INDONESIAN POP CULTURE", "AI ALBUM COVER", "STREET CAMPAIGN", "COOL BLUE MINIMAL", "NOTES APP CHIC", "CHROME FUTURE"];

  // Hero orbit cards (swatch + title + label)
  const HERO = {
    neoy2kaesthetic: "/aesthetics/neo-y2k-interface",
    urbannightphotograph: "/aesthetics/urban-night-photography",
    chromefutureposter: "/aesthetics/chrome-future-poster",
    premiumdarkproductui: "/aesthetics/premium-dark-dashboard",
  };

  const SIGNALS = {
    "Neo-Y2K Interface": "neo-y2k-interface",
    "Vintage Pop Campaign": "vintage-pop-campaign",
    "Urban Night Photography": "urban-night-photography",
    "Cyber Street Identity": "cyber-street-identity",
    "Cool Blue Minimal SaaS": "cool-blue-minimal-saas",
    "Chrome Future Poster": "chrome-future-poster",
    "Asian Pop Music Visual": "asian-pop-music-visual",
    "Premium Dark Dashboard": "premium-dark-dashboard",
  };
  const PROMPTS = ["Neo-Y2K Hero Render", "Urban Night Campaign", "Premium Dark Dashboard",
    "Chrome Future Poster", "Asian Pop Album Cover", "Soft 3D Product Hero"];
  const JOURNAL = [
    "What is visual culture in branding, and why it now beats positioning",
    "How to find aesthetic direction for a new startup",
    "Indonesian pop culture and the new global music visual",
    "Y2K design, decoded: what to keep, what to leave in 2002",
    "Color palette psychology for SaaS and creative brands",
    "How founders can build taste before building products",
  ];
  // Slug rules mirror src/app/prompts/[slug] and src/app/journal/[slug]
  const promptSlug = (t) => t.toLowerCase().replace(/ /g, "-");
  const journalSlug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  // Returns the only title whose key appears in k, or null when zero or several do
  const single = (titles, k) => {
    const hits = titles.filter((t) => k.includes(key(t)));
    return hits.length === 1 ? hits[0] : null;
  };

  const resolveOne = (el) => {
    if (el.closest("form")) return null;
    const k = key(el.textContent);
    if (!k || k.length > 600) return null;
    const raw = text(el);
    const name = el.getAttribute("data-framer-name");

    if (el.closest("nav") && NAV[k]) return NAV[k];
    if (el.closest('[data-framer-name="Footer"]')) return FOOTER[k] || null;
    if (CTA[k]) return CTA[k];
    if (CHIPS.includes(raw)) return "/search?q=" + encodeURIComponent(raw.toLowerCase());
    if (HERO[k] && !el.closest('[data-framer-name="Article"]')) return HERO[k];

    if (name === "Article" && el.closest('[data-framer-name="Prompt"]')) {
      const t = single(PROMPTS, k);
      return t && "/prompts/" + promptSlug(t);
    }
    if (name === "Article") {
      const t = single(JOURNAL, k);
      return t && "/journal/" + journalSlug(t);
    }
    if (k.includes("openatlasentry") && k.includes("signal")) {
      const t = single(Object.keys(SIGNALS), k);
      return t && "/aesthetics/" + SIGNALS[t];
    }
    return null;
  };

  // Closest ancestor that maps to a destination wins
  const resolve = (target) => {
    for (let el = target; el && el !== document.body; el = el.parentElement) {
      const href = resolveOne(el);
      if (href) return href;
    }
    return null;
  };

  const go = (href, newTab) => {
    if (newTab && !href.startsWith("mailto:")) window.open(href, "_blank", "noopener");
    else window.location.href = href;
  };

  const interactive = "input, select, textarea, button, label, video, [aria-label='COPY']";

  // Capture phase so we run before Framer's router swallows the click
  window.addEventListener("click", (e) => {
    if (e.button !== 0 || e.defaultPrevented) return;
    const t = e.target;
    if (!(t instanceof Element) || t.closest(interactive)) return;
    const href = resolve(t);
    if (!href) return;
    e.preventDefault();
    e.stopPropagation();
    go(href, e.metaKey || e.ctrlKey);
  }, true);

  window.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const t = e.target;
    if (!(t instanceof Element) || !t.hasAttribute("data-atlas-href")) return;
    e.preventDefault();
    go(t.getAttribute("data-atlas-href"), e.metaKey || e.ctrlKey);
  }, true);

  // Framer's hidden form has no working endpoint on this host — send the submission by email instead
  window.addEventListener("submit", (e) => {
    const form = e.target;
    if (!(form instanceof HTMLFormElement) || !form.querySelector('[name="TITLE"]')) return;
    e.preventDefault();
    e.stopPropagation();
    const v = (n) => (form.querySelector(`[name="${n}"]`)?.value || "").trim();
    if (v("website") || v("company")) return; // honeypot
    const body = [
      "Name: " + v("Name"), "Email: " + v("EMAIL"), "Category: " + v("Location"),
      "Title: " + v("TITLE"), "Source: " + v("SOURCE"), "Tags: " + v("TAGS"),
      "References: " + v("IMAGE"), "", v("DESCRIPTION"),
    ].join("\n");
    window.location.href = CONTACT + "?subject=" + encodeURIComponent("Atlas submission: " + (v("TITLE") || "New signal")) +
      "&body=" + encodeURIComponent(body);
  }, true);

  // Pointer cursor, keyboard focus, and real hrefs on the things that now navigate
  const CANDIDATES = 'nav a, [data-framer-name="Footer"] a, [data-framer-name="Footer"] p, [data-framer-name="Footer"] [data-framer-name], ' +
    '[data-framer-name="Article"], [data-framer-name="Link"], [data-framer-name^="Component"], [data-framer-name^="Variant"], p';
  const decorate = () => {
    document.querySelectorAll(CANDIDATES).forEach((el) => {
      if (el.closest("[data-atlas-href]") || el.closest(interactive)) return;
      const href = resolveOne(el);
      if (!href) return;
      el.setAttribute("data-atlas-href", href);
      el.style.cursor = "pointer";
      // Prefer fixing a real anchor (the nav items wrap one) over faking a link on its wrapper
      const a = el.tagName === "A" ? el : el.closest("a") || el.querySelector("a");
      if (a) {
        a.setAttribute("href", href);
        if (href.startsWith("mailto:")) a.removeAttribute("target");
      } else {
        el.setAttribute("role", "link");
        el.tabIndex = 0;
      }
    });
  };

  let queued = false;
  const schedule = (mutations) => {
    // Ignore text-only churn (the live clock, tickers) — only new elements need decorating
    if (queued || !mutations.some((m) => [...m.addedNodes].some((n) => n.nodeType === 1))) return;
    queued = true;
    setTimeout(() => { queued = false; decorate(); }, 500);
  };
  // Decorate after Framer hydrates so the attributes we add aren't part of the hydration diff
  const start = () => {
    decorate();
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === "complete") setTimeout(start, 1000);
  else window.addEventListener("load", () => setTimeout(start, 1000));
})();
