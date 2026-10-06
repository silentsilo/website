import type { Metadata } from "next";
import Link from "next/link";
import { MoreGuides } from "../MoreGuides";

export const metadata: Metadata = {
  title: "Unlock without a security key",
  description:
    "Open a silo with Windows Hello, a phone over the QR code, or an Android phone's fingerprint, and what to keep so a lost device does not lock you out.",
};

export default function UnlockWithoutAKey() {
  return (
    <main id="main" className="wrap prose">
      <h1>Unlock without a security key</h1>
      <p className="lead">
        A security key is the way in that works everywhere, but it is not the
        only one. Windows Hello, a phone and an Android fingerprint each open
        a silo on their own. What they share is that each is tied to one
        device, which is why the recovery code matters more without a key.
      </p>

      <nav className="toc" aria-label="On this page">
        <p className="toc-head">On this page</p>
        <ol>
          <li>
            <a href="#windows-hello">Windows Hello</a>
          </li>
          <li>
            <a href="#a-phone-on-windows">A phone, on Windows</a>
          </li>
          <li>
            <a href="#android">Android</a>
          </li>
          <li>
            <a href="#linux">Linux</a>
          </li>
          <li>
            <a href="#what-to-keep">What to keep</a>
          </li>
        </ol>
      </nav>

      <h2 id="windows-hello">Windows Hello</h2>
      <p>
        The PIN, fingerprint or face you already use to sign in to Windows.
        It needs Windows 11 with the February 2026 update (build 26200.7840
        or later) and a TPM; on Windows 10, an older Windows 11 or a
        computer without a TPM, Hello cannot derive the silo&apos;s key.
      </p>
      <ol>
        <li>
          When you set up a new silo, choose{" "}
          <strong>Use Windows Hello</strong> under{" "}
          <strong>Set up unlocking</strong>.
        </li>
        <li>
          For a silo you already have, open it, then{" "}
          <strong>Settings &gt; Unlocking</strong> and{" "}
          <strong>Add Windows Hello</strong>.
        </li>
      </ol>
      <p>
        If the button is missing, Hello is not set up on this computer: add a
        PIN or a fingerprint in Windows&apos; sign-in settings and it
        appears. Hello is sealed to this computer, so it opens the silo here
        and nowhere else. An organisation&apos;s key cannot be Hello, for the
        same reason.
      </p>

      <h2 id="a-phone-on-windows">A phone, on Windows</h2>
      <p>
        When Windows shows its prompt for a security key, it may also offer
        a phone through a QR code. Scan it with the phone and confirm there;
        the phone then acts as the key, over Bluetooth, each time you unlock.
        Recent Android phones work. A phone whose passkey provider cannot
        produce what the silo needs is refused at that step, with a message
        saying so. That passkey syncs with the account behind it, so it is
        not pinned to one device the way a hardware key is.
      </p>

      <h2 id="android">Android</h2>
      <p>
        On the phone itself, the fingerprint opens the silo. The phone joins
        a silo that already exists with its recovery code (or a security key
        over NFC), then makes a key of its own that the fingerprint unlocks.
        The <Link href="/tutorials/phone/">phone guide</Link> goes through
        it.
      </p>

      <h2 id="linux">Linux</h2>
      <p>
        Linux has no built-in equivalent the app can use, so on Linux a silo
        opens with a security key; the recovery code gets you in to enrol
        one. Any FIDO2 key with the <code>hmac-secret</code> extension
        works, and a key with a PIN asks for it in the app.
      </p>

      <h2 id="what-to-keep">What to keep</h2>
      <ul>
        <li>
          <strong>The recovery code, on paper.</strong> Without a key that
          travels, it is the way back in when the one device you unlock with
          is lost, wiped or replaced. Make it under{" "}
          <strong>Settings &gt; Recovery code</strong> and keep it where you
          keep your passport.
        </li>
        <li>
          <strong>A way in on each device you use.</strong> Hello on each
          computer and the fingerprint on the phone are separate keys, each
          added on its own device. Any one of them opens the silo.
        </li>
        <li>
          <strong>A security key, if you can.</strong> One key opens the silo
          on every computer, Linux included, and on the phone over NFC. Two,
          kept apart, cover losing one.
        </li>
      </ul>
      <p>
        There is no password to fall back on, deliberately: the{" "}
        <Link href="/security/">security page</Link> explains why.
      </p>
      <MoreGuides />
    </main>
  );
}
