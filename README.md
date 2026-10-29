# HunnerBunner Games Website

Official static website for HunnerBunner Games.

Primary domain: `hunnerbunnergames.com`

## Product direction

- Static, low-maintenance site
- Studio-first branding with Curio Cargo as the featured title
- Dark polished base with playful accent moments
- No newsletter, CMS, database, social feed, blog, or contact form at launch
- Support: `support@hunnerbunnergames.com`
- Intended to go live before Curio Cargo launches

## Brand authority

Read `Design/00_WEBSITE_AND_BRAND_LOCK.md` before changing player-facing/studio-facing branding or layout direction.

The approved top HunnerBunner banner is a **locked brand asset**. Do not regenerate, reinterpret, redraw, recolor, re-letter, or replace it with a different bunny or logo. Approved mascot/art variations may be used elsewhere only where the lock allows them.

## Public project labels

- Curio Cargo — HB-01 — featured title — Coming to Google Play
- Project Orchard — HB-02 — Cozy Space Farming — In Development
- Project Iron — HB-03 — Gladiatorial Action — In Development
- Project Beacon — HB-04 — Creature Survival — In Development

## Studio tagline

> Small studio. Big worlds. A little mischief.

Homepage headline:

> Clever games. Made with care.

## Site structure

- `/` — Home
- `/games/` — Games
- `/curio-cargo/` — Curio Cargo
- `/about/` — About
- `/support/` — Support hub
- `/support/curio-cargo/` — Curio Cargo support
- `/privacy/` — Privacy

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

Hosting is intentionally not provider-specific yet. The production target is a free static host with HTTPS and a custom domain. DNS and hosting should be connected only after the owner approves the production branch/site review.

This repository is intentionally independent from individual game repositories.


## Curio Cargo web demo (prepared; publication on hold)

The landing page creates the game iframe only after Play Web Demo is pressed.
The standalone runtime lives at `/curio-cargo/demo/`. Publish the entire directory
with its Build subdirectory unchanged. This uses the supplied Final_Fallback export
(Brotli + Unity Decompression Fallback ON), not the header-dependent original ZIP.
Serve `.unityweb` as static bytes without Content-Encoding; Unity's loader handles
decompression. No custom server, cross-origin isolation, or build step is required.
The original ZIP, Android build, locked banner and approved artwork are unchanged.

The Google Play listing is still in review. Keep Coming to Google Play and do not
publish this change until the owner resumes publication. When the real listing is
available, replace the marked status in `curio-cargo/index.html` with its approved
store link. The game export itself retains its existing end-of-demo store link.

Validation: fallback export bytes/ZIP integrity, all HTML local links and assets,
JavaScript syntax, locked asset byte comparison, desktop and 390px browser layout,
click-only iframe creation, close/reopen, and Unity startup on a plain static server.
Physical mobile, Safari/Firefox, and full playthrough were not tested in this pass.
