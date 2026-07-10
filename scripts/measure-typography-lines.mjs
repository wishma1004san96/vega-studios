import { chromium } from "playwright";

async function measure(url, label) {
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
    const diagram = desktop?.querySelector(".w-max");
    const cs = (el, props) =>
      Object.fromEntries(props.map((p) => [p, getComputedStyle(el)[p]]));

    const h2 = section.querySelector("h2");
    const h2span = h2?.querySelector("span");
    const sub = section.querySelector("p");
    const stepTitle = diagram?.querySelector("p.text-sm");
    const stepDesc = diagram?.querySelector("p.text-xs");
    const hLine = diagram?.querySelector('[class*="border-t-2"][class*="border-dashed"]');
    const vLine = diagram?.querySelector('[class*="border-l-2"][class*="border-dashed"]');

  const dashMetrics = (el) => {
      if (!el) return null;
      const s = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const isH = rect.width >= rect.height;
      const border = isH ? s.borderTop : s.borderLeft;
      return {
        borderWidth: isH ? s.borderTopWidth : s.borderLeftWidth,
        borderStyle: isH ? s.borderTopStyle : s.borderLeftStyle,
        borderColor: isH ? s.borderTopColor : s.borderLeftColor,
        borderImage: isH ? s.borderTop : s.borderLeft,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    };

    return {
      h2: h2 ? cs(h2, ["fontFamily", "fontWeight", "fontSize", "lineHeight", "letterSpacing", "color"]) : null,
      h2span: h2span
        ? cs(h2span, ["fontFamily", "fontWeight", "fontSize", "lineHeight", "letterSpacing", "color"])
        : null,
      subtitle: sub
        ? cs(sub, ["fontFamily", "fontWeight", "fontSize", "lineHeight", "letterSpacing", "color"])
        : null,
      stepTitle: stepTitle
        ? cs(stepTitle, [
            "fontFamily",
            "fontWeight",
            "fontSize",
            "lineHeight",
            "letterSpacing",
            "color",
          ])
        : null,
      stepDesc: stepDesc
        ? cs(stepDesc, ["fontFamily", "fontWeight", "fontSize", "lineHeight", "letterSpacing", "color"])
        : null,
      hLine: dashMetrics(hLine),
      vLine: dashMetrics(vLine),
    };
  });

  await browser.close();
  return { label, ...data };
}

for (const [url, label] of [
  ["https://vegastudios.io/#process", "original"],
  ["http://localhost:3000/#process", "localhost"],
]) {
  try {
    const r = await measure(url, label);
    console.log(`\n=== ${label} ===\n${JSON.stringify(r, null, 2)}`);
  } catch (e) {
    console.log(`\n=== ${label} ERROR ===\n`, e.message);
  }
}
