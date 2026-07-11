export default function MoodboardPage() {
  return (
    <section>
      <div className="shell" style={{ marginTop: '2rem' }}>
        <div className="section-head">
          <div className="head-meta">
            <span className="eyebrow">Personal Space</span>
            <h2 className="section-title">Saved <em>Moodboards</em>.</h2>
            <p className="lede">Your personal collection of aesthetic references, color palettes, and prompts saved from the Atlas.</p>
          </div>
          <div className="head-aside">
            <span className="pill">Export PDF</span>
          </div>
        </div>

        <div style={{ padding: '4rem', textAlign: 'center', background: 'var(--surface-1)', borderRadius: '12px', border: '1px dashed var(--border)', marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>No saved signals yet</h3>
          <p style={{ color: 'var(--text-2)', marginBottom: '2rem' }}>Explore the Atlas and save entries to build your first moodboard.</p>
          <a href="/search" className="btn btn-primary">Explore the Atlas<span className="btn-icon"></span></a>
        </div>
      </div>
    </section>
  );
}
