const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const injection = `
<script>
(function() {
  function fixMeta() {
    document.title = 'atlas';
    const icons = document.querySelectorAll("link[rel*='icon']");
    icons.forEach(i => i.remove());
  }
  fixMeta();
  const observer = new MutationObserver(fixMeta);
  observer.observe(document.head, { childList: true, subtree: true, characterData: true });
})();
</script>
</body>
`;

html = html.replace('</body>', injection);
fs.writeFileSync('public/index.html', html);
console.log('Injected mutation observer');
