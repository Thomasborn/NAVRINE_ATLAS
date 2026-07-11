import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ATLAS_DATA as D } from '@/data/data';

type Props = {
  params: Promise<{ slug: string }>
}

export default async function JournalDetail({ params }: Props) {
  const { slug } = await params;
  const entry = D.journal.find((e: any) => e.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
  
  if (!entry) {
    notFound();
  }

  return (
    <section id="detail">
      <div className="shell" style={{ marginTop: '2rem', maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <div className="section-head" style={{ borderBottom: 'none', marginBottom: '2rem', textAlign: 'center' }}>
          <div className="head-meta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="eyebrow" style={{ marginBottom: '1rem' }}>
              <Link href="/journal" style={{ textDecoration: 'none', color: 'inherit' }}>The Journal</Link>
            </span>
            <h1 className="display" style={{ marginTop: '1rem', fontSize: '3rem' }}>{entry.title}</h1>
            <div className="jr-meta" style={{ marginTop: '2rem', justifyContent: 'center' }}>
              {entry.meta.map((m: string, i: number) => (
                <span key={i}>
                  <span>{m}</span>
                  {i < entry.meta.length - 1 && <span style={{color:"var(--text-4)", margin: "0 8px"}}>·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem', width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', marginBottom: '3rem' }}>
          <div className={`mood ${entry.visual}`} style={{ width: '100%', height: '100%' }}></div>
        </div>

        <div style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-2)' }}>
          <p style={{ marginBottom: '2rem', color: 'var(--text-1)', fontSize: '1.5rem', lineHeight: 1.6 }}>{entry.excerpt}</p>
          <p style={{ marginBottom: '1.5rem' }}>Visual culture is not just what things look like—it’s the underlying grammar of how we communicate values, status, and identity in a hyper-connected world. When we analyze trends at Navrine Atlas, we are looking past the surface aesthetics to understand the deeper signals.</p>
          <p style={{ marginBottom: '1.5rem' }}>This shift requires designers and founders to stop thinking about positioning solely as copy. Positioning is a sentence, but visual culture is the accent, posture, room, and weather of that sentence. It is the immediate, visceral read that someone gets before they have read a single word of your marketing site.</p>
          <div style={{ borderLeft: '2px solid var(--green)', paddingLeft: '1.5rem', margin: '3rem 0' }}>
            <h3 style={{ color: 'var(--text-1)', marginBottom: '0.5rem' }}>The Atlas Perspective</h3>
            <p>To win in a saturated market, you don't just need a better product; you need a more fluent cultural read. You need to map the signals.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
