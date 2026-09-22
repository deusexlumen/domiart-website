# Abschlussbericht: Website domiart-moresa.de — Google-Sichtbarkeit & Datenschutz

**Datum:** 17.09.2026
**Gegenstand:** Suchmaschinen-Einrichtung, Datenschutz-Prüfung, Ladezeit-Analyse
**Ergebnis:** Alle Ziele erreicht — mit einer bewussten Entscheidung gegen eine Metrik-Optimierung (s. Punkt 5)

---

## 1. Ausgangslage

Die neue Website (domiart-moresa.de) war seit dem 16.09.2026 live, aber für Google praktisch unsichtbar: keine Search Console eingerichtet, keine Sitemap eingereicht, keine Indexierung beantragt. Bing kannte die Seite ebenfalls nicht. Ob die Seite datenschutzrechtlich sauber aufgebaut ist (keine externen Dienste, keine Abmahnfallen), war ungeprüft.

## 2. Ziele

1. Google Search Console einrichten (Domain-Property, Sitemap einreichen, Indexierung aller 4 Seiten beantragen)
2. Bing Webmaster Tools übernehmen (Daten aus der Search Console)
3. Facebook-Profil prüfen (Telefonnummer, Firmenname)
4. PageSpeed auf dem Handy messen; bei LCP über 2,5 s den Preloader anpassen
5. Datenschutz sicherstellen: alles selbst gehostet, keine externen APIs

## 3. Was wurde gemacht

**Google Search Console**
- Domain-Property `domiart-moresa.de` angelegt. Der automatische Verifizierungsweg von IONOS wurde bewusst abgebrochen: Er hätte die Mail-Einträge der Domain (MX-Records) gelöscht und damit das E-Mail-Postfach gefährdet.
- Stattdessen: Verifizierungs-TXT-Record manuell in den DNS-Einstellungen bei IONOS eingetragen. Mail-Einträge unverändert. Bestätigung durch Google sofort erfolgt.
- Sitemap (`sitemap-index.xml`) eingereicht — Status: **Erfolgreich, 4 Seiten erkannt**.
- Indexierung beantragt für: Startseite, Fliesenarbeiten Dortmund, Renovierung Dortmund, Trockenbau Dortmund. (Startseite war bereits indexiert → Recrawl; die drei Leistungsseiten sind neu → Neuaufnahme beantragt.)

**Bing Webmaster Tools**
- Seite per Import aus der Search Console übernommen — keine separate Verifizierung nötig.
- Sitemap eingereicht, 0 Fehler.

**Datenschutz-Prüfung**
- Ergebnis: vollständig sauber. Schriften lokal gehostet (keine Google Fonts), keine Analyse-Tools, keine Cookies, keine Tracker, keine eingebetteten Inhalte (iframes), keine CDN-Aufrufe. Animationen lokal. Das Kontaktformular versendet nichts an Dritte (reine E-Mail-Verknüpfung). Es existiert keine externe Schnittstelle, über die personenbezogene Daten ins Ausland gelangen könnten — kein Abmahnrisiko aus dieser Richtung. Impressum und Datenschutzerklärung liegen vor.

**PageSpeed (Mobil)**
- Erstmessung: LCP (Ladezeit des Hauptinhalts) **5,0 s** — deutlich über dem Google-Richtwert von 2,5 s. Hauptursache: der 2-Sekunden-Intro-Vorhang (Preloader).
- Optimierung gebaut und live gestellt: Intro auf ca. 1,3 s verdichtet, für Besucher aus der Google-Suche komplett übergangen, Bildprioritäten korrigiert. Folgemessung: LCP **3,9 s**.
- Anschließend: **Optimierung komplett zurückgenommen** (s. Punkt 5).

## 4. Stand nach Abschluss

| Bereich | Status |
|---|---|
| Google Search Console | Eingerichtet, bestätigt, Sitemap erfolgreich, Indexierung beantragt |
| Bing Webmaster Tools | Importiert, Sitemap eingereicht, 0 Fehler |
| Datenschutz | Geprüft, keine Beanstandungen |
| Preloader / Ladezeit | Originalzustand wiederhergestellt (bewusste Entscheidung) |
| Facebook | Nicht bearbeitet (offen, s. Punkt 6) |

Erste Klick- und Impressionsdaten erscheinen in der Search Console in ca. 1–2 Tagen, bei Bing bis zu 48 h.

## 5. Entscheidungen und Abstriche

**Entscheidung 1 — Mail-Einträge schützen statt Bequemlichkeit.**
Der von Google vorgeschlagene Automatik-Weg bei IONOS hätte die Mail-DNS-Einträge der Domain gelöscht und damit das Firmen-E-Mail-Postfach lahmgelegt. Entscheidung: manueller TXT-Eintrag, fünf Minuten mehr Aufwand, E-Mail läuft ungestört weiter.

**Entscheidung 2 — Markenwert schlägt Metrik (Preloader).**
Der Intro-Vorhang ist kein Ladebalken, sondern die Markeninszenierung der Firma: Die „Fuge" öffnet sich — passend zum Leistungsversprechen „Auf die Fuge kommt es an". Die Optimierung (schnellerer Vorhang, Wegfall für Google-Besucher) hätte den Google-Lab-Wert verbessert, aber genau den wertvollsten Neukunden (aktive Suchende) die Markenbotschaft vorenthalten. Entscheidung des Auftraggebers: Original vollständig wiederherstellen. In Kauf genommen: Der Google-Lab-Messwert bleibt über dem 2,5-s-Richtwert. Eingeordnet: Für ein lokales Handwerksunternehmen ist der LCP nur ein Nebensignal — Local SEO (Google-Unternehmensprofil, Bewertungen, Nähe, Suchbegriffe mit „Dortmund") dominiert das Ranking. Das ist ein bewusster Tausch: Markenauftritt gegen Metrikpunkte.

**Abstrich — Facebook blieb unberührt.**
Der Punkt „Telefonnummer auf Facebook ändern (0176 66312573 → 0155 68820575) und Firmennamen abgleichen" wurde auf Wunsch des Auftraggebers übersprungen und ist offen.

## 6. Empfohlene nächste Schritte

1. **Facebook:** Telefonnummer auf 0155 68820575 ändern und Firmennamen mit dem Google-Unternehmensprofil abgleichen (ca. 10 Minuten, kein Fachwissen nötig).
2. **In ca. einer Woche:** Search Console öffnen — prüfen, ob alle 4 Seiten indexiert sind (Bericht „Indexierung") und die ersten Suchanfragen sichtbar werden.
3. **Google-Unternehmensprofil** weiter pflegen (Bewertungen beantworten, Fotos) — das ist für lokale Sichtbarkeit wichtiger als jede Technik auf der Website.
