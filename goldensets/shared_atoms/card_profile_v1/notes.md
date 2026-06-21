# card_profile_v1

A team / profile card that respects **data integrity** (no fake photos) and the
accessibility rule weak models miss most: **icon-only links must be labelled**.

## Why this is the reference
- **No stock photo.** The portrait is a generated SVG: a rounded gradient frame
  with a monogram `<text>`. Placeholder monograms (`[I]`, `[II]`, `[III]`) make
  it obvious these are stand-ins, not invented headshots.
- **Icon-only social links carry text.** Each `<a>` wraps an `aria-hidden` SVG
  plus a `.visually-hidden` label ("Email [NAME]", "[NAME] on [NETWORK]"). The
  link is announced and operable; sighted users see just the icon. Copy the
  `.visually-hidden` utility — it's the correct clip pattern.
- **Real placeholders, not fabricated data:** `[NAME]`, `[ROLE]`,
  `[ONE_LINE_BIO]`, `[NETWORK]`. Never replace these with invented people.
- **Touch + focus:** social links are 44×44 with a visible `:focus-visible`
  ring; card hover lift is reduced-motion guarded. No JS — all CSS.

## How to adapt
- Replace `[NAME]`, `[ROLE]`, `[ONE_LINE_BIO]`, monogram initials, and the
  `href`s with real values. Point the email link at a `mailto:`.
- Want real photos later? Swap the `<svg class="profile__art">` for an `<img>`
  with a real `alt` — but keep the rounded frame and the monogram as the
  no-photo fallback.
- Add/remove social links freely; keep the `.visually-hidden` label on each.
- The gradient `#pf-a` is defined once in the first card's `<defs>` and reused
  by the others (valid same-document reference).

## What NOT to do
- Don't drop a stock/AI headshot in — that's fabricated identity. Use the
  monogram until a real, approved photo exists.
- Don't ship icon-only links without a text label — they announce as "link" with
  no name.
- Don't remove `aria-hidden` from the decorative SVGs (they'd double-announce).

## Files
- `snippet.html` — 3 profile cards with SVG monogram + labelled social links
- `snippet.css` — token block (Fraunces + Inter) + `.visually-hidden` + states
