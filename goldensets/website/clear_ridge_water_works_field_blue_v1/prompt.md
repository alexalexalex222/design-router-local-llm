Build a premium rural / local **field-service diagnostic** website for a well pump, water filtration, and rural water-system company. Frame the whole page as a calm field technician would: **read the symptom first, confirm on site, quote the real scope** — not as a billboard.

Design identity: **field blue, spring-water cyan, limestone, clay, graphite.** A light, technical layout punctuated by **dark diagnostic panels**. Shape language: water lines, contour maps, pump/equipment diagrams, and service cards with field-note detail. Motion: a slow water-flow line, issue-selector state changes, and calm transitions only. Voice: practical, trustworthy, technical-but-friendly — use the right field terms (drawdown, pre-charge, short-cycling, media) but stay plain.

Favor a symptom-first hero, a system-literacy diagram before any sell, two honest service tracks, a request-style quote flow, and earned (not promised) coverage. The dark surfaces should read as "the technical part" of the page; the light surfaces carry orientation and trust.

Build all of these sections, fully (no stubs):
1. **Hero** with a "what's happening with your water?" dark **diagnostic panel** beside the copy.
2. **Issue selector** as accessible vertical tabs: no water / low pressure / cloudy water / pump cycling / new filtration — each swaps a readout of likely systems, plain-language cause, first field checks, and an urgency pill.
3. **System diagram** as inline SVG: wellhead -> submersible pump -> pressure tank/switch -> filtration -> home, over a ground line and aquifer, with a numbered legend.
4. **Emergency vs planned** service split — two contrasting panels (urgent red vs planned cyan) with concrete triggers and honest next steps.
5. **Quote request flow** — a real form with labelled fields, inline validation, all states, keyboard-submittable, a live status region, and a focus-managed success state; never lose the user's input.
6. **Service-area map shell** — an abstract contour/region map concept with **no fake towns or pins**; coverage is confirmed per property.
7. **Maintenance plan comparison** with **real hierarchy/asymmetry** — NOT three equal cards. A smaller baseline plan, a wider raised featured plan, and a dashed add-on.
8. **Proof-safe service record** area — show the *format* of a record entry as labeled placeholders only.
9. **FAQ** — straight answers about how rural water service works (native `<details>` accordion).
10. **Footer** — brand, section nav, proof-safe contact placeholders, and a final no-fake-claims line.

Hard constraints: self-contained and offline — **system fonts only, no external CSS/JS/CDN/fonts**. **No `<img>`, no CSS `url()`/background-image, no external image URLs, no emoji as icons** (use bespoke inline SVG, one SVG one job). Mobile-first responsive with zero horizontal overflow at 360/390/768/1024/1280/1440/1512; layouts recompose per breakpoint. Accessible: semantic landmarks, one heading flow, visible focus-visible, full keyboard paths (WAI-ARIA tabs for the selector), labelled controls, AA contrast, >=44px targets, skip-to-content. Motion only via transform/opacity with a `prefers-reduced-motion` fallback. Any JS is minimal vanilla with no dependencies and zero console errors.

Proof policy (zero tolerance): **no fake license number, no insured/bonded claim, no response time, no service towns, no guarantee, no reviews, no years in business, no stock photos.** Use labeled placeholders (`[SERVICE_AREA_TOWNS]`, `[PHONE_NUMBER]`, `[SERVICE_TYPE]`, `[OUTCOME]`) and proof-safe phrasing ("Use actual service-area towns after confirmation," "Verified service records can be added after approval," "Ask about current availability"). The business name and copy here are synthetic visual grammar — do not present any claim as verified fact.
