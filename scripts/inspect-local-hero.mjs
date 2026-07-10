import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

const data = await page.evaluate(() => {
  const h1 = document.querySelector(".hero-headline");
  const p = document.querySelector(".hero-copy");
  const cta = document.querySelector(".hero-button");
  const scroll = document.querySelector(".scroll-indicator");
  const main = document.querySelector(".hero-main");
  const block = document.querySelector(".hero-block");
  const rect = (el) => el?.getBoundingClientRect();
  const cs = (el) => (el ? getComputedStyle(el) : null);

  return {
    main: { h: Math.round(rect(main)?.height), minH: cs(main)?.minHeight, padB: cs(main)?.paddingBottom },
    block: { top: Math.round(rect(block)?.top), h: Math.round(rect(block)?.height), mt: cs(block)?.marginTop },
    h1: { top: Math.round(rect(h1)?.top), h: Math.round(rect(h1)?.height), mt: cs(h1)?.marginTop },
    p: { top: Math.round(rect(p)?.top), h: Math.round(rect(p)?.height), mt: cs(p)?.marginTop },
    cta: { top: Math.round(rect(cta)?.top), mt: cs(cta)?.marginTop },
    h1ToP: rect(h1) && rect(p) ? Math.round(rect(p).top - rect(h1).bottom) : null,
    pToCta: rect(p) && rect(cta) ? Math.round(rect(cta).top - rect(p).bottom) : null,
    scroll: { top: Math.round(rect(scroll)?.top), cssBottom: cs(scroll)?.bottom, gapFromMainBottom: main && scroll ? Math.round(rect(main).bottom - rect(scroll).bottom) : null },
  };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
