import { ATLAS_DATA } from '@/data/data';

export default function PaletteStrip() {
  return (
    <section className="home-section" id="palettes">
      <header className="section-head">
        <span className="section-index">02</span>
        <h2 className="section-title">Working <em>Palettes</em></h2>
        <p className="section-lede">
          Twelve aesthetic systems, each reduced to its working colors.
        </p>
      </header>
      <div className="palette-strip">
        {ATLAS_DATA.aesthetics.map((a) => (
          <article key={a.name} className="palette-chip">
            <div className="palette-bars">
              {a.palette.map((p) => (
                <span key={p} style={{ background: p }} />
              ))}
            </div>
            <h3>{a.name}</h3>
            <p>{a.traits}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
