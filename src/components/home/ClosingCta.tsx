import Link from 'next/link';
import ChromeKnot from './ChromeKnot';

export default function ClosingCta() {
  return (
    <section className="closing-cta">
      <ChromeKnot />
      <p className="closing-kicker">Navrine Studio</p>
      <h2 className="closing-title">
        Read the signals.
        <br />
        <em>Design the future.</em>
      </h2>
      <p className="closing-sub">
        Turn the Atlas into your brand direction — aesthetics, palettes, and
        prompt grammar applied to your next launch.
      </p>
      <div className="closing-ctas">
        <Link href="/studio" className="btn btn-primary">Start a Studio brief</Link>
        <Link href="/journal" className="btn btn-ghost">Read the Journal</Link>
      </div>
    </section>
  );
}
