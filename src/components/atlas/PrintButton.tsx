'use client';

// The browser's print dialog offers "Save as PDF"
export default function PrintButton({ label, className = 'pill' }: { label: string; className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.print()}>
      {label}
    </button>
  );
}
