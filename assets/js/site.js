(() => {
  document.querySelectorAll('[data-current-year]').forEach((year) => {
    year.textContent = new Date().getFullYear();
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

  const closeMenu = () => {
    nav.dataset.open = 'false';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
    toggle.setAttribute('aria-label', 'Open navigation');
  };

  toggle.setAttribute('aria-label', 'Open navigation');
  toggle.addEventListener('click', () => {
    const isOpen = nav.dataset.open === 'true';
    nav.dataset.open = String(!isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.textContent = isOpen ? '☰' : '×';
    toggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) closeMenu();
  });
})();
