/* interaction_microkit_v1 — scroll-reveal-with-stagger (enhancement only).

   The micro-interactions (button/link/input/icon feedback) are pure CSS and
   need no JS. This script only adds the reveal choreography, and it is built so
   content is NEVER hidden unless we're certain we can reveal it:

   1. Add html.js-reveal ASAP so the CSS hidden start-state applies before the
      first paint (avoids a flash of the final state). We only do this when
      IntersectionObserver exists AND reduced-motion is NOT requested.
   2. Observe [data-reveal] elements; on enter, add .is-visible.
   3. Stagger: within a [data-reveal-group], each child gets an incremental
      --reveal-delay (default 90ms, or data-reveal-stagger override), capped so
      a long group never feels slow.

   If anything is unsupported or reduced-motion is on, we do nothing — the CSS
   default keeps everything visible.
*/
(function () {
  var docEl = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supported = 'IntersectionObserver' in window;

  // Bail conditions: leave content fully visible (CSS default state).
  if (reduceMotion || !supported) return;

  // Opt into the hidden start-state (applied before paint via this class).
  docEl.classList.add('js-reveal');

  function setup() {
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (!items.length) return;

    // Assign stagger delays per group.
    var groups = Array.prototype.slice.call(document.querySelectorAll('[data-reveal-group]'));
    groups.forEach(function (group) {
      var step = parseInt(group.getAttribute('data-reveal-stagger'), 10);
      if (isNaN(step)) step = 90;
      var children = Array.prototype.slice.call(group.querySelectorAll('[data-reveal]'))
        .filter(function (el) { return el.parentElement === group || group.contains(el); });
      // Only direct reveal descendants that belong to THIS group get staggered.
      var direct = children.filter(function (el) {
        return el.closest('[data-reveal-group]') === group;
      });
      direct.forEach(function (el, i) {
        // Cap the cumulative delay so big groups don't drag.
        var delay = Math.min(i * step, 360);
        el.style.setProperty('--reveal-delay', delay + 'ms');
      });
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

    items.forEach(function (el) { observer.observe(el); });

    // Safety: if for any reason the observer never fires (e.g. element already
    // fully in view with odd layout), reveal everything after a short grace
    // period so nothing can get stuck hidden.
    window.setTimeout(function () {
      items.forEach(function (el) {
        if (!el.classList.contains('is-visible')) {
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight) el.classList.add('is-visible');
        }
      });
    }, 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
