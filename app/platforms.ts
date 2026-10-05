import { LATEST_INSTALLER, PLAY_STORE } from "./links";

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
    id: "android",
    name: "Android",
    available: true,
    detail: "Android 12 or later. Unlocks with the phone's fingerprint or an NFC security key.",
    action: { label: "Get it on Google Play", href: PLAY_STORE },
  },
  {
    id: "extension",
    name: "Browser extension",
    available: true,
    detail: "Chrome, Edge, Brave and Firefox. Fills logins through the Windows app.",
    action: { label: "How it works", href: "/tutorials/browser-extension/" },
  },
  {
    id: "linux",
    name: "Linux",
    available: false,
    soon: true,
    detail: "A security key. Coming soon.",
  },
  {
    id: "macos",
    name: "macOS",
    available: false,
    soon: true,
    detail: "Touch ID or a security key. Coming soon, after Linux.",
  },
  {
    id: "ios",
    name: "iOS",
    available: false,
    detail: "Face ID or a security key. Planned, no date yet.",
  },
];

export const AVAILABLE = PLATFORMS.filter((p) => p.available && p.id !== "extension");
export const SOON = PLATFORMS.filter((p) => !p.available && p.soon);
export const PLANNED = PLATFORMS.filter((p) => !p.available && !p.soon);

/** "Windows and Android", for sentences. */
export const AVAILABLE_NAMES = AVAILABLE.map((p) => p.name).join(" and ");
