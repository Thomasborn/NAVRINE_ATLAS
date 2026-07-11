'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const KnotCanvas = dynamic(() => import('./KnotCanvas'), { ssr: false });

export default function ChromeKnot() {
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const probe = document.createElement('canvas');
      setWebgl(!!(probe.getContext('webgl2') || probe.getContext('webgl')));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  if (!webgl) return null;

  return (
    <div className="chrome-knot" aria-hidden="true">
      <KnotCanvas />
    </div>
  );
}
