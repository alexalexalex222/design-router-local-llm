# nav_sticky_header_v1

A sticky top header for marketing/local-service sites: brand lockup, primary nav,
one CTA, and a mobile toggle that reveals a panel below the bar.

## Why it's built this way
- **Reserves its height.** The bar is `position: sticky` and the page accounts for
  `--header-h`, so content is never hidden underneath it. Anchored sections use
  `scroll-margin-top: calc(var(--header-h) + ...)` so `#anchor` jumps land *below* the bar
  instead of behind it — a detail weak models routinely miss.
- **Elevation on scroll.** `snippet.js` flips `data-elevated="true"` past 4px of scroll;
  CSS fades in a hairline border + `--shadow-2`. Throttled with `requestAnimationFrame`.
- **Skip link** first in the DOM for keyboard/AT users.
- **Full keyboard + focus.** Every interactive has a visible two-color `:focus-visible`
  ring. Esc closes the mobile panel and returns focus to the toggle.
- **Mobile toggle** uses `aria-expanded` + `aria-controls`, swaps its `aria-label`
  (Open/Close menu), and animates into an X using transforms only.

## Fonts
Display = **Space Grotesk** (brand wordmark), body/links = **Inter**. Loaded via the
`<link>` tags in `snippet.html` with `display=swap`.

## How to adapt
- Replace `[BUSINESS_NAME]` and the inline-SVG `.brand__mark` with the real mark
  (keep it inline SVG — no raster logo).
- Edit the four nav links and the CTA label/href. For phone-priority businesses, change
  the CTA to a `tel:` action ("Call now").
- Tune `--header-h` if the brand row needs more room; the anchor offset follows automatically.
- Re-skin by pointing the local `:root` at your project tokens
  (see `foundation_design_tokens_v1`), or edit the color roles in place.

## What NOT to do
- Don't drop `scroll-margin-top` — anchored sections will hide under the sticky bar.
- Don't make the toggle a `<div>`; it must stay a `<button>` for keyboard + AT.
- Don't remove the reduced-motion block; the underline sweep, CTA lift, and smooth scroll
  must all no-op when the user opts out.
- This atom only opens a simple panel. For a focus-trapped slide-in drawer with scroll-lock,
  compose with `nav_mobile_drawer_v1` instead.
