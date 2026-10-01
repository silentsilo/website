"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/** Runs in <head> before the first paint, so the page never flashes the
 *  wrong theme: a choice the visitor made wins, otherwise the system's. */
export const THEME_SCRIPT = `(function(){var t;try{t=localStorage.getItem("theme")}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t})()`;

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function storedTheme(): Theme | null {
  try {
    const t = localStorage.getItem("theme");
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) ?? systemTheme());
    // Until the visitor picks one, the page follows the system as it changes.
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const follow = () => {
      if (storedTheme()) return;
      const next = systemTheme();
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    media.addEventListener("change", follow);
    return () => media.removeEventListener("change", follow);
  }, []);

  const flip = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      // Picking the system's own theme goes back to following the system.
      if (next === systemTheme()) localStorage.removeItem("theme");
      else localStorage.setItem("theme", next);
    } catch {
      // Private windows may refuse storage; the switch still works for the visit.
    }
    setTheme(next);
  };

  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button type="button" className="icon-btn" onClick={flip} aria-label={label} title={label}>
      {/* Both drawn, one shown by CSS from the theme attribute, so the server
          render matches whatever the head script chose. */}
      <svg className="theme-sun" width="18" height="18" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
      </svg>
      <svg className="theme-moon" width="18" height="18" viewBox="0 0 24 24" aria-hidden>
        <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z" />
      </svg>
    </button>
  );
}
