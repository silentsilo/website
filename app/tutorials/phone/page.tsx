import type { Metadata } from "next";
import Link from "next/link";
import { PLAY_STORE } from "../../links";
import { MoreGuides } from "../MoreGuides";

export const metadata: Metadata = {
  title: "SilentSilo on your phone",
  description:
    "The Android app: opening your silo on the phone, backing up photos, videos and contacts into it, filling logins in other apps, and how it locks.",
};

export default function Phone() {
  return (
    <main id="main" className="wrap prose">
      <h1>SilentSilo on your phone</h1>
      <p className="lead">
        The Android app opens the same silo as your computer, unlocked with
        your fingerprint. It reaches the silo through its backup storage, so
        that comes first.
      </p>

      <nav className="toc" aria-label="On this page">
        <p className="toc-head">On this page</p>
        <ol>
          <li>
            <a href="#what-you-need">What you need</a>
          </li>
          <li>
            <a href="#open-your-silo-on-the-phone">Open your silo on the phone</a>
          </li>
          <li>
            <a href="#phone-backup">Phone backup: photos, videos, contacts</a>
          </li>
          <li>
            <a href="#autofill-and-passkeys">Autofill and passkeys</a>
          </li>
          <li>
            <a href="#how-it-locks">How it locks</a>
          </li>
        </ol>
      </nav>

      <h2 id="what-you-need">What you need</h2>
      <ul>
        <li>
          Android 12 or later, and the app from{" "}
          <a href={PLAY_STORE}>Google Play</a>.
        </li>
        <li>
          A fingerprint or face set up on the phone. It becomes the
          phone&apos;s key to the silo.
        </li>
        <li>
          Your recovery code, or a security key that opens the silo. The phone
          uses it once, to be let in.
        </li>
        <li>
          Backup storage the phone can reach: OneDrive, Dropbox, Google
          Drive, an S3 bucket, WebDAV or SFTP. A folder on your computer or
          a drive plugged into it is out of the phone&apos;s reach; add one
          of the others as a second copy on the computer first.
        </li>
      </ul>

      <h2 id="open-your-silo-on-the-phone">Open your silo on the phone</h2>
      <ol>
        <li>
          On the first screen, <strong>Open your silo on this phone</strong>,
          choose <strong>Set up from backup storage</strong>.
        </li>
        <li>
          Under <strong>Where is the backup?</strong>, choose the same storage
          your computer syncs to. For OneDrive, Dropbox or Google Drive, press{" "}
          <strong>Connect OneDrive</strong> (or Dropbox, or Google Drive), sign
          in in the browser, come back, and
          pick the silo under <strong>Silo folder</strong>. For the others,
          type the same details as on the computer. Press{" "}
          <strong>Continue</strong>.
        </li>
        <li>
          Under <strong>Enter your recovery code</strong>, type or paste it,
          and give the silo a name for this phone. With a security key
          instead, choose <strong>Use a security key instead</strong>.
        </li>
        <li>
          Under <strong>Let this phone unlock the silo</strong>, name the key
          and press <strong>Create key</strong>. From now on your fingerprint
          opens the silo on this phone.
        </li>
      </ol>
      <p>
        Starting from the phone works too: <strong>Make a new silo</strong>,
        then choose its backup storage. A silo already open on the phone
        changes or adds storage under <strong>Silo &gt; Backup storage</strong>
        , with <strong>Change</strong> and <strong>Add another copy</strong>.
        The storage guides cover each kind:{" "}
        <Link href="/tutorials/backup-onedrive/">OneDrive</Link>,{" "}
        <Link href="/tutorials/backup-dropbox/">Dropbox</Link>,{" "}
        <Link href="/tutorials/backup-google-drive/">Google Drive</Link>,{" "}
        <Link href="/tutorials/backup-s3/">S3</Link>,{" "}
        <Link href="/tutorials/backup-webdav/">WebDAV</Link>,{" "}
        <Link href="/tutorials/backup-sftp/">SFTP</Link>.
      </p>

      <h2 id="phone-backup">Phone backup: photos, videos, contacts</h2>
      <p>
        Under <strong>Silo &gt; Phone backup</strong>, the phone sends new
        photos, videos and contacts into the silo. Each is encrypted on the
        phone and goes to backup storage even while the silo is locked; it
        shows up under <strong>Files &gt; Phone backup</strong> the next time
        the silo is opened, here or on a computer. The originals stay on the
        phone.
      </p>
      <ul>
        <li>
          <strong>Photos</strong>, <strong>Videos</strong> and{" "}
          <strong>Contacts</strong> are separate switches. Turning photos or
          videos on asks once whether to send only new ones or everything
          already on the phone as well.
        </li>
        <li>
          <strong>Folders</strong> limits which gallery folders go: camera,
          screenshots, messaging apps. Nothing ticked means all of them.
        </li>
        <li>
          <strong>Only on Wi-Fi</strong> and{" "}
          <strong>Only while charging</strong> hold it back until then.
        </li>
      </ul>
      <p>
        Android decides when background work runs. If backups stop, set
        SilentSilo&apos;s battery use to <strong>Unrestricted</strong> in the
        phone&apos;s settings. <strong>Back up now</strong> asks it to run
        as soon as Android allows.
      </p>

      <h2 id="autofill-and-passkeys">Autofill and passkeys</h2>
      <p>
        <strong>Silo &gt; Autofill</strong> lets SilentSilo fill logins in
        other apps and in browsers. Choose SilentSilo as the autofill service
        in Android&apos;s settings; in Chrome, also turn on{" "}
        <strong>Settings, Autofill services, Autofill using another service</strong>
        . A login field then offers <strong>Fill from SilentSilo</strong>,
        after your fingerprint, with the logins whose site or app matches.
        A login typed into another app can be saved to the silo the same way.
      </p>
      <p>
        <strong>Silo &gt; Passkeys</strong> lets sites in your browser save
        passkeys in the silo and sign in with them, each time after your
        fingerprint. They sync to the silo&apos;s backup like its passwords.
        Passkeys need Android 14 or later.
      </p>

      <h2 id="how-it-locks">How it locks</h2>
      <p>
        <strong>Silo &gt; Lock in the background</strong> sets how long the
        silo stays open after you switch to another app: from{" "}
        <strong>Immediately</strong> to <strong>After 1 hour</strong>, 15
        minutes unless you choose otherwise. The time the phone spends asleep
        counts. <strong>Lock when the screen turns off</strong> locks it
        sooner. Add the <strong>Lock SilentSilo</strong> tile to Quick
        Settings, and it locks the silo from anywhere.
      </p>
      <p>
        The app&apos;s screens are kept out of screenshots and the recent
        apps view. A password copied from the app is cleared from the
        clipboard when the silo locks.
      </p>
      <MoreGuides />
    </main>
  );
}
