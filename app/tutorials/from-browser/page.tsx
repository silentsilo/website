import type { Metadata } from "next";
import Link from "next/link";
import { MoreGuides } from "../MoreGuides";
import { DeleteTheExport, ImportInApp, OtherMoves } from "../MovingIn";

export const metadata: Metadata = {
  title: "Move from your browser",
  description:
    "Export the passwords saved in Chrome, Edge, Firefox or Apple Passwords and import them into SilentSilo.",
};

export default function FromBrowser() {
  return (
    <main id="main" className="wrap prose">
      <h1>Move from your browser</h1>
      <p className="lead">
        Chrome, Edge, Firefox and Apple Passwords each export their saved
        passwords to a CSV file.
      </p>

      <nav className="toc" aria-label="On this page">
        <p className="toc-head">On this page</p>
        <ol>
          <li>
            <a href="#export">Export</a>
          </li>
          <li>
            <a href="#import">Import it into SilentSilo</a>
          </li>
          <li>
            <a href="#what-comes-over">What comes over</a>
          </li>
          <li>
            <a href="#afterwards">Afterwards</a>
          </li>
        </ol>
      </nav>

      <h2 id="export">Export from the browser</h2>
      <h3 id="chrome">Chrome</h3>
      <p>
        Open the menu, then{" "}
        <strong>Passwords and autofill &gt; Google Password Manager &gt;
        Settings</strong>, and next to <strong>Export passwords</strong>{" "}
        choose <strong>Download file</strong>. Chrome may ask for your
        computer&apos;s password first.{" "}
        <a href="https://support.google.com/chrome/answer/95606">
          Google&apos;s guide
        </a>
        .
      </p>
      <h3 id="edge">Edge</h3>
      <p>
        Open <strong>Settings and more &gt; Passwords</strong>, then the{" "}
        <strong>More</strong> menu, <strong>Export passwords</strong>, and{" "}
        <strong>Export</strong> to confirm.
        Edge exports from the computer only, not from its phone apps.{" "}
        <a href="https://support.microsoft.com/en-us/edge/export-passwords-in-microsoft-edge">
          Microsoft&apos;s guide
        </a>
        .
      </p>
      <h3 id="firefox">Firefox</h3>
      <p>
        Open the menu, then <strong>Passwords</strong>. In the page that
        opens, open its menu and choose <strong>Export Passwords…</strong>,
        then <strong>Continue with export</strong>.{" "}
        <a href="https://support.mozilla.org/en-US/kb/export-login-data-firefox">
          Mozilla&apos;s guide
        </a>
        .
      </p>
      <h3 id="apple-passwords">Apple Passwords on a Mac</h3>
      <p>
        In the Passwords app, choose{" "}
        <strong>File &gt; Export All Passwords to File</strong>, then{" "}
        <strong>Export Passwords</strong>.{" "}
        <a href="https://support.apple.com/guide/passwords/mchl35b12625/mac">
          Apple&apos;s guide
        </a>
        .
      </p>
      <p>The steps are as of October 2026.</p>

      <ImportInApp
        file={<>the CSV file</>}
      />

      <h2 id="what-comes-over">What comes over</h2>
      <ul>
        <li>
          Each saved login: site, username and password. Notes come from
          Chrome, Edge and Apple Passwords; one-time codes from Apple
          Passwords.
        </li>
        <li>
          Left out: passkeys, which none of these put in the file. Apple
          Passwords also leaves out Wi-Fi passwords and passwords in shared
          groups you did not create.
        </li>
      </ul>
      <p>
        Once the logins are in SilentSilo, turn off the browser&apos;s own
        offer to save passwords, so new ones do not end up in two places.
        The <Link href="/tutorials/browser-extension/">extension</Link>{" "}
        fills them from the silo instead.
      </p>
      <DeleteTheExport />
      <OtherMoves here="/tutorials/from-browser/" />
      <MoreGuides />
    </main>
  );
}
