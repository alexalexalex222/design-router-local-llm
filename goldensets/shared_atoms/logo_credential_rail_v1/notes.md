# logo_credential_rail_v1

A trust / credential / award rail that auto-scrolls (marquee) and pauses
politely. Use it to display certifications, accreditations, memberships, and
award badges without claiming anything you can't back up.

## What it is
- A header (title + Pause/Play button) over a `.rail__viewport` that masks a
  flex `.rail__track`. The track holds two identical credential sets; the second
  set is `aria-hidden="true"` and exists only so the `translateX(-50%)` loop is
  seamless.
- Each credential is a chip: a bespoke inline-SVG emblem (rosette, ribbon,
  building, star, card) + a `[PLACEHOLDER]` label and sub-label.

## Pause behaviour (all four paths)
1. **Hover** — `:hover` on the viewport pauses the animation.
2. **Keyboard focus** — `:focus-within` pauses it when any control inside is
   focused, so keyboard users aren't chasing moving targets.
3. **Explicit button** — `snippet.js` toggles `.is-paused` and flips the
   button's `aria-pressed` + label/icon (Pause ⇄ Play).
4. **Reduced motion** — under `prefers-reduced-motion: reduce` the marquee is
   removed entirely; the rail becomes a static centered wrap, the edge mask is
   dropped, the duplicate set is hidden, and the (now pointless) toggle is
   hidden. This is mandatory and works with JS off.

## DATA INTEGRITY
- `[AWARD_NAME]`, `[CERTIFICATION]`, `[ACCREDITATION]`, `[MEMBERSHIP]`,
  `[RATING_TITLE]`, and their sub-labels are placeholders. **Never invent award
  names, certifying bodies, ratings, or membership IDs.** Fill them only with
  credentials you actually hold.

## How to adapt
- Edit BOTH set A and the aria-hidden set B so the loop stays seamless (the
  duplicate must match). Swap each emblem `<svg>` to suit the credential.
- Tune speed via `--marquee-duration` (default 38s — keep it slow/tasteful).
- Re-skin via the semantic roles at the top of `snippet.css` (slate + indigo).

## What NOT to do
- Do NOT fabricate credentials or use real third-party logos you're not licensed
  to display; keep the generic SVG emblems + placeholders.
- Do NOT use emoji for emblems.
- Do NOT remove the reduced-motion block or the hover/focus pause — a marquee
  that can't be stopped is an accessibility failure.
- Do NOT forget to duplicate edits across both sets, or the loop will jump.
