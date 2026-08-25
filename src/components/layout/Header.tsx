'use client';
import React from 'react';
import Link from 'next/link';
import '../../app/framer.css';

export default function Header() {
  return (
    <nav className="framer-nav">
      <div className="framer-nav-logo">
        <Link href="/">Navrine Atlas</Link>
      </div>
      <div className="framer-nav-links">
        <Link href="#discover">Discover</Link>
        <Link href="#style">Style</Link>
        <Link href="#create">Create</Link>
        <Link href="#journal">Jurnal</Link>
      </div>
      <a href="mailto:hello@example.com" className="framer-nav-btn">
        Let's Build &rarr;
      </a>
    </nav>
  );
}
