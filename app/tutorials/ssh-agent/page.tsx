import type { Metadata } from "next";
import { MoreGuides } from "../MoreGuides";

export const metadata: Metadata = {
  title: "Use your SSH keys from the silo",
  description:
    "The SilentSilo SSH agent: ssh, Git and your editor sign in with keys kept in the silo, each use confirmed in the app. Setting it up on Windows and Linux.",
};

export default function SshAgent() {
  return (
    <main id="main" className="wrap prose">
      <h1>Use your SSH keys from the silo</h1>
      <p className="lead">
        SilentSilo can act as your SSH agent. ssh, Git and editors such as VS
        Code sign in with the SSH keys kept in the silo; the private key
        never leaves the app, and you confirm each use in its window.
      </p>

      <nav className="toc" aria-label="On this page">
        <p className="toc-head">On this page</p>
        <ol>
          <li>
            <a href="#turn-it-on">Turn it on</a>
          </li>
          <li>
            <a href="#choose-the-keys">Choose the keys</a>
          </li>
          <li>
            <a href="#point-ssh-at-it">Point ssh at it</a>
          </li>
          <li>
            <a href="#each-use">Each use</a>
          </li>
          <li>
            <a href="#what-it-refuses">What it refuses</a>
          </li>
        </ol>
      </nav>

      <h2 id="turn-it-on">Turn it on</h2>
      <p>
        In SilentSilo on Windows or Linux, open{" "}
        <strong>Settings &gt; SSH agent</strong> and tick{" "}
        <strong>Turn on the SSH agent</strong>. Nothing listens until you do.
      </p>
      <p>
        On Windows the agent uses the address Windows&apos; own ssh looks
        for. If Windows&apos; <strong>OpenSSH Authentication Agent</strong>{" "}
        service is running, it holds that address and the page says so. Stop
        it and set it to <strong>Disabled</strong> in Services, as an
        administrator, then turn the agent on again.
      </p>

      <h2 id="choose-the-keys">Choose the keys</h2>
      <p>
        Only keys you mark are offered, so a server does not see every key
        you own (and turn you away after a few).
      </p>
      <ol>
        <li>
          Open an SSH key entry under <strong>Passwords</strong>, or make one
          with <strong>Add entry</strong> and{" "}
          <strong>Generate an ed25519 key</strong>.
        </li>
        <li>
          Tick <strong>Use with the SSH agent</strong> and save.
        </li>
      </ol>
      <p>
        Ed25519, RSA and ECDSA keys work, in OpenSSH&apos;s format or as an
        RSA key in PEM. A key with a passphrase asks for it once when you
        tick the box, and is kept without it from then on: the silo protects
        it, and the version with the passphrase stays in the entry&apos;s
        history. A PEM or PKCS#8 key of another type converts with{" "}
        <code>ssh-keygen -p -f &lt;file&gt;</code>; a PuTTY{" "}
        <code>.ppk</code> file converts in PuTTYgen, with{" "}
        <strong>Conversions &gt; Export OpenSSH key</strong>.
      </p>

      <h2 id="point-ssh-at-it">Point ssh at it</h2>
      <p>
        <strong>On Windows</strong>, Windows&apos; ssh finds the agent by
        itself, and so do VS Code and anything that uses it. Git for Windows
        brings its own ssh; point it at Windows&apos; with:
      </p>
      <pre>
        <code>
          {"git config --global core.sshCommand C:/Windows/System32/OpenSSH/ssh.exe\n"}
        </code>
      </pre>
      <p>
        <strong>On Linux</strong>, set <code>SSH_AUTH_SOCK</code> in your
        shell&apos;s profile to the path the settings page shows, or point
        ssh alone at it in <code>~/.ssh/config</code>:
      </p>
      <pre>
        <code>
          {"export SSH_AUTH_SOCK=$XDG_RUNTIME_DIR/silentsilo/ssh-agent.sock\n"}
        </code>
      </pre>
      <pre>
        <code>
          {"Host *\n  IdentityAgent ${XDG_RUNTIME_DIR}/silentsilo/ssh-agent.sock\n"}
        </code>
      </pre>
      <p>
        <code>ssh-add -L</code> then lists the keys you marked, while the
        silo is open.
      </p>

      <h2 id="each-use">Each use</h2>
      <p>
        When a program asks to sign, SilentSilo comes to the front with{" "}
        <strong>Use an SSH key?</strong>: the key, what it is for (signing
        in, or a Git commit or tag), the server&apos;s host key when the
        program names it, and the program that asked. Press{" "}
        <strong>Sign</strong>, or <strong>Cancel</strong> if you did not
        just start something.
      </p>
      <ul>
        <li>
          <strong>Allow this key for this server until the silo locks</strong>{" "}
          stops it asking again for that server; for Git signatures the box
          covers them all. A lock forgets every such allowance. When the
          program does not name the server (OpenSSH before 8.9), every use
          is asked.
        </li>
        <li>
          A key whose entry has{" "}
          <strong>Ask for my security key or Windows Hello before showing
          this entry</strong> ticked asks for it at each use too.
        </li>
        <li>
          With the silo locked, a request brings up the unlock screen and
          waits a minute for you. The activity log records each signature,
          when the silo keeps one.
        </li>
      </ul>
      <p>
        For signed commits, tell Git to sign with SSH and with the key from
        the silo:
      </p>
      <pre>
        <code>
          {'git config --global gpg.format ssh\ngit config --global user.signingkey "key::ssh-ed25519 AAAA…"\ngit commit -S\n'}
        </code>
      </pre>

      <h2 id="what-it-refuses">What it refuses</h2>
      <ul>
        <li>
          <strong>Requests forwarded from a server.</strong> With agent
          forwarding, a server you signed in to could ask your agent to sign
          elsewhere as you. The agent refuses them.
        </li>
        <li>
          <strong>Adding or removing keys</strong> from outside: the keys are
          the ones in the silo, chosen there.
        </li>
        <li>
          <strong>Other people on the same computer.</strong> The address is
          open to your user account only.
        </li>
      </ul>
      <p>
        Any program running as you can ask, as with any SSH agent. The
        dialog is where you see it: a request you did not start is the one
        to cancel.
      </p>
      <MoreGuides />
    </main>
  );
}
