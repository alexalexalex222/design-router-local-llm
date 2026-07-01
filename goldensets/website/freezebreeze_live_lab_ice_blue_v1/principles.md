# FreezeBreeze Live Lab — Design Principles

A live-commerce and product-education shell for physical cooling/comfort products. The page exists to **explain a product on camera and sell it honestly**, not to manufacture hype. Treat this pack as visual grammar and structure — never as a source of claims.

## Design identity

- **Palette:** deep navy base (`#081427` → `#0c1f3a`), frost-white text (`#eaf6ff`/`#cfe6ff`), glassy cyan highlight (`#8fe3ff`), ice-blue accent (`#39b6e6`). Heat-map accents (warm peach `#ffd5a8`, `#ff9e7a`) and a broadcast `live` red (`#ff5d6c`) are used **sparingly** — only for "on air" cues, claim-check warnings, and the comfort-zone gradient. The page reads cool; warmth is a signal, not a theme.
- **Surfaces:** glassy translucent panels over a fixed cool gradient + faint engineering grid. Hairline borders (`#244269`), three elevation tiers only.
- **Shape language:** airflow streams, schematic cross-sections, cue cards, segment timelines, and product-callout panels. Rounded technical radii (8 / 14 / 22 / pill).
- **Imagery:** **native CSS/SVG product schematic instead of product photos.** Airflow is drawn, not photographed. There are zero `<img>` tags, zero raster backgrounds, and zero external assets.

## Token system (build only from these)

- **Color roles:** navy ramp (900/800/700/600/500) for backgrounds + surfaces; ice ramp (50/100/300) for text + highlight; cyan 500/600 for action; steel 400/500 for muted/dim; heat + live for signals only.
- **Type scale:** ratio-locked fluid `clamp()` — `--fs-h1` 2.6→5.1rem, `--fs-h2` 1.9→3.4rem, `--fs-h3`, `--fs-lede`, `--fs-base` (≥1rem), `--fs-sm`, `--fs-xs`. System font stack (`--sans`) for UI; monospace (`--mono`) for labels, specs, timecodes, and prices — reinforcing the "instrument / broadcast" feel.
- **Spacing:** 4px scale `--sp-1`…`--sp-9`. No magic numbers.
- **Radii:** `--r-sm/md/lg/pill`. **Elevation:** `--e-1/2/3`. **Motion:** `--dur-fast` 160ms, `--dur-mid` 240ms, one shared `--ease`.

## Typography

Clean tech-commerce voice. Tight display headings (weight 800, negative tracking) over generous frost-white body. Monospace for every label, timecode, price, and platform tag so the page feels engineered and broadcast-ready. High readability on mobile is mandatory: body never below 16px, line length capped with `ch` units.

## Information architecture (the live-commerce / product-education grammar)

The page is ordered as a **broadcast arc**, not a generic marketing stack:

1. **Hero + product schematic** — the focal point. A drawn cross-section with labelled airflow streams and a "watch it live" CTA. The promise is understanding, not a spec sheet.
2. **Live cue rail** — broadcast status (ready / on air / queued / on hold) so the page feels like a control room.
3. **Demo sequence timeline** — the segment-by-segment plan with timecodes; moves from claim-free setup → airflow → controls → Q&A → offer.
4. **Live schedule shell** — placeholder slots ready for real, confirmed broadcast times. Never implies an unbooked session.
5. **How it works / product education** — three callouts that build a mental model (air must move; reach is a zone not a number; settings trade something), plus a heat-map *teaching* gradient.
6. **Offer / bundle matrix** — structural tier comparison with **placeholder pricing only**.
7. **Objection-handling FAQ** — the doubts buyers raise mid-stream, answered honestly.
8. **Shoppable video queue** — placeholder clip cards (CSS/SVG), each linking to the offer.
9. **Platform tagging checklist** — pre-publish gate for TikTok / YouTube / Shopify.
10. **Segment script rail** — host cue cards with Say / Do / **Claim-check** guardrails.
11. **Footer** — recap + a standing "before you publish, replace placeholders" reminder.

The primary path: *land on the schematic → understand the airflow → watch live or read how it works → review the honest offer → ask about availability.* Trust is earned through transparency (claim checks, placeholders, "shown on camera"), not borrowed through fake proof.

## Motion

Purposeful only, `transform`/`opacity` driven:
- **Airflow shimmer** — dashed cool streams drift up the schematic.
- **Slow fan rotation** — the schematic fan turns.
- **Broadcast pulse** — the `live` dot ring-pulses.
- **Demo-step reveal / hover lift** — cards rise ~2–4px on hover; FAQ "+" rotates to "×".

All of it is enhancement and never blocks first paint. A full `@media (prefers-reduced-motion: reduce)` block disables animation, fixes the streams, and removes the pulse.

## States & accessibility

- Every interactive element ships default / hover / focus-visible / active / disabled. Focus is a visible 3px ice-blue outline with offset.
- Semantic landmarks (`header`/`main`/`footer`/`nav`), one logical heading flow (single `h1`; footer column titles are real headings), skip-to-content link, labelled controls, AA contrast on the dark surface, ≥44px touch targets, native `<details>` accordion and native checkboxes for full keyboard support.
- Mobile-first: single column by default; recomposes at 560 / 760 / 1020px (timeline goes horizontal on wide). Zero horizontal overflow; `overflow-x: hidden` as a backstop.

## Proof discipline (non-negotiable)

Every price, reach figure, noise level, return policy, support contact, schedule date, and video clip is a **labelled placeholder** (`[PRICE — confirm before publishing]`, `[REACH_FIGURE — confirm with verified testing]`, `[CLIP — add verified demo footage]`). The offer matrix shows *structure* only — no `%` discounts, no was/now pricing, no countdowns. The schematic and heat map are explicitly labelled as illustrative teaching aids. No fake reviews, sales numbers, performance claims, influencer/social proof, or media logos exist anywhere in the pack. If an operator supplies verified evidence, it replaces the placeholder; until then, the proof-safe copy stands.
