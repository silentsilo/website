import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Back up over SFTP",
  description:
    "For a VPS, a NAS with SSH, rsync.net or a Hetzner Storage Box: keys instead of passwords, the server fingerprint the app asks you to confirm, and why that confirmation matters.",
};

export default function BackupSftp() {
  return (
    <main className="wrap prose">
      <h1>Back up over SFTP</h1>
      <p className="lead">
        Any machine you can reach over SSH becomes a backup place: a VPS, a
        NAS at home, rsync.net, a Hetzner Storage Box. The protocol part is
        easy. The part this page spends its time on is the server fingerprint,
        because that is the step people click past.
      </p>

      <h2>Prepare the server</h2>
      <ol>
        <li>
          Make a user for this, or use one you already have. It needs to be
          able to write into one directory and nothing more interesting than
          that.
        </li>
        <li>
          Decide on the folder the silo will use, for instance{" "}
          <code>backups/silentsilo</code>. The app creates it if it is not
          there. The path is relative to wherever that user lands when it
          logs in, or absolute if it starts with a slash. Give each silo its
          own folder: the app refuses one that already holds a different
          silo.
        </li>
        <li>
          Prefer a key over a password; the next section says how to make
          one. If you run the server yourself and it does other things too,
          consider restricting this account to file transfer only, with{" "}
          <code>ForceCommand internal-sftp</code> in{" "}
          <code>sshd_config</code>, so a leaked credential cannot become a
          shell.
        </li>
      </ol>
      <p>
        Managed services skip most of this. rsync.net and Hetzner Storage Box
        give you an account that already does nothing but store files, which
        is exactly what is wanted here.
      </p>

      <h2>Making a key</h2>
      <p>
        A key is two files: a private one that stays with you, and a public
        one you give the server. On Windows, macOS or Linux, open a terminal
        and run:
      </p>
      <pre>
        <code>ssh-keygen -t ed25519 -f silentsilo-backup</code>
      </pre>
      <p>
        It asks for a passphrase, which you may leave empty or not, and
        writes two files: <code>silentsilo-backup</code>, the private key,
        and <code>silentsilo-backup.pub</code>, the public one. The public
        one goes on the server, as a line in that user&apos;s{" "}
        <code>~/.ssh/authorized_keys</code> file; rsync.net and Hetzner have
        a page or a command for this in their documentation. The private one
        is what you paste into the app, whole, starting with{" "}
        <code>-----BEGIN OPENSSH PRIVATE KEY-----</code>.
      </p>
      <p>
        The app takes keys in the OpenSSH format above, in the older formats
        that start with <code>-----BEGIN RSA PRIVATE KEY-----</code> or{" "}
        <code>-----BEGIN PRIVATE KEY-----</code>, and as a PuTTY{" "}
        <code>.ppk</code> file. Whichever you have, open the file in a text
        editor and paste all of it, first line to last. Paste the private
        key, not the <code>.pub</code> one: the public key opens nothing.
      </p>

      <h2>Setting it up in the app</h2>
      <ol>
        <li>
          Unlock the silo, open <strong>Settings &gt; Backup</strong> (or{" "}
          <strong>Settings &gt; Copies</strong> and{" "}
          <strong>Add another place</strong>), and choose{" "}
          <strong>SFTP</strong>.
        </li>
        <li>
          Fill in <strong>Server</strong> and <strong>Port</strong>. The port
          is 22 unless you moved it.
        </li>
        <li>
          Press <strong>Check the server&apos;s identity</strong>. The app
          asks the server for its key and shows you its fingerprint, a line
          starting with <code>SHA256:</code>. Nothing else is sent at this
          point, no username and no password. Read the next section before
          pressing <strong>This is my server</strong>. The app will not save
          the connection until you have.
        </li>
        <li>
          Fill in <strong>Username</strong>, then choose under{" "}
          <strong>Sign in with</strong> between <strong>Password</strong> and{" "}
          <strong>Private key</strong>. With a key, paste the key itself into
          the <strong>Private key</strong> box, not a path to it, and put its
          passphrase in <strong>Key passphrase</strong> if it has one.
        </li>
        <li>
          Fill in <strong>Folder on the server</strong>.
        </li>
        <li>
          Press <strong>Test connection</strong>. The app writes a small
          file, reads it back and deletes it. Then press{" "}
          <strong>Save &amp; connect</strong>, or{" "}
          <strong>Add this place</strong> for a second copy.
        </li>
      </ol>

      <h2>The fingerprint, and why it is a step</h2>
      <p>
        An SSH client that accepts whatever key a server presents has not
        checked who the server is at all. Anyone able to answer on that
        address can accept your login and read the traffic. In a product
        built on confidentiality, that is worse than having no SFTP support,
        so the app remembers the fingerprint you accepted in the silo&apos;s
        settings and refuses to connect if it ever changes.
      </p>
      <p>
        That refusal is only worth something if the value you accepted was the
        right one, which is why it is shown as a step of its own rather than a
        checkbox. Confirm it against the server, some other way than through
        the connection itself:
      </p>
      <ul>
        <li>
          On the server, run{" "}
          <code>ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub</code>. It
          prints the same <code>SHA256:</code> line. If the line the app
          shows does not match, try the other key files in{" "}
          <code>/etc/ssh/</code>: a server without an ed25519 key offers a
          different one.
        </li>
        <li>
          From another machine you trust, run{" "}
          <code>ssh-keyscan your.server | ssh-keygen -lf -</code> and look
          for the matching line.
        </li>
        <li>
          rsync.net and Hetzner publish their host keys on their websites.
          Compare against those.
        </li>
        <li>
          If you have connected to this server from a terminal before, it is
          in your <code>known_hosts</code>.
        </li>
      </ul>
      <p>
        Once accepted, the app stops asking. Editing the folder or the
        username leaves it alone; changing the server or the port clears it,
        because that is a different machine and the old answer says nothing
        about it. If a saved fingerprint stops matching, the app tells you
        rather than connecting. Treat that as real until you know why: a
        rebuilt server is the innocent explanation, and it is not the only one.
      </p>

      <h2>When it does not work</h2>
      <p>
        A refused connection right after several others usually is not you.
        Some servers turn away a few connections at random when they are
        busy, which on a shared host happens for reasons that have nothing to
        do with your account, and looks exactly like the server being down.
        The app tries again for about a second before giving up.
      </p>
      <p>
        Permission denied with a key means the public half is not in{" "}
        <code>authorized_keys</code> for that user, or the file&apos;s
        permissions on the server are too loose for it to be accepted. A path
        error usually means the folder is absolute when the account is
        confined to its home directory, or the other way round.
      </p>

      <h2>What this gets you</h2>
      <p>
        A copy on a machine you control, in a different place, reached with a
        credential separate from everything else. That is a real second copy
        and covers most of what actually goes wrong.
      </p>
      <p>
        It does not, by itself, survive ransomware: the key sits on the
        machine being attacked, and an attacker who has it can delete what is
        on the far end. Ticking <strong>Never delete anything here</strong>{" "}
        when you add a second place stops the app ever issuing a delete,
        which is a promise the app keeps rather than one the server enforces.
        For a copy that refuses deletion at its own level, see{" "}
        <Link href="/tutorials/copies-nothing-can-erase/">
          a copy nothing can erase
        </Link>
        . Some SFTP hosts offer snapshots that cannot be changed, which is the
        same idea one layer down.
      </p>

      <h2>Prove it works</h2>
      <p>
        Open <strong>Settings &gt; Verification</strong>, go to{" "}
        <strong>Test a recovery</strong>, type your recovery code and press{" "}
        <strong>Try a recovery now</strong>. It rebuilds the silo from the
        server in a temporary directory, using only that code, and opens one
        real file, which exercises the whole chain rather than just the
        connection.
      </p>
    </main>
  );
}
