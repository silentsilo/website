import { writeFile } from "node:fs/promises";
import { createElement as h } from "react";
/* `next/og.js`, with the extension: Node resolving this outside the Next
   build does not apply the package's export map shorthand. */
import { ImageResponse } from "next/og.js";

/*
 * Draws public/og.png, the card that shows up when someone pastes a link.
 *
 * This is a script rather than app/opengraph-image.tsx on purpose. That
 * convention names the generated file `opengraph-image`, with no extension,
 * because a served app sets the content type in a header. A static export
 * has no header to set, so crawlers receive application/octet-stream and
 * skip the image. A real .png in public/ describes itself on any host.
 *
 * Run `npm run og` after changing anything here, and commit the result.
 *
 * Typography and the brand colours only: Satori draws a subset of CSS, and
 * a mark rebuilt out of divs would be an approximation of the logo rather
 * than the logo.
 */

const TEXT = "#f8fafc";
const MUTED = "#9aa5c4";
const ACCENT = "#a78bfa";

const chip = (label) =>
  h(
    "div",
    {
      key: label,
      style: {
        fontSize: 23,
        color: MUTED,
        border: "1px solid rgba(139, 92, 246, 0.35)",
        borderRadius: 999,
        padding: "9px 24px",
      },
    },
    label,
  );

const card = h(
  "div",
  {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 90px",
      background: "linear-gradient(150deg, #0a0e1a 0%, #05070e 100%)",
    },
  },
  h(
    "div",
    { style: { display: "flex", alignItems: "center", gap: 18 } },
    h("div", {
      style: { width: 34, height: 34, borderRadius: 9, background: "#10b981" },
    }),
    h(
      "div",
      { style: { fontSize: 34, fontWeight: 700, color: TEXT } },
      "SilentSilo",
    ),
  ),
  h(
    "div",
    {
      style: {
        marginTop: 40,
        fontSize: 82,
        lineHeight: 1.05,
        fontWeight: 800,
        letterSpacing: "-0.04em",
        color: TEXT,
        display: "flex",
        flexDirection: "column",
      },
    },
    h("div", null, "An encrypted vault."),
    h("div", { style: { color: ACCENT } }, "No account. No server."),
  ),
  h(
    "div",
    { style: { marginTop: 34, fontSize: 31, color: MUTED, maxWidth: 900 } },
    "Files and passwords in encrypted folders on your own machine, unlocked with a hardware key.",
  ),
  h(
    "div",
    { style: { display: "flex", gap: 14, marginTop: 46 } },
    ...["AES-256-GCM", "FIDO2 hmac-secret", "AGPL-3.0"].map(chip),
  ),
);

const png = await new ImageResponse(card, {
  width: 1200,
  height: 630,
}).arrayBuffer();

await writeFile("public/og.png", Buffer.from(png));
console.log("wrote public/og.png");
