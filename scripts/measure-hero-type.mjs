import { chromium } from "playwright";

async function measure(pageUrl, label) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(pageUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  const data = await page.evaluate((isLocal) => {
    const h1 = document.querySelector(isLocal ? ".hero-headline" : "h1");
    const p = document.querySelector(isLocal ? ".hero-copy" : "section h1 + p, section p");
    const cta = isLocal
      ? document.querySelector(".hero-button")
      : [...document.querySelectorAll("section p")].find((el) =>
          /CREATE|POWER/i.test(el.textContent || ""),
        );
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const rect = (el) => el?.getBoundingClientRect();

    return {
      h1: h1
        ? {
            fontSize: cs(h1).fontSize,
            lineHeight: cs(h1).lineHeight,
            letterSpacing: cs(h1).letterSpacing,
            width: Math.round(rect(h1).width),
            height: Math.round(rect(h1).height),
          }
        : null,
      p: p
        ? {
            fontSize: cs(p).fontSize,
            lineHeight: cs(p).lineHeight,
            maxWidth: cs(p).maxWidth,
            width: Math.round(rect(p).width),
            height: Math.round(rect(p).height),
          }
        : null,
      cta: cta
        ? {
            fontSize: cs(cta).fontSize,
            width: Math.round(rect(cta).width),
            height: Math.round(rect(cta).height),
            padding: cs(cta).padding,
            minWidth: cs(cta).minWidth,
          }
        : null,
    };
  }, pageUrl.includes("localhost"));

  await browser.close();
  console.log(`\n=== ${label} ===\n${JSON.stringify(data, null, 2)}`);
}

await measure("https://vegastudios.io", "original");
await measure("http://localhost:3000", "localhost");
