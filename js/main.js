/* ─────────────────────────────────────────────
   WEAREKID — interactions + localization. No dependencies.
   ───────────────────────────────────────────── */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const body = document.body;
  const html = document.documentElement;
  const cfg = window.WEAREKID_CONFIG || {};
  const i18n = window.WEAREKID_I18N;
  const projects = window.WEAREKID_PROJECTS || [];

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ───────── Localization ───────── */
  const stored = localStorage.getItem("wearekid-lang");
  i18n.current = stored && i18n.strings[stored] ? stored : "ru";

  const setAttr = (el, attr, val) => { if (el) el.setAttribute(attr, val); };

  const applyLang = (lang) => {
    i18n.current = lang;
    try { localStorage.setItem("wearekid-lang", lang); } catch (e) { /* localStorage unavailable */ }
    setAttr(html, "lang", lang);

    /* Translate all [data-i18n] elements (plain text only) */
    $$("[data-i18n]").forEach((el) => {
      el.textContent = i18n.t(el.dataset.i18n, lang);
    });

    /* Page metadata */
    const t = (k) => i18n.t(k, lang);
    $("#pageTitle").textContent = `WEAREKID — ${t("nav.work") === "Work" ? "Independent Digital Studio" : "Независимая цифровая студия"}`;
    $("#metaDescription").content = t("hero.lead");
    $("#ogTitle").content = $("#pageTitle").textContent;
    $("#ogDescription").content = t("hero.lead");

    /* JSON-LD organization */
    const ld = $("#jsonLd");
    try {
      ld.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "WEAREKID",
        description: t("hero.lead"),
        url: location.origin + location.pathname,
      });
    } catch (e) { }

    /* Language switcher labels */
    const ls = $("#langSwitch");
    const ml = $("#menuLang");
    if (ls) { ls.textContent = i18n.languages[lang]; ls.dataset.lang = lang; }
    if (ml) { ml.textContent = i18n.languages[lang]; ml.dataset.lang = lang; }

    /* Re-render dynamic content */
    renderProjects();
    renderServices();
    renderAbout();
    renderProcess();
    renderContact();

    /* Project dialog if open */
    if ($("#project").open) {
      const id = location.hash.replace("#project-", "");
      if (id) openProject(id, false);
    }
  };

  const switchLang = () => {
    const next = i18n.current === "ru" ? "en" : "ru";
    applyLang(next);
  };

  /* ───────── Contact links (from config) ───────── */
  const mail = `mailto:${cfg.email}?subject=${encodeURIComponent(cfg.emailSubject || "")}`;
  const renderContact = () => {
    const links = [
      { k: "telegram", url: cfg.telegram, blank: true },
      { k: "email", url: mail, blank: false },
      { k: "behance", url: cfg.behance, blank: true },
    ];
    const container = $("#contactLinks");
    container.innerHTML = links.map((l) => `
      <li>
        <a href="${l.url}" ${l.blank ? 'target="_blank" rel="noopener"' : ""} data-link="${l.k}" data-i18n="contact.${l.k}">${t(l.k)}</a>
      </li>
    `).join("");
    $("#startProject").href = mail;
  };
  const t = (k) => i18n.t(k, i18n.current);

  /* Ensure existing [data-link] anchors get href (fallback) */
  const wireContactLinks = () => {
    $$("[data-link]").forEach((a) => {
      const k = a.dataset.link;
      if (k === "email") a.href = mail;
      else if (cfg[k]) a.href = cfg[k];
    });
  };

  /* ───────── Render projects (translated) ───────── */
  const projField = (p, key) => {
    const v = p[key];
    return typeof v === "object" && v !== null ? v[i18n.current] : v;
  };

  const imgCard = (p, i, cls, label) => {
    const im = p.images[i];
    const alt = typeof im.alt === "object" ? im.alt[i18n.current] : im.alt;
    return `<a class="card card--img reveal-fade ${cls}" href="#project-${p.id}" data-open="${p.id}" data-cursor="View" aria-label="${esc(projField(p, "title"))} — open project">
      <span class="card__media" style="--ratio:${im.ratio}">
        <span class="card__plx" data-plx="${i === 0 ? 0.07 : 0.1}"><img src="${im.src}" alt="${esc(alt)}" width="${im.w}" height="${im.h}" loading="${i === 0 ? "eager" : "lazy"}" decoding="async"></span>
      </span>
      <span class="card__cap"><span>${label}</span><span>${esc(p.year || "")}</span></span>
    </a>`;
  };

  const placeholderCard = (p, cls) => `
    <a class="card reveal-fade ${cls}" href="#project-${p.id}" data-open="${p.id}" data-cursor="View" aria-label="${esc(projField(p, "title"))} — space reserved, open">
      <span class="ph ph--${p.placeholder}" style="--ratio:${p.ratio}">
        ${p.placeholder === "web" ? '<i class="ph__desktop"></i><i class="ph__phone"></i>' : ""}
        <span class="ph__label">ADD PROJECT IMAGE<small>${esc(projField(p, "title"))}</small></span>
      </span>
      <span class="card__cap"><span>${p.no} — ${esc(projField(p, "category"))}</span><span>Coming soon</span></span>
    </a>`;

  const renderProjects = () => {
    const html = [];
    projects.forEach((p) => {
      if (p.placeholder) {
        html.push(placeholderCard(p, p.placeholder === "web" ? "p-placeholder--web" : "p-placeholder--design"));
        return;
      }
      const name = projField(p, "title");
      html.push(`
        ${imgCard(p, 0, "p-supra__main", `${p.no} — ${esc(name)}`)}
        <div class="p-supra__info reveal-fade" data-delay="0.15">
          <span class="p-supra__no">${p.no} / FEATURED</span>
          <h3 class="p-supra__title">${esc(name)}</h3>
          <p class="p-supra__cat">${esc(projField(p, "category"))}</p>
          <p class="p-supra__desc">${esc(projField(p, "description"))}</p>
          <a class="link-arrow card" href="#project-${p.id}" data-open="${p.id}" data-cursor="View"><span>View project</span><b aria-hidden="true">→</b></a>
        </div>
        ${p.images[1] ? imgCard(p, 1, "p-supra__a", "Detail") : ""}
        ${p.images[2] ? imgCard(p, 2, "p-supra__b", "Atmosphere") : ""}`);
    });
    $("#workGrid").innerHTML = html.join("");
  };

  /* Missing-image handling */
  const missing = (img) => {
    const holder = img.closest(".card__plx, .screen, figure");
    if (!holder) return;
    holder.innerHTML = '<span class="ph" style="position:absolute;inset:0;border:0"><span class="ph__label">ADD PROJECT IMAGE<small>image not found</small></span></span>';
  };
  $$(".card__plx img, .project img").forEach((img) => img.addEventListener("error", () => missing(img), { once: true }));
  const screenImg = $("#supraScreen");
  screenImg.addEventListener("error", () => { screenImg.hidden = true; $("#screenMissing").hidden = false; }, { once: true });

  /* ───────── Render services (translated) ───────── */
  const renderServices = () => {
    const items = i18n.strings[i18n.current].services.items;
    $("#serviceList").innerHTML = items.map((s, i) => `
      <li class="service" tabindex="0">
        <span class="service__no">${String(i + 1).padStart(2, "0")}</span>
        <div class="service__main">
          <h3>${esc(s.title)}</h3>
          <p class="service__short">${esc(s.short)}</p>
          <div class="service__more"><p>${esc(s.more)}</p></div>
        </div>
        <span class="service__arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 18 18 6M8 6h10v10" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></span>
      </li>`).join("");
  };

  /* ───────── Render about meta (translated) ───────── */
  const renderAbout = () => {
    const m = i18n.strings[i18n.current].about.meta;
    $("#aboutMeta").innerHTML = `
      <div><dt>${t("about.meta.based")}</dt><dd>${m.basedValue}</dd></div>
      <div><dt>${t("about.meta.disciplines")}</dt><dd>${m.disciplinesValue}</dd></div>
      <div><dt>${t("about.meta.status")}</dt><dd class="ok"><i></i>${m.statusValue}</dd></div>`;
  };

  /* ───────── Render process steps (translated) ───────── */
  const renderProcess = () => {
    const steps = i18n.strings[i18n.current].process.steps;
    $("#timeline").innerHTML = steps.map((s, i) => `
      <li class="step" data-step="${i}"><button type="button"><span class="step__node"></span><span class="step__no">${s.no}</span><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p></button></li>`).join("");
    $("#timelineFill") && ($("#timelineFill").style.setProperty("--p", "0"));
  };

  /* ───────── Loader ───────── */
  const loader = $("#loader");
  const loaderBar = $(".loader__bar i");
  const loaderCount = $("#loaderCount");
  let ready = false;
  const start = () => {
    if (ready) return;
    ready = true;
    loader.classList.add("done");
    body.classList.remove("is-loading");
    body.classList.add("is-ready");
    setTimeout(() => { loader.style.display = "none"; }, 1100);
    openLid();
  };
  const runLoader = () => {
    if (reduced) { loader.style.display = "none"; body.classList.remove("is-loading"); body.classList.add("is-ready"); ready = true; lid.cur = lid.tar = 12; return; }
    const t0 = performance.now(), dur = 1500;
    const tick = (now) => {
      const p = clamp((now - t0) / dur, 0, 1);
      const e = 1 - Math.pow(1 - p, 3);
      loaderBar.style.transform = `scaleX(${e})`;
      loaderCount.textContent = String(Math.round(e * 100)).padStart(3, "0");
      if (p < 1) requestAnimationFrame(tick);
      else setTimeout(start, 200);
    };
    requestAnimationFrame(tick);
  };

  /* data-delay → css var */
  $$("[data-delay]").forEach((el) => el.style.setProperty("--d", el.dataset.delay));

  /* ───────── Hero 3D MacBook rig ───────── */
  const visual = $("#heroVisual");
  const stage = $("#stage");
  const rig = $("#rig");
  const lid = { cur: -90, tar: -90 };
  const openLid = () => { lid.tar = 12; };
  const mouse = { x: 0, y: 0, cx: 0, cy: 0 };
  let heroVisible = true, looping = false, scrollP = 0, t0 = performance.now();

  const fit = () => {
    const w = visual.clientWidth, h = visual.clientHeight;
    const s = Math.min(w / 700, h / 640);
    stage.style.setProperty("--s", s.toFixed(4));
    stage.style.left = `${(w - 700 * s) / 2}px`;
    stage.style.top = `${(h - 640 * s) / 2}px`;
  };
  new ResizeObserver(fit).observe(visual);
  fit();

  const frame = (now) => {
    looping = false;
    const t = (now - t0) / 1000;
    lid.cur = lerp(lid.cur, lid.tar, reduced ? 1 : 0.045);
    mouse.cx = lerp(mouse.cx, mouse.x, 0.06);
    mouse.cy = lerp(mouse.cy, mouse.y, 0.06);
    const idle = reduced ? 0 : Math.sin(t * 0.6);
    const ry = -30 + mouse.cx * 9 + scrollP * 22 + idle * 1.6;
    const rx = -17 - mouse.cy * 4 + scrollP * 5;
    const ty = scrollP * -70 + (reduced ? 0 : Math.sin(t * 0.9) * 5);
    rig.style.setProperty("--ry", ry.toFixed(2) + "deg");
    rig.style.setProperty("--rx", rx.toFixed(2) + "deg");
    rig.style.setProperty("--ty", ty.toFixed(1) + "px");
    rig.style.setProperty("--lid", lid.cur.toFixed(2) + "deg");
    $(".screen__glare").style.setProperty("--gx", (40 + mouse.cx * 30 + scrollP * 40).toFixed(1) + "%");
    if (heroVisible && !reduced) schedule();
    else if (Math.abs(lid.cur - lid.tar) > 0.05) schedule();
  };
  const schedule = () => { if (!looping) { looping = true; requestAnimationFrame(frame); } };
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; if (heroVisible) schedule(); }, { threshold: 0 }).observe($("#hero"));
  if (finePointer) {
    addEventListener("pointermove", (e) => {
      mouse.x = (e.clientX / innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / innerHeight - 0.5) * 2;
      if (reduced) schedule();
    }, { passive: true });
  }
  schedule();

  /* ───────── Scroll: header, parallax, active nav ───────── */
  const header = $("#header");
  const plx = $$("[data-plx]");
  let lastY = scrollY, ticking = false, menuOpen = false;
  const onScroll = () => {
    const y = scrollY;
    header.classList.toggle("is-stuck", y > 40);
    const down = y > lastY + 4, up = y < lastY - 4;
    if (down && y > 200 && !menuOpen) header.classList.add("is-hidden");
    else if (up || y < 200) header.classList.remove("is-hidden");
    if (down || up) lastY = y;
    scrollP = clamp(y / (innerHeight * 0.9), 0, 1);
    if (!reduced) {
      const vh = innerHeight;
      plx.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const d = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.plx);
        el.style.transform = `translate3d(0,${(-d).toFixed(1)}px,0)`;
      });
    }
    if (reduced && heroVisible) schedule();
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();

  const navLinks = $$("[data-nav]");
  const sections = ["work", "services", "about", "contact"].map((id) => $("#" + id));
  const navIO = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => navIO.observe(s));
  new IntersectionObserver(([e]) => { if (e.isIntersecting) navLinks.forEach((a) => a.classList.remove("is-active")); }, { rootMargin: "-45% 0px -50% 0px" }).observe($("#hero"));

  /* ───────── Smooth scroll (wheel easing, desktop only) ───────── */
  const smooth = finePointer && !reduced;
  let target = scrollY, current = scrollY, sRaf = 0, animating = false;
  const maxScroll = () => document.documentElement.scrollHeight - innerHeight;
  const sLoop = () => {
    current = lerp(current, target, 0.09);
    if (Math.abs(target - current) < 0.4) { current = target; animating = false; scrollTo(0, current); return; }
    scrollTo(0, current);
    sRaf = requestAnimationFrame(sLoop);
  };
  const smoothTo = (y) => {
    target = clamp(y, 0, maxScroll());
    if (!smooth) { scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" }); return; }
    if (!animating) { animating = true; current = scrollY; sRaf = requestAnimationFrame(sLoop); }
  };
  if (smooth) {
    addEventListener("wheel", (e) => {
      if (e.ctrlKey || body.classList.contains("is-locked") || body.classList.contains("is-loading")) return;
      if (e.target.closest && e.target.closest("dialog")) return;
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? innerHeight : 1;
      if (!animating) { current = scrollY; target = scrollY; }
      smoothTo(target + e.deltaY * unit);
    }, { passive: false });
    addEventListener("scroll", () => { if (!animating) { target = current = scrollY; } }, { passive: true });
  }

  /* Anchor navigation */
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id.startsWith("#project-")) return;
    if (id === "#") return;
    const el = id === "#top" ? document.body : $(id);
    if (!el) return;
    e.preventDefault();
    closeMenu();
    const y = id === "#top" ? 0 : el.getBoundingClientRect().top + scrollY;
    smoothTo(y);
    history.replaceState(null, "", id);
  });

  /* ───────── Mobile menu + language switcher ───────── */
  const burger = $("#burger"), menu = $("#menu");
  const setMenu = (open) => {
    menuOpen = open;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    body.classList.toggle("is-locked", open);
    if (open) { menu.hidden = false; requestAnimationFrame(() => menu.classList.add("is-open")); header.classList.remove("is-hidden"); }
    else { menu.classList.remove("is-open"); setTimeout(() => { if (!menuOpen) menu.hidden = true; }, 700); }
  };
  const closeMenu = () => { if (menuOpen) setMenu(false); };
  burger.addEventListener("click", () => setMenu(!menuOpen));
  addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  $("#langSwitch").addEventListener("click", switchLang);
  $("#menuLang").addEventListener("click", () => { switchLang(); closeMenu(); });

  /* ───────── Reveal on scroll ───────── */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
  $$(".display, .reveal-fade").forEach((el) => { if (!el.closest(".hero")) io.observe(el); });

  /* ───────── Magnetic buttons + custom cursor ───────── */
  if (finePointer && !reduced) {
    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", ((e.clientX - r.left - r.width / 2) * 0.28).toFixed(1) + "px");
        el.style.setProperty("--my", ((e.clientY - r.top - r.height / 2) * 0.4).toFixed(1) + "px");
      });
      el.addEventListener("pointerleave", () => { el.style.setProperty("--mx", "0px"); el.style.setProperty("--my", "0px"); });
    });
  }
  if (finePointer) {
    const cur = $("#cursor"), label = $(".cursor__label", cur);
    body.classList.add("has-cursor");
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
    addEventListener("pointermove", (e) => { x = e.clientX; y = e.clientY; cur.classList.add("is-on"); }, { passive: true });
    document.addEventListener("pointerleave", () => cur.classList.remove("is-on"));
    const loop = () => {
      cx = lerp(cx, x, reduced ? 1 : 0.22); cy = lerp(cy, y, reduced ? 1 : 0.22);
      cur.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener("pointerover", (e) => {
      const t = e.target.closest("[data-cursor],a,button,.service");
      cur.classList.toggle("is-link", !!t);
      const lab = t && t.dataset.cursor;
      cur.classList.toggle("is-label", !!lab);
      label.textContent = lab || "";
    });
  }

  /* ───────── Services: tap to toggle (touch) ───────── */
  $$(".service").forEach((s) => s.addEventListener("click", () => {
    if (!finePointer) s.classList.toggle("is-open");
  }));

  /* ───────── Process timeline ───────── */
  const tl = $("#timeline");
  const setStep = (i) => {
    const steps = $$(".step", tl);
    steps.forEach((s, k) => { s.classList.toggle("is-active", k === i); s.classList.toggle("is-seen", k <= i); });
    tl.style.setProperty("--p", i >= steps.length - 1 ? 1 : i / steps.length);
  };
  tl.addEventListener("mouseenter", (e) => {
    const b = e.target.closest(".step");
    if (b) setStep([...$$(".step", tl)].indexOf(b));
  });
  tl.addEventListener("focusin", (e) => {
    const b = e.target.closest(".step");
    if (b) setStep([...$$(".step", tl)].indexOf(b));
  });
  tl.addEventListener("click", (e) => {
    const b = e.target.closest(".step");
    if (b) setStep([...$$(".step", tl)].indexOf(b));
  });
  new IntersectionObserver(([e], obs) => {
    if (!e.isIntersecting) return;
    obs.disconnect();
    if (reduced) { setStep(steps.length - 1); return; }
    const steps = $$(".step", tl);
    steps.forEach((_, i) => setTimeout(() => setStep(i), 300 + i * 750));
  }, { threshold: 0.4 }).observe(tl);

  /* ───────── Project view (dialog) ───────── */
  const dlg = $("#project");
  let pushed = false, closing = false;
  const fillProject = (p) => {
    $("#projectCat").textContent = projField(p, "category");
    $("#projectTitle").textContent = projField(p, "title");
    $("#projectDesc").textContent = projField(p, "detail");
    const meta = [];
    if (p.year) meta.push(["Year", p.year]);
    if (p.services) {
      const svc = typeof p.services === "object" ? p.services[i18n.current] : p.services;
      meta.push(["Scope", Array.isArray(svc) ? svc.join(" · ") : svc]);
    }
    if (p.placeholder) meta.push(["Status", t("project.view") === "View project" ? "Space reserved for a future project" : "Место зарезервировано для будущего проекта"]);
    $("#projectMeta").innerHTML = meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
    $("#projectGallery").innerHTML = p.images
      ? p.images.map((im) => {
        const alt = typeof im.alt === "object" ? im.alt[i18n.current] : im.alt;
        return `<figure><img src="${im.src}" alt="${esc(alt)}" width="${im.w}" height="${im.h}" loading="lazy" decoding="async"></figure>`;
      }).join("")
      : `<div class="ph ph--${p.placeholder}"><span class="ph__label">ADD PROJECT IMAGE<small>Edit js/projects.js to add this project</small></span></div>`;
    $$("#projectGallery img").forEach((img) => img.addEventListener("error", () => missing(img), { once: true }));
    $(".project__inner", dlg).scrollTop = 0;
  };
  const openProject = (id, push = true) => {
    const p = projects.find((x) => x.id === id);
    if (!p || dlg.open) return;
    fillProject(p);
    closing = false;
    dlg.classList.remove("is-closing");
    dlg.showModal();
    body.classList.add("is-locked");
    if (push) { pushed = true; location.hash = "project-" + id; } else pushed = false;
  };
  const finishClose = () => {
    if (closing === false) return;
    closing = false;
    dlg.close();
    dlg.classList.remove("is-closing");
    body.classList.remove("is-locked");
  };
  const closeProject = () => {
    if (!dlg.open || closing) return;
    closing = true;
    dlg.classList.add("is-closing");
    setTimeout(finishClose, reduced ? 0 : 900);
    if (pushed) { pushed = false; history.back(); }
    else if (location.hash.startsWith("#project-")) history.replaceState(null, "", location.pathname + location.search);
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-open]");
    if (!a) return;
    e.preventDefault();
    openProject(a.dataset.open);
  });
  $("#projectClose").addEventListener("click", closeProject);
  dlg.addEventListener("cancel", (e) => { e.preventDefault(); closeProject(); });
  addEventListener("hashchange", () => {
    const h = location.hash;
    if (h.startsWith("#project-")) openProject(h.slice(9), false);
    else if (dlg.open) closeProject();
  });
  if (location.hash.startsWith("#project-")) addEventListener("load", () => openProject(location.hash.slice(9), false));

  /* ───────── Go ───────── */
  applyLang(i18n.current);
  wireContactLinks();
  runLoader();
  setTimeout(() => { if (!ready) start(); }, 4500);
})();
