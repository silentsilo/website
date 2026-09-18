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
        from this domain. The site is static files. Cloudflare serves it, so
        Cloudflare sees your IP address and the pages you request.
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
          request contains your app version and platform, nothing else. The
          endpoint runs on Cloudflare. Each check writes one row to
          Cloudflare&apos;s analytics service with the platform, the version
          and the outcome, which is how we estimate active installs; no row
          can tell one install from another. Cloudflare relays the request
          and sees your IP address. SilentSilo does not receive it or keep
          it. The check can be turned off in Settings, and turning it off
          removes you from the count entirely.
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
          off until you decide otherwise. A site saved as a private or
          loopback address, as localhost, or under .local or .internal is
          never asked. Any other name is asked, including a name on your own
          network that the app cannot tell from a public one. The toggle sits
          above the list, in Credentials.
        </li>
      </ul>
      <h2>The Android app</h2>
      <p>
        The phone makes the sync and backup requests above, to the storage
        you chose, and nothing else of its own. It has no update check: the
        store delivers updates. What it reads on the phone, only when you
        turn the feature on:
      </p>
      <ul>
        <li>
          <strong>Phone backup</strong> reads the photos and videos in the
          gallery folders you choose, with where they were taken when the
          file records it, and your contacts. Each is encrypted on the phone
          and sent to your silo&apos;s storage. We receive none of it.
        </li>
        <li>
          <strong>Autofill and passkeys</strong> read the name of the app or
          site asking, to offer its logins and passkeys, after your
          fingerprint. Saving a login reads the username and password you
          typed into that app or site. A site name is believed only from a
          browser on Google&apos;s public list of browsers Android trusts,
          shipped inside the app rather than fetched, and passkeys answer
          those browsers only.
        </li>
        <li>
          <strong>Security keys</strong> over NFC or USB exchange only what
          unlocking needs with the key itself. Its PIN goes to the key and is
          not kept.
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
        If compelled, we could produce what we hold: the update check rows
        on Cloudflare, each with a platform, a version, an outcome and a
        time. That is the whole list. No
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
