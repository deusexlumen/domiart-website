# 10x / SOTA-Analyse: DOMIART Firmen-Website
Session 2 | Datum: 2026-08-31

## Was seit Session 1 geliefert wurde

Fast das komplette "Do Now"- und "Do Next"-Paket steht bereits live
(astro-site/): Signature-Scroll-Sequenz "Vom Plan zum Raum" (Blueprint →
Baustelle → fertig, gepinnt, mit reduced-motion-Fallback), 3-Schritt-
Konfigurator → WhatsApp-Deep-Link, Sticky Mobile Call/WhatsApp-Bar, FAQ mit
FAQPage-Schema, Vertrauens-Band (4 Versprechen), Vorher/Nachher-Slider mit
Tastatur-Support, Galerie+Lightbox, Video-Feature, Bricolage-Grotesque-
Display-Typo, GSAP/Lenis/SplitText-Polish, Astro-Migration (SSG, 4 Seiten:
Start, Badsanierung-Dortmund, Impressum, Datenschutz), sauberer a11y-Pass
(Fokus-Ringe, aria-expanded, touch-action, kein stiller Video-Unmute).

**Ehrliches Ist-Urteil jetzt:** Die Seite hat den Sprung von "gutes Template"
zu "eigene Handschrift" geschafft — Signature-Sequenz und Konfigurator sind
tatsächlich unkopierbar ohne fremdes Investment. Die verbleibende Lücke ist
nicht mehr Design, sondern **Beweis** (Dritte, die für DOMIART sprechen) und
**Reichweite** (mehr Einstiegspunkte für Google-Suchen).

---

## The Question

Session 1 fragte: "Wie sieht die Seite unverwechselbar aus?" — beantwortet.
Session 2 fragt: **"Warum sollte ein Fremder DOMIART vertrauen, der die
Seite zum ersten Mal sieht — und wie findet er sie überhaupt?"**

---

## Massive Opportunities

### 1. Echte Bewertungen einziehen (Google Reviews API/Embed) 🔥
**What:** Live-Sektion mit echten Google-Bewertungen (Places API oder
Widget), Sterne-Summary im Trust-Band, Review-Schema (`AggregateRating`)
im JSON-LD für Rich Snippets in der Google-Suche.
**Why 10x:** Die gesamte Seite argumentiert "vertrau uns" — aber liefert
aktuell keinen einzigen Beweis von einem echten Dritten. Das ist die größte
verbleibende Conversion-Bremse. Sterne im Suchergebnis erhöhen die CTR
messbar, bevor der Nutzer die Seite überhaupt öffnet.
**Unlocks:** Rich Snippets in Google, Vertrauens-Sektion mit echtem Inhalt
statt eigenen Behauptungen.
**Effort:** Mittel (Places-API-Key, Caching, DSGVO-konforme Einbindung ohne
Drittanbieter-Tracking — selbst gebautes Widget statt Google-Embed-Skript).
**Risk:** Falls noch keine/wenige Google-Bewertungen existieren → erst
Kunden aktiv um Bewertung bitten (Postkarte/WhatsApp-Link nach Projektende).
**Score:** 🔥 — höchster Hebel, der noch fehlt.

### 2. Gewerk-Landingpages ausrollen (aktuell nur 1 von 9) 🔥
**What:** Aus `badsanierung-dortmund.astro` ein Template extrahieren und
für die übrigen Kern-Leistungen duplizieren: Trockenbau-Dortmund,
Malerarbeiten-Dortmund, Verputzarbeiten-Dortmund, Entkernung-Entrümpelung-
Dortmund, Renovierung-Dortmund. Je eigene Meta/Schema/Service-JSON-LD.
**Why 10x:** Eine Seite kann nicht für 9 unterschiedliche Suchintentionen
ranken. Die Badsanierungs-Seite beweist das Muster funktioniert (Struktur,
Schema, Conversion-CTA) — jetzt ist es reine Multiplikation eines
validierten Templates, kein Neu-Design.
**Effort:** Mittel (Text pro Gewerk, restliche Struktur ist copy+Astro-
Komponente).
**Score:** 🔥 — zinst sich jeden Monat weiter auf (SEO-Compounding).

---

## Medium Opportunities

### 1. Analytics ohne Drittanbieter-Cookie-Banner (Plausible/Umami self-host) 👍
**What:** Privacy-first Analytics einbauen — aktuell fliegt die Seite
blind, keine Daten welche Sektion/CTA konvertiert.
**Why:** Ohne Zahlen ist jede weitere Priorisierung Bauchgefühl. Self-
hosted vermeidet Cookie-Banner (Conversion-Killer Nr. 1 bei Handwerker-
Seiten).
**Effort:** Niedrig-Mittel. **Score:** 👍

### 2. Projekt-Case-Studies (3 Stück) statt nur Galerie-Grid 👍
**What:** Aus Session 1 übernommen, noch nicht umgesetzt: 3 ausführliche
Vorher→Prozess→Nachher-Strecken mit m², Dauer, Gewerken.
**Why:** Fotomaterial liegt vor (WA00xx-Serie), aktuell nur als Einzelbilder
im Grid verwendet — Erzählung fehlt noch.
**Effort:** Mittel. **Score:** 👍

### 3. WhatsApp-Konfigurator: Antwortzeit-Erwartung setzen 🤔
**What:** Nach Absenden der Konfigurator-Nachricht kurze Bestätigung
("Wir antworten in der Regel innerhalb von X Stunden") statt direktem
Sprung zu WhatsApp ohne Rückmeldung im eigenen Tab.
**Why:** Reduziert Unsicherheit nach Klick — kleiner Vertrauens-Baustein.
**Effort:** Niedrig. **Score:** 🤔

---

## Small Gems

1. **`AggregateRating` + `Review`-Schema vorbereiten**, sobald Bewertungen
   da sind — heute schon das JSON-LD-Grundgerüst anlegen. Aufwand: 15 Min.
2. **OG-Image prüfen** — `og:image` zeigt auf `/assets/img/og-image.jpg`,
   verifizieren ob Datei existiert und aktuelles Signature-Bild zeigt statt
   Platzhalter. Aufwand: 5 Min.
3. **Sitemap + robots.txt** für die neuen Gewerk-Seiten mitpflegen, sobald
   Massive #2 umgesetzt ist. Aufwand: trivial, aber leicht vergessen.
4. **`hreflang`/Structured-Data-Validator einmal laufen lassen** (Google
   Rich Results Test) — mit vier Schema-Blöcken (LocalBusiness, FAQPage,
   BreadcrumbList, Service) lohnt sich eine echte Validierung vor Go-Live.

---

## Recommended Priority

### Do Now
1. **OG-Image + Rich-Results-Test verifizieren** — 20 Minuten, verhindert
   stillen SEO-Schaden.
2. **Bewertungen aktiv einsammeln** (WhatsApp-Link an letzte 10 Kunden) —
   Voraussetzung für Massive #1, kein Code nötig, kann heute starten.

### Do Next
1. **Gewerk-Landingpages ausrollen** (Massive #2) — validiertes Template,
   reine Content-Arbeit + Astro-Page pro Gewerk.
2. **Self-hosted Analytics** — Datenbasis für jede weitere Entscheidung.

### Explore
1. **Google-Reviews-Integration** (Massive #1) — sobald genug echte
   Bewertungen vorliegen (Blocker: Kundenakquise der Bewertungen selbst).
2. **Projekt-Case-Studies** — sobald Inhaber Zeit für Text-Input hat.

### Backlog
1. PL-Sprachversion — unverändert aus Session 1, erst nach SEO-Fundament.
2. A/B-Tests auf CTA — braucht erst Traffic (siehe Analytics).

---

## Questions

### Blocker (brauche Inhaber-/User-Input)
- **Google Business Profile:** existiert es, wie viele Bewertungen aktuell?
- **OG-Image:** liegt `og-image.jpg` bereits vor oder Platzhalter?
- **Case-Study-Fakten:** 3 konkrete Projekte mit echten Eckdaten (Ort,
  m², Dauer) — sonst bleibt Session 1 hier blockiert.

## Next Steps
- [ ] OG-Image + Rich Results Test prüfen
- [ ] Go/No-Go für Gewerk-Landingpage-Rollout einholen
- [ ] Analytics-Tool festlegen (Plausible vs. Umami, Self-Host wo?)
- [ ] Bewertungs-Sammel-Aktion mit Inhaber abstimmen
