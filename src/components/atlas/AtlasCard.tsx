import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AtlasEntry } from '@/data/seed';

interface AtlasCardProps {
  entry: AtlasEntry;
}

export default function AtlasCard({ entry }: AtlasCardProps) {
  return (
    <Link href={`/${entry.category.toLowerCase().replace(' ', '-')}/${entry.slug}`} className="glow-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
        height: '200px',
        backgroundColor: 'var(--surface-elevated)',
        backgroundImage: `url(${entry.ogImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative'
      }}>
        {/* Signal Strength Badge */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          backgroundColor: 'rgba(7,7,7,0.8)',
          backdropFilter: 'blur(4px)',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--accent-green)' }} />
          <span className="mono-text" style={{ fontSize: '0.7rem' }}>Signal {entry.signalStrength}</span>
        </div>
      </div>
      
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <span className="badge" style={{ marginBottom: '1rem' }}>{entry.category}</span>
          <ArrowUpRight size={18} color="var(--text-secondary)" />
        </div>
        
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{entry.title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1 }}>
          {entry.description.substring(0, 100)}...
        </p>

        {/* Color Palette Strip Preview */}
        <div style={{ display: 'flex', gap: '0.25rem', marginTop: 'auto' }}>
          {entry.colorPalette.slice(0, 5).map((color, i) => (
            <div key={i} style={{
              width: '24px',
              height: '8px',
              backgroundColor: color,
              borderRadius: '2px'
            }} />
          ))}
        </div>
      </div>
    </Link>
  );
}
