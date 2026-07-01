/* form_multistep_v1 — multi-step wizard (progressive enhancement).
   Without JS, every step <fieldset> is visible and the form is one normal POST.
   With JS we show one step at a time, validate per step, sync the progress
   indicator (aria-current="step"), build the review, and submit.

   Accessibility contract:
   - The active indicator <li> carries aria-current="step"; completed steps get
     data-state="complete", upcoming get "upcoming".
   - A role=status live region announces "Step X of N — Name".
   - Per-step validation errors go to a role=alert region AND set aria-invalid
     + aria-describedby on the offending field.
   - On step change, focus moves to that step's legend so SR/keyboard users land
     in the right place.
*/
(function () {
  var form = document.getElementById('wizard-form');
  if (!form) return;

  var steps      = Array.prototype.slice.call(form.querySelectorAll('.wizard__step'));
  var indicators = ['ind-1', 'ind-2', 'ind-3'].map(function (id) { return document.getElementById(id); });
  var backBtn    = document.getElementById('wizard-back');
  var nextBtn    = document.getElementById('wizard-next');
  var submitBtn  = document.getElementById('wizard-submit');
  var errorEl    = document.getElementById('wizard-error');
  var progressEl = document.getElementById('progress-text');
  var successEl  = document.getElementById('wizard-success');
  var stepNames  = ['Contact', 'Project', 'Review'];

  var current = 0; // 0-based

  // Per-step required fields + validators + messages.
  var validators = {
    'w-name':   { test: function (v) { return v.trim().length >= 2; }, msg: 'Enter your name (at least 2 characters).', help: 'w-name-help' },
    'w-email':  { test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }, msg: 'Enter a valid email.', help: 'w-email-help' },
    'w-type':   { test: function (v) { return v !== ''; }, msg: 'Choose a project type.', help: 'w-type-help' },
    'w-detail': { test: function (v) { return v.trim().length >= 10; }, msg: 'Add a little more detail (at least 10 characters).', help: 'w-detail-help' }
  };

  function fieldsIn(stepIndex) {
    return Array.prototype.slice.call(
      steps[stepIndex].querySelectorAll('input, select, textarea')
    ).filter(function (el) { return validators[el.id]; });
  }

  function setFieldError(input, message) {
    var v = validators[input.id];
    input.setAttribute('aria-invalid', 'true');
    var errId = input.id + '-error';
    var err = document.getElementById(errId);
    if (!err) {
      err = document.createElement('p');
      err.id = errId;
      err.className = 'field__error';
      input.insertAdjacentElement('afterend', err);
    }
    err.textContent = message;
    input.setAttribute('aria-describedby', v.help + ' ' + errId);
  }

  function clearFieldError(input) {
    var v = validators[input.id];
    input.removeAttribute('aria-invalid');
    if (v) input.setAttribute('aria-describedby', v.help);
    var err = document.getElementById(input.id + '-error');
    if (err) err.remove();
  }

  // Validate the currently-shown step. Returns true if valid.
  function validateStep(stepIndex) {
    var ok = true;
    var firstBad = null;
    fieldsIn(stepIndex).forEach(function (input) {
      var v = validators[input.id];
      if (v.test(input.value)) {
        clearFieldError(input);
      } else {
        setFieldError(input, v.msg);
        ok = false;
        if (!firstBad) firstBad = input;
      }
    });
    if (!ok) {
      errorEl.textContent = 'Please complete the highlighted fields to continue.';
      if (firstBad) firstBad.focus();
    } else {
      errorEl.textContent = '';
    }
    return ok;
  }

  function syncIndicators() {
    indicators.forEach(function (li, i) {
      if (!li) return;
      if (i < current) {
        li.setAttribute('data-state', 'complete');
        li.removeAttribute('aria-current');
      } else if (i === current) {
        li.setAttribute('data-state', 'current');
        li.setAttribute('aria-current', 'step');
      } else {
        li.setAttribute('data-state', 'upcoming');
        li.removeAttribute('aria-current');
      }
    });
    progressEl.textContent = 'Step ' + (current + 1) + ' of ' + steps.length + ' — ' + stepNames[current];
  }

  function buildReview() {
    var map = {
      name:   document.getElementById('w-name').value.trim() || '—',
      email:  document.getElementById('w-email').value.trim() || '—',
      type:   (function () {
        var sel = document.getElementById('w-type');
        return sel.value ? sel.options[sel.selectedIndex].text : '—';
      })(),
      detail: document.getElementById('w-detail').value.trim() || '—'
    };
    Object.keys(map).forEach(function (key) {
      var cell = form.querySelector('[data-review="' + key + '"]');
      if (cell) cell.textContent = map[key];
    });
  }

  function showStep(index, opts) {
    opts = opts || {};
    steps.forEach(function (s, i) { s.hidden = i !== index; });
    current = index;
    syncIndicators();

    backBtn.hidden   = index === 0;
    var isLast       = index === steps.length - 1;
    nextBtn.hidden   = isLast;
    submitBtn.hidden = !isLast;

    if (isLast) buildReview();

    // Move focus to the step's legend (unless we're initializing).
    if (opts.focus !== false) {
      var legend = steps[index].querySelector('.wizard__legend');
      if (legend) {
        legend.setAttribute('tabindex', '-1');
        legend.focus();
      }
    }
  }

  nextBtn.addEventListener('click', function () {
    if (validateStep(current)) showStep(current + 1);
  });

  backBtn.addEventListener('click', function () {
    errorEl.textContent = '';
    showStep(Math.max(0, current - 1));
  });

  // Clear a field's error as soon as it becomes valid while typing.
  Object.keys(validators).forEach(function (id) {
    var input = document.getElementById(id);
    if (!input) return;
    var handler = function () {
      if (input.getAttribute('aria-invalid') === 'true' && validators[id].test(input.value)) {
        clearFieldError(input);
        errorEl.textContent = '';
      }
    };
    input.addEventListener('input', handler);
    input.addEventListener('change', handler);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Re-validate everything as a final guard.
    for (var i = 0; i < steps.length; i++) {
      if (!validateStep(i)) { showStep(i); return; }
    }
    submitBtn.setAttribute('disabled', '');
    submitBtn.setAttribute('aria-busy', 'true');
    submitBtn.textContent = 'Sending…';

    // Simulated request — replace with fetch() to a real endpoint.
    window.setTimeout(function () {
      form.hidden = true;
      successEl.hidden = false;
      successEl.setAttribute('tabindex', '-1');
      successEl.focus();
    }, 1200);
  });

  // Initialize: collapse to a single step (enhancement turns multi-fieldset
  // page into a wizard).
  showStep(0, { focus: false });
})();
