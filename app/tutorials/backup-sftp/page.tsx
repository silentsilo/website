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
        Any machine you can reach over SSH becomes a backup target: a VPS, a
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
          Create the folder the silo will use, for instance{" "}
          <code>backups/silentsilo</code>. The path in the app is relative to
          wherever that user lands when it logs in.
        </li>
        <li>
          Prefer a key over a password. On a general-purpose server, consider
          restricting the account to SFTP only with{" "}
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

      <h2>Setting it up in the app</h2>
      <ol>
        <li>
          Unlock the silo, open <strong>Backup</strong> or{" "}
          <strong>Copies</strong>, and choose <strong>SFTP</strong>.
        </li>
        <li>
          Fill in <strong>Server</strong> and <strong>Port</strong>. The port
          is 22 unless you moved it.
        </li>
        <li>
          Fill in <strong>Username</strong>, then choose under{" "}
          <strong>Sign in with</strong> whether to use a password or a private
          key. A key can carry a passphrase, and there is a field for it.
        </li>
        <li>
          Fill in <strong>Folder on the server</strong>.
        </li>
        <li>
          The app fetches the server&apos;s fingerprint and shows it to you.
          Read the next section before accepting it.
        </li>
        <li>
          Press <strong>Test connection</strong>, then save.
        </li>
      </ol>

      <h2>The fingerprint, and why it is a step</h2>
      <p>
        An SSH client that accepts whatever key a server presents has not
        authenticated the server at all. Anyone able to answer on that address
        can accept your login and read the traffic. In a product that sells
        confidentiality, that is worse than having no SFTP support, so the app
        pins the fingerprint in the silo&apos;s settings and refuses to
        connect if it ever changes.
      </p>
      <p>
        That refusal is only worth something if the value you accepted was the
        right one, which is why it is shown as a step of its own rather than a
        checkbox. Confirm it against the server, out of band:
      </p>
      <ul>
        <li>
          On a machine you control, run{" "}
          <code>ssh-keyscan -t ed25519 your.server | ssh-keygen -lf -</code>{" "}
          while sitting at it, or read it from the provider&apos;s control
          panel.
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
        sshd turns connections away at random once more than ten handshakes
        are in flight, which on a shared host happens for reasons that have
        nothing to do with your account, and looks exactly like the server
        being down. The app retries over about a second for that reason.
      </p>
      <p>
        Permission denied with a key means the key is not in{" "}
        <code>authorized_keys</code> for that user, or the file&apos;s
        permissions are too loose for sshd to accept it. A path error usually
        means the folder is absolute when the account is chrooted, or the
        other way round.
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
        on the far end. Marking the target as an archive stops the app ever
        issuing a delete, which is a promise the app keeps rather than one the
        server enforces. For a copy that refuses deletion at its own level,
        see{" "}
        <Link href="/tutorials/copies-nothing-can-erase/">
          a copy nothing can erase
        </Link>
        . Some SFTP hosts offer immutable snapshots, which is the same idea
        one layer down.
      </p>

      <h2>Prove it works</h2>
      <p>
        Open <strong>Health</strong> and run the restore test. It rebuilds
        the silo from the server in a temporary directory, using only your
        recovery code, and opens one real file, which exercises the whole
        chain rather than just the connection.
      </p>
    </main>
  );
}
