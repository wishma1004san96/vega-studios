import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

const data = await page.evaluate(() => {
  const main = document.querySelector("#main-navigation");
  const mobile = document.querySelector("#mobile-navigation");
  const mainLinks = main?.querySelectorAll("a").length ?? 0;
  const mobileLinks = mobile?.querySelectorAll("a").length ?? 0;
  return {
    mainDisplay: main ? getComputedStyle(main).display : null,
    mobileDisplay: mobile ? getComputedStyle(mobile).display : null,
    mobileClass: mobile?.className,
    mainLinks,
    mobileLinks,
    allHeaderLinks: [...document.querySelectorAll("header a")].map((a) => a.textContent?.trim()),
  };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
