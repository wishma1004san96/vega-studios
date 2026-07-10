import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

const rules = await page.evaluate(() => {
  const results = [];
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.cssText?.includes("768px") || rule.cssText?.includes("48rem")) {
          if (rule.cssText.includes("display")) results.push(rule.cssText.slice(0, 150));
        }
      }
    } catch {}
  }
  return results.slice(0, 20);
});

console.log(rules.join("\n---\n"));
await browser.close();
