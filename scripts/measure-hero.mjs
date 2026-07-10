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
    const cta = heroSection?.querySelector(".hero-button, a[href*='contact']");
    const scroll = document.querySelector(".scroll-indicator");

    const marquee =
      document.querySelector(".service-slider, #marquee") ||
      [...document.querySelectorAll("section")].find((s) =>
        s.textContent?.includes("Digital Marketing"),
      );

    const rect = (el) => el?.getBoundingClientRect();
    const cs = (el) => (el ? getComputedStyle(el) : null);

    const heroRect = rect(heroSection);
    const h1Rect = rect(h1);
    const pRect = rect(paragraph);
    const ctaRect = rect(cta);
    const scrollRect = rect(scroll);
    const marqueeRect = rect(marquee);

    return {
      heroClass: heroSection?.className?.slice?.(0, 120),
      hero: heroRect
        ? {
            height: Math.round(heroRect.height),
            minHeight: cs(heroSection)?.minHeight,
            paddingTop: cs(heroSection)?.paddingTop,
            paddingBottom: cs(heroSection)?.paddingBottom,
          }
        : null,
      h1ToP: h1Rect && pRect ? Math.round(pRect.top - h1Rect.bottom) : null,
      pToCta: pRect && ctaRect ? Math.round(ctaRect.top - pRect.bottom) : null,
      pMarginTop: cs(paragraph)?.marginTop,
      ctaMarginTop: cs(cta)?.marginTop,
      scroll: scrollRect
        ? {
            bottomGapFromViewport: Math.round(
              window.innerHeight - scrollRect.bottom,
            ),
            bottomGapFromHero: heroRect
              ? Math.round(heroRect.bottom - scrollRect.bottom)
              : null,
            cssBottom: cs(scroll)?.bottom,
          }
        : null,
      marquee: marqueeRect
        ? {
            top: Math.round(marqueeRect.top),
            bottomGapFromViewport: Math.round(
              window.innerHeight - marqueeRect.bottom,
            ),
            height: Math.round(marqueeRect.height),
          }
        : null,
      heroBottomToMarquee:
        heroRect && marqueeRect
          ? Math.round(marqueeRect.top - heroRect.bottom)
          : null,
    };
  }, pageUrl.includes("localhost"));

  await browser.close();
  console.log(`\n=== ${label} ===\n${JSON.stringify(data, null, 2)}`);
}

await measure("https://vegastudios.io", "original");
await measure("http://localhost:3000", "localhost");
