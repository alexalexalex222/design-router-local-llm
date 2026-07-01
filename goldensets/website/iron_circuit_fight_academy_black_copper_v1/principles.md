# Iron Circuit Fight Academy — Design Principles

A synthetic anchor donor for combat-sports / martial-arts academy sites. The
grammar is **disciplined, grounded, premium** — a serious training floor, not a
UFC broadcast and not a cheerful family-karate studio. It is deliberately a
**black / COPPER** system so it reads as a distinct donor from the black/RED
Emberforge pack: warmer, more craft-forward, less aggressive.

## Design system (tokens — build only from these)

### Semantic color roles + neutral ramp
Carbon-to-bone neutral ramp (6 steps), warmed toward deep brown so the dark
surfaces feel matte and physical rather than pure black.

- `--ic-n-900 #0a0908` deepest matte black · `--ic-n-800 #121110` base surface ·
  `--ic-n-700 #1b1917` raised surface · `--ic-n-600 #2a2622` hairline/border
  (brown cast) · `--ic-n-400 #6f6a62` faint text · `--ic-n-200 #b8b1a4`
  secondary text · `--ic-bone #ece4d6` primary text.
- Accent ramp: `--ic-copper #b5713a` (primary) · `--ic-copper-soft #c98a52`
  (hover) · `--ic-copper-deep #7d4a23` (pressed) · `--ic-red #a23226`
  (controlled red, used only for taped-corner accents and the Youth schedule
  band — never as the dominant brand color).
- Semantic roles map onto the ramp: `--ic-bg`, `--ic-bg-deep`, `--ic-surface`,
  `--ic-border`, `--ic-text`, `--ic-text-muted`, `--ic-text-faint`,
  `--ic-accent`, `--ic-on-accent` (dark text on copper for AA), `--ic-focus`
  `#e7b07a` (high-contrast ring on dark), `--ic-danger`, `--ic-ok`.

### Fluid type scale (ratio-locked via clamp(); body >= 16px)
`--ic-fs-100` micro/labels → `--ic-fs-700` display H1
(`clamp(2.8rem, 1.9rem + 4.4vw, 5.6rem)`). Every step is a single clamp() so the
scale stays locked across the 360 → 1512 range without per-breakpoint font
overrides.

### Spacing scale (4px base)
`--ic-sp-1 4px` … `--ic-sp-10 128px`. All padding/margins/gaps reference these
tokens; no raw pixel spacing in component rules.

### Named radii
`--ic-r-xs 2px` · `--ic-r-sm 4px` · `--ic-r-md 8px` · `--ic-r-lg 14px` ·
`--ic-r-pill 999px`. Sharp-ish corners read as equipment/competition; pill is
reserved for radio chips.

### Elevation tiers (3, restrained)
`--ic-e-1` hairline lift · `--ic-e-2` card/menu · `--ic-e-3` mobile sticky CTA.
On a matte surface, shadows stay low-opacity and large-radius so nothing looks
glossy.

### Motion durations + easings
`--ic-dur-1 140ms` (interaction feedback) · `--ic-dur-2 220ms` (menus, hovers) ·
`--ic-dur-3 420ms` (reveals, accordion, SVG mat-line draw). Easing:
`--ic-ease cubic-bezier(.2,.7,.3,1)` and `--ic-ease-out cubic-bezier(.16,1,.3,1)`.
Only `transform` and `opacity` (and the `grid-template-rows` accordion trick) are
animated. A full `prefers-reduced-motion: reduce` block neutralizes all of it and
forces the mat SVG to its drawn-complete state.

### Typography intent
- Display: condensed athletic stack (`"Arial Narrow", "Roboto Condensed",
  "Oswald", system-ui`) — tight, uppercase, fight-card energy.
- Body: readable system grotesk stack for paragraphs and form copy.
- Mono: labels, kickers, schedule times, nav — gives an "equipment readout"
  texture. **System fonts only**; nothing is fetched.

## Combat-sports grammar (the look)

- **Mat-zone geometry.** The hero is a bespoke inline-SVG mat: a grid pattern, a
  taped outer zone, a center engagement circle, and crosshair axes. Taped corners
  use the controlled red. One SVG, one job.
- **Fight-card structure.** Sections are numbered (`01`–`07`) like a card; the
  schedule is a true `<table>` matrix (bracket-like), discipline cells are color
  coded.
- **Controlled diagonal tension** lives in the copper top-borders, inset accent
  underlines on tabs, and the timeline connector rails — never in skewed text or
  chaotic overlap.
- **Hover pressure.** Interactive cards lift 2–3px and gain a copper border;
  buttons depress 1px on `:active`. Feedback is fast and physical.
- **Schedule-row focus.** The matrix is a focusable scroll region; rows read as
  time blocks with mono time + band label.

## Information architecture (primary path)
Job: a nervous adult or teen beginner books a trial. Order: sticky nav → hero
(promise + trial CTA) → programs (pick a track) → schedule (when) → first-week
timeline (what actually happens, lowers fear) → coaches (trust, proof-safe) →
facility/gear (remove the "what do I bring" objection) → **booking form**
(conversion) → FAQ (final objections) → footer. A mobile sticky CTA keeps "Book
a trial" one tap away on small screens.

## Proof discipline (non-negotiable)
Treat all credentials, reviews, records, and stats as **operator-supplied or
absent**. The build ships labeled placeholders (`[COACH_NAME]`,
`[VERIFIED_CREDENTIAL]`, `[ACADEMY_ADDRESS]`) and proof-safe copy ("ask about
current availability", "Verified coach credentials can be placed here", "Reviews
and credentials can be added after approval"). No belts, no fight records, no
championships, no "#1 gym", no testimonials, no awards — ever — unless the
operator provides verified evidence.
