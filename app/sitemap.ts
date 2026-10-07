import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const PAGES = [
  "",
  "download",
  "security",
  "tutorials",
  "tutorials/backup-onedrive",
  "tutorials/backup-dropbox",
  "tutorials/backup-google-drive",
  "tutorials/backup-kdrive",
  "tutorials/backup-s3",
  "tutorials/backup-folder",
  "tutorials/backup-webdav",
  "tutorials/backup-sftp",
  "tutorials/copies-nothing-can-erase",
  "tutorials/organisation-silos",
  "tutorials/phone",
  "tutorials/browser-extension",
  "tutorials/get-files-out",
  "tutorials/unlock-without-a-key",
  "tutorials/ssh-agent",
  "tutorials/from-keepass",
  "tutorials/from-bitwarden",
  "tutorials/from-1password",
  "tutorials/from-lastpass",
  "tutorials/from-proton-pass",
  "tutorials/from-dashlane",
  "tutorials/from-nordpass",
  "tutorials/from-roboform",
  "tutorials/from-browser",
  "europe",
  "faq",
  "principles",
  "privacy",
  "who",
  "legal",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((path) => ({
    url: `https://silentsilo.com/${path && `${path}/`}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
