'use client';
import { useState } from 'react';

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", category:"Aesthetic", title:"", desc:"", source:"", tags:"" });
  const upd = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  const handle = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <section id="submit">
      <div className="shell">
        <div className="submit-wrap">
          <div className="submit-info">
            <span className="eyebrow" style={{marginBottom:18, display:"block"}}>Submit to the Atlas</span>
            <h2 className="section-title">Spotted a <em>signal</em>?</h2>
            <p>Submit a trend, aesthetic, photography style, prompt, viral pattern, or asset idea. Editors review every entry. Accepted submissions get a public credit and a permanent Atlas page.</p>
            <ul className="info-list">
              <li><span className="ix">01</span><span className="it">Trend &amp; aesthetic submissions</span></li>
              <li><span className="ix">02</span><span className="it">Photography &amp; visual references</span></li>
              <li><span className="ix">03</span><span className="it">Brand concepts &amp; design systems</span></li>
              <li><span className="ix">04</span><span className="it">Viral content patterns</span></li>
              <li><span className="ix">05</span><span className="it">Prompts &amp; asset packs</span></li>
            </ul>
          </div>

          <form className="submit-form" onSubmit={handle}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="sf-name">Name</label>
                <input id="sf-name" value={form.name} onChange={upd("name")} placeholder="Your name" />
              </div>
              <div className="form-field">
                <label htmlFor="sf-email">Email</label>
                <input id="sf-email" type="email" value={form.email} onChange={upd("email")} placeholder="you@studio.com" />
              </div>
              <div className="form-field">
                <label htmlFor="sf-cat">Category</label>
                <select id="sf-cat" value={form.category} onChange={upd("category")}>
                  <option>Aesthetic</option>
                  <option>Trend</option>
                  <option>Photography Style</option>
                  <option>Brand Concept</option>
                  <option>Viral Pattern</option>
                  <option>Prompt</option>
                  <option>Asset</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="sf-title">Title</label>
                <input id="sf-title" value={form.title} onChange={upd("title")} placeholder="e.g. Notes App Manifesto" />
              </div>
              <div className="form-field full">
                <label htmlFor="sf-desc">Description</label>
                <textarea id="sf-desc" value={form.desc} onChange={upd("desc")} placeholder="Why is this rising? Where have you seen it? Who is it for?"></textarea>
              </div>
              <div className="form-field">
                <label htmlFor="sf-src">Source / reference</label>
                <input id="sf-src" value={form.source} onChange={upd("source")} placeholder="URL or @handle" />
              </div>
              <div className="form-field">
                <label htmlFor="sf-tags">Tags</label>
                <input id="sf-tags" value={form.tags} onChange={upd("tags")} placeholder="comma, separated, tags" />
              </div>
              <div className="form-field full">
                <label>Upload reference</label>
                <div className="upload">Drop image / reference · or click to browse</div>
              </div>
            </div>

            <div className="form-submit">
              <span className="agreement">By submitting you agree to the Atlas editorial guidelines.</span>
              <button type="submit" className="btn btn-primary">
                {submitted ? "Received ✓" : "Submit signal"}
                <span className="btn-icon"></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
