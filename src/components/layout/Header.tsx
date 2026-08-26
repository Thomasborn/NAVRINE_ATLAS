'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [time, setTime] = useState('');

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

  const groups = [
    {
      label: 'Atlas',
      items: [
        { label: 'Trends', href: '/trends' },
        { label: 'Aesthetics', href: '/aesthetics' },
        { label: 'Taste Index', href: '/taste' },
        { label: 'Photography', href: '/photography' },
      ],
    },
    {
      label: 'Library',
      items: [
        { label: 'Viral Signals', href: '/viral-signals' },
        { label: 'Prompts', href: '/prompts' },
        { label: 'Assets', href: '/assets' },
      ],
    },
  ];

  return (
    <nav className="nav">
      <Link href="/" className="brand" aria-label="Navrine Atlas home">
        <span className="brand-mark"></span>
        <span>
          <span className="brand-name">Navrine</span>
          <span className="brand-sub">/Atlas</span>
        </span>
      </Link>

      <ul className="nav-links">
        {groups.map((g) => (
          <li key={g.label} className="nav-group">
            <span className="nav-group-label">
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
            </span>
            <div className="nav-dropdown">
              <span className="nav-dropdown-label">{g.label} Catalog</span>
              {g.items.map((item) => (
                <Link key={item.label} href={item.href}>
                  <span className="nav-item-dot"></span>
                  {item.label}
                </Link>
              ))}
            </div>
          </li>
        ))}
        <li>
          <Link href="/journal" className="nav-direct">
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
    </nav>
  );
}
