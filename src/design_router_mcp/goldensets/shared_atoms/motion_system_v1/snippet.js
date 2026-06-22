// Scroll-aware header: hide on scroll down, reveal on scroll up
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var lastY = 0;
  var ticking = false;
  var threshold = 20;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y > lastY + threshold && y > 80) {
          header.classList.add('header-hidden');
        } else if (y < lastY - threshold) {
          header.classList.remove('header-hidden');
        }
        lastY = y;
        ticking = false;
      });
      ticking = true;
    }
  });
})();

// Section entrance: IntersectionObserver-driven reveal
(function () {
  var targets = document.querySelectorAll('.reveal-on-scroll');
  if (!targets.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach(function (el) {
      el.classList.add('in-view');
    });
    return;
  }
  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) {
      el.classList.add('in-view');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();
