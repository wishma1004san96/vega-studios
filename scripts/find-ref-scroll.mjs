import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("https://vegastudios.io", { waitUntil: "networkidle" });

const scrollEl = await page.evaluate(() => {
  const candidates = [...document.querySelectorAll("*")].filter((el) => {
    const cls = el.className?.toString?.() || "";
    return /mouse|scroll|wheel/i.test(cls) || el.querySelector?.(".mouse-wheel");
  });
  return candidates.slice(0, 10).map((el) => ({
    tag: el.tagName,
    class: el.className?.toString?.().slice(0, 100),
    html: el.outerHTML?.slice(0, 300),
  }));
});

console.log(JSON.stringify(scrollEl, null, 2));
await browser.close();
