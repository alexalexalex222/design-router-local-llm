# comparison_table_v1

A responsive feature comparison table with a sticky header row and a pinned
feature column, plus one highlighted ("most chosen") plan column.

## What it is
- A real semantic `<table>`: `<caption>`, `scope="col"` headers, `scope="row"`
  feature names, `<colgroup>` for column widths.
- The header row is `position: sticky; top: 0` so it stays visible while the
  page scrolls. The feature column (`.cmp__rowhead`, `.cmp__th--feature`) is
  `position: sticky; left: 0` so it stays visible while the table scrolls
  sideways.
- Yes/no cells use **inline SVG** check / dash marks (each with a `<title>` and
  `aria-label` so they're announced) — never emoji.
- Text-value cells use `[VALUE]` placeholders.

## Responsive behaviour
- The table has a `min-width` and lives inside `.cmp__scroll`, a focusable
  `role="region"`. On mobile it scrolls horizontally rather than squashing;
  the feature column stays pinned and a "scroll sideways" hint appears.
- The scroll region is `tabindex="0"` so keyboard users can scroll it.
- No horizontal page overflow at 360/375px — the overflow is contained to the
  region.

## How to adapt
- Fill `[TIER_*_NAME]`, `[FEATURE_ROW_*]`, and either a `[VALUE]` or a yes/no
  SVG per cell. To mark a cell "not included", use the `--no` dash SVG; for
  "included", the `--yes` check SVG.
- The middle column is featured (`--featured` on its `<th>`/`<td>`s). Move the
  highlight by shifting those classes and the `cmp__col-featured` col.
- Re-skin via the semantic roles at the top of `snippet.css` (paper + green).

## What NOT to do
- Do NOT replace the SVG marks with ✓/✗ emoji — they render inconsistently and
  fail the no-emoji rule.
- Do NOT drop the sticky header / pinned column; they're the usability point of
  a long comparison.
- Keep the caption and `scope` attributes — they make the table screen-reader
  navigable.
