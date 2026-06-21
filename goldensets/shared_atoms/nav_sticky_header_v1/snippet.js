/* nav_sticky_header_v1 — progressive enhancement.
   1) Toggle the mobile panel with correct aria-expanded + aria-label.
   2) Add a subtle elevation/border once the page is scrolled (data-elevated).
   3) Close the panel on Escape, on link click, and on resize to desktop.
   Reduced-motion aware: respects the OS setting for the scroll listener cadence
   only; all visual motion is handled in CSS, which already has a reduce fallback. */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.getElementById("mobile-nav");
  if (!header || !toggle || !panel) return;

  var DESKTOP_QUERY = window.matchMedia("(min-width: 821px)");

  function openPanel() {
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  }

  function closePanel(returnFocus) {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener("click", function () {
    var expanded = toggle.getAttribute("aria-expanded") === "true";
    if (expanded) {
      closePanel(false);
    } else {
      openPanel();
    }
  });

  // Escape closes and returns focus to the toggle.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      closePanel(true);
    }
  });

  // Tapping any mobile link closes the panel.
  panel.addEventListener("click", function (event) {
    if (event.target.closest("a")) closePanel(false);
  });

  // If the viewport grows to desktop, ensure the panel is closed/reset.
  function handleViewportChange() {
    if (DESKTOP_QUERY.matches) closePanel(false);
  }
  if (DESKTOP_QUERY.addEventListener) {
    DESKTOP_QUERY.addEventListener("change", handleViewportChange);
  } else if (DESKTOP_QUERY.addListener) {
    DESKTOP_QUERY.addListener(handleViewportChange); // older Safari
  }

  // Elevation on scroll (throttled with rAF). transform/opacity-free; CSS handles paint.
  var ticking = false;
  function updateElevation() {
    header.setAttribute("data-elevated", window.scrollY > 4 ? "true" : "false");
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(updateElevation);
        ticking = true;
      }
    },
    { passive: true }
  );
  updateElevation();
})();
