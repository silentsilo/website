import type { Metadata } from "next";
import { MoreGuides } from "../MoreGuides";
import { DeleteTheExport, ImportInApp, OtherMoves } from "../MovingIn";

export const metadata: Metadata = {
  title: "Move from 1Password",
  description:
    "Export logins from the 1Password desktop app as CSV and import them into SilentSilo, with their one-time codes.",
};

export default function From1Password() {
  return (
    <main id="main" className="wrap prose">
      <h1>Move from 1Password</h1>
      <p className="lead">
        1Password exports from its desktop app. Its CSV carries logins and
        passwords, one-time codes included.
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

      <h2 id="export">Export from 1Password</h2>
      <ol>
        <li>
          Open the 1Password desktop app and unlock it. On Windows and Linux,
          open the <strong>⋯</strong> menu at the top of the sidebar and
          choose <strong>Export</strong>; on a Mac,{" "}
          <strong>File &gt; Export</strong>.
        </li>
        <li>Choose the account and enter its password.</li>
        <li>
          Choose <strong>CSV</strong> as the format, then{" "}
          <strong>Export Data</strong>, and save the file.
        </li>
      </ol>
      <p>
        SilentSilo reads the CSV, not 1Password&apos;s own <code>.1pux</code>{" "}
        format. 1Password exports only from its desktop apps, and an account
        that unlocks with single sign-on needs an administrator to allow it.
        The steps follow{" "}
        <a href="https://support.1password.com/export/">
          1Password&apos;s own guide
        </a>
        , as of October 2026.
      </p>

      <ImportInApp
        file={<>the CSV file</>}
      />

      <h2 id="what-comes-over">What comes over</h2>
      <ul>
        <li>
          Login and Password items: name, address, username, password,
          notes, and one-time codes. Tags become the category.
        </li>
        <li>
          Left out by 1Password&apos;s CSV: every other kind of item (cards,
          identities, secure notes), attached files and documents, custom
          fields, and passkeys. Add those by hand; a card or an identity is a
          minute&apos;s work under <strong>Add entry</strong>.
        </li>
      </ul>
      <DeleteTheExport />
      <OtherMoves here="/tutorials/from-1password/" />
      <MoreGuides />
    </main>
  );
}
