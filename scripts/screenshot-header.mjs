import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.screenshot({ path: "D:/vega-studiosera/scripts/header-1440.png", fullPage: false });
await browser.close();
console.log("saved");
