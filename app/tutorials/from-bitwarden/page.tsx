import type { Metadata } from "next";
import { MoreGuides } from "../MoreGuides";
import { DeleteTheExport, ImportInApp, OtherMoves } from "../MovingIn";

export const metadata: Metadata = {
  title: "Move from Bitwarden",
  description:
    "Export your Bitwarden vault as JSON, or as a zip with attachments, and import it into SilentSilo: logins, cards, identities, SSH keys, notes and custom fields.",
};

export default function FromBitwarden() {
  return (
    <main id="main" className="wrap prose">
      <h1>Move from Bitwarden</h1>
      <p className="lead">
        Bitwarden&apos;s JSON export carries every kind of item, and its
        zip adds the attached files. Both import as they are.
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

      <h2 id="export">Export from Bitwarden</h2>
      <ol>
        <li>
          In the Bitwarden web app, open <strong>Tools &gt; Export</strong>.
          In the browser extension it is{" "}
          <strong>Settings &gt; Vault options &gt; Export vault</strong>.
        </li>
        <li>
          Export from <strong>My vault</strong>. As the format choose{" "}
          <strong>.json</strong>, or <strong>.zip (with attachments)</strong>{" "}
          if items have files attached.
        </li>
        <li>
          Confirm with your master password (or the email code Bitwarden
          sends) and save the file.
        </li>
      </ol>
      <p>
        Not <strong>.json (Encrypted)</strong>: only Bitwarden can open it.
        Items of a Bitwarden organisation are exported from the Admin Console
        by an owner or admin, or a member with the Manage collection
        permission, as <strong>.json</strong>; that export has no zip with
        files. The steps above follow{" "}
        <a href="https://bitwarden.com/help/export-your-data/">
          Bitwarden&apos;s own guide
        </a>
        , as of October 2026.
      </p>

      <ImportInApp
        file={<>the <code>.json</code> or <code>.zip</code> file</>}
      />

      <h2 id="what-comes-over">What comes over</h2>
      <ul>
        <li>
          Logins with their one-time codes, cards, identities, SSH keys and
          secure notes. Folders become categories.
        </li>
        <li>Custom fields, hidden ones masked.</li>
        <li>
          From the zip, attached files, each with its item. Bitwarden names a
          file&apos;s folder after its item; when two items share a name, the
          file cannot be told apart and goes on one note,{" "}
          <em>Files from Bitwarden</em>, rather than onto the wrong login.
        </li>
        <li>
          Left out: passkeys (the summary counts them), items in the trash,
          and Sends. A Bitwarden CSV export carries logins and notes only, so
          prefer JSON.
        </li>
      </ul>
      <DeleteTheExport />
      <OtherMoves here="/tutorials/from-bitwarden/" />
      <MoreGuides />
    </main>
  );
}
