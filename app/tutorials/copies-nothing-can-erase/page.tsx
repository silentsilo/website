import type { Metadata } from "next";
import Link from "next/link";
import { REPO } from "../../links";
import { MoreGuides } from "../MoreGuides";

export const metadata: Metadata = {
  title: "A copy that refuses deletes",
  description:
    "Write-once storage in practice: object lock in a bucket, immutable snapshots on a NAS, and M-DISC. What each one protects against, and how to check it works.",
};

const DOC_STORAGE = `${REPO}/blob/main/docs/STORAGE.md`;
const RELEASES = `${REPO}/releases`;

export default function ImmutableCopies() {
  return (
    <main id="main" className="wrap prose">
      <h1>A copy that refuses deletes</h1>
      <p className="lead">
        Encryption stops someone reading your files, not deleting them. This
        guide is about a copy that survives a delete.
      </p>

      <nav className="toc" aria-label="On this page">
        <p className="toc-head">On this page</p>
        <ol>
          <li>
            <a href="#why">Why</a>
          </li>
          <li>
            <a href="#which-one-you-want">Which one you want</a>
          </li>
          <li>
            <a href="#object-lock-in-a-bucket">Object lock in a bucket</a>
          </li>
          <li>
            <a href="#immutable-snapshots-on-a-nas">Immutable snapshots on a NAS</a>
          </li>
          <li>
            <a href="#m-disc">M-DISC</a>
          </li>
          <li>
            <a href="#a-finished-arrangement">A finished arrangement</a>
          </li>
        </ol>
      </nav>

      <h2 id="why">Why</h2>
      <p>
        Ransomware runs as you, with the same access as your backup app: your
        bucket keys and your plugged-in drive. It can encrypt or delete the
        backup along with the originals. A wrong click, a lifecycle rule or a
        lapsed account can do the same without an attacker.
      </p>
      <p>
        The fix is one copy that refuses deletes, from anyone, you included,
        for a period you set in advance.
      </p>

      <h2 id="which-one-you-want">Which one you want</h2>
      <table>
        <thead>
          <tr>
            <th>Approach</th>
            <th>Good for</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Object lock in a bucket</td>
            <td>The whole silo, automatically</td>
            <td>A few euros a month, one careful setup</td>
          </tr>
          <tr>
            <td>Immutable snapshots on a NAS</td>
            <td>A whole silo kept at home</td>
            <td>The NAS you may already own</td>
          </tr>
          <tr>
            <td>M-DISC</td>
            <td>The few files you could not replace</td>
            <td>A Blu-ray burner and some manual work</td>
          </tr>
        </tbody>
      </table>

      <h2 id="object-lock-in-a-bucket">Object lock in a bucket</h2>
      <p>
        Object lock makes the storage refuse to delete an object until a date
        passes. In <strong>compliance mode</strong> nobody can override it:
        not the app, not stolen credentials, not the account owner. Backblaze
        B2, Wasabi, Amazon S3 and MinIO offer it. Cloudflare R2&apos;s bucket
        locks can be removed by an administrator, so they do not count.
      </p>

      <h3>Setting it up</h3>
      <ol>
        <li>
          Create a <strong>new bucket</strong> with object lock on. Versioning
          comes with it.
        </li>
        <li>
          Set a <strong>default retention</strong> in compliance mode, two
          weeks to start. Without it nothing is locked.
        </li>
        <li>
          Add a <strong>lifecycle rule</strong> that removes noncurrent
          versions after the same period. Never add a rule that expires
          current versions: it deletes the archive. The rules for each provider
          are in <a href={DOC_STORAGE}>STORAGE.md</a>.
        </li>
        <li>
          In SilentSilo, open <strong>Settings &gt; Backup</strong>, press{" "}
          <strong>Add another copy</strong>, fill in the bucket and tick{" "}
          <strong>Never-delete copy</strong>. The app then never sends it a
          delete. It also checks that the bucket has object lock and warns you
          if not; on Amazon S3 the key needs the permissions listed in the{" "}
          <Link href="/tutorials/backup-s3/">S3 guide</Link> for that check.
        </li>
      </ol>

      <h3>What it protects</h3>
      <p>
        The window counts from when each object was written. With two weeks,
        nothing written in the last two weeks can be deleted, by anyone. Older
        objects can be deleted on purpose by someone holding your keys, so the
        lock keeps a recent, complete state, not every state forever.
      </p>
      <p>
        A never-delete copy also keeps the envelope of a key you removed, so a
        lost key still opens that copy. Use{" "}
        <strong>Replace the encryption key</strong> in Settings &gt; Advanced,
        then replace the never-delete copy with a new one.
      </p>
      <p className="notice">
        <strong>Compliance mode binds you too.</strong> Something that must be
        erased, such as a file uploaded by mistake, stays until the window
        ends. Choose a short window.
      </p>

      <h2 id="immutable-snapshots-on-a-nas">Immutable snapshots on a NAS</h2>
      <p>
        At home, the equivalent is a snapshot the file share cannot touch. On
        ZFS or btrfs (TrueNAS, Unraid, plain Linux), take snapshots on a
        schedule and keep two weeks of them. Synology and QNAP offer scheduled
        snapshots, and newer models an immutable option: turn it on.
      </p>
      <p>
        On plain ZFS or btrfs, anyone with administrator access to the NAS can
        delete snapshots. Give the NAS its own password and do not open its
        admin page on the computer you browse from.
      </p>

      <h2 id="m-disc">M-DISC</h2>
      <p>
        M-DISC is a Blu-ray disc that can be written once and never changed.
        Discs hold 25, 50 or 100 GB.
      </p>

      <h3>Burning a silo</h3>
      <ol>
        <li>
          In <strong>Settings &gt; Backup</strong>, add a <strong>Drive or NAS folder</strong> on your disk as another copy and let it fill. It
          holds <code>vault.json</code>, <code>recovery.env</code> and the{" "}
          <code>keys/</code>, <code>snapshots/</code>, <code>ops/</code> and{" "}
          <code>blobs/</code> folders. All of them are needed.
        </li>
        <li>
          Burn that folder to the disc as data and <strong>finalise</strong>{" "}
          the disc.
        </li>
        <li>
          If it needs several discs, put everything except{" "}
          <code>blobs/</code> on <strong>every</strong> disc and split{" "}
          <code>blobs/</code> across them. A lost disc then costs only the
          files on it.
        </li>
        <li>Write the date on the disc.</li>
      </ol>

      <h3>Check it works</h3>
      <p>
        Download <a href={RELEASES}>silentsilo-extract</a> and run:
      </p>
      <pre>
        <code>silentsilo-extract list --from D:\</code>
      </pre>
      <p>
        It asks for your recovery code and lists the files. It never writes to
        the source. To get the files out:{" "}
        <code>silentsilo-extract extract --from D:\ --to C:\restored</code>.
        Passwords come out in a <code>_passwords</code> folder that anyone can
        read: import them and delete the folder.
      </p>
      <p>
        The tool needs a recovery code. If you turned yours off, create one
        before you burn, and burn again after you replace it.
      </p>
      <p>
        Keep an external Blu-ray drive with the discs, since new computers do
        not have one. Keep the recovery code somewhere else: the disc alone
        opens nothing, the disc with the code opens everything.
      </p>

      <h2 id="a-finished-arrangement">A finished arrangement</h2>
      <ol>
        <li>
          Your computer, with <em>Keep a full copy on this computer</em> on.
        </li>
        <li>
          A working copy the app keeps tidy: a bucket, a NAS, or a drive that
          stays connected.
        </li>
        <li>
          One copy that refuses deletes: a locked bucket, NAS snapshots, or a
          drive you keep unplugged.
        </li>
        <li>M-DISC for what you could not replace, renewed once a year.</li>
      </ol>
      <p>
        Settings &gt; Backup shows when each copy was last written, so you
        can see when a drive has stayed unplugged too long. The threat model
        is on the <Link href="/security/">security page</Link>.
      </p>
      <MoreGuides />
    </main>
  );
}
