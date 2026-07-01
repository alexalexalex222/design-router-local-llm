# gallery_filter_v1

A responsive gallery with category filtering. The reference for "filterable
grid" — modelling accessible toggle chips, no-raster art, and a real empty
state (the case weak models forget entirely).

## Why this is the reference
- **Filter chips are accessible toggle buttons.** Each chip is a real
  `<button>` with `aria-pressed`, inside a `role="group"` that names the control
  set. The pressed chip is the active filter; CSS styles off
  `[aria-pressed="true"]`. No `<div>` "buttons", no link-as-filter.
- **Result count is announced.** A `role="status"` live region says "Showing N
  projects in <category>" after each change, so screen-reader users know the
  grid updated.
- **Tiles are bespoke SVG/CSS art** driven by tile-palette tokens
  (`--t-bg-*`, `--t-accent-*`, `--t-line`). No raster, no stock imagery.
- **Graceful empty state.** If a filter matches nothing, a dashed-border empty
  panel appears with a "Show all work" reset. With the seed data every filter
  has results, so it's a safety net for when categories are emptied later.
- **Progressive enhancement:** with JS off, all chips + every tile show and the
  empty state stays hidden — nothing is hidden behind script.

## How to adapt
- Add tiles as `<li class="tile" data-category="...">`; the categories just need
  to match a chip's `data-filter`. Update the chip `__count` numbers.
- Replace `[PROJECT_TITLE]`, `[CLIENT_TYPE]`, `[YEAR]` with real values, and
  swap the SVG art for real case-study art (keep it vector, or use `<img>` with
  real `alt` if you must).
- Want multi-select filters? Switch from single-select to independent toggles
  and OR the matches — keep `aria-pressed` per chip.

## What NOT to do
- Don't use `<div onclick>` chips or anchor links as filters.
- Don't drop the empty state — a filter that hides everything with no message is
  a dead end.
- Don't fabricate client names or project results; keep placeholders.

## Files
- `snippet.html` — chip group, 6 SVG-art tiles, empty state
- `snippet.css` — token block (Space Grotesk + Inter) + chips + tiles + empty
- `snippet.js` — single-select filtering, live count, empty-state toggle
