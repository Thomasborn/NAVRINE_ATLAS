const fs = require('fs');
const path = require('path');

const targetDir = 'd:/digital product/SASS/farm/desktop/farm';
const appJsPath = path.join(targetDir, 'src/app.js');
const aestheticsJsPath = path.join(targetDir, 'src/pages/aesthetics.js');

const aestheticsJs = `export function render(S, changePage) {
  const images = [
    'aesthetic_brutalism_1789271423426.jpg',
    'aesthetic_surrealism_1789271612723.jpg',
    'aesthetic_neo_brutalism_1789271637978.jpg',
    'aesthetic_neo_classical_1789271650868.jpg',
    'aesthetic_neumorphism_1789271660290.jpg',
    'aesthetic_scrapbook_1789271671362.jpg',
    'aesthetic_glassmorphism_1789271682288.jpg',
    'aesthetic_claymorphism_1789271704093.jpg',
    'aesthetic_bento_grid_1789271717214.jpg',
    'aesthetic_pixel_art_1789271731412.jpg',
    'aesthetic_minimalism_1789271312197.jpg',
    'aesthetic_maximalism_1789271333746.jpg',
    'aesthetic_swiss_design_1789271346596.jpg'
  ];

  let html = \`<div class="card p-6" style="margin: 20px; background: white; border-radius: 8px;">\`;
  html += \`<h2 class="text-2xl font-bold mb-4">Aesthetic References</h2>\`;
  html += \`<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem;">\`;

  for (const img of images) {
    html += \`<div style="border: 1px solid #eee; padding: 0.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">\`;
    html += \`<img src="./src/assets/aesthetics/\${img}" style="width: 100%; height: auto; border-radius: 4px; display: block;" />\`;
    html += \`<p style="text-align: center; margin-top: 0.5rem; font-size: 0.9rem; font-weight: 500; text-transform: capitalize;">\${img.split('_').slice(1, -1).join(' ')}</p>\`;
    html += \`</div>\`;
  }

  html += \`</div></div>\`;
  return html;
}
`;

fs.writeFileSync(aestheticsJsPath, aestheticsJs);

let appJs = fs.readFileSync(appJsPath, 'utf8');

if (!appJs.includes('aestheticsPage')) {
  appJs = appJs.replace(
    "import * as settingsPage from './pages/settings.js';",
    "import * as settingsPage from './pages/settings.js';\nimport * as aestheticsPage from './pages/aesthetics.js';"
  );

  appJs = appJs.replace(
    "  ['settings', 'Pengaturan',",
    "  ['aesthetics', 'Aesthetics', '<svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M2 22l5-5 5 5 10-10V2H12l-5 5-5-5v10z\"/></svg>'],\n  ['settings', 'Pengaturan',"
  );

  appJs = appJs.replace(
    "  settings: settingsPage",
    "  settings: settingsPage,\n  aesthetics: aestheticsPage"
  );

  fs.writeFileSync(appJsPath, appJs);
  console.log('Successfully injected Aesthetics page.');
} else {
  console.log('Aesthetics page already injected.');
}
