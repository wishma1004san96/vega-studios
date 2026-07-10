import { chromium } from "playwright";

async function measure(url, label) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  const data = await page.evaluate(() => {
    const section = document.getElementById("contact");
    const cs = (el, props) =>
      Object.fromEntries(props.map((p) => [p, getComputedStyle(el)[p]]));
    const cards = [...section.querySelectorAll(".contact-card, .grid.gap-4 > div, [class*='rounded-2xl'][class*='border']")].filter(
      (el) => el.closest("form") === null && el.querySelector("a, span"),
    ).slice(0, 3);
    const form = section.querySelector("form");
    const inputs = form ? [...form.querySelectorAll("input, textarea")] : [];
    const btn = form?.querySelector("button[type='submit']");
    const grid = form?.querySelector(".grid, .contact-form-row");
    return {
      cards: cards.map((c) => ({
        h: Math.round(c.getBoundingClientRect().height),
        pad: cs(c, ["padding", "borderRadius"]),
        label: c.querySelector("p, span")?.textContent?.trim(),
        hasIcon: !!c.querySelector("svg"),
      })),
      cardGap: cards[0]?.parentElement ? getComputedStyle(cards[0].parentElement).gap : null,
      formGrid: grid ? getComputedStyle(grid).gridTemplateColumns : null,
      input: inputs[0] ? cs(inputs[0], ["height", "borderRadius", "fontSize", "padding"]) : null,
      btn: btn ? cs(btn, ["height", "padding", "fontSize", "alignSelf"]) : null,
      label: form?.querySelector("label span, .contact-field label")
        ? cs(form.querySelector("label span, .contact-field label"), ["fontSize", "fontWeight", "textTransform"])
        : null,
    };
  });

  await browser.close();
  console.log(`\n=== ${label} ===\n${JSON.stringify(data, null, 2)}`);
}

await measure("https://vegastudios.io/#contact", "original");
await measure("http://localhost:3000/#contact", "localhost");
