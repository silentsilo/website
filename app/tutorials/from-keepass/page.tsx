import type { Metadata } from "next";
import { MoreGuides } from "../MoreGuides";
import { DeleteTheExport, ImportInApp, OtherMoves } from "../MovingIn";

export const metadata: Metadata = {
  title: "Move from KeePass or KeePassXC",
  description:
    "Import a KeePass or KeePassXC database (.kdbx) into SilentSilo, with its groups, extra fields, attachments and history, and how to go back.",
};

export default function FromKeePass() {
  return (
    <main id="main" className="wrap prose">
      <h1>Move from KeePass or KeePassXC</h1>
      <p className="lead">
        SilentSilo opens the database file itself, so there is nothing to
        export first. Groups, extra fields, attached files and each
        entry&apos;s history come with it.
      </p>

      <nav className="toc" aria-label="On this page">
        <p className="toc-head">On this page</p>
        <ol>
          <li>
            <a href="#export">What you need</a>
          </li>
          <li>
            <a href="#import">Import it into SilentSilo</a>
          </li>
          <li>
            <a href="#what-comes-over">What comes over</a>
          </li>
        </ol>
      </nav>

      <h2 id="export">What you need</h2>
      <p>
        The <code>.kdbx</code> file, its master password, and its key file if
        it has one. KeePass 2 and KeePassXC write the same format, and both
        KDBX 4 and the older KDBX 3.1 open.
      </p>
      <p>
        A database that also asks for a hardware key (KeePassXC&apos;s
        YubiKey challenge-response) cannot be opened here. Save a copy in
        KeePassXC protected by the password alone, or the password and a key
        file, and import the copy.
      </p>

      <ImportInApp
        file={<>the <code>.kdbx</code> file</>}
        after={
          <>
        <li>
          Enter the database&apos;s master password, and choose its key file
          if it has one. The file is read in memory; attached files are
          encrypted straight into the silo as they are read.
        </li>
          </>
        }
      />

      <h2 id="what-comes-over">What comes over</h2>
      <ul>
        <li>
          Every entry outside the recycle bin. Groups become categories,
          nested ones as <em>Work / Servers</em>.
        </li>
        <li>
          Fields beyond the standard five become custom fields, protected
          ones masked.
        </li>
        <li>Attached files, encrypted in the silo with their entry.</li>
        <li>Each entry&apos;s KeePass history becomes its history here.</li>
        <li>
          Left out: entries in the recycle bin, and empty entries. Passkeys
          KeePassXC keeps come in as custom fields, not as passkeys.
        </li>
      </ul>
      <p>
        The way back is as short: <strong>Passwords &gt; Export</strong>{" "}
        writes every entry to a KeePass file (KDBX 4) under a password you
        choose, which KeePassXC and KeePassDX open.
      </p>

      <OtherMoves here="/tutorials/from-keepass/" />
      <MoreGuides />
    </main>
  );
}
