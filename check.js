const { chromium } = require('playwright');
const assert = require('assert');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = __dirname;
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const srv = http.createServer((q, s) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0]).replace(/\/$/, '/index.html')); fs.readFile(f, (e, d) => { if (e) { s.writeHead(404); return s.end(); } s.writeHead(200, { 'content-type': types[path.extname(f)] || 'text/plain' }); s.end(d); }); }).listen(4780);
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  const p = await ctx.newPage(); p.setDefaultTimeout(5000);
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text())); p.on('requestfailed', r => errs.push('REQ ' + r.url()));
  const shot = n => p.screenshot({ path: `/tmp/kaza-${n}.png` });
  const U = 'http://localhost:4780/';
  await p.goto(U); await p.waitForTimeout(600);
  assert.equal(await p.getAttribute('html', 'dir'), 'rtl');           // يفتح عربي
  assert.equal(await p.locator('.topbar button').count(), 1);          // زر اللغة بس
  assert(!(await p.content()).match(/shisha|شيشة/i));                  // بدون شيشة
  assert((await p.textContent('.sub')).includes('0593608095'));
  await shot('ar1');
  await p.evaluate(() => scrollTo(0, 620)); await p.waitForTimeout(400); await shot('ar2');
  const ids = await p.evaluate(() => MENU.categories.map(c => c.id));
  if (!ids.length) assert(await p.locator('.soon').isVisible()); // منيو فاضي
  if (ids.length) {
  // تفاصيل الصنف + زر الرجوع
  await p.locator('.item').nth(1).click(); await p.waitForTimeout(300); await shot('ar_item');
  assert(await p.locator('.detail').isVisible());
  await p.goBack(); await p.waitForTimeout(300); assert(await p.locator('#overlay').isHidden());
  // المفضلة ما بتفتح الصنف
  await p.locator('.heart').first().click(); assert(await p.locator('#overlay').isHidden()); assert(await p.locator('.heart.on').count() === 1);
  // الأقسام
  await p.locator('.burger').click(); await p.waitForTimeout(300); await shot('ar_cats');
  await p.locator('.cat-opt').nth(0).click(); await p.waitForTimeout(1200);
  assert.equal(await p.locator('.tab.on').getAttribute('data-go'), ids[0]);
  await shot('ar_cat3');
  // آخر قسم بيصير أخضر بالضغط وبالتمرير لآخر الصفحة
  await p.locator('.tab').last().click(); await p.waitForTimeout(1200);
  assert.equal(await p.locator('.tab.on').getAttribute('data-go'), ids.at(-1));
  await p.mouse.wheel(0, -300); await p.waitForTimeout(400); await p.mouse.wheel(0, 5000); await p.waitForTimeout(800);
  assert.equal(await p.locator('.tab.on').getAttribute('data-go'), ids.at(-1));
  }
  // اللغة
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
  await p.locator('.topbar button').click(); await p.waitForTimeout(300); await shot('lang');
  await p.locator('[data-lang=en]').click(); await p.waitForTimeout(400);
  assert.equal(await p.getAttribute('html', 'dir'), 'ltr'); assert(await p.locator('#overlay').isHidden());
  await shot('en1'); await p.evaluate(() => scrollTo(0, 620)); await p.waitForTimeout(400); await shot('en2');
  if (ids.length) {await p.locator('.item').nth(0).click(); await p.waitForTimeout(300); await shot('en_item'); await p.locator('.d-close').click(); await p.waitForTimeout(300); }
  await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(400); await shot('en_bottom');
  await p.locator('.toggle').click(); await p.waitForTimeout(400); await shot('dark_bottom');
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300); await shot('dark1');
  await p.reload(); await p.waitForTimeout(400);
  assert.equal(await p.getAttribute('html', 'lang'), 'en');           // اللغة محفوظة
  // ----- السلة: مطفية بالوضع العادي، وشغالة مع ?preview -----
  assert.equal(await p.locator('[data-add]').count(), 0);
  assert.equal(await p.locator('[data-sizes]').count(), 0);
  await p.evaluate(() => localStorage.clear());
  await p.goto(U + '?preview'); await p.waitForTimeout(500);
  const pr = await p.evaluate(() => MENU.categories[0].items[0].price);
  const bar = p.locator('#cartbar');
  assert(await bar.isHidden());
  await p.evaluate(() => scrollTo(0, 620)); await p.waitForTimeout(300);
  await p.locator('.item [data-add]').first().click();
  assert(await p.locator('#overlay').isHidden());                      // الزائد ما بيفتح صفحة الصنف
  assert.equal(await bar.locator('.cb-n').textContent(), '1');
  assert((await bar.locator('.cb-t').textContent()).includes(String(pr)));
  await p.locator('.item [data-add]').first().click();
  assert.equal(await bar.locator('.cb-n').textContent(), '2');
  assert((await bar.locator('.cb-t').textContent()).includes(String(pr * 2)));  // صنفين = سعرين
  await shot('cart_bar');
  await p.reload(); await p.waitForTimeout(400);
  assert.equal(await bar.locator('.cb-n').textContent(), '2');        // السلة محفوظة
  await bar.locator('button').click(); await p.waitForTimeout(300); await shot('cart');
  await p.locator('.page [data-sub]').click();
  assert((await p.locator('.sum b').textContent()).includes(String(pr)));
  await p.locator('#note').fill('بدون بصل <b>');
  await p.locator('.cta').click(); await p.waitForTimeout(300);
  await p.locator('.cta').click(); await p.waitForTimeout(200);        // فاضي = خطأ
  assert.equal(await p.locator('.field em').count(), 2); await shot('checkout_err');
  await p.locator('#f-name').fill('أحمد'); await p.locator('#f-phone').fill('123');
  await p.locator('.cta').click(); await p.waitForTimeout(200);
  assert.equal(await p.locator('.field em').count(), 1);               // رقم غلط
  for (const bad of ['٠٥٩٧١٤٤٧٠']) { await p.locator('#f-phone').fill(bad); await p.locator('.cta').click(); await p.waitForTimeout(200); assert.equal(await p.locator('.field em').count(), 1); } // 9 أرقام عربية = ناقص
  for (const good of ['٠٥٩١٢٣٤٥٦٧', '۰۵۹۱۲۳۴۵۶۷']) {                // أرقام عربية وفارسية = مقبولة
    await p.locator('#f-phone').fill(good); await p.locator('.cta').click(); await p.waitForTimeout(300);
    assert((await p.locator('.page').textContent()).includes('0591234567'), good); await p.goBack(); await p.waitForTimeout(300);
  }
  await p.locator('#f-phone').fill('+970 59-123 4567');
  await p.locator('.cta').click(); await p.waitForTimeout(300); await shot('pay');
  const pay = await p.locator('.page').textContent();
  assert(pay.includes('0591234567') && pay.includes('أحمد') && pay.includes('بدون بصل <b>'));
  await p.goBack(); await p.goBack(); await p.waitForTimeout(300);
  await p.locator('.page [data-sub]').click(); await p.waitForTimeout(200);
  assert(await p.locator('.empty').isVisible()); assert(await bar.isHidden());   // آخر صنف انشال
  // ----- أصناف بأحجام: سهم بدل الزائد، وكل حجم بسعره -----
  const sized = await p.evaluate(() => { const it = MENU.categories.flatMap(c => c.items).find(i => i.sizes); return it && { id: it.id, a: it.sizes[0].price, b: it.sizes[1].price }; });
  if (sized) {
    await p.goto(U); await p.waitForTimeout(400);
    const row = p.locator('.item', { has: p.locator(`[data-fav="${sized.id}"]`) });
    const pt = await row.locator('.item-price').textContent();
    assert(pt.includes(String(sized.a)) && pt.includes(String(sized.b)));   // السعرين ظاهرين حتى بدون طلب
    await p.goto(U + '?preview'); await p.waitForTimeout(400);
    const box = p.locator(`.item [data-q="${sized.id}"]`);
    await box.scrollIntoViewIfNeeded();
    assert.equal(await box.locator('[data-add]').count(), 0);            // مسكّرة = سهم بس
    await box.locator('[data-sizes]').click();
    assert(await p.locator('#overlay').isHidden());
    assert.equal(await box.locator('.sz-row').count(), 2);
    await box.locator('[data-add]').nth(0).click();
    await box.locator('[data-add]').nth(1).click(); await box.locator('[data-add]').nth(1).click();
    assert.equal(await bar.locator('.cb-n').textContent(), '3');
    assert((await bar.locator('.cb-t').textContent()).includes(String(sized.a + 2 * sized.b)));
    await box.scrollIntoViewIfNeeded(); await shot('sizes');
    await box.locator('.sz-row span').first().click(); assert(await p.locator('#overlay').isHidden());
    await bar.locator('button').click(); await p.waitForTimeout(300); await shot('sizes_cart');
    assert.equal(await p.locator('.page .line').count(), 2);            // كل حجم سطر لحاله
    await p.evaluate(() => localStorage.clear());
  }
  assert.deepEqual(errs, []);
  console.log('ALL OK');
  await b.close(); srv.close();
})().catch(e => { console.error('FAILED', e.message); process.exit(1); });
