import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });

for (const [w, label] of [
  [768, "tablet-768"],
  [1440, "desktop-1440"],
]) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  const data = await page.evaluate(() => {
    const scroll = document.querySelector(".scroll-indicator");
    const fingerprint = scroll?.querySelector("svg.lg\\:hidden, svg[class*='lg:hidden']");
    const mouse = scroll?.querySelector("svg.hidden.lg\\:block, svg[class*='lg:block']");
    const fpVisible = fingerprint ? getComputedStyle(fingerprint).display !== "none" : null;
    const mouseVisible = mouse ? getComputedStyle(mouse).display !== "none" : null;
    return { fpVisible, mouseVisible };
  });
  console.log(`${label}:`, data);
  await page.close();
}

await browser.close();
