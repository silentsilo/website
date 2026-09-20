"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { IconChevronLeft, IconChevronRight } from "./Icons";

/** Long enough to read the caption under the shot, which is the point of it. */
const AUTOPLAY_MS = 6000;

/** Phones get the reel instead of the tabs, and neither the rotation nor the
 *  neighbour prefetch: both spend a metered connection on a screen nobody
 *  asked to see yet. Matches the CSS breakpoint below. */
const HANDHELD = "(hover: none), (max-width: 560px)";

type Shot = {
  id: string;
  tab: string;
  /** Path without the size: `-1200.webp` and `-2400.webp` both exist. */
  base: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

/* Captured from the app by scripts/screenshots.mjs in the desktop
   repository, at 1200x800 and twice the pixel density, then converted here
   by scripts/shots.mjs. Regenerate them there when a screen changes: the
   claim above the tabs is that these are the current build, and it is only
   worth making if it stays true. */
const SHOTS: Shot[] = [
  {
    id: "files",
    tab: "Files",
    base: "/shots/files-dark",
    width: 2400,
    height: 1600,
    alt: "The SilentSilo file explorer showing encrypted folders inside a silo",
    caption:
      "Grid or list, drag and drop, search across the whole silo. Names are encrypted at rest; the index only exists while you are unlocked.",
  },
  {
    id: "credentials",
    tab: "Credentials",
    base: "/shots/credentials-dark",
    width: 2400,
    height: 1600,
    alt: "The credentials view with a login selected, beside the list of items",
    caption:
      "Logins, cards, identities, SSH keys and notes in one place, with live TOTP codes, a generator, and CSV import from Bitwarden, LastPass, 1Password or Chrome.",
  },
  {
    id: "unlock",
    tab: "Unlock",
    base: "/shots/unlock-dark",
    width: 2400,
    height: 1600,
    alt: "The unlock screen waiting for a security key to be touched",
    caption:
      "No master password to forget, and none for anyone else to take. A key you touch or a face Windows already knows, with a code on paper as the only way back.",
  },
  {
    id: "silos",
    tab: "Silos",
    base: "/shots/picker-dark",
    width: 2400,
    height: 1600,
    alt: "The silo picker listing two silos",
    caption:
      "Several silos per install. Personal, family, work, each a portable folder with its own keys and its own backup.",
  },
  {
    id: "backup",
    tab: "Backup",
    base: "/shots/backup-dark",
    width: 2400,
    height: 1600,
    alt: "The backup settings, connected to a folder, with sync controls",
    caption:
      "Point it at a bucket, a share or a folder you already own. It says what has arrived and what is still waiting, and the provider holds nothing but ciphertext.",
  },
  {
    id: "kit",
    tab: "Emergency kit",
    base: "/shots/kit-dark",
    width: 2400,
    height: 1600,
    alt: "The printable emergency kit, with the recovery code in boxes and the steps to follow",
    caption:
      "One sheet that opens the silo on a computer which has never seen it: the code in boxes, and what to do, in order. Print it and file it with the documents you cannot replace.",
  },
  {
    id: "restore",
    tab: "Restore",
    base: "/shots/restore-dark",
    width: 2400,
    height: 1600,
    alt: "Setting up a silo on a new computer from existing backup storage",
    caption:
      "A new machine rebuilds the silo from your own storage and a key you already hold. No account to recover.",
  },
];

const srcSet = (s: Shot) => `${s.base}-1200.webp 1200w, ${s.base}-2400.webp 2400w`;

export function Showcase() {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [rotating, setRotating] = useState(true);
  const [reel, setReel] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const zoomTriggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLUListElement>(null);
  const shot = SHOTS[active]!;

  /* The first deliberate act hands the thing over for good. Someone who has
     started choosing does not want the page choosing again a moment later. */
  const takeOver = useCallback(() => setRotating(false), []);

  /* One step through the shots, wrapping, shared by the tab arrow keys and
     by the lightbox. Wrapping rather than stopping at the ends: the tab list
     already wraps, and a dead arrow reads as a broken one. */
  const go = useCallback(
    (dir: number) => {
      takeOver();
      setActive((i) => (i + dir + SHOTS.length) % SHOTS.length);
    },
    [takeOver],
  );

  /* Someone who has asked the system for less movement has asked for this
     too, and a carousel is the most literal reading of the request. */
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia(HANDHELD).matches
    ) {
      setRotating(false);
    }
  }, []);

  /* Only while it is on screen. Advancing in a section nobody is looking at
     spends bandwidth to arrive at a random tab by the time they scroll back. */
  useEffect(() => {
    const root = rootRef.current;
    if (!rotating || !root) return;

    let timer: number | undefined;
    const stop = () => {
      if (timer !== undefined) window.clearInterval(timer);
      timer = undefined;
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          stop();
          timer = window.setInterval(
            () => setActive((i) => (i + 1) % SHOTS.length),
            AUTOPLAY_MS,
          );
        } else {
          stop();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(root);
    return () => {
      stop();
      observer.disconnect();
    };
  }, [rotating]);

  /* Only the active shot is in the DOM on the tabs layout, so without this
     the first pass through would blank between tabs while each one
     downloads. Both neighbours, because the lightbox goes backwards too. */
  useEffect(() => {
    if (window.matchMedia(HANDHELD).matches) return;
    for (const dir of [1, -1]) {
      const near = SHOTS[(active + dir + SHOTS.length) % SHOTS.length];
      if (near) new Image().src = `${near.base}-1200.webp`;
    }
  }, [active]);

  /* Arrow keys move between tabs, as the tab role promises. The roving
     tabindex keeps a single Tab stop for the whole list. */
  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const dir =
      e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (dir === 0) return;
    e.preventDefault();
    takeOver();
    const next = (i + dir + SHOTS.length) % SHOTS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  useEffect(() => {
    if (!zoomed) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZoomed(false);
        return;
      }
      const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (dir === 0) return;
      e.preventDefault();
      go(dir);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      /* Hand focus back to the thumbnail that opened the dialog, so a
         keyboard user is not dropped at the top of the page. */
      zoomTriggerRef.current?.focus();
    };
  }, [zoomed, go]);

  /* Which slide the reel has settled on, for the counter under it. */
  const onReelScroll = () => {
    const el = reelRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setReel(Math.max(0, Math.min(SHOTS.length - 1, i)));
  };

  return (
    <div className="showcase" ref={rootRef}>
      {/* Tabs and one large shot, from 560px up. */}
      <div className="showcase-tabbed">
        <div className="tabs" role="tablist" aria-label="Screenshots">
          {SHOTS.map((s, i) => (
            <button
              key={s.id}
              id={`shot-tab-${s.id}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`shot-panel-${s.id}`}
              tabIndex={i === active ? 0 : -1}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`tab${i === active ? " is-active" : ""}`}
              onClick={() => {
                takeOver();
                setActive(i);
              }}
            >
              {s.tab}
            </button>
          ))}
        </div>

        <figure
          className="showcase-figure"
          role="tabpanel"
          id={`shot-panel-${shot.id}`}
          aria-labelledby={`shot-tab-${shot.id}`}
        >
          <button
            type="button"
            className="shot-frame shot-zoomable"
            onClick={() => {
              takeOver();
              setZoomed(true);
            }}
            ref={zoomTriggerRef}
            aria-label={`Enlarge the ${shot.tab.toLowerCase()} screenshot`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={shot.base}
              src={`${shot.base}-1200.webp`}
              srcSet={srcSet(shot)}
              sizes="(max-width: 820px) 92vw, 760px"
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              loading="lazy"
              decoding="async"
            />
            <span className="zoom-hint" aria-hidden>
              Click to enlarge
            </span>
          </button>
          <figcaption>{shot.caption}</figcaption>
        </figure>
      </div>

      {/* Below 560px, one shot per screen with the thumb doing the work. A
          760px frame scaled to 327px was unreadable, and the tab row was
          seven targets in a strip. */}
      <div className="showcase-reel">
        <ul
          className="reel"
          ref={reelRef}
          onScroll={onReelScroll}
          tabIndex={0}
          aria-label="Screenshots, scroll sideways"
        >
          {SHOTS.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className="shot-frame shot-zoomable"
                onClick={() => {
                  takeOver();
                  setActive(i);
                  setZoomed(true);
                }}
                aria-label={`Enlarge the ${s.tab.toLowerCase()} screenshot`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${s.base}-1200.webp`}
                  srcSet={srcSet(s)}
                  sizes="100vw"
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <span className="zoom-hint" aria-hidden>
                  Tap to enlarge
                </span>
              </button>
              <p className="reel-caption">
                <strong>{s.tab}.</strong> {s.caption}
              </p>
            </li>
          ))}
        </ul>
        <p className="reel-count" aria-live="polite">
          {reel + 1} / {SHOTS.length}
        </p>
      </div>

      {zoomed && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={shot.alt}
          onClick={() => setZoomed(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${shot.base}-2400.webp`}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            /* The backdrop closes; the picture does not. Once there are
               arrows to aim at, a miss should not throw the reader out. */
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            className="lightbox-nav is-prev"
            aria-label="Previous screenshot"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
          >
            <IconChevronLeft />
          </button>
          <button
            type="button"
            className="lightbox-nav is-next"
            aria-label="Next screenshot"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
          >
            <IconChevronRight />
          </button>

          {/* Which one of how many. Without it the arrows are a promise with
              no end in sight. */}
          <span className="lightbox-where" aria-hidden>
            {shot.tab} · {active + 1} / {SHOTS.length}
          </span>

          <button
            type="button"
            className="lightbox-close"
            aria-label="Close"
            ref={closeRef}
            onClick={(e) => {
              e.stopPropagation();
              setZoomed(false);
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
