export const REPO = "https://github.com/silentsilo/desktop";

export const RELEASES = `${REPO}/releases`;

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
 * the filename still carries the version, so update both with each tag.
 * Both are unused while `RELEASED` is false.
 */
export const LATEST_TAG = "v1.0.0";

/** One string per release, everything else built from it. */
export const LATEST_INSTALLER_NAME = "SilentSilo_1.0.0_x64-setup.exe";
export const LATEST_INSTALLER = `${REPO}/releases/latest/download/${LATEST_INSTALLER_NAME}`;

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
  "b5f59127ab5ddb918e512f1ce2a43ba87fe5175048e85b6dfe680bb4f4ff5f55";
export const VIRUSTOTAL_REPORT = `https://www.virustotal.com/gui/file/${INSTALLER_SHA256}`;
export const VIRUSTOTAL_DETECTIONS = 0;
export const VIRUSTOTAL_ENGINES = 71;
export const VIRUSTOTAL_SCANNED = "22 August 2026";

/** The update endpoint is public too, so claims about it can be read. */
export const RELEASES_REPO = "https://github.com/silentsilo/releases";

const DOCS = `${REPO}/blob/main`;
export const DOC_FORMATS = `${DOCS}/FORMATS.md`;
export const DOC_CRYPTO = `${DOCS}/docs/CRYPTO.md`;
export const DOC_STORAGE = `${DOCS}/docs/STORAGE.md`;
export const DOC_BACKLOG = `${DOCS}/BACKLOG.md`;
