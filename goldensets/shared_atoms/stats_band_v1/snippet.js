/* =========================================================================
   stats_band_v1 — count-up enhancement
   Progressive enhancement only. The band is fully readable with JS disabled:
   markup shows the [STAT_VALUE] placeholder (or your real value) as-is.

   Behaviour:
   - A stat animates ONLY if it has a numeric data-count-to (digits/decimal).
   - The tween starts when the band scrolls into view (IntersectionObserver),
     once per element.
   - Under prefers-reduced-motion: reduce, OR if IntersectionObserver is
     unavailable, the final value is written immediately with NO animation.
   - data-prefix / data-suffix wrap the number (e.g. "$", "%", "k", "+").

   DATA INTEGRITY: this script never invents numbers. If data-count-to is empty
   or non-numeric, it leaves the existing text untouched.
   ========================================================================= */
(function () {
  "use strict";

  var band = document.querySelector(".stats");
  if (!band) return;

  var values = Array.prototype.slice.call(band.querySelectorAll(".stat__value"));
  if (!values.length) return;

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Format an integer with thousands separators, preserving decimals if asked.
  function format(n, decimals) {
    if (decimals > 0) {
      return n.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }
    return Math.round(n).toLocaleString();
  }

  function render(el, n, decimals) {
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    el.textContent = prefix + format(n, decimals) + suffix;
  }

  function parseTarget(el) {
    var raw = el.getAttribute("data-count-to");
    if (raw == null) return null;
    raw = raw.trim();
    if (raw === "") return null;
    var num = Number(raw.replace(/,/g, ""));
    if (!isFinite(num)) return null;
    var dot = raw.indexOf(".");
    var decimals = dot === -1 ? 0 : raw.length - dot - 1;
    return { value: num, decimals: decimals };
  }

  // Animate one stat from 0 -> target using rAF (transform/opacity-free; it is
  // text, so we tween the number and let CSS animate the underline via a class).
  function animate(el, target) {
    var duration = 1100; // count-up read window; CSS interaction motion stays 150-250ms
    var start = null;

    function ease(t) { return 1 - Math.pow(1 - t, 3); } // easeOutCubic

    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      render(el, target.value * ease(p), target.decimals);
      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        render(el, target.value, target.decimals);
        markCounted(el);
      }
    }
    requestAnimationFrame(frame);
  }

  function markCounted(el) {
    var stat = el.closest(".stat");
    if (stat) stat.classList.add("is-counted");
  }

  function settleStatic(el, target) {
    // No animation: show final number (or leave placeholder if none) + reveal underline.
    if (target) render(el, target.value, target.decimals);
    markCounted(el);
  }

  // ---- Reduced motion OR no IO: settle immediately, no tween. ----
  if (prefersReduced || typeof IntersectionObserver === "undefined") {
    values.forEach(function (el) {
      settleStatic(el, parseTarget(el));
    });
    return;
  }

  // ---- Normal path: count up when each stat enters the viewport, once. ----
  var io = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        observer.unobserve(el);
        var target = parseTarget(el);
        if (target) {
          animate(el, target);          // real number supplied -> tween
        } else {
          markCounted(el);              // placeholder only -> just reveal underline
        }
      });
    },
    { threshold: 0.4, rootMargin: "0px 0px -10% 0px" }
  );

  values.forEach(function (el) { io.observe(el); });
})();
