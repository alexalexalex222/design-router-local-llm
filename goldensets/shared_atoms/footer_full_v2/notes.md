# footer_full_v2

A premium site footer — deliberately **richer than `footer_full_v1`** (which is a single
3-column row with no form, no states, no back-to-top). This v2 adds a brand + newsletter
top band, four columns, a structured contact block, a legal/microcopy bar, and a
back-to-top control. Deep ink palette + Bricolage Grotesque for an established feel.

## What's new vs v1
- **Newsletter** with a labelled email input and full async **states**: idle, loading
  (spinner + disabled), error (invalid email or server failure), success.
- **Four columns**: Services / Company / Resources + a semantic `<address>` contact block
  with `tel:` and `mailto:` links and inline-SVG icons.
- **Legal/microcopy row**: copyright (auto-year), Privacy/Terms, and a `[LICENSE_LINE]`
  slot (e.g. license #, common for trades).
- **Back-to-top** button (smooth scroll, moves focus to `#top`).

## Accessibility & states
- Each column is a landmark (`<nav aria-labelledby>` / `<address>`), headings are real `<h2>`.
- Newsletter input has a real `<label>`, `type="email"`, `autocomplete`, and toggles
  `aria-invalid` on bad input; the status message is an `aria-live="polite"` `role="status"`.
- Every interactive has a visible two-color `:focus-visible` ring and a ≥44px target
  (≥36px for dense in-list text links, expanded to 44px on the actionable controls).

## JS (optional, degrades gracefully)
`snippet.js` wires the year, back-to-top, and a **stubbed** `subscribe()` (1.1s fake
request; addresses containing "fail" simulate an error so you can see the error state).
Without JS the footer is fully usable and the form posts normally. Honors
`prefers-reduced-motion` (instant scroll, slower spinner).

## Fonts
Display = **Bricolage Grotesque** (optical-size grotesque), body = **Inter**. Loaded via
`<link>` with `display=swap`.

## How to adapt
- Replace every bracketed placeholder: `[BUSINESS_NAME]`, `[ONE_LINE_TAGLINE]`,
  `[PHONE]` + `tel:[PHONE_E164]` (E.164: `tel:+1...`), `[EMAIL]` + `mailto:[EMAIL]`,
  `[STREET_ADDRESS]`, `[CITY_STATE_ZIP]`, `[HOURS_LINE]`, `[LICENSE_LINE]`.
- Wire `subscribe()` to a real provider; keep the state transitions.
- Drop a column or rename headings to match the business; the grid reflows 4→2→1.

## What NOT to do
- Don't fabricate a license number, address, or hours — keep placeholders until real.
- Don't remove the form states; the loading/error/success trio is the reference point here.
- Don't convert `<address>`/`<nav>` to bare `<div>`s; the landmarks aid AT navigation.
- Don't drop the reduced-motion fallback.
