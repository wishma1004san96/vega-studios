import { chromium } from "playwright";

async function measure(pageUrl, label) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(pageUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  const data = await page.evaluate((isLocal) => {
    const header = document.querySelector("header");
    const logo = header?.querySelector("img");
    const links = header?.querySelector("#main-navigation, nav")?.querySelectorAll("a");
    const cta = header?.querySelector(".menu-cta, a[href='#contact']");
    const toggle = header?.querySelector("button[aria-controls], .nav-toggle");
    const h1 = document.querySelector(isLocal ? ".hero-headline" : "h1");
    const heroBtn = document.querySelector(isLocal ? ".hero-button" : "section p.mt-8, section p.inline-flex");
    const scroll = document.querySelector(isLocal ? ".scroll-indicator, a[href='#marquee']" : "a[href='#marquee']");
    const mouse = scroll?.querySelector(".mouse, span.flex");
    const block = document.querySelector(isLocal ? ".hero-block" : "section .max-w-6xl");
    const rect = (el) => el?.getBoundingClientRect();
    const cs = (el) => (el ? getComputedStyle(el) : null);

    return {
      headerH: Math.round(rect(header)?.height),
      logo: { w: Math.round(rect(logo)?.width), h: Math.round(rect(logo)?.height) },
      linkGap: links && links.length > 1 ? Math.round(rect(links[1]).left - rect(links[0]).right) : null,
      cta: cta ? { w: Math.round(rect(cta).width), h: Math.round(rect(cta).height) } : null,
      toggle: toggle ? { w: Math.round(rect(toggle).width), h: Math.round(rect(toggle).height) } : null,
      headerPos: cs(header)?.position,
      h1Top: Math.round(rect(h1)?.top),
      heroBtn: heroBtn ? { w: Math.round(rect(heroBtn).width), h: Math.round(rect(heroBtn).height) } : null,
      mouse: mouse ? { w: Math.round(rect(mouse).width), h: Math.round(rect(mouse).height) } : null,
      scrollBottom: scroll && isLocal
        ? Math.round(rect(document.querySelector(".hero-main")).bottom - rect(scroll).bottom)
        : scroll
          ? Math.round(rect(document.querySelector("h1")?.closest("section")).bottom - rect(scroll).bottom)
          : null,
      blockW: block ? Math.round(rect(block).width) : null,
    };
  }, pageUrl.includes("localhost"));

  await browser.close();
  console.log(`\n=== ${label} ===\n${JSON.stringify(data, null, 2)}`);
}

await measure("https://vegastudios.io", "original");
await measure("http://localhost:3000", "localhost");
