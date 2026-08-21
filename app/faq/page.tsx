import type { Metadata } from "next";
import Link from "next/link";
import { DOC_FORMATS, RELEASES } from "../links";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "What happens if you lose the key, whether you have to buy anything, how to get files out without the app, and when Linux and macOS might happen.",
};

export default function Faq() {
  return (
    <main className="wrap prose">
      <h1>Questions</h1>
      <p className="lead">
        The ones worth answering before you trust something with your files.
        Short answers, including where the answer is unwelcome.
      </p>

      <h2>Do I have to buy anything?</h2>
      <p>
        No. The app is free under AGPL-3.0, with every feature, for anyone,
        personal or company. There is no pro tier and no licence. Backup goes
        to storage you already have: any S3-compatible bucket, a folder or
        network share, WebDAV, or SFTP.
      </p>

      <h2>Do I need to buy a security key?</h2>
      <p>
        No. Windows Hello, meaning the fingerprint, face or PIN already set
        up on your machine, unlocks a silo on its own. A FIDO2 key is worth
        it if you want the same silo on several machines, because a key
        travels and Hello is sealed to one computer.
      </p>

      <h2>Which security keys work?</h2>
      <p>
        Any FIDO2 key that implements the <code>hmac-secret</code> extension,
        from any maker. That covers most current keys: YubiKey 5 and the
        Yubico Security Key series, Nitrokey 3, SoloKeys, Token2 and Feitian
        among them. On Windows the app talks to the same system service the
        browsers use, so a key that signs you into websites on that machine
        will work here, whatever the brand. Keys that carry only the older
        U2F protocol do not work. A phone can work through the QR code, but
        only if its passkey provider offers the same extension, which is
        theirs to support or not and changes between versions. Rather than
        guess on your behalf, the app tries: a phone that cannot produce it
        is refused at enrollment with a message saying exactly that. One
        thing to know
        before choosing a phone: that passkey syncs with the account behind
        it, so it is not pinned to one device the way a hardware key is, and
        every unlock needs the phone nearby over Bluetooth.
      </p>

      <h2>What if I lose my security key?</h2>
      <p>
        Use another way in. You can enrol several keys, plus Windows Hello on
        each machine you use, and any of them opens the silo. The recovery
        code is the last one, which is why setup makes you write it down.
        Once you are back in, remove the lost key so it stops working.
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
        the folder and your recovery code, as separate binaries for Windows,
        Linux and macOS. The format is documented in{" "}
        <a href={DOC_FORMATS}>FORMATS.md</a> as well, so the archive can be
        read from the specification even if both the app and the tool
        disappear.
      </p>

      <h2>Is there a Linux or macOS version?</h2>
      <p>
        Not yet, and there is no date. The app is Windows only, and saying
        &quot;coming soon&quot; about something with no schedule would be
        worth less than the truth. What does run on all three is the
        extraction tool above, so choosing this today does not put your
        files on one operating system for good.
      </p>

      <h2>Does it work without sync?</h2>
      <p>
        Completely. A silo that never connects to storage is fully usable,
        forever. Sync is something you switch on when you want a second
        machine or a backup, not a mode the app needs.
      </p>

      <h2>Can I use it as a proper backup, not just a vault?</h2>
      <p>
        That is what the archive features are for. Point a silo at several
        destinations, including an external drive that is usually unplugged,
        mark one of them append-only so the app can never delete from it,
        and ask it to keep a full copy on the machine. The Copies panel then
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
        administered by an organisation, which keeps a key the company holds and
        that the employee cannot remove, and without which the recovery code
        cannot be changed either. The company can then open its own archive
        later. It is chosen once, while the silo is being created, and it is
        visible on every device, so it cannot be turned on quietly behind
        somebody who is already using a silo. Nothing about it costs money:
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
        itself before anything is installed, so a compromised download
        endpoint cannot ship you code that key did not sign. Where each
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
