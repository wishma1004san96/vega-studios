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
    const sub = section.querySelector("p");
    const diagram = [...section.querySelectorAll("div")].find(
      (el) => el.className.includes("lg:block") && el.className.includes("hidden"),
    );
    const firstIcon = diagram?.querySelector("span.flex.h-12");
    const subR = sub.getBoundingClientRect();
    const iconR = firstIcon?.getBoundingClientRect();
    const stepTitle = diagram?.querySelector("p.text-sm");
    return {
      gapSubtitleToDiagram: diagram ? Math.round(diagram.getBoundingClientRect().top - subR.bottom) : null,
      gapSubtitleToFirstIcon: iconR ? Math.round(iconR.top - subR.bottom) : null,
      stepTitleFont: stepTitle ? getComputedStyle(stepTitle).fontSize : null,
      stepTitleTracking: stepTitle ? getComputedStyle(stepTitle).letterSpacing : null,
      stepDescFont: diagram?.querySelector("p.text-xs")
        ? getComputedStyle(diagram.querySelector("p.text-xs")).fontSize
        : null,
      h2LetterSpacing: getComputedStyle(section.querySelector("h2")).letterSpacing,
    };
  });

  await browser.close();
  console.log(label, data);
}

await measure("https://vegastudios.io/#process", "original");
await measure("http://localhost:3000/#process", "localhost");
