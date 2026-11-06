import type { Metadata } from "next";
import Link from "next/link";
import { APP_STORE, DOC_FORMATS, LATEST_RELEASE, PLAY_STORE, RELEASES } from "../links";

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
        The ones worth answering before you trust something with your files.
        Short answers, including where the answer is unwelcome.
      </p>

      <h2>Do I have to buy anything?</h2>
      <p>
        No. The app is free under AGPL-3.0, with every feature, for anyone,
        personal or company. There is no pro tier and no licence. Backup goes
        to storage you already have: your OneDrive, Dropbox, Google Drive or
        iCloud Drive, any S3-compatible bucket, a folder or network share, WebDAV, or SFTP.
      </p>

      <h2>Do I need to buy a security key?</h2>
      <p>
        No, except on Linux. On Windows 11 your phone can be the key: the
        app shows a QR code, you scan it with an iPhone (iOS 18 or later) or
        an Android phone that keeps passkeys in Google Password Manager, and
        the phone opens the silo from then on, with Bluetooth on and both
        online. Windows Hello (the fingerprint, face or PIN already set up on
        your machine) works too, on Windows 11 with the February 2026 update
        (build 26200.7840 or later) and a TPM 2.0. A Mac uses Touch ID, if it or
        its keyboard has it; the iPhone, Face ID; Android, the fingerprint. Windows 10 can use neither
        Hello nor a phone for this, so there a security key is the way in.
        A key is still worth having if you want the same silo on several
        computers, because it works on every one of them, Linux included.
      </p>

      <h2>Which security keys work?</h2>
      <p>
        Any FIDO2 key that implements the <code>hmac-secret</code> extension
        and has a PIN set, from any maker. That covers most current keys: YubiKey 5 and the
        Yubico Security Key series, Nitrokey 3, SoloKeys, Token2 and Feitian
        among them. On Windows the app talks to the same system service the
        browsers use, so a key that signs you into websites on that machine
        will work here, whatever the brand. A key without a PIN is refused
        when you add it: set one first, in the maker&apos;s tool or in
        Windows Settings. Keys that carry only the older U2F protocol do not
        work. A phone works through the QR code when
        its passkey provider offers the same extension: Google Password
        Manager on Android and iCloud Keychain on iOS 18 or later do. A
        phone that cannot is refused at enrolment with a message saying
        exactly that. Two things to know before choosing a phone: that
        passkey syncs with the account behind it, so it is not pinned to one
        device the way a hardware key is, and it opens the silo on Windows
        11 only, with the phone nearby over Bluetooth at every unlock.
      </p>

      <h2>What if I lose my security key?</h2>
      <p>
        Use another way in. You can enrol several keys, plus Windows Hello or
        the phone&apos;s fingerprint on each device you use, and any of them
        opens the silo. The recovery
        code is the last one, which is why setup asks you to write it down.
        Once you are back in, remove the lost key, then use{" "}
        <strong>Replace the encryption key</strong> in Settings &gt; Advanced.
        Removing a key alone does not stop it working. On storage that keeps
        versions, only replacing the encryption key counts.
      </p>

      <h2>What if I lose the key and the recovery code?</h2>
      <p>
        Then the files are gone, permanently, and we cannot help. There is no
        backdoor, no support override and no copy of your key on our side. It
        is the direct consequence of the thing that makes the design worth
        anything, and it is the reason the recovery code exists. Keep it
        somewhere you would keep a passport.
      </p>

      <h2>Can I get my files out without the app?</h2>
      <p>
        Yes. A release ships <code>silentsilo-extract</code>, a command-line
        tool that reads a backup and writes the files out with nothing but
        the folder and your recovery code, as separate binaries for Windows
        and Linux on x86-64 and one for every Mac, Apple silicon or Intel,{" "}
        <Link href="/tutorials/get-files-out/">downloadable here</Link>.
        The format is documented in{" "}
        <a href={DOC_FORMATS}>FORMATS.md</a> as well, so the archive can be
        read from the specification even if both the app and the tool
        disappear.
      </p>

      <h2>Is there a phone app?</h2>
      <p>
        Yes, for Android 12 or later from{" "}
        <a href={PLAY_STORE}>Google Play</a>, and for the iPhone on iOS 17 or
        later from the <a href={APP_STORE}>App Store</a>. Either opens the
        same silo as the desktop app, from the same backup storage. Android
        unlocks with the fingerprint or a security key over NFC or USB, the
        iPhone with Face ID or a security key over NFC. Both fill logins in
        other apps (Android autofill, iOS AutoFill) and can back up photos,
        videos and contacts, encrypted on the phone, once you turn that on.
      </p>

      <h2>Is there a Linux or macOS version?</h2>
      <p>
        Linux, yes: a .deb for Debian and Ubuntu and an AppImage for the
        others, on the <a href={LATEST_RELEASE}>release page</a>. It unlocks
        with a security key; Linux has no built-in equivalent of Windows
        Hello the app can use. The browser extension works with it too.
        macOS, yes: one disk image for Apple silicon and Intel Macs, macOS 13
        or later, signed and notarised. It unlocks with Touch ID or a
        security key. The extraction tool above runs on Windows, Linux and
        every Mac, so choosing this today does not tie your
        files to one operating system.
      </p>

      <h2>Does it work without sync?</h2>
      <p>
        Completely. A silo that never connects to backup storage is fully usable,
        and nothing in it expires or waits on a server. Sync is something you switch on when you want a second
        machine or a backup, not a mode the app needs.
      </p>

      <h2>Can I use it as a proper backup, not just a vault?</h2>
      <p>
        That is what the archive features are for. Point a silo at several
        destinations, including an external drive that is usually unplugged,
        make one of them a never-delete copy so the app does not delete from it,
        and ask it to keep a full copy on the machine. Settings &gt; Backup then
        tells you how many complete copies actually exist and how far behind
        each one is.
      </p>

      <h2>What if I lose access to the storage I back up to?</h2>
      <p>
        The silo is on your disk and keeps working; the app does not check a
        licence. What you would lose is that one copy, which is an argument
        for having a second destination anyway. Moving to another provider is
        a copy between destinations, and since everything stored is
        ciphertext, it needs no key and no re-upload from the original files.
      </p>

      <h2>Can several people share a silo?</h2>
      <p>
        Several devices, yes: enrol a key on each and they all reach the same
        silo. What does not exist is per-person access, so everyone who can
        open a silo can open all of it. For a household or a small team
        sharing one archive that is usually what you want; for anything
        needing separate permissions, it is the wrong tool.
      </p>

      <h2>Can a company use this for its employees?</h2>
      <p>
        Yes, and there is a setting for the part that usually stops companies:
        what happens when the employee leaves. A silo can be created as
        administered by an organisation, which carries a key the company
        holds. On the computer it was set up on, the app does not let the
        employee remove that key, or change the recovery code, without it.
        What makes it stick is a never-delete copy on the company&apos;s own
        storage. The company can then open its own archive later. It is
        chosen once, while the silo is being created, so the app offers no
        way to turn it on behind somebody who is already using a silo. The
        computer where the silo was created, and any computer set up with a
        company key, show the company&apos;s keys with an Organisation badge;
        a computer set up with your own key or the recovery code lists them
        as ordinary keys. Nothing about it costs money:
        every feature is in every copy. The setup, step by step, is in{" "}
        <Link href="/tutorials/organisation-silos/">
          Silos for a team or a company
        </Link>
        .
      </p>

      <h2>Will an update ever stop my silo from opening?</h2>
      <p>
        That is the failure we treat as the worst one. Every stored format
        carries a version. A silo written by each released format is kept in
        the repository and opened by the current build on every test run, so
        a change that would read your silo differently fails the suite before
        it can reach you, and the current state of each format is written
        down in <a href={DOC_FORMATS}>FORMATS.md</a>. A build that met a
        format it did not know would have to say so and stop, rather than
        damage anything.
      </p>

      <h2>How do I know the download is the real one?</h2>
      <p>
        Every file on the <a href={RELEASES}>releases page</a> ships with a
        signature next to it, made with a key whose public half is in the
        repository. Updates are checked against that same key by the app
        itself before anything is installed, and an update that key did not
        sign is refused. Where each
        signature is made, and what that does and does not prove, is on{" "}
        <Link href="/security/">Security</Link>.
      </p>

      <h2>Something else</h2>
      <p>
        Write to{" "}
        <a href="mailto:contact@silentsilo.com">contact@silentsilo.com</a>, or{" "}
        <a href="mailto:security@silentsilo.com">security@silentsilo.com</a>{" "}
        if it is a vulnerability. It is one person reading, so give it a day.
      </p>
    </main>
  );
}
