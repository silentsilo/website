"use client";

import { useEffect, useState } from "react";
import { IconDownload, IconPhone } from "./Icons";
import { LATEST_INSTALLER, PLAY_STORE } from "./links";

type Visitor = "windows" | "android" | "elsewhere";

/** Which download fits the device reading the page. Windows until the
 *  browser says otherwise, so the server render is the common case. */
function useVisitor(): Visitor {
  const [visitor, setVisitor] = useState<Visitor>("windows");
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/Android/i.test(ua)) setVisitor("android");
    else if (/Windows/i.test(ua)) setVisitor("windows");
    else setVisitor("elsewhere");
  }, []);
  return visitor;
}

/** The one button most visitors came for: Google Play on Android, the
 *  installer on Windows, and the list of platforms anywhere else, where
 *  the honest answer is "not yet". */
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
