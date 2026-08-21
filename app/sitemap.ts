import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const PAGES = [
  "",
  "security",
  "tutorials",
  "tutorials/backup-s3",
  "tutorials/backup-folder",
  "tutorials/backup-webdav",
  "tutorials/backup-sftp",
  "tutorials/copies-nothing-can-erase",
  "tutorials/organisation-silos",
  "faq",
  "principles",
  "privacy",
  "who",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((path) => ({
    url: `https://silentsilo.com/${path && `${path}/`}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
