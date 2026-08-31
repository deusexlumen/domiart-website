# DOMIART Website — Masterplan (Audit, Redteam, Logo-Fix, Loading-Screen)

Date: 2026-08-31
Status: approved by user, ready for implementation planning

## Kontext

Adrian (Inhaber DOMIART) hat den bisherigen Build gegen seine Anforderungen
(siehe Memory `domiart_site_requirements.md`) geprüft. Dieses Dokument ist
der auditierte/redteamte Ist-Zustand plus zwei neue Aufträge, die während der
Review entstanden sind: Logo-Auffrischung (Kontrast + leichte Politur) und
ein kurzer, edler Ladebildschirm mit Logo-Reveal.

## 1. Requirements-Compliance-Audit

| Anforderung | Status | Beleg |
|---|---|---|
| Farben blau/weiß/dunkelblau | erfüllt | CSS `:root`, Header-Overlay `rgba(10,26,51,.85)` |
| SEO-Keywords (Modernisierung, Sanierung, Trockenbau, ...) | erfüllt | index.astro Ticker Z.129, Meta-Keywords Base.astro Z.32, JSON-LD `knowsAbout` |
| Exclude Schweißen / Dach (Roofing) | erfüllt | keine Treffer außer harmlosem "Dachboden" (Entrümpelung) |
| Exclude Fenster/Türen/Tore als aktives Angebot | **verletzt** | `renovierung-dortmund.astro:129` listet "Fensterbänke erneuern" als Leistung |
| Fewer/bigger Kategorien, keine dünnen Unterseiten | offener Punkt | Homepage selbst ist kompakt/gruppiert (erfüllt Adrians Kernwunsch: nicht überladen). 6 SEO-Unterseiten (~285–375 Zeilen, substanziell, keine Dünnseiten) existieren zusätzlich für Google-Suchbegriffe. Nicht klar ob Adrian das als "eine zusammenhängende Sache" oder als akzeptables SEO-Setup sieht — **bei Adrian direkt nachfragen**, nicht selbst entscheiden. |
| Scheune vorher+nachher als Video-Feature | teilweise | Nur Nachher als echter `<video>`-Player. Vorher ist bloßer Download-Link |
| Vorher/Nachher-Slider-Konvention | erfüllt | `ba-slider` Flur funktional |
| Foto-Highlights (Zarge-Präzision, Silikon, Rundungen) | erfüllt | Gallery-Items vorhanden |
| Kontakt: Telefon + WhatsApp + E-Mail | erfüllt | Kontakt-Sektion + Header-CTA |
| Logo "zu plain/weiß" | bestätigt | Header transparent vor Scroll, Logo nur mit drop-shadow über wechselndem Foto |
| Facebook als Sekundärkanal verlinkt | **fehlt** | Kein Facebook-Link im Footer/Kontakt |

## 2. Redteam-Findings (priorisiert)

1. **Hoch** — `renovierung-dortmund.astro:129`: "Fensterbänke erneuern" entfernen, verstößt gegen Adrians Exclude-Liste.
2. **Hoch** — Facebook-Link fehlt komplett (Footer oder Kontakt-Sektion), Anforderung war explizit "verlinken, nicht duplizieren".
3. **Hoch** — `index.astro:579`: Scheune-Vorher ist nur `<a href="scheune-vorher.mp4">` (Rohdatei-Link), kein Player — kein echtes Vorher/Nachher-Erlebnis wie beim Flur. Sollte gleiches Pattern wie `video-frame` (Nachher) bekommen, idealerweise Side-by-Side oder Toggle statt zwei getrennter UX-Muster.
4. **Mittel** — Header vor Scroll komplett transparent (`styles.css:260-271`), Logo schwimmt kontrastlos über Fotos → Ursache für Adrians "langweilig"-Eindruck.
5. **Mittel** — Kein Preloader/Ladezustand, GSAP/SplitText bereits vendored aber ungenutzt für Entry-Moment.
6. **Niedrig** — `domiart-logo.png` (459 KB) im Header ungenutzt, nur `-weiss`/`-header`-Varianten aktiv. Klären ob totes Asset.
7. **Niedrig-Mittel** — Hero-/Gallery-JPGs unkomprimiert (100–290 KB), keine WebP/AVIF-Varianten — Mobile-Performance.
8. **Niedrig** — `og-image.jpg` ist hardcoded identisch für alle Seiten (Base.astro Z.43), Unterseiten haben kein eigenes Social-Preview-Bild.

## 3. Logo-Fix

Ziel laut Adrian: Konzept behalten, nur Auffrischung (kein Redesign) — plus
Kontrast-Fix, da Header transparent über Fotos schwebt.

- **Kontrast:** `.site-header::before` erhält vor Scroll bereits einen
  dezenten Sockel-Gradient hinter der Logo-Zone
  (`linear-gradient(rgba(10,26,51,.35), transparent)`), statt komplett
  transparent bis zum ersten Scroll. Voller Blur-Background (is-scrolled)
  bleibt wie bisher als zweite Stufe.
- **Politur:** `domiart-emblem-header.png` (und `-weiss`-Variante) neu
  exportieren mit leichtem Blau-Akzent-Gradient/Rim-Light statt reinem
  Flach-Weiß. Symbolform unverändert, nur Oberflächen-Feinschliff.
- Hover-Interaktion (Rotation + Glow, `styles.css:314-321`) bleibt
  unverändert — funktioniert bereits gut.

## 4. Ladebildschirm — Logo-Reveal

Kurz, edel, keine Wartezeit-Simulation.

- **Dauer:** hart gedeckelt bei ~900–1200ms inkl. Fade-out. Läuft nicht auf
  echten Ladefortschritt, reine Marken-Inszenierung.
- **Ablauf:** Vollflächiger `--color-dark`-Screen → Emblem faded/scaled ein
  (GSAP `fromTo`, scale 0.92→1 + opacity) → Wortmarke zeichensweise per
  SplitText nach (Library bereits vendored, bisher ungenutzt) → kurzer Hold
  → Screen fadet weg, direkt in bestehende `data-reveal`-Hero-Animation.
- **Technik:** neue Komponente `Preloader.astro`, Init-Block ganz am Anfang
  von `main.js` (vor Lenis-Init). `overflow:hidden` auf `html` während der
  Anzeige, danach freigeben.
- **Reduced Motion:** `prefers-reduced-motion` → Preloader wird komplett
  übersprungen, kein Fallback-Spinner nötig.
- **Häufigkeit:** nur beim ersten Seitenaufruf der Session
  (`sessionStorage`-Flag), nicht bei jeder Client-Navigation.

## 5. Umsetzungsreihenfolge (Empfehlung)

1. Redteam-Fixes 1–3 (Fensterbänke raus, Facebook-Link, Scheune-Vorher-Player) — höchste Priorität, kleine Änderungen, direkt gegen Adrians Anforderungen.
2. Logo-Kontrast-Fix (CSS-only, kein Asset-Export nötig für ersten Schritt).
3. Logo-Politur (Asset-Export, kann parallel/später).
4. Preloader/Ladebildschirm (neue Komponente + main.js-Hook).
5. Performance-Cleanup (Bildkompression, WebP) — niedrige Priorität, danach.

## Offener Punkt für Adrian

Soll die Website bei den 6 SEO-Unterseiten bleiben (gut für Google-Rankings
pro Suchbegriff) oder zu einer einzigen zusammenhängenden Innenausbau-Seite
konsolidiert werden (näher an "eine Sache, nicht verstreut")? Das ist ein
Trade-off zwischen SEO-Reichweite und Adrians Wunsch nach Konsolidierung —
sollte er selbst entscheiden, nicht vorab angenommen werden.
