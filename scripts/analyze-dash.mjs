import { chromium } from "playwright";

async function dashPattern(url, label) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.locator("#process").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  const pattern = await page.evaluate(() => {
    const section = document.getElementById("process");
    const desktop = [...section.querySelectorAll("div")].find(
      (el) => el.className.includes("lg:block") && el.className.includes("hidden"),
    );
    const line = desktop?.querySelector('[class*="border-t-2"][class*="border-dashed"]');
    const r = line.getBoundingClientRect();
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(r.width);
    canvas.height = 20;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      // can't draw page to canvas from evaluate easily
    );
    return null;
  });

  const box = await page.evaluate(() => {
    const section = document.getElementById("process");
    const desktop = [...section.querySelectorAll("div")].find(
      (el) => el.className.includes("lg:block") && el.className.includes("hidden"),
    );
    const line = desktop?.querySelector('[class*="border-t-2"][class*="border-dashed"]');
    const r = line.getBoundingClientRect();
    return { x: r.x, y: r.y - 8, width: r.width, height: 20 };
  });

  const buf = await page.screenshot({ clip: box });
  await browser.close();

  // sample center row of pixels
  const { PNG } = await import("pngjs").then((m) => m).catch(() => ({ PNG: null }));
  if (!PNG) {
    return { label, note: "pngjs unavailable" };
  }
  const png = PNG.sync.read(buf);
  const y = 10;
  const runs = [];
  let current = null;
  let len = 0;
  for (let x = 0; x < png.width; x++) {
    const i = (png.width * y + x) << 2;
    const bright = png.data[i] + png.data[i + 1] + png.data[i + 2];
    const on = bright > 100;
    if (current === null) {
      current = on;
      len = 1;
    } else if (on === current) {
      len++;
    } else {
      runs.push({ on: current, len });
      current = on;
      len = 1;
    }
  }
  runs.push({ on: current, len });
  const dashes = [];
  for (let i = 0; i < runs.length; i++) {
    if (runs[i].on) dashes.push({ dash: runs[i].len, gap: runs[i + 1]?.on === false ? runs[i + 1].len : 0 });
  }
  return { label, dashes: dashes.slice(0, 8) };
}

for (const [url, label] of [
  ["https://vegastudios.io/#process", "original"],
  ["http://localhost:3000/#process", "localhost"],
]) {
  try {
    console.log(JSON.stringify(await dashPattern(url, label), null, 2));
  } catch (e) {
    console.log(label, e.message);
  }
}
