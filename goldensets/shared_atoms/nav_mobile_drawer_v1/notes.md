# nav_mobile_drawer_v1

A production-grade mobile navigation drawer: a scrim + right-side panel that slides in,
with the full accessibility contract a modal navigation surface needs. Built dark with a
mint accent to vary palette from the other nav atom.

## Accessibility contract (the reason this atom exists)
- **`role="dialog"` + `aria-modal="true"`** on the panel, labelled by `aria-label`.
- **Trigger wiring**: `aria-expanded` toggles true/false, `aria-controls` points at the
  panel id, and the `aria-label` swaps between "Open/Close navigation menu".
- **Focus trap**: Tab / Shift+Tab cycle within the drawer; focus moves to the first
  focusable on open.
- **Escape closes** and **focus is restored** to the trigger on close.
- **Body-scroll lock** via a `body.drawer-locked` class that also compensates for the
  scrollbar width (`--scrollbar-gap`) so the page doesn't shift.
- Closes on scrim click, close-button, Escape, or tapping a nav link.

## Motion
Slide-in 220ms with `--ease-emphasis`; scrim fades. All motion is **CSS-only** — JS only
toggles `data-open` and manages `hidden` after `transitionend`. The mandatory
`prefers-reduced-motion` block swaps the slide for a plain fade and disables the hover
indent, and the JS reads the same setting to skip the transition wait.

## Fonts
Display = **Sora**, body = **Inter**, loaded via `<link>` with `display=swap`.

## How to adapt
- Replace `[BUSINESS_NAME]`, `[PHONE]`, and the `tel:[PHONE_E164]` href with real values
  (keep E.164 form in the href: `tel:+15551234567`).
- Edit the nav links and the footer CTA. Pair the trigger with any header
  (e.g. `nav_sticky_header_v1`) by giving that header's button the same
  `aria-controls="mobile-drawer"`.
- Re-skin from project tokens (`foundation_design_tokens_v1`) — this drawer reads semantic
  color roles, so a light theme is just a palette swap.

## What NOT to do
- Don't remove the focus trap or `aria-modal` — a nav drawer without them strands keyboard
  and screen-reader users behind the scrim.
- Don't animate `width`/`height`/`left`; this animates `transform`/`opacity` only.
- Don't forget to restore focus to the trigger on close, or keyboard users lose their place.
- Don't leave the panel in the AT tree when closed; it is `hidden` until opened.
