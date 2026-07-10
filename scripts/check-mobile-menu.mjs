import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 720, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.click(".nav-toggle");
await page.waitForTimeout(300);

const data = await page.evaluate(() => {
  const mobile = document.querySelector("#mobile-navigation");
  return {
    mobileDisplay: mobile ? getComputedStyle(mobile).display : null,
    mobileOpacity: mobile ? getComputedStyle(mobile).opacity : null,
    mobileVisibility: mobile ? getComputedStyle(mobile).visibility : null,
    className: mobile?.className,
    visible: [...document.querySelectorAll("header a")].filter((a) => {
      const r = a.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    }).map((a) => a.textContent?.trim()),
  };
});

console.log(JSON.stringify(data, null, 2));
await page.screenshot({ path: "D:/vega-studiosera/scripts/header-mobile-open.png" });
await browser.close();
