# Support-Donor Notes — Iron Circuit Fight Academy

How the router may safely borrow from this pack when it is a **support donor**
(secondary) rather than the primary anchor. The goal: lift structure and
interaction discipline without dragging in the brand, the illustrative content,
or anything that could become fabricated proof.

## Safe to reuse (structure / interaction grammar)
These sections are content-light or placeholder-driven and transfer cleanly:

- **Sticky nav shell** (`.ic-header`, `.ic-nav`, mobile toggle + slide-down
  menu) — generic; swap labels/links.
- **Hero shell** (`.ic-hero__inner`: eyebrow + condensed display H1 + lede +
  action row + facts `<dl>`) — keep the layout, replace copy; the mat SVG is
  optional (see `mat_zone_diagram_svg_v1`).
- **Program selector tabs** (`program_selector_tabs_v1`) — generic ARIA tabs.
- **Schedule matrix** (`class_schedule_matrix_v1`) — generic day x time-block
  table; re-label disciplines/columns.
- **First-week timeline** (`first_week_timeline_v1`) — generic process/onboarding
  ordered list.
- **Facility / gear checklist** (`.ic-facility__cols`, `.ic-checklist`) — generic
  two-column "bring this / we provide" or "included / not included".
- **Trial booking form** (`trial_class_booking_flow_v1`) — generic validated
  lead form (re-point fields and the submit handler).
- **FAQ accordion** (`.ic-accordion`) — generic WAI-ARIA disclosure list.
- **Footer + mobile sticky CTA** — generic, placeholder-driven.
- **The full `:root` token system** and the global a11y/motion rules.

## Unsafe to reuse without change (content + provenance)
Do **not** transplant these as-is:

- **Brand identity:** the name "Iron Circuit Fight Academy", the `IRON`+copper
  `CIRCUIT` logo lockup, and the brand mark SVG. Replace with the operator's
  brand or a neutral placeholder.
- **Illustrative schedule contents:** the specific times, days, and discipline
  placements are structure, not a real timetable — never present them as a
  client's actual schedule.
- **Coach roster values:** ship the *pattern*, but the `[COACH_NAME]`,
  `[COACH_BIO]`, `[VERIFIED_CREDENTIAL]` tokens must be replaced with verified
  operator data or kept as visible placeholders. Never auto-fill names, belts,
  records, or titles.
- **Footer contact tokens:** `[ACADEMY_ADDRESS]`, `[PHONE_NUMBER]`,
  `[EMAIL_ADDRESS]` are placeholders, not real contact details.
- **Headline/FAQ/program copy:** on-brand for *this* fictional academy; rewrite
  for the target so output is not a near-duplicate.
- **Controlled red accent + copper palette:** if co-routing with another dark
  combat-sports anchor (e.g. emberforge black/red), do not merge palettes — pick
  one accent system to avoid a red/copper clash.

## Sanitization requirements (apply on every reuse)
1. **Strip brand + replace tokens.** Remove the Iron Circuit name/logo; replace
   every `[BRACKET_TOKEN]` with operator-verified content or keep it clearly
   labeled. Never silently invent values.
2. **Re-author illustrative data.** Treat schedule cells, program formats, and
   timeline copy as templates; regenerate for the real business.
3. **Enforce the proof policy.** No belts, records, championships, testimonials,
   ratings, awards, certifications, or "years in business" unless the operator
   supplies verified evidence. Default to proof-safe copy ("ask about current
   availability", "verified credentials can be placed here").
4. **Preserve accessibility wiring.** Keep `scope` on table headers, the table
   `<caption>`, tab/panel id wiring, `aria-controls`/`aria-labelledby`,
   `:focus-visible`, `.ic-visually-hidden`, labelled controls, and ≥44px touch
   targets. Dropping these breaks the section's compliance.
5. **Keep the booking form honest.** The shipped handler uses
   `preventDefault()` (demo). For production, wire a real endpoint, keep inline
   validation + input preservation, and add spam protection — do not leave a
   dead submit that silently discards input.
6. **Maintain self-containment.** No `<img>`, no raster `url()`, no external
   fonts/CDN/JS introduced during reuse. The only permitted `url()` is an
   internal SVG fragment reference. Keep the `prefers-reduced-motion` fallback.
7. **Don't genre-shift.** Keep the grounded adult/teen combat-sports tone; do not
   soften into kids-karate, wellness, or corporate-chain framing, and do not
   harden into a UFC-broadcast hype clone.
