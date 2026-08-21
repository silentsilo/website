import Link from "next/link";
import { Showcase } from "./Showcase";
import {
  IconArrowRight,
  IconBook,
  IconCheck,
  IconClipboard,
  IconClock,
  IconDisk,
  IconDownload,
  IconFolder,
  IconGitHub,
  IconKey,
  IconLayers,
  IconLock,
  IconPointer,
  IconServer,
  IconShield,
  IconSwap,
  IconSync,
  IconTerminal,
  IconVault,
} from "./Icons";
import {
  DOC_FORMATS,
  DOC_STORAGE,
  LATEST_INSTALLER,
  LATEST_TAG,
  RELEASED,
  RELEASES,
  REPO,
} from "./links";

export default function Home() {
  return (
    <main>
      <div className="wrap">
        <section className="hero">
          <span className="eyebrow">
            <span className="pulse" aria-hidden />
            Local-first, end-to-end encrypted
          </span>
          <h1>
            An encrypted vault. No account. <em>No server.</em>
          </h1>
          <p>
            SilentSilo keeps your files and passwords in encrypted folders on
            your own machine, unlocked with a hardware security key. If you
            want sync, you point it at storage you already control.
          </p>
          {/* No download until there is one. A button pointing at a release
              that does not exist is the first thing a visitor finds out, on
              a site whose whole argument is that you should not have to take
              anybody's word for anything. */}
          <div className="cta-row">
            {RELEASED ? (
              <>
                <a className="btn btn-primary" href={LATEST_INSTALLER}>
                  <IconDownload size={17} />
                  Download for Windows
                </a>
                <a className="btn btn-ghost" href={REPO}>
                  <IconGitHub size={16} />
                  Source on GitHub
                </a>
              </>
            ) : (
              <>
                <a className="btn btn-primary" href={REPO}>
                  <IconGitHub size={16} />
                  Read the source
                </a>
                <Link className="btn btn-ghost" href="/security/">
                  Read the threat model
                  <IconArrowRight />
                </Link>
              </>
            )}
          </div>
          <span className="cta-note">
            {RELEASED ? (
              <>
                {LATEST_TAG}, free and open source, AGPL-3.0.{" "}
                <a href={RELEASES}>All releases</a> ·{" "}
                <Link href="/principles/">What stays free</Link>
              </>
            ) : (
              <>
                <strong>No build has been published yet.</strong> The source is
                complete and buildable today; the download appears here on the
                day there is a signed installer to point at. Free and open
                source, AGPL-3.0. <Link href="/principles/">What stays free</Link>
              </>
            )}
          </span>

          <div className="chips" aria-label="Technical facts">
            <span className="chip">AES-256-GCM</span>
            <span className="chip">FIDO2 hmac-secret</span>
            <span className="chip">AGPL-3.0</span>
            <span className="chip">nothing to buy</span>
            <span className="chip">no tracking</span>
          </div>
        </section>

        <section className="block" id="tour">
          <div className="block-head">
            <span className="kicker">The app</span>
            <h2>The app, screen by screen</h2>
            <p className="lead">
              Screenshots from the current build.
            </p>
          </div>
          <Showcase />
        </section>

        <section className="block">
          <div className="block-head">
            <span className="kicker">Features</span>
            <h2>What the app does</h2>
            <p className="lead">
              The everyday details. The whole client is free under AGPL-3.0,
              nothing cut and nothing metered.
            </p>
          </div>
          <div className="features">
            <article className="feat">
              <span className="feat-icon"><IconFolder size={18} /></span>
              <h3>Files, like a folder</h3>
              <p>
                Drag things in, search the whole silo, switch between grid
                and list. On disk it is all ciphertext, names included.
              </p>
            </article>
            <article className="feat">
              <span className="feat-icon"><IconClock /></span>
              <h3>TOTP built in</h3>
              <p>
                A login can hold its one-time secret too. The current code
                sits next to the password, counting down.
              </p>
            </article>
            <article className="feat">
              <span className="feat-icon"><IconSwap /></span>
              <h3>In by CSV, out by CSV</h3>
              <p>
                Imports from Bitwarden, LastPass, 1Password and Chrome.
                Exports back to CSV whenever you want to leave.
              </p>
            </article>
            <article className="feat">
              <span className="feat-icon"><IconLayers /></span>
              <h3>Several silos</h3>
              <p>
                Personal, family, work. Separate folders with separate keys;
                the app only remembers where they are.
              </p>
            </article>
            <article className="feat">
              <span className="feat-icon"><IconPointer /></span>
              <h3>In Explorer&apos;s menu</h3>
              <p>
                Right-click a file to upload it to the silo. Right-click
                inside a folder to download into that spot.
              </p>
            </article>
            <article className="feat">
              <span className="feat-icon"><IconLock /></span>
              <h3>Locks with the machine</h3>
              <p>
                Locking, suspending or disconnecting the workstation locks
                the silo and wipes the decrypted working copy.
              </p>
            </article>
            <article className="feat">
              <span className="feat-icon"><IconClipboard /></span>
              <h3>A clipboard that forgets</h3>
              <p>
                Copied secrets clear after 45 seconds and never reach
                Windows Clipboard History or Cloud Clipboard.
              </p>
            </article>
            <article className="feat">
              <span className="feat-icon"><IconServer /></span>
              <h3>Backup to what you have</h3>
              <p>
                An S3-compatible bucket, WebDAV, SFTP or a plain folder.
                Sync needs nothing fancier than put, get, list.
              </p>
            </article>
            <article className="feat">
              <span className="feat-icon"><IconCheck size={18} /></span>
              <h3>Prove the backup works</h3>
              <p>
                Rebuild the silo from its storage and your recovery code, in a
                temporary folder, and compare. A backup nobody has restored is
                a guess.
              </p>
            </article>
            <article className="feat">
              <span className="feat-icon"><IconKey /></span>
              <h3>Change the key, not the data</h3>
              <p>
                Retire a lost security key and the silo gets a new key without
                re-encrypting a single file. A revoked key stops opening what
                it opened before.
              </p>
            </article>
            <article className="feat">
              <span className="feat-icon"><IconShield size={18} /></span>
              <h3>Silos a company administers</h3>
              <p>
                Provision a silo with an organisation key the employee cannot
                remove, and the archive survives them leaving. Chosen at
                creation only, and visible on every device.
              </p>
            </article>
            <article className="feat">
              <span className="feat-icon"><IconBook size={18} /></span>
              <h3>An emergency kit on paper</h3>
              <p>
                One printable sheet with the recovery code in boxes and the
                steps to follow, written for the day you are calm enough to
                file it and not the day you need it.
              </p>
            </article>
          </div>
        </section>

        <section className="block">
          <div className="block-head">
            <span className="kicker">Getting started</span>
            <h2>What you need</h2>
          </div>
          <ul className="needs">
            <li>
              <span className="needs-tick"><IconCheck size={16} /></span>
              <div>
                <strong>Windows 10 or 11</strong>, 64-bit. The installer is
                about the size of a photo and takes a minute.
              </div>
            </li>
            <li>
              <span className="needs-tick"><IconCheck size={16} /></span>
              <div>
                <strong>Windows Hello, or a security key.</strong> A
                fingerprint, face or PIN you already use is enough, so there
                is nothing to buy. A FIDO2 key works too and travels between
                machines; it needs the <code>hmac-secret</code> extension,
                which most current keys have.
              </div>
            </li>
            <li>
              <span className="needs-tick"><IconCheck size={16} /></span>
              <div>
                <strong>Somewhere to write the recovery code.</strong> Paper
                is fine, and it is the only way back in if the key is lost.
                Setup generates it and waits while you copy it down.
              </div>
            </li>
          </ul>
          <p className="needs-note">
            Storage is optional and separate. A silo that never syncs is
            fully usable, forever.
          </p>
        </section>

        <section className="block">
          <div className="block-head">
            <span className="kicker">Design</span>
            <h2>Four decisions carry the whole thing</h2>
            <p className="lead">
              Each is documented, and each can be checked against the source.
            </p>
          </div>
          <div className="grid">
            <article className="card">
              <span className="card-num">01</span>
              <span className="icon"><IconKey /></span>
              <h3>Unlocked by hardware</h3>
              <p>
                A FIDO2 key or Windows Hello derives what unwraps the silo,
                through the <code>hmac-secret</code> extension. The only
                fallback is a generated recovery code you write on paper.
              </p>
              <p>
                No passphrase, deliberately. A memorable phrase is about forty
                bits, and the silo would be exactly that strong.
              </p>
            </article>
            <article className="card">
              <span className="card-num">02</span>
              <span className="icon"><IconFolder /></span>
              <h3>A silo is a folder</h3>
              <p>
                Portable, encrypted, holding its own index, content and key
                envelopes. Put it on an external drive or inside a folder your
                cloud client already syncs.
              </p>
              <p>
                Nothing decrypted is written inside it. The working copy lives
                elsewhere and is wiped on lock.
              </p>
            </article>
            <article className="card">
              <span className="card-num">03</span>
              <span className="icon"><IconSync /></span>
              <h3>Sync without a middleman</h3>
              <p>
                An append-only log of encrypted operations, written to storage
                you control. No conditional writes, no locks, and the machines
                never have to be online together.
              </p>
            </article>
            <article className="card">
              <span className="card-num">04</span>
              <span className="icon"><IconVault /></span>
              <h3>Credentials in the same silo</h3>
              <p>
                Logins, cards, identities, SSH keys and notes, with TOTP
                codes, a generator, CSV import and export. The same silo and
                the same key hold them all.
              </p>
              <p>
                Each login is encrypted on its own and syncs on its own, so
                two machines can both add one while offline and keep both.
              </p>
            </article>
          </div>
        </section>

        <section className="block">
          <div className="block-head">
            <span className="kicker">Sync</span>
            <h2>Your devices never talk to each other</h2>
            <p className="lead">
              They each read and write encrypted records in storage you own. No
              server sits between them, so there is nothing in the middle to
              trust, subpoena or shut down.
            </p>
          </div>

          <div className="flow" aria-hidden>
            <div className="flow-node">
              <strong>Laptop</strong>
              <span>writes op 42</span>
            </div>
            <div className="flow-link">
              <span className="flow-dot" />
              <span className="flow-label">ciphertext</span>
            </div>
            <div className="flow-node is-store">
              <strong>Your storage</strong>
              <span>bucket · WebDAV · SFTP · folder</span>
            </div>
            <div className="flow-link">
              <span className="flow-dot flow-dot-b" />
              <span className="flow-label">ciphertext</span>
            </div>
            <div className="flow-node">
              <strong>Desktop</strong>
              <span>replays to 42</span>
            </div>
          </div>
          <p className="flow-note">
            The provider sees opaque objects and one random identifier. It can
            withhold data, which breaks sync, but it cannot read it, alter it
            undetected, or add anything of its own.
          </p>
        </section>

        <section className="block">
          <div className="block-head">
            <span className="kicker">Archive</span>
            <h2>Built to hold things for years</h2>
            <p className="lead">
              A vault you sync is one copy that moves around. An archive is
              several copies that survive each other. SilentSilo keeps as
              many as you point it at, and counts them honestly.
            </p>
          </div>

          <div className="grid grid-3">
            <article className="card">
              <span className="icon"><IconLayers size={20} /></span>
              <h3>More than one destination</h3>
              <p>
                Add as many places as you like. Each gets its own queue, so
                one being unreachable never holds up another, and every
                change lands on all of them eventually.
              </p>
            </article>
            <article className="card">
              <span className="icon"><IconDisk size={20} /></span>
              <h3>A disk in a drawer counts</h3>
              <p>
                An external drive is a destination that is usually
                unplugged. It shows its age in plain words, picks up where
                it left off when it reappears, and stops asking in between.
              </p>
              <p>
                Filling one is a copy of ciphertext, so it needs no key.
                Seed it at the office, carry it home.
              </p>
            </article>
            <article className="card">
              <span className="icon"><IconLock size={20} /></span>
              <h3>A copy that cannot be deleted</h3>
              <p>
                Mark a destination append-only and the app never sends it a
                delete. Not when you empty the trash, not when it tidies up
                after itself. Ransomware holding your credentials cannot
                erase what it cannot delete.
              </p>
            </article>
          </div>

          <p className="flow-note">
            The Copies panel is the point of all this: how many complete
            copies exist right now, how far behind each one is, and when
            each was last written. It counts this computer as a copy only
            when you have asked it to keep every file locally, because
            otherwise it holds an index and fetches on demand.{" "}
            <a href={DOC_STORAGE}>Setting up storage that survives a bad day</a>{" "}
            walks through the provider settings.
          </p>
        </section>

        <section className="block">
          <div className="block-head">
            <span className="kicker">Compared</span>
            <h2>Where it sits</h2>
          </div>
          <div className="table-wrap">
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col" />
                  <th scope="col">SilentSilo</th>
                  <th scope="col">Hosted vaults</th>
                  <th scope="col">Folder encryptors</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Account required</th>
                  <td className="yes">Never</td>
                  <td>Yes</td>
                  <td>No</td>
                </tr>
                <tr>
                  <th scope="row">Unlock</th>
                  <td className="yes">Hardware key</td>
                  <td>Password</td>
                  <td>Passphrase</td>
                </tr>
                <tr>
                  <th scope="row">Multi-device sync</th>
                  <td className="yes">Your storage</td>
                  <td>Their servers</td>
                  <td>None</td>
                </tr>
                <tr>
                  <th scope="row">Works if the vendor dies</th>
                  <td className="yes">Yes</td>
                  <td>No</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <th scope="row">Source available</th>
                  <td className="yes">AGPL-3.0</td>
                  <td>Varies</td>
                  <td>Usually</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="block">
          <div className="block-head">
            <span className="kicker">Platforms</span>
            <h2>Windows now, and a way out on any system</h2>
            <p className="lead">
              The app is Windows only today. Linux and macOS are open
              questions with no date attached, which is the honest answer for
              something you are deciding to trust with years of files.
            </p>
          </div>

          <div className="extract">
            <span className="extract-icon"><IconTerminal size={20} /></span>
            <div>
              <h3>The way out does run everywhere</h3>
              <p>
                <code>silentsilo-extract</code> is a small command-line tool
                that reads a backup and writes your files back out. It needs
                the folder and your recovery code, nothing else: no silo, no
                security key, no account, no network beyond reading the
                backup you point it at.
              </p>
              <p>
                A release attaches separate binaries for Windows, Linux and
                macOS, each signed with the same key as the app.
                It is a deliberately plain program with almost no
                dependencies, because the fewer things stand between a person
                and their files, the more of that promise survives.
              </p>
              <pre className="extract-code">
                <code>
                  silentsilo-extract extract --from ./backup --code
                  XXXX-XXXX --to ./out
                </code>
              </pre>
              <p className="extract-foot">
                The format it reads is written down in{" "}
                <a href={DOC_FORMATS}>FORMATS.md</a>, so the archive outlives
                both the tool and the project.
              </p>
            </div>
          </div>
        </section>

        <section className="block block-closing">
          <div className="block-head">
            <span className="kicker">Open</span>
            <h2>Built where you can check it</h2>
            <p className="lead">
              The client is AGPL-3.0. The{" "}
              <Link href="/security/">threat model</Link> states exactly what
              is encrypted with what, and the list of what is deliberately
              unfinished ships in the repository, in plain sight.
            </p>
          </div>
          <p className="open-quote">
            A security product that asks for trust should make checking
            cheaper than believing.
          </p>
          <p className="signature">
            Built by one developer who has no social accounts either.{" "}
            <Link href="/who/">Who makes this</Link>
          </p>
          <div className="cta-row cta-row-closing">
            <a className="btn btn-primary" href={REPO}>
              <IconGitHub size={16} />
              Read the source
            </a>
            <Link className="btn btn-ghost" href="/security/">
              Read the threat model
              <IconArrowRight />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
