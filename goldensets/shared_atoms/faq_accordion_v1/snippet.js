/* faq_accordion_v1 — accessible disclosure accordion (progressive enhancement).
   Without JS, every panel is open (the [hidden] attr is added BY this script on
   init, so no-JS users still read all answers). With JS:
   - Toggling flips aria-expanded and shows/hides the panel.
   - The grid-rows height transition runs unless reduced-motion is set, in which
     case we skip the [hidden] dance timing and collapse instantly.
   - Keyboard: ArrowUp/ArrowDown move between headers, Home/End jump to
     first/last (WAI-ARIA accordion pattern). Each is independently toggleable
     (not single-select), which is the most forgiving default.
*/
(function () {
  var root = document.getElementById('faq-accordion');
  if (!root) return;

  var triggers = Array.prototype.slice.call(root.querySelectorAll('.accordion__trigger'));
  if (!triggers.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // INIT: collapse all panels (no-JS left them open and readable).
  triggers.forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
    panel.classList.remove('is-open');
  });

  function openPanel(btn, panel) {
    btn.setAttribute('aria-expanded', 'true');
    panel.hidden = false;
    if (reduceMotion) {
      panel.classList.add('is-open');
      return;
    }
    // Next frame so the 0fr -> 1fr transition has a starting value to animate
    // from after [hidden] is cleared.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { panel.classList.add('is-open'); });
    });
  }

  function closePanel(btn, panel) {
    btn.setAttribute('aria-expanded', 'false');
    if (reduceMotion) {
      panel.classList.remove('is-open');
      panel.hidden = true;
      return;
    }
    panel.classList.remove('is-open');
    // After the collapse transition completes, re-apply [hidden] so the panel
    // is removed from the tab order and a11y tree.
    var onEnd = function (e) {
      if (e.propertyName !== 'grid-template-rows') return;
      panel.hidden = true;
      panel.removeEventListener('transitionend', onEnd);
    };
    panel.addEventListener('transitionend', onEnd);
  }

  function toggle(btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    var expanded = btn.getAttribute('aria-expanded') === 'true';
    if (expanded) { closePanel(btn, panel); } else { openPanel(btn, panel); }
  }

  triggers.forEach(function (btn, i) {
    btn.addEventListener('click', function () { toggle(btn); });

    btn.addEventListener('keydown', function (e) {
      var idx = i;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          triggers[(idx + 1) % triggers.length].focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          triggers[(idx - 1 + triggers.length) % triggers.length].focus();
          break;
        case 'Home':
          e.preventDefault();
          triggers[0].focus();
          break;
        case 'End':
          e.preventDefault();
          triggers[triggers.length - 1].focus();
          break;
        default:
          break;
      }
    });
  });
})();
