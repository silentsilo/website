import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ACCOUNTS, BACKUP, FURTHER, type Guide } from "./guides";

export const metadata: Metadata = {
  title: "Tutorials",
  description:
    "Setting up a backup on every option SilentSilo offers, one guide each, plus the phone, the browser extension, and getting your files out without the app.",
};

function Card({ g }: { g: Guide }) {
  return (
    <Link className="tut-card" href={g.href}>
      <span className="tut-card-icon" aria-hidden>
        {g.icon}
      </span>
      <span className="tut-card-body">
        <span className="tut-card-title">
          {g.title}
          <ArrowRight />
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
