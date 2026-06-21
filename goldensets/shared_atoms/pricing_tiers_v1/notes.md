# pricing_tiers_v1

Three pricing tiers with one featured (raised) plan and an accessible
monthly/annual billing toggle.

## What it is
- A centered header with a billing **switch** (`role="switch"`, `aria-checked`,
  labelled by both visible options).
- A 3-column tier grid. The middle tier is `.tier--featured`: an ink panel that
  lifts above the row and carries a "Most chosen" badge.
- Each tier: name, tagline, price, billed note, CTA, and a checkmark feature
  list. The featured CTA is the primary (filled) button.

## DATA INTEGRITY
- Prices are `[PRICE]` placeholders. The toggle swaps the visible amount between
  `data-price-monthly` and `data-price-annual` — **you supply both numbers**.
  The script never computes a discount; if you don't set annual prices, fill the
  same placeholder so nothing fake appears.
- `[SAVE_PERCENT]` and `[PRICING_FOOTNOTE]` are placeholders too.

## Accessibility / keyboard
- The switch is a `<button>`, so Tab focuses it and Enter/Space activate it
  (Space's page-scroll is suppressed). `aria-checked` flips true/false.
- Touch target ≥44px (the visual track is small but padded out to 44px).
- Every CTA and the switch have a visible `:focus-visible` ring.
- Default static state is monthly (`aria-checked="false"`, "Monthly" active), so
  the page is correct even before JS runs.

## How to adapt
- Fill `[TIER_*_NAME]`, audiences, features, and BOTH price attributes per tier.
- Keep exactly one `.tier--featured`. On mobile it reorders to the top.
- Re-skin via the semantic roles at the top of `snippet.css` (indigo/violet).

## What NOT to do
- Do NOT hard-code a fake "annual saves X%": compute the real number or leave
  the placeholder.
- Do NOT make the switch a bare `<div>`; it must be a real focusable control.
- Keep the reduced-motion block — the thumb slide and card lifts must freeze.
