import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Back up to kDrive",
  description:
    "Keep an encrypted copy of your silo in Infomaniak's kDrive, over WebDAV: the kDrive ID, an app password, and the same on a phone.",
};

export default function BackupKDrive() {
  return (
    <main id="main" className="wrap prose">
      <h1>Back up to kDrive</h1>
      <p className="lead">
        kDrive is Infomaniak&apos;s storage, kept in data centres in
        Switzerland. It speaks WebDAV, and the app has a form for it that
        builds the address for you: you need the number of your kDrive and
        an application password.
      </p>

      <div className="notice">
        <strong>Check your plan first.</strong> Infomaniak does not offer
        WebDAV with kSuite Free, kSuite Standard, my kSuite or my kSuite+, so
        those cannot hold a silo. A kDrive plan with WebDAV access can.
      </div>

      <nav className="toc" aria-label="On this page">
        <p className="toc-head">On this page</p>
        <ol>
          <li>
            <a href="#find-your-kdrive-id">Find your kDrive ID</a>
          </li>
          <li>
            <a href="#make-an-app-password">Make an app password</a>
          </li>
          <li>
            <a href="#set-it-up-in-the-app">Set it up in the app</a>
          </li>
          <li>
            <a href="#on-a-phone">On a phone</a>
          </li>
          <li>
            <a href="#what-infomaniak-sees">What Infomaniak sees</a>
          </li>
        </ol>
      </nav>

      <h2 id="find-your-kdrive-id">Find your kDrive ID</h2>
      <p>
        Open kDrive in your browser and look at the address bar: it holds{" "}
        <code>/drive/</code> followed by a number, as in{" "}
        <code>…/kdrive/app/drive/123456/</code>. That number is the ID; if
        the address holds other numbers too, it is still the one after{" "}
        <code>/drive/</code>. You can also paste the whole address into the
        app, which keeps only that number.
      </p>

      <h2 id="make-an-app-password">Make an app password</h2>
      <p>
        Infomaniak&apos;s own WebDAV guides ask for an application password,
        not the one you sign in with, and it works with two-step sign-in on.
        Infomaniak&apos;s{" "}
        <a href="https://www.infomaniak.com/en/support/faq/2855/manage-application-passwords">
          guide to application passwords
        </a>{" "}
        opens the right page of the Manager: generate one, name it
        SilentSilo, and copy it, since it is shown once. It can be revoked on
        its own later, without changing anything else.
      </p>

      <h2 id="set-it-up-in-the-app">Set it up in the app</h2>
      <ol>
        <li>
          Unlock the silo and open <strong>Settings &gt; Backup</strong>, or
          press <strong>Add another copy</strong> for a second copy.
        </li>
        <li>
          Choose <strong>WebDAV server</strong>, then under{" "}
          <strong>Server</strong> choose <strong>kDrive (Infomaniak)</strong>.
        </li>
        <li>
          Fill in <strong>kDrive ID</strong>. Keep{" "}
          <strong>Folder in kDrive</strong> as <code>SilentSilo</code> or type
          another; it is created if it does not exist. Give each silo its
          own folder.
        </li>
        <li>
          Fill in <strong>Infomaniak email</strong> and, under{" "}
          <strong>Password</strong>, the app password.
        </li>
        <li>
          Press <strong>Test connection</strong>: the app writes a small file,
          reads it back and deletes it. Then <strong>Save and connect</strong>,
          or <strong>Add this copy</strong>.
        </li>
      </ol>
      <p>
        The app builds the address{" "}
        <code>https://123456.connect.kdrive.infomaniak.com/SilentSilo</code>{" "}
        from what you typed. The settings show it as a WebDAV copy, and{" "}
        <strong>Edit</strong> opens the kDrive form again.
      </p>

      <h2 id="on-a-phone">On a phone</h2>
      <p>
        The Android app has no kDrive form, but it takes the same address. In{" "}
        <strong>Silo &gt; Backup storage</strong>, or under{" "}
        <strong>Where is the backup?</strong> when you set the silo up on the
        phone, choose <strong>WebDAV</strong> and enter the address the
        computer built, with your Infomaniak email and the app password. Use
        the same folder as the computer: it is one silo, and both must find it
        in the same place.
      </p>

      <h2 id="what-infomaniak-sees">What Infomaniak sees</h2>
      <p>
        The silo is encrypted before it leaves your device. Infomaniak sees
        your account, the name of the folder, and how many encrypted objects
        there are, their sizes and when they change; never the names or the
        contents of your files. Do not edit or move anything inside the
        folder in kDrive: to the app it is a database.
      </p>
      <p>
        For why a Swiss provider can suit someone in the European Union, and
        the other European options, see{" "}
        <Link href="/europe/">SilentSilo in the European Union</Link>. The{" "}
        <Link href="/tutorials/backup-webdav/">WebDAV guide</Link> covers the
        error numbers a WebDAV server can answer with.
      </p>
      <p className="tut-back">
        <Link href="/tutorials/">All tutorials</Link>
      </p>
    </main>
  );
}
