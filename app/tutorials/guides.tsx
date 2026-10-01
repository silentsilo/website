import {
  Browser,
  Cloud,
  Database,
  DeviceMobile,
  DownloadSimple,
  HardDrive,
  HardDrives,
  LockKey,
  TerminalWindow,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";

/** Every tutorial, once. The index, the list at the end of each guide and
 *  the storage names on the home page all read from here, so a new guide
 *  is linked everywhere by adding it in one place. */
export type Guide = {
  href: string;
  title: string;
  /** The name the home page and the other guides use for it. */
  short: string;
  what: string;
  meta: string[];
  icon: React.ReactNode;
};

/** Storage most people already have: sign in and it is done. */
export const ACCOUNTS: Guide[] = [
  {
    href: "/tutorials/backup-onedrive/",
    title: "OneDrive",
    short: "OneDrive",
    what: "A personal Microsoft account. Sign in from the app; it writes to its own folder.",
    meta: ["An account you have", "5 minutes"],
    icon: <Cloud weight="duotone" />,
  },
  {
    href: "/tutorials/backup-dropbox/",
    title: "Dropbox",
    short: "Dropbox",
    what: "Any Dropbox account. The app gets its own folder and nothing else.",
    meta: ["An account you have", "5 minutes"],
    icon: <Cloud weight="duotone" />,
  },
  {
    href: "/tutorials/backup-google-drive/",
    title: "Google Drive",
    short: "Google Drive",
    what: "Any Google account. The app sees only the files it writes itself.",
    meta: ["An account you have", "5 minutes"],
    icon: <Cloud weight="duotone" />,
  },
  {
    href: "/tutorials/backup-kdrive/",
    title: "kDrive",
    short: "kDrive",
    what: "Infomaniak's storage, run from Switzerland, over WebDAV with an app password.",
    meta: ["An account you have", "10 minutes"],
    icon: <Cloud weight="duotone" />,
  },
];

/** One card per way of backing up. The order is the order most people should
 *  consider them in: the free one first, the cheap one that scales second. */
export const BACKUP: Guide[] = [
  {
    href: "/tutorials/backup-folder/",
    title: "A folder, drive or network share",
    short: "A drive or NAS",
    what:
      "An external disk, a NAS share, or a folder your cloud client already syncs. Nothing to sign up for.",
    meta: ["No account", "5 minutes", "Windows app"],
    icon: <HardDrive weight="duotone" />,
  },
  {
    href: "/tutorials/backup-s3/",
    title: "An S3 bucket",
    short: "S3 bucket",
    what:
      "Backblaze B2, Cloudflare R2, Wasabi, Amazon S3 or MinIO. Cheap, and it grows with you.",
    meta: ["Account and card", "15 minutes"],
    icon: <Database weight="duotone" />,
  },
  {
    href: "/tutorials/backup-webdav/",
    title: "WebDAV",
    short: "WebDAV",
    what:
      "Nextcloud, ownCloud, Synology or Fastmail. Use the storage you already pay for.",
    meta: ["An account you have", "10 minutes"],
    icon: <HardDrives weight="duotone" />,
  },
  {
    href: "/tutorials/backup-sftp/",
    title: "SFTP",
    short: "SFTP",
    what:
      "A VPS, a NAS with SSH, rsync.net or a Hetzner Storage Box. Keys rather than passwords.",
    meta: ["A server of yours", "20 minutes"],
    icon: <TerminalWindow weight="duotone" />,
  },
];

export const FURTHER: Guide[] = [
  {
    href: "/tutorials/phone/",
    title: "On your phone",
    short: "On your phone",
    what:
      "Open the silo on Android, back up photos, videos and contacts into it, and fill logins in other apps.",
    meta: ["Android 12 or later"],
    icon: <DeviceMobile weight="duotone" />,
  },
  {
    href: "/tutorials/browser-extension/",
    title: "Fill logins in your browser",
    short: "In your browser",
    what:
      "The extension for Chrome, Edge and Brave, with Firefox soon. Every fill is confirmed in the app.",
    meta: ["Windows app"],
    icon: <Browser weight="duotone" />,
  },
  {
    href: "/tutorials/get-files-out/",
    title: "Get your files out without the app",
    short: "Files out without the app",
    what:
      "A backup and the recovery code are enough. The extraction tool writes ordinary files back out.",
    meta: ["Command line"],
    icon: <DownloadSimple weight="duotone" />,
  },
  {
    href: "/tutorials/copies-nothing-can-erase/",
    title: "A copy nothing can erase",
    short: "A copy nothing can erase",
    what:
      "Ransomware that reaches your machine reaches your backup credentials with it. This is the copy that survives that.",
    meta: ["After the first backup"],
    icon: <LockKey weight="duotone" />,
  },
  {
    href: "/tutorials/organisation-silos/",
    title: "Silos for a team or a company",
    short: "For a team or a company",
    what:
      "Silos an employee cannot lock the company out of: the organisation key, onboarding, and the day somebody leaves.",
    meta: ["For companies"],
    icon: <UsersThree weight="duotone" />,
  },
];

/** Every place a silo can be backed up to, in the order the app lists them. */
export const STORAGE_GUIDES: Guide[] = [...ACCOUNTS, ...BACKUP];
