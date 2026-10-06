"use client";

import { useEffect, useState } from "react";
import { IconDownload, IconPhone } from "./Icons";
import { LATEST_INSTALLER, LATEST_RELEASE, PLAY_STORE } from "./links";

type Visitor = "windows" | "android" | "linux" | "elsewhere";

/** Which download fits the device reading the page. Windows until the
 *  browser says otherwise, so the server render is the common case. */
function useVisitor(): Visitor {
  const [visitor, setVisitor] = useState<Visitor>("windows");
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/Android/i.test(ua)) setVisitor("android");
    else if (/Windows/i.test(ua)) setVisitor("windows");
    else if (/Linux|X11/i.test(ua) && !/CrOS/i.test(ua)) setVisitor("linux");
    else setVisitor("elsewhere");
  }, []);
  return visitor;
}

/** The one button most visitors came for: Google Play on Android, the
 *  installer on Windows, the release with the .deb and the AppImage on
 *  Linux, and the list of platforms anywhere else, where the honest answer
 *  is "not yet". */
export function DownloadButton({ size }: { size?: "sm" }) {
  const visitor = useVisitor();
  const cls = `btn btn-primary${size === "sm" ? " btn-sm" : ""}`;
  if (visitor === "android") {
    return (
      <a className={cls} href={PLAY_STORE}>
        <IconPhone size={16} />
        {size === "sm" ? "Get it" : "Get it on Google Play"}
      </a>
    );
  }
  if (visitor === "linux") {
    return (
      <a className={cls} href={LATEST_RELEASE}>
        <IconDownload size={16} />
        {size === "sm" ? "Download" : "Download for Linux"}
      </a>
    );
  }
  if (visitor === "elsewhere") {
    return (
      <a className={cls} href="/#platforms">
        <IconDownload size={16} />
        {size === "sm" ? "Download" : "See the platforms"}
      </a>
    );
  }
  return (
    <a className={cls} href={LATEST_INSTALLER}>
      <IconDownload size={16} />
      {size === "sm" ? "Download" : "Download for Windows"}
    </a>
  );
}
