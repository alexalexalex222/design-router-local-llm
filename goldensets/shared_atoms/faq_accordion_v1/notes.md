# faq_accordion_v1

An accessible disclosure accordion. The reference for "show/hide" content done
the right way — real buttons, real ARIA wiring, and a height transition that
does not fight the accessibility tree.

## Why this is the reference
- **Headers are real `<button>`s inside headings.** Each `<h3>` wraps a
  `<button aria-expanded aria-controls>`. The panel is `role="region"` with
  `aria-labelledby` pointing back at its button. This is the WAI-ARIA disclosure
  pattern — not a `<div onclick>`.
- **Smooth height with no magic numbers.** The panel uses animated
  `grid-template-rows: 0fr → 1fr` with an `overflow:hidden; min-height:0` inner
  wrapper. No `max-height` guessing, no JS height measurement. Copy this — it's
  the cleanest pure-CSS expand.
- **Collapses instantly under reduced-motion.** The JS checks
  `prefers-reduced-motion` and skips the transition timing (no `requestAnimation
  Frame` defer, applies `[hidden]` immediately).
- **Keyboard operable beyond Tab:** ArrowUp/ArrowDown move between headers,
  Home/End jump to first/last.
- **Progressive enhancement:** with JS off, panels are visible and readable —
  the script adds `[hidden]` on init, so no-JS users lose nothing.

## How to adapt
- Duplicate an `.accordion__item` per question; keep the id wiring unique
  (`faq-qN` button ↔ `faq-pN` panel, with matching `aria-controls` /
  `aria-labelledby`).
- Swap copy. Replace `[RESPONSE_WINDOW]`, `[LOW_RANGE]` with real values.
- Want single-select (only one open)? Close others inside the click handler —
  but independent toggling is the friendlier default.

## What NOT to do
- Don't use a `<div onclick>` header — it isn't focusable or announced.
- Don't animate `height: auto` (it doesn't transition); use the grid-rows trick.
- Don't forget the reduced-motion branch.

## Files
- `snippet.html` — heading+button triggers, region panels
- `snippet.css` — token block (Fraunces + Inter) + grid-rows expand
- `snippet.js` — toggle, ARIA sync, arrow-key roving, reduced-motion handling
