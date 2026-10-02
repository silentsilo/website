import Link from "next/link";
import {
  ArrowRight,
  ArrowsClockwise,
  ArrowsLeftRight,
  Browser,
  CheckCircle,
  Cloud,
  Desktop,
  DeviceMobile,
  DownloadSimple,
  Fingerprint,
  FolderLock,
  FolderSimple,
  GithubLogo,
  HardDrives,
  Key,
  LockKey,
  MinusCircle,
  Password,
  Scroll,
  ShieldCheck,
  Stack,
  Terminal,
  Timer,
  Vault,
  XCircle,
} from "@phosphor-icons/react/dist/ssr";
import { DownloadButton } from "./DownloadButton";
import { HowItWorks } from "./HowItWorks";
import { Showcase } from "./Showcase";
import { ThemedImg } from "./ThemedImg";
import {
  INSTALLER_SHA256,
  LATEST_INSTALLER_NAME,
  LATEST_INSTALLER_SIG,
  LATEST_TAG,
  RELEASES,
  REPO,
  VIRUSTOTAL_DETECTIONS,
  VIRUSTOTAL_ENGINES,
  VIRUSTOTAL_REPORT,
  VIRUSTOTAL_SCANNED,
} from "./links";
import { AVAILABLE_NAMES, PLANNED, PLATFORMS, type Platform } from "./platforms";
import { STORAGE_GUIDES } from "./tutorials/guides";

/** How each answer reads for the person choosing: good, a cost, or neither. */
type Tone = "good" | "bad" | "meh";
type Cell = [string, Tone];

/** Row label, then one cell per column, in the order of the header. */
const COMPARE: [string, Cell, Cell, Cell][] = [
  ["Account required", ["Never", "good"], ["Yes", "bad"], ["No", "good"]],
  ["Unlock", ["Hardware key or biometrics", "good"], ["Password", "meh"], ["Passphrase", "meh"]],
  ["Sync between devices", ["Through your storage", "good"], ["Through their servers", "meh"], ["None", "bad"]],
  ["Works if the vendor disappears", ["Yes", "good"], ["No", "bad"], ["Yes", "good"]],
  ["Source available", ["AGPL-3.0", "good"], ["Varies", "meh"], ["Usually", "meh"]],
];

const TONE_ICON: Record<Tone, React.ReactNode> = {
  good: <CheckCircle weight="fill" />,
  bad: <XCircle weight="fill" />,
  meh: <MinusCircle weight="fill" />,
};

function CompareCell({ cell, label, mine = false }: { cell: Cell; label: string; mine?: boolean }) {
  const [text, tone] = cell;
  return (
    <td role="cell" className={`tone-${tone}${mine ? " is-mine" : ""}`} data-label={label}>
      <span className="tone-icon" aria-hidden>
        {TONE_ICON[tone]}
      </span>
      {text}
    </td>
  );
}

/** Names only: the providers' brand rules do not allow their logos here
 *  without a licence, and the text says the same thing. */

const SMALL_FEATURES: { icon: React.ReactNode; title: string; text: string }[] = [
  {
    icon: <FolderSimple weight="duotone" />,
    title: "Files, like a folder",
    text: "Drag in, search, open. On disk everything is encrypted, file names included.",
  },
  {
    icon: <DeviceMobile weight="duotone" />,
    title: "Phone backup",
    text: "Photos, videos and contacts from Android, encrypted on the phone before they leave it.",
  },
  {
    icon: <LockKey weight="duotone" />,
    title: "Locks itself",
    text: "When you lock the computer, when the phone sleeps, or after a time you choose.",
  },
  {
    icon: <Stack weight="duotone" />,
    title: "Several silos",
    text: "Personal, family, work, each with its own keys. A company silo can keep a key the employee cannot remove.",
  },
  {
    icon: <ArrowsLeftRight weight="duotone" />,
    title: "In by CSV, out by CSV",
    text: "From Bitwarden, LastPass, 1Password and Chrome, and back out whenever you want.",
  },
  {
    icon: <Scroll weight="duotone" />,
    title: "Recovery you can test",
    text: "A printed sheet with the recovery code, and a check that rebuilds the silo from storage to prove it works.",
  },
];

const TRUST: { icon: React.ReactNode; title: string; text: string; href: string; more: string }[] = [
  {
    icon: <Fingerprint weight="duotone" />,
    title: "Unlocked by hardware",
    text: "A security key, Windows Hello or the phone's fingerprint opens the silo. The fallback is a recovery code on paper, so there is no password to guess.",
    href: "/security/",
    more: "The threat model",
  },
  {
    icon: <FolderLock weight="duotone" />,
    title: "A silo is a folder you own",
    text: "Encrypted, portable, with its own index and keys. Nothing decrypted is ever written inside it.",
    href: "/principles/",
    more: "What stays yours",
  },
  {
    icon: <ArrowsClockwise weight="duotone" />,
    title: "No middleman",
    text: "Devices sync through storage you chose, never through a server of ours. There is no SilentSilo account to lose or leak.",
    href: "#how",
    more: "How it works",
  },
  {
    icon: <HardDrives weight="duotone" />,
    title: "Copies that outlast a bad day",
    text: "Several destinations, a drive that is usually unplugged, and a copy the app never deletes from.",
    href: "/tutorials/copies-nothing-can-erase/",
    more: "A copy nothing can erase",
  },
];

const PLATFORM_ICON: Record<Platform["id"], React.ReactNode> = {
  windows: <Desktop weight="duotone" />,
  android: <DeviceMobile weight="duotone" />,
  extension: <Browser weight="duotone" />,
  macos: <Desktop weight="duotone" />,
  ios: <DeviceMobile weight="duotone" />,
  linux: <Terminal weight="duotone" />,
};

export default function Home() {
  const planned = PLANNED.map((p) => p.name).join(", ").replace(/, ([^,]*)$/, " and $1");
  return (
    <main id="main">
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <ShieldCheck weight="duotone" />
              Free and open source · No account
            </p>
            <h1>
              Your files and passwords,{" "}
              <span className="grad">encrypted on your own devices.</span>
            </h1>
            <p className="hero-lead">
              Unlock with Windows Hello, your phone&apos;s fingerprint or a
              security key. Keep the encrypted copy in your OneDrive, Dropbox,
              Google Drive or storage you own. There is no SilentSilo server
              in between.
            </p>
            <div className="cta-row">
              <DownloadButton />
              <a className="btn btn-ghost" href="#how">
                How it works
                <ArrowRight />
              </a>
            </div>
            <p className="hero-meta">
              {AVAILABLE_NAMES} now · {planned} planned · {LATEST_TAG}
            </p>
          </div>

          <div className="hero-visual">
            <div className="window">
              <div className="window-bar" aria-hidden>
                <span className="window-title">SilentSilo</span>
                <span className="window-controls">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <ThemedImg
                base="/shots/hero"
                sizes="(max-width: 900px) 100vw, 700px"
                width={2400}
                height={1585}
                alt="The Windows app with a silo open on its passwords: a login selected beside the list of entries"
              />
            </div>
            <div className="float float-a" aria-hidden>
              <span className="float-icon is-ok">
                <CheckCircle weight="fill" />
              </span>
              <span>
                <strong>Synced to Google Drive</strong>
                <small>2 copies up to date</small>
              </span>
            </div>
            <div className="float float-b" aria-hidden>
              <span className="float-icon">
                <LockKey weight="fill" />
              </span>
              <span>
                <strong>Encrypted on this device</strong>
                <small>AES-256-GCM</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="works-with" aria-label="Storage it syncs and backs up with">
        <div className="wrap works-row">
          <span className="works-label">Sync and back up with</span>
          <ul>
            {STORAGE_GUIDES.map((g) => (
              <li key={g.href}>
                <Link href={g.href}>{g.short}</Link>
              </li>
            ))}
          </ul>
          <Link className="works-more" href="/tutorials/">
            A guide for each
            <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="sec" id="how">
        <div className="wrap">
          <div className="sec-head">
            <p className="kicker">How it works</p>
            <h2>Encrypted on your device, synced through your storage</h2>
            <p>
              Your devices encrypt, your storage keeps only ciphertext, and
              only your keys open it. A change made on one device reaches the
              others through that storage.
            </p>
          </div>
          <HowItWorks />
        </div>
      </section>

      <section className="sec sec-alt" id="features">
        <div className="wrap">
          <div className="sec-head">
            <p className="kicker">What it does</p>
            <h2>Everything in the app, free for everyone</h2>
            <p>
              Every feature is in every copy. No paid tier, no licence key,
              nothing metered.
            </p>
          </div>

          <div className="bento">
            <article className="tile tile-wide">
              <div className="tile-text">
                <span className="tile-icon">
                  <Password weight="duotone" />
                </span>
                <h3>Passwords in the same silo</h3>
                <p>
                  Logins, cards, notes and SSH keys, with the one-time code
                  beside the password and passkeys on Android. Copied
                  secrets clear themselves.
                </p>
              </div>
              <div className="mini mini-logins" aria-hidden>
                <div className="mini-row">
                  <span className="mini-avatar is-a">GH</span>
                  <span className="mini-lines">
                    <b>GitHub</b>
                    <small>alex@example.com</small>
                  </span>
                  <span className="mini-otp">
                    <Timer weight="bold" />
                    381 552
                  </span>
                </div>
                <div className="mini-row is-on">
                  <span className="mini-avatar is-b">BA</span>
                  <span className="mini-lines">
                    <b>Bank</b>
                    <small>•••••••••••</small>
                  </span>
                  <span className="mini-pill">Copied, clears in 45 s</span>
                </div>
                <div className="mini-row">
                  <span className="mini-avatar is-c">MA</span>
                  <span className="mini-lines">
                    <b>Mail</b>
                    <small>alex@example.com</small>
                  </span>
                </div>
              </div>
            </article>

            <article className="tile">
              <div className="tile-text">
                <span className="tile-icon">
                  <Browser weight="duotone" />
                </span>
                <h3>Fills your browser</h3>
                <p>
                  Chrome, Edge, Brave and Firefox, after you confirm in the app. The
                  extension holds no passwords.
                </p>
              </div>
              <div className="mini mini-popup" aria-hidden>
                <small>Logins for github.com</small>
                <div className="mini-row is-on">
                  <span className="mini-avatar is-a">GH</span>
                  <span className="mini-lines">
                    <b>GitHub</b>
                    <small>alex@example.com</small>
                  </span>
                </div>
                <span className="mini-confirm">
                  <Fingerprint weight="fill" />
                  Confirm in SilentSilo
                </span>
              </div>
            </article>

            <article className="tile">
              <div className="tile-text">
                <span className="tile-icon">
                  <Cloud weight="duotone" />
                </span>
                <h3>Back up to what you have</h3>
                <p>
                  As many copies as you like, each with its own queue, one of
                  them a copy the app never deletes from.
                </p>
              </div>
              <ul className="mini mini-stores" aria-hidden>
                {STORAGE_GUIDES.slice(0, 6).map((g) => (
                  <li key={g.href}>{g.short}</li>
                ))}
              </ul>
            </article>

            <article className="tile tile-wide tile-key">
              <div className="tile-text">
                <span className="tile-icon">
                  <Key weight="duotone" />
                </span>
                <h3>Change the key, not the data</h3>
                <p>
                  Lose a security key, retire it, and the silo moves to a new
                  key without re-encrypting a single file. The retired one
                  stops opening anything.
                </p>
              </div>
              <div className="mini mini-keys" aria-hidden>
                <span className="mini-key is-on">
                  <Fingerprint weight="duotone" />
                  Windows Hello
                </span>
                <span className="mini-key is-on">
                  <Key weight="duotone" />
                  YubiKey 5
                </span>
                <span className="mini-key is-off">
                  <Key weight="duotone" />
                  Old key, retired
                </span>
                <span className="mini-key is-on">
                  <Vault weight="duotone" />
                  Recovery code
                </span>
              </div>
            </article>
          </div>

          <div className="features">
            {SMALL_FEATURES.map((f) => (
              <article className="feat" key={f.title}>
                <span className="feat-icon">{f.icon}</span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="tour">
        <div className="wrap">
          <div className="sec-head">
            <p className="kicker">Inside the app</p>
            <h2>The Windows app, as it ships</h2>
            <p>
              Taken from the current build, in the same light or dark theme
              you are reading this in.
            </p>
          </div>
          <Showcase />
        </div>
      </section>

      <section className="sec sec-alt" id="platforms">
        {/* The old page had "What you need" at #needs, and links to it are
            out there. A fragment never reaches the server, so the alias
            lives here rather than in nginx. */}
        <span id="needs" aria-hidden />
        <div className="wrap">
          <div className="sec-head">
            <p className="kicker">Get it</p>
            <h2>On your computer and your phone</h2>
            <p>
              Every device opens the same silo from the same storage. Platforms
              that are not out yet say so, with no date until there is one.
            </p>
          </div>
          <div className="plat-grid">
            {PLATFORMS.map((p) => (
              <article className={`plat${p.available ? "" : " is-planned"}`} key={p.id}>
                <div className="plat-head">
                  <span className="plat-icon">{PLATFORM_ICON[p.id]}</span>
                  <h3>{p.name}</h3>
                  <span className={`plat-status${p.available ? " is-live" : ""}`}>
                    {p.available ? "Available" : "Planned"}
                  </span>
                </div>
                <p>{p.detail}</p>
                {p.action && (
                  <a className="plat-action" href={p.action.href}>
                    {p.action.label}
                    <ArrowRight />
                  </a>
                )}
              </article>
            ))}
          </div>

          <div className="get-more">
            <details className="verify">
              <summary>
                <ShieldCheck weight="duotone" />
                Check the Windows download before you run it
              </summary>
              <div className="verify-body">
                <p>
                  <strong>
                    {VIRUSTOTAL_DETECTIONS === 0
                      ? "No engine flagged this installer"
                      : `${VIRUSTOTAL_DETECTIONS} of ${VIRUSTOTAL_ENGINES} engines flagged this installer`}
                  </strong>{" "}
                  on VirusTotal ({VIRUSTOTAL_DETECTIONS}/{VIRUSTOTAL_ENGINES},{" "}
                  {VIRUSTOTAL_SCANNED}). <a href={VIRUSTOTAL_REPORT}>See the report</a>.
                </p>
                <dl>
                  <dt>SHA-256</dt>
                  <dd>
                    <code>{INSTALLER_SHA256}</code>
                  </dd>
                  <dt>Signature</dt>
                  <dd>
                    <a href={LATEST_INSTALLER_SIG}>{LATEST_INSTALLER_NAME}.sig</a>{" "}
                    (minisign, the key the app checks updates against)
                  </dd>
                </dl>
                <p>
                  <a href={RELEASES}>All releases</a>, with notes for each.
                </p>
              </div>
            </details>
            <Link className="way-out" href="/tutorials/get-files-out/">
              <span className="feat-icon">
                <Terminal weight="duotone" />
              </span>
              <span>
                <strong>A way out on any system.</strong> A small tool reads a
                backup with only the recovery code, on Windows, Linux or
                macOS, without the app.
              </span>
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="sec" id="trust">
        <div className="wrap">
          <div className="sec-head">
            <p className="kicker">Why trust it</p>
            <h2>Built so you do not have to take our word for it</h2>
          </div>
          <div className="trust-grid">
            {TRUST.map((t) => (
              <article className="card" key={t.title}>
                <span className="icon">{t.icon}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                <Link className="card-link" href={t.href}>
                  {t.more}
                  <ArrowRight />
                </Link>
              </article>
            ))}
          </div>

          {/* Below 560px the rows become cards, which is why every element
              carries its role explicitly: `display: block` on a table strips
              the implicit ones. The labels come from data-label. */}
          <div className="table-wrap">
            <table className="compare" role="table">
              <thead role="rowgroup">
                <tr role="row">
                  <th role="columnheader" scope="col" />
                  <th role="columnheader" scope="col" className="is-mine">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/icon.svg" alt="" width={18} height={18} />
                    SilentSilo
                  </th>
                  <th role="columnheader" scope="col">
                    Hosted vaults
                  </th>
                  <th role="columnheader" scope="col">
                    Folder encryptors
                  </th>
                </tr>
              </thead>
              <tbody role="rowgroup">
                {COMPARE.map(([row, mine, hosted, folder]) => (
                  <tr key={row} role="row">
                    <th role="rowheader" scope="row">
                      {row}
                    </th>
                    <CompareCell cell={mine} label="SilentSilo" mine />
                    <CompareCell cell={hosted} label="Hosted vaults" />
                    <CompareCell cell={folder} label="Folder encryptors" />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="sec sec-closing">
        <div className="wrap">
          <div className="closing">
            <div>
              <h2>Open source, so you can check rather than believe</h2>
              <p>
                The app is AGPL-3.0, the threat model says what is encrypted
                with what, and the list of what is unfinished is public. Built
                by one developer. <Link href="/who/">Who makes this</Link>
              </p>
            </div>
            <div className="cta-row">
              <a className="btn btn-ghost" href={REPO}>
                <GithubLogo weight="fill" />
                Read the source
              </a>
              <Link className="btn btn-ghost" href="/security/">
                Read the threat model
                <ArrowRight />
              </Link>
              <a className="btn btn-primary" href="#platforms">
                <DownloadSimple weight="bold" />
                Get SilentSilo
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
