const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Replace metadata & title
html = html.replace(/<!-- Made in Framer · framer\.com ✨ -->/g, '<!-- Navrine Atlas — Visual Culture Catalog -->');
html = html.replace(/<title>My Framer Site<\/title>/g, '<title>Navrine Atlas — Trend, Aesthetic, Design Concept &amp; Visual Culture Catalog<\/title>');
html = html.replace(/<meta name="generator" content="Framer [^"]*">/g, '<meta name="generator" content="Navrine Studio">');
html = html.replace(/<meta name="description" content="Made with Framer">/g, '<meta name="description" content="The visual culture catalog for trends, aesthetics, design concepts, and creative direction. Built by Navrine Studio for designers, founders, and cultural builders.">');
html = html.replace(/<meta property="og:title" content="My Framer Site">/g, '<meta property="og:title" content="Navrine Atlas — Visual Culture Catalog">');
html = html.replace(/<meta property="og:description" content="Made with Framer">/g, '<meta property="og:description" content="The visual culture catalog for trends, aesthetics, design concepts, and creative direction.">');
html = html.replace(/<meta name="twitter:title" content="My Framer Site">/g, '<meta name="twitter:title" content="Navrine Atlas — Visual Culture Catalog">');
html = html.replace(/<meta name="twitter:description" content="Made with Framer">/g, '<meta name="twitter:description" content="Read the signals. Build the taste. Design the future.">');
html = html.replace(/https:\/\/navrineatlas\.framer\.website\//g, 'https://navrine-atlas.vercel.app/');

// Replace Framer footer badge link and title text
html = html.replace(/href="https:\/\/www\.framer\.com"/g, 'href="https://navrine-atlas.vercel.app/"');
html = html.replace(/title="Create a free website with Framer, the website builder loved by startups, designers and agencies\."/g, 'title="Navrine Atlas — Visual Culture Catalog"');
html = html.replace(/Create a free website with Framer, the website builder loved by startups, designers and agencies\./g, 'Navrine Atlas — The Visual Culture Catalog by Navrine Studio.');

// Add CSS to completely hide badge container
const hideCss = `<style>
#__framer-badge-container, .__framer-badge {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
  width: 0 !important;
  height: 0 !important;
  overflow: hidden !important;
}
</style>
</head>`;

if (!html.includes('#__framer-badge-container')) {
  html = html.replace('</head>', hideCss);
} else {
  html = html.replace('</head>', hideCss);
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully cleaned production/index.html!');
