import type { Metadata } from "next";
import { MoreGuides } from "../MoreGuides";
import { DeleteTheExport, ImportInApp, OtherMoves } from "../MovingIn";

export const metadata: Metadata = {
  title: "Move from Proton Pass",
  description:
    "Export your Proton Pass vaults to CSV from the web app, the Windows app or the extension, and import the logins into SilentSilo.",
};

export default function FromProtonPass() {
  return (
    <main id="main" className="wrap prose">
      <h1>Move from Proton Pass</h1>
      <p className="lead">
        Proton Pass exports from its web app, its Windows app and its
        browser extension. The CSV is the one to choose.
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

      <h2 id="export">Export from Proton Pass</h2>
      <ol>
        <li>
          In the web app, open the gear icon at the bottom left. In the
          Windows app or the browser extension, open the ☰ menu, then the
          gear icon. Then open the <strong>Export</strong> tab.
        </li>
        <li>
          Choose <strong>CSV</strong> as the format and save the file.
        </li>
      </ol>
      <p>
        Proton Pass does not export from its phone apps. The steps follow{" "}
        <a href="https://proton.me/support/pass-export">
          Proton&apos;s own guide
        </a>
        , as of October 2026.
      </p>

      <ImportInApp
        file={<>the CSV file</>}
      />

      <h2 id="what-comes-over">What comes over</h2>
      <ul>
        <li>
          Logins with their one-time codes, from the vaults you own. Each
          vault becomes a category. A login with several addresses keeps the
          first; the others go into its notes.
        </li>
        <li>
          Left out: anything with no password or one-time code (notes, cards,
          identities, aliases; the summary counts them), passkeys, attached
          files, and vaults others shared with you.
        </li>
        <li>
          Items in Proton Pass&apos;s trash are in the file too. Empty the
          trash first if you do not want them.
        </li>
      </ul>
      <DeleteTheExport />
      <OtherMoves here="/tutorials/from-proton-pass/" />
      <MoreGuides />
    </main>
  );
}
