import type { Metadata } from "next";
import Link from "next/link";
import {
  IconArrowRight,
  IconDisk,
  IconDownload,
  IconLock,
  IconPerson,
  IconPhone,
  IconPointer,
  IconServer,
  IconSync,
  IconTerminal,
} from "../Icons";

export const metadata: Metadata = {
  title: "Tutorials",
  description:
    "Setting up a backup on every option SilentSilo offers, one guide each, plus the phone, the browser extension, and getting your files out without the app.",
};

type Guide = {
  href: string;
  title: string;
  what: string;
  meta: string[];
  icon: React.ReactNode;
};

/** Storage most people already have: sign in and it is done. */
const ACCOUNTS: Guide[] = [
  {
    href: "/tutorials/backup-onedrive/",
    title: "OneDrive",
    what: "A personal Microsoft account. Sign in from the app; it writes to its own folder.",
    meta: ["An account you have", "5 minutes"],
    icon: <IconSync size={20} />,
  },
  {
    href: "/tutorials/backup-dropbox/",
    title: "Dropbox",
    what: "Any Dropbox account. The app gets its own folder and nothing else.",
    meta: ["An account you have", "5 minutes"],
    icon: <IconSync size={20} />,
  },
  {
    href: "/tutorials/backup-google-drive/",
    title: "Google Drive",
    what: "Any Google account. The app sees only the files it writes itself.",
    meta: ["An account you have", "5 minutes"],
    icon: <IconSync size={20} />,
  },
  {
    href: "/tutorials/backup-kdrive/",
    title: "kDrive",
    what: "Infomaniak's storage, run from Switzerland, over WebDAV with an app password.",
    meta: ["An account you have", "10 minutes"],
    icon: <IconServer size={20} />,
  },
];

/** One card per way of backing up. The order is the order most people should
 *  consider them in: the free one first, the cheap one that scales second. */
const BACKUP: Guide[] = [
  {
    href: "/tutorials/backup-folder/",
    title: "A folder, drive or network share",
    what:
      "An external disk, a NAS share, or a folder your cloud client already syncs. Nothing to sign up for.",
    meta: ["No account", "5 minutes", "Windows app"],
    icon: <IconDisk size={20} />,
  },
  {
    href: "/tutorials/backup-s3/",
    title: "An S3 bucket",
    what:
      "Backblaze B2, Cloudflare R2, Wasabi, Amazon S3 or MinIO. Cheap, and it grows with you.",
    meta: ["Account and card", "15 minutes"],
    icon: <IconServer size={20} />,
  },
  {
    href: "/tutorials/backup-webdav/",
    title: "WebDAV",
    what:
      "Nextcloud, ownCloud, Synology or Fastmail. Use the storage you already pay for.",
    meta: ["An account you have", "10 minutes"],
    icon: <IconServer size={20} />,
  },
  {
    href: "/tutorials/backup-sftp/",
    title: "SFTP",
    what:
      "A VPS, a NAS with SSH, rsync.net or a Hetzner Storage Box. Keys rather than passwords.",
    meta: ["A server of yours", "20 minutes"],
    icon: <IconTerminal size={20} />,
  },
];

const FURTHER: Guide[] = [
  {
    href: "/tutorials/phone/",
    title: "On your phone",
    what:
      "Open the silo on Android, back up photos, videos and contacts into it, and fill logins in other apps.",
    meta: ["Android 12 or later"],
    icon: <IconPhone size={20} />,
  },
  {
    href: "/tutorials/browser-extension/",
    title: "Fill logins in your browser",
    what:
      "The extension for Chrome, Edge, Brave and Firefox. Every fill is confirmed in the app.",
    meta: ["Windows app"],
    icon: <IconPointer size={20} />,
  },
  {
    href: "/tutorials/get-files-out/",
    title: "Get your files out without the app",
    what:
      "A backup and the recovery code are enough. The extraction tool writes ordinary files back out.",
    meta: ["Command line"],
    icon: <IconDownload size={20} />,
  },
  {
    href: "/tutorials/copies-nothing-can-erase/",
    title: "A copy nothing can erase",
    what:
      "Ransomware that reaches your machine reaches your backup credentials with it. This is the copy that survives that.",
    meta: ["After the first backup"],
    icon: <IconLock size={20} />,
  },
  {
    href: "/tutorials/organisation-silos/",
    title: "Silos for a team or a company",
    what:
      "Silos an employee cannot lock the company out of: the organisation key, onboarding, and the day somebody leaves.",
    meta: ["For companies"],
    icon: <IconPerson size={20} />,
  },
];

function Card({ g }: { g: Guide }) {
  return (
    <Link className="tut-card" href={g.href}>
      <span className="tut-card-icon" aria-hidden>
        {g.icon}
      </span>
      <span className="tut-card-body">
        <span className="tut-card-title">
          {g.title}
          <IconArrowRight />
        </span>
        <span className="tut-card-what">{g.what}</span>
        <span className="tut-card-meta">
          {g.meta.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </span>
      </span>
    </Link>
  );
}

export default function Tutorials() {
  return (
    <main id="main" className="wrap prose">
      <h1>Tutorials</h1>
      <p className="lead">
        Backing up a silo means pointing it at storage you own. The app side is
        the same wherever you point it. What differs is what the storage asks
        for first, so there is one guide for each kind.
      </p>

      <div className="notice">
        <strong>The part that is the same everywhere:</strong> unlock the silo,
        then open <strong>Settings &gt; Backup</strong>. A second place is
        added on the same page, with <strong>Add another copy</strong>. The
        app writes to the storage before anything is saved. On
        Android it is <strong>Silo &gt; Backup storage</strong>, and the phone takes
        every kind here except a folder.
      </div>

      <h2 id="set-up-a-backup">Set up a backup</h2>
      <p>
        Pick one. You can add more places later, and a second place is what
        the list of copies on the Backup page is for.
      </p>
      <h3 id="an-account-you-already-have">An account you already have</h3>
      <div className="tut-grid">
        {ACCOUNTS.map((g) => (
          <Card key={g.href} g={g} />
        ))}
      </div>
      <h3 id="storage-you-run-or-rent">Storage you run or rent</h3>
      <div className="tut-grid">
        {BACKUP.map((g) => (
          <Card key={g.href} g={g} />
        ))}
      </div>

      <h2 id="not-sure-which">Not sure which</h2>
      <ul className="tut-pick">
        <li>
          <strong>You already have OneDrive, Dropbox or Google Drive.</strong>{" "}
          Start there: <Link href="/tutorials/backup-onedrive/">OneDrive</Link>
          , <Link href="/tutorials/backup-dropbox/">Dropbox</Link> or{" "}
          <Link href="/tutorials/backup-google-drive/">Google Drive</Link>.
          Nothing to rent, and the phone reaches it too.
        </li>
        <li>
          <strong>You want it kept in Europe.</strong>{" "}
          <Link href="/europe/">SilentSilo in the European Union</Link> goes
          through the options.
        </li>
        <li>
          <strong>You have an external disk or a NAS.</strong>{" "}
          <Link href="/tutorials/backup-folder/">A folder or drive</Link>, and
          nothing to pay.
        </li>
        <li>
          <strong>You want the backup off your premises.</strong>{" "}
          <Link href="/tutorials/backup-s3/">An S3 bucket</Link>. A few cents a
          month for most people, and it grows without you doing anything.
        </li>
        <li>
          <strong>You already pay for Nextcloud or a mailbox with storage.</strong>{" "}
          <Link href="/tutorials/backup-webdav/">WebDAV</Link> uses it as it is.
        </li>
        <li>
          <strong>You run a server and prefer keys.</strong>{" "}
          <Link href="/tutorials/backup-sftp/">SFTP</Link>.
        </li>
      </ul>

      <h2 id="going-further">Going further</h2>
      <p>
        Once a backup runs: the silo on your phone and in your browser, and
        what turns the backup into something you can count on.
      </p>
      <div className="tut-grid">
        {FURTHER.map((g) => (
          <Card key={g.href} g={g} />
        ))}
      </div>
    </main>
  );
}
