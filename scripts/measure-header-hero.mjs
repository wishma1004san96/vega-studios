import { chromium } from "playwright";

async function measure(pageUrl, label) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(pageUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  const data = await page.evaluate((isLocal) => {
    const section = isLocal
      ? document.querySelector(".hero-main")
      : document.querySelector("h1")?.closest("section");
    const h1 = document.querySelector(isLocal ? ".hero-headline" : "h1");
    const p = document.querySelector(isLocal ? ".hero-copy" : "section p");
    const cta = isLocal
      ? document.querySelector(".hero-button")
      : [...document.querySelectorAll("section p")].find((el) =>
          /CREATE/i.test(el.textContent || ""),
        );
    const scroll = isLocal
      ? document.querySelector(".scroll-indicator")
      : document.querySelector("a[href='#marquee']");
    const rect = (el) => el?.getBoundingClientRect();

    return {
      heroTop: Math.round(rect(section)?.top),
      heroHeight: Math.round(rect(section)?.height),
      h1Top: Math.round(rect(h1)?.top),
      h1ToP: Math.round(rect(p).top - rect(h1).bottom),
      pToCta: Math.round(rect(cta).top - rect(p).bottom),
      ctaToScroll: Math.round(rect(scroll).top - rect(cta).bottom),
      scrollBottom: Math.round(rect(section).bottom - rect(scroll).bottom),
      marqueeGap: (() => {
        const marquee = isLocal
          ? document.querySelector(".service-slider")
          : document.getElementById("marquee");
        return Math.round(rect(marquee).top - rect(section).bottom);
      })(),
    };
  }, pageUrl.includes("localhost"));

  await browser.close();
  console.log(`\n=== ${label} ===\n${JSON.stringify(data, null, 2)}`);
}

await measure("https://vegastudios.io", "original");
await measure("http://localhost:3000", "localhost");
