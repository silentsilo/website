import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Principles",
  description:
    "The commitments SilentSilo is built on: local first, no account, no tracking, and what stays free.",
};

export default function Principles() {
  return (
    <main className="wrap prose">
      <h1>Principles</h1>
      <p className="lead">
        Short enough to hold us to. If a future version of SilentSilo breaks
        one of these, this page is the receipt.
      </p>

      <h2>Local first, permanently</h2>
      <p>
        A silo that never connects storage is fully usable, forever. No
        account exists, so none can be required later. If Software Hive
        disappeared tomorrow, every silo would keep opening on every machine
        it opens on today.
      </p>

      <h2>Every network request, listed</h2>
      <p>
        The app tracks nothing, and every kind of network request it can make
        is on the <a href="/privacy/">privacy page</a>: sync to storage you
        configured, an update check at most once a day carrying the app
        version and platform and nothing else, a breach check only when you
        press its button, and site icons in Credentials, which are off until
        you switch them on. The last two do nothing unless you ask, and the
        update check has an off switch in Settings. If a future version adds
        another kind, it goes on that list before it ships.
      </p>

      <h2>What stays free</h2>
      <ul>
        <li>Encryption and unlocking, including hardware keys.</li>
        <li>The recovery code.</li>
        <li>Reading and exporting your own data, always.</li>
        <li>Security patches, for everyone.</li>
      </ul>
      <p>
        The client is free in full and there is nothing to buy: no tier, no
        licence key, no metering. Backup goes to storage you already have, so
        whatever you pay for that you pay to your own provider, not to us.
      </p>

      <h2>Open source</h2>
      <p>
        The client is AGPL-3.0. The cryptography and the sync format are
        documented so the format outlives the implementation, and the list of
        what is deliberately unfinished ships in the repository as{" "}
        <a href="https://github.com/silentsilo/desktop/blob/main/BACKLOG.md">
          BACKLOG.md
        </a>
        .
      </p>

      <h2>Your storage, your exit</h2>
      <p>
        Sync targets are things you already own: a bucket, a NAS, an SFTP
        account, a folder. Passwords import from and export to CSV. A product
        confident in itself keeps the exit door open.
      </p>
    </main>
  );
}
