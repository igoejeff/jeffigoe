/* ================================================================
   JEFF IGOE — Main JS v3
   Premium interactions, smooth animations, enhanced UX
   ================================================================ */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ── SCROLL PROGRESS BAR ─────────────────────────────────────── */
  const bar = document.createElement('div');
  bar.id = 'scrollBar';
  document.body.prepend(bar);

  const updateBar = () => {
    const total = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', updateBar, { passive: true });


  /* ── PRELOADER ───────────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  const done = () => preloader && preloader.classList.add('done');

  if (document.readyState === 'complete') {
    setTimeout(done, 1200);
  } else {
    window.addEventListener('load', () => setTimeout(done, 1200));
    // Fallback: force dismiss after 3.5s
    setTimeout(done, 3500);
  }


  /* ── NAVBAR ──────────────────────────────────────────────────── */
  const navbar  = document.getElementById('navbar');
  // Navbar is permanently dark — no class switching needed


  /* ── MOBILE HAMBURGER ────────────────────────────────────────── */
  const burger  = document.getElementById('navBurger');
  const navMenu = document.getElementById('navLinks');

  if (burger && navMenu) {
    burger.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      const spans = burger.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });

    // Close on link click
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navMenu.classList.remove('open');
        burger.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity   = '';
        });
      });
    });
  }


  /* ── SMOOTH SCROLL ───────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 8;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });


  /* ── SCROLL-REVEAL (data-aos) ────────────────────────────────── */
  const aosCfg = { threshold: 0.08, rootMargin: '0px 0px -48px 0px' };
  const aosObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const delay = e.target.dataset.aosDelay;
      if (delay) {
        e.target.style.transitionDelay = delay + 'ms';
      }
      e.target.classList.add('aos-in');
      aosObs.unobserve(e.target);
    });
  }, aosCfg);

  document.querySelectorAll('[data-aos]').forEach(el => aosObs.observe(el));


  /* ── ANIMATED COUNTERS ───────────────────────────────────────── */
  let counted = false;
  const statsBar = document.querySelector('.stats-bar');

  const animateCounters = () => {
    if (counted || !statsBar) return;
    const rect = statsBar.getBoundingClientRect();
    if (rect.top >= window.innerHeight - 60) return;
    counted = true;

    document.querySelectorAll('.count').forEach(el => {
      const target = +el.dataset.target || 0;
      const duration = 2400;
      const startTime = performance.now();

      const easeOut = t => 1 - Math.pow(1 - t, 3);

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        el.textContent = Math.floor(easeOut(progress) * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      };
      requestAnimationFrame(tick);
    });
  };

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters();


  /* ── TESTIMONIALS VIDEO SLIDER ───────────────────────────────── */
  const tvTrack    = document.getElementById('tvTrack');
  const tvViewport = document.getElementById('tvViewport');
  const tvDots     = document.getElementById('tvDots');
  const tvPrev     = document.getElementById('tvPrev');
  const tvNext     = document.getElementById('tvNext');

  if (tvTrack) {
    const cards = tvTrack.querySelectorAll('.tv-card');
    const total = cards.length;
    let current = 0;
    let autoTimer;

    const perView = () => {
      if (window.innerWidth < 768)  return 1;
      if (window.innerWidth < 1100) return 3;
      return 4;
    };

    const cardWidth = () => {
      const c = cards[0];
      if (!c) return 0;
      const gap = parseInt(getComputedStyle(tvTrack).gap) || 16;
      return c.offsetWidth + gap;
    };

    const maxIdx = () => Math.max(0, total - perView());

    const goTo = idx => {
      current = Math.max(0, Math.min(idx, maxIdx()));
      tvTrack.style.transform = `translateX(-${current * cardWidth()}px)`;
      updateDots();
    };

    const next = () => goTo(current >= maxIdx() ? 0 : current + 1);
    const prev = () => goTo(current <= 0 ? maxIdx() : current - 1);

    /* dots */
    const buildDots = () => {
      if (!tvDots) return;
      tvDots.innerHTML = '';
      const pages = Math.ceil(total / perView());
      for (let i = 0; i < pages; i++) {
        const d = document.createElement('button');
        d.className = 'tv-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', `Go to slide ${i + 1}`);
        d.addEventListener('click', () => { goTo(i * perView()); resetAuto(); });
        tvDots.appendChild(d);
      }
    };
    const updateDots = () => {
      if (!tvDots) return;
      const page = Math.floor(current / perView());
      tvDots.querySelectorAll('.tv-dot').forEach((d, i) => d.classList.toggle('active', i === page));
    };

    /* auto-play */
    const startAuto  = () => { stopAuto(); autoTimer = setInterval(next, 5500); };
    const stopAuto   = () => clearInterval(autoTimer);
    const resetAuto  = () => { stopAuto(); startAuto(); };

    /* arrows */
    tvPrev?.addEventListener('click', () => { prev(); resetAuto(); });
    tvNext?.addEventListener('click', () => { next(); resetAuto(); });

    /* drag / swipe */
    let dragStartX = 0, dragDeltaX = 0, isDragging = false;

    tvTrack.addEventListener('mousedown', e => {
      isDragging = true; dragStartX = e.clientX; dragDeltaX = 0;
      tvTrack.classList.add('dragging');
      stopAuto();
    });
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      dragDeltaX = e.clientX - dragStartX;
      tvTrack.style.transform = `translateX(${-current * cardWidth() + dragDeltaX}px)`;
    });
    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      tvTrack.classList.remove('dragging');
      if (dragDeltaX < -60) next();
      else if (dragDeltaX > 60) prev();
      else goTo(current);
      startAuto();
    });

    tvTrack.addEventListener('touchstart', e => {
      dragStartX = e.touches[0].clientX; stopAuto();
    }, { passive: true });
    tvTrack.addEventListener('touchend', e => {
      const diff = dragStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
      startAuto();
    });

    /* pause on hover */
    tvViewport?.addEventListener('mouseenter', stopAuto);
    tvViewport?.addEventListener('mouseleave', startAuto);

    /* resize */
    let rsz;
    window.addEventListener('resize', () => {
      clearTimeout(rsz);
      rsz = setTimeout(() => { buildDots(); goTo(0); }, 200);
    });

    buildDots();
    goTo(0);
    startAuto();
  }


  /* ── VIDEO LIGHTBOX ──────────────────────────────────────────── */
  const lightbox = document.getElementById('lightbox');
  const lbClose  = document.getElementById('lbClose');
  const lbVideo  = document.getElementById('lbVideo');

  if (lightbox && lbVideo) {
    document.querySelectorAll('.tv-play-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const card = btn.closest('.tv-card');
        const src  = card?.dataset.video || '';
        if (!src) return;

        // mark playing
        document.querySelectorAll('.tv-card').forEach(c => c.classList.remove('playing'));
        card.classList.add('playing');

        lbVideo.querySelector('source').src = src;
        lbVideo.load();
        lbVideo.play();
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLB = () => {
      lbVideo.pause();
      lbVideo.querySelector('source').src = '';
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      document.querySelectorAll('.tv-card').forEach(c => c.classList.remove('playing'));
    };

    lbClose?.addEventListener('click', closeLB);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });
  }


  /* ── CONTACT FORM — Formspree AJAX ──────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const ffSubmit    = document.getElementById('ffSubmit');

  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();

      // Basic validation
      const required = contactForm.querySelectorAll('[required]');
      let valid = true;
      required.forEach(f => {
        f.classList.remove('ff-error');
        if (!f.value.trim()) { f.classList.add('ff-error'); valid = false; }
      });
      if (!valid) return;

      const orig = ffSubmit.innerHTML;
      ffSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>&nbsp; Sending…';
      ffSubmit.disabled = true;

      try {
        const data = new FormData(contactForm);
        const res  = await fetch(contactForm.action, {
          method:  'POST',
          body:    data,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          ffSubmit.style.display = 'none';
          if (formSuccess) formSuccess.style.display = 'flex';
          contactForm.reset();
          // GA4 event
          if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', { event_category: 'lead', event_label: 'contact_form' });
          }
        } else {
          throw new Error('Server error');
        }
      } catch {
        ffSubmit.innerHTML = orig;
        ffSubmit.disabled  = false;
        alert('Something went wrong. Please call us at 877-744-0446 or book a call at calendly.com/conscioushealthconnections/meeting-with-jeff-igoe');
      }
    });
  }


  /* ── BACK TO TOP ─────────────────────────────────────────────── */
  const bttBtn = document.getElementById('btt');

  if (bttBtn) {
    window.addEventListener('scroll', () => {
      bttBtn.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });

    bttBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }


  /* ── STICKY CTA BAR — removed ── */


  /* ── LEAD MAGNET FORM ────────────────────────────────────────── */
  const lmForm    = document.getElementById('lmForm');
  const lmSuccess = document.getElementById('lmSuccess');

  if (lmForm) {
    lmForm.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = lmForm.querySelector('button');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
      btn.disabled = true;
      try {
        const res = await fetch(lmForm.action, {
          method: 'POST', body: new FormData(lmForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          lmForm.querySelectorAll('input, button').forEach(el => el.style.display = 'none');
          if (lmSuccess) lmSuccess.style.display = 'flex';
          if (typeof gtag !== 'undefined') {
            gtag('event', 'lead_magnet', { event_category: 'lead', event_label: 'checklist_form' });
          }
        } else { throw new Error(); }
      } catch { btn.innerHTML = orig; btn.disabled = false; }
    });
  }


  /* ── EXIT INTENT POPUP ───────────────────────────────────────── */
  const exitPopup   = document.getElementById('exitPopup');
  const exitOverlay = document.getElementById('exitOverlay');
  const exitClose   = document.getElementById('exitClose');
  const exitForm    = document.getElementById('exitForm');
  let exitShown     = false;

  const openExit = () => {
    if (exitShown || sessionStorage.getItem('exitShown')) return;
    exitShown = true;
    sessionStorage.setItem('exitShown', '1');
    exitPopup?.classList.add('open');
    exitOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeExit = () => {
    exitPopup?.classList.remove('open');
    exitOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Desktop: mouse leaving viewport top
  document.addEventListener('mouseleave', e => {
    if (e.clientY < 20) openExit();
  });

  // Mobile: scroll back up quickly (user is leaving)
  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const delta = lastScrollY - window.scrollY;
    if (delta > 80 && window.scrollY > 400) openExit();
    lastScrollY = window.scrollY;
  }, { passive: true });

  exitClose?.addEventListener('click', closeExit);
  exitOverlay?.addEventListener('click', closeExit);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeExit(); });

  if (exitForm) {
    exitForm.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = exitForm.querySelector('button');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      try {
        const res = await fetch(exitForm.action, {
          method: 'POST', body: new FormData(exitForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          exitForm.innerHTML = '<p style="color:var(--teal);font-weight:700;font-size:1rem;text-align:center">✓ Check your inbox — it\'s on the way!</p>';
          if (typeof gtag !== 'undefined') {
            gtag('event', 'lead_magnet', { event_category: 'lead', event_label: 'exit_popup' });
          }
          setTimeout(closeExit, 2500);
        }
      } catch { btn.textContent = 'Try again'; btn.disabled = false; }
    });
  }


  /* ── CURRENT YEAR ────────────────────────────────────────────── */
  const yrEl = document.getElementById('yr');
  if (yrEl) yrEl.textContent = new Date().getFullYear();


  /* ── LOGO STRIP PAUSE ON HOVER ───────────────────────────────── */
  const stripTrack = document.getElementById('stripTrack');
  if (stripTrack) {
    stripTrack.addEventListener('mouseenter', () => { stripTrack.style.animationPlayState = 'paused'; });
    stripTrack.addEventListener('mouseleave', () => { stripTrack.style.animationPlayState = 'running'; });
  }

});
