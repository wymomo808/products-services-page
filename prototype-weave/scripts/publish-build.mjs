import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const weaveRoot = path.resolve(scriptDir, "..");
const root = path.resolve(weaveRoot, "..");
const dist = path.resolve(weaveRoot, "dist");
const htmlSrc = path.join(dist, "index.html");
const htmlDest = path.join(root, "prototype-all-products-solutions.html");
const assetsSrc = path.join(dist, "assets");
const assetsDest = path.join(root, "assets", "weave-app");

if (!fs.existsSync(htmlSrc)) {
  console.error("Build output missing:", htmlSrc);
  process.exit(1);
}

fs.mkdirSync(assetsDest, { recursive: true });
for (const file of fs.readdirSync(assetsSrc)) {
  fs.copyFileSync(path.join(assetsSrc, file), path.join(assetsDest, file));
}

let html = fs.readFileSync(htmlSrc, "utf8");
html = html.replace(/\.\/assets\//g, "./assets/weave-app/");
fs.writeFileSync(htmlDest, html);
fs.rmSync(dist, { recursive: true, force: true });

console.log("Published", path.relative(root, htmlDest));
