import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });

for (const w of [720, 768, 981, 1100, 1440]) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  const data = await page.evaluate(() => {
    const mobile = document.querySelector("#mobile-navigation");
    const visible = [...document.querySelectorAll("header a")].filter((a) => {
      const r = a.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    }).map((a) => `${a.closest("nav")?.id ?? "cta"}:${a.textContent?.trim()}`);
    return {
      w: window.innerWidth,
      mobileDisplay: mobile ? getComputedStyle(mobile).display : null,
      visible,
    };
  });
  console.log(JSON.stringify(data));
  await page.close();
}

const page = await browser.newPage();
await page.setViewportSize({ width: 1100, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.screenshot({ path: "D:/vega-studiosera/scripts/header-fixed-1100.png" });
await browser.close();
