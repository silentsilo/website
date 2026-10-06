import type { Metadata } from "next";
import { MoreGuides } from "../MoreGuides";
import { DeleteTheExport, ImportInApp, OtherMoves } from "../MovingIn";

export const metadata: Metadata = {
  title: "Move from Dashlane",
  description:
    "Export your Dashlane vault to CSV from the web app and import the logins into SilentSilo.",
};

export default function FromDashlane() {
  return (
    <main id="main" className="wrap prose">
      <h1>Move from Dashlane</h1>
      <p className="lead">
        Dashlane exports a zip of several CSV files, one per kind of item.
        The logins are in one of them.
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

      <h2 id="export">Export from Dashlane</h2>
      <ol>
        <li>
          In the Dashlane web app, open the <strong>Vault</strong> menu at the
          top left, then <strong>Settings &gt; Export data</strong>.
        </li>
        <li>
          Choose <strong>Export to CSV</strong> and unlock when asked. A zip
          file downloads.
        </li>
        <li>
          Unzip it. The logins are in <code>credentials.csv</code>.
        </li>
      </ol>
      <p>
        Dashlane&apos;s phone and Mac apps export to CSV as well. Not the{" "}
        <code>.dash</code> format: it is encrypted for Dashlane alone. The steps follow{" "}
        <a href="https://support.dashlane.com/hc/en-us/articles/32905278138002">
          Dashlane&apos;s own guide
        </a>
        , as of October 2026.
      </p>

      <ImportInApp
        file={<><code>credentials.csv</code></>}
      />

      <h2 id="what-comes-over">What comes over</h2>
      <ul>
        <li>
          Logins: title, address, username, password, notes, one-time codes
          and the category.
        </li>
        <li>
          In the other files of the zip and not imported: secure notes,
          payments, IDs and personal details. Dashlane exports no passkeys and
          no attachments, and logins shared with you as{" "}
          <em>Can autofill</em> are not in the file.
        </li>
      </ul>
      <DeleteTheExport />
      <OtherMoves here="/tutorials/from-dashlane/" />
      <MoreGuides />
    </main>
  );
}
