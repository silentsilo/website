import type { Metadata } from "next";
import Link from "next/link";
import { MoreGuides } from "../MoreGuides";
import { ThemedImg } from "../../ThemedImg";
import { DevicesDiagram, KeysDiagram } from "./Diagrams";

export const metadata: Metadata = {
  title: "One silo on several devices",
  description:
    "Use the same silo on a laptop, a desktop and a phone: how they stay in step through your backup storage, adding a device, what happens to a change made in two places, and retiring a device.",
};

export default function SeveralDevices() {
  return (
    <main id="main" className="wrap prose">
      <h1>One silo on several devices</h1>
      <p className="lead">
        The same silo can be open on your laptop, your desktop and your phone.
        They stay in step through the backup storage you already use, so there
        is nothing extra to set up and no account of ours.
      </p>

      <nav className="toc" aria-label="On this page">
        <p className="toc-head">On this page</p>
        <ol>
          <li>
            <a href="#how-it-works">How it works</a>
          </li>
          <li>
            <a href="#add-a-computer">Add a computer</a>
          </li>
          <li>
            <a href="#add-a-phone">Add a phone</a>
          </li>
          <li>
            <a href="#what-syncs-and-when">What syncs and when</a>
          </li>
          <li>
            <a href="#changed-in-two-places">Changed in two places</a>
          </li>
          <li>
            <a href="#keys-on-each-device">Keys on each device</a>
          </li>
          <li>
            <a href="#retire-a-device">Retire a device</a>
          </li>
        </ol>
      </nav>

      <h2 id="how-it-works">How it works</h2>
      <DevicesDiagram />
      <p>
        The silo needs backup storage before a second device can join: that
        is where the devices meet. If you skipped it when you made the silo,
        add it under <strong>Settings &gt; Backup</strong> on the computer
        that has the silo, and let it finish the first upload.
      </p>
      <p>
        Do not share the silo&apos;s own folder through OneDrive, Dropbox or
        Google Drive. Those apps cannot merge changes made on two computers,
        and SilentSilo warns when you pick such a folder for a silo. Make the
        account the backup storage instead.
      </p>

      <h2 id="add-a-computer">Add a computer</h2>
      <ol>
        <li>
          Install SilentSilo on the new computer and choose{" "}
          <strong>Set up from backup storage</strong>.
        </li>
        <li>
          Pick the same kind of storage and enter the same details, or sign
          in to the same OneDrive, Dropbox or Google Drive account. Click{" "}
          <strong>See what is there</strong>: it shows the silo and the keys
          that can open it.
        </li>
        <li>
          Give it a name and a folder on this computer, then click{" "}
          <strong>Set up on this computer</strong> and confirm with a key
          that opens the silo: touch a security key, or on Windows 11 choose
          your phone and scan the QR code Windows shows. Without either,
          choose <strong>No key left? Use your recovery code instead</strong>.
        </li>
        <li>
          The silo is built here from the encrypted copy. Add this
          computer&apos;s Windows Hello or Touch ID under{" "}
          <strong>Settings &gt; Unlocking</strong> so you do not need the key
          or the phone every day.
        </li>
      </ol>
      <figure className="tut-shot">
        <ThemedImg
          base="/shots/tut-join"
          alt="Set up from backup storage, with the kinds of storage to choose from"
          width={1200}
          height={800}
          sizes="(max-width: 52rem) 100vw, 47rem"
        />
      </figure>

      <h2 id="add-a-phone">Add a phone</h2>
      <p>
        The SilentSilo app for Android and iPhone joins the same way: choose{" "}
        <strong>Set up from backup storage</strong>, point it at the same
        storage, then use the recovery code or a security key (over NFC, or
        USB on Android). After
        that the phone makes a key of its own that its fingerprint or Face ID
        opens. The <Link href="/tutorials/phone/">phone guide</Link> goes
        through it, along with backing up the phone&apos;s photos into the
        silo.
      </p>

      <h2 id="what-syncs-and-when">What syncs and when</h2>
      <ul>
        <li>
          <strong>Everything in the silo</strong>: files and folders,
          passwords, the trash, and the device names under{" "}
          <strong>Settings &gt; Devices</strong>.
        </li>
        <li>
          <strong>Your changes leave within seconds</strong> while the silo is
          unlocked. An open silo looks for changes from the other devices
          every two minutes; <strong>Settings &gt; Backup &gt; Sync now</strong>{" "}
          looks at once.
        </li>
        <li>
          <strong>A locked silo does not sync.</strong> What the other devices
          changed arrives the next time you unlock it.
        </li>
        <li>
          <strong>Offline is fine.</strong> Keep working; the bar at the
          bottom counts the changes waiting, and they go out when the
          connection is back.
        </li>
        <li>
          <strong>Files download when you open them.</strong> A computer
          keeps the whole file list but fetches a file the first time you
          open it there. Tick{" "}
          <strong>Keep a full copy on this computer</strong> under{" "}
          <strong>Settings &gt; Backup</strong> to have every file there
          without a connection; that computer then counts as one more copy.
        </li>
      </ul>
      <p>
        If the silo has more than one backup copy, a new device knows only
        the storage you entered. The other copies still receive its changes
        through the devices that use them. Add them on the new device too
        under <strong>Settings &gt; Backup</strong> if it should keep working
        when the first storage is down.
      </p>

      <h2 id="changed-in-two-places">Changed in two places</h2>
      <p>
        Two devices can change the same thing before either has synced, for
        example while one of them was offline. Nothing is lost:
      </p>
      <ul>
        <li>
          <strong>A file edited on both</strong>: one version stays under the
          file&apos;s name on every device, and the other is kept beside it
          as <code>report (conflicted copy 2026-10-19).pdf</code>. Open both,
          keep what you need and delete the other.
        </li>
        <li>
          <strong>A password entry saved on both</strong>: one version is
          shown, and the other is in the entry&apos;s earlier versions,
          marked <strong>Saved at the same time on another device</strong>.
        </li>
        <li>
          <strong>Two new files with the same name</strong> in one folder:
          one gets a number, such as <code>report (2).pdf</code>, and the app
          says it was renamed to avoid a clash.
        </li>
      </ul>
      <p>Every device makes the same choice, so they all end up alike.</p>

      <h2 id="keys-on-each-device">Keys on each device</h2>
      <KeysDiagram />
      <p>
        Every key opens the same silo, and any one is enough. Keep at least
        one that goes with you, so a lost or replaced device is not the end
        of the silo. The{" "}
        <Link href="/tutorials/unlock-without-a-key/">unlock without a key</Link>{" "}
        guide has the details of each.
      </p>

      <h2 id="retire-a-device">Retire a device</h2>
      <p>
        <strong>Settings &gt; Devices</strong> lists every device that has
        changed something in the silo, with when it last did. Rename them
        there so the list makes sense; the names show on every device.
      </p>
      <figure className="tut-shot">
        <ThemedImg
          base="/shots/tut-devices"
          alt="Settings, Devices: each device with its system, number of changes and last change"
          width={1200}
          height={800}
          sizes="(max-width: 52rem) 100vw, 47rem"
        />
      </figure>
      <p>To stop a device opening the silo, sold, lost or stolen:</p>
      <ol>
        <li>
          On a device you still use, open{" "}
          <strong>Settings &gt; Unlocking</strong> and remove the keys that
          device used, such as its Windows Hello. The others stop accepting
          them after their next sync.
        </li>
        <li>
          If the device may have kept a copy of the silo, also choose{" "}
          <strong>Replace the encryption key</strong> under{" "}
          <strong>Settings &gt; Advanced</strong>. A removed key then opens
          nothing added from that moment on. Your files are not uploaded
          again.
        </li>
      </ol>
      <p>
        The device stays in the list with the changes it made: they are part
        of the silo&apos;s history.
      </p>
      <MoreGuides />
    </main>
  );
}
