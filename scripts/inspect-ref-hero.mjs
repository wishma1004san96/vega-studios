import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("https://vegastudios.io", { waitUntil: "networkidle" });

const data = await page.evaluate(() => {
  const section = document.querySelector("h1")?.closest("section");
  const h1 = section?.querySelector("h1");
  const p = section?.querySelector("p");
  const btn = section?.querySelector("a, button");
  const cs = (el) => (el ? getComputedStyle(el) : null);
  const rect = (el) => el?.getBoundingClientRect();

  const elements = [...(section?.querySelectorAll("h1, p, a, button, div") || [])]
    .filter((el) => {
      const r = el.getBoundingClientRect();
      return r.height > 0 && r.width > 100;
    })
    .slice(0, 15)
    .map((el) => ({
      tag: el.tagName,
      class: el.className?.slice?.(0, 80),
      text: el.textContent?.trim()?.slice(0, 60),
      top: Math.round(el.getBoundingClientRect().top),
      height: Math.round(el.getBoundingClientRect().height),
      marginTop: cs(el)?.marginTop,
    }));

  return {
    h1ToP: rect(h1) && rect(p) ? Math.round(rect(p).top - rect(h1).bottom) : null,
    pToBtn: rect(p) && rect(btn) ? Math.round(rect(btn).top - rect(p).bottom) : null,
    btnMarginTop: cs(btn)?.marginTop,
    pMarginTop: cs(p)?.marginTop,
    elements,
  };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
