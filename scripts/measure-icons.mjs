import { chromium } from "playwright";

async function icons(url, label) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.locator("#process").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  const data = await page.evaluate(() => {
    const section = document.getElementById("process");
    const desktop = [...section.querySelectorAll("div")].find(
      (el) => el.className.includes("lg:block") && el.className.includes("hidden"),
    );
    const scope = desktop || section;
    const icons = [...scope.querySelectorAll("span.h-12, span.flex")].filter((el) => {
      return el.clientWidth >= 44 && el.clientWidth <= 52;
    });
    const rect = (el) => {
      const r = el.getBoundingClientRect();
      return {
        cx: Math.round(r.x + r.width / 2),
        cy: Math.round(r.y + r.height / 2),
        w: Math.round(r.width),
        h: Math.round(r.height),
      };
    };
    const lines = [...scope.querySelectorAll('[class*="border-dashed"], .process-line')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 5 || r.height > 5;
      })
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          w: Math.round(r.width),
          h: Math.round(r.height),
          cx: Math.round(r.x + r.width / 2),
          cy: Math.round(r.y + r.height / 2),
        };
      });
    const h2 = section.querySelector("h2");
    const span = h2?.querySelector("span,em");
    const sub = section.querySelector("p");
    return {
      layout: section.querySelector(".process-graph")
        ? "grid"
        : scope.querySelector(".w-max")
          ? "flex-w-max"
          : "other",
      icons: icons.map((el, i) => ({ i, ...rect(el) })),
      lines,
      heading: h2
        ? {
            fontSize: getComputedStyle(h2).fontSize,
            spanColor: span ? getComputedStyle(span).color : null,
            spanBg: span ? getComputedStyle(span).backgroundImage : null,
          }
        : null,
      subtitle: sub
        ? { fontSize: getComputedStyle(sub).fontSize, lineHeight: getComputedStyle(sub).lineHeight }
        : null,
      stepTitle: scope.querySelector("h3, p.text-sm")
        ? getComputedStyle(scope.querySelector("p.text-sm, h3"))
        : null,
    };
  });

  await browser.close();
  console.log(`=== ${label} ===`);
  console.log(JSON.stringify(data, null, 2));
}

await icons("https://vegastudios.io/#process", "original");
await icons("http://localhost:3000/#process", "localhost");
