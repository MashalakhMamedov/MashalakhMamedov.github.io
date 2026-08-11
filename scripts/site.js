/* Minimal progressive enhancement. Everything below is optional: the site is
   fully readable and navigable with JavaScript disabled. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mark JS as available only where it changes initial paint (reveal animation).
  if (!reduceMotion) document.body.classList.add('js');

  /* --- Theme -------------------------------------------------------------
     The attribute is already correct: an inline script in <head> set it
     before first paint. This only handles the toggle and, for a visitor who
     has never chosen, keeps following the operating system. */
  var root = document.documentElement;
  var themeBtn = document.getElementById('theme-toggle');
  var osLight = window.matchMedia('(prefers-color-scheme: light)');

  function stored() {
    try {
      var v = localStorage.getItem('theme');
      return v === 'light' || v === 'dark' ? v : null;
    } catch (e) {
      return null;
    }
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (themeBtn) {
      themeBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
      themeBtn.setAttribute('title', themeBtn.getAttribute('aria-label'));
    }
  }

  apply(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {
        /* private mode — the choice just will not survive the session */
      }
    });
  }

  if (typeof osLight.addEventListener === 'function') {
    osLight.addEventListener('change', function (e) {
      if (!stored()) apply(e.matches ? 'light' : 'dark');
    });
  }

  /* --- Mobile navigation ------------------------------------------------- */
  var toggle = document.querySelector('.masthead__toggle');
  var nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* --- Reveal on scroll --------------------------------------------------- */
  var revealables = document.querySelectorAll('.js-reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    Array.prototype.forEach.call(revealables, function (el) {
      observer.observe(el);
    });
  }

  /* --- Figure lightbox ---------------------------------------------------- */
  var dialog = document.getElementById('lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  var stage = dialog.querySelector('.lightbox__stage');
  var caption = dialog.querySelector('.lightbox__caption');
  var closeBtn = dialog.querySelector('.lightbox__close');
  var lastTrigger = null;

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest ? e.target.closest('.figure__zoom') : null;
    if (!trigger) return;

    var img = trigger.querySelector('img');
    if (!img) return;

    lastTrigger = trigger;
    stage.innerHTML = '';

    var clone = document.createElement('img');
    clone.src = img.currentSrc || img.src;
    clone.alt = img.alt;
    stage.appendChild(clone);

    caption.textContent = trigger.getAttribute('data-caption') || '';
    dialog.showModal();
  });

  function close() {
    dialog.close();
  }

  closeBtn.addEventListener('click', close);

  // Click on the backdrop (outside the image) closes.
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog || e.target === stage) close();
  });

  dialog.addEventListener('close', function () {
    stage.innerHTML = '';
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  });
})();
