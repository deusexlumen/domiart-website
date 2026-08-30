/* ==========================================================================
   DOMIART — Interaktionen
   Lenis Smooth Scroll + GSAP Reveals + Vorher/Nachher + Lightbox + Video
   ========================================================================== */

(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Lenis Smooth Scroll ---------- */
  var lenis = null;
  if (!prefersReducedMotion && typeof Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
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

  /* ---------- Mobile Navigation ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelectorAll(".main-nav a");

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      document.body.classList.toggle("nav-open");
      if (lenis) {
        if (document.body.classList.contains("nav-open")) lenis.stop();
        else lenis.start();
      }
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      document.body.classList.remove("nav-open");
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
  if (!prefersReducedMotion && typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
    }

    gsap.utils.toArray("[data-reveal]").forEach(function (el) {
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

    /* Hero-Intro */
    var heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
      .to(".hero .eyebrow", { opacity: 1, y: 0, duration: 0.8 }, 0.15)
      .to(".hero h1", { opacity: 1, y: 0, duration: 1 }, 0.3)
      .to(".hero__sub", { opacity: 1, y: 0, duration: 0.9 }, 0.5)
      .to(".hero__actions", { opacity: 1, y: 0, duration: 0.9 }, 0.65)
      .to(".hero__meta", { opacity: 1, y: 0, duration: 0.9 }, 0.8)
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
  } else {
    document.documentElement.classList.add("no-anim");
  }

  /* ---------- Vorher/Nachher-Slider ---------- */
  document.querySelectorAll(".ba-slider").forEach(function (slider) {
    var dragging = false;

    function setPos(clientX) {
      var rect = slider.getBoundingClientRect();
      var pos = ((clientX - rect.left) / rect.width) * 100;
      pos = Math.max(2, Math.min(98, pos));
      slider.style.setProperty("--ba-pos", pos + "%");
    }

    slider.addEventListener("pointerdown", function (e) {
      dragging = true;
      slider.setPointerCapture(e.pointerId);
      setPos(e.clientX);
    });

    slider.addEventListener("pointermove", function (e) {
      if (dragging) setPos(e.clientX);
    });

    ["pointerup", "pointercancel"].forEach(function (evt) {
      slider.addEventListener(evt, function () {
        dragging = false;
      });
    });
  });

  /* ---------- Galerie-Lightbox ---------- */
  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    var galleryItems = Array.prototype.slice.call(
      document.querySelectorAll(".gallery-item img")
    );
    var currentIndex = 0;

    function openLightbox(index) {
      currentIndex = index;
      lbImg.src = galleryItems[currentIndex].src;
      lbImg.alt = galleryItems[currentIndex].alt;
      lightbox.classList.add("is-open");
      if (lenis) lenis.stop();
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      if (lenis) lenis.start();
    }

    function step(dir) {
      currentIndex =
        (currentIndex + dir + galleryItems.length) % galleryItems.length;
      lbImg.src = galleryItems[currentIndex].src;
      lbImg.alt = galleryItems[currentIndex].alt;
    }

    galleryItems.forEach(function (img, i) {
      img.closest(".gallery-item").addEventListener("click", function () {
        openLightbox(i);
      });
    });

    lightbox
      .querySelector(".lightbox__close")
      .addEventListener("click", closeLightbox);
    lightbox
      .querySelector(".lightbox__nav--prev")
      .addEventListener("click", function () {
        step(-1);
      });
    lightbox
      .querySelector(".lightbox__nav--next")
      .addEventListener("click", function () {
        step(1);
      });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
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
        video.muted = false;
        video.play();
      } else {
        video.pause();
      }
    });

    video.addEventListener("play", syncIcons);
    video.addEventListener("pause", syncIcons);
    video.addEventListener("ended", syncIcons);
    syncIcons();
  }

  /* ---------- Footer-Jahr ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

  /* ---------- Projekt-Konfigurator → WhatsApp ---------- */
  var config = document.querySelector(".config");
  if (config) {
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
  }

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
      end: "+=2600",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
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
