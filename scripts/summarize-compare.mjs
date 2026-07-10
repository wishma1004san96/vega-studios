import { readFileSync } from "node:fs";

const data = JSON.parse(readFileSync("scripts/compare-output2.json", "utf8"));
const [orig, local] = data;

function pickIcons(d) {
  return (d.data.iconsByTitle || [])
    .map((s) => s.icon)
    .filter(Boolean)
    .concat(
      (d.data.steps || [])
        .map((s) => ({ title: s.title, ...s.icon }))
        .filter((s) => s.cx),
    );
}

function summarize(label, d) {
  const icons = (d.data.steps || []).map((s) => ({
    title: s.title,
    cx: s.icon?.cx,
    cy: s.icon?.cy,
  }));
  const lines = (d.data.dashLines || d.data.lines || [])
    .filter((l) => l.box?.w > 5 || l.box?.h > 5)
    .map((l) => ({
      w: l.box.w,
      h: l.box.h,
      cx: l.box.cx,
      cy: l.box.cy,
    }));
  return { label, layout: d.data.graphStyle?.display || d.data.classNames?.includes("process-graph") ? "grid" : "flex", icons, lines, heading: d.data.heading, subtitle: d.data.subtitle };
}

const o = summarize("original", orig);
const l = summarize("localhost", local);

console.log("ORIGINAL ICONS:", JSON.stringify(o.icons, null, 2));
console.log("LOCALHOST ICONS:", JSON.stringify(l.icons, null, 2));
console.log("ORIGINAL LINES:", JSON.stringify(o.lines, null, 2));
console.log("LOCALHOST LINES:", JSON.stringify(l.lines, null, 2));
console.log("HEADING DIFF:", {
  origSpan: orig.data.heading?.processGradient,
  localSpan: local.data.heading?.processGradient,
  origColor: orig.data.heading?.color,
});
console.log("SUBTITLE:", { o: o.subtitle, l: l.subtitle });
