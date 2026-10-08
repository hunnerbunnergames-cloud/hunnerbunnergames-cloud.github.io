(() => {
  document.querySelectorAll('[data-current-year]').forEach((year) => {
    year.textContent = new Date().getFullYear();
  });

  const footer = document.querySelector('.site-footer');
  if (footer) {
    const brand = footer.querySelector('.footer-brand');
    let summary = brand?.querySelector('p');
    if (brand && !summary) {
      summary = document.createElement('p');
      brand.append(summary);
    }
    if (summary) summary.textContent = 'Independent game studio creating original games with personality, polish, and heart.';

    const groups = footer.querySelectorAll('.footer-nav');
    if (groups[0]) groups[0].innerHTML = '<h3>Navigation</h3><a href="/">Home</a><a href="/games/">Games</a><a href="/about/">About</a><a href="/support/">Support</a><a href="/privacy/">Privacy</a>';
    if (groups[1]) groups[1].innerHTML = '<h3>Support</h3><a href="/support/curio-cargo/">Curio Cargo support</a><a href="mailto:support@hunnerbunnergames.com">support@hunnerbunnergames.com</a>';

    const footerLabel = footer.querySelector('.footer-bottom > span:last-child');
    if (footerLabel) footerLabel.textContent = 'hunnerbunnergames.com';
  }

  if (window.location.pathname.replace(/index\.html$/, '') === '/privacy/') {
    const privacyLayout = document.querySelector('.content-section > .shell');
    privacyLayout?.classList.add('reading-layout');
    privacyLayout?.querySelector('.content-card > p:first-of-type')?.classList.add('legal-meta');
  }

  document.querySelectorAll('.content-card').forEach((card) => {
    const seenLinks = new Set();
    card.querySelectorAll('a[href]').forEach((link) => {
      const signature = `${link.getAttribute('href')}|${link.textContent.trim()}`;
      if (seenLinks.has(signature)) {
        const wrapper = link.closest('p');
        if (wrapper && wrapper.children.length === 1) wrapper.remove();
        else link.remove();
      } else {
        seenLinks.add(signature);
      }
    });
  });

  async function textAsset(path) {
    const response = await fetch(path, { cache: 'force-cache' });
    if (!response.ok) throw new Error(`Asset unavailable: ${path}`);
    return (await response.text()).trim();
  }

  async function loadBanner() {
    const targets = [...document.querySelectorAll('[data-hb-banner]')];
    if (!targets.length) return;
    try {
      const base64 = await textAsset('/assets/brand/banner.webp.b64');
      const src = `data:image/webp;base64,${base64}`;
      targets.forEach((img) => {
        img.src = src;
        img.dataset.loaded = 'true';
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function loadArtwork() {
    const artMap = {
      '.game-card__art--orchard': '/assets/art/orchard.webp.b64',
      '.game-card__art--iron': '/assets/art/iron.webp.b64',
      '.game-card__art--beacon': '/assets/art/beacon.webp.b64'
    };
    Object.entries(artMap).forEach(([selector, source]) => {
      document.querySelectorAll(selector).forEach((target) => {
        if (!target.dataset.b64Bg) target.dataset.b64Bg = source;
      });
    });

    const targets = [...document.querySelectorAll('[data-b64-bg]')];
    await Promise.all(targets.map(async (target) => {
      try {
        const base64 = await textAsset(target.dataset.b64Bg);
        target.style.setProperty('--art-image', `url("data:image/webp;base64,${base64}")`);
        target.dataset.artLoaded = 'true';
      } catch (error) {
        console.error(error);
      }
    }));
  }

  loadBanner();
  loadArtwork();

  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-site-nav]');
  if (!toggle || !nav) return;

  nav.id ||= 'primary-navigation';
  toggle.setAttribute('aria-controls', nav.id);

  const closeMenu = () => {
    nav.dataset.open = 'false';
    document.body.dataset.menuOpen = 'false';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
    toggle.setAttribute('aria-label', 'Open navigation');
  };

  toggle.setAttribute('aria-label', 'Open navigation');
  toggle.addEventListener('click', () => {
    const isOpen = nav.dataset.open === 'true';
    nav.dataset.open = String(!isOpen);
    document.body.dataset.menuOpen = String(!isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.textContent = isOpen ? '☰' : '×';
    toggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    if (!isOpen) nav.querySelector('a')?.focus();
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.dataset.open === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (nav.dataset.open === 'true' && !nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) closeMenu();
  });
})();
