import type { Metadata } from "next";
import Link from "next/link";
import { RELEASES_REPO } from "../links";

export const metadata: Metadata = {
  title: "Security",
  description:
    "What SilentSilo encrypts, with what, and what it defends against. The threat model in plain language.",
};

export default function Security() {
  return (
    <main className="wrap prose">
      <h1>Security</h1>
      <p className="lead">
        The threat model in plain language. The full specification, including
        formats and parameters, lives in the repository as{" "}
        <a href="https://github.com/silentsilo/desktop/blob/main/docs/CRYPTO.md">
          docs/CRYPTO.md
        </a>{" "}
        and is the reference when the two disagree.
      </p>

      <h2>What is encrypted, with what</h2>
      <table>
        <thead>
          <tr>
            <th>Asset</th>
            <th>Protection at rest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>File contents</td>
            <td>AES-256-GCM, chunked, under the vault key</td>
          </tr>
          <tr>
            <td>File and folder names, the tree</td>
            <td>AES-256-GCM encrypted index</td>
          </tr>
          <tr>
            <td>Credentials, including TOTP secrets</td>
            <td>
              Sealed one entry at a time, on top of the encrypted index
            </td>
          </tr>
          <tr>
            <td>The vault key itself</td>
            <td>
              Wrapped per enrolled key, derived from FIDO2{" "}
              <code>hmac-secret</code> output
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Who sees what</h2>
      <p>
        <strong>Us: your app version.</strong> There is no account and no
        server holding your data. The only thing that reaches us is the
        update check, at most once a day, carrying the version and platform
        and nothing else. It can be turned off in Settings. Everything else
        the app does over the network is the sync you configured yourself,
        plus two things that involve neither us nor your storage and that
        both stay silent until you ask for them: the breach check in Health,
        which runs only when you press it and sends five characters of a
        password hash to Have I Been Pwned, and site icons in Credentials,
        off by default, which fetch each saved site&apos;s own icon from that
        site. The <Link href="/privacy/">privacy page</Link> lists all four.
      </p>
      <p>
        <strong>Your storage provider:</strong> ciphertext blobs, encrypted
        operation records, and per-key envelopes that are themselves
        ciphertext. Readable by design: one small manifest naming a random
        vault id, each envelope&apos;s credential id and label, and the
        ordinary shape of storage itself, meaning how many objects exist,
        their sizes, and when they change. Not readable: contents, file and
        folder names, and the structure of the tree.
      </p>
      <p>
        <strong>Someone holding your silo folder:</strong> ciphertext and a
        public salt. Without an enrolled security key or the recovery code,
        that is where it ends.
      </p>
      <p>
        <strong>Your employer, if they set the silo up for you:</strong> a silo
        can be created as administered by an organisation, and then it carries a
        key the company keeps. It is what lets a company still open its own
        archive after somebody leaves. Two things are worth knowing if you are
        the one using such a silo. It cannot be done to a silo you already have:
        the choice exists only while a silo is being created, and it is off
        unless somebody ticks it. And it is never hidden from you: every device
        lists those keys with an Organisation badge. What the company can do is
        open the silo and administer its keys. What nobody can do, the company
        included, is read anything without one of the enrolled keys. The
        company&apos;s side of the procedure is in{" "}
        <Link href="/tutorials/organisation-silos/">
          Silos for a team or a company
        </Link>
        .
      </p>

      <h2>Why there is no passphrase</h2>
      <p>
        A silo is exactly as strong as its weakest envelope. A memorable
        passphrase is around forty bits, and offering one would quietly make
        it the real security of the whole design. Unlocking is therefore
        bound to hardware (a FIDO2 key, or the TPM behind Windows Hello), and
        the only fallback is a generated 160-bit recovery code meant to be
        written on paper.
      </p>

      <h2>Protect the backup itself</h2>
      <p>
        Encryption does not stop a delete. Malware that reaches your storage
        credentials, or a plain mistake, can erase ciphertext it cannot
        read. For anything you would grieve over, keep one backup target the
        app cannot delete from: tick &quot;never delete anything here&quot;
        when adding it, and on providers with object lock, set a retention
        window; in compliance mode not even the account owner can override
        it before it expires. Versioning alone is not protection, and one
        wrong lifecycle rule can quietly empty an archive. The full guide,
        including provider-specific settings, is{" "}
        <a href="https://github.com/silentsilo/desktop/blob/main/docs/STORAGE.md">
          docs/STORAGE.md
        </a>
        .
      </p>

      <h2>A malicious storage provider</h2>
      <p>
        Every stored object is authenticated (AES-GCM). A provider can
        withhold or delete objects, which breaks sync, but it cannot read
        your data, alter it undetected, or inject operations. Infrastructure
        can stop the service; it cannot corrupt it. The same holds for the{" "}
        <a href={RELEASES_REPO}>update endpoint</a>: releases are verified
        against a signing key embedded in the app, so the endpoint cannot
        ship you code we did not sign.
      </p>

      <h2>No independent audit, yet</h2>
      <p>
        Nobody outside the project has been paid to attack this. That belongs
        on this page rather than in a footnote, because it is the assurance
        people assume is behind a product like this one.
      </p>
      <p>
        What exists instead is everything needed to review the design: the
        cryptography is specified in{" "}
        <a href="https://github.com/silentsilo/desktop/blob/main/docs/CRYPTO.md">
          docs/CRYPTO.md
        </a>
        , the formats and their versions in{" "}
        <a href="https://github.com/silentsilo/desktop/blob/main/FORMATS.md">
          FORMATS.md
        </a>
        , the threat model on this page including the parts that are
        inconvenient, and the whole source is public and buildable. A
        reviewable design is worth a great deal and is not an audit, and
        saying otherwise would be the sort of claim this project exists to
        avoid.
      </p>
      <p>
        So: a serious flaw could sit in code that reads correctly and passes
        its tests. If your threat model includes a well-resourced adversary,
        or disclosure would be severe for you, that absence should weigh in
        your decision. When an audit is done it will be published here,
        whatever it finds.
      </p>

      <h2>What this does not defend against</h2>
      <p>
        Malware running as you while a silo is <strong>unlocked</strong>. The
        key has to be in memory for anything to decrypt, so software on that
        machine can reach it. No desktop application honestly claims
        otherwise, and this one does not.
      </p>
      <p>
        What it does instead is remove the cheap ways in and shorten the
        window. Silos lock when the workstation locks, disconnects or
        suspends, rather than waiting out the idle timer. Password entries
        are encrypted individually, so they are not readable from the
        working index. Copied passwords are kept out of Windows Clipboard
        History and Cloud Clipboard, and cleared after 45 seconds. At startup
        the process asks Windows to close the injection paths the system
        would otherwise walk on an attacker&apos;s behalf, and to refuse any
        image that is not Microsoft-signed, which stops a DLL dropped beside
        the executable from being loaded. Those are requests to the
        operating system: a Windows build that does not know a policy simply
        declines it, and the app starts anyway rather than refusing to run
        over a mitigation it cannot have.
      </p>
      <p>
        Also out of scope: someone using your already-unlocked session, and a
        stolen security key together with your written recovery code. These
        are stated limits, not surprises.
      </p>

      <h2>Checking what you downloaded</h2>
      <p>
        The installer and the extraction tool are published with a signature
        file beside them. The installer is signed on a machine here, with a
        key that never reaches a build server. The Linux and macOS
        extractors are built and signed by GitHub Actions, from a key held in
        that repository&apos;s secrets, because those two platforms cannot be
        built here; so for them the signature says the release pipeline
        produced the file, not that a key outside GitHub did. Worth knowing
        rather than glossed over, and the Windows extractor is signed with
        the installer. The public half of the key is in the repository, in{" "}
        <a href="https://github.com/silentsilo/desktop/blob/main/src-tauri/tauri.conf.json">
          tauri.conf.json
        </a>
        , and{" "}
        <a href="https://jedisct1.github.io/minisign/">minisign</a> checks a
        download against it in one command. The app carries that same key
        compiled in and verifies every update before installing it, so the
        release endpoint cannot serve you code that was not signed with it.
      </p>
      <p>
        This matters most for the extraction tool, which is what someone
        reaches for when they have lost confidence in everything else. Being
        able to answer &quot;is this the binary the project published&quot;
        should not require trusting the place it was downloaded from.
      </p>

      <h2>Reporting</h2>
      <p>
        Vulnerabilities go to{" "}
        <a href="mailto:security@silentsilo.com">security@silentsilo.com</a>,
        privately. Every release is free and complete, so a security fix
        reaches everyone the same way.
      </p>
    </main>
  );
}
