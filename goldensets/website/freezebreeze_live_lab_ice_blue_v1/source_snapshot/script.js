/* FreezeBreeze Live Lab — progressive enhancement only.
   The page is fully functional and accessible without JavaScript:
   FAQ uses native <details>, the checklist uses native checkboxes,
   and all navigation is anchor-based. This file adds an inline,
   screen-reader-announced acknowledgement to the "shell" CTAs that
   would normally hit a real backend (reminders / availability),
   so the controls give observable feedback in this static demo.
   No dependencies, no network, no claims. */
(function () {
  "use strict";

  var ackButtons = document.querySelectorAll(".schedule-cta, .offer-col .button");
  if (!ackButtons.length) return;

  ackButtons.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      // Anchors here only jump within the page; intercept to show feedback.
      event.preventDefault();

      if (btn.dataset.ack === "on") return;
      btn.dataset.ack = "on";

      var original = btn.textContent.trim();
      btn.setAttribute("aria-live", "polite");
      btn.textContent = "Noted — ask about availability";

      window.setTimeout(function () {
        btn.textContent = original;
        delete btn.dataset.ack;
      }, 2400);
    });
  });
})();
