/* ─────────────────────────────────────────────
   WEAREKID — SUPRA case study page
   ───────────────────────────────────────────── */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const i18n = window.WEAREKID_I18N;
  const html = document.documentElement;

  const stored = localStorage.getItem("wearekid-lang");
  i18n.current = stored && i18n.strings[stored] ? stored : "ru";

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const t = (k) => i18n.t(k, i18n.current);

  const applyLang = (lang) => {
    i18n.current = lang;
    try { localStorage.setItem("wearekid-lang", lang); } catch (e) { }
    html.setAttribute("lang", lang);
    $$("[data-i18n]").forEach((el) => { el.textContent = i18n.t(el.dataset.i18n, lang); });

    $("#pageTitle").textContent = `SUPRA — ${t("nav.work") === "Work" ? "WEAREKID" : "WEAREKID"}`;
    $("#metaDescription").content = t("supra.introLead");
    $("#ogTitle").content = $("#pageTitle").textContent;
    $("#ogDescription").content = t("supra.introLead");

    const ls = $("#langSwitch"), ml = $("#menuLang");
    if (ls) { ls.textContent = i18n.languages[lang]; ls.dataset.lang = lang; }
    if (ml) { ml.textContent = i18n.languages[lang]; ml.dataset.lang = lang; }

    renderGallery();
  };

  const switchLang = () => { applyLang(i18n.current === "ru" ? "en" : "ru"); };

  const renderGallery = () => {
    const images = [
      { src: "assets/images/supra-hero.webp", alt: { ru: "SUPRA — широкий вид зала с подвесными лампами", en: "SUPRA — wide view of the dining hall with pendant lamps" }, w: 1920, h: 1080 },
      { src: "assets/images/supra-detail.webp", alt: { ru: "SUPRA — длинный общий стол и бордовый диван", en: "SUPRA — long communal table and burgundy banquette" }, w: 1100, h: 1363 },
      { src: "assets/images/supra-table.webp", alt: { ru: "SUPRA — сервировка стола в свете свечей", en: "SUPRA — table setting in warm candlelight" }, w: 1200, h: 735 },
    ];
    const grid = $("#caseGalleryGrid");
    grid.innerHTML = images.map((im, i) => {
      const alt = im.alt[i18n.current];
      const wide = i % 2 === 0;
      return `<figure class="case-gallery__item ${wide ? 'case-gallery__item--wide' : ''}">
        <img src="${im.src}" alt="${esc(alt)}" width="${im.w}" height="${im.h}" loading="lazy" decoding="async">
      </figure>`;
    }).join("");
  };

  $("#langSwitch").addEventListener("click", switchLang);
  $("#menuLang").addEventListener("click", () => { switchLang(); });

  /* header scroll */
  const header = $("#header");
  let lastY = scrollY, ticking = false, menuOpen = false;
  const onScroll = () => {
    const y = scrollY;
    header.classList.toggle("is-stuck", y > 40);
    const down = y > lastY + 4, up = y < lastY - 4;
    if (down && y > 200 && !menuOpen) header.classList.add("is-hidden");
    else if (up || y < 200) header.classList.remove("is-hidden");
    if (down || up) lastY = y;
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  /* mobile menu */
  const burger = $("#burger"), menu = $("#menu");
  const setMenu = (open) => {
    menuOpen = open;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("is-locked", open);
    if (open) { menu.hidden = false; requestAnimationFrame(() => menu.classList.add("is-open")); header.classList.remove("is-hidden"); }
    else { menu.classList.remove("is-open"); setTimeout(() => { if (!menuOpen) menu.hidden = true; }, 700); }
  };
  burger.addEventListener("click", () => setMenu(!menuOpen));
  addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* reveal on scroll */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
  const revealEls = $$(".display, .reveal-fade");
  revealEls.forEach((el) => io.observe(el));
  /* reveal above-fold content immediately on load */
  const revealInView = () => {
    const vh = innerHeight;
    revealEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh - 80 && r.bottom > 80) el.classList.add("in");
    });
  };
  revealInView();
  addEventListener("scroll", revealInView, { passive: true });

  /* loader */
  const loader = $("#loader");
  const loaderBar = $(".loader__bar i");
  const loaderCount = $("#loaderCount");
  let ready = false;
  const start = () => {
    if (ready) return;
    ready = true;
    loader.classList.add("done");
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-ready");
    setTimeout(() => { loader.style.display = "none"; }, 1100);
  };
  const runLoader = () => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { loader.style.display = "none"; document.body.classList.remove("is-loading"); document.body.classList.add("is-ready"); ready = true; return; }
    const t0 = performance.now(), dur = 1500;
    const tick = (now) => {
      const p = Math.min(Math.max((now - t0) / dur, 0), 1);
      const e = 1 - Math.pow(1 - p, 3);
      loaderBar.style.transform = `scaleX(${e})`;
      loaderCount.textContent = String(Math.round(e * 100)).padStart(3, "0");
      if (p < 1) requestAnimationFrame(tick);
      else setTimeout(start, 200);
    };
    requestAnimationFrame(tick);
  };
  $$("[data-delay]").forEach((el) => el.style.setProperty("--d", el.dataset.delay));
  applyLang(i18n.current);
  runLoader();
  setTimeout(() => { if (!ready) start(); }, 4500);
})();
