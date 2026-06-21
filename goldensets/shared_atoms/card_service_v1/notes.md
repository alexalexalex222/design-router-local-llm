# card_service_v1

A premium, whole-card-clickable service card — built the **accessible** way.
The trap weak models fall into is `<div onclick>` cards; this models the correct
"stretched link" pattern instead.

## Why this is the reference
- **Whole card clickable WITHOUT a div-onclick.** The heading holds a real
  `<a>`. A `::after { position:absolute; inset:0 }` on that link stretches its
  hit area to fill the whole card. One real link, full-card target, no script
  required, fully keyboard/AT-navigable.
- **Focus is shown on the card, not just the link.** The `<a>` receives focus
  (its own outline removed); `.svc-card:focus-within` paints the ring on the
  whole card so the focus indicator matches the click surface.
- **Hover lift + shadow** at 200ms (transform + box-shadow only), with an icon
  tint/scale and an arrow-nudge on the "Learn more" cue. All reduced-motion
  guarded.
- **Bespoke inline SVG icons** with `<title>` for meaning; the icon wrapper is
  `aria-hidden` because the heading already names the service.
- **`snippet.js` is optional** — only suppresses navigation when the user is
  selecting text. The card works fully without it.

## How to adapt
- Duplicate `.svc-card` per service; point each heading `<a href>` at the real
  destination and swap the SVG.
- Swap copy. The "Learn more" cue is decorative (`aria-hidden`) so it doesn't
  double-announce the link — keep it that way.
- Grid is 3 → 2 → 1 columns; adjust `grid-template-columns` for other counts.

## What NOT to do
- Don't put `onclick` on the `<li>`/card div — it's not focusable or announced.
- Don't add a second real link inside the card (e.g. make the cue a link too):
  two overlapping links inside one stretched-link card create ambiguous targets.
  Keep exactly one real `<a>`.
- Don't drop `:focus-within` — without it keyboard users can't see focus.

## Files
- `snippet.html` — 3-card grid, each with SVG icon + heading link + cue
- `snippet.css` — token block (Sora + Inter) + stretched link + hover/focus
- `snippet.js` — optional text-selection guard (enhancement only)
