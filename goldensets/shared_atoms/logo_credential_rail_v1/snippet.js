/* =========================================================================
   logo_credential_rail_v1 — pause/play enhancement
   Progressive enhancement. Without JS the rail still works: the CSS marquee
   runs and already pauses on hover and on keyboard :focus-within, and is fully
   disabled under prefers-reduced-motion. This script just wires the explicit
   Pause/Play button so users can freeze the rail deliberately.

   Behaviour:
   - Toggling sets .is-paused on the viewport (CSS stops the animation) and
     flips the button's aria-pressed + visible label/icon.
   - Under prefers-reduced-motion there is no animation and the button is
     hidden by CSS, so we simply do nothing.
   ========================================================================= */
(function () {
  "use strict";

  var rail = document.querySelector(".rail");
  if (!rail) return;

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;   // no marquee to control

  var viewport = rail.querySelector("[data-marquee]");
  var toggle = rail.querySelector("[data-marquee-toggle]");
  var label = rail.querySelector("[data-toggle-label]");
  if (!viewport || !toggle) return;

  function setPaused(paused) {
    viewport.classList.toggle("is-paused", paused);
    toggle.setAttribute("aria-pressed", paused ? "true" : "false");
    if (label) label.textContent = paused ? "Play" : "Pause";
  }

  toggle.addEventListener("click", function () {
    var paused = toggle.getAttribute("aria-pressed") !== "true";
    setPaused(paused);
  });

  // Start in the running state (matches initial markup: aria-pressed="false").
  setPaused(false);
})();
