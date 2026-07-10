import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

const data = await page.evaluate(() => {
  const nav = document.querySelector(".hero-nav-wrap");
  const main = document.querySelector(".hero-main");
  const rect = (el) => el?.getBoundingClientRect();
  return {
    navHeight: Math.round(rect(nav)?.height),
    navBottom: Math.round(rect(nav)?.bottom),
    mainTop: Math.round(rect(main)?.top),
    mainBottom: Math.round(rect(main)?.bottom),
    mainHeight: Math.round(rect(main)?.height),
  };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
