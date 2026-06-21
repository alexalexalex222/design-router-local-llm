# interaction_microkit_v1

A curated micro-interaction kit: button press/hover/focus, link underline-draw,
input focus ring, icon-button press, and a scroll-reveal-with-stagger. The
reference for "small motion done with intent."

## Relationship to the other motion atoms
This **complements** `motion_system_v1` and `interaction_system_v1` — it does
not repeat them. Those cover the scroll-aware hide/show header, a generic card
lift, magnetic buttons, and a hover underline that grows from the right. This
atom focuses on **per-control feedback** (button/link/input/icon) and **reveal
choreography with stagger**. Use them together; the tokens match.

## Why this is the reference
- **Every interaction is 150–250ms, transform/opacity only.** Buttons lift on
  hover and settle (scale 0.985) on press; the link underline draws via
  `scaleX(0 → 1)` from the left; inputs get border + ring + calm bg on focus;
  icon buttons scale on press. All have a visible `:focus-visible` ring.
- **Reveal is enhancement that can never hide content.** The hidden start-state
  lives under `html.js-reveal`, a class the script adds *only* when
  IntersectionObserver exists and reduced-motion is off. No JS, old browser, or
  reduced-motion → the class is never added and everything is visible. A 1.2s
  safety timer also un-hides anything the observer missed.
- **Stagger is data-driven.** `data-reveal-group` + per-child `--reveal-delay`
  (default 90ms, override via `data-reveal-stagger`), capped at 360ms so long
  groups never drag. Reveal duration is 520ms (≤600ms, enhancement-only).
- **Reduced-motion** kills every transition AND neutralizes the reveal
  start-state, so content shows instantly.

## How to adapt
- Copy individual demos (`.mk-btn`, `.mk-link`, `.mk-field`, `.mk-icon-btn`)
  into any UI — they're self-contained.
- To add reveals elsewhere: put `data-reveal` on elements, wrap siblings in
  `data-reveal-group` for stagger, optionally set `data-reveal-stagger="70"`.
- Tune feel via `--duration-fast/base` and the easing tokens; don't exceed
  ~250ms for interaction feedback.

## What NOT to do
- Don't put the reveal hidden-state in the base `.reveal` rule (unscoped) — that
  hides content for no-JS/reduced-motion users. Keep it under `.js-reveal`.
- Don't animate width/height/top/left (jank); stick to transform/opacity.
- Don't make icon buttons without a `.visually-hidden` label.
- Don't exceed 600ms on reveals or skip the reduced-motion branch.

## Files
- `snippet.html` — 4 micro-interaction demos + a staggered chip row
- `snippet.css` — token block (Manrope + Inter) + every micro-interaction +
  scoped reveal choreography
- `snippet.js` — IntersectionObserver reveal + stagger (enhancement only)
