/* Iron Circuit Fight Academy — progressive enhancement only.
   Vanilla JS, no dependencies. Every behavior degrades gracefully:
   with JS off the page is fully readable and the form posts natively. */
(function () {
  "use strict";

  // Mark JS available (drives accordion default-open fallback in CSS).
  document.documentElement.classList.remove("no-js");

  var prefersReduced = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("ic-year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Sticky nav: elevate on scroll ---------- */
  var header = document.querySelector(".ic-header");
  if (header) {
    var onScroll = function () {
      header.setAttribute("data-elevate", window.scrollY > 8 ? "true" : "false");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector(".ic-nav__toggle");
  var menu = document.getElementById("ic-nav-menu");
  if (toggle && menu) {
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    // Close after choosing a link or pressing Escape.
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Program selector: ARIA tabs with roving focus ---------- */
  document.querySelectorAll("[data-tabs]").forEach(function (group) {
    var tabs = Array.prototype.slice.call(group.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;

    var activate = function (tab, setFocus) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", String(selected));
        t.setAttribute("tabindex", selected ? "0" : "-1");
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !selected;
      });
      if (setFocus) tab.focus();
    };

    group.addEventListener("click", function (e) {
      var tab = e.target.closest('[role="tab"]');
      if (tab) activate(tab, false);
    });

    group.addEventListener("keydown", function (e) {
      var idx = tabs.indexOf(document.activeElement);
      if (idx < 0) return;
      var next = null;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown": next = tabs[(idx + 1) % tabs.length]; break;
        case "ArrowLeft":
        case "ArrowUp": next = tabs[(idx - 1 + tabs.length) % tabs.length]; break;
        case "Home": next = tabs[0]; break;
        case "End": next = tabs[tabs.length - 1]; break;
        default: return;
      }
      e.preventDefault();
      activate(next, true);
    });
  });

  /* ---------- FAQ accordion: disclosure pattern ---------- */
  document.querySelectorAll("[data-accordion]").forEach(function (acc) {
    acc.querySelectorAll(".ic-accordion__trigger").forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (!panel) return;
      // Start collapsed (JS present). CSS keeps it open when JS is absent.
      btn.setAttribute("aria-expanded", "false");
      panel.classList.remove("is-open");
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        // Under reduced motion the CSS transition is ~0ms, so the same
        // class toggle simply snaps open/closed — no separate code path needed.
        panel.classList.toggle("is-open", !open);
      });
    });
  });

  /* ---------- Trial booking form: inline validation, input preserved ---------- */
  var form = document.getElementById("ic-trial-form");
  if (form) {
    var success = document.getElementById("ic-form-success");

    var validators = {
      name: function (f) { return f.value.trim() ? "" : f.dataset.msg; },
      email: function (f) {
        var v = f.value.trim();
        if (!v) return "Enter your email so we can confirm.";
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : f.dataset.msg;
      },
      program: function (f) { return f.value ? "" : f.dataset.msg; },
      consent: function (f) { return f.checked ? "" : f.dataset.msg; }
    };

    var fields = Array.prototype.slice
      .call(form.querySelectorAll("[required]"))
      .filter(function (f) { return validators[f.name]; });

    // Seed each field's message from its paired error element.
    fields.forEach(function (f) {
      var err = form.querySelector('[data-error-for="' + f.id + '"]');
      if (err) f.dataset.msg = err.textContent.trim();
    });

    var showError = function (field, msg) {
      var err = form.querySelector('[data-error-for="' + field.id + '"]');
      var bad = Boolean(msg);
      field.setAttribute("aria-invalid", String(bad));
      if (err) {
        err.hidden = !bad;
        if (bad) err.textContent = msg;
      }
      return bad;
    };

    var validateField = function (field) {
      return showError(field, validators[field.name](field));
    };

    // Re-validate a field once it has been flagged, so errors clear as the user fixes them.
    fields.forEach(function (f) {
      var evt = f.type === "checkbox" || f.tagName === "SELECT" ? "change" : "blur";
      f.addEventListener(evt, function () {
        if (f.getAttribute("aria-invalid") === "true" || f.value) validateField(f);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // demo donor: never actually navigates away
      var firstBad = null;
      fields.forEach(function (f) {
        if (validateField(f) && !firstBad) firstBad = f;
      });
      if (firstBad) {
        if (success) success.hidden = true;
        firstBad.focus(); // move to first problem; input is untouched
        return;
      }
      // Success: reveal status, keep the form in place.
      if (success) {
        success.hidden = false;
        success.focus && success.setAttribute("tabindex", "-1");
        success.scrollIntoView({ block: "nearest", behavior: prefersReduced ? "auto" : "smooth" });
      }
      form.reset();
      fields.forEach(function (f) { f.setAttribute("aria-invalid", "false"); });
    });
  }
})();
