import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Browser,
  Desktop,
  DeviceMobile,
  DownloadSimple,
  GithubLogo,
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

export default function Download() {
  return (
    <main id="main">
      <section className="sec dl-page">
        <div className="wrap">
          <div className="sec-head">
            <p className="kicker">Download</p>
            <h1>Get SilentSilo</h1>
            <p>
              Free, with no account. Every device opens the same silo from the
              same storage. The current version is {LATEST_TAG}.
            </p>
          </div>

          <div className="dl-list">
            <article className="dl" id="windows">
              <span className="plat-icon">
                <Desktop weight="duotone" />
              </span>
              <div className="dl-body">
                <h2>Windows</h2>
                <p>{detail("windows")}</p>
                <div className="dl-actions">
                  <a className="btn btn-primary" href={LATEST_INSTALLER}>
                    <DownloadSimple weight="bold" />
                    Download the installer
                  </a>
                </div>
                <details className="verify">
                  <summary>
                    <ShieldCheck weight="duotone" />
                    Check it before you run it
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
                      <dt>File</dt>
                      <dd>{LATEST_INSTALLER_NAME}</dd>
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
                  </div>
                </details>
              </div>
            </article>

            <article className="dl" id="linux">
              <span className="plat-icon">
                <Terminal weight="duotone" />
              </span>
              <div className="dl-body">
                <h2>Linux</h2>
                <p>64-bit. Unlocks with a security key.</p>
                <div className="dl-actions">
                  {LINUX_PACKAGES.map((p, i) => (
                    <a
                      key={p.kind}
                      className={`btn ${i === 0 ? "btn-primary" : "btn-ghost"}`}
                      href={p.url}
                    >
                      <DownloadSimple weight="bold" />
                      {p.kind}
                    </a>
                  ))}
                </div>
                <ul className="dl-notes">
                  {LINUX_PACKAGES.map((p) => (
                    <li key={p.kind}>
                      <strong>{p.kind}</strong> for {p.fits}.{" "}
                      <a href={`${p.url}.sig`}>Signature</a>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="dl" id="android">
              <span className="plat-icon">
                <DeviceMobile weight="duotone" />
              </span>
              <div className="dl-body">
                <h2>Android</h2>
                <p>
                  {detail("android")} Google Play keeps it up to date.
                </p>
                <div className="dl-actions">
                  <a className="btn btn-primary" href={PLAY_STORE}>
                    <DeviceMobile weight="bold" />
                    Get it on Google Play
                  </a>
                  <a className="btn btn-ghost" href={MOBILE_REPO}>
                    <GithubLogo weight="fill" />
                    Source
                  </a>
                </div>
              </div>
            </article>

            <article className="dl" id="extension">
              <span className="plat-icon">
                <Browser weight="duotone" />
              </span>
              <div className="dl-body">
                <h2>Browser extension</h2>
                <p>
                  Fills logins from your silo. It holds no passwords itself: it
                  asks the SilentSilo app on the same Windows or Linux computer,
                  so install the app first.
                </p>
                <div className="dl-actions">
                  {EXTENSION_STORES.map((s) => (
                    <a key={s.id} className="btn btn-ghost" href={s.href}>
                      <Browser weight="duotone" />
                      {STORE_LABEL[s.id] ?? s.name}
                    </a>
                  ))}
                </div>
                <Link className="plat-action" href="/tutorials/browser-extension/">
                  How it works
                  <ArrowRight />
                </Link>
              </div>
            </article>

            <article className="dl" id="extractor">
              <span className="plat-icon">
                <Terminal weight="duotone" />
              </span>
              <div className="dl-body">
                <h2>Extraction tool</h2>
                <p>
                  Reads a backup with only the recovery code, without the app.
                  One file, nothing to install. Keep it for the day the app is
                  not there.
                </p>
                <ul className="dl-files">
                  {EXTRACTORS.map((e) => (
                    <li key={e.file}>
                      <a href={e.url}>
                        <DownloadSimple weight="bold" />
                        {e.os}
                      </a>
                      <span>{e.arch}</span>
                    </li>
                  ))}
                </ul>
                <Link className="plat-action" href="/tutorials/get-files-out/">
                  How to use it
                  <ArrowRight />
                </Link>
              </div>
            </article>
          </div>

          <div className="dl-later">
            {PLATFORMS.filter((p) => !p.available).map((p) => (
              <article className="plat is-planned" key={p.id}>
                <div className="plat-head">
                  <span className="plat-icon">
                    {p.id === "ios" ? (
                      <DeviceMobile weight="duotone" />
                    ) : (
                      <Desktop weight="duotone" />
                    )}
                  </span>
                  <h3>{p.name}</h3>
                  <span className="plat-status">{p.soon ? "Coming soon" : "Planned"}</span>
                </div>
                <p>{p.detail}</p>
              </article>
            ))}
          </div>

          <p className="dl-foot">
            <a href={RELEASES}>All releases</a>, with notes for each.{" "}
            <a href={REPO}>The source</a> is on GitHub under the AGPL.
          </p>
        </div>
      </section>
    </main>
  );
}
