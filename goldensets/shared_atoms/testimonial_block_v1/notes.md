# testimonial_block_v1

A three-card testimonial section. This atom is, on purpose, a **model of data
integrity**: it ships with placeholders only and a portrait that is a generated
monogram, not a photo — so there is nothing fabricated to clean up.

## What it is
- A `<ul>` of `<figure class="quote">` cards. Each card: an inline-SVG quote
  mark, a `<blockquote>` holding `[TESTIMONIAL_QUOTE]`, and a `<figcaption>`
  with a monogram portrait + `[CUSTOMER_NAME]` / `[ROLE]`.
- The middle card is `.quote--featured` (slightly larger quote, warm tint).
- The portrait is a bespoke inline-SVG ring + `[INITIALS]` monogram — no photo,
  no avatar service.

## DATA INTEGRITY (the entire point of this atom)
- Replace `[TESTIMONIAL_QUOTE]` with a **verbatim, consented** quote from a real
  client. Do not paraphrase, embellish, compress, or invent.
- Replace `[CUSTOMER_NAME]` and `[ROLE]` only with a real, consented attribution.
  If you can't attribute it, you can't publish it — leave the placeholder.
- `[INITIALS]` is the client's initials for the monogram. If you have a real,
  licensed headshot you may swap the SVG for an `<img>`, but the default is the
  monogram so nothing about a person is faked.
- The header carries an explicit reviewer note reminding the editor of all this.

## How to adapt
- Re-skin via the semantic roles at the top of `snippet.css` (cream + wine).
  The portrait ring/fill follow `--c-portrait-*`.
- Add or remove cards; the grid reflows to a single column under 920px and the
  featured card moves to the top.

## What NOT to do
- Do NOT write sample quotes "just to show the layout". A weak model copying this
  atom must inherit the placeholders, not invented praise.
- Do NOT use a stock photo or generated face for the portrait.
- Keep the reduced-motion block so the hover lift freezes.
