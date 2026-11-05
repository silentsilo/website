import type { Metadata } from "next";
import Link from "next/link";
import { MoreGuides } from "../MoreGuides";

export const metadata: Metadata = {
  title: "Back up to iCloud Drive",
  description:
    "Keep the silo's encrypted copy in your own iCloud Drive: set it up on the iPhone, then open it on a Mac or on Windows with iCloud for Windows. No sign-in in the app.",
};

export default function BackupIcloud() {
  return (
    <main id="main" className="wrap prose">
      <h1>Back up to iCloud Drive</h1>
      <p className="lead">
        If you have an iPhone, you already have iCloud Drive. SilentSilo
        writes the silo&apos;s encrypted copy into its own folder there, and
        iCloud keeps it in step under your Apple account. There is nothing to
        sign in to in the app: it uses the device&apos;s own iCloud.
      </p>

      <nav className="toc" aria-label="On this page">
        <p className="toc-head">On this page</p>
        <ol>
          <li>
            <a href="#before-you-start">Before you start</a>
          </li>
          <li>
            <a href="#on-the-iphone">On the iPhone</a>
          </li>
          <li>
            <a href="#on-a-mac-or-windows">On a Mac or Windows</a>
          </li>
          <li>
            <a href="#what-apple-sees">What Apple sees</a>
          </li>
          <li>
            <a href="#devices-without-icloud">Devices without iCloud</a>
          </li>
        </ol>
      </nav>

      <h2 id="before-you-start">Before you start</h2>
      <ul>
        <li>
          iCloud Drive turned on, on every device that uses the silo, with the
          same Apple account. On the iPhone: <strong>Settings</strong>, your
          name, <strong>iCloud</strong>, <strong>iCloud Drive</strong>.
        </li>
        <li>
          On Windows, iCloud for Windows from the Microsoft Store, signed in,
          with iCloud Drive ticked.
        </li>
        <li>
          Room in your iCloud storage for the silo. The free 5 GB fills up
          quickly with photos.
        </li>
      </ul>

      <h2 id="on-the-iphone">On the iPhone</h2>
      <p>
        Start here. SilentSilo&apos;s folder in iCloud Drive only exists once
        the iPhone app has used it, and the computers look for that folder.
      </p>
      <ol>
        <li>
          For a silo already open on the iPhone, open{" "}
          <strong>Silo &gt; Backup storage</strong>. For a new silo, the step
          comes after you create it.
        </li>
        <li>
          Choose <strong>iCloud Drive</strong> and give the copy a name. That
          name is the folder Apple sees.
        </li>
        <li>
          Save. The app writes the encrypted copy, and iCloud uploads it
          when the iPhone has a connection.
        </li>
      </ol>

      <h2 id="on-a-mac-or-windows">On a Mac or Windows</h2>
      <ol>
        <li>
          Wait a minute or two after the iPhone has written, so iCloud brings
          the folder to the computer.
        </li>
        <li>
          To add iCloud Drive to a silo you already have on the computer,
          open <strong>Settings &gt; Backup</strong> and press{" "}
          <strong>Add another copy</strong>. To set the silo up on a new
          computer, choose <strong>Set up from backup storage</strong> on the
          first screen.
        </li>
        <li>
          Choose <strong>iCloud Drive</strong>. The form checks that{" "}
          <strong>SilentSilo&apos;s folder in iCloud Drive is on this
          computer</strong>. If it says the folder is not there yet, press{" "}
          <strong>Check again</strong> once iCloud has caught up.
        </li>
        <li>
          Adding a copy, type the same name as on the iPhone, so both write
          to one folder, and save. Setting up, pick the silo from the ones
          the folder holds and continue with your key or recovery code, as in
          the <Link href="/tutorials/several-devices/">several devices</Link>{" "}
          guide.
        </li>
      </ol>
      <p>
        On Windows, iCloud for Windows may download a file only when it is
        needed. If SilentSilo says iCloud Drive is still downloading
        something, try again a moment later.
      </p>

      <h2 id="what-apple-sees">What Apple sees</h2>
      <p>
        Everything is encrypted on your device before iCloud gets it. Apple
        sees the folder name you chose and the encrypted objects inside it,
        with their sizes and times. It cannot read your file names, contents
        or passwords. SilentSilo never sees your Apple account, and nothing
        passes through us.
      </p>

      <h2 id="devices-without-icloud">Devices without iCloud</h2>
      <p>
        Android and Linux cannot reach iCloud Drive. If you use one of them
        too, add a second copy that every device can reach, such as{" "}
        <Link href="/tutorials/backup-onedrive/">OneDrive</Link>,{" "}
        <Link href="/tutorials/backup-google-drive/">Google Drive</Link> or
        an <Link href="/tutorials/backup-s3/">S3 bucket</Link>. A second copy
        somewhere other than Apple is worth having anyway.
      </p>
      <MoreGuides />
    </main>
  );
}
