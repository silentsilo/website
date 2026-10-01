import Link from "next/link";

/** What differs between OneDrive, Dropbox and Google Drive. Everything else
 *  in the guide is the same app flow, word for word as the app shows it. */
export type Cloud = {
  name: string;
  company: string;
  /** Where the app's folder sits, as the app's own hint words it. */
  place: string;
  /** The path to look for on the provider's website. */
  path: string;
  account: React.ReactNode;
  access: React.ReactNode;
  revoke: React.ReactNode;
  download: React.ReactNode;
  extra?: React.ReactNode;
};

export function CloudGuide({ c }: { c: Cloud }) {
  return (
    <main id="main" className="wrap prose">
      <h1>Back up to {c.name}</h1>
      <p className="lead">
        If you already have {c.name}, it can hold an encrypted copy of your
        silo. You sign in once, in your browser, and the app writes to its
        own folder there. Nothing to rent, no keys to copy.
      </p>

      <nav className="toc" aria-label="On this page">
        <p className="toc-head">On this page</p>
        <ol>
          <li>
            <a href="#before-you-start">Before you start</a>
          </li>
          <li>
            <a href="#connect-it">Connect it</a>
          </li>
          <li>
            <a href="#what-name-sees">What {c.company} sees</a>
          </li>
          <li>
            <a href="#another-computer-or-your-phone">Another computer, or your phone</a>
          </li>
          <li>
            <a href="#when-the-sign-in-stops-working">When the sign-in stops working</a>
          </li>
          <li>
            <a href="#taking-the-access-back">Taking the access back</a>
          </li>
          <li>
            <a href="#prove-it-works">Prove it works</a>
          </li>
        </ol>
      </nav>

      <h2 id="before-you-start">Before you start</h2>
      {c.account}
      <p>
        It takes SilentSilo 1.3 or later on the computer, or the Android
        app. Update every computer that uses the silo first: one still on
        1.2 cannot reach {c.name}, and if {c.name} is the silo&apos;s only
        storage, that computer stops syncing.
      </p>

      <h2 id="connect-it">Connect it</h2>
      <ol>
        <li>
          Unlock the silo and open <strong>Settings &gt; Backup</strong>. On
          a new silo, the same screen appears as the second step:{" "}
          <strong>Set up backup storage</strong>. For a second copy, press{" "}
          <strong>Add another copy</strong> under the list of copies instead.
        </li>
        <li>
          Under <strong>An account you already have</strong>, choose{" "}
          <strong>{c.name}</strong>.
        </li>
        <li>
          Press <strong>Connect {c.name}</strong>. {c.company}&apos;s sign-in
          page opens in your browser. Sign in there and allow access. The
          page then says <strong>Signed in to {c.name}</strong>; close it and
          go back to SilentSilo, which shows{" "}
          <strong>Connected as</strong> and your account.
        </li>
        <li>
          Keep the <strong>Folder name</strong>, <code>Silo</code>, or type
          another. It goes in {c.place}. One folder per silo: two silos
          need two names.
        </li>
        <li>
          Press <strong>Save and connect</strong>, or{" "}
          <strong>Add this copy</strong> for a second copy. The app writes a
          small test file first, so an account it cannot write to is caught
          before anything is saved. The first sync starts in the background.
        </li>
      </ol>
      <p>
        The sign-in waits five minutes for you to finish in the browser. If
        you close the tab or wait too long, press{" "}
        <strong>Connect {c.name}</strong> again. SilentSilo never sees your{" "}
        {c.company} password: the browser talks to {c.company}, and the app
        only receives a sign-in it can use for its own folder.
      </p>

      <h2 id="what-name-sees">What {c.company} sees</h2>
      <p>
        Everything inside the folder is encrypted on your computer before it
        leaves: file contents, file and folder names, the passwords, the
        structure of the tree. {c.company} sees the account it belongs to,
        your IP address, the name of the silo folder, and how many encrypted
        objects there are, their sizes and when they change. The{" "}
        <a href="https://github.com/silentsilo/core/blob/main/docs/CRYPTO.md#what-the-storage-provider-learns">
          cryptography specification
        </a>{" "}
        lists exactly what any storage can read without a key.
      </p>
      <p>
        Keep the account in use and within its space. Providers freeze an
        account that is over its quota and close one that nobody signs in
        to for long enough, and the encrypted copy goes with it.
      </p>
      {c.access}
      <p>
        On {c.name}&apos;s website the folder is <code>{c.path}</code>. Do not
        move, rename or edit what is inside it: to the app it is a database,
        and a file changed by hand is a file it can no longer open. Deleting
        it there deletes the copy.
      </p>

      <h2 id="another-computer-or-your-phone">Another computer, or your phone</h2>
      <p>
        <strong>A second computer:</strong> install SilentSilo, choose{" "}
        <strong>Set up from backup storage</strong>, then {c.name} and{" "}
        <strong>Connect {c.name}</strong>. Sign in with the same account.
        The app lists the silo folders it finds under{" "}
        <strong>Silo folder</strong>; pick yours, press{" "}
        <strong>See what is there</strong>, then{" "}
        <strong>Set up on this computer</strong> and touch your key, or use
        your recovery code.
      </p>
      <p>
        <strong>Your phone:</strong> on the first screen of the Android app,
        choose <strong>Set up from backup storage</strong>. Under{" "}
        <strong>Where is the backup?</strong>, choose {c.name}, sign in, pick
        the silo folder and press <strong>Continue</strong>. The phone then
        asks for your recovery code and sets up its fingerprint as a key. A
        silo already open on the phone gets this copy under{" "}
        <strong>Silo &gt; Backup storage</strong>. The{" "}
        <Link href="/tutorials/phone/">phone guide</Link> has the rest.
      </p>

      <h2 id="when-the-sign-in-stops-working">When the sign-in stops working</h2>
      <p>
        A sign-in can end on {c.company}&apos;s side: a password change, a
        security review, access taken back. The copy then says{" "}
        <strong>{c.name} no longer accepts this computer&apos;s sign-in</strong>
        . On the computer, press <strong>Sign in again</strong> on that copy
        under <strong>Settings &gt; Backup</strong>, with the same account:
        another account is refused, since it would hold a different copy. On
        the phone, open <strong>Silo &gt; Backup storage</strong>, press{" "}
        <strong>Change</strong> and connect again.
      </p>
      {c.extra}

      <h2 id="taking-the-access-back">Taking the access back</h2>
      <p>
        Removing the copy in SilentSilo ends its sign-in on that computer.
        Nothing in {c.name} is deleted: the encrypted folder stays until you
        delete it there. {c.revoke}
      </p>

      <h2 id="prove-it-works">Prove it works</h2>
      <p>
        Open <strong>Settings &gt; Test backup</strong>, type your recovery
        code under <strong>Test a recovery</strong> and press{" "}
        <strong>Try a recovery now</strong>. It rebuilds the silo from{" "}
        {c.name} using only that code, in a temporary folder, and opens one
        real file.
      </p>
      <p>
        If SilentSilo itself ever stops being available, the folder is still
        yours. {c.download} Then the{" "}
        <Link href="/tutorials/get-files-out/">extraction tool</Link> turns
        it back into ordinary files with the recovery code.
      </p>
      <p>
        One account is one company. If the silo matters, keep a second copy
        on another kind of storage too: a{" "}
        <Link href="/tutorials/backup-folder/">drive</Link>, or a{" "}
        <Link href="/tutorials/copies-nothing-can-erase/">
          copy nothing can erase
        </Link>
        .
      </p>
      <p className="tut-back">
        <Link href="/tutorials/">All tutorials</Link>
      </p>
    </main>
  );
}
