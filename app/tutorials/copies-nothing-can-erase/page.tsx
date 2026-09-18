import type { Metadata } from "next";
import Link from "next/link";
import { REPO } from "../../links";

export const metadata: Metadata = {
  title: "A copy nothing can erase",
  description:
    "Write-once storage in practice: object lock in a bucket, immutable snapshots on a NAS, and M-DISC. What each one actually protects against, and how to prove it works.",
};

const DOC_STORAGE = `${REPO}/blob/main/docs/STORAGE.md`;
const RELEASES = `${REPO}/releases`;

export default function ImmutableCopies() {
  return (
    <main className="wrap prose">
      <h1>A copy nothing can erase</h1>
      <p className="lead">
        Encryption stops someone reading your files. It does nothing at all
        to stop someone deleting them. This is the guide to the copy that
        survives the deletion.
      </p>

      <h2>The problem, stated properly</h2>
      <p>
        Ransomware does not need to break your encryption. It runs as you, on
        your machine, with your rights, and that means it holds whatever your
        backup tool holds. Your bucket keys are in the app. Your external
        drive is plugged in. It encrypts the lot, including the backup, and
        then asks for money.
      </p>
      <p>
        The same thing happens without an attacker. A wrong click empties a
        folder, a lifecycle rule you set up last year quietly cleans the
        archive, an account lapses. In every version of the story the backup
        obeys the same person or process that destroyed the original, which
        is why a second copy under the same control is not really a second
        copy.
      </p>
      <p>
        The answer is one copy that cannot be told to delete, by anyone,
        including you, for a period you choose in advance. Three ways to get
        one, and they suit different things.
      </p>

      <h2>Which one you want</h2>
      <table>
        <thead>
          <tr>
            <th>Approach</th>
            <th>Good for</th>
            <th>Real cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Object lock in a bucket</td>
            <td>The whole silo, automatically, forever</td>
            <td>A few euros a month, one careful setup</td>
          </tr>
          <tr>
            <td>Immutable snapshots on a NAS</td>
            <td>A whole silo you keep at home</td>
            <td>The NAS you may already own</td>
          </tr>
          <tr>
            <td>M-DISC</td>
            <td>The small set you would grieve over</td>
            <td>A burner, and doing it by hand</td>
          </tr>
        </tbody>
      </table>
      <p>
        Most people want the first. The third is worth doing anyway for the
        handful of things that would actually hurt: photographs of people who
        are gone, the documents that prove something, the recovery code
        itself.
      </p>

      <h2>Object lock in a bucket</h2>
      <p>
        Object lock tells the storage to refuse deletion of an object until a
        date passes. In <strong>compliance mode</strong> that refusal applies
        to everyone: not the app, not stolen credentials, not the account
        owner, not the provider&apos;s support desk. That last part is the
        point and also the catch, so read the warning below before you pick a
        long window.
      </p>
      <p>
        Backblaze B2, Wasabi, Amazon S3 and MinIO offer it. Cloudflare R2
        does not, so a locked copy cannot live there.
      </p>

      <h3>Setting it up</h3>
      <ol>
        <li>
          Create a <strong>new bucket</strong>. Object lock almost always has
          to be chosen at creation and cannot be added later. Versioning is
          required and is switched on with it.
        </li>
        <li>
          Set a <strong>default retention</strong>, in compliance mode. Two
          weeks is a sensible starting point. Without this step nothing is
          actually locked: turning the feature on only makes locking
          possible, and the default retention is what actually locks each
          new file as it arrives.
        </li>
        <li>
          Add a <strong>lifecycle rule</strong> that removes noncurrent
          versions after the same period, so the bucket does not grow for
          ever, and one with the action{" "}
          <strong>AbortIncompleteMultipartUpload</strong> after 7 days, which
          clears the pieces of a large upload that a crash cut short. Never
          add a plain expiration rule: SilentSilo&apos;s files are never
          overwritten, so they are all current versions, and a rule expiring
          current versions deletes the archive rather than the rubbish.
        </li>
        <li>
          Add the bucket in SilentSilo as a second place: open{" "}
          <strong>Settings &gt; Copies</strong>, press{" "}
          <strong>Add another place</strong>, fill in the bucket and tick{" "}
          <strong>Never delete anything here</strong>. The app then never
          sends a delete to it, so the two agree instead of the app being
          refused all day. The box is only offered for a second place, not
          for the connection on the Backup page, and that is the right
          shape: the Backup connection is the one the app keeps tidy.
        </li>
      </ol>
      <p>
        When you tick the box the app asks the bucket whether it really has
        object lock and warns you if it does not. On a bucket that is locked
        the warning still appears when the access key is not allowed to ask,
        so on Amazon S3 give the key{" "}
        <code>s3:GetBucketObjectLockConfiguration</code> and{" "}
        <code>s3:GetBucketVersioning</code>, as in the{" "}
        <Link href="/tutorials/backup-s3/">S3 guide</Link>.
      </p>

      <h3>What it actually protects</h3>
      <p>
        The retention window runs from when each object is{" "}
        <strong>written</strong>, not from when something tries to delete it.
        With a fourteen day window, everything written in the last fortnight
        cannot be destroyed by anybody. Something written six months ago is
        outside its window: an accidental delete leaves it recoverable for as
        long as your lifecycle rule keeps noncurrent versions, but a
        deliberate one, made with stolen credentials that name the version
        directly, removes it for good.
      </p>
      <p>
        This is not a flaw to be fixed with a longer window, it is the shape
        of the tool. What the lock is for is that a recent, complete state
        stays restorable whatever happens to the credentials.
      </p>
      <p>
        Two more things to know before choosing the window. Content you
        delete in the silo reaches the storage as a deletion only 30 days
        later, so even the ordinary copy keeps a deleted file for a month;
        the lock is for the case where the deletion did not come from you.
        And the lock cuts both ways for keys: when you remove a security key
        from the silo, the app deletes the small file that let that key open
        it, and a locked bucket refuses that deletion like any other. A key
        you have lost goes on opening the locked copy for as long as the
        bucket keeps that file. The security keys page in Settings offers{" "}
        <strong>Change the silo&apos;s encryption key</strong> for the copies
        that accept overwrites; on a copy that never deletes, the old file
        stays. Keep the window short, and keep your keys where you can find
        them.
      </p>
      <p className="notice">
        <strong>Compliance mode binds you too.</strong> If you put something
        in that bucket that must genuinely be erased, a subject access
        request, a file uploaded by mistake, you cannot erase it before the
        retention expires. Nobody can. Choose the window knowing that, and
        choose it short rather than long.
      </p>

      <h2>Immutable snapshots on a NAS</h2>
      <p>
        If your backup lives at home on a NAS, the equivalent is a snapshot
        the sharing protocol cannot reach. A snapshot is a frozen view of the
        filesystem: deleting the live files does not touch it, and neither
        does anything writing through the share.
      </p>
      <ul>
        <li>
          <strong>ZFS or btrfs</strong>, on TrueNAS, Unraid or a plain Linux
          box: take a snapshot on a schedule and keep a fortnight of them.
        </li>
        <li>
          <strong>Synology and QNAP</strong> offer scheduled snapshots in the
          interface, and newer models a write-once folder mode, which is the
          closest thing to object lock that lives in a house.
        </li>
      </ul>
      <p>
        The protection is real but it has a ceiling: an attacker who gets{" "}
        <strong>administrator access to the NAS itself</strong> can destroy
        snapshots, where an attacker holding compliance-locked bucket
        credentials cannot. So give the NAS its own password, not the one
        from your laptop, and do not mount the admin interface on a machine
        you also browse the web from.
      </p>

      <h2>M-DISC, when you want it to be physical</h2>
      <p>
        M-DISC is a Blu-ray disc whose recording layer is inorganic rather
        than dye. Writing changes the material, so the result is write-once
        in the way a photograph is: there is no command that unwrites it,
        because there is no mechanism that could. Discs come in 25, 50 and
        100 GB and are rated for centuries, which nobody has tested and which
        matters less than the fact that they cannot be rewritten this
        afternoon.
      </p>

      <h3>Burning a silo</h3>
      <ol>
        <li>
          Add a <strong>plain folder</strong> on your hard disk as a second
          place in <strong>Settings &gt; Copies</strong>, and let it fill
          completely. That folder is a full copy of the silo. Inside it you
          will find <code>vault.json</code>, <code>recovery.env</code>, a{" "}
          <code>keys/</code> folder, a <code>snapshots/</code> folder, an{" "}
          <code>ops/</code> folder and a <code>blobs/</code> folder. Every
          one of them is needed to read the silo back: the recovery tool
          opens the silo with <code>recovery.env</code> and{" "}
          <code>keys/</code>, and rebuilds the file list from{" "}
          <code>snapshots/</code> and <code>ops/</code> together.
        </li>
        <li>
          Burn that folder to the disc with any burning software, as data,
          and <strong>finalise</strong> the disc so it reads in other drives.
        </li>
        <li>
          If the silo does not fit on one disc, split it deliberately:
          everything except <code>blobs/</code> on <strong>every</strong>{" "}
          disc, since those parts are small and they describe the structure,
          and <code>blobs/</code> divided across the rest. Then a disc that
          goes missing costs you the files whose contents were on it, rather
          than the ability to read anything at all.
        </li>
        <li>
          Write the date on the disc. It is a snapshot of that moment;
          nothing you do afterwards changes it.
        </li>
      </ol>

      <h3>Proving it works, today</h3>
      <p>
        This is the step people skip and the one that matters. Download{" "}
        <a href={RELEASES}>silentsilo-extract</a>, the recovery tool, and
        point it at the disc:
      </p>
      <pre>
        <code>silentsilo-extract list --from D:\ --code YOUR-RECOVERY-CODE</code>
      </pre>
      <p>
        It reads the disc and prints what is in the silo. It never writes to
        the source, so it works on a disc that cannot be written to at all.
        If that command lists your files, your archive is real. If it does
        not, you have found out now rather than in five years.
      </p>
      <p>
        It needs a recovery code to exist. If you turned yours off in
        Settings, the disc holds nothing the tool can open: create a code
        before you burn, and burn again after you replace one.
      </p>
      <p>
        To get files back out, the same tool with a destination:{" "}
        <code>
          silentsilo-extract extract --from D:\ --code YOUR-RECOVERY-CODE --to
          C:\restored
        </code>
        . No SilentSilo installation, no account, no key. That is the point
        of it existing. If the silo holds passwords, they come out too, in a{" "}
        <code>_passwords</code> folder, <strong>readable by anyone</strong>{" "}
        who opens those files. Import them into a password manager and
        delete that folder as soon as you have.
      </p>

      <h3>Two things a good archive plan says out loud</h3>
      <p>
        <strong>Keep a reader.</strong> A disc rated for centuries is useless
        without a Blu-ray drive, and computers stopped shipping them years
        ago. Buy a cheap external one and put it in the same box as the
        discs. It is the part of the plan most likely to be missing in ten
        years.
      </p>
      <p>
        <strong>Store the code somewhere else.</strong> The disc holds
        encrypted files plus what any archive shows, how many files, how big
        and from when; nobody can read a file from it. That makes the disc
        alone safe to keep at a relative&apos;s house. The disc plus your
        written recovery code is the whole silo, so those two things do not
        belong in the same drawer.
      </p>

      <h2>What a finished arrangement looks like</h2>
      <ol>
        <li>
          Your computer, with <em>Keep a full copy on this computer</em> on.
        </li>
        <li>
          A working target the app keeps tidy: a bucket, a NAS, a folder on a
          drive that stays connected.
        </li>
        <li>
          One copy nothing can erase: a locked bucket, snapshots on a NAS, or
          a drive that lives unplugged. Being offline stops the same attack
          that immutability stops, for a different reason, and costs one
          habit instead of one subscription.
        </li>
        <li>
          M-DISC for the small set you would grieve over, refreshed once a
          year, verified the day you burn it.
        </li>
      </ol>
      <p>
        Settings &gt; Copies shows when each place was last written to, which
        is the fact that quietly tells you a drive has been unplugged since
        spring.
      </p>
      <p>
        The provider-by-provider settings, the exact lifecycle rules and the
        trap where versioning breaks key revocation are in{" "}
        <a href={DOC_STORAGE}>docs/STORAGE.md</a>. The threat model behind all
        of it is on the <Link href="/security/">security page</Link>.
      </p>
    </main>
  );
}
