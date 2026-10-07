"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Browser, Desktop, DeviceMobile, Terminal } from "@phosphor-icons/react/dist/ssr";
import { visitorOf, type Visitor } from "./DownloadButton";
import { LATEST_INSTALLER, PLAY_STORE } from "./links";

const ALL = [
  { id: "windows", label: "Windows", href: LATEST_INSTALLER, icon: <Desktop weight="duotone" /> },
  { id: "linux", label: "Linux", href: "/download/#linux", icon: <Terminal weight="duotone" /> },
  { id: "android", label: "Android", href: PLAY_STORE, icon: <DeviceMobile weight="duotone" /> },
  { id: "extension", label: "Browser", href: "/download/#extension", icon: <Browser weight="duotone" /> },
];

/** The row under the hero button: every other place it runs, so the one
 *  the button already offers is not listed twice. */
export function AlsoOn() {
  const [visitor, setVisitor] = useState<Visitor>("windows");
  useEffect(() => {
    setVisitor(visitorOf(navigator.userAgent, navigator.maxTouchPoints > 1));
  }, []);
  return (
    <p className="hero-stores">
      <span>Also on</span>
      {ALL.filter((p) => p.id !== visitor).map((p) => (
        <a key={p.id} href={p.href}>
          {p.icon}
          {p.label}
        </a>
      ))}
      <a href="/download/" className="hero-all">
        All downloads
        <ArrowRight />
      </a>
    </p>
  );
}
