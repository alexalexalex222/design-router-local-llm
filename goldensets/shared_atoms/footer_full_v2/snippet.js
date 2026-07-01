/* footer_full_v2 — progressive enhancement (optional).
   1) Back-to-top: smooth scroll (honors prefers-reduced-motion -> instant).
   2) Newsletter: client-side validation + idle/loading/error/success states.
      The submit is a STUB (no real network). Wire `subscribe()` to your backend.
   3) Auto-fill the copyright year.
   Everything degrades gracefully: without JS the footer is fully usable, the
   form posts normally, and the back-to-top link still moves focus. */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Current year ---- */
  var yearEl = document.querySelector("[data-current-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---- Back to top ---- */
  var toTop = document.querySelector("[data-scroll-top]");
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
      // Move focus to the top of the document for keyboard users.
      var target = document.querySelector("#top") || document.body;
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
  }

  /* ---- Newsletter ---- */
  var form = document.querySelector(".newsletter");
  if (!form) return;
  var input = form.querySelector(".newsletter__input");
  var submit = form.querySelector(".newsletter__submit");
  var status = form.querySelector(".newsletter__status");

  function setStatus(state, message) {
    status.setAttribute("data-state", state);
    status.textContent = message;
  }

  function isValidEmail(value) {
    // Pragmatic, not RFC-exhaustive.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  // Clear the invalid flag as soon as the user edits.
  input.addEventListener("input", function () {
    if (input.getAttribute("aria-invalid") === "true") {
      input.removeAttribute("aria-invalid");
      setStatus("idle", "We send a few useful notes a year. No spam. Unsubscribe anytime.");
    }
  });

  // Replace this stub with a real request to your provider.
  function subscribe(email) {
    return new Promise(function (resolve, reject) {
      window.setTimeout(function () {
        // Demo branch: addresses containing "fail" simulate a server error.
        if (/fail/i.test(email)) { reject(new Error("network")); }
        else { resolve(); }
      }, 1100);
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (form.getAttribute("data-loading") === "true") return;

    var value = input.value;
    if (!isValidEmail(value)) {
      input.setAttribute("aria-invalid", "true");
      setStatus("error", "Please enter a valid email address.");
      input.focus();
      return;
    }

    // Loading
    form.setAttribute("data-loading", "true");
    submit.disabled = true;
    setStatus("idle", "Subscribing…");

    subscribe(value)
      .then(function () {
        setStatus("success", "You're on the list. Check your inbox to confirm.");
        form.reset();
      })
      .catch(function () {
        setStatus("error", "Something went wrong. Please try again in a moment.");
      })
      .then(function () {
        form.setAttribute("data-loading", "false");
        submit.disabled = false;
      });
  });
})();
