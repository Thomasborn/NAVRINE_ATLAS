'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [time, setTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      const ss = String(d.getUTCSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss} UTC`);
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  const groups = [
    {
      label: "Discover",
      items: [
        { name: "Trends", href: "/trends" },
        { name: "Viral Signals", href: "/viral-signals" },
      ],
    },
    {
      label: "Style",
      items: [
        { name: "Aesthetic", href: "/aesthetics" },
        { name: "Design Concepts", href: "/design-concepts" },
        { name: "Taste", href: "/taste" },
        { name: "Palettes", href: "/color-palettes" },
      ],
    },
    {
      label: "Create",
      items: [
        { name: "Photography", href: "/photography" },
        { name: "Prompts", href: "/prompts" },
        { name: "Assets", href: "/assets" },
      ],
    },
  ];

  const ChevronDown = () => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3.5 5 6.5 8 3.5"/>
    </svg>
  );

  return (
    <nav className="nav">
      <Link href="/" className="brand" aria-label="Navrine Atlas home">
        <span className="brand-mark"></span>
        <span><span className="brand-name">Navrine</span><span className="brand-sub">/Atlas</span></span>
      </Link>
      
      <button 
        className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
        {groups.map(g => (
          <li key={g.label} className="nav-group">
            <span className="nav-group-label">
              {g.label}
              <ChevronDown />
            </span>
            <div className="nav-dropdown">
              <span className="nav-dropdown-label">{g.label}</span>
              {g.items.map(item => (
                <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  <span className="nav-item-dot"></span>
                  {item.name}
                </Link>
              ))}
            </div>
          </li>
        ))}
        <li>
          <Link href="/journal" className="nav-direct" onClick={() => setMobileMenuOpen(false)}>Journal</Link>
        </li>
      </ul>
      <div className="nav-actions">
        <span className="nav-time">{time}</span>
        <Link href="/submit" className="btn btn-ghost">Submit<span className="btn-icon"></span></Link>
      </div>
    </nav>
  );
}
