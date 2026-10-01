import type { Metadata } from "next";
import { CloudGuide } from "../CloudGuide";

export const metadata: Metadata = {
  title: "Back up to Dropbox",
  description:
    "Keep an encrypted copy of your silo in your Dropbox: signing in from the app, the app folder it uses, what Dropbox sees, and taking the access back.",
};

export default function BackupDropbox() {
  return (
    <CloudGuide
      c={{
        name: "Dropbox",
        company: "Dropbox",
        place: "Apps/SilentSilo in your Dropbox",
        path: "Apps/SilentSilo/Silo",
        account: (
          <p>
            Any Dropbox account, the free Basic one included, which has 2 GB.
            A silo with many photos or videos wants a paid plan.
          </p>
        ),
        access: (
          <p>
            The app has Dropbox&apos;s app folder permission: it reads and
            writes <code>Apps/SilentSilo</code> and nothing else in your
            Dropbox.
          </p>
        ),
        revoke: (
          <>
            Removing a Dropbox copy also ends the sign-in at Dropbox. It can
            be ended by hand too: on dropbox.com, open{" "}
            <strong>Settings &gt; Apps</strong>, then the arrow next to
            SilentSilo and <strong>Disconnect</strong>.
          </>
        ),
        download: (
          <>
            On dropbox.com, open <strong>Apps</strong> (Dropbox names it in
            your account&apos;s language), select <strong>SilentSilo</strong>{" "}
            and download it. Dropbox makes a ZIP only of a folder under 250
            GB and 10,000 files; a larger silo comes down through the
            Dropbox app or rclone instead.
          </>
        ),
      }}
    />
  );
}
