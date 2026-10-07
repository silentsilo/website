"use client";

import { useEffect, useState } from "react";
import { IconDownload, IconPhone } from "./Icons";
import { LATEST_INSTALLER, PLAY_STORE } from "./links";

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
 *  installer on Windows, the two Linux packages on Linux, and the download
 *  page anywhere else, where the honest answer is "not yet". */
export function DownloadButton() {
  const visitor = useVisitor();
  const cls = "btn btn-primary";
  if (visitor === "android") {
    return (
      <a className={cls} href={PLAY_STORE}>
        <IconPhone size={16} />
        Get it on Google Play
      </a>
    );
  }
  if (visitor === "linux") {
    return (
      <a className={cls} href="/download/#linux">
        <IconDownload size={16} />
        Download for Linux
      </a>
    );
  }
  if (visitor === "elsewhere") {
    return (
      <a className={cls} href="/download/">
        <IconDownload size={16} />
        See the platforms
      </a>
    );
  }
  return (
    <a className={cls} href={LATEST_INSTALLER}>
      <IconDownload size={16} />
      Download for Windows
    </a>
  );
}
