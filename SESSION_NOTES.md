# DOMIART Firmenhomepage — Session Notes

## Status
- **LIVE seit 16.09.2026:** https://www.domiart-moresa.de (Vercel, Hobby). Apex → www per 308-Redirect. Alle 6 Seiten, robots.txt, sitemap-index geprüft.
- Letzter Commit `18a5dbc` auf `main` (Datenschutz wieder Vercel-Text).
- DNS bei IONOS: A @ → 76.76.21.21, CNAME www → 1cf602fced6031a5.vercel-dns-017.com (Vercel-Empfehlung statt Legacy cname.vercel-dns.com). **Mail-DNS (MX/SPF/DKIM/DMARC) unverändert.**
- Entscheidung 16.09: Produktiv = Vercel (kostenlos). IONOS-Pläne (Webspace/Plus) verworfen — Buxe: sinnlos teuer für 5-seitige Static-Site.

## IONOS-Vertragslage (wichtig für März 2027)
- Vertrag 111180719 **MyWebsite Now Plus**: 1 €/Monat Promo, Verlängerung **16.03.2027** — danach ~13 €/Monat. Vorher kündigen!
- **domiart-moresa.de ist Zusatz-Domain IN diesem Vertrag** (Verlängerung 29.03.2027) — beim Kündigen Domain als eigenen Vertrag behalten (~0,42 €/Monat), sonst geht sie verloren.
- Vertrag 111180721 Website Abmahnschutz: ebenfalls bis 16.03.2027, mit kündigen.
- Rechnungshistorie bestätigt: 1 €/Monat seit März 2026.
- IONOS-Hinweis: "Default Site"-Service wurde beim DNS-Umbau automatisch deaktiviert (Konflikt-Auflösung) — Baukasten-Bindung der Domain damit gelöst.

## Offen / TODO
- [ ] **Dezember 2026 bis spätestens Februar 2027:** Kündigungen vorbereiten (Baukasten + Abmahnschutz zum 16.03.2027, Domain sichern als Eigenvertrag). Zusammen mit Adrian durchklicken.
- [ ] Adrian fragen: nutzt er info@domiart-moresa.de? Wenn nein → Mail-Vertrag ebenfalls kündigen.
- [x] ~~Google Business Profil~~ → erledigt (Adrian hat es selbst beansprucht). Offen bleibt: Bewertungen sammeln → dann Sektion + aggregateRating im JSON-LD nachrüsten.
- [ ] Erreichbarkeits-Text absegnen lassen („Mo–Sa nach Vereinbarung, abends möglich")
- [ ] Foto-Zuordnung Projekte
- [ ] FB-Seite: andere Telefonnummer (0176 66312573) angleichen an Website (0155 68820575)
- [ ] Adrian soll IONOS-Passwort ändern (Zugangsdaten wurden weitergegeben)
- [ ] Search Console einrichten (Domain-Property)
- [ ] Optional: FAQ-JSON-LD auf Unterseiten, meta keywords entfernen, fonts.css dangling comment

## Entscheidungen & Erkenntnisse
- **2026-09-07 — Logo ist EINE Einheit:** Header nutzt komplettes Farb-Wappen (`domiart-logo-header.webp`), kein Split mehr. Split (Emblem+Wortmarke nebeneinander) war Relikt der alten Weiß-Silhouetten. Quelle aller Logo-Derivate: `ChatGPT Image 7. Sept. 2026, 08_43_47.png` in Downloads, Schnitt Emblem/Wortmarke bei y=695.
- **2026-09-07 — Preloader ~2 s:** Tempo 1,3 → 2,0 s mit Halte-Phase (Buxe: zu schnell wirkt billig). KEIN Text im Preloader (Buxe: liest eh keiner). Emblem 160px hoch. Notbremse 2,6 s. Choreo = GSAP-Timeline in `main.js`, Fugen-Motiv.
- **2026-09-07 — Keyframe-Falle:** Bei CSS-Keyframes fehlende Properties in Zwischen-Keyframes → Browser interpoliert über die ganze Spanne (war der Geist-Logo-Bug im Prototyp, `pl-lay` opacity).
- **2026-09-07 — Adrian-Vorgaben (hart):** NUR Innenrenovierung. Kein Außenputz/Fassade, keine Fenster/Türen, keine Fensterbänke, kein Garten/Außenbereich. Scheune = Flaggschiff. Vorher/Nachher zentral.
- **2026-09-07 — Google Business Profil ist der Haupt-Hebel** (wichtiger als die Website), Profil aktuell unbeansprucht. Steht so auch im Adrian-Handout.
- Handouts: `.handoff/HANDOUT-ADRIAN.md` (für Adrian, WhatsApp-tauglich), `.handoff/HANDOFF-BUXE.md` (technische Details dieser Session). `.handoff/` ist gitignored.

