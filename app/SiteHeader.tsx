"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  IconBook,
  IconCompass,
  IconEyeOff,
  IconGitHub,
  IconHelp,
  IconPerson,
  IconShield,
} from "./Icons";
import { REPO } from "./links";

const links = [
  { href: "/security/", label: "Security", Icon: IconShield },
  { href: "/tutorials/", label: "Tutorials", Icon: IconBook },
  { href: "/faq/", label: "Questions", Icon: IconHelp },
  { href: "/privacy/", label: "Privacy", Icon: IconEyeOff },
  { href: "/principles/", label: "Principles", Icon: IconCompass },
  { href: "/who/", label: "Who", Icon: IconPerson },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="wrap">
        <Link href="/" className="brand" aria-label="SilentSilo, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.svg" alt="" width={28} height={28} />
          <span>SilentSilo</span>
        </Link>

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
                  /* Below 720px the label span is display:none, which would
                     take the accessible name with it. */
                  aria-label={label}
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
      </div>
    </header>
  );
}
