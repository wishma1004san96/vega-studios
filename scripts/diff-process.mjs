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
    const rect = (el) => {
      const r = el.getBoundingClientRect();
      return { cx: Math.round(r.x + r.width / 2), cy: Math.round(r.y + r.height / 2) };
    };
    const icons = [...(diagram?.querySelectorAll("span.flex.h-12") || [])].map((el, i) => ({
      i,
      ...rect(el),
    }));
    const lines = [...(diagram?.querySelectorAll('[class*="border-dashed"]') || [])]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 5 || r.height > 5;
      })
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height), cx: Math.round(r.x + r.width / 2), cy: Math.round(r.y + r.height / 2) };
      });
    const h2span = section.querySelector("h2 span");
    return {
      icons,
      lines,
      processSpanColor: h2span ? getComputedStyle(h2span).color : null,
      processSpanBg: h2span ? getComputedStyle(h2span).backgroundImage : null,
    };
  });

  await browser.close();
  return { label, ...data };
}

const results = [];
for (const [url, label] of [
  ["https://vegastudios.io/#process", "original"],
  ["http://localhost:3000/#process", "localhost"],
]) {
  results.push(await measure(url, label));
}

console.log(JSON.stringify(results, null, 2));

// diff
const [o, l] = results;
console.log("\nICON DELTAS (localhost - original):");
for (let i = 0; i < Math.max(o.icons.length, l.icons.length); i++) {
  const a = o.icons[i];
  const b = l.icons[i];
  if (!a || !b) {
    console.log(i, "missing", a, b);
    continue;
  }
  console.log(i, { dx: b.cx - a.cx, dy: b.cy - a.cy });
}
console.log("\nLINE DELTAS:");
for (let i = 0; i < Math.max(o.lines.length, l.lines.length); i++) {
  const a = o.lines[i];
  const b = l.lines[i];
  if (!a || !b) {
    console.log(i, "missing", a, b);
    continue;
  }
  console.log(i, { dw: b.w - a.w, dh: b.h - a.h, dx: b.cx - a.cx, dy: b.cy - a.cy });
}
