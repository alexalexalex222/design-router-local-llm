/* =========================================================================
   pricing_tiers_v1 — billing toggle
   Progressive enhancement. With JS off, the page shows the monthly [PRICE]
   placeholders and the switch is inert but still keyboard-focusable.

   The switch is a real role="switch" button:
   - Click, Space, and Enter all flip it (Space/Enter handled natively for a
     <button>; we only manage state + Space's default scroll).
   - aria-checked reflects "annual selected".
   - On toggle we swap each .tier__amount text from data-price-monthly to
     data-price-annual (and back), update the /period + billed note, and move
     the active styling between the two labels.

   DATA INTEGRITY: prices come only from the data-* attributes the author sets.
   This script never computes or invents a discounted price.
   ========================================================================= */
(function () {
  "use strict";

  var root = document.querySelector(".pricing");
  if (!root) return;

  var toggle = root.querySelector("[data-billing-toggle]");
  if (!toggle) return;

  var amounts   = Array.prototype.slice.call(root.querySelectorAll(".tier__amount"));
  var periods   = Array.prototype.slice.call(root.querySelectorAll("[data-period]"));
  var billNotes = Array.prototype.slice.call(root.querySelectorAll("[data-billed-note]"));
  var optMonthly = root.querySelector('[data-bill="monthly"]');
  var optAnnual  = root.querySelector('[data-bill="annual"]');

  function setActiveLabel(annual) {
    if (optMonthly) optMonthly.classList.toggle("is-active", !annual);
    if (optAnnual)  optAnnual.classList.toggle("is-active", annual);
  }

  function apply(annual) {
    amounts.forEach(function (el) {
      var next = annual
        ? el.getAttribute("data-price-annual")
        : el.getAttribute("data-price-monthly");
      if (next != null && next !== "") el.textContent = next;
    });
    periods.forEach(function (el) { el.textContent = annual ? "/ mo" : "/ mo"; });
    billNotes.forEach(function (el) {
      el.textContent = annual ? "Billed annually" : "Billed monthly";
    });
    setActiveLabel(annual);
  }

  function flip() {
    var annual = toggle.getAttribute("aria-checked") !== "true";
    toggle.setAttribute("aria-checked", annual ? "true" : "false");
    apply(annual);
  }

  // Click handles mouse + native Enter/Space activation of a <button>.
  toggle.addEventListener("click", flip);

  // Prevent Space from scrolling the page when the switch is focused; Enter is
  // already handled by the click event. (Defensive — keeps behaviour crisp.)
  toggle.addEventListener("keydown", function (e) {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
    }
  });

  // Initialise from current aria-checked (defaults to monthly / false).
  apply(toggle.getAttribute("aria-checked") === "true");
})();
