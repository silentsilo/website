"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  IconBook,
  IconClose,
  IconCompass,
  IconDownload,
  IconEyeOff,
  IconGitHub,
  IconHelp,
  IconMail,
  IconMenu,
  IconPerson,
  IconShield,
} from "./Icons";
import { LATEST_INSTALLER, RELEASED, REPO } from "./links";

const links = [
  { href: "/security/", label: "Security", Icon: IconShield },
  { href: "/tutorials/", label: "Tutorials", Icon: IconBook },
  { href: "/faq/", label: "Questions", Icon: IconHelp },
  { href: "/privacy/", label: "Privacy", Icon: IconEyeOff },
  { href: "/principles/", label: "Principles", Icon: IconCompass },
  { href: "/who/", label: "Who", Icon: IconPerson },
];

const FOCUSABLE = "a[href], button:not([disabled])";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Closing hands focus back to the button that opened it, so a keyboard
     user carries on from where they were rather than at the top of the
     document. */
  const close = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  }, []);

  /* A link inside the panel navigates without unmounting the header, so the
     panel would stay open over the new page. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    /* The page behind a full-width panel should not scroll under it. */
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    /* The button is part of the loop: it is the way back out, and Tab
       reaching the page behind the panel would leave focus somewhere the
       reader cannot see. */
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
      <div className="wrap">
        <Link href="/" className="brand" aria-label="SilentSilo, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.svg" alt="" width={28} height={28} />
          <span>SilentSilo</span>
        </Link>

        {/* Above 900px: every page one click away, in its own pill. */}
        <nav className="site-nav" aria-label="Main">
          <div className="nav-pill">
            {links.map(({ href, label, Icon }) => {
              /* Trailing slashes are on, so pathname matches href exactly. */
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="nav-link"
                  data-active={active}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
          <a className="nav-github" href={REPO} aria-label="Source on GitHub">
            <IconGitHub size={17} />
            <span>GitHub</span>
          </a>
        </nav>

        {/* Below 900px: the one thing most visitors came for, and a labelled
            way to everything else. Icons on their own were unreadable and
            too small to hit. */}
        <div className="nav-compact">
          {RELEASED && (
            <a className="nav-get" href={LATEST_INSTALLER}>
              <IconDownload size={16} />
              <span>Download</span>
            </a>
          )}
          <button
            type="button"
            className="nav-menu-btn"
            ref={buttonRef}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => (open ? close() : setOpen(true))}
          >
            {open ? <IconClose size={20} /> : <IconMenu size={20} />}
            <span>Menu</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="site-menu" id="site-menu" ref={panelRef}>
          <div className="wrap">
            <nav aria-label="All pages">
              {links.map(({ href, label, Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className="menu-row"
                    data-active={active}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>
            <a className="menu-row" href={REPO}>
              <IconGitHub size={18} />
              <span>Source on GitHub</span>
            </a>
            <a className="menu-row" href="mailto:contact@silentsilo.com">
              <IconMail size={18} />
              <span>contact@silentsilo.com</span>
            </a>
            <a className="menu-row" href="mailto:security@silentsilo.com">
              <IconMail size={18} />
              <span>security@silentsilo.com</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
