/* nav_mobile_drawer_v1 — accessible drawer controller.
   Features: open/close wiring (aria-expanded/aria-controls), focus trap,
   Escape to close, body-scroll lock with scrollbar-gap compensation,
   focus restore to the trigger, click-scrim/close-button to dismiss.
   No JS-driven animation — all motion lives in CSS (which has a reduced-
   motion fallback), so this works the same whether or not motion is reduced. */
(function () {
  "use strict";

  var root = document.querySelector(".drawer-root");
  var drawer = document.getElementById("mobile-drawer");
  var trigger = document.querySelector(".drawer-trigger");
  var scrim = root && root.querySelector(".drawer-scrim");
  if (!root || !drawer || !trigger || !scrim) return;

  var FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  var lastFocused = null;

  function getFocusable() {
    return Array.prototype.filter.call(
      drawer.querySelectorAll(FOCUSABLE),
      function (el) { return el.offsetParent !== null || el === document.activeElement; }
    );
  }

  function lockScroll() {
    var gap = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--scrollbar-gap", gap + "px");
    document.body.classList.add("drawer-locked");
  }
  function unlockScroll() {
    document.body.classList.remove("drawer-locked");
    document.documentElement.style.removeProperty("--scrollbar-gap");
  }

  function openDrawer() {
    lastFocused = document.activeElement;
    scrim.hidden = false;
    drawer.hidden = false;
    // Force reflow so the CSS transition runs from the hidden state.
    void drawer.offsetWidth;
    root.setAttribute("data-open", "true");
    trigger.setAttribute("aria-expanded", "true");
    trigger.setAttribute("aria-label", "Close navigation menu");
    lockScroll();
    var focusables = getFocusable();
    (focusables[0] || drawer).focus();
    document.addEventListener("keydown", onKeydown, true);
  }

  function closeDrawer() {
    root.setAttribute("data-open", "false");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-label", "Open navigation menu");
    unlockScroll();
    document.removeEventListener("keydown", onKeydown, true);

    var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var done = function () {
      drawer.hidden = true;
      scrim.hidden = true;
      drawer.removeEventListener("transitionend", done);
    };
    if (prefersReduced) {
      done();
    } else {
      drawer.addEventListener("transitionend", done);
      // Safety net if transitionend never fires.
      window.setTimeout(done, 400);
    }
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function onKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDrawer();
      return;
    }
    if (event.key !== "Tab") return;

    // Focus trap.
    var focusables = getFocusable();
    if (focusables.length === 0) {
      event.preventDefault();
      drawer.focus();
      return;
    }
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    var active = document.activeElement;

    if (event.shiftKey && (active === first || !drawer.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  trigger.addEventListener("click", function () {
    var open = trigger.getAttribute("aria-expanded") === "true";
    if (open) { closeDrawer(); } else { openDrawer(); }
  });

  // Any element marked data-drawer-close (scrim + close button) dismisses.
  root.addEventListener("click", function (event) {
    if (event.target.closest("[data-drawer-close]")) closeDrawer();
  });

  // Tapping a nav link closes the drawer (in-page anchors).
  drawer.addEventListener("click", function (event) {
    if (event.target.closest(".drawer__link")) closeDrawer();
  });
})();
