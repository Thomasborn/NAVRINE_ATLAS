'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const groups = [
  {
    label: 'Atlas',
    items: [
      { label: 'Trends', href: '/trends' },
      { label: 'Aesthetics', href: '/aesthetics' },
      { label: 'Design Concepts', href: '/design-concepts' },
      { label: 'Visual Culture', href: '/visual-culture' },
      { label: 'Taste Index', href: '/taste' },
      { label: 'Photography', href: '/photography' },
    ],
  },
  {
    label: 'Library',
    items: [
      { label: 'Viral Signals', href: '/viral-signals' },
      { label: 'Color Palettes', href: '/color-palettes' },
      { label: 'Typography', href: '/typography' },
      { label: 'Prompts', href: '/prompts' },
      { label: 'Assets', href: '/assets' },
      { label: 'Moodboard', href: '/moodboard' },
    ],
  },
  {
    label: 'Studio',
    items: [
      { label: 'Navrine Studio', href: '/studio' },
      { label: 'About the Atlas', href: '/about' },
      { label: 'Submit a Signal', href: '/submit' },
    ],
  },
];

export default function Header() {
  const [time, setTime] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, '0');
      const mm = String(d.getUTCMinutes()).padStart(2, '0');
      const ss = String(d.getUTCSeconds()).padStart(2, '0');
      setTime(`${hh}:${mm}:${ss} UTC`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Collapse the mobile menu once a link has been followed
  const close = () => {
    setMenuOpen(false);
    setOpenGroup(null);
  };

  return (
    <nav className="nav">
      <Link href="/" className="brand" aria-label="Navrine Atlas home" onClick={close}>
        <span className="brand-mark"></span>
        <span>
          <span className="brand-name">Navrine</span>
          <span className="brand-sub">/Atlas</span>
        </span>
      </Link>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`} id="nav-links">
        {groups.map((g) => {
          const active = g.items.some((item) => pathname?.startsWith(item.href));
          return (
            <li key={g.label} className={`nav-group ${openGroup === g.label ? 'open' : ''}`}>
              <button
                type="button"
                className={`nav-group-label ${active ? 'active' : ''}`}
                aria-expanded={openGroup === g.label}
                onClick={() => setOpenGroup(openGroup === g.label ? null : g.label)}
              >
                {g.label}
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="nav-dropdown">
                <span className="nav-dropdown-label">{g.label} Catalog</span>
                {g.items.map((item) => (
                  <Link key={item.label} href={item.href} onClick={close}>
                    <span className="nav-item-dot"></span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </li>
          );
        })}
        <li>
          <Link href="/search" className="nav-direct" onClick={close}>
            Search
          </Link>
        </li>
        <li>
          <Link href="/journal" className="nav-direct" onClick={close}>
            Journal
          </Link>
        </li>
      </ul>

      <div className="nav-actions">
        <span className="nav-time">{time}</span>
        <Link href="/submit" className="btn btn-ghost">
          Submit<span className="btn-icon"></span>
        </Link>
      </div>

      <button
        type="button"
        className={`mobile-menu-btn ${menuOpen ? 'open' : ''}`}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="nav-links"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
