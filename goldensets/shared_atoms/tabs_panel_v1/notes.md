# tabs_panel_v1

WAI-ARIA tabs done correctly. The reference for tabbed content — the part weak
models reliably get wrong is keyboard interaction and roving tabindex, so that's
modelled explicitly here.

## Why this is the reference
- **Correct roles + relationships:** `role="tablist"` wraps `role="tab"`
  buttons, each linked to its `role="tabpanel"` via `aria-controls` /
  `aria-labelledby`. The selected tab has `aria-selected="true"`.
- **Roving tabindex (the key detail):** only the active tab has `tabindex="0"`;
  the others are `-1`. So Tab enters the tablist once, then **arrow keys** move
  between tabs — exactly the Authoring-Practices pattern. ArrowLeft/Right
  (and Up/Down) wrap; Home/End jump to ends.
- **Automatic activation:** selection follows focus (cheap panels), so arrowing
  also switches the panel. Each panel is `tabindex="0"` so it's focusable.
- **Sliding indicator** is positioned by JS via custom properties and animates
  transform/width only; it re-measures on resize and after web-fonts load.
- **Progressive enhancement:** with JS off, all panels are visible stacked, so
  content is never trapped.

## How to adapt
- Add a tab `<button role="tab">` + matching `<div role="tabpanel">`; keep ids
  paired (`tab-x` ↔ `panel-x`). The JS picks up any number of tabs.
- Swap copy freely. No placeholders needed here (generic engagement content);
  if you add stats/quotes, use `[STAT_VALUE]` etc.
- Prefer "manual activation" (arrow moves focus, Enter/Space selects) for
  expensive panels: don't switch panels in the keydown handler, only on click.

## What NOT to do
- Don't give every tab `tabindex="0"` — that breaks the roving pattern and makes
  users Tab through all tabs.
- Don't use `<div>`s as tabs; they won't be announced as tabs or be operable.
- Don't animate the indicator without the reduced-motion fallback.

## Files
- `snippet.html` — tablist + 3 tabs + 3 panels
- `snippet.css` — token block (Manrope + Inter) + sliding indicator + panels
- `snippet.js` — roving tabindex, arrow/Home/End, selection, indicator tracking
