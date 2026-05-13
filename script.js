// detecção de dispositivo e redirecionamento
(async () => {
  const redirectByScreenSize = async () => {
    await new Promise(resolve => requestAnimationFrame(resolve));

    const isMobile = window.innerWidth < 1141;
    const path = window.location.pathname;

    const isV1 = path.includes("v1.html");
    const isV2 = path.includes("v2.html");

    if (isMobile && !isV1) {
      window.location.replace("v1.html");
      return;
    }

    if (!isMobile && !isV2) {
      window.location.replace("v2.html");
    }
  };

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      redirectByScreenSize();
    }, 180);
  });

  redirectByScreenSize();
})();

// Casa Conceito — interactions

document.addEventListener('DOMContentLoaded', () => {
  const LOADER_CONFIG = {
    duration: 3000,
    order: ['label', 'secondaryLabel', 'line', 'brandRow'],
    label: 'TERRAL CONCEITO',
    secondaryLabel: 'apresenta:',
    brandLabel: 'CASA CONCEITO MARISTA',
    backgroundImage: 'img/loader-bg.jpg',
    logo: 'assets/logo-casa-conceito.png',
    backgroundOpacity: '.55',
    logoHeight: '42px',
    labelSpacing: '.42em',
    secondaryLabelSpacing: '.18em',
    brandLabelSpacing: '.24em'
  };

  const PLAN_DATA = [
    {
      id: 0,
      name: 'Sala & Varanda',
      area: '68',
      suites: '0',
      floor: 'Social',
      parking: 'Integrado',
      image: 'img/planta-tipo.jpg',
      specs: 'Integrados · 68m²',
      badgeLabel: 'ambiente'
    },
    {
      id: 1,
      name: 'Suíte Master',
      area: '42',
      suites: '1',
      floor: 'Íntimo',
      parking: 'Closet + SPA',
      image: 'img/planta-opcional.jpg',
      specs: 'Closet + SPA · 42m²',
      badgeLabel: 'ambiente'
    },
    {
      id: 2,
      name: 'Varanda Gourmet',
      area: '28',
      suites: '0',
      floor: 'Lazer',
      parking: 'Churrasqueira',
      image: 'img/planta-decorado.jpg',
      specs: 'Churrasqueira · 28m²',
      badgeLabel: 'ambiente'
    }
  ];

  // ── Loader — 3s loading experience
  const PLAN_LAYOUT_DATA = [
    {
      id: 0,
      name: 'Tipo',
      area: '274',
      suites: '4',
      floor: 'Pavimento inteiro',
      parking: '3 vagas + verde',
      specs: '4 suites · 274m²',
      badgeLabel: 'planta',
      rail: [
        { key: '— Esquadrias', value: 'piso', suffix: '–teto', desc: 'Salas e suite master com vistas amplas e luz natural integral.' },
        { key: '— Porcelanato', value: '1,20', suffix: '×1,20m', desc: 'Em todas as suites e areas sociais. Banheiros 100% revestidos.' },
        { key: '— Climatizacao', value: 'VRF', suffix: ' integral', desc: 'Ar-condicionado em todas as suites e salas. Ventilacao cruzada.' },
        { key: '— Garagem', value: '3', suffix: ' vagas + verde', desc: 'Vaga verde com ponto eletrico por unidade. Lavagem a seco.' }
      ]
    },
    {
      id: 1,
      name: 'Opcional',
      area: '280',
      suites: '3',
      floor: 'Master ampliada',
      parking: '3 vagas + deposito',
      specs: '3 suites · master ampliada',
      badgeLabel: 'planta',
      rail: [
        { key: '— Master', value: 'ampla', suffix: ' + closet', desc: 'Suite master com area expandida, banho generoso e espaco para closet linear.' },
        { key: '— Living', value: 'duplo', suffix: ' integrado', desc: 'Sala, varanda e jantar conectados para receber com mais fluidez.' },
        { key: '— Home office', value: '1', suffix: ' ambiente', desc: 'Ambiente reservado para trabalho, leitura ou apoio intimo da familia.' },
        { key: '— Garagem', value: '3', suffix: ' vagas + deposito', desc: 'Tres vagas cobertas com apoio para armazenamento privativo.' }
      ]
    },
    {
      id: 2,
      name: 'Decorado',
      area: '290',
      suites: '4',
      floor: 'Decorado',
      parking: '3 vagas + verde',
      specs: 'Decorado · 274m²',
      badgeLabel: 'planta',
      rail: [
        { key: '— Interiores', value: '100%', suffix: ' mobiliado', desc: 'Ambientes com marcenaria, mobiliario solto e composicao pronta para visita.' },
        { key: '— Gourmet', value: 'varanda', suffix: ' equipada', desc: 'Bancada, churrasqueira e estar externo integrados ao living.' },
        { key: '— Iluminacao', value: 'cena', suffix: ' completa', desc: 'Projeto luminotecnico aplicado para valorizar materiais, arte e circulacao.' },
        { key: '— Garagem', value: '3', suffix: ' vagas + verde', desc: 'Vaga verde com ponto eletrico por unidade e acesso privativo.' }
      ]
    }
  ];

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

    function setLoaderText(el, value) {
      if (!el) return;
      el.replaceChildren();
      String(value || '').replace(/<br\s*\/?>/gi, '\n').split('\n').forEach((part, index) => {
        if (index) el.appendChild(document.createElement('br'));
        el.appendChild(document.createTextNode(part));
      });
    }

    if (bgImg && LOADER_CONFIG.backgroundImage) bgImg.src = LOADER_CONFIG.backgroundImage;
    if (logo && LOADER_CONFIG.logo) logo.src = LOADER_CONFIG.logo;
    setLoaderText(label, LOADER_CONFIG.label);
    setLoaderText(secondaryLabel, LOADER_CONFIG.secondaryLabel);
    setLoaderText(brandLabel, LOADER_CONFIG.brandLabel);
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

    function setPlan(index) {
      const plans = product && product.querySelector('.product-grid') ? PLAN_DATA : PLAN_LAYOUT_DATA;
      const plan = plans[index] || plans[0];
      tabs.forEach(t => t.classList.toggle('active', Number(t.dataset.plan) === index));
      planImgs.forEach(img => img.classList.toggle('hidden', Number(img.dataset.plan) !== index));

      if (planArea) {
        planArea.innerHTML = `${plan.area}<em>m² · ${plan.badgeLabel || 'planta'} ${plan.name}</em>`;
      }

      const areaCell = product && product.querySelector('[data-plan-stat="area"] .v');
      const suitesCell = product && product.querySelector('[data-plan-stat="suites"] .v');
      const floorCell = product && product.querySelector('[data-plan-stat="floor"] .v');
      const parkingCell = product && product.querySelector('[data-plan-stat="parking"] .v');
      const railCells = product ? product.querySelectorAll('[data-plan-spec]') : [];

      if (areaCell) areaCell.innerHTML = `${plan.area}<em>m²</em>`;
      if (suitesCell) suitesCell.innerHTML = `${plan.suites}<em> suíte${plan.suites === '1' ? '' : 's'}</em>`;
      if (floorCell) floorCell.innerHTML = `${plan.floor}<em> andar</em>`;
      if (parkingCell) parkingCell.innerHTML = `${plan.parking}<em></em>`;
      if (plan.rail && railCells.length) {
        railCells.forEach(cell => {
          const spec = plan.rail[Number.parseInt(cell.dataset.planSpec, 10)];
          if (!spec) return;
          const keyEl = cell.querySelector('.k');
          const valueEl = cell.querySelector('.v');
          const descEl = cell.querySelector('.d');
          if (keyEl) keyEl.textContent = spec.key;
          if (valueEl) valueEl.innerHTML = `${spec.value}<em>${spec.suffix || ''}</em>`;
          if (descEl) descEl.textContent = spec.desc;
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
      group.querySelectorAll('.plan-tab[data-floor]').forEach(t => t.classList.remove('active'));
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

  // ── Hero parallax
  function initLocationMaps() {
    if (!window.L) return;

    const maps = document.querySelectorAll('[data-location-map]');
    if (!maps.length) return;

    const points = {
      home: {
        coords: [-16.70492, -49.25963],
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
