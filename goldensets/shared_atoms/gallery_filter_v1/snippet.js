/* gallery_filter_v1 — filter chips (progressive enhancement).
   Without JS every chip and every tile is visible and the empty state stays
   hidden, so all work is reachable. With JS:
   - Chips are single-select toggle buttons: clicking one sets its
     aria-pressed="true" and the rest to "false" (radio-like, but kept as
     buttons because each represents an independent on/off filter target).
   - Matching tiles get [hidden] removed; non-matching get [hidden].
   - A role=status live region announces the result count.
   - If a filter matches zero tiles, the graceful empty state is shown.
*/
(function () {
  var root = document.getElementById('gallery-chips');
  var grid = document.getElementById('gallery-grid');
  var statusEl = document.getElementById('gallery-status');
  var emptyEl = document.getElementById('gallery-empty');
  var emptyReset = document.getElementById('gallery-empty-reset');
  if (!root || !grid) return;

  var chips = Array.prototype.slice.call(root.querySelectorAll('.chip'));
  var tiles = Array.prototype.slice.call(grid.querySelectorAll('.tile'));

  function applyFilter(filter) {
    var shown = 0;
    tiles.forEach(function (tile) {
      var match = filter === 'all' || tile.getAttribute('data-category') === filter;
      tile.hidden = !match;
      if (match) shown++;
    });

    // Empty state
    if (emptyEl) emptyEl.hidden = shown !== 0;
    grid.hidden = shown === 0;

    // Announce
    if (statusEl) {
      if (shown === 0) {
        statusEl.textContent = 'No projects in this category.';
      } else {
        var label = filter === 'all' ? 'all categories' : filter;
        statusEl.textContent = 'Showing ' + shown + ' project' + (shown === 1 ? '' : 's') + ' in ' + label + '.';
      }
    }
  }

  function selectChip(chip) {
    chips.forEach(function (c) {
      c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
    });
    applyFilter(chip.getAttribute('data-filter'));
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () { selectChip(chip); });
  });

  if (emptyReset) {
    emptyReset.addEventListener('click', function () {
      var allChip = chips.filter(function (c) { return c.getAttribute('data-filter') === 'all'; })[0];
      if (allChip) { selectChip(allChip); allChip.focus(); }
    });
  }

  // Initialize from whichever chip is pressed in markup (default: All).
  var initial = chips.filter(function (c) { return c.getAttribute('aria-pressed') === 'true'; })[0] || chips[0];
  if (initial) applyFilter(initial.getAttribute('data-filter'));
})();
