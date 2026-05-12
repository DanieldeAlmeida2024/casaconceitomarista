/* CASA CONCEITO MARISTA — interactions */

// LOADER
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('gone'), 1400);
});

// FORM PANEL collapse-on-scroll
const formPanel = document.getElementById('form-panel');
const formStrip = document.getElementById('form-strip');
let panelManual = false;
formStrip.addEventListener('click', (e) => {
  e.stopPropagation();
  panelManual = !formPanel.classList.contains('collapsed');
  formPanel.classList.toggle('collapsed');
  document.body.classList.toggle('collapsed', formPanel.classList.contains('collapsed'));
});

const heroEl = document.querySelector('.hero');
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && e.intersectionRatio > 0.3) {
      formPanel.classList.remove('collapsed');
      document.body.classList.remove('collapsed');
    } else {
      formPanel.classList.add('collapsed');
      document.body.classList.add('collapsed');
    }
  });
}, { threshold: [0.3, 0.6] });
heroObserver.observe(heroEl);

// FADE-IN observer
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
  });
}, { threshold: 0.18 });
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// MANIFESTO reveal line-by-line
const revealEls = document.querySelectorAll('.manifesto-text .reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('lit'); });
}, { threshold: 0.6 });
revealEls.forEach(el => revealObs.observe(el));

// PLANS tabs
document.querySelectorAll('.plan-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.plan-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const key = tab.dataset.plan;
    document.querySelectorAll('.plan-svg').forEach(p => p.style.display = 'none');
    const svg = document.getElementById('plan-' + key);
    if (svg) svg.style.display = 'block';
    document.getElementById('plan-bottom-label').textContent = tab.querySelector('.name').textContent;
  });
});

// FLOORS scroll-driven
const floorsScroll = document.getElementById('floors-scroll');
const floorCards = document.querySelectorAll('.floor-card');
const floorDots = document.querySelectorAll('.floors-progress .dot');
const floorMarkers = document.querySelectorAll('.floor-marker');
const counterCur = document.getElementById('counter-cur');

function updateFloors() {
  const rect = floorsScroll.getBoundingClientRect();
  const total = floorsScroll.offsetHeight - window.innerHeight;
  const scrolled = Math.max(0, Math.min(total, -rect.top));
  const progress = scrolled / total;
  const n = floorCards.length;
  let idx = Math.floor(progress * n);
  if (idx >= n) idx = n - 1;
  if (idx < 0) idx = 0;
  floorCards.forEach((c, i) => c.classList.toggle('active', i === idx));
  floorDots.forEach((d, i) => d.classList.toggle('active', i === idx));
  floorMarkers.forEach((m, i) => m.classList.toggle('active', i === idx));
  counterCur.textContent = String(idx + 1).padStart(2, '0');
}
window.addEventListener('scroll', updateFloors, { passive: true });
updateFloors();

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const t = document.getElementById(id);
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// Form submit (placeholder)
document.getElementById('lead-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.querySelector('span').textContent = 'Enviado';
  setTimeout(() => { btn.querySelector('span').textContent = 'Tenho interesse'; e.target.reset(); }, 2500);
});
