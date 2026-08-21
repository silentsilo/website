import type { Metadata } from "next";
import { REPO, RELEASES_REPO } from "../links";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What this site and the SilentSilo app do and do not collect. The complete list is short.",
};

export default function Privacy() {
  return (
    <main className="wrap prose">
      <h1>Privacy</h1>
      <p className="lead">
        The complete list of what is collected, by the site and by the app.
        It is short because there is little to tell.
      </p>

      <h2>This website</h2>
      <p>
        No cookies, no analytics, no third-party requests. The font is served
        from this domain. The site is static files.
      </p>

      <h2>The app</h2>
      <p>
        SilentSilo has no account and tracks nothing. Every network request
        the app can make is on this list, each under your control:
      </p>
      <ul>
        <li>
          <strong>Sync and backup</strong>, only if you configure it, and only
          to storage you chose: your bucket, your server, your folder. What
          the storage provider can and cannot see is described on the{" "}
          <a href="/security/">security page</a>.
        </li>
        <li>
          <strong>The update check.</strong> At most once a day, the app asks
          releases.silentsilo.com whether a newer version exists. That
          request contains your app version and platform, nothing else. We
          count these requests to estimate active installs; we do not log IP
          addresses and we cannot tell one install from another. The check
          can be turned off in Settings, and turning it off removes you from
          the count entirely.
        </li>
        <li>
          <strong>The breach check</strong>, only when you press its button in
          Health. The first five characters of each password&apos;s SHA-1 hash
          go to Have I Been Pwned&apos;s range API, run by a third party; the
          passwords themselves never leave your machine, the responses are
          padded so their size reveals nothing, and the request does not pass
          through us at all. Never press the button, and that service never
          hears from you.
        </li>
        <li>
          <strong>Site icons, only if you switch them on.</strong> Off by
          default. Turned on, the credentials list asks each saved site for
          its <code>favicon.ico</code> directly, which tells that site your IP
          address and the fact that you hold an account there, every time the
          list is drawn. It is the one request that goes to somebody we have
          no relationship with and you did not configure, which is why it is
          off until you decide otherwise. Addresses that resolve to your own
          network are never asked. The toggle sits above the list, in
          Credentials.
        </li>
      </ul>
      <p>
        None of this asks to be believed as prose. The{" "}
        <a href={REPO}>app</a> and the{" "}
        <a href={RELEASES_REPO}>update endpoint</a> are both open source, so
        each claim above can be checked against the code that makes it.
      </p>

      <h2>What we could hand over</h2>
      <p>
        If compelled, we could produce what we hold: aggregate daily counters
        of update checks per version and platform. That is the whole list. No
        keys, no plaintext and no file names, for anyone: the design never
        sends them to us.
      </p>

      <h2>Your rights, formally</h2>
      <p>
        The controller for the data above is Software Hive S.R.L., CUI
        RO54366095, Voicești, Vâlcea, Romania. You have the GDPR rights to
        access, correct, export, delete and restrict what we hold, exercised
        by writing to the address below, and the right to complain to a
        supervisory authority; in Romania that is{" "}
        <a href="https://www.dataprotection.ro">ANSPDCP</a>, and in the rest
        of the EU your national authority.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy:{" "}
        <a href="mailto:contact@silentsilo.com">contact@silentsilo.com</a>.
      </p>
    </main>
  );
}
