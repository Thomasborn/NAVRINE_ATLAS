'use client';
import { useState } from 'react';
import { ATLAS_DATA as D } from '@/data/data';

export default function TasteIndexPage() {
  const [activeId, setActiveId] = useState("premium-dark");
  const active = D.tasteProfiles.find((p: any) => p.id === activeId)!;

  return (
    <section id="taste">
      <div className="shell" style={{ marginTop: '2rem' }}>
        <div className="section-head">
          <div className="head-meta">
            <span className="eyebrow">Taste Index</span>
            <h2 className="section-title">Map your <em>taste</em>.</h2>
            <p className="lede">A multi-axis matrix for placing visual directions — minimal to maximal, classic to experimental, corporate to cultural. Click a point to map its full creative profile.</p>
          </div>
          <div className="head-aside">
            <span>Axis: Minimal ↔ Maximal · Classic ↔ Experimental</span>
          </div>
        </div>

        <div className="taste-grid">
          <div className="taste-matrix">
            <div className="center-line-h"></div>
            <div className="center-line-v"></div>
            <span className="axis-x" style={{left:0,paddingLeft:32}}>← Minimal</span>
            <span className="axis-x" style={{right:0,paddingRight:32,justifyContent:"flex-end"}}>Maximal →</span>
            <span className="axis-y">↑ Classic / Experimental ↓</span>

            {D.tasteProfiles.map((p: any) => (
              <button
                key={p.id}
                className={`taste-point ${p.id === activeId ? "active" : ""}`}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                onClick={() => setActiveId(p.id)}
                aria-label={p.name}
              >
                {p.id === activeId && <span className="lbl">{p.name}</span>}
              </button>
            ))}
          </div>

          <div className="taste-detail">
            <div className="td-head">
              <div>
                <span className="eyebrow" style={{marginBottom:6, display:"block"}}>Taste Profile</span>
                <h3>{active.name}</h3>
              </div>
              <a href={`/taste/${active.id}`} className="btn btn-ghost">Open Profile<span className="btn-icon"></span></a>
            </div>

            <div>
              <div className="td-row"><span className="k">Personality</span><span className="v muted">{active.personality}</span></div>
              <div className="td-row"><span className="k">Industries</span><span className="v muted">{active.industries}</span></div>
              <div className="td-row"><span className="k">Typography</span><span className="v muted">{active.type}</span></div>
              <div className="td-row"><span className="k">Photography</span><span className="v muted">{active.photo}</span></div>
              <div className="td-row"><span className="k">UI Style</span><span className="v muted">{active.ui}</span></div>
            </div>

            <div>
              <div className="td-row"><span className="k">Palette</span>
                <span className="v">
                  <div className="swatches">
                    {active.palette.map((c: string,i: number) => <span key={i} className="swatch" style={{background:c}}></span>)}
                  </div>
                </span>
              </div>
              <div className="td-row" style={{alignItems:"start"}}>
                <span className="k">Prompt</span>
                <span className="v muted" style={{fontFamily:"var(--font-mono)",fontSize:12.5,lineHeight:1.55}}>{active.prompt}</span>
              </div>
              <div className="td-row" style={{borderBottom:"none"}}>
                <span className="k">Related</span>
                <span className="v muted">
                  {D.tasteProfiles.filter((p: any) => p.id !== active.id).slice(0,3).map((p: any) => p.name).join(" · ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
