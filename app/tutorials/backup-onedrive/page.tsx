import type { Metadata } from "next";
import { CloudGuide } from "../CloudGuide";

export const metadata: Metadata = {
  title: "Back up to OneDrive",
  description:
    "Keep an encrypted copy of your silo in your OneDrive: signing in from the app, the folder it uses, what Microsoft sees, and taking the access back.",
};

export default function BackupOneDrive() {
  return (
    <CloudGuide
      c={{
        name: "OneDrive",
        company: "Microsoft",
        place: "Apps/SilentSilo on your OneDrive",
        path: "Apps/SilentSilo/Silo",
        account: (
          <p>
            A personal Microsoft account: Outlook.com, Hotmail, or one that
            came with Microsoft 365 Personal or Family. It has 5 GB free, 100 GB with
            Microsoft 365 Basic and 1 TB with Personal or Family. Work and school accounts are not
            supported yet: the app says so when you sign in with one.
          </p>
        ),
        access: (
          <p>
            The app asks Microsoft for its own app folder and nothing else,
            so it cannot open your documents or photos. It also asks for your
            email address, only to show which account is connected.
          </p>
        ),
        revoke: (
          <>
            To end it on Microsoft&apos;s side too, open{" "}
            <a href="https://microsoft.com/consent">microsoft.com/consent</a>,
            sign in, and remove SilentSilo.
          </>
        ),
        download: (
          <>
            On onedrive.com, open <strong>Apps</strong>, select{" "}
            <strong>SilentSilo</strong> and download it. OneDrive makes a ZIP
            of up to 10,000 files; a larger silo comes down through the
            OneDrive app or rclone instead.
          </>
        ),
      }}
    />
  );
}
