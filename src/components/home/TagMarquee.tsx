const TAGS = [
  'Neo-Y2K', 'Vintage Pop', 'Cyber Street', 'Urban Night', 'Chrome Future',
  'Asian Pop', 'Indie Poster', 'Premium Dark', 'Street Flash', 'Viral Signal',
  'AI Cover Art', 'Soft 3D', 'Quiet Luxury', 'Digital Brutalism',
];

export default function TagMarquee() {
  const row = [...TAGS, ...TAGS];
  return (
    <div className="tag-marquee" aria-hidden="true">
      <div className="tag-marquee-track">
        {row.map((t, i) => (
          <span key={i} className="tag-marquee-item">
            {t}
            <span className="tag-marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
