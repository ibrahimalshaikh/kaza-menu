(() => {
  const M = window.MENU;
  const T = {
    ar: { contact: "رقم التواصل", popular: "الأكثر طلباً", cats: "أقسام القائمة", langs: "اللغات المتاحة", close: "إغلاق", lang: "اللغة", fav: "مفضلة", theme: "الوضع الليلي", soon: "المنيو قيد التحديث، راجعنا قريباً",
      add: "إضافة", sub: "إنقاص", size: "اختر الحجم", cart: "السلة", viewCart: "عرض السلة", empty: "السلة فارغة", note: "ملاحظات على الطلب (اختياري)", notePh: "مثال: بدون بصل", total: "المجموع", next: "متابعة",
      info: "بياناتك", name: "الاسم", phone: "رقم الجوال", nameErr: "اكتب اسمك", phoneErr: "رقم الجوال يجب أن يكون 10 أرقام ويبدأ بـ 05، مثال: 0591234567", toPay: "متابعة للدفع", pay: "الدفع", paySoon: "طرق الدفع قيد التجهيز وستتوفر قريباً." },
    en: { contact: "Contact number", popular: "Popular", cats: "Menu Categories", langs: "Available Languages", close: "Close", lang: "Language", fav: "Favorite", theme: "Dark mode", soon: "Menu is being updated, check back soon",
      add: "Add", sub: "Remove", size: "Choose size", cart: "Cart", viewCart: "View cart", empty: "Your cart is empty", note: "Order notes (optional)", notePh: "e.g. no onions", total: "Total", next: "Continue",
      info: "Your details", name: "Name", phone: "Mobile number", nameErr: "Enter your name", phoneErr: "The mobile number must be 10 digits starting with 05, e.g. 0591234567", toPay: "Continue to payment", pay: "Payment", paySoon: "Payment methods are being set up and will be available soon." },
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
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    sun: '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
  };
  // صورة بديلة للصنف الي ما إله صورة
  const PLACEHOLDER = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 112"><rect width="112" height="112" fill="#f1f5f9"/><g fill="#cbd5e1"><circle cx="56" cy="40" r="4"/><path d="M30 68a26 26 0 0 1 52 0Z"/><rect x="24" y="72" width="64" height="6" rx="3"/></g></svg>');
  const img = (it, cls = "") => `<img class="${cls}" src="${esc(it.image || PLACEHOLDER)}" alt="${tx(it.name)}" loading="lazy" onerror="this.onerror=null;this.src='${PLACEHOLDER}'">`;

  const items = M.categories.flatMap(c => c.items.map((it, i) => ({ ...it, id: it.id || `${c.id}-${i}` })));
  const byId = id => items.find(it => it.id === id);
  const isDark = () => document.documentElement.dataset.theme === "dark";
  // مفتاح السلة: معرّف الصنف، أو "معرّف:حجم" للصنف الي إله أحجام
  const line = key => {
    const [id, sid] = String(key).split(":");
    const it = byId(id), size = it?.sizes?.find(z => z.id === sid);
    if (!it || (it.sizes ? !size : sid != null)) return null;
    const p = size ? size.price : it.price;
    return p == null ? null : { it, size, price: p };
  };
  const lineName = l => tx(l.it.name) + (l.size ? ` (${tx(l.size.name)})` : "");
  const priceHtml = it => it.sizes ? it.sizes.map(z => `<span class="sz">${tx(z.name)} ${price(z.price)}</span>`).join(" · ") : price(it.price);

  // ----- السلة: كل زبون سلته محفوظة على جهازه هو -----
  const ORDER = !!M.ordering || new URLSearchParams(location.search).has("preview");
  const bar = document.getElementById("cartbar");
  const load = (k, d) => { try { return JSON.parse(store.get(k)) ?? d; } catch { return d; } };
  const cart = {}; // { مفتاح السلة: العدد }
  for (const [id, n] of Object.entries(load("cart", {}))) if (line(id) && n > 0) cart[id] = Math.min(99, Math.floor(n));
  let note = store.get("note") || "", info = load("info", {}), showErr = false, kind = "";
  const count = () => Object.values(cart).reduce((a, n) => a + n, 0);
  const total = () => Object.entries(cart).reduce((a, [id, n]) => a + line(id).price * n, 0);
  const normPhone = s => String(s || "").replace(/[٠-٩۰-۹]/g, d => "٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹".indexOf(d) % 10).replace(/\D/g, "").replace(/^(00)?97[02]/, "0");
  const nameOk = () => (info.name || "").trim().length >= 2;
  const phoneOk = () => /^05\d{8}$/.test(normPhone(info.phone));
  const openSizes = new Set(); // الأصناف الي خانة أحجامها مفتوحة
  const ctl = (key, q = "") => {
    const n = cart[key] || 0, t = T[lang];
    return `<div class="qty${n ? " on" : ""}"${q}>${n ? `<button type="button" data-sub="${key}" aria-label="${t.sub}">${svg(I.minus, 18, 2.5)}</button><b>${n}</b>` : ""}<button type="button" data-add="${key}" aria-label="${t.add}">${svg(I.plus, 18, 2.5)}</button></div>`;
  };
  const qtyHtml = key => {
    if (!ORDER) return "";
    const it = byId(key);
    if (it?.sizes) { // سهم بدل الزائد، بيفتح خانة فيها كل حجم وسعره
      const n = it.sizes.reduce((a, z) => a + (cart[`${key}:${z.id}`] || 0), 0), on = openSizes.has(key);
      return `<div class="sizes${on ? " open" : ""}" data-q="${key}"><button type="button" class="sz-btn" data-sizes="${key}" aria-expanded="${on}" aria-label="${T[lang].size}">${n ? `<b>${n}</b>` : ""}${svg(I.down, 18, 2.5)}</button>${on ? `<div class="sz-list">${it.sizes.map(z => `<div class="sz-row"><span>${tx(z.name)}</span><span class="sz-p">${price(z.price)}</span>${ctl(`${key}:${z.id}`)}</div>`).join("")}</div>` : ""}</div>`;
    }
    return line(key) ? ctl(key, ` data-q="${key}"`) : "";
  };
  const refreshQty = () => document.querySelectorAll("[data-q]").forEach(el => { el.outerHTML = qtyHtml(el.dataset.q); });
  function renderBar() {
    const n = ORDER ? count() : 0;
    bar.hidden = !n;
    document.body.classList.toggle("has-cart", !!n);
    bar.innerHTML = n ? `<button class="cartbtn" data-open="cart"><span class="cb-n">${n}</span><span class="cb-l">${T[lang].viewCart}</span><span class="cb-t">${price(total())}</span></button>` : "";
  }
  function setQty(id, n) {
    if (!line(id)) return;
    n = Math.max(0, Math.min(99, n));
    if (n) cart[id] = n; else delete cart[id];
    store.set("cart", JSON.stringify(cart));
    if (kind === "cart") renderOverlay(); // الأسطر والمجموع بيتغيروا
    refreshQty();
    renderBar();
  }

  function render() {
    const t = T[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    const popular = items.filter(it => it.featured);
    app.innerHTML = `<div class="wrap">
      <div class="cover">
        <div class="slides" id="slides" dir="ltr">${M.slides.map((sl, i) => `<img src="${esc(sl.image)}" alt="${tx(byId(sl.item)?.name)}"${byId(sl.item) ? ` data-open="item-${esc(sl.item)}"` : ""}${i ? ' loading="lazy"' : ""}>`).join("")}</div>
        ${M.slides.length > 1 ? `<div class="dots" dir="ltr">${M.slides.map((_, i) => `<button type="button" data-slide="${i}" aria-label="${i + 1}"><span></span></button>`).join("")}</div>` : ""}
        <div class="topbar"><button data-open="lang" aria-label="${t.lang}">${svg(I.globe, 28, 1.5)}</button></div>
        <div class="logo"><img src="assets/logo.webp" alt="Kaza Restaurant"></div>
      </div>
      <h1>${tx(M.name)}</h1>
      <p class="sub">${t.contact}: <span class="ltr">${esc(M.phone)}</span></p>
      ${popular.length ? `<div class="popular"><div class="popular-title">${t.popular}</div><div class="scroller"><div class="pop-row">
        ${popular.map(it => `<div class="pop" data-open="item-${it.id}">${img(it)}<div class="pop-name">${tx(it.name)}</div><div class="pop-price">${priceHtml(it)}</div></div>`).join("")}
      </div></div></div>` : ""}
      ${M.categories.length ? "" : `<p class="soon">${t.soon}</p>`}
      <div class="nav"${M.categories.length ? "" : " hidden"}><div class="nav-in">
        <button class="burger" data-open="cats" aria-label="${t.cats}">${svg(I.burger)}</button>
        <div class="scroller" id="tabs-scroll"><div class="tabs">
          ${M.categories.map((c, i) => `<button class="tab${i ? "" : " on"}" data-go="${esc(c.id)}">${tx(c.name)}</button>`).join("")}
        </div></div>
      </div></div>
      ${M.categories.map(c => `<section class="cat" id="${esc(c.id)}">
        <div class="cat-title">${tx(c.name)}</div>
        ${c.items.map((it, i) => { const id = it.id || `${c.id}-${i}`; return `<div class="item" data-open="item-${id}">
          <div class="item-body"><div class="item-name clamp2">${tx(it.name)}</div><div class="item-price">${priceHtml(it)}</div>${tx(it.desc) ? `<p class="item-desc clamp2">${tx(it.desc)}</p>` : ""}${qtyHtml(id)}</div>
          <div class="item-pic">${img(it)}<button class="heart${favs.has(id) ? " on" : ""}" data-fav="${id}" aria-label="${t.fav}">${svg(I.heart)}</button></div>
        </div>`; }).join("")}
        <div class="zig"></div>
      </section>`).join("")}
      <div class="theme-row"><button class="toggle" data-theme-toggle aria-label="${t.theme}">${svg(I.moon, 18)}${svg(I.sun, 18)}<span class="knob">${svg(isDark() ? I.moon : I.sun, 14)}</span></button></div>
    </div>`;
    renderBar();
    initSlides();
    spy();
  }

  // ----- صور الغلاف: بتتبدّل لحالها، والزبون بيقدر يسحب أو يكبس على النقاط -----
  let slideIdx = 0, slideTimer, slideHold = 0;
  const AUTO_MS = 1500, PAUSE_MS = 5000; // بعد ما الزبون يلمس الصور بتوقف 5 ثواني قبل ما ترجع تتحرك
  function initSlides() {
    clearInterval(slideTimer);
    const box = document.getElementById("slides"), n = box?.children.length;
    if (!n) return;
    const dots = [...document.querySelectorAll("[data-slide]")];
    const show = i => dots.forEach((d, k) => d.classList.toggle("on", k === i));
    const goTo = (i, smooth = true) => box.scrollTo({ left: ((i + n) % n) * box.clientWidth, behavior: smooth ? "smooth" : "instant" });
    box.addEventListener("scroll", () => { slideIdx = Math.round(box.scrollLeft / box.clientWidth); show(slideIdx); }, { passive: true });
    ["pointerdown", "touchstart", "wheel"].forEach(ev => box.addEventListener(ev, () => { slideHold = Date.now(); }, { passive: true }));
    dots.forEach((d, k) => d.addEventListener("click", () => { slideHold = Date.now(); goTo(k); }));
    goTo(slideIdx, false); show(slideIdx);
    if (n > 1 && !matchMedia("(prefers-reduced-motion: reduce)").matches)
      slideTimer = setInterval(() => { if (!document.hidden && Date.now() - slideHold > PAUSE_MS) goTo(slideIdx + 1); }, AUTO_MS);
  }

  // ----- النوافذ: اللغة / الأقسام / تفاصيل الصنف (مربوطة بالـ hash عشان زر الرجوع) -----
  function renderOverlay() {
    const t = T[lang];
    const h = decodeURIComponent(location.hash.slice(1)); // lang | cats | item-<id> | cart | checkout | pay
    let id;
    [kind, id] = h.startsWith("item-") ? ["item", h.slice(5)] : [h];
    if (["cart", "checkout", "pay"].includes(kind)) {
      if (!ORDER) kind = "";
      else if (!count()) kind = "cart";
      else if (kind === "pay" && !(nameOk() && phoneOk())) kind = "checkout";
    }
    const head = title => `<div class="page-head"><button type="button" data-close aria-label="${t.close}">${svg(I.x)}</button><span>${title}</span></div>`;
    const sum = `<div class="sum"><span>${t.total}</span><b>${price(total())}</b></div>`;
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
        <div class="d-price">${priceHtml(it)}</div>${tx(it.desc) ? `<div class="d-desc">${tx(it.desc)}</div>` : ""}${qtyHtml(id)}</div></div>`;
    } else if (kind === "cart") {
      html = `<div class="page">${head(t.cart)}${count() ? `<div class="page-body">
        ${Object.entries(cart).map(([id, n]) => { const l = line(id); return `<div class="line">${img(l.it)}<div class="line-main"><div class="line-name">${lineName(l)}</div><div class="line-price">${price(l.price * n)}</div></div>${qtyHtml(id)}</div>`; }).join("")}
        <label class="field"><span>${t.note}</span><textarea data-f="note" id="note" rows="2" maxlength="200" placeholder="${t.notePh}">${esc(note)}</textarea></label>
        </div><div class="page-foot">${sum}<button type="button" class="cta" data-open="checkout">${t.next}</button></div>` : `<div class="page-body"><p class="empty">${t.empty}</p></div>`}</div>`;
    } else if (kind === "checkout") {
      html = `<form class="page" id="info" novalidate>${head(t.info)}<div class="page-body">
        <label class="field"><span>${t.name}</span><input data-f="name" id="f-name" autocomplete="name" maxlength="40" value="${esc(info.name)}">${showErr && !nameOk() ? `<em>${t.nameErr}</em>` : ""}</label>
        <label class="field"><span>${t.phone}</span><input data-f="phone" id="f-phone" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" maxlength="20" placeholder="0591234567" value="${esc(info.phone)}">${showErr && !phoneOk() ? `<em>${t.phoneErr}</em>` : ""}</label>
        </div><div class="page-foot">${sum}<button class="cta">${t.toPay}</button></div></form>`;
    } else if (kind === "pay") {
      html = `<div class="page">${head(t.pay)}<div class="page-body">
        ${Object.entries(cart).map(([id, n]) => `<div class="row"><span><b class="ltr">${n}×</b> ${lineName(line(id))}</span><span>${price(line(id).price * n)}</span></div>`).join("")}
        ${note.trim() ? `<div class="row muted"><span>${esc(note)}</span></div>` : ""}
        <div class="row muted"><span>${esc(info.name)}</span><span class="ltr">${esc(normPhone(info.phone))}</span></div>
        ${sum}<p class="notice">${t.paySoon}</p></div></div>`;
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
  let picked = null; // القسم الي ضغط عليه الزبون، بيضل مختار لحد ما يمرّر بإيده
  function spy() {
    if (!M.categories.length) return;
    if (picked) return setTab(picked);
    const line = navH() + 12, secs = [...document.querySelectorAll(".cat")];
    let cur = secs[0]?.id;
    for (const s of secs) if (s.getBoundingClientRect().top <= line) cur = s.id;
    // آخر قسم ما بيوصل لفوق لأنه قصير، فلما نوصل آخر الصفحة بنختاره
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = secs.at(-1)?.id;
    if (cur) setTab(cur);
  }
  ["touchstart", "wheel", "keydown"].forEach(ev => addEventListener(ev, () => { picked = null; }, { passive: true }));
  function go(id) {
    picked = id; setTab(id);
    const s = document.getElementById(id);
    if (s) window.scrollTo({ top: s.getBoundingClientRect().top + scrollY - navH() + 1, behavior: "smooth" });
  }

  document.addEventListener("click", e => {
    const el = sel => e.target.closest(sel);
    let b;
    if ((b = el("[data-add],[data-sub]"))) {
      const id = b.dataset.add || b.dataset.sub;
      setQty(id, (cart[id] || 0) + (b.dataset.add ? 1 : -1));
    } else if ((b = el("[data-sizes]"))) {
      const id = b.dataset.sizes;
      openSizes.has(id) ? openSizes.delete(id) : openSizes.add(id);
      refreshQty();
    } else if (el(".qty,.sz-list")) { // ضغطة جوا خانة العدد أو الأحجام ما بتفتح صفحة الصنف
    } else if ((b = el("[data-fav]"))) {
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
  document.addEventListener("input", e => {
    const f = e.target.dataset.f;
    if (f === "note") store.set("note", (note = e.target.value));
    else if (f) { info[f] = e.target.value; store.set("info", JSON.stringify(info)); }
  });
  document.addEventListener("submit", e => {
    if (e.target.id !== "info") return;
    e.preventDefault();
    if (!(nameOk() && phoneOk())) { showErr = true; return renderOverlay(); }
    showErr = false;
    info = { name: info.name.trim(), phone: normPhone(info.phone) };
    store.set("info", JSON.stringify(info));
    open("pay");
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !overlay.hidden) close(); });
  addEventListener("hashchange", renderOverlay);
  addEventListener("scroll", spy, { passive: true });

  if (store.get("theme") === "dark") document.documentElement.dataset.theme = "dark";
  render();
  renderOverlay();
})();
