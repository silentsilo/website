import type { Metadata } from "next";
import Link from "next/link";
import { APP_STORE, DOC_FORMATS, PLAY_STORE, RELEASES } from "../links";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "What happens if you lose the key, whether you have to buy anything, how to get files out without the app, the Android and iPhone apps, and the Linux and macOS versions.",
};

export default function Faq() {
  return (
    <main id="main" className="wrap prose">
      <h1>Questions</h1>
      <p className="lead">
        Short answers to what people ask before they trust SilentSilo with
        their files.
      </p>

      <h2>Do I have to buy anything?</h2>
      <p>
        No. The app is free under AGPL-3.0, with every feature, for people and
        companies alike. Backup goes to storage you already have: OneDrive,
        Dropbox, Google Drive, iCloud Drive, an S3-compatible bucket, a folder
        or network share, WebDAV or SFTP.
      </p>

      <h2>Do I need a security key?</h2>
      <p>
        On Linux and Windows 10, yes. Elsewhere you can use what you have:
      </p>
      <ul>
        <li>
          Windows 11: your phone over a QR code (an iPhone on iOS 18 or later,
          or Android with Google Password Manager), or Windows Hello from
          build 26200.7840 with a TPM 2.0.
        </li>
        <li>A Mac with Touch ID, or a Touch ID keyboard.</li>
        <li>The phone apps: Face ID on the iPhone, the fingerprint on Android.</li>
      </ul>
      <p>
        A key is still worth having if the same silo lives on several
        computers: one key opens it on all of them.
      </p>

      <h2>Which security keys work?</h2>
      <p>
        Any FIDO2 key with the <code>hmac-secret</code> extension and a PIN
        set: YubiKey 5 and the Yubico Security Key series, Nitrokey 3,
        SoloKeys, Token2 and Feitian, among others. A key without a PIN is
        refused when you add it. Keys that only speak the older U2F protocol
        do not work.
      </p>
      <p>
        A phone used as the key syncs its passkey with the account behind it,
        so it is not tied to one device the way a hardware key is. It works on
        Windows 11 only, with the phone nearby over Bluetooth.
      </p>

      <h2>What if I lose my security key?</h2>
      <p>
        Open the silo another way: another key, Windows Hello or Touch ID, the
        phone, or the recovery code. Then remove the lost key and use{" "}
        <strong>Replace the encryption key</strong> in Settings &gt; Advanced.
        Removing it stops it opening the silo. On a never-delete copy, or storage that keeps old versions, it still opens what is already there; replacing the encryption key keeps it out of everything saved after.
      </p>

      <h2>What if I lose the key and the recovery code?</h2>
      <p>
        Then the files cannot be opened, by you or by us. There is no copy of
        your key anywhere else. Keep the recovery code where you would keep a
        passport.
      </p>

      <h2>Can I get my files out without the app?</h2>
      <p>
        Yes. Each release includes <code>silentsilo-extract</code>, a
        command-line tool for Windows, Linux and macOS that writes out the
        files and passwords from a backup with only the recovery code:{" "}
        <Link href="/tutorials/get-files-out/">how to use it</Link>. The format is
        documented in <a href={DOC_FORMATS}>FORMATS.md</a>, so a silo can be
        read from the specification alone.
      </p>

      <h2>Is there a phone app?</h2>
      <p>
        Yes: Android 12 or later on <a href={PLAY_STORE}>Google Play</a>, and
        iOS 17 or later on the <a href={APP_STORE}>App Store</a>. Both open the
        same silo from the same backup storage, fill logins in other apps, and
        can back up photos, videos and contacts once you turn that on.
      </p>

      <h2>Is there a Linux or macOS version?</h2>
      <p>
        Yes. Linux has a .deb and an AppImage on the{" "}
        <Link href="/download/#linux">download page</Link> and unlocks with a
        security key. macOS 13 or later has one signed and notarised app for
        Apple silicon and Intel, and unlocks with Touch ID or a security key.
      </p>

      <h2>Does it work without sync?</h2>
      <p>
        Yes. A silo that never connects to storage works fully, and nothing in
        it waits on a server.
      </p>

      <h2>Can I use it as a real backup?</h2>
      <p>
        Yes. Add several copies, one of them a drive you keep unplugged, mark
        one as a never-delete copy, and keep a full copy on the computer.
        Settings &gt; Backup shows how many complete copies exist.
      </p>

      <h2>What if I lose the storage I back up to?</h2>
      <p>
        The silo on your disk keeps working. You lose that copy, which is why a
        second one is worth having. Moving to another provider is a copy of
        encrypted files and needs no key.
      </p>

      <h2>Can several people share a silo?</h2>
      <p>
        Yes, but everyone who can open it can open all of it. There are no
        per-person permissions.
      </p>

      <h2>Can a company use this for its employees?</h2>
      <p>
        Yes. A silo can be created as administered by an organisation, with a
        key the company holds, and the employee cannot remove that key or
        change the recovery code on that computer. A never-delete copy on the
        company&apos;s storage keeps the archive after the employee leaves.
        The setup is in{" "}
        <Link href="/tutorials/organisation-silos/">
          Silos for a team or a company
        </Link>
        .
      </p>

      <h2>Will an update ever stop my silo from opening?</h2>
      <p>
        Every stored format has a version. A silo written in each released
        format is kept in the repository and opened by every test run, so a
        change that would read it differently fails before release. A build
        that meets a format it does not know stops and says so. The formats
        are in <a href={DOC_FORMATS}>FORMATS.md</a>.
      </p>

      <h2>How do I know the download is the real one?</h2>
      <p>
        Every file on the <a href={RELEASES}>releases page</a> has a signature beside it. The app installs nothing by itself: it says when a new version is out, and you download it from this site. The
        Windows installer and the Mac app are also signed by Software Hive.
        Details are on <Link href="/security/">Security</Link>.
      </p>

      <h2>Something else</h2>
      <p>
        Write to{" "}
        <a href="mailto:contact@silentsilo.com">contact@silentsilo.com</a>, or{" "}
        <a href="mailto:security@silentsilo.com">security@silentsilo.com</a>{" "}
        for a vulnerability. One person reads them, so give it a day.
      </p>
    </main>
  );
}
