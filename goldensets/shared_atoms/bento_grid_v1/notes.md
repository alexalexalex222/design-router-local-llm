# bento_grid_v1

A bento-style feature grid: cells of varied sizes packed into a 4-column grid,
with ONE prominent feature cell (a 2x2 inverted ink panel) anchoring the
composition. Use it when you want a feature/capability overview that feels
designed rather than a row of identical cards.

## What it is
- 4-column CSS grid with `grid-auto-flow: dense` so mixed spans pack tightly.
- Cell span modifiers: `--feature` (2x2, the hero cell), `--wide` (2x1),
  `--tall` (1x2), and base (1x1). `--accent` tints a cell amber and can host a
  `[STAT_VALUE]` / `[STAT_LABEL]` metric.
- Each cell has a small bespoke inline-SVG glyph in a rounded chip (no emoji).
- Only the feature cell has a CTA button; everything else is informational.

## How to adapt to a target business
- Put the single most important claim in `.bento-cell--feature` and fill
  `[FEATURE_HEADLINE]`. Distribute remaining capabilities across the other cells.
- Re-skin via the semantic roles at the top of `snippet.css` (charcoal/amber by
  default). The glyph chips and accents follow `--color-accent`.
- Adjust the mix of spans to balance the board, but keep exactly ONE
  `--feature` cell — two prominent cells reads as indecision.
- Replace each glyph `<svg>` with one that fits the cell's topic.

## States
- Cells lift on hover; the feature CTA has hover + visible `:focus-visible` ring.

## What NOT to do
- Do NOT make every cell the same size — uniform spans defeat the bento idea.
- Do NOT promote multiple cells to `--feature`; the hierarchy needs one anchor.
- Do NOT use emoji or icon-font glyphs; keep the inline SVGs.
- Keep the reduced-motion block so hover lifts and CTA slides freeze.
- On mobile everything is a single column by design — don't force multi-column
  at 360/375px or cells overflow.
