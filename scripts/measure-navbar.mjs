import { chromium } from "playwright";

async function measure(pageUrl, label) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(pageUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  const data = await page.evaluate(() => {
    const header = document.querySelector("header");
    const inner = header?.firstElementChild;
    const logo = header?.querySelector("img");
    const cta = header?.querySelector(".menu-cta");
    const link = header?.querySelector("#main-navigation a, nav a");
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const rect = (el) => el?.getBoundingClientRect();
    const centerY = (el) => Math.round(rect(el).top + rect(el).height / 2);

    return {
      headerH: Math.round(rect(header)?.height),
      innerH: inner ? Math.round(rect(inner).height) : null,
      innerClass: inner?.className?.slice(0, 80),
      headerCenterY: centerY(header),
      logoCenterY: centerY(logo),
      linkCenterY: centerY(link),
      ctaCenterY: cta ? centerY(cta) : null,
      logoH: Math.round(rect(logo)?.height),
    };
  });

  await browser.close();
  console.log(`\n=== ${label} ===\n${JSON.stringify(data, null, 2)}`);
}

await measure("https://vegastudios.io", "original");
await measure("http://localhost:3000", "localhost");
