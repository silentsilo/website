"use client";

import { useEffect, useState } from "react";
import { CheckCircle, LockKey } from "@phosphor-icons/react/dist/ssr";
import { AppFrame, platformFor, type ShotPlatform } from "./AppFrame";
import { useVisitor } from "./DownloadButton";
import { ThemedImg } from "./ThemedImg";

/** The hero picture, in the app for the system reading the page. The page
 *  is rendered with Windows and swaps once the browser says otherwise. */
export function HeroShot() {
  const visitor = useVisitor();
  const [platform, setPlatform] = useState<ShotPlatform>("windows");
  useEffect(() => setPlatform(platformFor(visitor)), [visitor]);
  const phone = platform === "android";

  return (
    <div className={`hero-visual${phone ? " is-phone" : ""}`}>
      <AppFrame platform={platform} title="SilentSilo">
        {phone ? (
          <ThemedImg
            base="/shots/android-passwords"
            widths={[540, 1080]}
            sizes="320px"
            width={1080}
            height={1920}
            alt="The Android app with a silo open on its passwords"
          />
        ) : (
          <ThemedImg
            key={platform}
            base={platform === "macos" ? "/shots/hero-macos" : "/shots/hero"}
            sizes="(max-width: 900px) 100vw, 700px"
            width={2400}
            height={1585}
            alt={`The ${platform === "macos" ? "Mac" : "Windows"} app with a silo open on its passwords: a login selected beside the list of entries`}
          />
        )}
      </AppFrame>
      <div className="float float-a" aria-hidden>
        <span className="float-icon is-ok">
          <CheckCircle weight="fill" />
        </span>
        <span>
          <strong>Synced to Google Drive</strong>
          <small>2 copies up to date</small>
        </span>
      </div>
      <div className="float float-b" aria-hidden>
        <span className="float-icon">
          <LockKey weight="fill" />
        </span>
        <span>
          <strong>Encrypted on this device</strong>
          <small>AES-256-GCM</small>
        </span>
      </div>
    </div>
  );
}
