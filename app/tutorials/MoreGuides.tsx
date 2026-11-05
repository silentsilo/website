"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { FURTHER, START, STORAGE_GUIDES } from "./guides";

/**
 * The end of every guide: the guides about using the app, and the other
 * places a backup can go. The page being read is left out of both.
 */
export function MoreGuides() {
  const here = usePathname();
  const storage = STORAGE_GUIDES.filter((g) => g.href !== here);
  const start = START.filter((g) => g.href !== here);
  const further = FURTHER.filter((g) => g.href !== here);
  return (
    <nav className="more-guides" aria-label="Other guides">
      <div>
        <p className="toc-head">Using the app</p>
        <ul>
          {[...start, ...further].map((g) => (
            <li key={g.href}>
              <Link href={g.href}>{g.short}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="toc-head">Back up somewhere else</p>
        <ul>
          {storage.map((g) => (
            <li key={g.href}>
              <Link href={g.href}>{g.short}</Link>
            </li>
          ))}
        </ul>
      </div>
      <Link className="more-guides-all" href="/tutorials/">
        All tutorials
        <ArrowRight />
      </Link>
    </nav>
  );
}
