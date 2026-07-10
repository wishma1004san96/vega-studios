import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });

async function check(width, openMenu = false) {
  const page = await browser.newPage();
  await page.setViewportSize({ width, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  if (openMenu) {
    await page.click(".nav-toggle");
    await page.waitForTimeout(300);
  }
  const data = await page.evaluate(() => {
    const mobile = document.querySelector("#mobile-navigation");
    const visible = [...document.querySelectorAll("header a")].filter((a) => {
      const r = a.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    }).map((a) => `${a.closest("nav")?.id ?? "cta"}:${a.textContent?.trim()}`);
    return {
      w: window.innerWidth,
      mobileDisplay: mobile ? getComputedStyle(mobile).display : null,
      mobileOpacity: mobile ? getComputedStyle(mobile).opacity : null,
      visible,
    };
  });
  console.log(JSON.stringify({ openMenu, ...data }));
  await page.close();
}

for (const w of [720, 768, 981, 1100, 1440]) await check(w);
await check(720, true);
await check(1100, true);

const page = await browser.newPage();
await page.setViewportSize({ width: 1100, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.screenshot({ path: "D:/vega-studiosera/scripts/header-final-1100.png" });
await browser.close();
