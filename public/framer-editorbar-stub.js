// Stands in for https://framer.com/edit/init.mjs (via the import map in index.html).
// Framer's runtime imports its on-page editor bar for every visitor; this site isn't
// hosted on Framer, so the bar can't work here and only costs a module, chunks and an iframe.
export function createEditorBar() {
  return function EditorBar() {
    return null;
  };
}
