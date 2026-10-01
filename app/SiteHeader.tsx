"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { DownloadButton } from "./DownloadButton";
import { IconClose, IconGitHub, IconMail, IconMenu } from "./Icons";
import { REPO } from "./links";
import { ThemeToggle } from "./ThemeToggle";

/** The bar: the four pages most visitors look for. */
const MAIN = [
  { href: "/tutorials/", label: "Tutorials" },
  { href: "/security/", label: "Security" },
  { href: "/faq/", label: "Questions" },
  { href: "/privacy/", label: "Privacy" },
];

/** The menu on a phone: everything. */
const ALL = [
  ...MAIN,
  { href: "/europe/", label: "In the EU" },
  { href: "/principles/", label: "Principles" },
  { href: "/who/", label: "Who makes this" },
];

const FOCUSABLE = "a[href], button:not([disabled])";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Closing hands focus back to the button that opened it. */
  const close = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  }, []);

  /* A link inside the panel navigates without unmounting the header. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const loop = () => {
      const panel = panelRef.current;
      const button = buttonRef.current;
      if (!panel || !button) return [] as HTMLElement[];
      return [button, ...panel.querySelectorAll<HTMLElement>(FOCUSABLE)];
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = loop();
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      const here = document.activeElement;
      if (e.shiftKey && (here === first || !items.includes(here as HTMLElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && here === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, close]);

  return (
    <header className="site-header" data-scrolled={scrolled} data-open={open}>
      <div className="wrap header-row">
        <Link href="/" className="brand" aria-label="SilentSilo, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.svg" alt="" width={26} height={26} />
          <span>SilentSilo</span>
        </Link>

        <nav className="site-nav" aria-label="Main">
          {MAIN.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className="nav-link"
                data-active={active}
                aria-current={pathname === href ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <a className="icon-btn header-gh" href={REPO} aria-label="Source on GitHub" title="Source on GitHub">
            <IconGitHub size={18} />
          </a>
          <DownloadButton size="sm" />
          <button
            type="button"
            className="icon-btn nav-menu-btn"
            ref={buttonRef}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close the menu" : "Open the menu"}
            onClick={() => (open ? close() : setOpen(true))}
          >
            {open ? <IconClose size={20} /> : <IconMenu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="site-menu" id="site-menu" ref={panelRef}>
          <div className="wrap">
            <nav aria-label="All pages">
              {ALL.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className="menu-row"
                    data-active={active}
                    aria-current={active ? "page" : undefined}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
            <a className="menu-row" href={REPO}>
              <IconGitHub size={18} />
              Source on GitHub
            </a>
            <a className="menu-row" href="mailto:contact@silentsilo.com">
              <IconMail size={18} />
              contact@silentsilo.com
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
