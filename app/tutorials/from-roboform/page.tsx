import type { Metadata } from "next";
import { MoreGuides } from "../MoreGuides";
import { DeleteTheExport, ImportInApp, OtherMoves } from "../MovingIn";

export const metadata: Metadata = {
  title: "Move from RoboForm",
  description:
    "Export your RoboForm logins to CSV and import them into SilentSilo.",
};

export default function FromRoboForm() {
  return (
    <main id="main" className="wrap prose">
      <h1>Move from RoboForm</h1>
      <p className="lead">
        RoboForm exports logins to CSV from its browser extension or its
        desktop app.
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

      <h2 id="export">Export from RoboForm</h2>
      <ol>
        <li>
          Click the RoboForm extension, then the three dots, then{" "}
          <strong>Settings</strong>.
        </li>
        <li>
          Open <strong>Account &amp; Data</strong>, then{" "}
          <strong>Export</strong>, and enter your master password.
        </li>
        <li>
          Export <strong>Logins</strong> as CSV. The file lands in your
          Downloads folder.
        </li>
      </ol>
      <p>
        The steps follow{" "}
        <a href="https://help.roboform.com/hc/en-us/articles/230425008">
          RoboForm&apos;s own guide
        </a>
        , as of October 2026.
      </p>

      <ImportInApp
        file={<>the CSV file</>}
      />

      <h2 id="what-comes-over">What comes over</h2>
      <ul>
        <li>Logins: name, address, username, password, notes and folder.</li>
        <li>
          Left out: identities and contacts, which RoboForm does not export to
          CSV, and safenotes with no password.
        </li>
      </ul>
      <DeleteTheExport />
      <OtherMoves here="/tutorials/from-roboform/" />
      <MoreGuides />
    </main>
  );
}
