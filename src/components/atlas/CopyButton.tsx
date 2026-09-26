'use client';
import { useState } from 'react';

export default function CopyButton({ text, label, className = 'pill' }: { text: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <button type="button" className={className} onClick={copy}>
      {copied ? 'Copied ✓' : label}
    </button>
  );
}
