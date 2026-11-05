import type { Metadata } from "next";
import Link from "next/link";
import { MoreGuides } from "../MoreGuides";

export const metadata: Metadata = {
  title: "Unlock without a security key",
  description:
    "Open a silo with Windows Hello, Touch ID on a Mac, a phone over the QR code, or the phone app's fingerprint or Face ID, and what to keep so a lost device does not lock you out.",
};

export default function UnlockWithoutAKey() {
  return (
    <main id="main" className="wrap prose">
      <h1>Unlock without a security key</h1>
      <p className="lead">
        A security key is the way in that works everywhere, but you do not
        need one. Windows Hello, Touch ID on a Mac, your phone on Windows 11
        and the fingerprint or Face ID in the phone app each open a silo on
        their own. Without a
        key that travels, the recovery code matters more: it is the way back
        when the device you unlock with is lost.
      </p>

      <nav className="toc" aria-label="On this page">
        <p className="toc-head">On this page</p>
        <ol>
          <li>
            <a href="#windows-hello">Windows Hello</a>
          </li>
          <li>
            <a href="#touch-id">Touch ID on a Mac</a>
          </li>
          <li>
            <a href="#a-phone-on-windows">A phone, on Windows</a>
          </li>
          <li>
            <a href="#android">Android and iPhone</a>
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

      <h2 id="touch-id">Touch ID on a Mac</h2>
      <p>
        The fingerprint you already use on the Mac. The silo&apos;s key is
        made in the Mac&apos;s Secure Enclave, and Touch ID releases it.
      </p>
      <ol>
        <li>
          When you set up a new silo, choose{" "}
          <strong>Use Touch ID</strong> under{" "}
          <strong>Set up unlocking</strong>.
        </li>
        <li>
          For a silo you already have, open it, then{" "}
          <strong>Settings &gt; Unlocking</strong> and{" "}
          <strong>Add Touch ID</strong>.
        </li>
      </ol>
      <p>
        If the button is missing, Touch ID is not set up on this Mac: add a
        fingerprint under <strong>Touch ID &amp; Password</strong> in System
        Settings and it appears. Touch ID is sealed to this Mac, so it opens
        the silo here and nowhere else. Adding or removing a fingerprint on
        the Mac makes that key stop working, so keep another way in.
      </p>

      <h2 id="a-phone-on-windows">A phone, on Windows</h2>
      <p>
        On Windows 11 (version 22H2 or later) your phone can be the key. It
        works with an iPhone on iOS 18 or later and with an Android phone
        that keeps passkeys in Google Password Manager. Both need Bluetooth
        on and a connection: Bluetooth checks that the phone is nearby, and
        the exchange goes over the internet.
      </p>
      <ol>
        <li>
          When you set up a new silo, choose <strong>Use your phone</strong>{" "}
          under <strong>Set up unlocking</strong>. For a silo you already
          have, open it, then <strong>Settings &gt; Unlocking &gt; Add a
          phone</strong>. The app checks this computer&apos;s Bluetooth
          first and says if it is off or missing.
        </li>
        <li>
          Choose <strong>Show the QR code</strong>, scan the code Windows
          shows with the phone&apos;s camera and confirm on the phone.
        </li>
        <li>
          To unlock later, choose the phone in the Windows prompt (or scan
          the code again) and confirm on it.
        </li>
      </ol>
      <p>
        A phone whose passkey app cannot produce what the silo needs is
        refused at that step, with a message saying so. That passkey syncs
        with the account behind it, so it is not pinned to one device the
        way a hardware key is. It opens the silo on Windows 11 only: on a
        Mac, on Linux and in the SilentSilo phone app, use another way in.
        Windows 10 cannot use a phone for this.
      </p>

      <h2 id="android">Android and iPhone</h2>
      <p>
        On the phone itself, the fingerprint opens the silo, or Face ID on
        the iPhone. The phone joins a silo that already exists with its
        recovery code (or a security key over NFC), then makes a key of its
        own in its secure hardware, released by the fingerprint or face.
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
          <strong>A way in on each device you use.</strong> Hello or Touch
          ID on each computer, your phone on Windows 11 and the fingerprint
          in the phone app are separate keys, each added on its own. Any one
          of them opens the silo.
        </li>
        <li>
          <strong>A security key, if you can.</strong> One key opens the silo
          on every computer, Linux included, and on the phone over NFC or
          USB. Two,
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
