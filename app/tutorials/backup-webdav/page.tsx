import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Back up over WebDAV",
  description:
    "For Nextcloud, ownCloud, Synology, Box and Fastmail: finding the right address, creating an app password instead of using your account password, and what the app does with folders.",
};

export default function BackupWebDav() {
  return (
    <main className="wrap prose">
      <h1>Back up over WebDAV</h1>
      <p className="lead">
        If you already run a Nextcloud, own a Synology, or pay for something
        that speaks WebDAV, this turns it into a backup target without buying
        anything. The two things that go wrong are the address and the
        password, so both get their own section.
      </p>

      <h2>Finding the address</h2>
      <p>
        The app wants the WebDAV address of a folder, not the address of the
        web interface you log in to. They look nothing alike, and pasting the
        second is the most common failure.
      </p>
      <table>
        <thead>
          <tr>
            <th>Server</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nextcloud and ownCloud</td>
            <td>
              <code>
                https://cloud.example.com/remote.php/dav/files/USERNAME/silentsilo
              </code>
            </td>
          </tr>
          <tr>
            <td>Synology</td>
            <td>
              <code>https://nas.example.com:5006/silentsilo</code>, once the
              WebDAV Server package is installed and HTTPS is enabled
            </td>
          </tr>
          <tr>
            <td>Fastmail</td>
            <td>
              <code>https://myfiles.fastmail.com/silentsilo</code>
            </td>
          </tr>
          <tr>
            <td>Box</td>
            <td>
              <code>https://dav.box.com/dav/silentsilo</code>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        In Nextcloud the exact string is printed for you: open{" "}
        <strong>Files</strong>, look at the bottom of the left sidebar, and
        the WebDAV address is shown there. Copy it and add the folder name you
        want the silo to use on the end.
      </p>
      <p>
        Use <code>https://</code>. Over plain <code>http://</code> your
        WebDAV password travels readable, and the app tells you so. The files
        themselves stay encrypted either way, but the password is what lets
        someone delete them.
      </p>

      <h2>Create an app password, not your account password</h2>
      <p>
        Give the app a credential you can revoke on its own, so pulling it
        does not mean changing the password you sign in with everywhere.
      </p>
      <ol>
        <li>
          <strong>Nextcloud and ownCloud:</strong> your avatar →{" "}
          <strong>Settings</strong> → <strong>Security</strong> →{" "}
          <strong>Devices &amp; sessions</strong>. Type a name, press{" "}
          <strong>Create new app password</strong>, and copy it. It is shown
          once. If you use two-factor authentication this is not optional:
          your ordinary password will not work over WebDAV at all.
        </li>
        <li>
          <strong>Synology:</strong> create a dedicated user in{" "}
          <strong>Control Panel</strong> → <strong>User &amp; Group</strong>{" "}
          with permission on the shared folder you are backing up to, and
          nothing else.
        </li>
        <li>
          <strong>Fastmail:</strong>{" "}
          <strong>Settings</strong> → <strong>Privacy &amp; Security</strong>{" "}
          → <strong>Integrations</strong> → <strong>App passwords</strong>,
          scoped to file access.
        </li>
      </ol>

      <h2>Setting it up in the app</h2>
      <ol>
        <li>
          Unlock the silo and open <strong>Backup</strong>, or{" "}
          <strong>Copies</strong> if this is a second place.
        </li>
        <li>
          Choose <strong>WebDAV</strong>.
        </li>
        <li>
          Fill in <strong>Address</strong>, <strong>Username</strong> and{" "}
          <strong>Password</strong>. The username is the account name on the
          server, which is not always your email address.
        </li>
        <li>
          Press <strong>Test connection</strong>. The app writes a small
          object and reads it back, so a pass means the credential can really
          write rather than just log in.
        </li>
        <li>Save. The first pass runs in the background.</li>
      </ol>
      <p>
        You do not need to create the folder tree yourself. Unlike a bucket,
        where a key with slashes in it is just a key, WebDAV needs each
        collection to exist before anything can be written into it, so the app
        creates the parents itself on every write.
      </p>

      <h2>When it does not work</h2>
      <p>
        A 401 means the password: if the account has two-factor
        authentication, you need an app password rather than the one you
        type at the login page. A 404 means the address is the web interface
        rather than the WebDAV path. A 507 means the server is out of space.
        If uploads start and then stall, check whether your server puts a
        size limit on a single request, since large silos move large objects.
      </p>

      <h2>What this is good for, and what it is not</h2>
      <p>
        A Nextcloud you run is a genuinely separate copy: a different machine,
        different credentials, often a different building. That is worth
        having.
      </p>
      <p>
        It is not protection against ransomware on its own, because the
        password sits on the machine that would be attacked. For that you want
        storage that refuses deletion, which is a{" "}
        <Link href="/tutorials/copies-nothing-can-erase/">
          separate guide
        </Link>
        , or a copy that is simply offline. Marking the target as an archive
        stops the app ever sending a delete, which is a promise the app keeps
        rather than one the server enforces.
      </p>

      <h2>Prove it works</h2>
      <p>
        Open <strong>Health</strong> and run the restore test: it rebuilds
        the silo from the server using only your recovery code and opens one
        real file. Do it now rather than on the day your laptop dies.
      </p>
    </main>
  );
}
