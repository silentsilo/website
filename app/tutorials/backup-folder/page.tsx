import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Back up to a folder, drive or network share",
  description:
    "The free option that needs no account: an external disk, a NAS share, or a folder your cloud client already syncs. Including the one thing about synced folders that trips people up.",
};

export default function BackupFolder() {
  return (
    <main className="wrap prose">
      <h1>Back up to a folder, drive or network share</h1>
      <p className="lead">
        The plainest option and, in practice, one of the most useful. Point
        the silo at a directory and it writes its encrypted objects there.
        No account, no key, no endpoint. It covers an external disk, a NAS
        share, and a folder that Dropbox or OneDrive is already syncing.
      </p>

      <h2>Setting it up</h2>
      <ol>
        <li>
          Plug in the disk or make sure the share is mounted. On Windows a
          network share can be given as a UNC path, like{" "}
          <code>\\nas\backups\silentsilo</code>, so it works without a drive
          letter.
        </li>
        <li>
          Unlock the silo and open <strong>Settings &gt; Backup</strong>, or{" "}
          <strong>Settings &gt; Copies</strong> and{" "}
          <strong>Add another place</strong> if this is a second place.
        </li>
        <li>
          Choose <strong>Folder</strong>, then <strong>Browse</strong> to pick
          the directory. Pick an empty one, or one this silo already uses: the
          app refuses a folder that holds a different silo, so each silo
          needs a folder of its own.
        </li>
        <li>
          Press <strong>Test connection</strong>. The app writes a small
          file, reads it back and deletes it, which catches a share mounted
          read-only before you rely on it.
        </li>
        <li>
          Press <strong>Save &amp; connect</strong>, or{" "}
          <strong>Add this place</strong> for a second copy. The first pass
          starts in the background.
        </li>
      </ol>
      <p>
        If this is a second copy, give it a name you will recognise later:
        &quot;external disk, desk drawer&quot; tells you something six months
        from now, and a drive letter does not.
      </p>

      <h2>Filling a big one over a cable</h2>
      <p>
        Uploading several hundred gigabytes over a home connection takes
        weeks. Filling an external disk takes an afternoon. If the silo
        already backs up somewhere, use <strong>Fill from the first copy</strong>{" "}
        on the disk&apos;s row in Settings &gt; Copies: it copies the
        encrypted files straight across, never needs your key and decrypts
        nothing, shows how many bytes have moved so a large file does not look
        like a stall, can be stopped at any point, and carries on from where
        it stopped when you run it again.
      </p>
      <p>
        The source is always the first place, the one on the Backup page. To
        go the other way, fill a bucket from a disk seeded at the office, make
        the disk the Backup connection and add the bucket as a copy.
      </p>

      <h2>The synced-folder trap</h2>
      <p>
        This is the part worth reading twice, because the same word means two
        different things.
      </p>
      <p>
        Putting the <strong>backup</strong> in a Dropbox, OneDrive or Google
        Drive folder is fine and works well. The backup is made of files that
        are written once and never changed afterwards, each with its own
        name, so two computers never fight over the same file and there is
        nothing for a sync client to conflict over.
      </p>
      <p>
        Putting the <strong>silo itself</strong> in one of those folders is a
        different matter. A silo keeps its own state in one encrypted file
        that changes every time you work in it, and two machines editing one
        file through a consumer sync client produces conflict copies rather
        than a merge. As a backup of one computer it is perfectly reasonable.
        As a way to share a silo between two computers it does not work, and
        sharing the backup is what does.
      </p>
      <p>
        The app warns you when you choose where a new silo lives and the
        folder belongs to a sync client. It is advice rather than a refusal:
        it is your disk.
      </p>

      <h2>What a local folder cannot do</h2>
      <p>
        A copy on a disk that is always plugged in, reachable by the same
        account that runs the app, is not protection against ransomware. What
        encrypts your files encrypts that too, in the same pass. It is
        excellent against the things that actually happen more often: a
        deleted folder, a dead machine, a botched restore.
      </p>
      <p>
        When you add a second place in Settings &gt; Copies you can tick{" "}
        <strong>Never delete anything here</strong>, and the app then never
        sends it a delete. That is a promise the app keeps, not one the disk
        enforces:
        anything else on the machine can still erase the folder, and so can
        you. On storage that refuses deletion at its own level, the promise
        is enforced by the storage instead, which is the difference explained
        in{" "}
        <Link href="/tutorials/copies-nothing-can-erase/">
          a copy nothing can erase
        </Link>
        .
      </p>
      <p>
        The honest arrangement is a plugged-in disk for the ordinary
        accidents and something off the machine for the rest: a{" "}
        <Link href="/tutorials/backup-s3/">bucket</Link>,{" "}
        <Link href="/tutorials/backup-sftp/">a server over SFTP</Link>, or a
        disk you unplug and take somewhere else. An unplugged disk is
        genuinely offline, which no setting can beat.
      </p>

      <h2>Prove it works</h2>
      <p>
        Open <strong>Settings &gt; Verification</strong>, go to{" "}
        <strong>Test a recovery</strong>, type your recovery code and press{" "}
        <strong>Try a recovery now</strong>. It rebuilds the silo from the
        folder in a temporary directory, using only that code, and opens one
        real file. For an external disk, do it while the disk is plugged in,
        then unplug it and put it somewhere that is not the same building as
        your computer.
      </p>
    </main>
  );
}
