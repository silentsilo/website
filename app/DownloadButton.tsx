"use client";

import { useEffect, useState } from "react";
import { IconDownload, IconPhone } from "./Icons";
import { LATEST_INSTALLER, PLAY_STORE } from "./links";

export type Visitor = "windows" | "android" | "linux" | "macos" | "ios" | "elsewhere";

/** The system a browser says it runs on. An iPad asks for the desktop site
 *  and says Macintosh, so it is told apart by its touch screen. */
export function visitorOf(ua: string, touch: boolean): Visitor {
  if (/Android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && touch)) return "ios";
  if (/Windows/i.test(ua)) return "windows";
  if (/Macintosh/i.test(ua)) return "macos";
  if (/Linux|X11/i.test(ua) && !/CrOS/i.test(ua)) return "linux";
  return "elsewhere";
}

/** Which download fits the device reading the page. Windows until the
 *  browser says otherwise, so the server render is the common case. */
function useVisitor(): Visitor {
  const [visitor, setVisitor] = useState<Visitor>("windows");
  useEffect(() => {
    setVisitor(visitorOf(navigator.userAgent, navigator.maxTouchPoints > 1));
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
  if (visitor !== "windows") {
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
