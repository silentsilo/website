import type { Metadata } from "next";
import Link from "next/link";
import {
  LATEST_INSTALLER_NAME,
  LINUX_PACKAGES,
  MOBILE_REPO,
  PLAY_STORE,
  RELEASES,
  RELEASES_REPO,
} from "../links";

/** The minisign public key, as in core's SIGNING-PUBKEY.txt. */
const UPDATE_PUBKEY = "RWS3eVy3IDLlean9BrZWUaxbTyj+oKfoc4g+IJ6xaAhUwbV8v8WnDbZP";
const LINUX_DEB = LINUX_PACKAGES[0].file;

export const metadata: Metadata = {
  title: "Security",
  description:
    "What SilentSilo encrypts, with what, and what it defends against. The threat model in plain language.",
};

export default function Security() {
  return (
    <main id="main" className="wrap prose">
      <h1>Security</h1>
      <p className="lead">
        The threat model in plain language. The full specification, including
        formats and parameters, lives in the repository as{" "}
        <a href="https://github.com/silentsilo/core/blob/main/docs/CRYPTO.md">
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
            <td>
              AES-256-GCM, chunked, each file under a key of its own that is
              wrapped in turn under the vault key
            </td>
          </tr>
          <tr>
            <td>File and folder names, the tree</td>
            <td>
              AES-256-GCM encrypted index in the silo; on the computer, a
              SQLCipher working copy whose key is sealed under the vault key
            </td>
          </tr>
          <tr>
            <td>Passwords, including TOTP secrets</td>
            <td>
              Sealed one entry at a time, on top of the encrypted index
            </td>
          </tr>
          <tr>
            <td>The vault key itself</td>
            <td>
              Wrapped separately for each way in: FIDO2{" "}
              <code>hmac-secret</code> for security keys and Windows Hello,
              the Android Keystore, the Mac&apos;s Secure Enclave behind Touch
              ID, and the recovery code through Argon2id (64 MiB, 3 passes)
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Who sees what</h2>
      <p>
        <strong>Us: your app version.</strong> There is no account and no
        server holding your data. The only thing that reaches us is the
        update check. The automatic check runs at most once a day and carries
        the app version, the platform and the processor type; the{" "}
        <strong>Check for updates</strong> button asks whenever you press it.
        The automatic check can be turned off in Settings. Everything else
        the app does over the network is the sync you configured yourself,
        the download from GitHub when you choose to install an update,
        plus two things that involve neither us nor your storage and that
        both stay silent until you ask for them: the breach check in Health,
        which runs only when you press it and sends five characters of a
        password hash to Have I Been Pwned, and site icons in Passwords,
        off by default, which fetch each saved site&apos;s own icon from that
        site. The <Link href="/privacy/">privacy page</Link> lists them all.
      </p>
      <p>
        <strong>Your storage provider:</strong> encrypted files, encrypted
        operation records, and one envelope per key whose wrapped key is
        encrypted. Readable without any key: one small manifest naming a
        random vault id; each key&apos;s credential id and the label you gave
        it; how many devices write to the silo and when each operation was
        made; whether a recovery code exists and when it was made; the ids
        of keys removed from the silo; and the ordinary shape of storage
        itself, meaning how many objects exist, their sizes, and when they
        change. Not readable without a key: contents, the names of your
        files and folders, and the structure of the tree. The name of the
        silo folder itself, which you type when you connect, is readable,
        and at OneDrive, Dropbox and Google Drive so is the account it
        belongs to. The full list is in{" "}
        <a href="https://github.com/silentsilo/core/blob/main/docs/CRYPTO.md#what-the-storage-provider-learns">
          CRYPTO.md
        </a>
        .
      </p>
      <p>
        Each stored file also carries a hash of its unencrypted content in
        the clear. A provider that already has a copy of a file can confirm
        you stored it, and the same file in two silos carries the same hash.
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
        the one using such a silo. The app does not offer it for a silo you
        already have: the choice exists only while a silo is being created,
        and it is off unless somebody ticks it. And it is shown to you: the
        computer where the silo was created, and any computer set up with a
        company key, list those keys with an Organisation badge. A computer
        set up with your own key or the recovery code lists them too, as
        ordinary keys. What the company can do is open the silo and
        administer its keys. The design gives nobody, the company included,
        a way to read anything without one of the enrolled keys or the
        recovery code. The company&apos;s side of the procedure is in{" "}
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
        bound to hardware (a FIDO2 key, the TPM behind Windows Hello, the
        Secure Enclave behind Touch ID on a Mac, or a key in an Android
        phone&apos;s secure hardware that its fingerprint releases), and the
        only fallback is a generated 160-bit recovery code meant to be
        written on paper.
      </p>

      <h2>Protect the backup itself</h2>
      <p>
        Encryption does not stop a delete. Malware that reaches your storage
        credentials, or a plain mistake, can erase ciphertext it cannot
        read. For anything you would grieve over, keep one never-delete
        copy: tick &quot;Never-delete copy&quot; when adding it, and on
        providers with object lock, set a retention
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
        File contents, names and records are sealed with AES-256-GCM, and
        each reader checks that an object&apos;s name matches what is inside
        it. Storage can still withhold or delete objects, or put back older
        ones, which can stop sync or bring back something you removed. The
        design is meant to keep storage from reading your data or forging a
        change.{" "}
        <a href="https://github.com/silentsilo/core/blob/main/docs/CRYPTO.md">
          CRYPTO.md
        </a>{" "}
        lists what storage can and cannot do. Updates from the{" "}
        <a href={RELEASES_REPO}>update endpoint</a> are checked against a
        signing key built into the app, and one that does not verify is not
        installed.
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
        <a href="https://github.com/silentsilo/core/blob/main/docs/CRYPTO.md">
          docs/CRYPTO.md
        </a>
        , the formats and their versions in{" "}
        <a href="https://github.com/silentsilo/core/blob/main/FORMATS.md">
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
        machine can reach it. That holds for any desktop application, this
        one included.
      </p>
      <p>
        What it does instead is remove the cheap ways in and shorten the
        window. Silos lock when the workstation locks, disconnects or
        suspends on Windows, and when the screen locks or the machine sleeps
        on Linux and macOS, rather than waiting out the idle timer. Password entries
        are encrypted individually, so they are not readable from the
        working index. Copied passwords are kept out of Windows Clipboard
        History and Cloud Clipboard, and cleared after 45 seconds. At startup
        the process asks Windows to disable extension points, the injection
        paths such as AppInit_DLLs and window hooks that the system would
        otherwise walk on an attacker&apos;s behalf. That is a request to the
        operating system: a Windows build that does not know the policy
        declines it, and the app starts anyway. It does not stop a DLL
        dropped beside the executable. The install is per-user, so whoever
        can write there can replace the executable itself, and no policy a
        process sets for itself prevents that.
      </p>
      <p>
        On Android the app&apos;s screens are kept out of screenshots, screen
        recordings and the recent-apps view. The same limit applies there:
        software that controls an unlocked phone can reach what is open.
      </p>
      <p>
        Also out of scope: someone using your already-unlocked session, and
        someone who has a copy of the silo together with a way in. One
        enrolled security key is enough, with a touch and no PIN, and so is
        the recovery code on its own. The threat model in CRYPTO.md
        describes both.
      </p>

      <h2 id="checking-what-you-downloaded">Checking what you downloaded</h2>
      <p>
        The installer and the extraction tool are published with a signature
        file beside them. The Windows installer is built on a machine here
        and carries an Authenticode signature from a certificate on a
        hardware token that no build server can reach. GitHub Actions builds
        the Linux packages and the Linux and macOS extractors, unsigned, with
        build provenance anyone can check with{" "}
        <code>gh attestation verify &lt;file&gt; --repo silentsilo/desktop</code>
        . The release machine checks that provenance, then signs every file
        with the update key, which is not on GitHub. The macOS app is built,
        signed with the company&apos;s Developer ID and notarised on a Mac.
        The public half of the update key is published in both
        repositories, in{" "}
        <a href="https://github.com/silentsilo/core/blob/main/SIGNING-PUBKEY.txt">
          SIGNING-PUBKEY.txt
        </a>
        {" "}and in{" "}
        <a href="https://github.com/silentsilo/desktop/blob/main/src-tauri/tauri.conf.json">
          tauri.conf.json
        </a>
        . The app carries that same key compiled in and verifies every update
        before installing it, and refuses one the key did not sign.
      </p>
      <p>
        To check a file yourself, download it and its <code>.sig</code> from
        the <a href={RELEASES}>release page</a>. The <code>.sig</code> is a{" "}
        <a href="https://jedisct1.github.io/minisign/">minisign</a> signature
        wrapped in base64, so decode it first, then verify. On Linux or macOS:
      </p>
      <pre>
        <code>
          {`base64 -d ${LINUX_DEB}.sig > ${LINUX_DEB}.minisig
minisign -Vm ${LINUX_DEB} -x ${LINUX_DEB}.minisig \\
  -P ${UPDATE_PUBKEY}`}
        </code>
      </pre>
      <p>On Windows, in PowerShell, from the folder holding both files:</p>
      <pre>
        <code>
          {`[IO.File]::WriteAllBytes("$PWD\\${LATEST_INSTALLER_NAME}.minisig",
  [Convert]::FromBase64String((Get-Content ${LATEST_INSTALLER_NAME}.sig -Raw)))
minisign -Vm ${LATEST_INSTALLER_NAME} -x ${LATEST_INSTALLER_NAME}.minisig -P ${UPDATE_PUBKEY}`}
        </code>
      </pre>
      <p>
        A good file prints <code>Signature and comment signature verified</code>,
        and the trusted comment below it names the file that was signed. If it
        prints anything else, do not run the file.
      </p>
      <p>
        The Windows installer and the Windows extraction tool also carry an
        Authenticode signature. Right-click the file, open Properties, then
        Digital Signatures: the signer is SOFTWARE HIVE S.R.L. In PowerShell,{" "}
        <code>Get-AuthenticodeSignature .\{LATEST_INSTALLER_NAME}</code> should
        report <code>Valid</code> with that name in the signer certificate.
      </p>
      <p>
        The Android app comes from{" "}
        <a href={PLAY_STORE}>Google Play</a>, which signs what it delivers
        with a key Google holds, as it does for every app there. The source
        it is built from is in{" "}
        <a href={MOBILE_REPO}>silentsilo/mobile</a>.
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
