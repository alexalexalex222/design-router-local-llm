Build a premium live-commerce + product-education landing page for a fictional cooling/comfort product lab, in the spirit of a broadcast control room — not a hype-driven dropshipping page.

Voice: crisp tech-commerce. Sell by *explaining the product on camera and being honest*, never by manufacturing urgency or proof.

Design identity: ice blue, frost white, deep navy, and glassy cyan, with small heat-map accents used only as signals (on-air state, claim-check warnings, comfort-zone gradient). Cool reads as the theme; warmth and a broadcast red are signals only. Glassy translucent panels over a fixed cool gradient and a faint engineering grid. Shape language: airflow diagrams, live cue cards, segment timelines, and product-callout panels.

Instead of product photos, draw a native inline-SVG product schematic: a tower cooling unit cross-section with an intake at the base, an internal fan, a chilled core, and labelled airflow streams that rise and fan outward. All visuals must be CSS/SVG — no images, no raster backgrounds, no external assets, no external fonts, no CDNs, no emoji. Use a system font stack; use monospace for labels, timecodes, prices, and platform tags.

Build all of these sections, fully (no stubs):
1. Hero with the product schematic SVG and a "watch it live" CTA.
2. A live cue rail showing broadcast states (ready / on air / queued / on hold).
3. A demo-sequence timeline with timecodes that moves from claim-free setup -> airflow -> controls -> live Q&A -> offer.
4. A live schedule shell with placeholder date slots (never imply a session that is not booked).
5. A how-it-works / product-education block: three callouts that build a mental model, plus a heat-map gradient labelled as a teaching aid.
6. An offer / bundle matrix comparing tiers with PLACEHOLDER pricing only — no percentage discounts, no was/now prices, no countdowns.
7. An objection-handling FAQ (native details/summary) answering the doubts buyers raise mid-stream.
8. A shoppable video queue built from CSS/SVG placeholder cards (no embedded media), each linking to the offer.
9. A platform tagging checklist for TikTok, YouTube, and Shopify (native checkboxes).
10. A live segment script rail of host cue cards with Say / Do / Claim-check guardrails.
11. A footer that recaps and reminds the operator to replace placeholders with verified information.

Motion (transform/opacity only, with a prefers-reduced-motion fallback): airflow shimmer on the schematic streams, a slow fan rotation, a broadcast pulse on the live dot, and gentle hover lifts / a rotating FAQ icon. Never block first paint.

Accessibility and craft: semantic landmarks, exactly one h1, a skip-to-content link, visible focus-visible outlines, full keyboard paths, labelled controls, AA contrast on the dark surface, >=44px touch targets, and zero horizontal overflow mobile-first (recompose at ~560/760/1020px; the timeline may go horizontal on wide screens). Every interactive element needs default/hover/focus-visible/active/disabled states. Any JavaScript must be minimal, vanilla, dependency-free, and non-essential.

Proof rule (hard): every price, reach figure, noise level, policy, contact, date, and clip is a labelled placeholder such as "[PRICE — confirm before publishing]", "[REACH_FIGURE — confirm with verified testing]", or "[CLIP — add verified demo footage]". No fake reviews, sales numbers, performance claims, discounts, influencer/social proof, or media logos anywhere. Keep proof-safe copy like "Ask about current availability." and "Queue for review before publishing." If the operator provides verified evidence, swap it in for the placeholder; otherwise leave the placeholder.
