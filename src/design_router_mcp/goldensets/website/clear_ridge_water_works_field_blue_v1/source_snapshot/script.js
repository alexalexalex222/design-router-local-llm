/* Clear Ridge Water Works -- minimal vanilla interactions, no dependencies.
   1) Diagnostic issue selector (WAI-ARIA tabs pattern, full keyboard support)
   2) Quote form: inline validation, never loses input, success state
   3) Footer year */
(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Diagnostic issue selector (tabs) ---------- */
  var tablist = document.querySelector('.issue-tabs[role="tablist"]');
  if (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));

    var selectTab = function (tab, setFocus) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", String(selected));
        t.tabIndex = selected ? 0 : -1;
        t.classList.toggle("is-active", selected);
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) {
          panel.hidden = !selected;
          panel.classList.toggle("is-active", selected);
        }
      });
      if (setFocus) tab.focus();
    };

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () { selectTab(tab, false); });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        switch (e.key) {
          case "ArrowDown":
          case "ArrowRight":
            next = tabs[(index + 1) % tabs.length];
            break;
          case "ArrowUp":
          case "ArrowLeft":
            next = tabs[(index - 1 + tabs.length) % tabs.length];
            break;
          case "Home":
            next = tabs[0];
            break;
          case "End":
            next = tabs[tabs.length - 1];
            break;
          default:
            return;
        }
        e.preventDefault();
        selectTab(next, true);
      });
    });

    /* Link a chosen symptom into the quote form's <select> when the
       diagnostic CTA is followed (progressive enhancement only). */
    var issueMap = {
      "panel-no-water": "no-water",
      "panel-low-pressure": "low-pressure",
      "panel-cloudy": "cloudy",
      "panel-cycling": "cycling",
      "panel-filtration": "filtration"
    };
    var diagCta = document.querySelector(".diagnostic-cta");
    var issueSelect = document.getElementById("q-issue");
    if (diagCta && issueSelect) {
      diagCta.addEventListener("click", function () {
        var active = tabs.filter(function (t) { return t.getAttribute("aria-selected") === "true"; })[0];
        if (!active) return;
        var value = issueMap[active.getAttribute("aria-controls")];
        if (value) {
          issueSelect.value = value;
          var field = issueSelect.closest(".field");
          if (field) field.classList.remove("has-error");
          var err = document.getElementById("err-issue");
          if (err) err.textContent = "";
        }
      });
    }
  }

  /* ---------- Quote form validation ---------- */
  var form = document.getElementById("quote-form");
  if (!form) return;

  var statusEl = document.getElementById("form-status");
  var successEl = document.getElementById("form-success");
  var resetBtn = document.getElementById("form-reset");
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phoneRe = /[0-9]/; /* at least one digit */

  var rules = {
    "q-name": function (v) { return v.trim() ? "" : "Please enter your name."; },
    "q-phone": function (v) {
      if (!v.trim()) return "Please enter a phone number.";
      return phoneRe.test(v) ? "" : "Enter a number we can reach you on.";
    },
    "q-email": function (v) {
      if (!v.trim()) return ""; /* optional */
      return emailRe.test(v.trim()) ? "" : "Enter a valid email address.";
    },
    "q-issue": function (v) { return v ? "" : "Pick what your water is doing."; }
  };

  var setError = function (id, message) {
    var input = document.getElementById(id);
    var errEl = document.getElementById("err-" + id.replace("q-", ""));
    if (!input) return;
    var field = input.closest(".field");
    if (message) {
      if (field) field.classList.add("has-error");
      input.setAttribute("aria-invalid", "true");
      if (errEl) errEl.textContent = message;
    } else {
      if (field) field.classList.remove("has-error");
      input.removeAttribute("aria-invalid");
      if (errEl) errEl.textContent = "";
    }
  };

  var validateField = function (id) {
    var input = document.getElementById(id);
    if (!input || !rules[id]) return true;
    var message = rules[id](input.value);
    setError(id, message);
    return !message;
  };

  /* Validate on blur once touched; clear error as the user fixes it. */
  Object.keys(rules).forEach(function (id) {
    var input = document.getElementById(id);
    if (!input) return;
    input.addEventListener("blur", function () { validateField(id); });
    input.addEventListener("input", function () {
      if (input.closest(".field").classList.contains("has-error")) validateField(id);
    });
    input.addEventListener("change", function () { validateField(id); });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var firstInvalid = null;
    Object.keys(rules).forEach(function (id) {
      var ok = validateField(id);
      if (!ok && !firstInvalid) firstInvalid = document.getElementById(id);
    });

    if (firstInvalid) {
      if (statusEl) statusEl.textContent = "Please fix the highlighted fields and try again.";
      firstInvalid.focus();
      return;
    }

    /* Success -- no network call in this static reference build.
       Input is preserved in the form; we reveal the confirmation. */
    if (statusEl) statusEl.textContent = "";
    form.querySelectorAll("input, select, textarea, .form-submit").forEach(function (el) {
      el.disabled = true;
    });
    if (successEl) {
      successEl.hidden = false;
      successEl.setAttribute("tabindex", "-1");
      successEl.focus();
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      form.reset();
      form.querySelectorAll("input, select, textarea, .form-submit").forEach(function (el) {
        el.disabled = false;
      });
      Object.keys(rules).forEach(function (id) { setError(id, ""); });
      if (successEl) successEl.hidden = true;
      if (statusEl) statusEl.textContent = "";
      var nameField = document.getElementById("q-name");
      if (nameField) nameField.focus();
    });
  }
})();
