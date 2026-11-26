// The desktop app reads public/latest.json, from this site and from this
// repository on GitHub when the site does not answer, to say a new version
// exists. It must name the version the download page offers, or the app
// announces one nobody can download, or none at all. Runs before every build.
import { readFileSync } from "node:fs";

const links = readFileSync(new URL("../app/links.ts", import.meta.url), "utf8");
const offered = /export const LATEST_VERSION = "([^"]+)";/.exec(links)?.[1];
const latest = JSON.parse(readFileSync(new URL("../public/latest.json", import.meta.url), "utf8"));

if (!offered) throw new Error("app/links.ts: LATEST_VERSION not found");
if (latest.version !== offered) {
  throw new Error(
    `public/latest.json names ${latest.version}, app/links.ts offers ${offered}: change both together`,
  );
}
if (/-/.test(offered)) throw new Error(`a prerelease (${offered}) never goes in latest.json`);
console.log(`latest.json: ${offered}`);
