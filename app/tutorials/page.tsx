import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tutorials",
  description:
    "Setting up a backup on every option SilentSilo offers, one guide each, plus how to keep a copy that nothing can erase.",
};

/**
 * The index. One entry per way of backing up, because the questions are
 * different for each: a bucket needs a key scoped to it, SFTP needs a
 * fingerprint checked, a folder needs someone to know what a synced one
 * does.
 */
export default function Tutorials() {
  return (
    <main className="wrap prose">
      <h1>Tutorials</h1>
      <p className="lead">
        Guides for the parts that are not about SilentSilo at all: arranging
        storage so that a bad day stays a bad day rather than becoming a
        permanent loss.
      </p>

      <h2>Setting up a backup</h2>
      <p>
        The app backs up to four kinds of place, and the app side is the same
        for all of them: unlock the silo, open <strong>Backup</strong>, or{" "}
        <strong>Copies</strong> if you are adding a second one. What differs
        is what the storage wants from you first, so there is a guide each.
      </p>

      <h3>
        <Link href="/tutorials/backup-s3/">An S3 bucket</Link>
      </h3>
      <p>
        Backblaze B2, Cloudflare R2, Wasabi, Amazon S3 or MinIO. Where each
        console hides its key creation, how to scope a key to one bucket, and
        which of the five fields is wrong when it will not connect.
      </p>

      <h3>
        <Link href="/tutorials/backup-folder/">
          A folder, drive or network share
        </Link>
      </h3>
      <p>
        Free and needs no account. Covers an external disk, a NAS share, and
        the difference between putting the backup in a synced folder, which
        works, and putting the silo there, which does not.
      </p>

      <h3>
        <Link href="/tutorials/backup-webdav/">WebDAV</Link>
      </h3>
      <p>
        Nextcloud, ownCloud, Synology, Box or Fastmail. Finding the WebDAV
        address rather than the login page, and creating an app password you
        can revoke on its own.
      </p>

      <h3>
        <Link href="/tutorials/backup-sftp/">SFTP</Link>
      </h3>
      <p>
        A VPS, a NAS with SSH, rsync.net or a Hetzner Storage Box. Keys
        rather than passwords, and how to check the server fingerprint the
        app asks you to confirm.
      </p>

      <h2>Going further</h2>
      <h3>
        <Link href="/tutorials/copies-nothing-can-erase/">
          A copy nothing can erase
        </Link>
      </h3>
      <p>
        Ransomware that reaches your machine reaches your backup credentials
        with it. This is the guide to the one copy that survives that: what
        write-once actually means on a disc, on a NAS and in a bucket, what
        each really protects against, and how to prove it works before you
        need it.
      </p>

      <h3>
        <Link href="/tutorials/organisation-silos/">
          Silos for a team or a company
        </Link>
      </h3>
      <p>
        Provisioning silos employees cannot lock the company out of: the
        organisation key, three ways to onboard someone, and what to do the
        day somebody leaves. Free, like everything else.
      </p>
    </main>
  );
}
