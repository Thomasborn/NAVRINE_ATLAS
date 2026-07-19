'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const links = [
    { name: "Discover", href: "/trends" },
    { name: "Style", href: "/aesthetics" },
    { name: "Create", href: "/prompts" },
    { name: "Jurnal", href: "/journal" },
  ];

  return (
    <nav className="framer-nav">
      <Link href="/" className="framer-nav-logo">
        Navrine Atlas
      </Link>
      
      <div className="framer-nav-links">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <Link 
              key={link.name} 
              href={link.href}
              style={{ color: isActive ? 'var(--text)' : 'var(--text-2)' }}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      
      <Link href="/submit" className="framer-nav-btn">
        Let's Build &rarr;
      </Link>
    </nav>
  );
}
