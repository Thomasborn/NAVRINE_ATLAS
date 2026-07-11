import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ATLAS_DATA as D } from '@/data/data';

type Props = {
  params: Promise<{ slug: string }>
}

export default async function AssetDetail({ params }: Props) {
  const { slug } = await params;
  const entry = D.assets.find((e: any) => e.title.toLowerCase().replace(/ /g, '-') === slug);
  
  if (!entry) {
    notFound();
  }

  return (
    <section id="detail">
      <div className="shell" style={{ marginTop: '2rem' }}>
        <div className="section-head" style={{ borderBottom: 'none', marginBottom: '1rem' }}>
          <div className="head-meta">
            <span className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link href="/assets" style={{ textDecoration: 'none', color: 'inherit' }}>Assets</Link>
              <span>/</span>
              <span>{entry.cat}</span>
            </span>
            <h1 className="display" style={{ marginTop: '1rem' }}>{entry.title}</h1>
            <p className="lede">Format: {entry.format} · Size: {entry.size}</p>
          </div>
          <div className="head-aside">
            <a href="#" className="btn btn-primary">Download Asset<span className="btn-icon"></span></a>
          </div>
        </div>

        <div style={{ marginTop: '2rem', width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden' }}>
          <div className={`mood ${entry.visual}`} style={{ width: '100%', height: '100%' }}></div>
        </div>
      </div>
    </section>
  );
}
