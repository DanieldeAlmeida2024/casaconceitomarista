// Casa Conceito — interactions

document.addEventListener('DOMContentLoaded', () => {
  const LOADER_CONFIG = {
    duration: 3000,
    order: ['label', 'secondaryLabel', 'line', 'brandRow'],
    label: {
      type: 'image',
      src: 'assets/logo-terral-conceito.png',
      alt: 'Terral Conceito',
      height: '52px'
    },
    secondaryLabel: 'apresenta:',
    brandLabel: '',
    backgroundImage: 'img/loader-bg.jpg',
    logo: {
      type: 'image',
      src: 'assets/logo-casa-conceito.png',
      alt: 'Casa Conceito Marista'
    },
    backgroundOpacity: '.55',
    logoHeight: '42px',
    labelSpacing: '.42em',
    secondaryLabelSpacing: '.18em',
    brandLabelSpacing: '.24em'
  };

  const PLAN_DATA = [
    {
      id: 0,
      name: 'Tipo',
      area: '274',
      suites: '4',
      image: 'img/planta-tipo.jpg',
      specs: 'Integrados · 274m²',
      badgeLabel: 'ambiente',
      features: [
        { label: 'lavabo' },
        { label: 'varanda' },
        { label: 'churrasqueira\na carvão' }
      ]
    },
    {
      id: 1,
      name: 'Opcional',
      area: '274',
      suites: '4',
      image: 'img/planta-opcional.jpg',
      badgeLabel: 'ambiente',
      specs: '4 suítes varanda integrada · 274m²',
      features: [
        { label: 'lavabo' },
        { label: 'varanda integrada <br>com churrasqueira a carvão' }
      ]
    },
    {
      id: 2,
      name: 'Suíte Master',
      area: '274',
      suites: '3',
      image: 'img/planta-decorado.jpg',
      badgeLabel: 'ambiente',
      specs: '3 suites master / super closet · 274m²',
      features: [
        {label: 'suíte master', sublabel: 'com super closet e 2 banhos master' },
        { label: 'varanda\ngourmet' },
        { label: 'churrasqueira\na carvão' }
      ]
    }
  ];

  const PLAN_LAYOUT_DATA = [
    {
      id: 0,
      name: 'Tipo',
      area: '274',
      suites: '4',
      floor: 'Pavimento inteiro',
      badgeLabel: 'planta',
      specs: '4 suites · 274m²', 
      features: [
        { number: '4', label: 'suítes', sublabel: 'com closet' },
        { label: 'lavabo' },
        { label: 'varanda' },
        { label: 'churrasqueria a carvão' }
      ]
    },
    {
      id: 1,
      name: 'Opcional',
      area: '274',
      suites: '4',
      badgeLabel: 'planta',
      specs: '4 suites varanda integrada · 274m²',
      features: [
        { number: '4', label: 'suítes', sublabel: 'com closet' },
        { label: 'lavabo' },
        { label: 'varanda integrada<br>com churrasqueira\na carvão' }
      ]
    },
    {
      id: 2,
      name: 'Suíte Master',
      area: '274',
      suites: '3',
      floor: 'Pavimento inteiro',
      specs: '3 suites master / super closet · 274m²',
      badgeLabel: 'planta',
      features: [
        { number: '3', label: 'suítes', sublabel: 'sendo a master com<br>super closet e 2 banhos' },
        { label: 'lavabo' },
        { label: 'varanda integrada<br>com churrasqueira a carvão' }
      ]
    }
  ];

    // ── Loader — 3s loading experience
  (() => {
    const bar  = document.getElementById('loaderBar');
    const pct  = document.getElementById('loaderPct');
    const loader = document.getElementById('loader');
    if (!bar || !loader) return;

    const bgImg = loader.querySelector('.loader-bg img');
    const mark = loader.querySelector('.loader-mark');
    const logo = loader.querySelector('.loader-logo');
    const line = loader.querySelector('.loader-line');
    const label = loader.querySelector('.lab2');
    let secondaryLabel = loader.querySelector('.lab3');
    let brandLabel = loader.querySelector('.lab4');
    let brandRow = loader.querySelector('.loader-brand-row');
    if (mark && !secondaryLabel) {
      secondaryLabel = document.createElement('div');
      secondaryLabel.className = 'lab3';
    }
    if (mark && !brandLabel) {
      brandLabel = document.createElement('div');
      brandLabel.className = 'lab4';
    }
    if (mark && !brandRow) {
      brandRow = document.createElement('div');
      brandRow.className = 'loader-brand-row';
    }

    function isLoaderImage(value) {
      if (!value) return false;
      if (typeof value === 'object') return value.type === 'image' || Boolean(value.src);
      return /\.(png|jpe?g|webp|svg|gif)$/i.test(String(value).split('?')[0]);
    }

    function createLoaderImage(value, className) {
      const config = typeof value === 'object' ? value : { src: value };
      if (!config.src) return null;
      const img = document.createElement('img');
      img.src = config.src;
      img.alt = config.alt || '';
      img.className = config.className || className || 'loader-field-img';
      if (config.width) img.style.width = config.width;
      if (config.height) img.style.height = config.height;
      if (config.maxWidth) img.style.maxWidth = config.maxWidth;
      return img;
    }

    function setLoaderField(el, value, imageClassName) {
      if (!el) return;
      el.replaceChildren();
      el.hidden = !value;
      if (!value) return;
      if (isLoaderImage(value)) {
        const img = createLoaderImage(value, imageClassName);
        if (img) el.appendChild(img);
        return;
      }
      const textValue = typeof value === 'object' && value.text !== undefined ? value.text : value;
      String(textValue || '').replace(/<br\s*\/?>/gi, '\n').split('\n').forEach((part, index) => {
        if (index) el.appendChild(document.createElement('br'));
        el.appendChild(document.createTextNode(part));
      });
    }

    function setLoaderImage(el, value) {
      if (!el) return;
      const config = typeof value === 'object' ? value : { src: value };
      if (!config.src) {
        el.hidden = true;
        return;
      }
      el.hidden = false;
      el.src = config.src;
      el.alt = config.alt || el.alt || '';
      if (config.className) el.className = config.className;
      if (config.width) el.style.width = config.width;
      if (config.height) el.style.height = config.height;
      if (config.maxWidth) el.style.maxWidth = config.maxWidth;
    }

    setLoaderImage(bgImg, LOADER_CONFIG.backgroundImage);
    setLoaderImage(logo, LOADER_CONFIG.logo);
    setLoaderField(label, LOADER_CONFIG.label);
    setLoaderField(secondaryLabel, LOADER_CONFIG.secondaryLabel);
    setLoaderField(brandLabel, LOADER_CONFIG.brandLabel);
    if (brandRow && brandLabel && logo) {
      brandRow.replaceChildren(brandLabel, logo);
    }
    if (mark) {
      const loaderItems = { label, secondaryLabel, brandLabel, logo, line, brandRow };
      LOADER_CONFIG.order.forEach(key => {
        if (loaderItems[key]) mark.appendChild(loaderItems[key]);
      });
    }
    loader.style.setProperty('--loader-duration', `${LOADER_CONFIG.duration}ms`);
    loader.style.setProperty('--loader-bg-opacity', LOADER_CONFIG.backgroundOpacity);
    loader.style.setProperty('--loader-logo-height', LOADER_CONFIG.logoHeight);
    loader.style.setProperty('--loader-label-spacing', LOADER_CONFIG.labelSpacing);
    loader.style.setProperty('--loader-secondary-label-spacing', LOADER_CONFIG.secondaryLabelSpacing);
    loader.style.setProperty('--loader-brand-label-spacing', LOADER_CONFIG.brandLabelSpacing);

    const DURATION = LOADER_CONFIG.duration; // ms
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
document.querySelectorAll('.plan-tabs').forEach(group => {
  const tabs = group.querySelectorAll('.plan-tab[data-plan]');
  if (!tabs.length) return;

  const product = group.closest('.product');
  const planImgs = product ? product.querySelectorAll('.plan-img[data-plan]') : [];
  const planArea = product ? product.querySelector('.plan-area-badge') : null;
  const featuresRail = product ? product.querySelector('.features-rail') : null;

  function fadeIn(el) {
    if (!el) return;

    el.classList.remove('is-fading-in');
    void el.offsetWidth;
    el.classList.add('is-fading-in');
  }

  function setPlan(index) {
    const plans = PLAN_LAYOUT_DATA;
    const plan = plans[index] || plans[0];

    tabs.forEach(t =>
      t.classList.toggle('active', Number(t.dataset.plan) === index)
    );

    planImgs.forEach(img => {
      const isCurrent = Number(img.dataset.plan) === index;
      img.classList.toggle('hidden', !isCurrent);

      if (isCurrent) fadeIn(img);
    });

    if (planArea) {
      planArea.innerHTML = `${plan.area}<em>m² · ${plan.badgeLabel || 'planta'} ${plan.name}</em>`;
      fadeIn(planArea);
    }

    if (featuresRail && plan.features) {
      featuresRail.innerHTML = plan.features.map((item, i, arr) => `
        <div class="feat-item">
          ${item.number ? `<span class="feat-number">${item.number}</span>` : ''}
          ${item.label ? `<span class="feat-label${item.number ? ' italic' : ''}">${item.label}</span>` : ''}
          ${item.sublabel ? `<span class="feat-text">${item.sublabel}</span>` : ''}
        </div>
        ${i < arr.length - 1 ? '<span class="feat-separator">+</span>' : ''}
      `).join('');

      fadeIn(featuresRail);

      featuresRail.querySelectorAll('.feat-item, .feat-separator').forEach((el, i) => {
        el.style.animationDelay = `${i * 80}ms`;
        fadeIn(el);
      });
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const index = Number.parseInt(tab.dataset.plan, 10);
      if (Number.isNaN(index)) return;

      setPlan(index);
    });
  });

  const active = group.querySelector('.plan-tab[data-plan].active') || tabs[0];
  setPlan(Number.parseInt(active.dataset.plan, 10) || 0);
});

document.querySelectorAll('.plan-tab[data-floor]').forEach(tab => {
  tab.addEventListener('click', () => {
    const group = tab.closest('.plan-tabs');
    if (!group) return;

    group.querySelectorAll('.plan-tab[data-floor]').forEach(t => {
      t.classList.remove('active');
    });

    tab.classList.add('active');
  });
});

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

  // Location categories carousel

  const cats = Array.from(document.querySelectorAll(".location-cats .loc-cat"));

  if (cats.length) {
    let index = 0;
    const intervalTime = 5000;

    function showCat(nextIndex) {
      cats.forEach((cat, i) => {
        cat.classList.toggle("is-active", i === nextIndex);
      });
    }

    showCat(index);

    setInterval(() => {
      index = (index + 1) % cats.length;
      showCat(index);
    }, intervalTime);
  }


  function initLocationMaps() {
    if (!window.L) return;

    const maps = document.querySelectorAll('[data-location-map]');
    if (!maps.length) return;

    const points = {
      home: {
        coords: [-16.70582, -49.25869],
        title: 'Casa Conceito Marista',
        kicker: 'Endereco',
        desc: 'Rua 1.145, Qd. 262, Lotes 02/03, St. Marista, Goiania/GO.',
        popupOffset: [0, -18]
      },
      park: {
        coords: [-16.7086, -49.25705],
        title: 'Parque Areiao',
        kicker: 'Natureza',
        desc: 'Refugio verde a poucos minutos do endereco.',
        image: 'img/p09.jpg',
        popupOffset: [0, -18]
      },
      ricardo: {
        coords: [-16.7019, -49.25738],
        title: 'Alameda Ricardo Paranhos',
        kicker: 'Eixo urbano',
        desc: 'Gastronomia, cafes e vida ativa no Setor Marista.',
        image: 'img/pRPteste.png',
        popupOffset: [-20, -18]
      }
    };

    function markerIcon(label, className) {
      const size = className === 'is-home' ? 42 : 34;
      return L.divIcon({
        className: '',
        html: `<span class="map-pin ${className}">${label}</span>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -18]
      });
    }

    function popup(point) {
      const image = point.image ? `<img src="${point.image}" alt="${point.title}">` : '';
      return `
        <div class="map-card">
          ${image}
          <div class="map-card-body">
            <div class="map-card-k">${point.kicker}</div>
            <div class="map-card-title">${point.title}</div>
            <div class="map-card-desc">${point.desc}</div>
          </div>
        </div>
      `;
    }

    maps.forEach(el => {
      if (el.dataset.mapReady === 'true') return;
      el.dataset.mapReady = 'true';

      const map = L.map(el, {
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: true
      }).setView(points.home.coords, 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      [
        [points.home, 'CC', 'is-home'],
        [points.park, 'PA', 'is-poi'],
        [points.ricardo, 'RP', 'is-poi']
      ].forEach(([point, label, className]) => {
        L.marker(point.coords, { icon: markerIcon(label, className) })
          .addTo(map)
          .bindPopup(popup(point), {
            className: 'map-popup',
            offset: L.point(point.popupOffset)
          });
      });

      L.polyline([points.park.coords, points.home.coords, points.ricardo.coords], {
        color: '#c8a064',
        weight: 1,
        opacity: .72,
        dashArray: '6 10'
      }).addTo(map);

      const bounds = L.latLngBounds([points.home.coords, points.park.coords, points.ricardo.coords]);
      const fitLocationMap = () => {
        const isMobile = window.matchMedia('(max-width: 640px)').matches;
        map.fitBounds(bounds, isMobile
          ? { paddingTopLeft: [30, 62], paddingBottomRight: [30, 62], maxZoom: 14 }
          : { paddingTopLeft: [260, 160], paddingBottomRight: [360, 160] }
        );
      };

      fitLocationMap();
      setTimeout(() => {
        map.invalidateSize();
        fitLocationMap();
      }, 300);
      window.addEventListener('resize', fitLocationMap, { passive: true });
    });
  }

  initLocationMaps();

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
