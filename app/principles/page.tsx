import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Principles",
  description:
    "How SilentSilo works today and what we commit to keep doing: local first, no account, no tracking, and what is free.",
};

export default function Principles() {
  return (
    <main id="main" className="wrap prose">
      <h1>Principles</h1>
      <p className="lead">
        How SilentSilo works today, and what we commit to keep doing. Short
        enough to hold us to. If a later version changes one of these, this
        page will say so.
      </p>

      <h2>Local first</h2>
      <p>
        A silo that never connects storage is fully usable, and nothing in
        it expires. There is no SilentSilo account, and we do not plan to
        add one. If Software Hive stopped, silos would keep opening on the
        machines they open on today, and storage you run or rent (a bucket,
        WebDAV, SFTP, a folder) would keep working. Sync through OneDrive,
        Dropbox or Google Drive depends on the app registrations Software
        Hive holds with those companies, so it could stop with them.
      </p>

      <h2>Every network request, listed</h2>
      <p>
        The app tracks nothing, and every kind of network request it can make
        is on the <a href="/privacy/">privacy page</a>: sync to storage you
        configured, with the provider&apos;s sign-in when that storage is
        your OneDrive, Dropbox or Google Drive, an automatic update check at
        most once a day carrying the app version, the platform and the
        processor type, the same check whenever you press{" "}
        <strong>Check for updates</strong>, a breach check only when you
        press its button, and site icons in Passwords, which are off until
        you switch them on. The breach check and site icons do nothing
        unless you ask, and the automatic update check has an off switch in
        Settings. We commit to putting any new kind on that list before it
        ships.
      </p>

      <h2>What is free</h2>
      <p>
        Today the client is free in full and there is nothing to buy: no
        tier, no licence key, no metering. Backup goes to storage you already
        have, so whatever you pay for that you pay to your own provider, not
        to us. These are the parts we commit to keep free:
      </p>
      <ul>
        <li>Encryption and unlocking, including hardware keys.</li>
        <li>The recovery code.</li>
        <li>Reading and exporting your own data.</li>
        <li>Security patches.</li>
      </ul>

      <h2>Open source</h2>
      <p>
        The client is AGPL-3.0. The cryptography and the sync format are
        documented, so a silo can be read without this implementation, and
        the list of what is deliberately unfinished ships in the repository
        as{" "}
        <a href="https://github.com/silentsilo/desktop/blob/main/BACKLOG.md">
          BACKLOG.md
        </a>
        .
      </p>

      <h2>Your storage, your exit</h2>
      <p>
        Sync targets are storage you already have: a OneDrive, Dropbox or
        Google Drive account, a bucket, a NAS, an SFTP account, a folder.
        Passwords export to a KeePass file or to CSV, and the extraction tool
        reads a backup without the app, so you can leave whenever you want.
      </p>
    </main>
  );
}
