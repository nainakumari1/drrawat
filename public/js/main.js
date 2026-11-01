(function () {
  'use strict';
  var doc = document;

  // Header shadow on scroll
  var header = doc.querySelector('.site-header');
  function onScroll() { header && header.classList.toggle('scrolled', window.scrollY > 10); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var burger = doc.querySelector('.burger');
  var menu = doc.getElementById('menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      doc.body.style.overflow = open ? 'hidden' : '';
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        doc.body.style.overflow = '';
      }
    });
  }

  // Scroll reveal
  var items = [].slice.call(doc.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Count-up numbers
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var counters = [].slice.call(doc.querySelectorAll('.count'));
  function fmt(el, v) {
    var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    return v.toFixed(dec) + (el.getAttribute('data-suffix') || '');
  }
  function run(el) {
    var to = parseFloat(el.getAttribute('data-to'));
    if (reduce) { el.textContent = fmt(el, to); return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(el, to * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = fmt(el, parseFloat(el.getAttribute('data-to'))); });
  }

  // Appointment form: no past dates, and a time inside clinic hours (10-2, 5-8)
  var d = doc.getElementById('f-date');
  if (d) {
    var t = new Date(); t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
    d.min = t.toISOString().slice(0, 10);
  }
  var tm = doc.getElementById('f-time');
  if (tm) {
    tm.addEventListener('change', function () {
      var p = tm.value.split(':'), m = parseInt(p[0], 10) * 60 + parseInt(p[1] || '0', 10);
      var ok = !tm.value || (m >= 600 && m <= 840) || (m >= 1020 && m <= 1200);
      tm.setCustomValidity(ok ? '' : 'Clinic hours are 10 AM to 2 PM and 5 PM to 8 PM. Please pick a time in those hours.');
      if (!ok) tm.reportValidity();
    });
  }

  // Scroll progress bar
  var bar = doc.createElement('div'); bar.className = 'progress'; bar.setAttribute('aria-hidden', 'true');
  doc.body.appendChild(bar);
  function prog() {
    var h = doc.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(window.scrollY / h, 1) : 0) + ')';
  }
  window.addEventListener('scroll', prog, { passive: true }); prog();

  // Gentle 3D tilt on cards (mouse only)
  if (!reduce && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    [].slice.call(doc.querySelectorAll('.tilt')).forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'perspective(700px) rotateX(' + (-y * 6).toFixed(2) + 'deg) rotateY(' + (x * 7).toFixed(2) + 'deg) translateY(-4px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }
})();
