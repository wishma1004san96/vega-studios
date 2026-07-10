import { chromium } from "playwright";

async function measure(page, label) {
  await page.goto(label === "original" ? "https://vegastudios.io/#process" : "http://localhost:3000/#process", {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.waitForTimeout(1500);
  await page.locator("#process").scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const section =
      document.getElementById("process") ||
      [...document.querySelectorAll("section")].find((s) => s.textContent?.includes("Our Process"));
    if (!section) return { error: "section not found" };

    const graph =
      section.querySelector(".process-graph") ||
      section.querySelector('[class*="process"]') ||
      section;

    const rect = (el) => {
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
        cx: Math.round(r.x + r.width / 2),
        cy: Math.round(r.y + r.height / 2),
      };
    };
    const cs = (el, props) =>
      Object.fromEntries(props.map((p) => [p, getComputedStyle(el)[p]]));

    const desktop =
      section.querySelector(".hidden.lg\\:block") ||
      [...section.querySelectorAll("div")].find((d) => {
        const s = getComputedStyle(d);
        return s.display !== "none" && d.querySelectorAll("h3").length >= 7;
      });

    const measureIcons = () => {
      const scope = desktop || section;
      const titles = ["Research & Planning", "Content", "Creatives", "Optimization", "Maintenance", "Launch", "Trials"];
      return titles.map((title) => {
        const h3 = [...scope.querySelectorAll("h3, p")].find(
          (el) => el.textContent?.trim() === title,
        );
        const step = h3?.closest("div");
        const icon =
          step?.querySelector(".process-icon-wrap") ||
          step?.querySelector('[class*="rounded-full"]') ||
          [...(step?.querySelectorAll("span, div") || [])].find((n) => {
            const s = getComputedStyle(n);
            return Number.parseFloat(s.borderRadius) > 20 && n.clientWidth > 30;
          });
        return {
          title,
          step: step ? rect(step) : null,
          icon: icon ? rect(icon) : null,
        };
      });
    };

    const measureDashLines = () =>
      [...section.querySelectorAll('[class*="border-dashed"], .process-line, svg line')]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 1 || r.height > 1;
        })
        .map((el) => ({
          class: el.className?.toString?.() || el.tagName,
          box: rect(el),
          style: cs(el, [
            "borderTopWidth",
            "borderLeftWidth",
            "borderColor",
            "borderStyle",
            "stroke",
            "strokeWidth",
            "strokeDasharray",
          ]),
        }));

    const stepEls = graph.querySelectorAll(".process-step").length
      ? [...graph.querySelectorAll(".process-step")]
      : [...section.querySelectorAll("h3")].map((h3) => h3.closest("article, div") || h3.parentElement);

    const iconsByTitle = measureIcons();
    const dashLines = measureDashLines();

    const steps = stepEls
      .filter((el) => el?.querySelector("h3"))
      .map((el) => {
        const icon =
          el.querySelector(".process-icon-wrap") ||
          el.querySelector('[class*="icon"]') ||
          [...el.querySelectorAll("span, div")].find((n) => {
            const s = getComputedStyle(n);
            return s.borderRadius === "9999px" || s.borderRadius.includes("50%");
          });
        const h3 = el.querySelector("h3");
        const p = el.querySelector("p");
        return {
          class: el.className,
          title: h3?.textContent?.trim(),
          step: rect(el),
          icon: icon ? rect(icon) : null,
          titleBox: h3 ? rect(h3) : null,
          titleStyle: h3
            ? cs(h3, ["fontSize", "fontFamily", "fontWeight", "letterSpacing", "lineHeight", "color"])
            : null,
          descStyle: p ? cs(p, ["fontSize", "lineHeight", "color", "maxWidth"]) : null,
        };
      });

    const lineEls = graph.querySelectorAll(".process-line").length
      ? [...graph.querySelectorAll(".process-line")]
      : [...section.querySelectorAll('[class*="line"], [class*="dash"], svg line')];

    const lines = lineEls.map((el) => ({
      class: el.className?.toString?.() || el.tagName,
      box: rect(el),
      style: cs(el, [
        "borderTopWidth",
        "borderLeftWidth",
        "borderColor",
        "borderStyle",
        "stroke",
        "strokeWidth",
        "strokeDasharray",
        "top",
        "left",
        "right",
        "height",
        "width",
      ]),
      x1: el.getAttribute?.("x1"),
      y1: el.getAttribute?.("y1"),
      x2: el.getAttribute?.("x2"),
      y2: el.getAttribute?.("y2"),
    }));

    const h2 = section.querySelector("h2, .process-title");
    const sub = section.querySelector(".process-subtitle, p");

    return {
      section: rect(section),
      graph: rect(graph),
      htmlSnippet: section.innerHTML.slice(0, 1200),
      classNames: [...section.querySelectorAll("*")]
        .map((el) => el.className)
        .filter((c) => typeof c === "string" && /process|line|step|icon/i.test(c))
        .slice(0, 40),
      heading: h2
        ? {
            ...rect(h2),
            ...cs(h2, ["fontSize", "fontFamily", "fontWeight", "letterSpacing", "lineHeight", "color"]),
            processGradient: h2.querySelector("span, em")?.textContent,
          }
        : null,
      subtitle: sub
        ? { ...rect(sub), ...cs(sub, ["fontSize", "lineHeight", "color", "maxWidth"]) }
        : null,
      steps,
      iconsByTitle,
      dashLines,
      lines,
      graphStyle: cs(graph, ["gap", "gridTemplateColumns", "marginTop", "display"]),
    };
  });

  const shot = `scripts/compare-${label}.png`;
  const processSection = page.locator("#process");
  if ((await processSection.count()) > 0) {
    await processSection.screenshot({ path: shot });
  } else {
    await page.screenshot({ path: shot, fullPage: false });
  }

  return { label, shot, data };
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

const results = [];
for (const label of ["original", "localhost"]) {
  try {
    results.push(await measure(page, label));
  } catch (err) {
    results.push({ label, error: String(err) });
  }
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
