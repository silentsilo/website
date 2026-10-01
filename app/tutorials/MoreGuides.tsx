"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { FURTHER, STORAGE_GUIDES } from "./guides";

/**
 * The end of every guide: the other places a backup can go, and what to do
 * once one runs. The page being read is left out of both lists.
 */
export function MoreGuides() {
  const here = usePathname();
  const storage = STORAGE_GUIDES.filter((g) => g.href !== here);
  const further = FURTHER.filter((g) => g.href !== here);
  return (
    <nav className="more-guides" aria-label="Other guides">
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
      <div>
        <p className="toc-head">Once a backup runs</p>
        <ul>
          {further.map((g) => (
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
