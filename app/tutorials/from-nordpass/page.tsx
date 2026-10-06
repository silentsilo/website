import type { Metadata } from "next";
import { MoreGuides } from "../MoreGuides";
import { DeleteTheExport, ImportInApp, OtherMoves } from "../MovingIn";

export const metadata: Metadata = {
  title: "Move from NordPass",
  description:
    "Export your NordPass items to CSV and import the logins into SilentSilo.",
};

export default function FromNordPass() {
  return (
    <main id="main" className="wrap prose">
      <h1>Move from NordPass</h1>
      <p className="lead">
        NordPass exports every item to one CSV file.
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

      <h2 id="export">Export from NordPass</h2>
      <ol>
        <li>
          Open NordPass and the settings, the cog icon at the upper left.
        </li>
        <li>
          Under <strong>Import and Export</strong>, choose{" "}
          <strong>Export items</strong>, enter your master password and
          continue.
        </li>
        <li>Save the CSV file.</li>
      </ol>
      <p>
        The steps follow{" "}
        <a href="https://support.nordpass.com/hc/en-us/articles/360007646477">
          NordPass&apos;s own guide
        </a>
        , as of October 2026.
      </p>

      <ImportInApp
        file={<>the CSV file</>}
      />

      <h2 id="what-comes-over">What comes over</h2>
      <ul>
        <li>
          Logins: name, address, username, password, notes and one-time codes
          where the file has them. Folders become categories.
        </li>
        <li>
          Left out: notes, cards and personal details with no password (the
          summary counts them), and passkeys, which NordPass does not export.
        </li>
      </ul>
      <DeleteTheExport />
      <OtherMoves here="/tutorials/from-nordpass/" />
      <MoreGuides />
    </main>
  );
}
