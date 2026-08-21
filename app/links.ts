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
export const LATEST_INSTALLER = `${REPO}/releases/latest/download/SilentSilo_1.0.0_x64-setup.exe`;

/** The update endpoint is public too, so claims about it can be read. */
export const RELEASES_REPO = "https://github.com/silentsilo/releases";

const DOCS = `${REPO}/blob/main`;
export const DOC_FORMATS = `${DOCS}/FORMATS.md`;
export const DOC_CRYPTO = `${DOCS}/docs/CRYPTO.md`;
export const DOC_STORAGE = `${DOCS}/docs/STORAGE.md`;
export const DOC_BACKLOG = `${DOCS}/BACKLOG.md`;
