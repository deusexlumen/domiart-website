# 10x / SOTA-Analyse: DOMIART Firmen-Website
Session 1 | Datum: 2026-08-30

## Current Value — was die Seite heute leistet

**Stand:** Statischer One-Pager (site/), dunkler Navy-Hero, 9 Leistungs-Karten,
Vorher/Nachher-Slider, Galerie mit Lightbox, Baustellen-Video, Über-uns, Ablauf,
Kontakt (Tel/WhatsApp/Mail), Impressum/Datenschutz, LocalBusiness-Schema,
lokale Fonts/Assets, 0 Konsolen-Fehler, responsiv verifiziert.

**Die eine Aufgabe der Seite:** Ein Hausbesitzer im Raum Dortmund soll
anrufen oder per WhatsApp schreiben. Nicht „beeindrucken", nicht „informieren" —
**kontaktieren**. Jede SOTA-Entscheidung wird daran gemessen.

**Zielgruppe:** 35–65, Eigenheimbesitzer Dortmund/Ruhrgebiet, kommt über
Facebook, WhatsApp-Weiterempfehlung oder Google („Badsanierung Dortmund").
Entscheidet nach: Vertrauen > Referenzen > Erreichbarkeit > Preisgefühl.

**Ehrliches Ist-Urteil:** Die Seite ist aktuell „sehr gutes Agentur-Template".
Handwerklich sauber, aber austauschbar — dieselbe Seite könnte für jeden
Malerbetrieb stehen. SOTA heißt: **unverwechselbar DOMIART** + messbar mehr
Anfragen + technische Perfektion.

---

## Die SOTA-Lücke (Design-Kritik am eigenen Werk)

1. **Nummerierte Karten (01–09) ohne Sequenz.** Leistungen sind keine
   Abfolge — die Nummern sind Deko. Entweder echte Bedeutung geben oder
   streichen und durch ikonische, gewerk-spezifische Bildstreifen ersetzen.
2. **Dark + ein Accent = KI-Default-Look #2.** Navy/Azure ist nah am
   generischen „dunkel mit Signalfarbe"-Cluster. Die Rettung: die
   **Materialwelt des Handwerks** ins Design holen — Fugenlinien,
   Putz-Textur, Blueprint-Strichstärken, Beton- und Fliesentöne als
   sekundäre Palette. Das kann kein Template.
3. **Space Grotesk + Inter = die Standard-Paarung.** Funktioniert, sagt
   aber nichts. SOTA: eine Display-Schrift mit echtem Charakter.
4. **Die stärksten Assets liegen brach:** 60+ echte Fotos, echtes Video,
   echter Inhaber mit echtem Gesicht. Templates nutzen Stock — wir haben
   Beweismaterial. Das ist der eigentliche Wettbewerbsvorteil.
5. **Conversion ist passiv** („rufen Sie an"). Keine Führung, keine
   Qualifizierung, keine Vertrauensbeweise Dritter (Bewertungen).

---

## The Question

Was macht die Seite so gut, dass ein Hausbesitzer sie einem Nachbarn zeigt
und sagt: „Guck mal, DIE sollen unser Bad machen"?

---

## Massive Opportunities

### 1. „Vom Plan zum Raum" — die Signature-Scroll-Sequenz 🔥
**What:** Eine gepinnte Scroll-Sequenz (GSAP ScrollTrigger): Beim Scrollen
zeichnet sich ein Raum als Blueprint-Skizze (animierte SVG-Striche, Maßpfeile,
Bemaßung in DOMIART-Blau) → Linien füllen sich mit Baustellen-Textur →
morpht ins fertige Projektfoto. Ein einziger, orchestrierter Moment, der die
Kernbotschaft *ist*: „Wir machen aus Plänen Räume."
**Why 10x:** Unverwechselbar, thematisch 100 % on-brand (Modernisierung =
Transformation), teilbar („hast du die Seite gesehen?"), und ersetzt die
generische Hero-These durch ein Erlebnis. Genau EIN kalkuliertes Risiko,
Rest bleibt diszipliniert ruhig (Chanel-Regel).
**Unlocks:** Award-Niveau-Optik ohne Conversion zu opfern (die Sequenz lebt
in einer eigenen Sektion, nicht im Conversion-Pfad).
**Effort:** Hoch (SVG-Pfade des Raums zeichnen, 3 Zustände, scrub-timeline,
Fallback statisch für reduced-motion).
**Risk:** Performance auf schwachen Handys → statischer Fallback,
prefers-reduced-motion, Canvas statt DOM wo nötig.
**Score:** 🔥 — das Signature-Element, an dem die Seite hängen bleibt.

### 2. Leistungs-Konfigurator → vorbefüllte WhatsApp-Nachricht 🔥
**What:** Interaktiver 3-Schritt-Assistent: (1) Was? (Bad / Wohnräume /
Keller / Außen / Komplett) (2) Umfang? (m²-Schätzer, Zustand) (3) Wann?
→ erzeugt strukturierte WhatsApp-Nachricht an 0155 68820575:
„Hallo DOMIART, ich möchte mein Bad (ca. 6 m², Altbau) modernisieren,
frühestens ab Oktober."
**Why 10x:** Senkt die Hemmschwelle massiv — kein Formular, keine E-Mail,
kein Telefon-Zwang. Der Inhaber bekommt **qualifizierte** Anfragen statt
„was kostet ein Bad". Das ist der Unterschied zwischen Broschüre und
Vertriebsmitarbeiter.
**Effort:** Mittel (reines Frontend, WhatsApp deep-link, kein Backend nötig).
**Risk:** Gering. Funktioniert auf jedem Handy sofort.
**Score:** 🔥 — der einzelne größte Conversion-Hebel auf der Seite.

### 3. Content-Festung lokale SEO: Gewerk-Seiten + Projekte + Ratgeber 👍
**What:** Pro Gewerk eine Unterseite (Badsanierung Dortmund, Trockenbau
Dortmund, Entrümpelung Dortmund …), 3 ausführliche Projekt-Case-Studies
(m², Dauer, Gewerke, Vorher/Nachher-Strecke), 1–2 Ratgeber („Was kostet
eine Badsanierung 2026?", „Entkernung: Ablauf & Preise").
**Why 10x:** One-Pager ranken für fast nichts. Echte Kundensuche passiert
gewerk-spezifisch + lokal. Ratgeber fängt Informations-Suchende früh im
Trichter. Zinses-Effekt: wird mit jedem Monat wertvoller (Defensibility).
**Effort:** Hoch (Texte, Astro-Migration sinnvoll, Schema pro Seite).
**Score:** 👍 — strategisch die wichtigste Baustelle nach Phase 1.

---

## Medium Opportunities

### 1. Vertrauens-Beweise: Bewertungen & Versprechen 🔥
**What:** Google-Bewertungen-Sektion (statisch kuratiert oder via
Business-Profile-Link), „Antwort noch heute"-Versprechen, Projekt-Zähler,
„Inhaber persönlich vor Ort"-Badge mit echtem Foto von Adrian (WA0074 zeigt:
authentische Arbeitsfotos schlagen jedes Stockbild).
**Why:** Vertrauen ist Kaufkriterium #1 bei Handwerkern. Fehlt komplett.
**Effort:** Niedrig-Mittel. **Score:** 🔥

### 2. Galerie 2.0: WebGL-Übergänge + Projekt-Stories 👍
**What:** Displacement-/Tilt-Hover auf Galeriebildern, und aus Einzelbildern
werden Mini-Stories: 3–5 Fotos eines Projekts als Strecke (Entkernung →
Rohbau → Fertig — Material liegt vor: WA0070/72 → WA0030 → WA0060/65).
**Why:** Prozess sichtbar machen = Professionalität beweisen.
**Effort:** Mittel. **Score:** 👍

### 3. Cinematic Hero: echtes Querformat-Baustellen-Video 🤔
**What:** Neues horizontales Video drehen (30 s, Zeitraffer Fliesen legen /
Sichtschutz montieren), als Hero-Hintergrund mit Ken-Burns-Fallback.
**Why:** Bewegtbild wirkt premium — ABER das aktuelle Video ist vertikal
und schwach; ohne neuen Dreh ist das ein Downgrade-Risiko.
**Effort:** Mittel (erfordert Dreh durch Inhaber). **Score:** 🤔 (abhängig
vom Inhaber)

### 4. „Wir waren schon hier" — Projekt-Karte von Dortmund 👍
**What:** Stadtteil-genaue (anonymisierte) Karte abgeschlossener Projekte.
„In Ihrer Straße haben wir schon 3 Bäder saniert."
**Why:** Lokale Nähe ist ein Kaufargument, das kein Wettbewerber kopieren
kann, ohne selbst dort gebaut zu haben. Datenschutz-sauber auf
Stadtteil-Ebene.
**Effort:** Mittel (statische SVG-Karte Dortmund, keine externe Map-API =
DSGVO-sauber). **Score:** 👍

### 5. Astro-Migration als Fundament 👍
**What:** Umzug auf Astro (SSG): Content-Collections für Leistungen/Projekte/
Ratgeber, Islands nur wo JS nötig (Slider, Konfigurator), sharp-Bildpipeline
(AVIF+WebP+srcset), View Transitions, Speculation Rules für Instant-Nav.
Output bleibt statisch → läuft weiterhin auf IONOS.
**Why:** Phase-2-Content ohne Framework wird Copy-Paste-Hölle; Astro liefert
SOTA-Performance-Budget quasi gratis.
**Effort:** Mittel-Hoch. **Score:** 👍 (Voraussetzung für Massive #3)

---

## Small Gems (kleiner Aufwand, unverhältnismäßige Wirkung)

1. **FAQ-Sektion mit FAQPage-Schema** 🔥 — 5–6 echte Fragen („Was kostet…",
   „Wie lange dauert…", „Muss ich während der Sanierung ausziehen?").
   SEO-Featured-Snippets + nimmt Ängste. Aufwand: 1 Stunde.
2. **Sticky Mobile Call-Button** 🔥 — auf dem Handy permanent sichtbar:
   „Anrufen" + WhatsApp-Icon. Mobile = 70 %+ des Traffics. Aufwand: winzig.
3. **Magnetic Buttons + Custom Cursor (nur Desktop, fein)** 👍 — das
   „teuer anfühlen"-Detail. Reduziert auf Micro-Level, nicht verspielt.
4. **Text-Scramble/Type-on auf dem Keyword-Ticker** 🤔 — Ticker reagiert
   auf Hover: Begriff „zeichnet" sich kurz neu. Delight ohne Nutzenverlust.
5. **Tatsächliche Verfügbarkeit** 👍 — kleine Zeile im Kontakt: „Nächster
   Beratungstermin: ab KW 37 frei" (manuell gepflegt). Erzeugt sanfte
   Verknappung + Aktualitäts-Signal.
6. **Druckoptimierte Angebots-PDF?** ❌ — Overkill, kein Nutzer druckt.
7. **PL-Sprachversion** 🤔 — Ruhrgebiet hat große polnische Community,
   Inhaber heißt Polaczek. Echter Differenzierer, aber doppelter
   Pflegeaufwand — erst nach Phase 2 entscheiden.
8. **Bild-Signaturen: „Fugenlinie" als Section-Divider** 👍 — Trennlinien
   als Fliesenfugen-Raster/Blueprint-Maßkette statt gerader Linien.
   Einzigartiges Ornament aus der eigenen Materialwelt. Billig, subtil, wirkt.

---

## Recommended Priority

### Do Now — Quick Wins (1–2 Tage, kein Redesign nötig)
1. **Sticky Mobile Call/WhatsApp-Bar** — sofort mehr Kontakte, 30 Minuten.
2. **FAQ mit Schema** — SEO + Vertrauen, ~1 Stunde.
3. **Leistungs-Konfigurator → WhatsApp** — der Conversion-Hebel, halber Tag.
4. **Bewertungs-/Vertrauens-Sektion** (Kuratiert + „Antwort noch heute") — 2 h.
5. **Karten-Nummern 01–09 hinterfragen** → durch Gewerk-Bildstreifen oder
   echte Icons ersetzen; Fugen-Divider als erstes Marken-Ornament einziehen.

### Do Next — SOTA-Design-Pass (3–5 Tage)
1. **Signature-Sequenz „Vom Plan zum Raum"** bauen (Blueprint→Realität,
   pinned scroll, Fallbacks). — Unlock: Unverwechselbarkeit.
2. **Typografie-Upgrade:** Display-Schrift mit Charakter (Empfehlung:
   Bricolage Grotesque oder Clash Display) + Inter/Satoshi Body; Zitat-
   Akzente in kontrastierender Serifen-Italik für den Visitenkarten-Slogan.
3. **Material-Palette:** Navy/Azure bleibt (Vorgabe!), ergänzt um
   Betongrau, Fugenweiß, Putz-Ton — Texturen in Cards/Dividern.
4. **Galerie 2.0** als Projekt-Strecken (Entkernung→Fertig) mit
   Tilt/Displacement-Hover.
5. **Performance-Budget:** Lighthouse 100/100/100/100 als harte Gate,
   AVIF+srcset, reduced-motion-Audit.

### Explore — Strategische Wetten (danach, mit Inhaber-Input)
1. **Astro-Migration + Content-Festung** (9 Gewerk-Seiten, 3 Case Studies,
   2 Ratgeber) — Risk: Texterstellung braucht Inhaber-Fakten; Upside:
   lokale SEO-Dominanz, die sich monatlich verzinst.
2. **Projekt-Karte Dortmund** — Upside: lokaler Beweis, unkopierbar.
3. **Neuer Querformat-Video-Dreh** für Cinematic Hero — Risk: hängt am
   Inhaber; Upside: Premium-Wahrnehmung sofort.

### Backlog (gut, aber nicht jetzt)
1. PL-Sprachversion — erst wenn DE-Content steht.
2. Privacy-Analytics (Umami/Plausible selbst-gehostet) — mit Go-Live.
3. A/B-Tests auf CTA-Varianten — braucht erst Traffic.

---

## Design-Token-Skizze für den SOTA-Pass (Arbeitsgrundlage)

**Farbe (6 benannte Werte):**
- `tiefsee #081A33` (Basis dunkel) · `nacht #05101F` (Footer)
- `signal #1F6FD8` (CTA) · `azure #38A3E8` (Akzent/Blueprint-Linien)
- `fugenweiss #F2F5F9` (hell) · `beton #8B98A8` (Sekundär-Text/Flächenkanten)
- Optional als Micro-Akzent: `kreide #E8E2D6` (Putz-/Kreideton für
  Zitat-Flächen — bricht das „nur blau"-Korsett ohne Fremdgehen)

**Typo:** Display: *Bricolage Grotesque* (charaktervoll, variabel, free) —
Body: *Inter* (bleibt) — Zitat/Slogan: Serifen-Italik-Kontrast (z. B.
*Zodiak* o. ä.) für „Wir betreuen Ihr Projekt, als wäre es unser eigenes."

**Layout-Idee (ASCII):**
```
[Hero: These + Foto]                → bleibt, Feinschliff
[Ticker: Keywords]                  → bleibt
[LEISTUNGEN: Karten mit Bildstreifen statt 01-09]
[SIGNATURE: gepinnte Sequenz „Vom Plan zum Raum"]
[BA-PROJEKTSTRECKE: Entkernung→Fertig (Slider+Timeline)]
[KONFIGURATOR: 3 Schritte → WhatsApp]   ← Conversion-Kern
[BEWEISE: Bewertungen + Zahlen + Inhaber-Foto]
[GALERIE 2.0: Stories + Lightbox]
[ABLAUF 4 Schritte]                 → Nummerierung hier LEGITIM (Sequenz!)
[KONTAKT + Verfügbarkeit]           [Footer]
```

**Signature:** Die Blueprint→Raum-Scroll-Sequenz. Ein Moment, kein Effekt-
Feuerwerk. Alles andere bleibt ruhig und präzise.

---

## Questions

### Beantwortet (aus bisherigem Material)
- **Farben?** Blau/Weiß/Dunkelblau (Vorgabe Inhaber) — bleibt Basis.
- **Schweißen/Dach?** Kommt nicht vor (Gebiet von „Sascha").
- **Keywords?** Modernisierung, Renovierung, Sanierung, Trockenbau, Maler,
  Verputzarbeiten, Innenausbau, Entkernung, Entrümpelung — überall verdrahtet.

### Blocker (brauche Inhaber-/User-Input)
- **Bewertungen:** Gibt es Google-Bewertungen / darf ich Kundenstimmen
  formulieren bis echte vorliegen? (Google Business Profile existiert?)
- **USt-IdNr.** fürs Impressum.
- **Fakten für Case Studies:** echte Projektdaten (Ort/Stadtteil, Dauer,
  Umfang) — sonst schreibe ich generisch.
- **Foto von Adrian** (Porträt) für Über-uns/Vertrauen — vorhanden?
- **Vorher/Nachher echt gleiches Bad?** (aktuell: konzeptionelles Paar)

## Next Steps
- [ ] User-Go für „Do Now"-Paket (kann sofort umgesetzt werden)
- [ ] Entscheid: Astro-Migration ja/nein (steuert Phase 2)
- [ ] Inhaber-Fakten einsammeln (Fragebogen oder Sprachnachricht)
- [ ] IONOS-Deployment-Strategie festlegen (FTP-Upload vs. Netlify/Vercel)
