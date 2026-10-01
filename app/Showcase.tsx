"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  ArrowCounterClockwise,
  Browser,
  CloudArrowUp,
  Fingerprint,
  FolderSimple,
  Heartbeat,
  Key,
  Password,
  Scroll,
  Stack,
} from "@phosphor-icons/react/dist/ssr";
import { IconChevronLeft, IconChevronRight } from "./Icons";
import { ThemedImg } from "./ThemedImg";

/** Long enough to read the caption under the shot, which is the point of it. */
const AUTOPLAY_MS = 6000;

/** Phones get the reel instead of the tabs, and neither the rotation nor the
 *  neighbour prefetch: both spend a metered connection on a screen nobody
 *  asked to see yet. Matches the CSS breakpoint below. */
const HANDHELD = "(hover: none), (max-width: 560px)";

type Shot = {
  id: string;
  tab: string;
  /** A few words under the name in the list. */
  hint: string;
  icon: React.ReactNode;
  /** Path without theme and size: `-light-1200.webp` and the like exist. */
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
    hint: "Encrypted names, drag and drop",
    icon: <FolderSimple weight="duotone" />,
    base: "/shots/files",
    width: 2400,
    height: 1600,
    alt: "The SilentSilo file explorer showing encrypted folders inside a silo",
    caption:
      "Grid or list, drag and drop, search across the whole silo. Names are encrypted at rest; the index only exists while you are unlocked.",
  },
  {
    id: "credentials",
    tab: "Passwords",
    hint: "Logins, cards, codes, SSH keys",
    icon: <Password weight="duotone" />,
    base: "/shots/credentials",
    width: 2400,
    height: 1600,
    alt: "The passwords view with a login selected, beside the list of entries",
    caption:
      "Logins, cards, identities, SSH keys and notes in one place, with live TOTP codes, a generator, and CSV import from Bitwarden, LastPass, 1Password or Chrome.",
  },
  {
    id: "health",
    tab: "Health",
    hint: "What needs a look",
    icon: <Heartbeat weight="duotone" />,
    base: "/shots/health",
    width: 2400,
    height: 1600,
    alt: "The health page listing a reused password, old passwords, a login without two-factor and an untested backup",
    caption:
      "Reused and old passwords, logins with no second factor, and whether the backup was ever tested. The breach check runs only when you ask, and sends five characters of a hash.",
  },
  {
    id: "fill",
    tab: "Browser fill",
    hint: "Confirmed in the app",
    icon: <Browser weight="duotone" />,
    base: "/shots/fill",
    width: 2400,
    height: 1600,
    alt: "The app asking whether to fill the GitHub login on github.com in the browser",
    caption:
      "The extension asks, the app answers. Each fill names the site and the login, and the browser gets nothing until you confirm with Windows Hello or your key.",
  },
  {
    id: "unlock",
    tab: "Unlock",
    hint: "A key or Windows Hello",
    icon: <Fingerprint weight="duotone" />,
    base: "/shots/unlock",
    width: 2400,
    height: 1600,
    alt: "The unlock screen waiting for a security key to be touched",
    caption:
      "No master password to forget, and none for anyone else to take. A key you touch or a face Windows already knows, with a code on paper as the only way back.",
  },
  {
    id: "keys",
    tab: "Keys",
    hint: "Add or retire a key",
    icon: <Key weight="duotone" />,
    base: "/shots/keys",
    width: 2400,
    height: 1600,
    alt: "The unlocking settings listing a YubiKey and Windows Hello, with a form to add another key",
    caption:
      "Every key that opens the silo, by name. Add a YubiKey or Windows Hello, remove one you lost, and the files stay exactly as they are.",
  },
  {
    id: "silos",
    tab: "Silos",
    hint: "Personal, family, work",
    icon: <Stack weight="duotone" />,
    base: "/shots/picker",
    width: 2400,
    height: 1600,
    alt: "The silo picker listing two silos",
    caption:
      "Several silos per install. Personal, family, work, each a portable folder with its own keys and its own backup.",
  },
  {
    id: "backup",
    tab: "Backup",
    hint: "Every copy and how current",
    icon: <CloudArrowUp weight="duotone" />,
    base: "/shots/backup",
    width: 2400,
    height: 1600,
    alt: "The backup page, connected to a folder, with the list of copies below it",
    caption:
      "Point it at a bucket, a share or a folder you already own. It lists every copy and how current each one is, and everything is encrypted before it leaves.",
  },
  {
    id: "kit",
    tab: "Emergency kit",
    hint: "One printed sheet",
    icon: <Scroll weight="duotone" />,
    base: "/shots/kit",
    width: 2400,
    height: 1600,
    alt: "The printable emergency kit, with the recovery code in boxes and the steps to follow",
    caption:
      "One sheet that opens the silo on a computer which has never seen it: the code in boxes, and what to do, in order. Print it and file it with the documents you cannot replace.",
  },
  {
    id: "restore",
    tab: "Restore",
    hint: "A new computer, same silo",
    icon: <ArrowCounterClockwise weight="duotone" />,
    base: "/shots/restore",
    width: 2400,
    height: 1600,
    alt: "Setting up a silo on a new computer from a Google Drive account: signed in, with the silo folder listed",
    caption:
      "A new machine finds the silo in your own storage, here a Google Drive, and opens it with a key you already hold. No account to recover.",
  },
];


export function Showcase() {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [rotating, setRotating] = useState(true);
  const [reel, setReel] = useState(0);
  const [onScreen, setOnScreen] = useState(false);
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
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(!!entry?.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const timed = rotating && onScreen;

  /* Restarted on every change of shot, so the progress line and the wait
     always start together. */
  useEffect(() => {
    if (!timed) return;
    const timer = window.setTimeout(
      () => setActive((i) => (i + 1) % SHOTS.length),
      AUTOPLAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [timed, active]);

  /* Only the active shot is in the DOM on the tabs layout, so without this
     the first pass through would blank between tabs while each one
     downloads. Both neighbours, because the lightbox goes backwards too. */
  useEffect(() => {
    if (window.matchMedia(HANDHELD).matches) return;
    for (const dir of [1, -1]) {
      const near = SHOTS[(active + dir + SHOTS.length) % SHOTS.length];
      if (near) {
        const theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
        new Image().src = `${near.base}-${theme}-1200.webp`;
      }
    }
  }, [active]);

  /* Arrow keys move between tabs, as the tab role promises. The roving
     tabindex keeps a single Tab stop for the whole list. */
  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const dir =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? -1
          : 0;
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
      {/* The list of screens beside one large shot, from 560px up. */}
      <div className="showcase-tabbed">
        <div className="tabs" role="tablist" aria-label="Screenshots" aria-orientation="vertical">
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
              <span className="tab-icon" aria-hidden>
                {s.icon}
              </span>
              <span className="tab-text">
                <span className="tab-name">{s.tab}</span>
                <span className="tab-hint">{s.hint}</span>
              </span>
              {/* How long until the next one, while the list still turns
                  by itself. */}
              {i === active && timed && (
                <span
                  key={active}
                  className="tab-progress"
                  style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                  aria-hidden
                />
              )}
            </button>
          ))}
        </div>

        <figure
          className="showcase-figure"
          role="tabpanel"
          id={`shot-panel-${shot.id}`}
          aria-labelledby={`shot-tab-${shot.id}`}
        >
          <div className="window shot-window">
            <div className="window-bar" aria-hidden>
              <span className="window-title">SilentSilo · {shot.tab}</span>
              <span className="window-controls">
                <i />
                <i />
                <i />
              </span>
            </div>
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
              <ThemedImg
                key={shot.base}
                base={shot.base}
                sizes="(max-width: 960px) 92vw, 860px"
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
              />
              <span className="zoom-hint" aria-hidden>
                Click to enlarge
              </span>
            </button>
          </div>
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
                <ThemedImg
                  base={s.base}
                  sizes="100vw"
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
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
          {/* The backdrop closes; the picture does not. Once there are
              arrows to aim at, a miss should not throw the reader out. */}
          <ThemedImg
            base={shot.base}
            large
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
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
