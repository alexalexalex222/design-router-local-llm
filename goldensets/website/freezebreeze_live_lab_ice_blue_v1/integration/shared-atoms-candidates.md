# Shared-Atom Candidates — freezebreeze_live_lab_ice_blue_v1

Eight reusable atoms ship in this pack. All are self-contained (system fonts, inline SVG, no images, no deps) and proof-safe by construction. Locations are in `source_snapshot/index.html` (+ matching CSS blocks in `source_snapshot/styles.css`). Each atom root is marked with `data-atom="<id>"` for extraction.

| Atom ID | Where (index.html) | CSS block | What it is | Reuse notes |
| --- | --- | --- | --- | --- |
| `product_schematic_svg_v1` | hero `<figure class="schematic">` | `.schematic*`, `.stream*`, `.schematic-fan` | Drawn product cross-section with labelled airflow streams, animated shimmer + slow fan, illustrative caption | Highest-value atom. Redraw the geometry per product; keep the labelled-callout pattern and the "illustrative, confirm before publishing" caption. |
| `live_demo_sequence_v1` | §2 `<ol class="timeline">` | `.timeline*` | Timecoded segment timeline; vertical on mobile, horizontal rail ≥1020px | Generic to any live broadcast. Swap segment titles + times. |
| `shoppable_video_queue_v1` | §7 `<ul class="queue-grid">` | `.queue-grid`, `.clip*`, `.link-cta` | CSS/SVG placeholder clip cards (16:9, play glyph), each with a "view offer" link | Drop-in for any "shoppable video" need. Replace `[CLIP — add verified demo footage]` only with real footage references. Never embed external media. |
| `offer_bundle_matrix_v1` | §5 `.offer-matrix` | `.offer-*` | Tiered bundle comparison with placeholder pricing, feature yes/no rows, one "most explained" flag | Pricing/inclusions are placeholders by design. Pure CSS check/dash marks (no icon font). |
| `objection_faq_panel_v1` | §6 `.faq-list` | `.faq-*` | Native `<details name>` accordion, rotating +/× glyph, placeholders for figure-bearing answers | Fully keyboard-accessible without JS. Reusable across any vertical. |
| `live_segment_script_rail_v1` | §9 `<ol class="script-rail">` | `.script-*` | Host cue cards: Say / Do / Claim-check guardrail per segment | The Claim-check line is the safety feature — keep it when reused. |
| `platform_tagging_checklist_v1` | §8 `<form class="tag-board">` | `.tag-*`, `.check*` | Per-platform (TikTok/YouTube/Shopify) pre-publish checkboxes with custom CSS check state | Native checkboxes; captures intent only, submits nowhere. Extend platforms by adding `<fieldset>`s. |
| `product_education_callout_v1` | §4 `.callout-grid` articles | `.callout*` | Numbered education callout with bespoke SVG figure + mental-model copy | Use anywhere a "how it works" explainer is needed; not limited to cooling products. |

## Promotion guidance

- Strongest cross-vertical candidates for a shared library: `objection_faq_panel_v1`, `live_demo_sequence_v1`, `platform_tagging_checklist_v1`, and `product_education_callout_v1` — they are vertical-agnostic.
- `product_schematic_svg_v1`, `offer_bundle_matrix_v1`, `shoppable_video_queue_v1`, and `live_segment_script_rail_v1` are strongest within the live-commerce / physical-product context.
- Before promoting any atom, preserve the token names (`--ice-*`, `--cyan-*`, `--sp-*`, etc.) or remap them to the destination design system — do not inline hard-coded colors.
- Keep every proof placeholder intact during extraction; the atoms are only safe if the placeholders survive.
