# feature_split_alternating_v1

Alternating text/visual feature rows. Use this when a page needs to explain
3 (or more) distinct capabilities with a visual rhythm rather than a flat card
grid. The image side flips each row (`.feat-row--flip`) so the eye zig-zags down
the page.

## What it is
- A section header (kicker + display headline + lead).
- N `.feat-row` blocks. Each = a copy column (index, heading, body, two
  proof points, a sliding-arrow link) + a `.feat-row__visual` containing a
  **bespoke inline SVG**. Default rows put the visual right; add
  `.feat-row--flip` to put it left.
- Three included SVGs are deliberately different artifacts: a routing/node map,
  stacked progress bars, and a concentric coverage shield. That variety is the
  point — see "What NOT to do".

## How to adapt to a target business
- Replace `[FEATURE_*_TITLE]`, body copy, and `[FEATURE_*_POINT_*]` with real,
  specific claims (outcomes, not adjectives).
- Re-skin by editing only the semantic roles + the `--c-art-*` palette at the
  top of `snippet.css`. The art picks those tokens up automatically.
- Add or remove rows freely; just alternate `.feat-row--flip` to keep the zig-zag.
- Point each `.feat-row__link` href at the relevant deep-dive/section.

## What NOT to do
- Do NOT recycle one SVG across every row. Each row should get its own bespoke
  diagram that illustrates *that* feature. Reusing a single shape reads as
  filler and defeats the atom.
- Do NOT swap the SVGs for stock photos or icon-font glyphs / emoji.
- Do NOT drop the `--flip` alternation and stack everything image-left; the
  rhythm is what makes it feel editorial.
- Keep the reduced-motion block — the arrow slide and card lift must freeze.
