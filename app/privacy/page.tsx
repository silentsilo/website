import type { Metadata } from "next";
import { REPO, RELEASES_REPO } from "../links";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What this site and the SilentSilo app do and do not collect. The complete list is short.",
};

export default function Privacy() {
  return (
    <main id="main" className="wrap prose">
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
        SilentSilo has no account of its own and tracks nothing. Every
        network request the app can make is on this list, each under your
        control:
      </p>
      <ul>
        <li>
          <strong>Sync and backup</strong>, only if you configure it, and only
          to storage you chose: your OneDrive, Dropbox or Google Drive, your
          bucket, your server, your folder. What the storage provider can and
          cannot see is described on the{" "}
          <a href="/security/">security page</a>.
        </li>
        <li>
          <strong>OneDrive, Dropbox and Google Drive</strong>, only if you
          connect one. You sign in on the provider&apos;s own page, in your
          browser; the app never sees the password. It then talks to that
          provider only: its sign-in and token addresses
          (login.microsoftonline.com, api.dropboxapi.com,
          oauth2.googleapis.com) and its file service (graph.microsoft.com,
          api.dropboxapi.com and content.dropboxapi.com,
          www.googleapis.com). It asks for its own folder and nothing else in
          the account: OneDrive&apos;s app folder, Dropbox&apos;s app folder,
          and at Google only the files the app itself created. It also reads
          your email address, to show which account is connected; that stays
          on your device, as does the sign-in, in the system&apos;s credential
          store. The provider sees your account, your IP address, the name of
          the silo folder, and the sizes and times of what is written;
          everything inside the folder is encrypted. To take the access back:
          Microsoft at microsoft.com/consent, Dropbox under Settings, Apps,
          Google at myaccount.google.com/linkedapps.
          Removing the copy in SilentSilo ends the sign-in on that device, and
          at Dropbox also on their side.
        </li>
        <li>
          <strong>The update check</strong> (desktop app only). At most once a day, the app asks
          releases.silentsilo.com whether a newer version exists. That
          request contains your app version and platform, nothing else. The
          endpoint runs on Cloudflare. Each check writes one row to
          Cloudflare&apos;s analytics service with the platform, the version
          and the outcome, which is how we estimate active installs; no row
          can tell one install from another. Versions before 1.2.0 often
          wrote two to four rows for one check. Cloudflare relays the request
          and sees your IP address. SilentSilo does not receive it or keep
          it. The check can be turned off in Settings, and turning it off
          removes you from the count entirely.
        </li>
        <li>
          <strong>The breach check</strong> (desktop app only), only when you
          press its button in Health. The first five characters of each password&apos;s SHA-1 hash
          go to Have I Been Pwned&apos;s range API, run by a third party; the
          passwords themselves never leave your machine, the responses are
          padded so their size reveals nothing, and the request does not pass
          through us at all. Never press the button, and that service never
          hears from you.
        </li>
        <li>
          <strong>Site icons</strong> (desktop app only), only if you switch them on. Off by
          default. Turned on, the passwords list asks each saved site for
          its <code>favicon.ico</code> directly, which tells that site your IP
          address and the fact that you hold an account there, every time the
          list is drawn. It is the one request that goes to somebody we have
          no relationship with and you did not configure, which is why it is
          off until you decide otherwise. A site saved as a private or
          loopback address, as localhost, or under .local or .internal is
          never asked. Any other name is asked, including a name on your own
          network that the app cannot tell from a public one. The toggle sits
          above the list, in Passwords.
        </li>
      </ul>
      <p>
        SilentSilo&apos;s use of information received from Google APIs adheres
        to the{" "}
        <a href="https://developers.google.com/terms/api-services-user-data-policy">
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements.
      </p>
      <h2>The Android app</h2>
      <p>
        The phone makes the sync and backup requests above, including the
        sign-in to OneDrive, Dropbox or Google Drive, to the storage you
        chose, and nothing else of its own. It has no update check: the
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

      <h2>The iPhone app</h2>
      <p>
        The iPhone makes the same sync and backup requests, to the storage
        you chose, and nothing else of its own. It has no update check: the
        App Store delivers updates. Signing in to OneDrive, Dropbox or Google
        Drive shows the provider&apos;s own page in a system sheet, without
        Safari&apos;s cookies, and the answer comes back to the app on the
        iPhone itself.
      </p>
      <ul>
        <li>
          <strong>Face ID or Touch ID</strong> stays with iOS. The silo&apos;s
          key is made in the iPhone&apos;s Secure Enclave and is used there
          after iOS recognises you; the app never sees your face or
          fingerprint.
        </li>
        <li>
          <strong>Security keys</strong> over NFC exchange only what unlocking
          needs with the key itself. Its PIN goes to the key and is not kept.
        </li>
        <li>
          <strong>Files and photos</strong> are read only when you pick them,
          take a photo for the silo or share them from another app, and are
          encrypted on the iPhone. Saving a file to Photos happens only when
          you choose it.
        </li>
        <li>
          <strong>Phone backup</strong>, only if you turn it on, reads the
          photos and videos in the albums you choose, with where they were
          taken when the file records it, and your contacts. Each is
          encrypted on the iPhone and sent to your silo&apos;s storage. We
          receive none of it.
        </li>
        <li>
          <strong>AutoFill</strong> reads the name of the app or site iOS
          passes to it, to put its logins first, opens your silo on the iPhone
          after Face ID and gives iOS the one login you pick. It sends nothing
          anywhere.
        </li>
      </ul>
      <p>
        The iPhone app sends nothing to us, so we hold nothing from it to keep
        or delete.
      </p>

      <h2 id="browser-extension">The browser extension</h2>
      <p>
        The SilentSilo extension for Chrome, Edge, Brave and Firefox works only
        with the SilentSilo app on the same computer, and only once you turn
        it on in the app. It makes no network requests and has no analytics.
      </p>
      <ul>
        <li>
          <strong>When you click its button</strong>, it reads the address
          of the tab you are on and sends it to the SilentSilo app on your
          computer, to find the logins saved for that site. It reads no other
          tab, and of the page only the type and position of the fields it
          may fill, never what is typed or shown.
        </li>
        <li>
          <strong>When you choose Save this login</strong> (from version
          0.2), it reads the username and password typed in that page&apos;s
          login form, once, and sends them to the SilentSilo app on your
          computer, which asks you whether to save them. The extension keeps
          neither.
        </li>
        <li>
          <strong>When you confirm a fill</strong> in the app, with Windows
          Hello or your security key, the app gives it one username and
          password. It writes them into those two fields and does not keep
          them.
        </li>
        <li>
          <strong>It stores nothing:</strong> no logins, no list of sites, no
          settings. It sends nothing to us or to anyone else.
        </li>
      </ul>

      <h2>What we could hand over</h2>
      <p>
        If compelled, we could produce what we hold: the update check rows
        on Cloudflare, each with a platform, a version, an outcome and a
        time. The consoles where Software Hive registered the app with
        Microsoft, Dropbox and Google show how many accounts have connected
        it, as a number; they do not show us who, and no file, token or
        address passes through us. That is the whole list. No
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
