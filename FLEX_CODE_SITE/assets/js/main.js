/* FLEX CODE — site interactions. Vanilla JS, no dependencies. */
(function () {
  'use strict';

  var root = document.documentElement;
  var STORE = 'fc-theme';

  /* ---- Theme (light / dark) ----------------------------------------------
     The inline script in <head> has already applied the correct theme before
     first paint. This block only wires up the toggle and keeps the button
     label, aria state and browser theme-colour in step.                     */
  function currentTheme() {
    return root.getAttribute('data-theme') ||
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  function paintChrome(theme) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#060F1A' : '#FFFFFF');
  }
  function syncToggles(theme) {
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      var toDark = theme !== 'dark';
      var label = toDark ? btn.dataset.labelDark : btn.dataset.labelLight;
      if (label) { btn.setAttribute('aria-label', label); btn.setAttribute('title', label); }
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    });
  }
  function setTheme(theme, remember) {
    root.setAttribute('data-theme', theme);
    if (remember) { try { localStorage.setItem(STORE, theme); } catch (e) {} }
    paintChrome(theme);
    syncToggles(theme);
  }

  var initial = currentTheme();
  root.setAttribute('data-theme', initial);
  paintChrome(initial);
  syncToggles(initial);

  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
    });
  });

  /* Follow the OS while the visitor has not made an explicit choice. */
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onOS = function (e) {
      var saved = null;
      try { saved = localStorage.getItem(STORE); } catch (err) {}
      if (!saved) setTheme(e.matches ? 'dark' : 'light', false);
    };
    if (mq.addEventListener) mq.addEventListener('change', onOS);
    else if (mq.addListener) mq.addListener(onOS);
  }

  /* ---- Mobile navigation ---- */
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('site-nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        burger.focus();
      }
    });
  }

  /* ---- Header background on scroll ---- */
  var hdr = document.querySelector('.hdr');
  if (hdr) {
    var onScroll = function () { hdr.classList.toggle('hdr--scrolled', window.scrollY > 24); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- Animated counters ---- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = parseFloat(el.dataset.count),
            suffix = el.dataset.suffix || '', t0 = null, dur = 1400;
        function tick(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          var val = target * (1 - Math.pow(1 - p, 3));
          el.textContent = (target % 1 ? val.toFixed(1) : Math.round(val)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        co.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---- Decorative pixel field (echoes the logo's pixel dissolve) ---- */
  document.querySelectorAll('.pixfield').forEach(function (field) {
    var n = window.innerWidth < 700 ? 16 : 34, html = '';
    for (var i = 0; i < n; i++) {
      var s = 4 + Math.random() * 12;
      html += '<i style="width:' + s.toFixed(0) + 'px;height:' + s.toFixed(0) + 'px;left:' +
        (Math.random() * 100).toFixed(2) + '%;top:' + (Math.random() * 100).toFixed(2) +
        '%;animation-delay:' + (Math.random() * 5).toFixed(2) + 's;opacity:' +
        (0.12 + Math.random() * 0.45).toFixed(2) + '"></i>';
    }
    field.innerHTML = html;
  });

  /* ---- Contact / careers forms (front-end only until a backend is wired up) ---- */
  document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = form.querySelector('.form-ok');
      if (ok) { ok.classList.add('show'); ok.setAttribute('role', 'status'); ok.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
      form.reset();
    });
  });

  /* ---- Current year in footer ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
