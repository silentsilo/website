import type { Metadata } from "next";
import { CloudGuide } from "../CloudGuide";

export const metadata: Metadata = {
  title: "Back up to Google Drive",
  description:
    "Keep an encrypted copy of your silo in your Google Drive: signing in from the app, the folder it uses, what Google sees, and taking the access back.",
};

export default function BackupGoogleDrive() {
  return (
    <CloudGuide
      c={{
        name: "Google Drive",
        company: "Google",
        place: "the SilentSilo folder of your Google Drive",
        path: "My Drive/SilentSilo/Silo",
        account: (
          <p>
            Any Google account. The free 15 GB is shared with Gmail and
            Google Photos, so check what is left before a large silo goes
            there.
          </p>
        ),
        access: (
          <p>
            The app asks Google only for <code>drive.file</code>: the files
            it creates itself, or that you open with it, and SilentSilo never
            asks to open any. Everything else in your Drive stays out of its
            reach, and so does anything put into its folder by hand. It also reads your email address, only to show which
            account is connected.
          </p>
        ),
        revoke: (
          <>
            Google lists the access on the linked apps page,{" "}
            <a href="https://myaccount.google.com/linkedapps">
              myaccount.google.com/linkedapps
            </a>
            , where <strong>Remove access</strong> ends it. SilentSilo does not end it there itself:
            Google ends every sign-in of an app to an account at once, so it
            would sign out your other computers and your phone as well.
          </>
        ),
        download: (
          <>
            On drive.google.com, right-click the <strong>SilentSilo</strong>{" "}
            folder and download it. A large folder may arrive as several ZIP
            files: unpack them all into the same folder. rclone copies it
            down whole as well.
          </>
        ),
        extra: (
          <p>
            Google limits uploads to 750 GB a day per user (it documents the
            figure for Workspace accounts). A first sync larger than that
            pauses with{" "}
            <strong>
              Google Drive&apos;s daily upload limit is reached; it resumes
              tomorrow
            </strong>
            , and goes on by itself.
          </p>
        ),
      }}
    />
  );
}
