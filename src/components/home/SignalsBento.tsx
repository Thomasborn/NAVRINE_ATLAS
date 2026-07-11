'use client';
import { useRef, type ReactNode, type PointerEvent } from 'react';
import { ATLAS_DATA } from '@/data/data';

function TiltCard({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <article ref={ref} className={className} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </article>
  );
}

const SPAN_CLASS: Record<string, string> = {
  feature: 'bento-feature',
  'span-3': 'bento-half',
  'span-2': 'bento-third',
};

export default function SignalsBento() {
  return (
    <section className="home-section" id="signals">
      <header className="section-head">
        <span className="section-index">01</span>
        <h2 className="section-title">Featured <em>Signals</em></h2>
        <p className="section-lede">
          The aesthetics gaining ground this issue — tracked across platforms,
          campaigns, and product surfaces.
        </p>
      </header>
      <div className="bento">
        {ATLAS_DATA.featuredSignals.map((s) => (
          <TiltCard key={s.id} className={`bento-card ${SPAN_CLASS[s.span] ?? 'bento-third'}`}>
            <div className="bento-top">
              <span className="bento-cat">{s.category}</span>
              {'tag' in s && s.tag ? <span className="bento-tag">{s.tag}</span> : null}
            </div>
            <h3 className="bento-title">{s.title}</h3>
            <p className="bento-desc">{s.desc}</p>
            <div className="bento-foot">
              <span className="bento-swatches">
                {s.palette.map((p) => (
                  <span key={p} style={{ background: p }} />
                ))}
              </span>
              <span className="bento-use">{s.useCase}</span>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
