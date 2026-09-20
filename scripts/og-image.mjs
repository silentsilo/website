import { spawn } from "node:child_process";
import { mkdtempSync, existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

/*
 * Draws public/og.png, the card that shows up when someone pastes a link.
 *
 * Rendered in headless Chrome rather than by Satori, because the card has to
 * carry the site's own face: Plus Jakarta Sans, which ships as WOFF2 and
 * which Satori cannot read, and the real logo rather than a square
 * approximation of it. Everything it needs is already in the repository, so
 * it still runs offline.
 *
 * This is a script rather than app/opengraph-image.tsx on purpose. That
 * convention names the generated file `opengraph-image`, with no extension,
 * because a served app sets the content type in a header. A static export
 * has no header to set, so crawlers receive application/octet-stream and
 * skip the image. A real .png in public/ describes itself on any host.
 *
 * Run `npm run og` after changing anything here, and commit the result. Set
 * CHROME_PATH if your browser is somewhere unusual.
 */

const CHROMES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const browser = CHROMES.find((p) => existsSync(p));
if (!browser) {
  console.error("no Chrome found; set CHROME_PATH");
  process.exit(1);
}

const FONT =
  "node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2";

const font = (await readFile(FONT)).toString("base64");
const icon = (await readFile("public/icon.svg")).toString("base64");

/* The wording the page itself opens with. A card that says something the
   page does not is the one piece of copy nobody rereads. */
const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @font-face {
    font-family: "Jakarta";
    src: url(data:font/woff2;base64,${font}) format("woff2");
    font-weight: 200 800;
  }
  * { box-sizing: border-box; margin: 0; }
  body {
    width: 1200px; height: 630px;
    display: flex; flex-direction: column; justify-content: center;
    padding: 0 90px;
    font-family: "Jakarta";
    color: #f8fafc;
    background:
      radial-gradient(ellipse 70% 60% at 82% 8%, rgba(139, 92, 246, 0.22), transparent 62%),
      linear-gradient(150deg, #0a0e1a 0%, #05070e 100%);
  }
  .brand { display: flex; align-items: center; gap: 20px; }
  .brand img { width: 56px; height: 56px; border-radius: 14px; }
  .brand span { font-size: 36px; font-weight: 800; letter-spacing: -0.03em; }
  h1 {
    margin-top: 44px;
    font-size: 82px; line-height: 1.06; font-weight: 800;
    letter-spacing: -0.042em;
  }
  h1 em { font-style: normal; color: #a78bfa; }
  p { margin-top: 32px; font-size: 30px; line-height: 1.45; color: #9aa5c4; max-width: 880px; }
  .line { margin-top: 44px; font-size: 25px; font-weight: 700; color: #7e88a8; letter-spacing: 0.01em; }
</style></head><body>
  <div class="brand">
    <img src="data:image/svg+xml;base64,${icon}" alt="">
    <span>SilentSilo</span>
  </div>
  <h1>An encrypted vault.<br><em>No account. No server.</em></h1>
  <p>Files and passwords in encrypted folders on your own machine, unlocked with Windows Hello or a security key.</p>
  <div class="line">Windows 10 or 11 &middot; free &middot; open source</div>
</body></html>`;

const dir = mkdtempSync(join(tmpdir(), "og-"));
const page = join(dir, "og.html");
await writeFile(page, html);

const port = 9500 + Math.floor(Math.random() * 400);
const chrome = spawn(browser, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${join(dir, "profile")}`,
  "--no-first-run",
  "about:blank",
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 60 && !target; i++) {
  await sleep(200);
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    target = list.find((t) => t.type === "page");
  } catch {}
}
if (!target) {
  chrome.kill();
  console.error("Chrome did not come up");
  process.exit(1);
}

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
};
const send = (method, params = {}) =>
  new Promise((r) => {
    const i = ++id;
    pending.set(i, r);
    ws.send(JSON.stringify({ id: i, method, params }));
  });

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1200,
  height: 630,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.navigate", { url: `file:///${page.replace(/\\/g, "/")}` });
/* The font is inline, so there is nothing to wait on but layout. */
await sleep(1200);
const shot = await send("Page.captureScreenshot", { format: "png" });
ws.close();
chrome.kill();

/* A palette halves the file, but only with the dithering off: on a dark
   gradient it scatters a visible patch of noise into the corner. */
const png = await sharp(Buffer.from(shot.result.data, "base64"))
  .png({ palette: true, dither: 0, compressionLevel: 9 })
  .toBuffer();
await writeFile("public/og.png", png);
console.log(`wrote public/og.png ${(png.length / 1024).toFixed(0)} KB`);
process.exit(0);
