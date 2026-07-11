import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ATLAS_DATA as D } from '@/data/data';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = D.featuredSignals.find((e: any) => e.id === slug);
  if (!entry) return {};
  return {
    title: `${entry.title} — Navrine Atlas`,
    description: entry.desc,
  };
}

export default async function AestheticDetail({ params }: Props) {
  const { slug } = await params;
  const entry = D.featuredSignals.find((e: any) => e.id === slug);
  
  if (!entry) {
    notFound();
  }

  const isLightCard = ["vintage-pop-campaign", "cool-blue-minimal-saas", "chrome-future-poster"].includes(entry.id);
  const lightClass = isLightCard ? "card-light" : "";

  return (
    <section id="detail">
      <div className="shell" style={{ marginTop: '2rem' }}>
        <div className="section-head" style={{ borderBottom: 'none', marginBottom: '1rem' }}>
          <div className="head-meta">
            <span className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link href="/aesthetics" style={{ textDecoration: 'none', color: 'inherit' }}>Aesthetics</Link>
              <span>/</span>
              <span>{entry.id}</span>
            </span>
            <h1 className="display" style={{ marginTop: '1rem' }}>{entry.title}</h1>
            <p className="lede">{entry.desc}</p>
          </div>
          <div className="head-aside">
            <span className="pill accent">{entry.category}</span>
            <span className="pill">Signal: High</span>
          </div>
        </div>

        <div className="taste-grid" style={{ marginTop: '2rem' }}>
          <div className="taste-detail" style={{ flex: 2 }}>
            <div className="td-head">
              <div>
                <span className="eyebrow" style={{marginBottom:6, display:"block"}}>Overview</span>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-2)' }}>{entry.desc}</p>
              </div>
            </div>

            <div style={{ padding: '2rem' }}>
               {entry.moodClass && (
                 <div style={{ width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem' }}>
                   <div className={`mood ${entry.moodClass}`} style={{ width: '100%', height: '100%' }}></div>
                 </div>
               )}
            </div>

            <div style={{ padding: '2rem', borderTop: '1px solid var(--border)' }}>
              <h3 style={{ marginBottom: '1rem' }}>Use Case</h3>
              <p style={{ color: 'var(--text-2)' }}>{entry.useCase}</p>
            </div>
          </div>

          <div className="taste-detail" style={{ flex: 1, position: 'sticky', top: '100px', height: 'fit-content' }}>
            <div className="td-head">
              <h3>Style Code</h3>
            </div>
            <div>
              <div className="td-row">
                <span className="k">Palette</span>
                <span className="v">
                  <div className="swatches">
                    {entry.palette?.map((c: string,i: number) => <span key={i} className="swatch" style={{background:c}}></span>)}
                  </div>
                </span>
              </div>
              <div className="td-row" style={{borderBottom:"none"}}>
                <span className="k">Best for</span>
                <span className="v muted">{entry.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
