# cta_conversion_band_v1

A conversion band for the spot just above the footer (or between content sections): a
strong value headline carries the left, the actions sit compact on the right. Deep teal
panel + warm amber primary, Sora display — a confident, finishing-move tone.

## Anatomy & why
- **Asymmetric grid** (`1.55fr auto`): the message dominates, the actions stay tight.
  Stacks to one column under 760px with full-width buttons.
- **Eyebrow → headline → supporting line.** Headline at `--text-xl`, `text-wrap: balance`,
  capped at ~22ch so it stays a punchy line or two.
- **Primary + secondary action.** Primary = amber "Book a visit" (arrow nudges on hover);
  secondary = a ghost `tel:` "Call [PHONE]" for phone-priority businesses. Clear single
  primary; the secondary is visibly lower-emphasis.
- **Bespoke corner arcs** (inline SVG, token-colored, decorative) instead of any raster.

## The one tasteful motion
A soft diagonal **sheen** sweeps across the panel on `:hover` / `:focus-within`
(`::after`, transform-only, 600ms) — premium without being noisy. The mandatory
`prefers-reduced-motion` block parks the sheen off-screen and removes the button lift/
arrow shift.

## Fonts
Display = **Sora**, body = **Inter**. Loaded via `<link>` with `display=swap`.

## How to adapt
- Replace `[CONTEXT_LABEL]`, `[TIMEFRAME]`, `[SUPPORTING_LINE]`, `[PHONE]`, and
  `tel:[PHONE_E164]` (E.164: `tel:+1...`). Keep the headline outcome-specific and concrete.
- If the business isn't phone-led, swap the secondary to a second link (e.g. "See pricing")
  — keep it visually secondary to the primary.
- Recolor via the palette + `--cta-accent-*` tokens; the arcs and sheen follow.

## What NOT to do
- Don't make both buttons primary-weight; the hierarchy is the point.
- Don't fabricate urgency ("only 2 slots left") — keep `[TIMEFRAME]`/`[SUPPORTING_LINE]`
  truthful placeholders.
- Don't replace the SVG arcs with a stock graphic.
- Don't ship without the reduced-motion fallback; the sheen must not loop or fire when
  motion is reduced.
