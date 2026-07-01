# process_timeline_v1

A numbered start→finish process timeline. Horizontal on desktop (a row of
numbered nodes joined by a connective line), vertical on mobile (a left rail
with the line running down through the node centers).

## What it is
- An ordered `<ol>` of `.proc-step` items — correct semantics for a sequence.
- Each step: a numbered teal `.proc-step__node` with a small bespoke inline-SVG
  glyph badge, plus a body (phase label, title, short text).
- First/last steps get `--start` / `--finish` modifiers for the phase labels.
- The connective line is a CSS pseudo-element per step (`::before`); it's
  horizontal on desktop and vertical on mobile, and the last step omits it so
  the line stops at "Finish".

## How to adapt
- Replace `[STEP_*_TITLE]` and the descriptions with the real stages of your
  engagement. Keep them in DOM order — the line implies sequence.
- 4 steps is the default; add/remove `<li>`s and the grid + line adapt. For 3
  or 5 steps just change the desktop `grid-template-columns` count.
- Swap each glyph `<svg>` for one that matches the step.
- Re-skin via the semantic roles at the top of `snippet.css` (slate + teal).

## Responsive
- Desktop: `repeat(4, 1fr)` row, line through node centers.
- ≤760px: single column, nodes on a left rail, vertical line.
- ≤380px: node size shrinks via the `--node-size` token so nothing overflows
  at 360px.

## What NOT to do
- Do NOT reorder steps for visual balance — sequence is the meaning.
- Do NOT drop the `:last-child` rule that removes the trailing line; without it
  a line dangles past the final node.
- Do NOT use emoji for the step glyphs; keep the inline SVGs.
- Keep the reduced-motion block so the node hover scale freezes.
