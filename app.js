(() => {
  const M = window.MENU;
  const T = {
    ar: { contact: "رقم التواصل", popular: "الأكثر طلباً", cats: "أقسام المنيو", langs: "اللغات المتاحة", close: "إغلاق", lang: "اللغة", fav: "مفضلة", theme: "الوضع الليلي" },
    en: { contact: "Contact", popular: "Popular", cats: "Menu Categories", langs: "Available Languages", close: "Close", lang: "Language", fav: "Favorite", theme: "Dark mode" },
  };
  const LANGS = [["ar", "العربية", "🇵🇸"], ["en", "English", "🇬🇧"]];

  // localStorage ممكن يكون مقفول (تصفح خاص) فالمنيو لازم يشتغل بدونه
  const store = {
    get: k => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
  };

  const qLang = new URLSearchParams(location.search).get("lang");
  let lang = T[qLang] ? qLang : T[store.get("lang")] ? store.get("lang") : "ar";
  let favs = new Set(JSON.parse(store.get("favs") || "[]"));
  let pushed = 0; // كم نافذة فتحنا بهالزيارة، عشان زر الرجوع يسكّر النافذة

  const app = document.getElementById("app");
  const overlay = document.getElementById("overlay");
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tx = o => esc(o?.[lang] || o?.ar || o?.en || "");
  const price = p => p == null || p === "" ? "" : `<span class="ltr">${esc(M.currency)} ${Number.isInteger(+p) ? +p : (+p).toFixed(2)}</span>`;
  const svg = (body, size = 24, sw = 2) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  const I = {
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
    burger: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    sun: '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
  };
  // صورة بديلة للصنف الي ما إله صورة
  const PLACEHOLDER = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 112"><rect width="112" height="112" fill="#f1f5f9"/><g fill="#cbd5e1"><circle cx="56" cy="40" r="4"/><path d="M30 68a26 26 0 0 1 52 0Z"/><rect x="24" y="72" width="64" height="6" rx="3"/></g></svg>');
  const img = (it, cls = "") => `<img class="${cls}" src="${esc(it.image || PLACEHOLDER)}" alt="${tx(it.name)}" loading="lazy" onerror="this.onerror=null;this.src='${PLACEHOLDER}'">`;

  const items = M.categories.flatMap(c => c.items.map((it, i) => ({ ...it, id: `${c.id}-${i}` })));
  const byId = id => items.find(it => it.id === id);
  const isDark = () => document.documentElement.dataset.theme === "dark";

  function render() {
    const t = T[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    const popular = items.filter(it => it.featured);
    app.innerHTML = `<div class="wrap">
      <div class="cover" style="background-image:url(assets/cover.webp)">
        <div class="topbar"><button data-open="lang" aria-label="${t.lang}">${svg(I.globe, 28, 1.5)}</button></div>
        <div class="logo"><img src="assets/logo.webp" alt="Kaza Restaurant"></div>
      </div>
      <h1>${tx(M.name)}</h1>
      <p class="sub">${t.contact}: <span class="ltr">${esc(M.phone)}</span></p>
      ${popular.length ? `<div class="popular"><div class="popular-title">${t.popular}</div><div class="scroller"><div class="pop-row">
        ${popular.map(it => `<div class="pop" data-open="item-${it.id}">${img(it)}<div class="pop-name">${tx(it.name)}</div><div class="pop-price">${price(it.price)}</div></div>`).join("")}
      </div></div></div>` : ""}
      <div class="nav"><div class="nav-in">
        <button class="burger" data-open="cats" aria-label="${t.cats}">${svg(I.burger)}</button>
        <div class="scroller" id="tabs-scroll"><div class="tabs">
          ${M.categories.map((c, i) => `<button class="tab${i ? "" : " on"}" data-go="${esc(c.id)}">${tx(c.name)}</button>`).join("")}
        </div></div>
      </div></div>
      ${M.categories.map(c => `<section class="cat" id="${esc(c.id)}">
        <div class="cat-title">${tx(c.name)}</div>
        ${c.items.map((it, i) => { const id = `${c.id}-${i}`; return `<div class="item" data-open="item-${id}">
          <div class="item-body"><div class="item-name clamp2">${tx(it.name)}</div><div class="item-price">${price(it.price)}</div>${tx(it.desc) ? `<p class="item-desc clamp2">${tx(it.desc)}</p>` : ""}</div>
          <div class="item-pic">${img(it)}<button class="heart${favs.has(id) ? " on" : ""}" data-fav="${id}" aria-label="${t.fav}">${svg(I.heart)}</button></div>
        </div>`; }).join("")}
        <div class="zig"></div>
      </section>`).join("")}
      <div class="theme-row"><button class="toggle" data-theme-toggle aria-label="${t.theme}">${svg(I.moon, 18)}${svg(I.sun, 18)}<span class="knob">${svg(isDark() ? I.moon : I.sun, 14)}</span></button></div>
    </div>`;
    spy();
  }

  // ----- النوافذ: اللغة / الأقسام / تفاصيل الصنف (مربوطة بالـ hash عشان زر الرجوع) -----
  function renderOverlay() {
    const t = T[lang];
    const h = decodeURIComponent(location.hash.slice(1)); // lang | cats | item-<id>
    const [kind, id] = h.startsWith("item-") ? ["item", h.slice(5)] : [h];
    let html = "";
    if (kind === "lang") {
      html = `<div class="sheet lang"><div class="sheet-title">${t.langs}</div>
        ${LANGS.map(([code, label, flag]) => `<button class="lang-opt${code === lang ? " on" : ""}" data-lang="${code}"><span class="flag">${flag}</span><span>${label}</span>${code === lang ? '<span class="check">✓</span>' : ""}</button>`).join("")}
        <button class="sheet-close" data-close aria-label="${t.close}">${svg(I.x)}</button></div>`;
    } else if (kind === "cats") {
      html = `<div class="sheet cats"><div class="cats-head"><button data-close aria-label="${t.close}">${svg(I.x)}</button><span>${t.cats}</span></div>
        ${M.categories.map(c => `<button class="cat-opt" data-go="${esc(c.id)}"><b>${tx(c.name)}</b><span>${c.items.length}</span></button>`).join("")}</div>`;
    } else if (kind === "item" && byId(id)) {
      const it = byId(id);
      html = `<div class="detail"><div class="detail-top"><button class="d-close" data-close aria-label="${t.close}">${svg(I.x)}</button>${img(it)}</div>
        <div class="d-body"><div class="d-head"><div class="d-name">${tx(it.name)}</div><button class="d-heart${favs.has(id) ? " on" : ""}" data-fav="${id}" aria-label="${t.fav}">${svg(I.heart)}</button></div>
        <div class="d-price">${price(it.price)}</div>${tx(it.desc) ? `<div class="d-desc">${tx(it.desc)}</div>` : ""}</div></div>`;
    }
    overlay.innerHTML = html;
    overlay.hidden = !html;
    document.body.classList.toggle("locked", !!html);
  }
  const open = h => { pushed++; location.hash = h; };
  function close() {
    if (pushed > 0) { pushed--; history.back(); }
    else { history.replaceState(null, "", location.pathname + location.search); renderOverlay(); }
  }

  // ----- تحديد القسم الحالي أثناء التمرير -----
  const navH = () => document.querySelector(".nav").offsetHeight;
  function setTab(id) {
    const box = document.getElementById("tabs-scroll");
    box.querySelectorAll(".tab").forEach(b => {
      const on = b.dataset.go === id;
      if (on && !b.classList.contains("on")) box.scrollTo({ left: b.offsetLeft - (box.clientWidth - b.offsetWidth) / 2 });
      b.classList.toggle("on", on);
    });
  }
  function spy() {
    const line = navH() + 12;
    let cur = M.categories[0]?.id;
    for (const s of document.querySelectorAll(".cat")) if (s.getBoundingClientRect().top <= line) cur = s.id;
    if (cur) setTab(cur);
  }
  function go(id) {
    const s = document.getElementById(id);
    if (s) window.scrollTo({ top: s.getBoundingClientRect().top + scrollY - navH() + 1, behavior: "smooth" });
  }

  document.addEventListener("click", e => {
    const el = sel => e.target.closest(sel);
    let b;
    if ((b = el("[data-fav]"))) {
      const id = b.dataset.fav;
      favs.has(id) ? favs.delete(id) : favs.add(id);
      store.set("favs", JSON.stringify([...favs]));
      document.querySelectorAll(`[data-fav="${CSS.escape(id)}"]`).forEach(h => h.classList.toggle("on", favs.has(id)));
    } else if ((b = el("[data-lang]"))) {
      lang = b.dataset.lang; store.set("lang", lang);
      const y = scrollY; render(); scrollTo(0, y); close();
    } else if ((b = el("[data-go]"))) {
      const id = b.dataset.go;
      if (!overlay.hidden) { close(); setTimeout(() => go(id), 60); } else go(id);
    } else if (el("[data-close]") || e.target === overlay) close();
    else if ((b = el("[data-open]"))) open(b.dataset.open);
    else if (el("[data-theme-toggle]")) {
      const dark = !isDark();
      document.documentElement.dataset.theme = dark ? "dark" : "light";
      store.set("theme", dark ? "dark" : "light");
      render();
    }
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !overlay.hidden) close(); });
  addEventListener("hashchange", renderOverlay);
  addEventListener("scroll", spy, { passive: true });

  if (store.get("theme") === "dark") document.documentElement.dataset.theme = "dark";
  render();
  renderOverlay();
})();
