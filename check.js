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
  // تفاصيل الصنف + زر الرجوع
  await p.locator('.item').nth(1).click(); await p.waitForTimeout(300); await shot('ar_item');
  assert(await p.locator('.detail').isVisible());
  await p.goBack(); await p.waitForTimeout(300); assert(await p.locator('#overlay').isHidden());
  // المفضلة ما بتفتح الصنف
  await p.locator('.heart').first().click(); assert(await p.locator('#overlay').isHidden()); assert(await p.locator('.heart.on').count() === 1);
  // الأقسام
  await p.locator('.burger').click(); await p.waitForTimeout(300); await shot('ar_cats');
  await p.locator('.cat-opt').nth(0).click(); await p.waitForTimeout(1200);
  assert.equal(await p.locator('.tab.on').getAttribute('data-go'), 'sandwiches');
  await shot('ar_cat3');
  // اللغة
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
  await p.locator('.topbar button').click(); await p.waitForTimeout(300); await shot('lang');
  await p.locator('[data-lang=en]').click(); await p.waitForTimeout(400);
  assert.equal(await p.getAttribute('html', 'dir'), 'ltr'); assert(await p.locator('#overlay').isHidden());
  await shot('en1'); await p.evaluate(() => scrollTo(0, 620)); await p.waitForTimeout(400); await shot('en2');
  await p.locator('.item').nth(0).click(); await p.waitForTimeout(300); await shot('en_item'); await p.locator('.d-close').click(); await p.waitForTimeout(300);
  await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(400); await shot('en_bottom');
  await p.locator('.toggle').click(); await p.waitForTimeout(400); await shot('dark_bottom');
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300); await shot('dark1');
  await p.reload(); await p.waitForTimeout(400);
  assert.equal(await p.getAttribute('html', 'lang'), 'en');           // اللغة محفوظة
  assert.deepEqual(errs, []);
  console.log('ALL OK');
  await b.close(); srv.close();
})().catch(e => { console.error('FAILED', e.message); process.exit(1); });
