import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("https://vegastudios.io", { waitUntil: "networkidle" });

const data = await page.evaluate(() => {
  const cta = [...document.querySelectorAll("section p")].find((el) =>
    /CREATE|POWER/i.test(el.textContent || ""),
  );
  const cs = getComputedStyle(cta);
  return {
    letterSpacing: cs.letterSpacing,
    fontSize: cs.fontSize,
    padding: cs.padding,
    width: cta.getBoundingClientRect().width,
  };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
