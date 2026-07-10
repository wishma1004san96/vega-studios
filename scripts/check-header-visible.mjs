import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1100, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

const data = await page.evaluate(() => {
  const links = [...document.querySelectorAll("header a")].map((a) => {
    const r = a.getBoundingClientRect();
    const style = getComputedStyle(a);
    const parentNav = a.closest("nav");
    return {
      text: a.textContent?.trim(),
      navId: parentNav?.id,
      rect: { w: r.width, h: r.height, x: r.x, y: r.y },
      display: style.display,
      parentDisplay: parentNav ? getComputedStyle(parentNav).display : null,
    };
  });
  return links;
});

console.log(JSON.stringify(data, null, 2));
await page.screenshot({ path: "D:/vega-studiosera/scripts/header-1100.png" });
await browser.close();
