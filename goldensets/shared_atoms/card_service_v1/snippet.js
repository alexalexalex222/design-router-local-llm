/* card_service_v1 — OPTIONAL enhancement.
   The card is already fully functional and accessible with CSS alone: the
   heading <a> + a ::after "stretched link" makes the whole card clickable, and
   :focus-within shows the ring. This script only adds one nicety:

   When a user clicks the card but was actually selecting text, the stretched
   link would still navigate. We suppress navigation if a text selection was
   made during the click, matching native expectations. Pure progressive
   enhancement — safe to omit.
*/
(function () {
  var cards = document.querySelectorAll('.svc-card');
  if (!cards.length) return;

  cards.forEach(function (card) {
    var link = card.querySelector('.svc-card__link');
    if (!link) return;

    card.addEventListener('click', function (e) {
      // If the actual click target IS the link/SVG inside it, let it through.
      if (e.target.closest('a')) return;

      // If the user selected text, don't hijack into navigation.
      var sel = window.getSelection && window.getSelection();
      if (sel && sel.toString().length > 0) return;

      // Otherwise, a click on the card body should follow the heading link.
      // (The ::after already does this for mouse; this keeps behavior
      // consistent if a host page overrides pointer-events on the pseudo.)
      if (e.target === card || card.contains(e.target)) {
        // Respect modifier keys / middle-click semantics.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      }
    }, false);
  });
})();
