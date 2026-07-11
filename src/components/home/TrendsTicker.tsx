import { ATLAS_DATA } from '@/data/data';

export default function TrendsTicker() {
  return (
    <section className="home-section" id="trends">
      <header className="section-head">
        <span className="section-index">03</span>
        <h2 className="section-title">Viral <em>Signals</em></h2>
        <p className="section-lede">What is actually moving the feed — and why it works.</p>
      </header>
      <ol className="trend-list">
        {ATLAS_DATA.viralSignals.map((v) => (
          <li key={v.num} className="trend-row">
            <span className="trend-num">{v.num}</span>
            <div className="trend-body">
              <h3>{v.title}</h3>
              <p>{v.why}</p>
            </div>
            <div className="trend-side">
              <span className="trend-platform">{v.platform}</span>
              <span className="trend-meter" aria-label={`Strength ${v.strength} of 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < v.strength ? 'on' : ''} />
                ))}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
