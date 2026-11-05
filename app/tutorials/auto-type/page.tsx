import type { Metadata } from "next";
import Link from "next/link";
import { MoreGuides } from "../MoreGuides";
import { ThemedImg } from "../../ThemedImg";

export const metadata: Metadata = {
  title: "Type logins into any program",
  description:
    "Auto-type: press a shortcut in a program outside the browser, choose the login, confirm with your key, and SilentSilo types the username and password. Windows and macOS.",
};

export default function AutoType() {
  return (
    <main id="main" className="wrap prose">
      <h1>Type logins into any program</h1>
      <p className="lead">
        The browser extension fills web pages. Auto-type is for everything
        else: a desktop app, a remote desktop window, a terminal, a game
        launcher. You press a shortcut in that window, pick the login, and
        SilentSilo types it there for you.
      </p>

      <nav className="toc" aria-label="On this page">
        <p className="toc-head">On this page</p>
        <ol>
          <li>
            <a href="#turn-it-on">Turn it on</a>
          </li>
          <li>
            <a href="#type-a-login">Type a login</a>
          </li>
          <li>
            <a href="#on-a-mac">On a Mac</a>
          </li>
          <li>
            <a href="#when-nothing-is-typed">When nothing is typed</a>
          </li>
        </ol>
      </nav>

      <h2 id="turn-it-on">Turn it on</h2>
      <p>
        Auto-type is off until you turn it on. In SilentSilo, open{" "}
        <strong>Settings &gt; General</strong> and, under{" "}
        <strong>Auto-type</strong>, tick{" "}
        <strong>Type logins with Ctrl+Alt+A</strong> (on a Mac,{" "}
        <strong>⌃⌥A</strong>, Control-Option-A).
      </p>
      <p>
        <strong>Press Enter after the password</strong> sends the form, as
        most sign-in windows expect. Leave it off if you would rather press
        Enter yourself.
      </p>
      <p>Windows and macOS have it. Linux does not yet.</p>
      <figure className="tut-shot">
        <ThemedImg
          base="/shots/tut-autotype-setting"
          alt="Settings, General: the Auto-type setting turned on"
          width={1200}
          height={800}
          sizes="(max-width: 52rem) 100vw, 47rem"
        />
      </figure>

      <h2 id="type-a-login">Type a login</h2>
      <ol>
        <li>Click into the username field of the program you sign in to.</li>
        <li>
          Press <strong>Ctrl+Alt+A</strong>. The silo has to be unlocked.
        </li>
        <li>
          SilentSilo shows <strong>Type a login</strong>, naming the window
          and the program. Logins that match the window come first under{" "}
          <strong>Matches this window</strong>; search for any other.
        </li>
        <li>
          Choose the login and click <strong>Type</strong>, then confirm with
          one of the silo&apos;s keys.
        </li>
        <li>
          SilentSilo puts the window back in front and types the username, a
          Tab and the password.
        </li>
      </ol>
      <figure className="tut-shot">
        <ThemedImg
          base="/shots/tut-autotype-dialog"
          alt="The Type a login window, with the logins that match the window first"
          width={1200}
          height={800}
          sizes="(max-width: 52rem) 100vw, 47rem"
        />
      </figure>
      <p>
        If you did not just press the shortcut yourself, choose{" "}
        <strong>Cancel</strong>: something else asked.
      </p>

      <h2 id="on-a-mac">On a Mac</h2>
      <p>
        macOS lets a program type into other windows only with your
        permission. The first time, allow SilentSilo under{" "}
        <strong>System Settings &gt; Privacy &amp; Security &gt;
        Accessibility</strong>; the setting in SilentSilo has a button that
        opens that page.
      </p>
      <p>
        While another program has secure keyboard entry on (Terminal has it
        under <strong>Terminal &gt; Secure Keyboard Entry</strong>), macOS
        lets nothing else type. Turn it off there first.
      </p>

      <h2 id="when-nothing-is-typed">When nothing is typed</h2>
      <ul>
        <li>
          <strong>The window runs as administrator</strong>: Windows does not
          let a normal program type into it. Copy the password from the app
          instead.
        </li>
        <li>
          <strong>Another program already uses Ctrl+Alt+A</strong>: the
          setting says so. Change the shortcut in that program, then turn
          auto-type off and on.
        </li>
        <li>
          <strong>The window was not in front</strong> when typing started,
          or you switched away: typing stops rather than going somewhere
          else. Press the shortcut again.
        </li>
        <li>
          <strong>A key was still held down</strong>: release every key and
          try again.
        </li>
      </ul>
      <p>
        For web pages, the{" "}
        <Link href="/tutorials/browser-extension/">browser extension</Link>{" "}
        is the better fit: it checks the site before it fills anything.
      </p>
      <MoreGuides />
    </main>
  );
}
