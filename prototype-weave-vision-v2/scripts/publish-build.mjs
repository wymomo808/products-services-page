import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const weaveRoot = path.resolve(scriptDir, "..");
const root = path.resolve(weaveRoot, "..");
const dist = path.resolve(weaveRoot, "dist");
const publicDir = path.resolve(weaveRoot, "public");
const htmlSrc = path.join(dist, "index.html");
const htmlDest = path.join(root, "prototype-capability-control-center-v2.html");
const assetsSrc = path.join(dist, "assets");
const assetsDest = path.join(root, "assets", "weave-vision-v2-app");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
      continue;
    }
    fs.copyFileSync(from, to);
  }
}

if (!fs.existsSync(htmlSrc)) {
  console.error("Build output missing:", htmlSrc);
  process.exit(1);
}

fs.mkdirSync(assetsDest, { recursive: true });
for (const file of fs.readdirSync(assetsSrc)) {
  fs.copyFileSync(path.join(assetsSrc, file), path.join(assetsDest, file));
}

copyDir(path.join(publicDir, "fonts"), path.join(root, "assets", "fonts"));
copyDir(path.join(publicDir, "fonts"), path.join(root, "fonts"));
copyDir(path.join(publicDir, "logos"), path.join(root, "logos"));

let html = fs.readFileSync(htmlSrc, "utf8");
html = html.replace(/\.\/assets\//g, "./assets/weave-vision-v2-app/");
fs.writeFileSync(htmlDest, html);
fs.rmSync(dist, { recursive: true, force: true });

console.log("Published", path.relative(root, htmlDest));
