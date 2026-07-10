import { chromium } from "playwright";

async function measure(url, label) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);

  const data = await page.evaluate(() => {
    const footer = document.querySelector("footer");
    const cs = (el) => {
      const s = getComputedStyle(el);
      return {
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        letterSpacing: s.letterSpacing,
        lineHeight: s.lineHeight,
        color: s.color,
        marginTop: s.marginTop,
        paddingTop: s.paddingTop,
        paddingBottom: s.paddingBottom,
        borderTop: s.borderTop,
        height: el.getBoundingClientRect().height,
      };
    };

    const tagline = [...footer.querySelectorAll("p")].find((p) =>
      p.textContent.includes("Where Creativity"),
    );
    const copyBlock = footer.querySelector(".border-t.border-white\\/10.pt-6, .mt-10");
    const logo = footer.querySelector("img");
    const accent = footer.querySelector("span.text-\\[\\#d22127\\], .text-primary, span");

    return {
      footer: cs(footer),
      shell: footer.firstElementChild ? cs(footer.firstElementChild) : null,
      logo: logo
        ? {
            width: logo.getBoundingClientRect().width,
            height: logo.getBoundingClientRect().height,
          }
        : null,
      tagline: tagline ? cs(tagline) : null,
      copyBlock: copyBlock ? cs(copyBlock) : null,
      accentColor: accent ? getComputedStyle(accent).color : null,
    };
  });

  await browser.close();
  console.log(`\n=== ${label} ===\n${JSON.stringify(data, null, 2)}`);
}

await measure("https://vegastudios.io", "original");
await measure("http://localhost:3000", "localhost");
