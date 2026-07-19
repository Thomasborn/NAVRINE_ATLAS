'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { buildSearchIndex, searchDocs } from '@/lib/search-index';

const INDEX = buildSearchIndex();

function search(query: string) {
  return searchDocs(INDEX, query);
}

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim().toLowerCase();
  const i = q ? text.toLowerCase().indexOf(q) : -1;
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="framer-search-match">{text.slice(i, i + q.length)}</span>
      {text.slice(i + q.length)}
    </>
  );
}

export default function LiveSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => search(query), [query]);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const goToFullSearch = () => {
    setOpen(false);
    router.push(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : '/search');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActiveIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (open && activeIndex >= 0 && results[activeIndex]) {
        setOpen(false);
        router.push(results[activeIndex].href);
      } else {
        goToFullSearch();
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const showEmpty = open && query.trim().length > 0 && results.length === 0;

  return (
    <div className="framer-search-wrap" ref={rootRef}>
      <form
        className="framer-search"
        role="search"
        onSubmit={e => { e.preventDefault(); goToFullSearch(); }}
      >
        <span style={{ color: '#000' }}>🔍</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search aesthetics, trends, prompts, photography styles, or brand concepts…"
          aria-label="Search the atlas"
          aria-expanded={open && results.length > 0}
          autoComplete="off"
        />
        <span className="framer-search-kbd">⌘K</span>
      </form>

      {open && (results.length > 0 || showEmpty) && (
        <div className="framer-search-panel" role="listbox">
          {results.map((doc, i) => (
            <Link
              key={doc.key}
              href={doc.href}
              role="option"
              aria-selected={i === activeIndex}
              className={`framer-search-result ${i === activeIndex ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
              onMouseEnter={() => setActiveIndex(i)}
            >
              <div className="framer-search-result-main">
                <span className="framer-search-result-title">
                  <Highlight text={doc.title} query={query} />
                </span>
                <span className="framer-search-result-detail">{doc.detail}</span>
              </div>
              <span className="framer-search-result-meta">{doc.meta}</span>
            </Link>
          ))}
          {showEmpty && (
            <div className="framer-search-empty">
              No matches for “{query.trim()}” — try “chrome”, “y2k” or “night photography”.
            </div>
          )}
          {results.length > 0 && (
            <button type="button" className="framer-search-all" onClick={goToFullSearch}>
              View all results for “{query.trim()}” →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
