import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, basename, extname } from "node:path";
/* Ships with Next, so there is nothing extra to install and nothing to
   fetch: this runs offline like the rest of the build. */
import sharp from "sharp";

/*
 * Turns the app screenshots into the two WebP sizes the page asks for.
 *
 * The originals are PNGs captured by scripts/screenshots.mjs in the desktop
 * repository, at 1200x800 and twice the pixel density. They are not kept
 * here: seven of them came to 3.7 MB, and a phone was downloading a 2400px
 * PNG to show it 327px wide.
 *
 *   node scripts/shots.mjs <folder with the new PNGs>
 *
 * Writes <name>-1200.webp and <name>-2400.webp into public/shots, which is
 * what Showcase.tsx names in its srcset. Delete the PNGs afterwards.
 */

const src = process.argv[2] || "public/shots";
const out = "public/shots";
const SIZES = [1200, 2400];

const files = (await readdir(src)).filter((f) => extname(f) === ".png");
if (files.length === 0) {
  console.error(`no .png in ${src}`);
  process.exit(1);
}

for (const file of files) {
  const name = basename(file, ".png");
  const input = await readFile(join(src, file));
  for (const width of SIZES) {
    const target = join(out, `${name}-${width}.webp`);
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      /* Screen UI, not photographs: flat areas and text edges. Quality 76
         holds the text crisp and still lands under a tenth of the PNG. */
      .webp({ quality: 76, effort: 6 })
      .toFile(target);
    const { size } = await stat(target);
    console.log(`${target} ${(size / 1024).toFixed(0)} KB`);
  }
}
