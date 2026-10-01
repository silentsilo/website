import type { Metadata } from "next";
import Link from "next/link";
import { MoreGuides } from "../MoreGuides";

export const metadata: Metadata = {
  title: "Fill logins in your browser",
  description:
    "The SilentSilo extension for Chrome, Edge, Brave and Firefox: turning it on, filling a login, why every fill is confirmed in the app, and what it refuses.",
};

export default function BrowserExtension() {
  return (
    <main id="main" className="wrap prose">
      <h1>Fill logins in your browser</h1>
      <p className="lead">
        The extension asks the SilentSilo app on the same computer for the
        logins of the site you are on, and fills one after you confirm it in
        the app. It holds no passwords itself and sends nothing anywhere
        else.
      </p>

      <nav className="toc" aria-label="On this page">
        <p className="toc-head">On this page</p>
        <ol>
          <li>
            <a href="#turn-it-on">Turn it on</a>
          </li>
          <li>
            <a href="#fill-a-login">Fill a login</a>
          </li>
          <li>
            <a href="#what-it-refuses">What it refuses</a>
          </li>
          <li>
            <a href="#when-it-says-not-reachable">When it says not reachable</a>
          </li>
        </ol>
      </nav>

      <h2 id="turn-it-on">Turn it on</h2>
      <ol>
        <li>
          In SilentSilo on Windows, open{" "}
          <strong>Settings &gt; Browser extension</strong> and tick{" "}
          <strong>Allow the SilentSilo browser extension</strong>. It is off
          until you do.
        </li>
        <li>
          Install it from the same page: <strong>Get it for Chrome</strong>,
          Edge, Brave or Firefox.
        </li>
        <li>
          The silo needs a security key or Windows Hello under{" "}
          <strong>Unlocking</strong>: every fill is confirmed with one, so a
          silo with neither cannot fill anything.
        </li>
      </ol>

      <h2 id="fill-a-login">Fill a login</h2>
      <ol>
        <li>
          With the silo unlocked, open the site&apos;s login page and click
          the SilentSilo button in the browser. It lists{" "}
          <strong>Logins for</strong> that site.
        </li>
        <li>
          Click one. SilentSilo comes to the front with{" "}
          <strong>Fill a login in your browser?</strong>, naming the site and
          the login. Press <strong>Fill</strong>, then touch your key or use
          Windows Hello.
        </li>
        <li>
          The username and password go into the page, and the browser comes
          back to the front. Nothing is kept by the extension.
        </li>
      </ol>
      <p>
        If you did not just click the extension, choose{" "}
        <strong>Cancel</strong>: a request you did not make is the one thing
        the dialog is there to catch. Under{" "}
        <strong>Settings &gt; Browser extension</strong> the app lists what
        it filled since it started, while the silo is open.
      </p>

      <h2 id="what-it-refuses">What it refuses</h2>
      <ul>
        <li>
          <strong>A form that sends elsewhere.</strong> A password is filled
          only into a form that sends it to the same site. A login form
          planted on a page to send what you type to another address gets
          nothing, and the popup names where it would have gone.
        </li>
        <li>
          <strong>Hidden fields</strong>, and fields with something laid over
          them, which is how a page catches a filler that does not look.
        </li>
        <li>
          <strong>Pages that are not https</strong>, apart from pages on this
          computer.
        </li>
        <li>
          <strong>A login saved for another site</strong> is shown with a
          warning. When nothing is saved for a site, the popup says so before
          it offers a search: a lookalike address is the usual reason.
        </li>
      </ul>

      <h2 id="when-it-says-not-reachable">When it says not reachable</h2>
      <p>
        <strong>SilentSilo is not reachable</strong> means the app is not
        running, or <strong>Allow the SilentSilo browser extension</strong>{" "}
        is off. Start it or tick it: the popup notices within a few seconds
        and shows the logins. <strong>Your silo is locked</strong> works the
        same way after you unlock it.{" "}
        <strong>SilentSilo is not installed</strong> means the browser cannot
        find the app at all; install it, or run its installer again.
      </p>
      <p>
        The extension is for SilentSilo on Windows. On Android, the app fills
        logins itself through Android autofill: see the{" "}
        <Link href="/tutorials/phone/">phone guide</Link>.
      </p>
      <MoreGuides />
    </main>
  );
}
