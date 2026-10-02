"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { EXTENSION_STORES } from "./links";

type Store = (typeof EXTENSION_STORES)[number];

/**
 * The extension card's link: straight to the store for the browser being
 * used, but only on Windows, where the app it talks to runs. Anywhere else,
 * and before the page knows, the guide that explains what it needs first.
 */
export function ExtensionStoreLink() {
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent;
    if (!/Windows/i.test(ua)) return;
    // Edge and Firefox name themselves; Chrome's token is in both of those
    // too, so it is checked last. Brave reports as Chrome and uses its store.
    const id = /Edg\//.test(ua)
      ? "edge"
      : /Firefox\//.test(ua)
        ? "firefox"
        : /Chrome\//.test(ua)
          ? "chrome"
          : null;
    setStore(EXTENSION_STORES.find((s) => s.id === id) ?? null);
  }, []);

  if (!store) {
    return (
      <a className="plat-action" href="/tutorials/browser-extension/">
        How it works
        <ArrowRight />
      </a>
    );
  }
  return (
    <a className="plat-action" href={store.href}>
      Add to {store.name}
      <ArrowRight />
    </a>
  );
}
