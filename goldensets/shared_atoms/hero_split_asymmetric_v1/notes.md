# hero_split_asymmetric_v1

An editorial above-the-fold hero with a deliberate **asymmetry**: the copy column is
~1.4× the artifact column, so the oversized headline carries the composition while a
bespoke mark anchors the right. Warm paper palette + Fraunces for an established,
crafted feel — the opposite end of the range from the full-bleed hero atom.

## Anatomy
- **Eyebrow** (`[CATEGORY_LABEL]`) with a short rule.
- **Display headline** at `--text-display` (clamp 48→96px), line-height 0.92, with an
  italic Fraunces accent word in terracotta. `text-wrap: balance` keeps line breaks tidy.
- **Lead** capped at ~46ch for readability.
- **ONE primary CTA** (arrow nudges on hover) plus a small assurance line — intentionally
  a single primary action, not a button row.
- **Bespoke inline-SVG artifact**: a layered "blueprint compass" (dashed outer ring,
  gradient ring, gradient core, ticks, a swaying needle, an orbiting node). Built from
  primitives and driven by `--art-*` tokens — **no raster, no stock box**. Marked
  `aria-hidden` on the wrapper; the SVG keeps a `<title>` for tooling.

## Motion
Rings rotate very slowly (48–60s), the needle sways, one node orbits — ambient, never
distracting. CTA lift + arrow shift are 150–220ms. The mandatory
`prefers-reduced-motion` block freezes all artifact animation and the CTA transforms.

## Fonts
Display = **Fraunces** (variable optical-size serif, `font-optical-sizing: auto`),
body = **Inter**. Loaded via `<link>` with `display=swap`.

## How to adapt
- Replace `[CATEGORY_LABEL]`, `[VALUE_PROP_SENTENCE]`, `[ASSURANCE_LINE]`, `[SERVICE_AREA]`,
  and the CTA label/href. Keep the headline to ~3–5 words per line so the display size sings.
- Recolor by editing the palette + `--art-*` tokens; the artifact recolors with the brand.
- To swap the mark, replace the SVG's inner shapes but keep the 420×420 viewBox and the
  `--art-*` token references so theming still works.

## What NOT to do
- Don't make the columns equal — the asymmetry is the design.
- Don't add a second primary CTA; downgrade extra actions to text/links.
- Don't replace the artifact with an `<img>`/stock illustration — inline SVG/CSS art only.
- Don't remove the reduced-motion fallback; ambient rotation must stop on request.
