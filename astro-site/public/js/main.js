/* ==========================================================================
   DOMIART — Interaktionen
   Lenis Smooth Scroll + GSAP 3.13 (Reveals, SplitText, Parallax, Magnetik)
   Vorher/Nachher + Lightbox + Video + Konfigurator + Signature-Sequenz
   ========================================================================== */

(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var prefersReducedMotion = motionQuery.matches;
  var finePointerQuery = window.matchMedia("(pointer: fine)");
  var hasGsap = typeof gsap !== "undefined";

  /* ---------- Lenis Smooth Scroll ---------- */
  var lenis = null;
  if (!prefersReducedMotion && typeof Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  }

  /* GSAP-Setup: Plugins + offizielles Lenis-Sync-Pattern */
  if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);
    if (typeof SplitText !== "undefined") {
      gsap.registerPlugin(SplitText);
    }
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* ---------- Header: Scrolled-State ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    var y = lenis ? lenis.scroll : window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);
  }
  if (lenis) {
    lenis.on("scroll", onScroll);
  } else {
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  onScroll();

  /* ---------- Scroll-Progress-Bar (JS-Fallback) ---------- */
  /* Primär läuft die Bar nativ per CSS animation-timeline: scroll().     */
  var progressBar = document.querySelector(".scroll-progress");
  var nativeProgress =
    typeof CSS !== "undefined" &&
    CSS.supports &&
    CSS.supports("animation-timeline", "scroll()");
  if (progressBar && !nativeProgress && !prefersReducedMotion) {
    var updateProgress = function () {
      var y = lenis ? lenis.scroll : window.scrollY;
      var max =
        document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? y / max : 1;
      progressBar.style.transform = "scaleX(" + Math.min(1, Math.max(0, p)) + ")";
    };
    if (lenis) {
      lenis.on("scroll", updateProgress);
    } else {
      window.addEventListener("scroll", updateProgress, { passive: true });
    }
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }

  /* ---------- Mobile Navigation ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelectorAll(".main-nav a");

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var isOpen = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      if (lenis) {
        if (isOpen) lenis.stop();
        else lenis.start();
      }
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      document.body.classList.remove("nav-open");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
      if (lenis) lenis.start();

      var href = link.getAttribute("href");
      if (href && href.charAt(0) === "#") {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(target, { offset: -70, duration: 1.4 });
          } else {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    });
  });

  /* ---------- GSAP Reveal-Animationen ---------- */
  /* Start erst nach document.fonts.ready, damit SplitText die Zeilen-  */
  /* umbrüche mit den echten Font-Metriken berechnet.                    */
  function initReveals() {
  if (!prefersReducedMotion && hasGsap) {
    /* Hero-Elemente auslassen — die Hero-Timeline animiert sie selbst */
    gsap.utils.toArray("[data-reveal]").forEach(function (el) {
      if (el.closest(".hero")) return;
      var delay = parseFloat(el.getAttribute("data-reveal-delay") || 0);
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    });

    /* Hero-Intro (nur auf der Startseite vorhanden) */
    var heroH1 = document.querySelector(".hero h1");
    if (heroH1) {
      var heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl.to(".hero .eyebrow", { opacity: 1, y: 0, duration: 0.8 }, 0.15);

      /* Kinetic Typography: Chars-Reveal per SplitText */
      if (typeof SplitText !== "undefined") {
        var heroSplit = new SplitText(heroH1, {
          type: "words,chars",
          mask: "words",
          wordsClass: "split-word",
          charsClass: "split-char",
        });
        /* h1 selbst sofort sichtbar, nur die Chars fliegen rein */
        gsap.set(heroH1, { opacity: 1, y: 0 });
        gsap.set(heroSplit.chars, { yPercent: 112 });
        heroTl.to(
          heroSplit.chars,
          {
            yPercent: 0,
            duration: 1.05,
            ease: "power4.out",
            stagger: 0.022,
          },
          0.3
        );
      } else {
        heroTl.to(heroH1, { opacity: 1, y: 0, duration: 1 }, 0.3);
      }

      heroTl
        .to(".hero__sub", { opacity: 1, y: 0, duration: 0.9 }, 0.55)
        .to(".hero__actions", { opacity: 1, y: 0, duration: 0.9 }, 0.7)
        .to(".hero__meta", { opacity: 1, y: 0, duration: 0.9 }, 0.85)
        .to(
          ".hero__card--main",
          { opacity: 1, y: 0, scale: 1, duration: 1.2 },
          0.4
        )
        .to(
          ".hero__card--float",
          { opacity: 1, y: 0, scale: 1, duration: 1.1 },
          0.7
        )
        .to(".hero__badge", { opacity: 1, y: 0, duration: 0.8 }, 0.95);
    }

    /* Section-Heads: Word-Stagger-Reveal */
    if (typeof SplitText !== "undefined") {
      gsap.utils.toArray(".display-lg").forEach(function (el) {
        var split = new SplitText(el, {
          type: "words",
          mask: "words",
          wordsClass: "split-word",
        });
        gsap.set(split.words, { yPercent: 110 });
        gsap.to(split.words, {
          yPercent: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        });
      });
    }
  } else {
    document.documentElement.classList.add("no-anim");
  }
  }

  /* Warten, bis die tatsächlich verwendeten Font-Faces geladen sind.   */
  /* fonts.ready allein reicht nicht: Status ist "loaded", solange noch */
  /* kein Font angefordert wurde — load() forciert die kritischen.      */
  function whenFontsReady(cb) {
    if (typeof document.fonts === "undefined" || !document.fonts.load) {
      cb();
      return;
    }
    var done = false;
    var finish = function () {
      if (!done) {
        done = true;
        cb();
      }
    };
    var faces = [
      '700 1em "Bricolage Grotesque"',
      '800 1em "Bricolage Grotesque"',
      "400 1em Inter",
      "600 1em Inter",
    ];
    Promise.all(
      faces.map(function (f) {
        return document.fonts.load(f).catch(function () {
          return [];
        });
      })
    )
      .then(function () {
        /* Status erst wieder "loaded", wenn ALLE ausstehenden Loads fertig sind */
        return document.fonts.ready;
      })
      .then(finish);
    setTimeout(finish, 2500); // Fallback, falls ein Font haengt
  }

  whenFontsReady(function () {
    initReveals();
    if (hasGsap) ScrollTrigger.refresh();
  });

  /* ---------- Vorher/Nachher-Slider ---------- */
  document.querySelectorAll(".ba-slider").forEach(function (slider) {
    var dragging = false;
    var rect = null;
    var pos = 50;
    var handle = slider.querySelector(".ba-slider__handle");

    function cacheRect() {
      rect = slider.getBoundingClientRect();
    }

    function applyPos(p, clamp) {
      pos = clamp ? Math.max(2, Math.min(98, p)) : Math.max(0, Math.min(100, p));
      slider.style.setProperty("--ba-pos", pos + "%");
      if (handle) {
        handle.setAttribute("aria-valuenow", String(Math.round(pos)));
      }
    }

    function setPosFromX(clientX) {
      if (!rect) cacheRect();
      if (!rect.width) return;
      applyPos(((clientX - rect.left) / rect.width) * 100, true);
    }

    slider.addEventListener("pointerdown", function (e) {
      dragging = true;
      slider.setPointerCapture(e.pointerId);
      cacheRect();
      setPosFromX(e.clientX);
    });

    slider.addEventListener("pointermove", function (e) {
      if (dragging) setPosFromX(e.clientX);
    });

    ["pointerup", "pointercancel"].forEach(function (evt) {
      slider.addEventListener(evt, function () {
        dragging = false;
      });
    });

    /* Layout-Cache bei Resize invalidieren */
    window.addEventListener(
      "resize",
      function () {
        rect = null;
      },
      { passive: true }
    );

    /* Tastatur-Bedienung (role="slider" liegt im Markup auf dem Handle) */
    if (handle) {
      handle.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
          e.preventDefault();
          applyPos(pos - 5, true);
        } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
          e.preventDefault();
          applyPos(pos + 5, true);
        } else if (e.key === "Home") {
          e.preventDefault();
          applyPos(0, false);
        } else if (e.key === "End") {
          e.preventDefault();
          applyPos(100, false);
        }
      });
    }
  });

  /* ---------- Galerie-Lightbox ---------- */
  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    var lbClose = lightbox.querySelector(".lightbox__close");
    var lbPrev = lightbox.querySelector(".lightbox__nav--prev");
    var lbNext = lightbox.querySelector(".lightbox__nav--next");
    var galleryItems = Array.prototype.slice.call(
      document.querySelectorAll(".gallery-item img")
    );
    var currentIndex = 0;
    var lastTrigger = null;

    lightbox.setAttribute("aria-hidden", "true");

    function openLightbox(index, trigger) {
      currentIndex = index;
      lastTrigger = trigger || null;
      lbImg.src = galleryItems[currentIndex].src;
      lbImg.alt = galleryItems[currentIndex].alt;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      if (lenis) lenis.stop();
      lbClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      if (lenis) lenis.start();
      if (lastTrigger && document.contains(lastTrigger)) {
        lastTrigger.focus();
      }
      lastTrigger = null;
    }

    function step(dir) {
      currentIndex =
        (currentIndex + dir + galleryItems.length) % galleryItems.length;
      lbImg.src = galleryItems[currentIndex].src;
      lbImg.alt = galleryItems[currentIndex].alt;
    }

    galleryItems.forEach(function (img, i) {
      img.closest(".gallery-item").addEventListener("click", function (e) {
        openLightbox(i, e.currentTarget);
      });
    });

    lbClose.addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", function () {
      step(-1);
    });
    lbNext.addEventListener("click", function () {
      step(1);
    });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") {
        closeLightbox();
        return;
      }
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);

      /* Einfacher Focus-Trap: Tab zyklisch zwischen den drei Buttons */
      if (e.key === "Tab") {
        var focusables = [lbClose, lbPrev, lbNext];
        var idx = focusables.indexOf(document.activeElement);
        e.preventDefault();
        if (e.shiftKey) {
          idx = idx <= 0 ? focusables.length - 1 : idx - 1;
        } else {
          idx = idx === focusables.length - 1 ? 0 : idx + 1;
        }
        focusables[idx].focus();
      }
    });
  }

  /* ---------- Video-Feature: Play/Pause ---------- */
  var videoFrame = document.querySelector(".video-frame");
  if (videoFrame) {
    var video = videoFrame.querySelector("video");
    var btn = videoFrame.querySelector(".video-frame__btn");
    var iconPlay = btn.querySelector(".icon-play");
    var iconPause = btn.querySelector(".icon-pause");

    function syncIcons() {
      var playing = !video.paused && !video.ended;
      iconPlay.style.display = playing ? "none" : "";
      iconPause.style.display = playing ? "" : "none";
    }

    btn.addEventListener("click", function () {
      if (video.paused || video.ended) {
        video.play();
      } else {
        video.pause();
      }
    });

    video.addEventListener("play", syncIcons);
    video.addEventListener("pause", syncIcons);
    video.addEventListener("ended", syncIcons);
    syncIcons();

    /* Vorher/Nachher-Umschalter: tauscht Quelle + Poster, startet direkt */
    var switchOpts = videoFrame.querySelectorAll(".video-switch__opt");
    Array.prototype.forEach.call(switchOpts, function (opt) {
      opt.addEventListener("click", function () {
        if (opt.classList.contains("is-active")) return;

        Array.prototype.forEach.call(switchOpts, function (other) {
          var active = other === opt;
          other.classList.toggle("is-active", active);
          other.setAttribute("aria-pressed", active ? "true" : "false");
        });

        video.pause();
        video.setAttribute("poster", opt.getAttribute("data-poster"));
        video.setAttribute("src", opt.getAttribute("data-src"));
        video.load();

        var started = video.play();
        if (started && typeof started.catch === "function") {
          started.catch(syncIcons);
        }
      });
    });
  }

  /* ---------- Footer-Jahr ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ======================================================================
     Scroll-Effekte (Parallax, Magnetik, Ticker-Skew)
     Alle nur bei voller Motion + GSAP. Registrieren sich für den
     Live-Reduced-Motion-Listener unten.
     ====================================================================== */
  var fxKillers = [];

  function initScrollFx() {
    if (prefersReducedMotion || !hasGsap) return;

    /* ---------- Parallax: Hero-Karten + Glow ---------- */
    if (document.querySelector(".hero__card--float")) {
      fxKillers.push(
        gsap.to(".hero__card--main", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
      );
      fxKillers.push(
        gsap.to(".hero__card--float", {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
      );
      fxKillers.push(
        gsap.to(".hero__glow", {
          yPercent: 22,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
      );
    }

    /* ---------- Parallax: Galerie-Bilder ---------- */
    /* Crop-Puffer (scale) liegt als eigene CSS-Eigenschaft auf dem img */
    /* (no-JS/reduced-motion-Fallback inkl. Hover-Zoom). Sobald GSAP    */
    /* animiert, neutralisiert es die CSS-Eigenschaft inline — der      */
    /* Hover-Zoom laeuft dann ueber eigene GSAP-Tweens.                 */
    gsap.utils.toArray(".gallery-item img").forEach(function (img) {
      gsap.set(img, { scale: 1.12 });
      fxKillers.push(
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".gallery-item"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        )
      );

      /* Hover-Zoom (ersetzt die CSS-Variante, solange GSAP aktiv ist) */
      if (finePointerQuery.matches) {
        var item = img.closest(".gallery-item");
        var onEnter = function () {
          gsap.to(img, {
            scale: 1.19,
            duration: 0.7,
            ease: "power3.out",
            overwrite: "auto",
          });
        };
        var onLeaveImg = function () {
          gsap.to(img, {
            scale: 1.12,
            duration: 0.7,
            ease: "power3.out",
            overwrite: "auto",
          });
        };
        item.addEventListener("pointerenter", onEnter);
        item.addEventListener("pointerleave", onLeaveImg);
        fxKillers.push({
          kill: function () {
            item.removeEventListener("pointerenter", onEnter);
            item.removeEventListener("pointerleave", onLeaveImg);
          },
        });
      }
    });

    /* ---------- Parallax: Über-uns-Bild ---------- */
    var aboutImg = document.querySelector(".about__media img");
    if (aboutImg) {
      fxKillers.push(
        gsap.fromTo(
          aboutImg,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: ".about__media",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        )
      );
    }

    /* ---------- Magnetische Buttons ---------- */
    if (finePointerQuery.matches) {
      document
        .querySelectorAll(".btn--primary, .nav-cta")
        .forEach(function (el) {
          if (el.closest(".sticky-cta")) return; // Touch-CTA ausnehmen
          el.classList.add("is-magnetic");

          var xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
          var yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

          function onMove(e) {
            var r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
          }
          function onLeave() {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.7,
              ease: "elastic.out(1, 0.4)",
              overwrite: "auto",
            });
          }

          el.addEventListener("pointermove", onMove);
          el.addEventListener("pointerleave", onLeave);

          fxKillers.push({
            kill: function () {
              el.removeEventListener("pointermove", onMove);
              el.removeEventListener("pointerleave", onLeave);
              el.classList.remove("is-magnetic");
              gsap.set(el, { x: 0, y: 0 });
            },
          });
        });
    }

    /* ---------- Ticker: Velocity-Skew ---------- */
    var ticker = document.querySelector(".ticker");
    if (ticker && lenis) {
      var skewProxy = { skew: 0 };
      var skewTween = null;
      var onLenisScroll = function (e) {
        var s = gsap.utils.clamp(-8, 8, (e.velocity || 0) * 0.4);
        if (Math.abs(s) > Math.abs(skewProxy.skew)) {
          skewProxy.skew = s;
          if (skewTween) skewTween.kill();
          skewTween = gsap.to(skewProxy, {
            skew: 0,
            duration: 0.7,
            ease: "power2.out",
            overwrite: true,
            onUpdate: function () {
              ticker.style.setProperty(
                "--ticker-skew",
                skewProxy.skew.toFixed(2) + "deg"
              );
            },
          });
        }
      };
      lenis.on("scroll", onLenisScroll);
      fxKillers.push({
        kill: function () {
          lenis.off("scroll", onLenisScroll);
          if (skewTween) skewTween.kill();
          ticker.style.setProperty("--ticker-skew", "0deg");
        },
      });
    }
  }

  initScrollFx();

  /* Live-Reaktion: Nutzer aktiviert reduced-motion während der Session */
  motionQuery.addEventListener("change", function (e) {
    prefersReducedMotion = e.matches;
    if (e.matches) {
      fxKillers.forEach(function (fx) {
        if (fx && typeof fx.kill === "function") fx.kill();
      });
      fxKillers = [];
      /* Parallax-Restwerte zurücksetzen (inkl. GSAPs Neutralisierung   */
      /* der individuellen Transform-Eigenschaften)                     */
      if (hasGsap) {
        gsap.set(
          ".gallery-item img, .about__media img, .hero__card--main, .hero__card--float, .hero__glow",
          { clearProps: "transform,translate,rotate,scale" }
        );
      }
    }
  });
})();

/* ---------- Projekt-Konfigurator → WhatsApp ---------- */
(function () {
  "use strict";

  var config = document.querySelector(".config");
  if (!config) return;

  var state = {
    bereich: null,
    groesse: null,
    zustand: null,
    zeitpunkt: null,
    name: "",
  };
  var step = 1;
  var maxStep = 3;

  var panels = config.querySelectorAll(".config__panel");
  var dots = config.querySelectorAll(".config__dots span");
  var stepLabel = config.querySelector("[data-step-current]");
  var backBtn = config.querySelector("[data-back]");
  var nextBtn = config.querySelector("[data-next]");
  var sendBtn = config.querySelector("[data-send]");
  var summaryEl = config.querySelector("[data-summary]");
  var nameInput = config.querySelector('[data-field="name"]');

  function stepValid(n) {
    if (n === 1) return !!state.bereich;
    if (n === 2) return !!(state.groesse && state.zustand);
    if (n === 3) return !!state.zeitpunkt;
    return false;
  }

  function buildMessage() {
    var msg =
      "Hallo DOMIART, ich plane ein Projekt: " +
      state.bereich +
      ". Umfang: " +
      state.groesse +
      ", Zustand: " +
      state.zustand +
      ". Zeitrahmen: " +
      state.zeitpunkt +
      ".";
    if (state.name.trim()) {
      msg += " Mein Name ist " + state.name.trim() + ".";
    }
    msg += " Bitte melden Sie sich bei mir zur kostenlosen Beratung.";
    return msg;
  }

  function updateSummary() {
    if (step !== 3) return;
    if (stepValid(3)) {
      summaryEl.textContent = buildMessage();
      sendBtn.href =
        "https://wa.me/4915568820575?text=" +
        encodeURIComponent(buildMessage());
      sendBtn.hidden = false;
    } else {
      summaryEl.textContent =
        "Wählen Sie oben einen Zeitpunkt — Ihre Nachricht entsteht hier.";
      sendBtn.hidden = true;
    }
  }

  function render() {
    panels.forEach(function (p) {
      p.classList.toggle(
        "is-active",
        parseInt(p.getAttribute("data-step"), 10) === step
      );
    });
    dots.forEach(function (d, i) {
      d.classList.toggle("is-active", i < step);
    });
    stepLabel.textContent = step;
    backBtn.disabled = step === 1;
    nextBtn.hidden = step === maxStep;
    nextBtn.disabled = !stepValid(step);
    if (step !== maxStep) sendBtn.hidden = true;
    updateSummary();
  }

  config.querySelectorAll(".config__option").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var field = btn.getAttribute("data-field");
      var value = btn.getAttribute("data-value");
      state[field] = value;

      config
        .querySelectorAll('.config__option[data-field="' + field + '"]')
        .forEach(function (b) {
          b.classList.toggle("is-selected", b === btn);
        });

      // Auf Schritt 1 und 2 nach Auswahl automatisch weiter,
      // sobald der Schritt vollständig ist
      if (step < maxStep && stepValid(step)) {
        setTimeout(function () {
          step++;
          render();
        }, 350);
      } else {
        render();
      }
    });
  });

  nameInput.addEventListener("input", function () {
    state.name = nameInput.value;
    updateSummary();
  });

  backBtn.addEventListener("click", function () {
    if (step > 1) {
      step--;
      render();
    }
  });

  nextBtn.addEventListener("click", function () {
    if (step < maxStep && stepValid(step)) {
      step++;
      render();
    }
  });

  render();
})();

/* ---------- Signature: Vom Plan zum Raum (gepinnte Scroll-Sequenz) ---------- */
(function () {
  "use strict";

  var sig = document.querySelector(".signature");
  if (!sig) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return; // CSS-Default zeigt den Endzustand
  }

  gsap.registerPlugin(ScrollTrigger);

  var blueprint = sig.querySelector(".signature__blueprint");
  var draws = sig.querySelectorAll(".bp-draw");
  var labels = sig.querySelector(".bp-label");
  var bau = sig.querySelector(".signature__photo--bau");
  var fertig = sig.querySelector(".signature__photo--fertig");
  var caps = sig.querySelectorAll(".signature__captions p");
  var cta = sig.querySelector(".signature__cta");

  // Linienlängen vermessen für den Zeicheneffekt
  draws.forEach(function (el) {
    var len = el.getTotalLength();
    el.style.strokeDasharray = len;
    el.style.strokeDashoffset = len;
  });

  // Anfangszustand (überschreibt den no-JS-Default)
  gsap.set(blueprint, { opacity: 1 });
  gsap.set(fertig, { opacity: 0 });
  gsap.set(bau, { opacity: 0 });
  gsap.set(labels, { opacity: 0 });
  gsap.set(caps, { opacity: 0 });
  gsap.set(caps[0], { opacity: 1 });
  gsap.set(cta, { opacity: 0, y: 12 });

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: sig,
      start: "top top",
      end: function () {
        return "+=" + window.innerHeight * 3;
      },
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  tl.to(draws, {
    strokeDashoffset: 0,
    duration: 2.4,
    ease: "none",
    stagger: 0.05,
  })
    .to(labels, { opacity: 1, duration: 0.5 }, "-=0.5")
    .to(caps[0], { opacity: 0, duration: 0.35 }, "+=0.35")
    .to(bau, { opacity: 1, duration: 1.0 }, "<")
    .to(caps[1], { opacity: 1, duration: 0.35 }, "<0.4")
    .to(blueprint, { opacity: 0.16, duration: 1.0 }, "+=0.5")
    .to(bau, { opacity: 0, duration: 1.0 }, "<")
    .to(fertig, { opacity: 1, duration: 1.0 }, "<")
    .to(caps[1], { opacity: 0, duration: 0.35 }, "<0.4")
    .to(caps[2], { opacity: 1, duration: 0.35 }, "<0.3")
    .to(blueprint, { opacity: 0, duration: 0.6 }, "<")
    .to(cta, { opacity: 1, y: 0, duration: 0.5 }, "+=0.2")
    .to({}, { duration: 0.6 }); // Ausklang vor dem Weiterscrollen
})();
