// Koudelka portfolio — language toggle (DE default / EN), lightbox, mobile nav.
(function () {
  'use strict';
  var STORAGE_KEY = 'ke-lang';
  var els = document.querySelectorAll('[data-en]');

  // Capture the inline German text as the "de" value for each translatable node.
  els.forEach(function (el) {
    el._de = el.tagName === 'META' ? el.getAttribute('content') : el.textContent;
  });

  function setPressed(lang) {
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.langBtn === lang));
    });
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    els.forEach(function (el) {
      var val = lang === 'en' ? el.getAttribute('data-en') : el._de;
      if (val == null) return;
      if (el.tagName === 'META') el.setAttribute('content', val);
      else el.textContent = val;
    });
    setPressed(lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
    b.addEventListener('click', function () { apply(b.dataset.langBtn); });
  });

  // German is the default; only switch if a preference was saved.
  var saved;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  if (saved === 'en') apply('en');
  else setPressed('de');

  // Mobile navigation
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () { navLinks.classList.toggle('open'); });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  // Lightbox for the reference gallery
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCaption = document.getElementById('lbCaption');

  function closeLb() {
    lb.classList.remove('open');
    lbImg.src = '';
  }

  document.querySelectorAll('#gallery figure').forEach(function (fig) {
    fig.addEventListener('click', function () {
      var img = fig.querySelector('img');
      var cap = fig.querySelector('figcaption');
      lbImg.src = img.src;
      lbImg.alt = cap ? cap.textContent : img.alt;
      lbCaption.textContent = cap ? cap.textContent : '';
      lb.classList.add('open');
    });
  });

  // Click-to-play YouTube facade (avoids embed errors on load / file:// origin)
  var facade = document.getElementById('videoFacade');
  if (facade) {
    facade.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + facade.dataset.id + '?autoplay=1&rel=0';
      iframe.title = 'Koudelka';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      facade.parentNode.replaceChild(iframe, facade);
    });
  }

  var lbClose = document.getElementById('lbClose');
  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lb) lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lb.classList.contains('open')) closeLb();
  });
})();
