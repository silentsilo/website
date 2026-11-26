import type { Metadata } from "next";
import Link from "next/link";
import {
  APP_STORE,
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
              <code>hmac-secret</code> for security keys, Windows Hello and
              a phone over the QR code,
              the Android Keystore, the Secure Enclave behind Touch ID on a
              Mac and Face ID on an iPhone, and the recovery code through Argon2id (64 MiB, 3 passes)
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Who sees what</h2>
      <p>
        <strong>Us:</strong> there is no account and no server holding your
        data. The only request that reaches us is the update check, which you
        can turn off in Settings. Every request the app makes is listed on
        the <Link href="/privacy/">privacy page</Link>.
      </p>
      <p>
        <strong>Your storage provider:</strong> encrypted files and records.
        It cannot read contents, file and folder names, or the tree. It can
        see the silo folder&apos;s name, the account at OneDrive, Dropbox and
        Google Drive, how many objects there are with their sizes and times,
        how many devices write, the label you gave each key, and whether a
        recovery code exists. Each file also carries a hash of its content, so
        a provider that already has a copy of that file can tell you stored
        it. The full list is in{" "}
        <a href="https://github.com/silentsilo/core/blob/main/docs/CRYPTO.md#what-the-storage-provider-learns">
          CRYPTO.md
        </a>
        .
      </p>
      <p>
        <strong>Someone holding your silo folder:</strong> what the storage
        provider sees, listed above, and nothing more. Without an enrolled
        key or the recovery code, that is where it ends.
      </p>
      <p>
        <strong>Your employer, if they set the silo up for you:</strong> a silo
        created as administered by an organisation carries a key the company
        keeps, so the company can open it after you leave. It can only be
        chosen when the silo is created, and the company&apos;s keys are listed
        in Settings with the others. Details are in{" "}
        <Link href="/tutorials/organisation-silos/">
          Silos for a team or a company
        </Link>
        .
      </p>

      <h2>Why there is no passphrase</h2>
      <p>
        A silo is as strong as its weakest way in, and a password someone can
        remember is far easier to guess than a key. So unlocking is tied to
        hardware: a FIDO2 key, the TPM behind Windows Hello, the Secure
        Enclave behind Touch ID and Face ID, the Android Keystore, or a
        phone&apos;s passkey over the QR code. The fallback is a generated
        160-bit recovery code you write on paper.
      </p>

      <h2>Protect the backup itself</h2>
      <p>
        Encryption does not stop a delete. Malware that reaches your storage
        credentials, or a mistake, can erase files it cannot read. Keep one
        never-delete copy: tick &quot;Never-delete copy&quot; when you add it,
        and where the provider offers object lock, set a retention period.
        The guide, with provider settings, is{" "}
        <a href="https://github.com/silentsilo/desktop/blob/main/docs/STORAGE.md">
          docs/STORAGE.md
        </a>
        .
      </p>

      <h2>A malicious storage provider</h2>
      <p>
        Storage cannot read your data or forge a change: everything is sealed
        with AES-256-GCM, and each object is checked against its name. It can
        still withhold or delete objects, or put back older ones, which can
        stop sync or bring back something you removed.{" "}
        <a href="https://github.com/silentsilo/core/blob/main/docs/CRYPTO.md">
          CRYPTO.md
        </a>{" "}
        lists what storage can and cannot do. Updates from the{" "}
        <a href={RELEASES_REPO}>update endpoint</a> are checked against a
        signing key built into the app, and one that does not verify is not
        installed.
      </p>

      <h2>No independent audit yet</h2>
      <p>
        No outside firm has audited SilentSilo. The cryptography is specified
        in{" "}
        <a href="https://github.com/silentsilo/core/blob/main/docs/CRYPTO.md">
          CRYPTO.md
        </a>
        , the formats in{" "}
        <a href="https://github.com/silentsilo/core/blob/main/FORMATS.md">
          FORMATS.md
        </a>
        , and all the source is public, so anyone can review it. A serious
        flaw could still pass its tests. If you face a well-funded attacker,
        weigh that. When an audit is done, the report goes here.
      </p>

      <h2>What this does not defend against</h2>
      <p>
        Malware running as you while a silo is <strong>unlocked</strong>. The
        key has to be in memory for anything to decrypt, so software on that
        machine can reach it. That holds for any desktop application, this
        one included.
      </p>
      <p>
        What the app does is shorten the window. Silos lock when the computer
        locks or sleeps. Each password entry is encrypted on its own. Copied
        passwords stay out of clipboard history and cloud clipboards and are
        cleared after 45 seconds. On Windows, macOS and Android the app is
        kept out of screenshots and screen sharing unless you turn that off. On Windows the app also turns
        off the usual ways other programs inject code into it. The same limit
        holds on a phone: software that controls an unlocked phone can reach
        what is open.
      </p>
      <p>
        Also out of scope: someone using your already-unlocked session, and
        someone who has a copy of the silo and a way in: one enrolled key with
        its PIN, or the recovery code. A key added before 1.5.1 without a PIN
        needs only a touch.
      </p>

      <h2 id="checking-what-you-downloaded">Checking what you downloaded</h2>
      <p>
        The installer and the extraction tool are published with a signature
        file beside them. The Windows installer is built on a machine here
        and carries an Authenticode signature from a certificate on a
        hardware token that no build server can reach. GitHub Actions builds
        the Linux packages and the Linux extractor, unsigned, with
        build provenance anyone can check with{" "}
        <code>gh attestation verify &lt;file&gt; --repo silentsilo/desktop</code>
        . The release machine checks that provenance, then signs every file
        with the update key, which is not on GitHub. The macOS app and the
        macOS extractor are built, signed with the company&apos;s Developer ID
        and notarised on a Mac.
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
        <a href={MOBILE_REPO}>silentsilo/mobile</a>. The iPhone app comes
        from the <a href={APP_STORE}>App Store</a>, signed the way Apple
        signs every app there, from the same source.
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
