# HunnerBunner Games Website

Official static website for HunnerBunner Games.

Primary domain: `hunnerbunnergames.com`

## Product direction

- Static, low-maintenance site
- Studio-first branding with Curio Cargo as the featured title
- Dark polished base with playful accent moments
- No newsletter, CMS, database, social feed, blog, or contact form at launch
- Support: `support@hunnerbunnergames.com`
- Curio Cargo public launch is live

## Brand authority

Read `Design/00_WEBSITE_AND_BRAND_LOCK.md` before changing player-facing/studio-facing branding or layout direction.

The approved top HunnerBunner banner is a **locked brand asset**. Do not regenerate, reinterpret, redraw, recolor, re-letter, or replace it with a different bunny or logo. Approved mascot/art variations may be used elsewhere only where the lock allows them.

## Public project labels

- Curio Cargo â€” HB-01 â€” featured title â€” Coming to Google Play
- Project Orchard â€” HB-02 â€” Cozy Space Farming â€” In Development
- Project Iron â€” HB-03 â€” Gladiatorial Action â€” In Development
- Project Beacon â€” HB-04 â€” Creature Survival â€” In Development

## Studio tagline

> Small studio. Big worlds. A little mischief.

Homepage headline:

> Clever games. Made with care.

## Site structure

- `/` â€” Home
- `/games/` â€” Games
- `/curio-cargo/` â€” Curio Cargo
- `/about/` â€” About
- `/support/` â€” Support hub
- `/support/curio-cargo/` â€” Curio Cargo support
- `/privacy/` â€” Privacy

## Local preview

The site uses root-relative paths, so preview it through a local web server rather than opening files directly.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Implementation notes

The site is plain HTML/CSS/JavaScript with no build step. Approved visual assets are stored as base64 text and loaded by `assets/js/site.js`; this keeps the repository and hosting requirements simple while preserving the locked source-derived banner and approved mockup-derived artwork.

Game-specific claims must stay aligned with the relevant game repository. In particular, the Curio Cargo repository remains authoritative for Curio Cargo gameplay, launch status, and product details.

## Deployment

The private source repository and public GitHub Pages repository contain identical site files. Production uses GitHub Pages with HTTPS at https://hunnerbunnergames.com/.

## Curio Cargo public launch

Official portal/developer link: https://hunnerbunnergames.com/curio-cargo/
Demo link: https://hunnerbunnergames.com/curio-cargo/demo/
Google Play: https://play.google.com/store/apps/details?id=com.hunnerbunnergames.curiocargo
Trailer: https://youtube.com/shorts/ta9TiI9vkEI?feature=share

The landing page loads the demo iframe only after Play Web Demo is pressed, and the YouTube player only after Play official trailer is pressed. No game/video preloads or automatic redirects.

Publish the entire demo directory with Build unchanged. This is the supplied Final_Fallback export with Brotli and Unity Decompression Fallback enabled. Serve .unityweb files as static bytes without Content-Encoding; Unity handles decompression. No custom server or cross-origin isolation is required.

Demo progress stays in the browser and does not transfer to Android. The locked banner, artwork, runtime and Android build are unchanged. Historical Design documents retain their original approved wording; the owner's public-launch instruction supersedes their pre-release status.
