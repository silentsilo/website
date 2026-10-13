import { LATEST_INSTALLER, MAC_DMG, PLAY_STORE } from "./links";

/**
 * Every platform the site talks about, in one place. When macOS, iOS or
 * Linux ships, its row changes here and every page that lists platforms
 * follows: the home page cards, the download button, the hero line.
 */
export type Platform = {
  id: "windows" | "android" | "extension" | "macos" | "ios" | "linux";
  name: string;
  available: boolean;
  /** Not out yet, but next: shown as "Coming soon" rather than "Planned". */
  soon?: boolean;
  /** What it needs and how it unlocks, in one line. */
  detail: string;
  action?: { label: string; href: string };
};

export const PLATFORMS: Platform[] = [
  {
    id: "windows",
    name: "Windows",
    available: true,
    detail: "Windows 10 or 11, 64-bit. Unlocks with a security key, or Windows Hello on an up-to-date Windows 11.",
    action: { label: "Download for Windows", href: LATEST_INSTALLER },
  },
  {
    id: "linux",
    name: "Linux",
    available: true,
    detail: "A .deb for Debian and Ubuntu, an AppImage for the others, 64-bit. Unlocks with a security key.",
    action: { label: "Download for Linux", href: "/download/#linux" },
  },
  {
    id: "android",
    name: "Android",
    available: true,
    detail: "Android 12 or later. Unlocks with the phone's fingerprint or a security key over NFC or USB.",
    action: { label: "Get it on Google Play", href: PLAY_STORE },
  },
  {
    id: "extension",
    name: "Browser extension",
    available: true,
    detail: "Chrome, Edge, Brave and Firefox. Fills logins through the desktop app on Windows, Linux or macOS.",
    action: { label: "How it works", href: "/tutorials/browser-extension/" },
  },
  {
    id: "macos",
    name: "macOS",
    available: true,
    detail: "macOS 13 or later, Apple silicon or Intel. Unlocks with Touch ID or a security key.",
    action: { label: "Download for macOS", href: MAC_DMG },
  },
  {
    id: "ios",
    name: "iOS",
    available: false,
    soon: true,
    detail: "iOS 17 or later. Face ID or a security key. Coming soon.",
  },
];

export const AVAILABLE = PLATFORMS.filter((p) => p.available && p.id !== "extension");
export const SOON = PLATFORMS.filter((p) => !p.available && p.soon);
export const PLANNED = PLATFORMS.filter((p) => !p.available && !p.soon);

/** "Windows, Linux, macOS and Android", for sentences. */
export const AVAILABLE_NAMES = AVAILABLE.map((p) => p.name)
  .join(", ")
  .replace(/, ([^,]*)$/, " and $1");
