import { chromium } from "playwright";

async function measure(pageUrl, label) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(pageUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  const data = await page.evaluate((isLocal) => {
    const h1 = document.querySelector("h1");
    const heroSection = isLocal
      ? document.querySelector(".hero-main")
      : h1?.closest("section");

    const paragraph = heroSection?.querySelector(".hero-copy, p");
    const cta = [...(heroSection?.querySelectorAll("a") || [])].find((a) =>
      /CREATE|POWER/i.test(a.textContent || ""),
    );

    const rect = (el) => el?.getBoundingClientRect();
    const cs = (el) => (el ? getComputedStyle(el) : null);

    return {
      ctaText: cta?.textContent?.trim()?.slice(0, 40),
      pToCta:
        rect(paragraph) && rect(cta)
          ? Math.round(rect(cta).top - rect(paragraph).bottom)
          : null,
      ctaMarginTop: cs(cta)?.marginTop,
      heroBlockMarginTop: cs(document.querySelector(".hero-block"))?.marginTop,
    };
  }, pageUrl.includes("localhost"));

  await browser.close();
  console.log(`\n=== ${label} ===\n${JSON.stringify(data, null, 2)}`);
}

await measure("https://vegastudios.io", "original");
await measure("http://localhost:3000", "localhost");
