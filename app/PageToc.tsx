"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Entry = { id: string; text: string };

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/**
 * The sections of a long page, beside it on a wide screen. Built from the
 * page's own h2s, so no page has to keep a second list in step. Shown only
 * by CSS from 1200px up, and only on pages with three sections or more.
 */
export function PageToc() {
  const pathname = usePathname();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const heads = [...document.querySelectorAll<HTMLHeadingElement>("main.prose h2")];
    const found: Entry[] = [];
    for (const h of heads) {
      if (!h.id) h.id = slug(h.textContent ?? "");
      if (h.id) found.push({ id: h.id, text: h.textContent ?? "" });
    }
    setEntries(found.length >= 3 ? found : []);
    setActive(null);
    if (found.length < 3) return;
    // The section whose heading last crossed the upper third of the screen.
    const io = new IntersectionObserver(
      (records) => {
        for (const r of records) if (r.isIntersecting) setActive(r.target.id);
      },
      { rootMargin: "0px 0px -66% 0px" },
    );
    for (const h of heads) io.observe(h);
    // Fixed beside the text, so it steps aside rather than sit on the footer.
    const footer = document.querySelector(".site-footer");
    const fo = new IntersectionObserver(([r]) => setAtFooter(!!r?.isIntersecting));
    if (footer) fo.observe(footer);
    return () => {
      io.disconnect();
      fo.disconnect();
    };
  }, [pathname]);

  if (entries.length === 0) return null;
  return (
    <nav className="side-toc" aria-label="Sections" data-hidden={atFooter}>
      <p className="toc-head">On this page</p>
      <ol>
        {entries.map((e) => (
          <li key={e.id}>
            <a href={`#${e.id}`} data-active={active === e.id}>
              {e.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
