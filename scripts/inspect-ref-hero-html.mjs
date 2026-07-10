import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("https://vegastudios.io", { waitUntil: "networkidle" });

const data = await page.evaluate(() => {
  const section = document.querySelector("h1")?.closest("section");
  return {
    sectionHtml: section?.innerHTML?.slice(0, 4000),
    sectionClass: section?.className,
  };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
