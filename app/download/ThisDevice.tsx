"use client";

import { useEffect } from "react";
import { visitorOf } from "../DownloadButton";

/** Marks the card for the system reading the page, once the browser has
 *  said which. The page renders the same for everyone before that. */
export function ThisDevice() {
  useEffect(() => {
    const id = visitorOf(navigator.userAgent, navigator.maxTouchPoints > 1);
    document.getElementById(id)?.classList.add("is-yours");
  }, []);
  return null;
}
