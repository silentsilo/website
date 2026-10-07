import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Browser,
  Desktop,
  DeviceMobile,
  DeviceMobileCamera,
  DownloadSimple,
  GithubLogo,
  Laptop,
  Lifebuoy,
  ShieldCheck,
  Terminal,
} from "@phosphor-icons/react/dist/ssr";
import {
  EXTENSION_STORES,
  EXTRACTORS,
  INSTALLER_SHA256,
  LATEST_INSTALLER,
  LATEST_INSTALLER_NAME,
  LATEST_INSTALLER_SIG,
  LATEST_RELEASE,
  LATEST_TAG,
  LINUX_PACKAGES,
  MOBILE_REPO,
  PLAY_STORE,
  RELEASES,
  REPO,
  VIRUSTOTAL_DETECTIONS,
  VIRUSTOTAL_ENGINES,
  VIRUSTOTAL_REPORT,
  VIRUSTOTAL_SCANNED,
} from "../links";
import { PLATFORMS, type Platform } from "../platforms";
import { ThisDevice } from "./ThisDevice";

export const metadata: Metadata = {
  title: "Download SilentSilo",
  description:
    "SilentSilo for Windows, Linux and Android, the browser extension and the extraction tool. Free, no account.",
};

const detail = (id: Platform["id"]) => PLATFORMS.find((p) => p.id === id)?.detail ?? "";

/** Store names as people know them: Brave installs from Chrome's. */
const STORE_LABEL: Record<string, string> = {
  chrome: "Chrome and Brave",
  firefox: "Firefox",
  edge: "Edge",
};

/** The card's top: icon, name, and a badge the script turns on for the
 *  device reading the page. */
function CardHead({
  icon,
  name,
  status,
}: {
  icon: React.ReactNode;
  name: string;
  status?: string;
}) {
  return (
    <div className="dl-head">
      <span className="dl-icon">{icon}</span>
      <h3>{name}</h3>
      <span className="dl-yours">This device</span>
      {status && <span className="plat-status">{status}</span>}
    </div>
  );
}

export default function Download() {
  return (
    <main id="main">
      <ThisDevice />
      <section className="dl-hero">
        <div className="wrap">
          <p className="eyebrow">
            <ShieldCheck weight="duotone" />
            Free and open source · No account
          </p>
          <h1>
            Download <span className="grad">SilentSilo</span>
          </h1>
          <p className="dl-lead">
            Every device opens the same silo from the same storage. Install it
            on each one you use.
          </p>
          <a className="dl-version" href={LATEST_RELEASE}>
            {LATEST_TAG}
            <span>Release notes</span>
            <ArrowRight />
          </a>
        </div>
      </section>

      <section className="dl-page">
        <div className="wrap">
          <div className="dl-group">
            <h2 className="kicker">On your computer</h2>
            <div className="dl-grid">
              <article className="dl-card" id="windows">
                <CardHead icon={<Desktop weight="duotone" />} name="Windows" />
                <p>{detail("windows")}</p>
                <div className="dl-actions">
                  <a className="btn btn-primary" href={LATEST_INSTALLER}>
                    <DownloadSimple weight="bold" />
                    Download for Windows
                  </a>
                </div>
                <p className="dl-small">
                  Signed installer, 64-bit. <a href="#verify">Check it</a>
                </p>
              </article>

              <article className="dl-card" id="linux">
                <CardHead icon={<Terminal weight="duotone" />} name="Linux" />
                <p>64-bit. Unlocks with a security key.</p>
                <div className="dl-actions">
                  {LINUX_PACKAGES.map((p, i) => (
                    <a
                      key={p.kind}
                      className={`btn dl-btn ${i === 0 ? "btn-primary" : "btn-ghost"}`}
                      href={p.url}
                    >
                      <DownloadSimple weight="bold" />
                      <span>
                        {p.kind}
                        <small>{p.fits}</small>
                      </span>
                    </a>
                  ))}
                </div>
                <p className="dl-small">
                  Signatures:{" "}
                  {LINUX_PACKAGES.map((p, i) => (
                    <span key={p.kind}>
                      {i > 0 && " · "}
                      <a href={`${p.url}.sig`}>{p.kind}</a>
                    </span>
                  ))}
                </p>
              </article>

              <article className="dl-card is-later" id="macos">
                <CardHead icon={<Laptop weight="duotone" />} name="macOS" status="Coming soon" />
                <p>{detail("macos")}</p>
              </article>
            </div>
          </div>

          <div className="dl-group">
            <h2 className="kicker">On your phone</h2>
            <div className="dl-grid dl-grid-2">
              <article className="dl-card" id="android">
                <CardHead icon={<DeviceMobile weight="duotone" />} name="Android" />
                <p>{detail("android")} Google Play keeps it up to date.</p>
                <div className="dl-actions">
                  <a className="btn btn-primary" href={PLAY_STORE}>
                    <DeviceMobile weight="bold" />
                    Get it on Google Play
                  </a>
                </div>
                <p className="dl-small">
                  <a href={MOBILE_REPO}>Source on GitHub</a>
                </p>
              </article>

              <article className="dl-card is-later" id="ios">
                <CardHead icon={<DeviceMobileCamera weight="duotone" />} name="iOS" status="Planned" />
                <p>{detail("ios")}</p>
              </article>
            </div>
          </div>

          <div className="dl-group">
            <h2 className="kicker">And also</h2>
            <div className="dl-grid dl-grid-2">
              <article className="dl-card" id="extension">
                <CardHead icon={<Browser weight="duotone" />} name="Browser extension" />
                <p>
                  Fills logins from your silo. It holds no passwords itself: it
                  asks the SilentSilo app on the same Windows or Linux computer,
                  so install the app first.
                </p>
                <div className="dl-actions dl-stores">
                  {EXTENSION_STORES.map((s) => (
                    <a key={s.id} className="btn btn-ghost" href={s.href}>
                      {STORE_LABEL[s.id] ?? s.name}
                    </a>
                  ))}
                </div>
                <p className="dl-small">
                  <Link href="/tutorials/browser-extension/">How it works</Link>
                </p>
              </article>

              <article className="dl-card" id="extractor">
                <CardHead icon={<Lifebuoy weight="duotone" />} name="Extraction tool" />
                <p>
                  Reads a backup with only the recovery code, without the app.
                  One file, nothing to install. Keep it for the day the app is
                  not there.
                </p>
                <div className="dl-actions dl-stores">
                  {EXTRACTORS.map((e) => (
                    <a key={e.file} className="btn btn-ghost" href={e.url} title={e.arch}>
                      <DownloadSimple weight="bold" />
                      {e.os}
                    </a>
                  ))}
                </div>
                <p className="dl-small">
                  <Link href="/tutorials/get-files-out/">How to use it</Link>
                </p>
              </article>
            </div>
          </div>

          <div className="dl-verify" id="verify">
            <span className="dl-icon">
              <ShieldCheck weight="duotone" />
            </span>
            <div>
              <h2>Check the Windows installer</h2>
              <p>
                <strong>
                  {VIRUSTOTAL_DETECTIONS === 0
                    ? "No engine flagged it"
                    : `${VIRUSTOTAL_DETECTIONS} of ${VIRUSTOTAL_ENGINES} engines flagged it`}
                </strong>{" "}
                on VirusTotal ({VIRUSTOTAL_DETECTIONS}/{VIRUSTOTAL_ENGINES},{" "}
                {VIRUSTOTAL_SCANNED}). <a href={VIRUSTOTAL_REPORT}>See the report</a>.
              </p>
              <dl>
                <dt>File</dt>
                <dd>{LATEST_INSTALLER_NAME}</dd>
                <dt>SHA-256</dt>
                <dd>
                  <code>{INSTALLER_SHA256}</code>
                </dd>
                <dt>Signature</dt>
                <dd>
                  <a href={LATEST_INSTALLER_SIG}>{LATEST_INSTALLER_NAME}.sig</a> (minisign,
                  the key the app checks updates against)
                </dd>
              </dl>
            </div>
          </div>

          <p className="dl-foot">
            <a href={RELEASES}>All releases</a>, with notes for each.{" "}
            <a href={REPO}>
              <GithubLogo weight="fill" /> The source
            </a>{" "}
            is on GitHub under the AGPL.
          </p>
        </div>
      </section>
    </main>
  );
}
