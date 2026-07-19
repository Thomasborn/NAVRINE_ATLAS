import Link from 'next/link';

const TAGS = [
  'Neo-Y2K', 'Vintage Pop', 'Cyber Street', 'Urban Night', 'Chrome Future',
  'Asian Pop', 'Indie Poster', 'Premium Dark', 'Street Flash', 'Viral Signal',
  'AI Cover Art', 'Soft 3D', 'Quiet Luxury', 'Digital Brutalism',
];

export default function TagMarquee() {
  const row = [...TAGS, ...TAGS];
  return (
    <div className="tag-marquee">
      <div className="tag-marquee-track">
        {row.map((t, i) => (
          <Link key={i} href={`/search?q=${encodeURIComponent(t)}`} className="tag-marquee-item" style={{ textDecoration: 'none' }}>
            {t}
            <span className="tag-marquee-dot" />
          </Link>
        ))}
      </div>
    </div>
  );
}
