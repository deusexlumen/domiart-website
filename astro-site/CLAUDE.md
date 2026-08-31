# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

DOMIART — Marketing site for a general contractor in Dortmund (Modernisierung, Renovierung, Sanierung, Trockenbau, Malerarbeiten, Verputzarbeiten, Innenausbau, Entkernung/Entrümpelung, Badsanierung). Astro static site, deployed on Vercel. Repo root is the parent folder `Domiart firmenhomepage/`; this `astro-site/` subfolder is the live project — a sibling `site/` folder holds the old pre-Astro static HTML version, kept for reference only, not deployed.

Site content and all copy is German. Business: DOMIART — Adrian Polaczek, Altumstr. 1, 44265 Dortmund.

## Commands

Run from `astro-site/` (uses pnpm):

- `pnpm dev` — local dev server
- `pnpm build` — static build to `dist/`
- `pnpm preview` — preview the production build

No test suite, linter, or typecheck script configured.

## Architecture

- `output: 'static'` — fully static site, no server runtime. `astro.config.mjs` sets the canonical `site` URL and the `@astrojs/sitemap` integration (auto-generates sitemap on build).
- `src/layouts/Base.astro` — the single shared page shell. Takes `title`, `description`, `canonical`, and optional `robots`/`ogTitle`/`ogDescription` props. Renders `<head>` meta/OG tags, a `GeneralContractor` JSON-LD block (business NAP data), then `Header` / `<slot />` / `Footer` / `StickyCta` / `Lightbox`, then loads local vendor scripts (Lenis, GSAP, ScrollTrigger, SplitText) and `public/js/main.js`. A named `head` slot lets pages inject extra `<script type="application/ld+json">` blocks.
- `src/pages/*.astro` — one file per route, each wraps `Base` and supplies its own SEO props plus page-specific `BreadcrumbList`/`Service` JSON-LD in the `head` slot. Local SEO landing pages (`badsanierung-dortmund.astro`, `trockenbau-dortmund.astro`, `malerarbeiten-dortmund.astro`, `renovierung-dortmund.astro`, `verputzarbeiten-dortmund.astro`, `entkernung-entruempelung-dortmund.astro`) all follow the same structure: sub-hero → content sections → CTA, and repeat the same hardcoded phone number (`+49 155 68820575`) and WhatsApp deep link across files — update all of them together when contact details change.
- `src/components/` — `Header.astro`, `Footer.astro`, `Lightbox.astro`, `StickyCta.astro`. Small, mostly markup; no client-side framework components (no React/Vue) — this is plain Astro + vanilla JS.
- `public/js/main.js` — all interactive behavior (scroll animations via GSAP/ScrollTrigger/Lenis, form/config logic, lightbox, sticky CTA, mobile nav) in one plain-JS file, loaded `is:inline`. No bundler processing — edit it directly.
- `public/css/styles.css` — single global stylesheet (also `umfrage.css` for the survey page). No CSS framework/preprocessor.
- `public/assets/` — images, fonts (self-hosted, DSGVO/GDPR-compliant — no external font CDN), and vendor JS libraries committed directly (not npm-installed at runtime).
- Fonts and third-party scripts are self-hosted deliberately for GDPR compliance — do not switch to CDN-hosted fonts/scripts without checking this constraint.

## Conventions

- Every page must include: canonical URL prop, OG tags via `Base`, and appropriate JSON-LD (`GeneralContractor` is global via `Base`; add `BreadcrumbList` + `Service` per landing page).
- Phone (`0155 68820575` / `+4915568820575`) and WhatsApp CTA links are duplicated per-page rather than centralized — grep across `src/pages/` when changing contact info.
- `.env.local` holds `VERCEL_OIDC_TOKEN` (Vercel-managed, not a real secret to reason about).
