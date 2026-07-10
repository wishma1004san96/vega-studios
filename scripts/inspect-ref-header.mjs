import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

await page.goto("https://vegastudios.io", { waitUntil: "networkidle" });

const top = await page.evaluate(() => {
  const header = document.querySelector("header");
  return {
    className: header?.className,
    html: header?.outerHTML?.slice(0, 2000),
  };
});

console.log(JSON.stringify(top, null, 2));

await page.evaluate(() => window.scrollTo(0, 600));
await page.waitForTimeout(400);

const scrolled = await page.evaluate(() => {
  const header = document.querySelector("header");
  const cs = getComputedStyle(header);
  return {
    className: header?.className,
    background: cs.backgroundColor,
    backdropFilter: cs.backdropFilter,
    borderBottom: cs.borderBottom,
    boxShadow: cs.boxShadow,
    height: header?.getBoundingClientRect().height,
  };
});

console.log("\nSCROLLED:", JSON.stringify(scrolled, null, 2));
await browser.close();
