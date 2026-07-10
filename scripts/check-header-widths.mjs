import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });

for (const w of [720, 768, 900, 981, 1100, 1440]) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  const data = await page.evaluate(() => {
    const mobile = document.querySelector("#mobile-navigation");
    const main = document.querySelector("#main-navigation");
    const visibleLinks = [...document.querySelectorAll("header nav a, header .menu-cta")]
      .filter((a) => {
        const style = getComputedStyle(a);
        return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
      })
      .map((a) => a.textContent?.trim());
    return {
      w: window.innerWidth,
      mainDisplay: main ? getComputedStyle(main).display : null,
      mobileDisplay: mobile ? getComputedStyle(mobile).display : null,
      visibleLinks,
    };
  });
  console.log(JSON.stringify(data));
  await page.close();
}

await browser.close();
