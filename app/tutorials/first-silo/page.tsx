import type { Metadata } from "next";
import Link from "next/link";
import { MoreGuides } from "../MoreGuides";
import { ThemedImg } from "../../ThemedImg";

export const metadata: Metadata = {
  title: "Your first silo",
  description:
    "From the download to a silo you can trust: how it unlocks, the recovery code and the emergency kit, backup storage, and a second computer.",
};

export default function FirstSilo() {
  return (
    <main id="main" className="wrap prose">
      <h1>Your first silo</h1>
      <p className="lead">
        A silo is an encrypted folder on your computer with its own keys and
        its own backup. Setting one up takes about ten minutes, and two of
        those minutes decide whether you can get it back on a bad day.
      </p>

      <nav className="toc" aria-label="On this page">
        <p className="toc-head">On this page</p>
        <ol>
          <li>
            <a href="#create-it">Create it</a>
          </li>
          <li>
            <a href="#choose-how-it-unlocks">Choose how it unlocks</a>
          </li>
          <li>
            <a href="#the-recovery-code">The recovery code</a>
          </li>
          <li>
            <a href="#backup-storage">Backup storage</a>
          </li>
          <li>
            <a href="#using-it">Using it</a>
          </li>
          <li>
            <a href="#a-second-computer">A second computer</a>
          </li>
        </ol>
      </nav>

      <h2 id="create-it">Create it</h2>
      <ol>
        <li>
          Install SilentSilo from the <Link href="/download/">download page</Link>{" "}
          and open it.
        </li>
        <li>
          Under <strong>New silo</strong>, give it a <strong>Name</strong> and
          choose <strong>Where to keep it</strong>. Any folder works,
          including one on an external drive; what SilentSilo writes there is
          encrypted.
        </li>
        <li>
          Click <strong>Create silo</strong>.
        </li>
      </ol>
      <figure className="tut-shot">
        <ThemedImg
          base="/shots/tut-new-silo"
          alt="The New silo form with a name and the folder to keep it in"
          width={1200}
          height={800}
          sizes="(max-width: 52rem) 100vw, 47rem"
        />
      </figure>
      <p>
        You can have several silos, for example one for work and one for
        personal files. Each has its own keys and its own backup.
      </p>

      <h2 id="choose-how-it-unlocks">Choose how it unlocks</h2>
      <p>
        There is no password. On <strong>Set up unlocking</strong> you pick
        what opens the silo:
      </p>
      <ul>
        <li>
          <strong>Use a security key</strong>: a FIDO2 key such as a
          YubiKey, with a PIN. It works on any computer, Linux included.
        </li>
        <li>
          <strong>Use Windows Hello</strong> or{" "}
          <strong>Use Touch ID</strong>: the face, fingerprint or PIN this
          computer already has. Tied to this computer.
        </li>
        <li>
          <strong>Use your phone</strong>, on Windows 11: Windows shows a QR
          code, and your iPhone or Android phone becomes the key.
        </li>
      </ul>
      <figure className="tut-shot">
        <ThemedImg
          base="/shots/tut-unlocking"
          alt="Set up unlocking, with the security key, Windows Hello and phone choices"
          width={1200}
          height={800}
          sizes="(max-width: 52rem) 100vw, 47rem"
        />
      </figure>
      <p>
        You can add more ways in later under{" "}
        <strong>Settings &gt; Unlocking</strong>. The{" "}
        <Link href="/tutorials/unlock-without-a-key/">unlock without a key</Link>{" "}
        guide goes through Hello, Touch ID and the phone.
      </p>

      <h2 id="the-recovery-code">The recovery code</h2>
      <p>
        Next comes <strong>Step 1 of 2</strong>. Click{" "}
        <strong>Create a recovery code</strong>: one long code that opens the
        silo on any computer when every key is lost. It is shown once.
      </p>
      <ol>
        <li>Write it down, or copy it somewhere you trust.</li>
        <li>
          Better still, print the emergency kit offered beside it: one sheet
          with the code and the steps to get the silo back. Keep it with
          documents you cannot replace, not in a drawer by the computer.
        </li>
        <li>
          Click <strong>I&apos;ve written it down</strong>.
        </li>
      </ol>
      <figure className="tut-shot">
        <ThemedImg
          base="/shots/tut-recovery-code"
          alt="Step 1 of 2: the recovery code, shown once, with the emergency kit"
          width={1200}
          height={800}
          sizes="(max-width: 52rem) 100vw, 47rem"
        />
      </figure>
      <p>
        Without the code, losing every key means losing the silo, and nobody
        can open it for you: there is no account and no server of ours. If
        you skip it, <strong>Settings &gt; Overview</strong> reminds you until
        you make one under <strong>Settings &gt; Recovery code</strong>.
      </p>

      <h2 id="backup-storage">Backup storage</h2>
      <p>
        <strong>Step 2 of 2</strong> asks where an encrypted copy should go.
        Until there is one, the silo lives only on this computer. Choose{" "}
        <strong>Set up backup storage</strong> and pick what you already
        have: OneDrive, Dropbox or Google Drive with a sign-in, or a drive,
        NAS, S3 bucket, WebDAV or SFTP server. Each has its own guide under{" "}
        <Link href="/tutorials/">Tutorials</Link>. The storage only ever sees
        encrypted data.
      </p>
      <figure className="tut-shot">
        <ThemedImg
          base="/shots/tut-backup-step"
          alt="Step 2 of 2: choosing where the encrypted backup goes"
          width={1200}
          height={800}
          sizes="(max-width: 52rem) 100vw, 47rem"
        />
      </figure>
      <p>
        <strong>Set up later</strong> is fine for a first look. You can add
        it any time under <strong>Settings &gt; Backup</strong>, and more
        than one copy if you like.
      </p>

      <h2 id="using-it">Using it</h2>
      <ul>
        <li>
          <strong>Files</strong>: drop files or folders into the window, or
          use the buttons at the top. Double-click opens a file in its usual
          program.
        </li>
        <li>
          <strong>Passwords</strong>: logins, cards, notes and SSH keys, with
          one-time codes. The{" "}
          <Link href="/tutorials/passwords/">passwords guide</Link> goes
          through them, and the moving-in guides bring over what you have.
        </li>
        <li>
          <strong>Lock silo</strong> in the sidebar locks it now. It also
          locks by itself after a while unused, and when the computer locks
          or sleeps.
        </li>
        <li>
          <strong>Settings &gt; Test backup</strong> checks that the copies
          are whole and tries a recovery with your code. Worth doing once
          after the first backup.
        </li>
      </ul>

      <h2 id="a-second-computer">A second computer</h2>
      <p>
        Install SilentSilo there and choose{" "}
        <strong>Set up from backup storage</strong>. Enter the same backup
        storage, then touch a key that already opens the silo, or use the
        recovery code. The silo is rebuilt from the encrypted copy and stays
        in step from then on. Add that computer&apos;s own Windows Hello or
        Touch ID afterwards under <strong>Settings &gt; Unlocking</strong> if
        you want it. The{" "}
        <Link href="/tutorials/several-devices/">several devices</Link> guide
        explains how they stay in step.
      </p>
      <MoreGuides />
    </main>
  );
}
