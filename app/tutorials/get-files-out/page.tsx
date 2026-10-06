import type { Metadata } from "next";
import Link from "next/link";
import { EXTRACTORS } from "../../links";
import { MoreGuides } from "../MoreGuides";

export const metadata: Metadata = {
  title: "Get your files out without the app",
  description:
    "silentsilo-extract turns a backup back into ordinary files with only the recovery code: getting the backup as a folder from any storage, then listing and extracting.",
};

export default function GetFilesOut() {
  return (
    <main id="main" className="wrap prose">
      <h1>Get your files out without the app</h1>
      <p className="lead">
        If the computer is gone and the app is gone with it, or the project
        itself stops, a backup and its recovery code are still enough.{" "}
        <code>silentsilo-extract</code> is a small command-line tool that reads
        the backup and writes your files back out as ordinary files.
      </p>

      <nav className="toc" aria-label="On this page">
        <p className="toc-head">On this page</p>
        <ol>
          <li>
            <a href="#get-the-backup-as-a-folder">Get the backup as a folder</a>
          </li>
          <li>
            <a href="#get-the-tool">Get the tool</a>
          </li>
          <li>
            <a href="#list-then-extract">List, then extract</a>
          </li>
          <li>
            <a href="#the-passwords">The passwords</a>
          </li>
          <li>
            <a href="#the-activity-log">The activity log</a>
          </li>
        </ol>
      </nav>

      <h2 id="get-the-backup-as-a-folder">Get the backup as a folder</h2>
      <p>
        The tool reads a folder holding <code>vault.json</code>,{" "}
        <code>recovery.env</code>, <code>keys/</code>,{" "}
        <code>snapshots/</code>, <code>ops/</code> and <code>blobs/</code>. All
        of them are needed. Everything in it is encrypted, so copying it
        anywhere first is safe.
      </p>
      <table>
        <thead>
          <tr>
            <th>Where the backup is</th>
            <th>How to get the folder</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A drive or a NAS folder</td>
            <td>It already is one: point the tool at it.</td>
          </tr>
          <tr>
            <td>OneDrive</td>
            <td>
              On onedrive.com, download <code>Apps/SilentSilo/Silo</code> and
              unpack the ZIP. Past 10,000 files, use the OneDrive app or
              rclone.
            </td>
          </tr>
          <tr>
            <td>Dropbox</td>
            <td>
              On dropbox.com, download <code>Apps/SilentSilo/Silo</code> and
              unpack the ZIP. Past 250 GB or 10,000 files, use the Dropbox app
              or rclone.
            </td>
          </tr>
          <tr>
            <td>Google Drive</td>
            <td>
              On drive.google.com, download <code>SilentSilo/Silo</code>. A
              large folder may arrive as several ZIP files: unpack them all
              into the same folder. rclone works here too.
            </td>
          </tr>
          <tr>
            <td>S3, WebDAV, SFTP</td>
            <td>
              Copy the silo&apos;s prefix or folder down whole, with{" "}
              <a href="https://rclone.org/">rclone</a>, an SFTP client, or the
              provider&apos;s own download.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <code>Silo</code> is the folder name the app suggests; use the one
        you chose. A silo is many small files, so it reaches a website&apos;s
        ZIP limit sooner than its size suggests. <a href="https://rclone.org/">rclone</a>{" "}
        reads OneDrive, Dropbox and Google Drive as well as S3, WebDAV and
        SFTP, and copies a folder down whole whatever its size.
      </p>

      <h2 id="get-the-tool">Get the tool</h2>
      <p>
        Every release of the app carries the tool for three systems, built
        from the same source as the app:
      </p>
      <ul>
        {EXTRACTORS.map((e) => (
          <li key={e.file}>
            <a href={e.url}>{e.os}</a>, {e.arch}: <code>{e.file}</code>
          </li>
        ))}
      </ul>
      <p>
        On Linux and macOS, make it runnable first with{" "}
        <code>chmod +x</code>. It needs no installation and nothing else.
      </p>

      <h2 id="list-then-extract">List, then extract</h2>
      <p>
        First list what is there. Dashes and letter case in the code do not
        matter:
      </p>
      <pre>
        <code>
          {
            "silentsilo-extract list --from ./Silo --code ABCD-EFGH-…\n"
          }
        </code>
      </pre>
      <p>Then write it all out:</p>
      <pre>
        <code>
          {
            "silentsilo-extract extract --from ./Silo --code ABCD-EFGH-… --to ./restored\n"
          }
        </code>
      </pre>
      <p>
        Files keep their folders. What was in the trash goes under{" "}
        <code>_trash/</code>. The tool writes nowhere but the folder you
        named, creates no silo, and sends nothing over the network.
      </p>
      <p>
        <strong>that recovery code does not open this backup</strong> means a
        wrong or old code: a code is replaced each time a new one is made.{" "}
        <strong>
          this backup has no recovery code published, so a code alone cannot
          open it
        </strong>{" "}
        means the silo never had one, and only an enrolled key opens it, through the
        app.
      </p>

      <h2 id="the-passwords">The passwords</h2>
      <p>
        The tool writes the password entries to{" "}
        <code>_passwords/passwords.csv</code> and, whole, with passkeys and
        cards, to <code>_passwords/entries.json</code>. Both are plain text.
        Import them into a password manager, then delete both files.
      </p>

      <h2 id="the-activity-log">The activity log</h2>
      <p>
        When the silo keeps an activity log, the tool writes it too, to{" "}
        <code>_activity/activity-log.csv</code> and{" "}
        <code>_activity/activity-log.jsonl</code>, newest first, and{" "}
        <code>list</code> says how many events it holds. Records missing from
        a device&apos;s run are named, as in the app.
      </p>
      <p>
        An organisation&apos;s log is the exception. Only the
        organisation&apos;s security keys open it, in the app, so the tool
        says the silo keeps one and leaves it alone.
      </p>
      <p>
        Try this once now, on a copy, rather than on the day you need it. The
        app has a gentler version of the same check under{" "}
        <strong>Settings &gt; Test backup &gt; Test a recovery</strong>. The{" "}
        <Link href="/faq/">questions page</Link> says more about why the tool
        exists.
      </p>
      <MoreGuides />
    </main>
  );
}
