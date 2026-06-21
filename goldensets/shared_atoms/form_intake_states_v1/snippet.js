/* form_intake_states_v1 — progressive-enhancement validation + async demo.
   Without this file the form is a normal POST form with native validation
   (required + type=email). With it, we own validation so we can demonstrate
   the full inline-error / loading / success state vocabulary.

   Accessibility contract:
   - On error: set aria-invalid="true" AND wire aria-describedby to a real
     message element so the field announces its error.
   - On fix: remove both, restore original describedby (help text).
   - Submit: disable button + loading spinner; announce via role=status region.
*/
(function () {
  var form = document.getElementById('intake-form');
  if (!form) return;

  var statusEl  = document.getElementById('form-status');
  var submitBtn = document.getElementById('intake-submit');
  var successEl = document.getElementById('intake-success');
  var resetBtn  = document.getElementById('intake-reset');
  var nameOut   = document.getElementById('success-name');

  // Field definitions: id, the validator, and the error message.
  var fields = [
    {
      id: 'f-name',
      help: 'f-name-help',
      validate: function (v) { return v.trim().length >= 2; },
      message: 'Please enter your name (at least 2 characters).'
    },
    {
      id: 'f-email',
      help: 'f-email-help',
      validate: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
      message: 'Enter a valid email so we can reply.'
    },
    {
      id: 'f-message',
      help: 'f-message-help',
      validate: function (v) { return v.trim().length >= 10; },
      message: 'A little more detail helps — at least 10 characters.'
    }
  ];

  function errorId(fieldId) { return fieldId + '-error'; }

  function showError(field) {
    var input = document.getElementById(field.id);
    if (!input) return;
    input.setAttribute('aria-invalid', 'true');

    var err = document.getElementById(errorId(field.id));
    if (!err) {
      err = document.createElement('p');
      err.id = errorId(field.id);
      err.className = 'field__error';
      input.insertAdjacentElement('afterend', err);
    }
    err.textContent = field.message;
    // Point the field's description at BOTH help text and the error message.
    input.setAttribute('aria-describedby', field.help + ' ' + errorId(field.id));
  }

  function clearError(field) {
    var input = document.getElementById(field.id);
    if (!input) return;
    input.removeAttribute('aria-invalid');
    input.setAttribute('aria-describedby', field.help);
    var err = document.getElementById(errorId(field.id));
    if (err) err.remove();
  }

  // Validate one field; return true if valid.
  function check(field) {
    var input = document.getElementById(field.id);
    var ok = field.validate(input.value);
    if (ok) { clearError(field); } else { showError(field); }
    return ok;
  }

  // Re-validate a field on blur, but only after it's been touched once, so we
  // don't yell at people mid-typing (good-form UX weak models miss).
  fields.forEach(function (field) {
    var input = document.getElementById(field.id);
    if (!input) return;
    input.addEventListener('blur', function () {
      if (input.dataset.touched) check(field);
    });
    input.addEventListener('input', function () {
      input.dataset.touched = '1';
      // Clear an existing error as soon as the value becomes valid.
      if (input.getAttribute('aria-invalid') === 'true' && field.validate(input.value)) {
        clearError(field);
        if (statusEl) statusEl.textContent = '';
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var firstInvalid = null;
    var allValid = true;
    fields.forEach(function (field) {
      var ok = check(field);
      if (!ok) {
        allValid = false;
        if (!firstInvalid) firstInvalid = document.getElementById(field.id);
      }
    });

    if (!allValid) {
      statusEl.textContent = 'Please fix the highlighted fields and try again.';
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // ---- Loading state ----
    statusEl.textContent = '';
    submitBtn.classList.add('is-loading');
    submitBtn.setAttribute('disabled', '');
    submitBtn.setAttribute('aria-busy', 'true');
    var labelEl = submitBtn.querySelector('.btn__label');
    var originalLabel = labelEl ? labelEl.textContent : '';
    if (labelEl) labelEl.textContent = 'Sending…';

    // Simulated async request. A real integration replaces this with fetch().
    window.setTimeout(function () {
      // ---- Success state ----
      submitBtn.classList.remove('is-loading');
      submitBtn.removeAttribute('disabled');
      submitBtn.removeAttribute('aria-busy');
      if (labelEl) labelEl.textContent = originalLabel;

      var nameVal = document.getElementById('f-name').value.trim();
      if (nameOut) nameOut.textContent = nameVal || '[NAME]';

      form.hidden = true;
      successEl.hidden = false;
      // Move focus to the success heading region so SR users land on the result.
      successEl.setAttribute('tabindex', '-1');
      successEl.focus();
    }, 1400);
  });

  // Reset back to a fresh form.
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      form.reset();
      fields.forEach(clearError);
      form.querySelectorAll('input, textarea').forEach(function (el) {
        delete el.dataset.touched;
      });
      successEl.hidden = true;
      form.hidden = false;
      statusEl.textContent = '';
      var nameField = document.getElementById('f-name');
      if (nameField) nameField.focus();
    });
  }
})();
