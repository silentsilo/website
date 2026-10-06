import type { Metadata } from "next";
import { MoreGuides } from "../MoreGuides";
import { DeleteTheExport, ImportInApp, OtherMoves } from "../MovingIn";

export const metadata: Metadata = {
  title: "Move from LastPass",
  description:
    "Export your LastPass vault to CSV from the browser extension and import it into SilentSilo, and the one thing to check in the file first.",
};

export default function FromLastPass() {
  return (
    <main id="main" className="wrap prose">
      <h1>Move from LastPass</h1>
      <p className="lead">
        LastPass exports from its browser extension, to one CSV of
        passwords and notes.
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

      <h2 id="export">Export from LastPass</h2>
      <ol>
        <li>Sign in to the LastPass browser extension.</li>
        <li>
          Open the <strong>Account</strong> tab, then{" "}
          <strong>Fix a problem yourself &gt; Export vault items &gt; Export
          data for use anywhere</strong>.
        </li>
        <li>
          Enter your master password if asked. The CSV file downloads; in
          Safari it opens in a tab instead, and you save it with{" "}
          <strong>Save Page As</strong>.
        </li>
      </ol>
      <p>
        The steps follow{" "}
        <a href="https://community.lastpass.com/kb/articles/40-export-vault-data-from-lastpass-as-a-generic-csv-file%EF%BB%BF">
          LastPass&apos;s own article
        </a>
        , as of October 2026. Business accounts may have export turned off by
        an administrator.
      </p>
      <div className="notice">
        <strong>Check the file first.</strong> LastPass exports have been
        known to write <code>&amp;</code>, <code>&lt;</code> and{" "}
        <code>&gt;</code> as <code>&amp;amp;</code>, <code>&amp;lt;</code>{" "}
        and <code>&amp;gt;</code>. Open the CSV in a text editor and search
        for <code>&amp;amp;</code>. If a password contains one, replace them
        before the import, or the password comes in with the extra
        characters.
      </div>

      <ImportInApp
        file={<>the CSV file</>}
      />

      <h2 id="what-comes-over">What comes over</h2>
      <ul>
        <li>
          Logins: name, address, username, password and notes. Folders become
          categories. LastPass does not export one-time codes, so set those
          up again in SilentSilo.
        </li>
        <li>
          Left out: secure notes with no password (the summary counts them),
          attached files, which LastPass does not export, and custom fields.
        </li>
      </ul>
      <DeleteTheExport />
      <OtherMoves here="/tutorials/from-lastpass/" />
      <MoreGuides />
    </main>
  );
}
