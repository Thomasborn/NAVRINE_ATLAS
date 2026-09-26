import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <div className="shell">
        <div className="mega-mark">Atlas <em>by Navrine</em></div>
      </div>
      <footer className="footer">
        <div className="shell">
          <div className="footer-top">
            <div className="footer-brand">
              <p>The visual culture catalog for trends, aesthetics, design concepts, and creative direction. Built by Navrine Studio for designers, founders, and cultural builders.</p>
              <Link href="/studio" className="btn btn-ghost">Build with Navrine Studio<span className="btn-icon"></span></Link>
            </div>

            <div className="footer-col">
              <h4>Atlas</h4>
              <ul>
                <li><Link href="/trends">Trends</Link></li>
                <li><Link href="/aesthetics">Aesthetics</Link></li>
                <li><Link href="/design-concepts">Design Concepts</Link></li>
                <li><Link href="/taste">Taste Index</Link></li>
                <li><Link href="/photography">Photography</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Library</h4>
              <ul>
                <li><Link href="/viral-signals">Viral Signals</Link></li>
                <li><Link href="/color-palettes">Color Palettes</Link></li>
                <li><Link href="/typography">Typography</Link></li>
                <li><Link href="/prompts">Prompts</Link></li>
                <li><Link href="/assets">Assets</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Editorial</h4>
              <ul>
                <li><Link href="/journal">The Journal</Link></li>
                <li><Link href="/journal">Field Notes</Link></li>
                <li><Link href="/journal">Playbooks</Link></li>
                <li><Link href="/submit">Submit Signal</Link></li>
                <li><a href="mailto:hello@navrine.space?subject=Subscribe%20to%20the%20Navrine%20Atlas%20newsletter">Newsletter</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Studio</h4>
              <ul>
                <li><Link href="/studio">Navrine Studio</Link></li>
                <li><Link href="/studio">Case Studies</Link></li>
                <li><Link href="/studio">Hire Us</Link></li>
                <li><a href="mailto:hello@navrine.space?subject=Press%20enquiry">Press</a></li>
                <li><a href="mailto:hello@navrine.space">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bot">
            <div>© {new Date().getFullYear()} Navrine Atlas · atlas.navrine.space</div>
            <div className="legal">
              <Link href="/about">Terms</Link>
              <Link href="/about">Privacy</Link>
              <a href="/rss.xml">RSS</a>
              <a href="/sitemap.xml">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
