(() => {
  const play = document.getElementById('demo-play');
  const close = document.getElementById('demo-close');
  const stage = document.getElementById('demo-stage');
  const preview = document.getElementById('demo-preview');
  const status = document.getElementById('demo-status');
  if (!play || !close || !stage || !preview || !status) return;
  let frame;
  play.addEventListener('click', () => {
    if (frame) return;
    frame = document.createElement('iframe');
    frame.title = 'Play the free Curio Cargo browser demo';
    frame.allow = 'autoplay; fullscreen';
    frame.allowFullscreen = true;
    frame.src = '/curio-cargo/demo/';
    preview.hidden = true;
    stage.append(frame);
    close.hidden = false;
    status.textContent = 'Loading the demo. Your first visit downloads about 55 MB.';
    frame.addEventListener('load', () => {
      status.textContent = 'Loading progress appears inside the game. Tap the game to begin when it is ready.';
    }, { once: true });
    frame.focus();
  });
  close.addEventListener('click', () => {
    if (frame) frame.remove();
    frame = null;
    preview.hidden = false;
    close.hidden = true;
    status.textContent = 'Demo closed. Your saved progress stays in this browser.';
    play.focus();
  });
})();

// Keep third-party video requests behind an explicit visitor action.
(() => {
  const play = document.getElementById('trailer-play');
  const stage = document.getElementById('trailer-stage');
  if (!play || !stage) return;
  play.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.title = 'Curio Cargo official trailer';
    frame.src = 'https://www.youtube-nocookie.com/embed/ta9TiI9vkEI?autoplay=1&rel=0';
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    stage.replaceChildren(frame);
    frame.focus();
  }, { once: true });
})();
