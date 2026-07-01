# foundation_design_tokens_v1

The base layer for the whole library. Other atoms (heroes, nav, footer, CTA band)
are written assuming tokens shaped like these exist: `--color-primary`,
`--font-display` / `--font-body`, `--space-*`, `--radius-*`, `--shadow-*`,
`--duration-*`, `--ease-*`, and the `--ring` focus token. Drop this `:root` block in
once at the top of a project and every other atom inherits a coherent system.

## What's inside
- **Neutral ramp** (`--neutral-0..900`, 8 steps) + brand/accent/feedback ramps.
- **Semantic color roles** (`--color-bg`, `--color-surface`, `--color-text`,
  `--color-primary`, `--color-focus-ring`, …). Components should read ROLES, not ramps.
- **Fluid type scale** via `clamp()` — `--text-xs … --text-display`. Body
  (`--text-base`) never drops below 16px. Plus line-height, tracking, weight tokens.
- **Spacing**: 4px base, `--space-1` (4px) … `--space-10` (96px), + container helpers.
- **Radii**: `--radius-xs … --radius-pill` (one soft, slightly rounded personality).
- **Elevation**: exactly three warm-tinted tiers `--shadow-1/2/3`, plus a reusable
  `--ring` focus token.
- **Motion**: duration tokens (`--duration-fast` 150ms … `--duration-slow` 320ms) and
  easing tokens (`--ease-standard`, `--ease-emphasis`, `--ease-exit`).
- **Z-index scale** and an optional `[data-theme="dark"]` re-skin.

## Fonts (required)
Display = **Fraunces** (optical-size serif, characterful at large sizes).
Body = **Inter**. Both load via the two `<link>` tags in `snippet.html` with
`display=swap`. Keep `--font-display` / `--font-body` as the only place type faces
are named so re-skinning is a one-line change.

## How to adapt to a target business
1. **Re-skin colors in TWO places only**: the brand/accent ramp values, then confirm
   the semantic role mappings. Leave the neutral ramp unless the brand is warm/cool-shifted.
2. **Swap fonts** by editing the Google `<link>` family list and the two font tokens.
   Match tone: serif display for editorial/established; geometric sans for modern/technical.
3. Keep spacing, radii, elevation, and motion scales as-is — they are deliberately generic
   and make unrelated atoms feel like one product.

## What NOT to do
- Don't introduce magic numbers in consuming components — add a token instead.
- Don't reference ramp steps (`--neutral-200`) directly in components when a semantic role
  (`--color-border`) exists; that's what makes re-theming safe.
- Don't ship without the font `<link>` tags — bare system fallback as the visible face
  fails the library's quality bar.
- Don't expand past 3 elevation tiers or invent one-off durations; the scale is the point.
