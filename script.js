/* ===== SOMOS EDUCA CONSCIENTE — script.js ===== */

/* ---- Navbar scroll effect ---- */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

/* ---- Hamburger menu ---- */
(function () {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close when a link is clicked
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ---- Smooth scroll for nav links ---- */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.getElementById('navbar')?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ---- Tabs (A quiénes acompañamos) ---- */
(function () {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');
    });
  });
})();

/* ---- Animated counters (IntersectionObserver) ---- */
(function () {
  const counters = document.querySelectorAll('.circle-number');
  if (!counters.length) return;

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOutQuart(progress) * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => io.observe(c));
})();

/* ---- SVG circle progress animation ---- */
(function () {
  const circles = document.querySelectorAll('.circle-progress');
  if (!circles.length) return;

  const CIRCUMFERENCE = 2 * Math.PI * 50; // r=50

  function animateCircle(el) {
    const pct = parseFloat(el.dataset.percent) / 100;
    const duration = 1600;
    const start = performance.now();

    function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const offset = CIRCUMFERENCE - easeOutQuart(progress) * pct * CIRCUMFERENCE;
      el.style.strokeDashoffset = offset;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCircle(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  circles.forEach(c => {
    c.style.strokeDashoffset = CIRCUMFERENCE;
    io.observe(c);
  });
})();

/* ---- Scroll-based fade-in for sections ---- */
(function () {
  // Mark all section children for animation
  const sections = document.querySelectorAll(
    '.reflexion-card, .propuesta-card, .programa-card, .founder-card, ' +
    '.referente-card, .oportunidad-card, .impacto-card, .stat-circle'
  );

  sections.forEach(el => el.classList.add('animate-ready'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  sections.forEach(el => io.observe(el));
})();

/* ---- Staggered animation for cards in a grid ---- */
(function () {
  const grids = document.querySelectorAll(
    '.reflexion-cards, .propuesta-grid, .programas-grid, ' +
    '.referentes-grid, .oportunidades-grid, .impacto-cards, .stats-circles'
  );

  grids.forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
      child.style.transitionDelay = (i * 80) + 'ms';
    });
  });
})();
