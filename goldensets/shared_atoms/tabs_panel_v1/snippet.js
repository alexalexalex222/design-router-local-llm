/* tabs_panel_v1 — WAI-ARIA tabs (progressive enhancement).
   Without JS every tabpanel is visible (stacked), so content is fully
   reachable. With JS we implement the Authoring-Practices tabs pattern:

   - Roving tabindex: the selected tab has tabindex="0"; the rest tabindex="-1".
     Tab moves INTO the tablist once, then arrow keys move between tabs.
   - ArrowRight/ArrowLeft move selection (wrapping); Home/End jump to ends.
   - Selecting a tab sets aria-selected, shows its panel, hides the others, and
     slides the active indicator.
   - This uses "automatic activation" (selection follows focus), which is the
     recommended default when panels are cheap to show.
*/
(function () {
  var root = document.getElementById('engage-tabs');
  if (!root) return;

  var tablist = root.querySelector('[role="tablist"]');
  var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
  var indicator = root.querySelector('.tabs__indicator');
  if (!tabs.length) return;

  function panelOf(tab) {
    return document.getElementById(tab.getAttribute('aria-controls'));
  }

  function moveIndicator(tab) {
    if (!indicator || !tablist) return;
    var listRect = tablist.getBoundingClientRect();
    var tabRect = tab.getBoundingClientRect();
    var x = tabRect.left - listRect.left + tablist.scrollLeft - parseFloat(getComputedStyle(tablist).paddingLeft);
    indicator.style.setProperty('--ind-w', tabRect.width + 'px');
    indicator.style.setProperty('--ind-x', x + 'px');
  }

  function selectTab(tab, opts) {
    opts = opts || {};
    tabs.forEach(function (t) {
      var selected = t === tab;
      t.setAttribute('aria-selected', selected ? 'true' : 'false');
      t.tabIndex = selected ? 0 : -1;
      var panel = panelOf(t);
      if (panel) panel.hidden = !selected;
    });
    moveIndicator(tab);
    if (opts.focus !== false) tab.focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab); });

    tab.addEventListener('keydown', function (e) {
      var next = null;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          next = tabs[(i + 1) % tabs.length];
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          next = tabs[(i - 1 + tabs.length) % tabs.length];
          break;
        case 'Home':
          next = tabs[0];
          break;
        case 'End':
          next = tabs[tabs.length - 1];
          break;
        default:
          return; // let other keys (Enter/Space activate via click) pass
      }
      e.preventDefault();
      selectTab(next);
    });
  });

  // Initialize from whichever tab is marked selected in the markup.
  var initial = tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0];
  selectTab(initial, { focus: false });

  // Keep the indicator aligned if the container resizes (font load, rotation).
  var current = function () {
    return tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0];
  };
  if ('ResizeObserver' in window && tablist) {
    new ResizeObserver(function () { moveIndicator(current()); }).observe(tablist);
  } else {
    window.addEventListener('resize', function () { moveIndicator(current()); });
  }
  // Re-measure after web fonts settle (tab widths can shift).
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { moveIndicator(current()); });
  }
})();
