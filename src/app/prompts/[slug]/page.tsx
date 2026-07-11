import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ATLAS_DATA as D } from '@/data/data';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = D.prompts.find((e: any) => e.title.toLowerCase().replace(/ /g, '-') === slug);
  if (!entry) return {};
  return {
    title: `${entry.title} — Prompt Pack`,
    description: `AI Prompt for ${entry.category} using ${entry.tool}`,
  };
}

export default async function PromptDetail({ params }: Props) {
  const { slug } = await params;
  const entry = D.prompts.find((e: any) => e.title.toLowerCase().replace(/ /g, '-') === slug);
  
  if (!entry) {
    notFound();
  }

  return (
    <section id="detail">
      <div className="shell" style={{ marginTop: '2rem' }}>
        <div className="section-head" style={{ borderBottom: 'none', marginBottom: '1rem' }}>
          <div className="head-meta">
            <span className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link href="/prompts" style={{ textDecoration: 'none', color: 'inherit' }}>Prompts</Link>
              <span>/</span>
              <span>{entry.category}</span>
            </span>
            <h1 className="display" style={{ marginTop: '1rem' }}>{entry.title}</h1>
            <p className="lede">Designed for {entry.tool}</p>
          </div>
          <div className="head-aside">
            <span className="pill accent">Prompt Pack</span>
          </div>
        </div>

        <div className="taste-grid" style={{ marginTop: '2rem' }}>
          <div className="taste-detail" style={{ flex: 2 }}>
            <div className="td-head">
              <div>
                <span className="eyebrow" style={{marginBottom:6, display:"block"}}>The Prompt</span>
              </div>
            </div>

            <div style={{ padding: '2rem' }}>
              <div style={{ padding: '1.5rem', background: 'var(--surface-1)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                 <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--green)', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: entry.body }}></p>
              </div>
            </div>

            <div style={{ padding: '2rem', borderTop: '1px solid var(--border)' }}>
              <h3 style={{ marginBottom: '1rem' }}>Tags</h3>
              <div className="prompt-tags">
                {entry.tags.map((t: string) => <span key={t} className="pill">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
