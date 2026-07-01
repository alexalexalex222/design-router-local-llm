# form_multistep_v1

A multi-step intake wizard: accessible progress indicator, Back/Next, per-step
validation, a final review step, and a success panel. The reference for breaking
a long form into steps **without** breaking accessibility.

## Why this is the reference
- **Progress indicator is a real ordered list.** Each step is an `<li>`; the
  active one carries `aria-current="step"`, completed ones get
  `data-state="complete"` (rendered as a check), upcoming ones `"upcoming"`. The
  dots/connector are styled purely from `data-state`.
- **Per-step validation gates Next.** You can't advance past invalid fields.
  Errors set `aria-invalid="true"` + `aria-describedby` on the field AND surface
  in a `role="alert"` region; focus jumps to the first bad field.
- **A `role="status"` live region** announces "Step X of N — Name" on each move.
- **Focus management:** changing step moves focus to that step's `<legend>`, so
  keyboard and screen-reader users land in the new step, not back at the top.
- **Review step** mirrors entered values via `data-review` cells; Back lets you
  edit before submit.
- **Progressive enhancement:** with JS off, every step `<fieldset>` is visible
  and the form is one ordinary POST. JS collapses it into a wizard.

## How to adapt
- Add/remove steps by adding `.wizard__step[data-step=N]` fieldsets and matching
  indicator `<li>`s; extend the `validators` map and `stepNames` in the JS.
- Replace `[RESPONSE_WINDOW]` with a real value. Do not invent it.
- Point the submit `setTimeout` at a real `fetch()`.

## What NOT to do
- Don't let Next skip validation — the gate is the whole point.
- Don't drop `aria-current` / the live region; the indicator must be announced.
- Don't animate step changes without the reduced-motion fallback.

## Files
- `snippet.html` — indicator + 3 step fieldsets (contact / project / review)
- `snippet.css` — token block (Space Grotesk + Inter) + indicator + states
- `snippet.js` — step machine, per-step validation, review, submit
