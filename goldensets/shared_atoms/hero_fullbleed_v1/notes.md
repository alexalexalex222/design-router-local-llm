# hero_fullbleed_v1

A full-bleed hero that fills the viewport with a **layered, all-CSS/SVG background** —
no raster anywhere. Cool near-black palette + the geometric Archivo display face, chosen
to sit at the opposite end of the range from the warm serif `hero_split_asymmetric_v1`.

## How the background is built (no images)
1. A diagonal `linear-gradient` base on the section.
2. An inline SVG with a `<pattern>` grid, a radial `glow` gradient, two sweeping arc
   circles, and one pulsing node — all driven by `--grid-line` / `--glow-*` / `--accent-*`
   tokens.
3. A **scrim** (`.hero-fb__scrim`) — a left-weighted dark gradient that guarantees text
   contrast over the busy background on any width. On very narrow screens it switches to a
   top-to-bottom scrim so the offset copy still clears AA.

## Anatomy
- Pill **eyebrow**, offset-left **display headline** (`max-width: 16ch`, line-height 0.98),
  **lead**, **dual CTA** (solid primary + ghost secondary), and a `<dl>` **meta row**
  (Serving / Since / Response).

## Motion
One ambient node pulse (6s) and 150–220ms CTA lifts / arrow nudge. The mandatory
`prefers-reduced-motion` block stops the pulse and removes all hover transforms.

## Fonts
Display = **Archivo** (heavy geometric grotesque), body = **Inter**. Loaded via `<link>`
with `display=swap`.

## How to adapt
- Replace `[CATEGORY_LABEL]`, `[VALUE_PROP_SENTENCE]`, `[SERVICE_AREA]`,
  `[YEARS_IN_BUSINESS]`, `[RESPONSE_TIME]`, and the two CTA labels/hrefs.
- Recolor via the palette + art tokens; the grid, glow, and arcs all follow. For a light
  variant, raise the bg tokens and lower the scrim opacity (re-check contrast).
- Pair above `nav_sticky_header_v1`; the dark hero reads well under a translucent header.

## What NOT to do
- Don't drop the scrim — the headline can lose contrast over the grid/arcs without it.
- Don't swap the SVG/CSS background for a photo or stock texture; this atom is the
  reference for doing rich backgrounds without raster assets.
- Don't let the headline exceed ~16ch; it's meant to stay punchy and offset.
- Don't remove the reduced-motion fallback.
