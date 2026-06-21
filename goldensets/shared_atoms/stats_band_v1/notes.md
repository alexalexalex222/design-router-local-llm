# stats_band_v1

A proof/stat ribbon — a horizontal band of headline metrics on a dark editorial
ground, with an optional count-up that fires when the band scrolls into view.

## What it is
- A `<dl>` of 4 stats; each is a big `.stat__value` with a small uppercase
  `.stat__label`. A headline sits above and a source note sits below.
- `snippet.js` adds a count-up via **IntersectionObserver**, plus an accent
  underline that grows when the value lands.

## DATA INTEGRITY (the important part)
- **Never fabricate numbers.** The markup ships with `[STAT_VALUE]` /
  `[STAT_LABEL]` placeholders and an explicit `[STATS_SOURCE_NOTE]`.
- The visible text is whatever is in the element. The animation only runs when
  you put a REAL number in `data-count-to` (digits, optional decimal). With JS
  off, or no `data-count-to`, the placeholder/static value shows as-is — so the
  band is honest in every state.
- Use `data-prefix` (e.g. `$`) and `data-suffix` (e.g. `%`, `k`, `+`) for symbols
  so the tween animates only the numeral.
- Always fill `[STATS_SOURCE_NOTE]` with where the figures come from.

## How to adapt
- Set each stat: `data-count-to="1240" data-suffix="+"` and replace the inner
  placeholder text with the same final value (fallback for no-JS).
- Re-skin via the semantic roles at the top of `snippet.css` (ink + sage by
  default). It's designed as a dark band; for a light section, remap
  `--color-band`, `--color-text`, `--color-value`.
- Add/remove stats by editing the grid; the dividers re-flow at each breakpoint.

## Motion / reduced-motion
- Count-up read window is ~1.1s (a reveal, not interaction feedback). All CSS
  *interaction* transitions stay in the 150–250ms band.
- Under `prefers-reduced-motion: reduce` (or no IntersectionObserver), the JS
  writes the final number instantly and the underline is shown without
  transition — **no count-up at all**. This is mandatory.

## What NOT to do
- Do NOT hard-code impressive-looking fake stats. If you don't have the number,
  leave the placeholder.
- Do NOT animate width/height/top for the count — only text + the CSS underline
  (transform).
