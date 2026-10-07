export const REPO = "https://github.com/silentsilo/desktop";

export const RELEASES = `${REPO}/releases`;

/** The newest release's page, with its notes and every file. */
export const LATEST_RELEASE = `${RELEASES}/latest`;

/**
 * Whether a build has actually been published.
 *
 * The site offered a download for as long as this was assumed rather than
 * stated: the button pointed at a file GitHub answers with 404, and the
 * pages around it named a version in the past tense. One flag, so the day
 * the first tag is pushed there is a single thing to change and nothing
 * left behind still claiming otherwise.
 *
 * Set it to true, and set the two below, in the same commit as the tag.
 */
export const RELEASED = true;

/**
 * The `latest` path resolves to the newest stable release on its own, but
 * the file names carry the version: one string per release, every name
 * built from it.
 */
export const LATEST_VERSION = "1.4.0";
export const LATEST_TAG = `v${LATEST_VERSION}`;

const LATEST_DOWNLOAD = `${REPO}/releases/latest/download`;

export const LATEST_INSTALLER_NAME = `SilentSilo_${LATEST_VERSION}_x64-setup.exe`;
export const LATEST_INSTALLER = `${LATEST_DOWNLOAD}/${LATEST_INSTALLER_NAME}`;

/** The two Linux packages, each with its minisign signature beside it. */
export const LINUX_PACKAGES = [
  { kind: ".deb", file: `SilentSilo_${LATEST_VERSION}_amd64.deb`, fits: "Debian, Ubuntu, Mint" },
  { kind: "AppImage", file: `SilentSilo_${LATEST_VERSION}_amd64.AppImage`, fits: "Fedora, Arch and the rest" },
].map((p) => ({ ...p, url: `${LATEST_DOWNLOAD}/${p.file}` }));

/** The extraction tool, one binary per system, attached to every release.
 *  The names carry no version, so these follow `latest` on their own. */
export const EXTRACTORS = [
  { os: "Windows", arch: "x86-64", file: "silentsilo-extract-windows-x86_64.exe" },
  { os: "Linux", arch: "x86-64", file: "silentsilo-extract-linux-x86_64" },
  { os: "macOS", arch: "Apple silicon", file: "silentsilo-extract-macos-aarch64" },
].map((e) => ({ ...e, url: `${LATEST_DOWNLOAD}/${e.file}` }));

/** The minisign signature published beside the installer, over the bytes as
 *  they ship. The same key the app checks an update against, so a download can
 *  be verified without trusting GitHub. */
export const LATEST_INSTALLER_SIG = `${LATEST_INSTALLER}.sig`;

/**
 * The installer's SHA-256, and what VirusTotal said about it when it was read.
 *
 * The result is dated on purpose. Engines add heuristics and drop them again
 * without the file changing at all: this very installer was flagged once by
 * one engine and is flagged by none now. An undated "0 detections" is a claim
 * that can quietly stop being true while still sitting on the page, and the
 * report it links to would be the thing that contradicts it.
 *
 * The hash is the part that never goes stale, and it is what ties the report
 * to the file somebody actually downloaded. Update all of these together with
 * each release; the report URL is built from the hash.
 */
export const INSTALLER_SHA256 =
  "e0771bf5b183a8ff008bb76f4203e13195cf2aefe94c91bdb8823538b51185ec";
export const VIRUSTOTAL_REPORT = `https://www.virustotal.com/gui/file/${INSTALLER_SHA256}`;
export const VIRUSTOTAL_DETECTIONS: number = 0;
export const VIRUSTOTAL_ENGINES = 71;
export const VIRUSTOTAL_SCANNED = "7 October 2026";

/**
 * The Android app, on Google Play. The store delivers its updates, so there
 * is no version or file to keep in step here.
 */
export const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.silentsilo.mobile";
export const MOBILE_REPO = "https://github.com/silentsilo/mobile";

/** The extension's store pages. Brave installs from the Chrome Web Store. */
export const EXTENSION_STORES = [
  {
    id: "chrome",
    name: "Chrome",
    href: "https://chromewebstore.google.com/detail/silentsilo/aclndafepjjiljjfdlddckiledfjbbbn",
  },
  {
    id: "firefox",
    name: "Firefox",
    href: "https://addons.mozilla.org/firefox/addon/silentsilo/",
  },
  {
    id: "edge",
    name: "Edge",
    href: "https://microsoftedge.microsoft.com/addons/detail/hdooeejnpbnlcecjafbaffbgjlafkgpk",
  },
] as const;

/** The update endpoint is public too, so claims about it can be read. */
export const RELEASES_REPO = "https://github.com/silentsilo/releases";

/**
 * The engine: cryptography, persisted formats, sync and the extraction tool.
 * Split out of the app repository so the part an auditor cares about can be
 * read without the interface around it, and so a mobile client can use the
 * same code rather than a second implementation of it.
 */
export const CORE_REPO = "https://github.com/silentsilo/core";

const DOCS = `${REPO}/blob/main`;
const CORE_DOCS = `${CORE_REPO}/blob/main`;
export const DOC_FORMATS = `${CORE_DOCS}/FORMATS.md`;
export const DOC_CRYPTO = `${CORE_DOCS}/docs/CRYPTO.md`;
export const DOC_STORAGE = `${DOCS}/docs/STORAGE.md`;
export const DOC_BACKLOG = `${DOCS}/BACKLOG.md`;
