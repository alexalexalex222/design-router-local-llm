# form_intake_states_v1

A contact / intake form that models the **full state vocabulary** weak models
routinely skip: idle, hover, focus, filled, inline validation error, submit
loading, and a success panel. This is the reference for "what a correct form
actually does," not just how one looks.

## Why this is the reference
- **Error state is wired for assistive tech, not just color.** On failure each
  field gets `aria-invalid="true"` AND its `aria-describedby` is pointed at a
  real `.field__error` message element (kept alongside the original help text).
  The CSS error styling hooks off `[aria-invalid="true"]`, so the visual error
  and the announced error can never disagree. Copy this pattern exactly.
- **Validation timing is humane.** Fields validate on *blur after first touch*
  and clear the moment they become valid — no yelling mid-typing.
- **Loading + success are spelled out.** Submit disables the button, sets
  `aria-busy`, swaps the label to "Sending…", shows a spinner, then reveals a
  pre-rendered success panel and moves focus to it. A `role="status"` live
  region announces failures politely.
- **Progressive enhancement:** `snippet.js` is enhancement only. Without it the
  form is a normal POST with native `required` / `type=email` validation.

## How to adapt
- Replace `[RESPONSE_WINDOW]`, `[LOW_RANGE]`, `[MID_RANGE]`, `[NAME]` with real
  business values. These are intentional placeholders — do **not** invent times
  or prices.
- Swap field set as needed; keep the label-above-input structure, the help
  text, and the required marking.
- Point the `setTimeout` stub at a real `fetch()` to your endpoint. Keep the
  loading → success/error transitions.

## What NOT to do
- Don't replace labels with placeholder-only inputs (placeholders aren't labels).
- Don't color-only the error — keep `aria-invalid` + the described message.
- Don't fabricate response times, budgets, or testimonials.
- Don't remove the reduced-motion fallback (spinner slows, no transforms).

## Files
- `snippet.html` — semantic form + pre-rendered success panel
- `snippet.css` — token block (Sora + Inter) + every interaction state
- `snippet.js` — validation, loading, success, reset (enhancement only)
