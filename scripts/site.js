/*
 * The site is six static pages. Everything that matters works with JavaScript
 * disabled: navigation is real links, figures are real images, the video is a
 * real file with native controls.
 *
 * The only behaviour here is the narrow-viewport menu, which needs its
 * aria-expanded state kept truthful.
 */
(function () {
  'use strict';

  var toggle = document.getElementById('navtoggle');
  var bar = toggle && toggle.closest('.hd');
  if (!toggle || !bar) return;

  function setOpen(open) {
    bar.setAttribute('data-open', open ? 'true' : 'false');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  setOpen(false);

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Following a link inside the menu should close it again.
  var nav = document.getElementById('primary-nav');
  if (nav) {
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
})();
