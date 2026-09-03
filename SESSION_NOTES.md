# DOMIART Firmenhomepage — Session Notes

## Status
- Website feature-fertig, letzter Commit `61be130` auf `main` (gepusht, 2026-09-07).
- Deploy: Vercel (domiart-website.vercel.app). Ziel-Domain domiart-moresa.de = noch IONOS-Parkseite.
- Livegang blockiert durch 2 Adrian-Punkte (s. TODO).

## Entscheidungen & Erkenntnisse
- **2026-09-07 — Logo ist EINE Einheit:** Header nutzt komplettes Farb-Wappen (`domiart-logo-header.webp`), kein Split mehr. Split (Emblem+Wortmarke nebeneinander) war Relikt der alten Weiß-Silhouetten. Quelle aller Logo-Derivate: `ChatGPT Image 7. Sept. 2026, 08_43_47.png` in Downloads, Schnitt Emblem/Wortmarke bei y=695.
- **2026-09-07 — Preloader ~2 s:** Tempo 1,3 → 2,0 s mit Halte-Phase (Buxe: zu schnell wirkt billig). KEIN Text im Preloader (Buxe: liest eh keiner). Emblem 160px hoch. Notbremse 2,6 s. Choreo = GSAP-Timeline in `main.js`, Fugen-Motiv.
- **2026-09-07 — Keyframe-Falle:** Bei CSS-Keyframes fehlende Properties in Zwischen-Keyframes → Browser interpoliert über die ganze Spanne (war der Geist-Logo-Bug im Prototyp, `pl-lay` opacity).
- **2026-09-07 — Adrian-Vorgaben (hart):** NUR Innenrenovierung. Kein Außenputz/Fassade, keine Fenster/Türen, keine Fensterbänke, kein Garten/Außenbereich. Scheune = Flaggschiff. Vorher/Nachher zentral.
- **2026-09-07 — Google Business Profil ist der Haupt-Hebel** (wichtiger als die Website), Profil aktuell unbeansprucht. Steht so auch im Adrian-Handout.
- Handouts: `.handoff/HANDOUT-ADRIAN.md` (für Adrian, WhatsApp-tauglich), `.handoff/HANDOFF-BUXE.md` (technische Details dieser Session). `.handoff/` ist gitignored.

## Offen / TODO
**Blockiert Livegang (nur Adrian kann liefern):**
- [x] ~~USt-ID~~ → gelöst: Adrian hat keine USt-IdNr., dafür Steuernummer 315/5192/4533, Finanzamt Dortmund-Hörde (aus seinem Kleinanzeigen-Profil). Impressum umgestellt auf „Steuernummer"-Sektion.
- [ ] **Porträtfoto von Adrian** für „Über uns". Buxe fragt ihn, ob er ein richtiges Porträt hat (Auto-Foto nur als menschliche Fallback-Option). Aktuell: Arbeitsfoto `ueber-uns.webp`. Dann auch Alt-Text anpassen.

**Danach / sekundär:**
- [ ] **IONOS-DNS umstellen** (Anleitung in `.handoff/HANDOUT-ADRIAN.md` §6): A-Record @ → 76.76.21.21, CNAME www → cname.vercel-dns.com. MX/TXT nicht anfassen (E-Mail info@domiart-moresa.de läuft ggf. über IONOS). Alternative: Adrian lädt Buxe als Domainverwaltungs-Benutzer ein. Danach Domain im Vercel-Projekt hinzufügen + Search Console einrichten.
- [ ] Google-Bewertungen bestätigen → Sektion + `aggregateRating` im JSON-LD (Base.astro)
- [ ] Erreichbarkeits-Text von Adrian absegnen lassen („Mo–Sa nach Vereinbarung, abends möglich")
- [ ] Foto-Zuordnung Projekte (Umfrage läuft)
- [ ] Facebook-Profil-URL verifizieren (Footer: profile.php?id=100090384174074)
- [x] ~~Instagram~~ → entfernt: Adrian hat Insta gelöscht, das gefundene Profil (domiart_a.p) ist privat/nicht seins. Footer-Link + sameAs im JSON-LD raus.
- [ ] Optional: FAQ-JSON-LD auf Unterseiten, meta keywords entfernen, fonts.css dangling comment
