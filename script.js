// Casa Conceito — interactions

document.addEventListener('DOMContentLoaded', () => {
  // ── Loader — 3s loading experience
  (() => {
    const bar  = document.getElementById('loaderBar');
    const pct  = document.getElementById('loaderPct');
    const loader = document.getElementById('loader');
    if (!bar || !loader) return;

    const DURATION = 3000; // ms
    const start = performance.now();

    // Ease-out cubic: fast start, slows near end
    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

    // Kick the CSS bar transition
    requestAnimationFrame(() => bar.classList.add('run'));

    // Animated counter
    function tick(now) {
      const elapsed = now - start;
      const t = Math.min(elapsed / DURATION, 1);
      const eased = easeOutCubic(t);
      if (pct) pct.textContent = Math.round(eased * 100);
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        // Tiny pause at 100 before fade
        setTimeout(() => loader.classList.add('gone'), 320);
      }
    }
    requestAnimationFrame(tick);
  })();

  // ── Form panel collapse/expand
  const panel = document.getElementById('formPanel');
  const strip = document.getElementById('formStrip');
  if (strip && panel) {
    strip.addEventListener('click', () => {
      panel.classList.toggle('collapsed');
      document.body.classList.toggle('collapsed', panel.classList.contains('collapsed'));
    });
  }

  // ── CTA buttons that open the form panel
  const nav = document.querySelector('.nav');
  const menuToggle = document.querySelector('.nav-menu-toggle');
  const menuLinks = document.querySelectorAll('.nav-links a');
  if (nav && menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav-open');
      document.body.classList.toggle('nav-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav-open');
        document.body.classList.remove('nav-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }

  document.querySelectorAll('.cta-form').forEach(btn => {
    btn.addEventListener('click', () => {
      if (panel) {
        panel.classList.remove('collapsed');
        document.body.classList.remove('collapsed');
        // Smooth scroll to top of form
        setTimeout(() => {
          const fc = document.querySelector('.form-content');
          if (fc) fc.scrollTop = 0;
        }, 350);
      }
    });
  });

  // ── Form submit
  const form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      btn.innerHTML = 'Recebido <span class="arrow">✓</span>';
      btn.style.background = 'var(--gold-bright)';
      setTimeout(() => {
        form.reset();
        btn.innerHTML = 'Reservar interesse <span class="arrow">→</span>';
        btn.style.background = '';
      }, 2800);
    });
  }

  // ── Generic fade-in observer
  const io = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('in');
        io.unobserve(ent.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

  // ── Manifesto line-by-line reveal
  const manifestoLines = document.querySelectorAll('.manifesto-text .reveal');
  const mio = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('lit');
        mio.unobserve(ent.target);
      }
    });
  }, { threshold: 0.7 });
  manifestoLines.forEach(el => mio.observe(el));

  // ── Plan tabs
  const planTabs = document.querySelectorAll('.plan-tab');
  const planImgs = document.querySelectorAll('.plan-img');
  const planArea = document.querySelector('.plan-area-badge');
  const planAreas = ['274','274','274'];
  planTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const i = tab.dataset.plan;
      planTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      planImgs.forEach(s => s.classList.add('hidden'));
      const target = document.querySelector(`.plan-img[data-plan="${i}"]`);
      if (target) target.classList.remove('hidden');
      if (planArea) planArea.innerHTML = `${planAreas[i]}<em>m² · planta ${tab.querySelector('.name').textContent}</em>`;
    });
  });

  // ── Floors scroll-driven animation
  const floorsScroll = document.querySelector('.floors-scroll');
  const floorCards = document.querySelectorAll('.floor-card');
  const floorMarkers = document.querySelectorAll('.floor-marker');
  const floorsProgress = document.querySelector('.floors-progress');
  const progressDots = document.querySelectorAll('.floors-progress .dot');
  const progressCounter = document.querySelector('.floors-progress .counter');
  const tower = document.querySelector('.floors-tower img');

  // Cache absolute position once (recalculate on resize)
  let _floorsTop = 0;
  let _floorsHeight = 0;

  function cacheFloorsMetrics() {
    if (!floorsScroll) return;
    // Walk up the DOM to get true offsetTop from document top
    let el = floorsScroll, top = 0;
    while (el) { top += el.offsetTop; el = el.offsetParent; }
    _floorsTop = top;
    _floorsHeight = floorsScroll.offsetHeight;
  }

  function updateFloors() {
    if (!floorsScroll || _floorsHeight === 0) return;
    const total = _floorsHeight - window.innerHeight;
    if (total <= 0) return;

    const scrolled = Math.max(0, Math.min(total, window.scrollY - _floorsTop));
    const progress = scrolled / total;

    // Show progress dots only while in sticky phase
    const inSticky = window.scrollY >= _floorsTop && window.scrollY <= _floorsTop + total;
    if (floorsProgress) floorsProgress.classList.toggle('show', inSticky);

    const n = floorCards.length;
    // Each card occupies 1/n of progress range; last card holds until end
    const idx = Math.min(n - 1, Math.floor(progress * n));

    floorCards.forEach((c, i) => c.classList.toggle('active', i === idx));
    floorMarkers.forEach((m, i) => m.classList.toggle('active', i === idx));
    progressDots.forEach((d, i) => d.classList.toggle('active', i === idx));
    if (progressCounter) progressCounter.textContent = `0${idx + 1}/0${n}`;

    // Tower image: start at top, pan downward — acceleration curve
    if (tower) {
      // Quadratic ease-in: slow start, accelerates as you scroll deeper
      const easedProgress = progress * progress;
      // 1.5× speed multiplier → full pan completes at ~82% of section scroll
      const pan = Math.min(100, easedProgress * 150);
      tower.style.objectPosition = `50% ${pan.toFixed(2)}%`;
      tower.style.transform = `scale(1.04)`;
    }
  }

  cacheFloorsMetrics();
  updateFloors();
  window.addEventListener('scroll', updateFloors, { passive: true });
  window.addEventListener('resize', () => { cacheFloorsMetrics(); updateFloors(); });

  // ── Hero parallax
  const heroBg = document.querySelector('.hero-bg');

  // ── Multi-target parallax system
  // Each parallax target has a [data-parallax-speed] attribute.
  // The element is translated vertically based on its position relative to viewport center.
  const parallaxEls = [];
  document.querySelectorAll('[data-parallax-speed]').forEach(el => {
    parallaxEls.push({ el, speed: parseFloat(el.dataset.parallaxSpeed) });
  });

  // Also add location images as parallax targets
  document.querySelectorAll('.axis-side .img img').forEach(img => {
    parallaxEls.push({ el: img, speed: 0.1, direct: true });
  });

  function updateParallax() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    // Hero
    if (heroBg && scrollY < vh) {
      heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
    }

    // All registered parallax elements
    parallaxEls.forEach(({ el, speed, direct }) => {
      const parent = el.closest('section, .atm-divider, .gallery-cell') || el.parentElement;
      const rect = parent.getBoundingClientRect();
      // Only animate when element is near viewport
      if (rect.bottom < -vh || rect.top > vh * 2) return;
      const centerOffset = rect.top + rect.height / 2 - vh / 2;
      const shift = centerOffset * speed;
      if (direct) {
        el.style.transform = `translateY(${-shift * 0.5}px)`;
      } else {
        el.style.transform = `translateY(${shift}px)`;
      }
    });
  }

  // ── Scroll progress bar
  const progressBar = document.getElementById('scrollProgress');
  function updateProgress() {
    if (!progressBar) return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = ((window.scrollY / total) * 100).toFixed(2) + '%';
  }

  // ── Stagger IntersectionObserver
  const staggerObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); staggerObs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.stagger').forEach(el => staggerObs.observe(el));

  // ── Active nav on scroll
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sectionIds = [...navLinks].map(a => a.getAttribute('href').slice(1));
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  function updateActiveNav() {
    const mid = window.innerHeight * 0.45;
    let current = null;
    sections.forEach(sec => {
      const r = sec.getBoundingClientRect();
      if (r.top <= mid && r.bottom > mid) current = sec.id;
    });
    // fallback: topmost section above viewport mid
    if (!current) {
      const above = sections.filter(s => s.getBoundingClientRect().bottom < mid);
      if (above.length) current = above[above.length - 1].id;
    }
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  updateActiveNav();

  // ── Combined scroll handler
  window.addEventListener('scroll', () => {
    updateParallax();
    updateProgress();
    updateActiveNav();
  }, { passive: true });

  window.addEventListener('resize', () => {
    updateParallax();
  });

  updateParallax();
  updateProgress();
});
