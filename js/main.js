document.addEventListener('DOMContentLoaded', () => {

  /* ---- Header: scroll class ---- */
  const header = document.getElementById('header');
  const isInner = !document.querySelector('.hero');

  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 60 || isInner) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ---- Hero: ken-burns trigger ---- */
  const hero = document.querySelector('.hero');
  if (hero) setTimeout(() => hero.classList.add('is-loaded'), 80);

  /* ---- Hamburger ---- */
  const hamburger = document.querySelector('.hamburger');
  const mobNav    = document.querySelector('.mob-nav');

  if (hamburger && mobNav) {
    hamburger.setAttribute('aria-expanded', 'false');
    mobNav.setAttribute('aria-hidden', 'true');

    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('is-open');
      mobNav.classList.toggle('is-open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobNav.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('is-open');
        mobNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Active nav link ---- */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__list a, .mob-nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('is-active');
  });

  /* ---- Scroll-reveal ---- */
  const revealEls = document.querySelectorAll('.fade-up, .fade-in');
  if (revealEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }

  /* ---- Menu filter ---- */
  const filterBtns = document.querySelectorAll('.filter-bar .filter-btn');
  const menuItems  = document.querySelectorAll('.menu-grid .menu-item');

  if (filterBtns.length && menuItems.length) {
    menuItems.forEach(i => i.classList.add('is-show'));

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const cat = btn.dataset.filter;
        menuItems.forEach(item => {
          const match = cat === 'all' || item.dataset.cat === cat;
          item.classList.toggle('is-show', match);
        });
      });
    });
  }

  /* ---- Gallery filter ---- */
  const galFilterBtns = document.querySelectorAll('.gallery-filter .filter-btn');
  const galItems      = document.querySelectorAll('.masonry__item');

  if (galFilterBtns.length && galItems.length) {
    galFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        galFilterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const cat = btn.dataset.filter;
        galItems.forEach(item => {
          const match = cat === 'all' || item.dataset.cat === cat;
          item.classList.toggle('is-hidden', !match);
        });
      });
    });
  }

  /* ---- Lightbox ---- */
  const lightbox    = document.querySelector('.lightbox');
  const lbImg       = document.querySelector('.lightbox__img');
  const lbClose     = document.querySelector('.lightbox__close');
  const lbPrev      = document.querySelector('.lightbox__prev');
  const lbNext      = document.querySelector('.lightbox__next');

  if (lightbox && lbImg) {
    const allImgs = () => Array.from(
      document.querySelectorAll('.masonry__item:not(.is-hidden) img')
    );
    let cur = 0;

    const open = idx => {
      const imgs = allImgs();
      cur = ((idx % imgs.length) + imgs.length) % imgs.length;
      lbImg.src = imgs[cur].src;
      lbImg.alt = imgs[cur].alt;
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    document.querySelectorAll('.masonry__item').forEach((item, i) => {
      item.addEventListener('click', () => {
        const imgs = allImgs();
        const realIdx = imgs.findIndex(img => img === item.querySelector('img'));
        open(realIdx >= 0 ? realIdx : 0);
      });
    });

    lbClose?.addEventListener('click', close);
    lbPrev?.addEventListener('click',  () => open(cur - 1));
    lbNext?.addEventListener('click',  () => open(cur + 1));

    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });

    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape')      close();
      if (e.key === 'ArrowLeft')   open(cur - 1);
      if (e.key === 'ArrowRight')  open(cur + 1);
    });
  }

});
