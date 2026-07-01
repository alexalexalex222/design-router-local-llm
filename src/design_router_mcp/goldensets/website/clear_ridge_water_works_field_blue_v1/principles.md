# Clear Ridge Water Works — Design Principles

A premium rural / local **diagnostic service** site for well pump, water filtration, and rural water-system work. The whole page is organized around one idea: **read the symptom first, confirm on site, quote the real scope.** Light, technical layout punctuated by dark "diagnostic" panels. Field blue + spring-water cyan over limestone, clay, and graphite.

This is synthetic visual grammar, not a real business. Treat every claim as proof-safe (see `anti_copy.md`).

---

## 1. Design system (tokens)

All values live in `:root` in `styles.css`. Build only from tokens.

### Color — semantic roles
- **Field blue** (`--field-900 #0c1f33` -> `--field-300 #6fa3cf`): primary brand, dark diagnostic surfaces, deep panels, headings.
- **Spring-water cyan** (`--cyan-300 #38c6d9`, `--cyan-200`, `--cyan-100`): accent, focus ring (`--water`), water-flow lines, "live" diagnostic state, on-dark highlights.
- **Limestone** (`--limestone-100 #f4f1e9` ramp): warm light surfaces, diagram fills.
- **Clay** (`--clay-050` / `--clay-400` / `--clay-600`): earthy callouts, placeholder/"to-be-verified" framing (warm dashed boxes).
- **Graphite** (`--graphite-050` -> `--graphite-800`): equipment strokes, machined detail, neutral structure.
- **Neutral ramp** (>=4 steps): `--bg #fbfaf6`, `--bg-panel #fff`, `--bg-sunk #f1eee6`, `--line`, `--line-strong`, plus ink ramp `--ink / --ink-soft / --ink-muted`.
- **State**: `--danger` (emergency/error), `--ok` (success). Emergency uses warm red; planned uses cyan/field-blue. AA contrast held on every text/background pair.

### Typography — ratio-locked fluid scale
- Tuned **system stack** (`--font-sans`) chosen deliberately for an offline, perf-critical, no-CDN surface; **monospace** (`--font-mono`) for field-instrument labels (eyebrows, section indices, diagram callouts, part names).
- Steps via `clamp()`: `--fs-300` ... `--fs-800`; **body is `--fs-400` (>=16px)**. Headings 800/750 weight, tight tracking; mono labels are uppercase with wide tracking to read like gauge/stencil text.

### Spacing, radii, elevation, motion
- **Spacing**: strict 4px scale `--sp-1`..`--sp-9`.
- **Radii**: `--r-sm 6`, `--r-md 12`, `--r-lg 20`, `--r-pill`.
- **Elevation**: exactly 3 tiers (`--e-1/2/3`) — flat cards, lifted panels, floating diagnostic/quote.
- **Motion**: durations `--dur-1 140ms` (feedback), `--dur-2 220ms` (state), `--dur-3 420ms` (reveal); one shared `--ease`. Animate **transform/opacity only**.

---

## 2. Field-service diagnostic grammar

The differentiator. The page behaves like a calm field technician, not a billboard.

1. **Symptom-first hero.** The H1 asks "What's happening with your water?" The hero's job is not to boast — it's to start a diagnosis. The dark **diagnostic panel** sits beside the copy as the primary instrument.
2. **Issue selector = vertical tabs** (`diagnostic_issue_selector_v1`). Five real rural-water symptoms (no water / low pressure / cloudy / pump cycling / new filtration). Selecting one swaps a **readout**: likely systems, plain-language cause, first field checks, and an **urgency pill** (urgent vs planned). This teaches the user where trouble sits — honest, not salesy.
3. **System literacy before the sell.** An inline **equipment diagram** (`equipment_diagram_svg_v1`) shows the real chain: wellhead -> submersible pump -> pressure tank/switch -> filtration -> home, over a ground line and aquifer. A numbered legend maps each part. The user understands the system, so the quote feels grounded.
4. **Two honest tracks** (`emergency_vs_planned_panel_v1`). Emergency (warm red) vs planned (cyan). Each lists concrete triggers and an honest next step. No fake response time — "ask about current availability."
5. **Diagnosis flows into the quote.** The diagnostic CTA carries the chosen symptom into the quote form's issue field (progressive enhancement). The form (`field_service_quote_flow_v1`) is the conversion, but it's framed as a *request*, not a transaction.
6. **Coverage is earned, not promised** (`service_area_map_shell_v1`). An abstract contour/region map — **no town pins, no place names**. Copy: "Coverage confirmed per property, not promised by map," plus a labeled `[SERVICE_AREA_TOWNS]` placeholder.
7. **Proof is verified or absent** (`proof_safe_service_record_v1`). The service-record area ships the *format* of a record entry as labeled placeholders — never an invented job, name, count, or rating.

**Tone**: technical-but-friendly. Confident about the system, modest about claims. "A read, not a verdict." Plain words over jargon, but the right words (drawdown, pre-charge, short-cycling, media).

---

## 3. Layout & composition
- **Light base, dark instruments.** The page is light limestone/white; the *diagnostic panel, quote section, featured plan, region map, and record note* are deep field-blue. The dark surfaces read as "the technical part."
- **One focal point per view.** Hero -> diagnostic panel. System -> diagram. Quote -> form. Never two competing CTAs in one band.
- **Asymmetry on purpose.** Section heads use a `auto 1fr` index + title split. The **maintenance plan comparison is deliberately NOT three equal cards** (`maintenance_plan_comparison_v1`): a narrow Seasonal card, a wider raised dark **System Care** feature (the recommended path, lifted with `translateY`), and a dashed **Filtration Watch** add-on. Different widths, weights, and elevations create real hierarchy.
- **Density alternates.** Airy hero -> dense diagram+legend -> roomy split -> dense form -> calm map -> structured plans -> compact records -> open FAQ.

## 4. Motion
- **Water-flow line** under the hero: two stroked SVG paths with animated `stroke-dashoffset` ("flow"), one reversed, slow and calm.
- **Aquifer wave drift** in the diagram (small `translateX`).
- **Issue-selector state changes**: panel fade-in, dot fill + cyan glow on active tab.
- **Reveals/feedback**: button lift (`--dur-1`), card hover lift, FAQ chevron rotate, success fade-in.
- All gated by **`@media (prefers-reduced-motion: reduce)`** — animations and hover transforms disabled, smooth-scroll off.

## 5. Accessibility
- Semantic landmarks: `header > nav`, `main`, `section[aria-labelledby]`, `footer`. **One H1**; logical H2 -> H3 flow (no skips).
- **Skip-to-content** link; visible `:focus-visible` cyan ring on every interactive element.
- Issue selector implements the **WAI-ARIA tabs pattern**: roving `tabindex`, `aria-selected`, arrow/Home/End keys, `tabpanel` association.
- Form: every field `<label for>`-bound; `aria-required`, `aria-describedby` for hints/errors; `role="status"` live region; errors are specific and fixable; **input is never lost**; keyboard-submittable; success is focus-managed.
- All SVG is decorative (`aria-hidden`) or has `role="img"` + `<title>`/`<desc>`. **No emoji as icons** — bespoke inline SVG, one SVG one job.
- Touch targets >=44px; AA contrast on light and dark surfaces.

## 6. Performance & integrity
- **Zero external requests**: system fonts, no CDN/JS libs, **no `<img>`, no CSS `url()`/background-image**, no data-URI image blobs. All visuals are inline SVG or CSS.
- JS is one small vanilla file, `defer`-loaded, no dependencies, no console errors; the page is fully readable and the form usable as plain HTML if JS fails (validation also backstopped by required attributes' semantics in the labels).
- Media uses `viewBox` (intrinsic ratio) so there's no layout shift.

## 7. Proof policy
No invented stats, testimonials, reviews, awards, logos, certifications, licenses, ratings, years, discounts, or guarantees. Verifiable specifics are **labeled placeholders** (`[SERVICE_AREA_TOWNS]`, `[PHONE_NUMBER]`, `[SERVICE_TYPE]`, `[OUTCOME]`). Proof-safe phrasing throughout: "Use actual service-area towns after confirmation," "Verified service records can be added after approval," "Ask about current availability."
