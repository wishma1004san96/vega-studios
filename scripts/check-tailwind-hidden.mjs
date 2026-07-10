import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

const data = await page.evaluate(() => {
  const mobile = document.querySelector("#mobile-navigation");
  const sheets = [...document.styleSheets];
  let matchingRules = [];
  for (const sheet of sheets) {
    try {
      for (const rule of sheet.cssRules) {
        const text = rule.cssText || "";
        if (text.includes("hidden") && (text.includes("768") || text.includes("48rem") || text.includes("mobile-navigation") || text.includes("hero-menu"))) {
          matchingRules.push(text.slice(0, 200));
        }
      }
    } catch {}
  }
  return {
    mobileRules: mobile
      ? [...mobile.classList].map((cls) => {
          const el = document.createElement("div");
          el.className = cls;
          return { cls, test: "n/a" };
        })
      : [],
    classList: mobile?.className,
  };
});

// Check if md:!hidden rule exists in page
const ruleCheck = await page.evaluate(() => {
  const results = [];
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.selectorText?.includes("md") && rule.cssText.includes("hidden")) {
          results.push(rule.cssText);
        }
      }
    } catch {}
  }
  return results.slice(0, 10);
});

console.log("md hidden rules:", ruleCheck);
console.log("mobile class:", data.classList);

await browser.close();
