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
    const cs = (el) => {
      const s = getComputedStyle(el);
      return {
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        letterSpacing: s.letterSpacing,
        lineHeight: s.lineHeight,
        textTransform: s.textTransform,
        color: s.color,
      };
    };

    const title = section.querySelector("h2");
    const kicker = [...section.querySelectorAll("p")].find((p) =>
      p.textContent.includes("Bring Your Brand"),
    );
    const subtitle = [...section.querySelectorAll("p")].find((p) =>
      p.textContent.includes("Ready to launch"),
    );
    const cards = [...section.querySelectorAll('[class*="rounded-2xl"]')].filter(
      (el) => el.closest("form") === null,
    );
    const cardLabel = cards[0]?.querySelector(".flex p, p.font-semibold, p");
    const cardLink = cards[0]?.querySelector("a");
    const cardSpan = cards[2]?.querySelector("span");
    const form = section.querySelector("form");
    const labelSpan = form?.querySelector("label span");
    const input = form?.querySelector("input");
    const textarea = form?.querySelector("textarea");
    const consent = [...(form?.querySelectorAll("p") ?? [])].find((p) =>
      p.textContent.includes("By submitting"),
    );
    const btn = form?.querySelector("button[type='submit']");

    let placeholder = null;
    if (input) {
      const ph = getComputedStyle(input, "::placeholder");
      placeholder = {
        fontFamily: ph.fontFamily,
        fontSize: ph.fontSize,
        fontWeight: ph.fontWeight,
        letterSpacing: ph.letterSpacing,
        lineHeight: ph.lineHeight,
        color: ph.color,
      };
    }

    return {
      title: title ? cs(title) : null,
      titleEm: title?.querySelector("em") ? cs(title.querySelector("em")) : null,
      kicker: kicker ? cs(kicker) : null,
      subtitle: subtitle ? cs(subtitle) : null,
      cardLabel: cardLabel ? cs(cardLabel) : null,
      cardLink: cardLink ? cs(cardLink) : null,
      cardSpan: cardSpan ? cs(cardSpan) : null,
      formLabel: labelSpan ? cs(labelSpan) : null,
      input: input ? cs(input) : null,
      placeholder,
      textarea: textarea ? cs(textarea) : null,
      consent: consent ? cs(consent) : null,
      btn: btn ? cs(btn) : null,
    };
  });

  await browser.close();
  console.log(`\n=== ${label} ===\n${JSON.stringify(data, null, 2)}`);
}

await measure("https://vegastudios.io/#contact", "original");
await measure("http://localhost:3000/#contact", "localhost");
