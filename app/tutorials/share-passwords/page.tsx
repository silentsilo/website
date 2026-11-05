import type { Metadata } from "next";
import Link from "next/link";
import { MoreGuides } from "../MoreGuides";
import { ThemedImg } from "../../ThemedImg";

export const metadata: Metadata = {
  title: "Share or move passwords",
  description:
    "Give some or all of your passwords to someone else who uses SilentSilo, or move them to another silo, in one encrypted file that brings back every entry exactly.",
};

export default function SharePasswords() {
  return (
    <main id="main" className="wrap prose">
      <h1>Share or move passwords</h1>
      <p className="lead">
        A SilentSilo file carries entries from one silo to another: to
        someone in your family, to a colleague, or to a second silo of your
        own. Every kind of entry comes back exactly as it was, with its
        settings, history and attached files, and the file is encrypted with
        a password you choose.
      </p>

      <nav className="toc" aria-label="On this page">
        <p className="toc-head">On this page</p>
        <ol>
          <li>
            <a href="#export">Export</a>
          </li>
          <li>
            <a href="#pass-it-on">Pass it on</a>
          </li>
          <li>
            <a href="#import">Import on the other side</a>
          </li>
          <li>
            <a href="#which-file">Which file to choose</a>
          </li>
          <li>
            <a href="#good-to-know">Good to know</a>
          </li>
        </ol>
      </nav>

      <h2 id="export">Export</h2>
      <ol>
        <li>
          Open <strong>Passwords</strong>. For everything, press{" "}
          <strong>Export all</strong>. For a few entries, tick them in the
          list and press <strong>Export</strong> in the bar that appears.
        </li>
        <li>
          Choose <strong>SilentSilo file</strong>.
        </li>
        <li>
          Confirm with your key, Windows Hello or Touch ID: an export hands
          over passwords, so it always asks.
        </li>
        <li>
          Type a password for the file, twice, at least 8 characters.{" "}
          <strong>Suggest a password</strong> fills in six random words,
          shown so you can write them down or read them out.
        </li>
        <li>
          Choose where to save it. The file ends in{" "}
          <code>.silopwd</code>.
        </li>
      </ol>
      <figure className="tut-shot">
        <ThemedImg
          base="/shots/tut-export"
          alt="The export choice: SilentSilo file, KeePass file and CSV file"
          width={1200}
          height={800}
          sizes="(max-width: 52rem) 100vw, 47rem"
        />
      </figure>

      <h2 id="pass-it-on">Pass it on</h2>
      <p>
        Send the file and the password by different routes: the file by
        email, a USB stick or a shared folder, the password by phone, in
        person or on paper. Either one alone is useless; together they open
        every entry in the file. Delete the file once the other side has
        imported it.
      </p>

      <h2 id="import">Import on the other side</h2>
      <ol>
        <li>
          In SilentSilo on the computer, unlock the silo the entries should go
          into and open <strong>Passwords</strong>.
        </li>
        <li>
          Press <strong>Import</strong> and pick the <code>.silopwd</code>{" "}
          file.
        </li>
        <li>Type the file&apos;s password.</li>
        <li>
          Say where to file the entries: as the file has them, or in one of
          your categories. Categories the file brings, with their colours,
          are added.
        </li>
      </ol>
      <p>
        The entries are added; none already in the silo is overwritten. An
        entry that is already there exactly as in the file is skipped, and
        one that changed since arrives as a second copy, so nothing is lost
        either way. Attached files are encrypted with the receiving
        silo&apos;s own keys.
      </p>

      <h2 id="which-file">Which file to choose</h2>
      <ul>
        <li>
          <strong>SilentSilo file</strong>: for another SilentSilo. Cards,
          identities, SSH keys, &quot;ask for my key&quot;, the SSH agent
          setting, history, attached files and category colours all come back
          as they were. Encrypted.
        </li>
        <li>
          <strong>KeePass file</strong>: for KeePassXC or KeePassDX. Fields,
          attached files and history go, encrypted, but KeePass has no cards
          or identities as such: they arrive as entries with extra fields.
        </li>
        <li>
          <strong>CSV file</strong>: logins only, for another password
          manager. It is not encrypted, so anyone who opens it can read every
          password in it. Delete it as soon as it has been imported.
        </li>
      </ul>

      <h2 id="good-to-know">Good to know</h2>
      <ul>
        <li>
          It is a copy, not a link: a change made later on either side stays
          there. To keep passwords in step between people, share a silo
          instead (see{" "}
          <Link href="/tutorials/organisation-silos/">silos for a team or a company</Link>
          ).
        </li>
        <li>
          Opening the file needs SilentSilo 1.5.1 or later on a computer. The
          phone app does not import it yet.
        </li>
        <li>
          A wrong password and a file that was changed on the way give the
          same message: the file is checked as a whole, and neither opens
          anything.
        </li>
      </ul>
      <MoreGuides />
    </main>
  );
}
