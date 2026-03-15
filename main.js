/* ============================================================
   STUDIO 53 — main.js
   Navigation · Scroll · Countdown · RSVP · Forms · AOS
   ============================================================ */

/* ── NAVIGATION ─────────────────────────────────────────── */
const header     = document.getElementById('header');
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');
const allLinks   = navLinks.querySelectorAll('.nav-link');

// Sticky header on scroll
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Close menu when link clicked
allLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// Hamburger animation
const hbSpans = hamburger.querySelectorAll('span');
hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.contains('open');
  if (isOpen) {
    hbSpans[0].style.transform = 'rotate(45deg) translate(4px, 5px)';
    hbSpans[1].style.opacity   = '0';
    hbSpans[2].style.transform = 'rotate(-45deg) translate(4px, -5px)';
  } else {
    hbSpans[0].style.transform = '';
    hbSpans[1].style.opacity   = '';
    hbSpans[2].style.transform = '';
  }
});

// Active link on scroll
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.id;
  });
  allLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

/* ── HERO SCROLL BUTTON ─────────────────────────────────── */
const heroScroll = document.getElementById('heroScroll');
if (heroScroll) {
  heroScroll.addEventListener('click', () => {
    document.querySelector('.process')?.scrollIntoView({ behavior: 'smooth' });
  });
}

/* ── COUNTDOWN TIMER ────────────────────────────────────── */
// Wedding date for demo — 14 June 2025
const weddingDate = new Date('2025-06-14T14:00:00').getTime();

function updateCountdown() {
  const now  = Date.now();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.getElementById('days').textContent    = '00';
    document.getElementById('hours').textContent   = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent    = String(d).padStart(2, '0');
  document.getElementById('hours').textContent   = String(h).padStart(2, '0');
  document.getElementById('minutes').textContent = String(m).padStart(2, '0');
  document.getElementById('seconds').textContent = String(s).padStart(2, '0');
}

if (document.getElementById('countdown')) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ── RSVP BUTTONS ───────────────────────────────────────── */
function rsvpSelect(btn, choice) {
  // Clear selection
  document.querySelectorAll('.rsvp-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  const confirm = document.getElementById('rsvpConfirm');
  if (confirm) {
    confirm.textContent = choice === 'yes'
      ? 'Hvala! Radujemo se vašem dolasku. ✦'
      : 'Razumijemo. Hvala na odgovoru.';
  }
}
// Expose to inline onclick
window.rsvpSelect = rsvpSelect;

/* ── CONTACT FORM ───────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn     = contactForm.querySelector('button[type="submit"]');
    const success = document.getElementById('formSuccess');

    btn.textContent = 'Šalje se...';
    btn.disabled    = true;

    // Simulate async send (replace with real fetch/API call)
    setTimeout(() => {
      contactForm.reset();
      btn.textContent = 'Pošalji upit';
      btn.disabled    = false;
      if (success) {
        success.style.display = 'block';
        setTimeout(() => { success.style.display = 'none'; }, 5000);
      }
    }, 1200);
  });
}

/* ── NEWSLETTER FORM ────────────────────────────────────── */
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button');
    btn.textContent = 'Prijavljeno ✓';
    btn.disabled    = true;
    btn.style.background = 'var(--gold)';
    btn.style.color      = '#fff';
    btn.style.borderColor = 'var(--gold)';
    setTimeout(() => {
      newsletterForm.reset();
      btn.textContent = 'Prijavi me';
      btn.disabled    = false;
      btn.style.background  = '';
      btn.style.color       = '';
      btn.style.borderColor = '';
    }, 3500);
  });
}

/* ── SIMPLE AOS (Animate On Scroll) ────────────────────── */
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ── SMOOTH SCROLL for anchor links ────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = header ? header.offsetHeight : 0;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── INIT ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  updateActiveLink();
});
