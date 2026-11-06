import type { Metadata } from "next";
import Link from "next/link";
import { MoreGuides } from "../MoreGuides";
import { ThemedImg } from "../../ThemedImg";

export const metadata: Metadata = {
  title: "Passwords and one-time codes",
  description:
    "Logins, cards, identities, notes and SSH keys in the silo: one-time codes, the generator, extra fields, attachments, earlier versions and entries that ask for your key.",
};

export default function Passwords() {
  return (
    <main id="main" className="wrap prose">
      <h1>Passwords and one-time codes</h1>
      <p className="lead">
        Passwords live in the same silo as your files, encrypted the same
        way, and sync through the same backup storage. This guide covers
        what an entry can hold and the parts that are easy to miss.
      </p>

      <nav className="toc" aria-label="On this page">
        <p className="toc-head">On this page</p>
        <ol>
          <li>
            <a href="#add-an-entry">Add an entry</a>
          </li>
          <li>
            <a href="#one-time-codes">One-time codes</a>
          </li>
          <li>
            <a href="#the-generator">The generator</a>
          </li>
          <li>
            <a href="#more-than-a-password">More than a password</a>
          </li>
          <li>
            <a href="#earlier-versions">Earlier versions</a>
          </li>
          <li>
            <a href="#recently-deleted">Recently deleted</a>
          </li>
          <li>
            <a href="#ask-for-the-key">Ask for the key</a>
          </li>
          <li>
            <a href="#health">Health</a>
          </li>
          <li>
            <a href="#using-them">Using them</a>
          </li>
        </ol>
      </nav>

      <h2 id="add-an-entry">Add an entry</h2>
      <p>
        Open <strong>Passwords</strong> and click <strong>Add entry</strong>.
        Choose the kind: a login, a card, an identity (name, address, phone),
        an SSH key or a note. Fill in what you have and click{" "}
        <strong>Save</strong>. Categories down the side keep them apart, and
        the star adds an entry to <strong>Favourites</strong>.
      </p>
      <p>
        Coming from another password manager? <strong>Import</strong> reads a
        KeePass file, Bitwarden&apos;s JSON or zip, and the CSV exports of the
        usual apps and browsers. Each has a{" "}
        <Link href="/tutorials/">moving-in guide</Link>.
      </p>
      <p>
        To give passwords to someone else who uses SilentSilo, or move them
        to another silo, export them to a SilentSilo file: the{" "}
        <Link href="/tutorials/share-passwords/">share or move passwords</Link>{" "}
        guide goes through it.
      </p>

      <h2 id="one-time-codes">One-time codes</h2>
      <p>
        A login can keep the six-digit code a site asks for after the
        password (TOTP), so the code sits beside the password it goes with.
      </p>
      <ol>
        <li>
          On the site, turn on two-factor sign-in with an authenticator app.
          It shows a QR code.
        </li>
        <li>
          On the computer, take a screenshot of the QR code (Win+Shift+S on
          Windows, Cmd+Ctrl+Shift+4 on a Mac), click into{" "}
          <strong>One-time code (TOTP)</strong> in the login&apos;s editor and
          paste it (Ctrl+V, or Cmd+V on a Mac). On the phone, tap the scan
          button beside the field and point the camera at the code.
        </li>
        <li>
          The current code shows at once. Type it on the site to finish
          turning 2FA on, then save the entry.
        </li>
      </ol>
      <p>
        The picture is read on your device and not kept. Without a picture,
        click the link under the QR code, usually{" "}
        <strong>Can&apos;t scan the QR code?</strong>, and paste the text
        secret it shows, or a whole <code>otpauth://</code> link, into the
        same field. A screenshot saved as a file holds the secret
        unencrypted: delete it once the code works.
      </p>
      <figure className="tut-shot">
        <ThemedImg
          base="/shots/tut-password-edit"
          alt="A login in the editor, with the One-time code (TOTP) field"
          width={1200}
          height={800}
          sizes="(max-width: 52rem) 100vw, 47rem"
        />
      </figure>
      <figure className="tut-shot">
        <ThemedImg
          base="/shots/tut-password-totp"
          alt="A saved login showing its current one-time code and the seconds left"
          width={1200}
          height={800}
          sizes="(max-width: 52rem) 100vw, 47rem"
        />
      </figure>
      <p>
        Keep the site&apos;s backup codes somewhere else too, such as a note
        in another silo or on paper. A code kept with its password protects
        against a leaked password, not against someone who has the silo
        open.
      </p>

      <h2 id="the-generator">The generator</h2>
      <p>
        In a login&apos;s editor, <strong>Generate new password</strong> fills
        in a random one. <strong>Generator options</strong> choose between{" "}
        <strong>Characters</strong> (the length and which kinds) and{" "}
        <strong>Words</strong>: random words such as{" "}
        <code>crane-velvet-orbit-mango-tundra-acid</code>, easy to type on a TV
        or read out. Six words are as hard to guess as a random
        12-character password with symbols. The previous password goes into
        the entry&apos;s earlier versions, so a change you regret is not lost.
      </p>
      <p>
        The button beside the username fills in a random one, such as{" "}
        <code>velvet_orbit42</code>, for sites where the name does not need
        to be yours.
      </p>
      <figure className="tut-shot">
        <ThemedImg
          base="/shots/tut-generator-words"
          alt="The generator set to Words, six of them separated by hyphens, beside a password made of random words"
          width={1200}
          height={800}
          sizes="(max-width: 52rem) 100vw, 47rem"
        />
      </figure>

      <h2 id="more-than-a-password">More than a password</h2>
      <ul>
        <li>
          <strong>Custom fields</strong>: a customer number, a PIN, a
          security question. Tick <strong>Hidden</strong> and the value is
          masked and copied like a password.
        </li>
        <li>
          <strong>Attached files</strong>: a scan, a key file, a licence.
          They are encrypted with the entry and do not show in Files.
        </li>
        <li>
          <strong>Notes</strong>: free text, kept as secret as the password.
        </li>
      </ul>

      <h2 id="earlier-versions">Earlier versions</h2>
      <p>
        Every saved change keeps the version before it. Open the entry,
        expand <strong>Earlier versions</strong> and click{" "}
        <strong>Restore</strong> beside the one you want. How many are kept
        is under <strong>Settings &gt; General</strong>.
      </p>

      <h2 id="recently-deleted">Recently deleted</h2>
      <p>
        A deleted entry is not gone at once. It waits in{" "}
        <strong>Recently deleted</strong> for 30 days, on every device:
        the button beside Import on the computer, the last row of the list
        on the phone. <strong>Put back</strong> restores it as it was, with
        its history and attached files. After 30 days it is gone for good.
      </p>
      <figure className="tut-shot">
        <ThemedImg
          base="/shots/tut-trash"
          alt="Recently deleted, listing two deleted entries, each with Put back"
          width={1200}
          height={800}
          sizes="(max-width: 52rem) 100vw, 47rem"
        />
      </figure>

      <h2 id="ask-for-the-key">Ask for the key</h2>
      <p>
        For the few entries that matter most (the bank, the email account,
        the recovery codes of other services), tick{" "}
        <strong>Ask for my key before showing this entry</strong> under{" "}
        <strong>Protection</strong>. Showing or copying any of its secrets,
        and opening its files, then needs one of the silo&apos;s keys, even
        with the silo open. One confirmation covers the next few minutes.
      </p>

      <h2 id="health">Health</h2>
      <p>
        <strong>Health</strong>, in the sidebar, looks over the silo on
        your device and says what to fix first:
      </p>
      <ul>
        <li>
          <strong>Passwords</strong>: the same one on several sites, weak
          ones, ones unchanged for two years, an entry back on a password it
          had before, and entries stored twice.
        </li>
        <li>
          <strong>Addresses</strong>: logins whose address starts with{" "}
          <code>http://</code>, where the password crosses the internet
          unencrypted. A router or a NAS at home is left out.
        </li>
        <li>
          <strong>Two-factor</strong>: logins for sites that offer a code,
          by the public 2fa.directory list built into the app, with no code
          saved yet. Sites without two-factor are not counted.
        </li>
        <li>
          <strong>Breaches</strong>: only when you press its button, each
          password is checked against Have I Been Pwned. Only the first five
          characters of its hash leave the device.
        </li>
        <li>
          <strong>The silo itself</strong>: no recovery code, a single key,
          no backup, a backup failing or never tested, and a disk running
          out of room.
        </li>
      </ul>
      <p>
        A finding that is not critical can be set aside, and it stays quiet
        until something about it changes.
      </p>

      <h2 id="using-them">Using them</h2>
      <ul>
        <li>
          Copy buttons sit beside each field. A copied password is cleared
          from the clipboard after 45 seconds and kept out of Windows&apos;
          clipboard history.
        </li>
        <li>
          In the browser, the{" "}
          <Link href="/tutorials/browser-extension/">extension</Link> fills
          logins, each confirmed in the app.
        </li>
        <li>
          In other programs on the computer,{" "}
          <Link href="/tutorials/auto-type/">auto-type</Link> types the
          username and password for you.
        </li>
        <li>
          On the phone, the <Link href="/tutorials/phone/">app</Link> fills
          logins in other apps.
        </li>
        <li>
          <strong>Health</strong> points out reused, weak and old passwords,
          and checks them against known breaches when you ask it to.
        </li>
      </ul>
      <MoreGuides />
    </main>
  );
}
