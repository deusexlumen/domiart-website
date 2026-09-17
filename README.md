# 🏗️ DOMIART — Firmenwebsite

> Marketing-Website für **DOMIART**, Bauunternehmung in Dortmund — schnell, statisch gebaut und gezielt auf lokales SEO optimiert.

[![Live](https://img.shields.io/badge/LIVE-www.domiart--moresa.de-8A2BE2?style=for-the-badge&logo=googlechrome&logoColor=white)](https://www.domiart-moresa.de)
[![Astro](https://img.shields.io/badge/Astro-5.0-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![pnpm](https://img.shields.io/badge/pnpm-verwaltet-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io)
[![Vercel](https://img.shields.io/badge/Hosted-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

---

## 🌐 Live-Betrieb

| | |
|---|---|
| **Live-Seite** | [www.domiart-moresa.de](https://www.domiart-moresa.de) |
| **Domain** | Beim Kunden erworben, DNS/Weiterleitung über **IONOS** |
| **Hosting** | **Vercel** (Auto-Deploy aus `main`) — dieses Repo ist der finale Stand |
| **Demo-URL** | [domiart-website.vercel.app](https://domiart-website.vercel.app) leitet per 307-Redirect auf die Live-Seite um (kein Duplicate Content für Google) |

## ✨ Was ist das?

Dieses Repo enthält die komplette Website für **DOMIART** aus Dortmund:
Generalunternehmung für Modernisierung, Renovierung & Sanierung — von der **Badsanierung** über **Trockenbau** und **Malerarbeiten** bis zur **Entkernung/Entrümpelung**.

Die Seite ist ein **vollständig statischer Astro-Site** (kein Server-Runtime, kein Framework-JS) mit Fokus auf:

- ⚡ **Performance** – minimaler JS-Fußabdruck, selbst gehostete Fonts (DSGVO-konform)
- 🔍 **Lokales SEO** – eigene Landingpages pro Gewerk für Dortmund (`/badsanierung-dortmund`, `/trockenbau-dortmund`, …), Canonical/OG/Sitemap alle auf `www.domiart-moresa.de`
- 📱 **Conversion** – Sticky-CTA, WhatsApp-Deep-Link, Anfrageformular
- ♿ **Sauberes Markup** – plain Astro + Vanilla JS, kein React/Vue

## 🧱 Tech-Stack

| Bereich | Technik |
|---|---|
| Static Site Generator | [Astro 5](https://astro.build) (`output: 'static'`) |
| Styles | Ein globales CSS – kein Framework, kein Präprozessor |
| Animationen | GSAP / ScrollTrigger / Lenis / SplitText (als Vendor-Dateien in `public/`) |
| Sitemap | `@astrojs/sitemap` (automatisch beim Build) |
| Hosting | [Vercel](https://vercel.com) (Auto-Deploy aus `main`) |
| Domain | IONOS (beim Kunden) |
| Paketmanager | pnpm |

## 📁 Repository-Struktur

```
.
├── astro-site/          # ← das Live-Projekt (Astro)
│   ├── src/
│   │   ├── layouts/Base.astro      # Seitengerüst: Meta/OG, JSON-LD, Header/Footer
│   │   ├── pages/*.astro           # eine Datei pro Route
│   │   └── components/             # Header, Footer, StickyCta, Lightbox
│   ├── public/
│   │   ├── css/styles.css          # globales Stylesheet
│   │   ├── js/main.js              # komplette Interaktivität (Vanilla JS)
│   │   └── assets/                 # Bilder, Fonts, Vendor-Libs
│   └── docs/                       # Specs & Audits
├── .claude/             # KI-Arbeitsnotizen/Docs
└── kundenpaket/         # Übergabe-Material für den Kunden
```

## 🚀 Entwicklung

Alle Befehle laufen im Ordner `astro-site/` mit **pnpm**:

```bash
pnpm install     # Abhängigkeiten installieren
pnpm dev         # Dev-Server (localhost)
pnpm build       # statischer Build → dist/
pnpm preview     # Produktions-Build lokal ansehen
```

Es gibt aktuell **kein** Test-Framework, keinen Linter und kein Type-Check-Skript.

## 📝 Hinweise

- Alle Inhalte und Copy sind **deutsch**.
- Details zur Architektur, SEO-Struktur und Design-Entscheidungen stehen in [`astro-site/CLAUDE.md`](astro-site/CLAUDE.md).
- Kontaktdaten von DOMIART (Telefon, WhatsApp, Anschrift) stehen **bewusst nicht im Repo**, sondern auf der [Live-Website](https://www.domiart-moresa.de).

---

## 👨‍💻 Credits

Konzept, Design & Umsetzung: **[deusexlumen](https://github.com/deusexlumen)** · [deusexlumen@airmail.cc](mailto:deusexlumen@airmail.cc) 🚀

*Individuelle Websites für Handwerk & Mittelstand — performant, SEO-stark, DSGVO-sicher.*
