# Shared-Atom Candidates — Iron Circuit Fight Academy

Seven reusable atoms implemented and named in this pack's HTML/CSS. Each is a
self-contained, image-free, accessible unit suitable for promotion into
`goldensets/shared_atoms/` or for direct reuse by the router. All atoms are
proof-safe and depend only on the pack's design tokens (`:root` in
`styles.css`).

---

## 1. `class_schedule_matrix_v1`
- **Role:** Weekly class timetable as a true data table (bracket/fight-card feel)
  with color-coded discipline cells and a legend.
- **Use cases:** Gym/academy schedules, studio timetables, any
  day x time-block grid; clinic hours; tour/event grids.
- **HTML boundary:** `<section class="ic-schedule">` → focusable
  `<div class="ic-matrix" role="region" tabindex="0">` wrapping
  `<table class="ic-matrix__table">` with `<caption>` (visually hidden), `scope`
  on every `<th>`, `.ic-cell--*` spans per discipline, and a sibling
  `<ul class="ic-legend">`. Empty slots use `.ic-cell-empty` with a hidden "No
  class" label.
- **CSS boundary:** `.ic-matrix*`, `.ic-cell*`, `.ic-legend*`. Horizontal scroll
  via `overflow-x:auto` + `min-width` on the table (no overflow on the page).
- **Responsive:** table scrolls horizontally inside its region below the
  `min-width`; legend wraps. Sticky `thead` on scroll.
- **Constraints:** keep `scope` attributes and the `<caption>`; cell tint colors
  must stay AA against bone text (they are mixed against `--ic-n-800`).
- **Proof-safety:** times/disciplines are illustrative structure; pair with "ask
  about current availability" copy. No attendance numbers or class-size claims.

## 2. `program_selector_tabs_v1`
- **Role:** WAI-ARIA tablist that switches between program tracks.
- **Use cases:** Program/service selectors, plan or tier switchers, "choose your
  path" modules, category browsers.
- **HTML boundary:** `<div data-tabs>` → `[role="tablist"]` of
  `<button role="tab" aria-selected aria-controls tabindex>` → sibling
  `[role="tabpanel"]` panels (`hidden` when inactive, `aria-labelledby` back to
  the tab).
- **CSS boundary:** `.ic-tabs*`, `.ic-prog*`. Active tab uses
  `inset 0 -3px 0 accent` underline + copper border.
- **Behavior (script.js):** click select, roving focus with
  Arrow/Home/End, single-select; panels toggle `hidden`. Degrades to first panel
  visible with JS off (others stay `hidden` but tabs remain real buttons — adapt
  to show-all if no-JS support is required).
- **Responsive:** tabs `flex: 1 1 160px`; collapse to full-width stacked under
  520px; panel grid (`.ic-prog`) goes single-column under 1024px.
- **Constraints:** keep the id wiring unique (`tab-x` ↔ `panel-x`); preserve
  `tabindex="-1"` on inactive tabs.
- **Proof-safety:** describes formats/contact level only; no outcome or results
  claims.

## 3. `trial_class_booking_flow_v1`
- **Role:** Lead-capture / trial-booking form with full validation states.
- **Use cases:** Trial/consult booking, contact-to-book, intake forms, demo
  requests.
- **HTML boundary:** `<form novalidate>` with labelled text/email inputs, a
  styled `<select>`, a radio `<fieldset>`/`<legend>`, an optional `<textarea>`,
  a required consent `<label class="ic-checkbox">`, a submit button, a note, and
  a `role="status"` success panel (`hidden` until success). Each field pairs with
  a `[data-error-for]` `.ic-error` element.
- **CSS boundary:** `.ic-form*`, `.ic-field*`, `.ic-label`, `.ic-input`,
  `.ic-select*`, `.ic-radio(s)`, `.ic-checkbox`, `.ic-error`,
  `.ic-form__success`.
- **States:** input default/hover/focus-visible/`aria-invalid`; error text with
  a bespoke "!" marker; success status region; submit button
  default/hover/active/disabled.
- **Behavior (script.js):** `e.preventDefault()` (demo donor — wire to a real
  endpoint in production), per-field validators, inline messages that **never
  clear the user's input**, focus moves to the first invalid field, success
  reveals the status region and resets only on success. Re-validates on blur/
  change once a field has been flagged.
- **Responsive:** single-column; sits beside intro copy at ≥1024px.
- **Constraints:** keep `aria-required`/`aria-describedby` wiring; messages must
  be specific and fixable. If kept as a real submit, remove `preventDefault` and
  add server/edge handling + spam protection.
- **Proof-safety:** no fake "join 500 members" counts; consent copy references
  physical contact and age/guardian rules.

## 4. `coach_roster_proof_safe_v1`
- **Role:** Staff/coach cards built entirely from placeholders — the reference
  for "team section without fabricated people".
- **Use cases:** Coach/trainer/staff/team rosters, instructor grids,
  practitioner lists.
- **HTML boundary:** `<ul class="ic-roster">` → `<li class="ic-coach">` with an
  inline-SVG silhouette portrait (`aria-hidden`), a role label, a `[COACH_NAME]`
  heading, a `[COACH_BIO …]` line, and a `[VERIFIED_CREDENTIAL]` footer.
- **CSS boundary:** `.ic-roster`, `.ic-coach*`. Three-up grid → single column
  under 860px; hover lifts card + copper border.
- **Responsive:** `repeat(3,1fr)` → `1fr`.
- **Constraints:** portraits are decorative geometric SVG, never raster; replace
  bracket tokens only with operator-verified values.
- **Proof-safety:** this is the canonical proof-safe pattern — ships labeled
  placeholders and a section intro stating credentials can be added once
  provided. Never inject belts, records, or titles.

## 5. `mat_zone_diagram_svg_v1`
- **Role:** Bespoke decorative hero diagram — a training-mat zone map (grid,
  taped corners, center engagement circle, crosshair axes) with an optional
  draw-in animation.
- **Use cases:** Combat-sports/athletic hero backdrops; any "facility map / zone"
  visual that must be image-free.
- **HTML boundary:** inline `<svg aria-hidden="true" focusable="false">` with a
  `<pattern id="ic-matgrid">` referenced via `url(#ic-matgrid)` (internal
  fragment only), zone rects/circle, axis lines (`pathLength="100"`), and taped-
  corner paths.
- **CSS boundary:** `.ic-hero__mat`, `.ic-mat__*`, `@keyframes ic-draw`. Lines
  draw via `stroke-dasharray/--dashoffset`.
- **Responsive:** clamps size; drops to low opacity and shifts off-canvas under
  860px so it never competes with text or causes overflow.
- **Constraints:** decorative only (`aria-hidden`); the sole `url()` is the
  internal pattern reference. Animation is `transform/opacity`/stroke only.
- **Proof-safety:** purely geometric; no logos, no real venue maps.

## 6. `first_week_timeline_v1`
- **Role:** Ordered onboarding/process timeline with numbered nodes and a
  connector rail.
- **Use cases:** "What to expect" onboarding, intake steps, process/how-it-works,
  appointment journeys.
- **HTML boundary:** `<ol class="ic-timeline">` → `<li class="ic-timeline__step">`
  with a numbered `.ic-timeline__node` (`aria-hidden`; the `<ol>` conveys order)
  and a `.ic-timeline__card` (tag + h3 + copy).
- **CSS boundary:** `.ic-timeline*`. Connector rail is a pseudo-element gradient
  between nodes (horizontal on desktop, vertical on mobile).
- **Responsive:** four-up grid → single column under 860px; rail re-orients.
- **Constraints:** keep it an `<ol>` for semantic ordering; node numbers are
  decorative duplicates of list order.
- **Proof-safety:** describes the experience; no duration guarantees or outcome
  promises.

## 7. `mobile_sticky_trial_cta_v1`
- **Role:** Mobile-only persistent bottom CTA bar that keeps the primary action
  reachable.
- **Use cases:** Any conversion-led mobile page (book, call, buy, request) where
  the CTA would otherwise scroll away.
- **HTML boundary:** a single trailing `<a class="ic-mobilecta" href="#start">`
  with label + inline arrow SVG.
- **CSS boundary:** `.ic-mobilecta*`; `display:none` by default, becomes
  `inline-flex` under 860px; uses elevation tier 3. Footer adds bottom padding so
  the bar never overlaps footer content.
- **Responsive:** visible only at small widths; full-width minus gutters.
- **Constraints:** ≥44px touch target (52px here); ensure the destination anchor
  exists; keep it a real link (works with JS off).
- **Proof-safety:** label is an action ("Book a trial"), not a claim.

---

### Shared dependencies for all atoms
- The `:root` token block (color roles, fluid type scale, 4px spacing, radii,
  elevation, motion) — port it (or map onto an equivalent) when extracting an
  atom.
- The global `:focus-visible`, `.ic-visually-hidden`, and
  `prefers-reduced-motion` rules — required for the accessibility and motion
  guarantees to survive extraction.
