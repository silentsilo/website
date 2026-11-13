"use client";

import { useEffect, useRef, useState } from "react";

const BASE = "/video/silentsilo-intro";

/**
 * The presentation film, in the site's theme. Both players are in the page
 * and CSS shows one, as with the screenshots; neither loads anything before
 * it is played, so the hidden one is never fetched. When the theme changes
 * mid-film, the other player picks up where this one was.
 */
export function IntroFilm() {
  const light = useRef<HTMLVideoElement>(null);
  const dark = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      const toDark = root.dataset.theme === "dark";
      const from = toDark ? light.current : dark.current;
      const to = toDark ? dark.current : light.current;
      if (!from || !to || from.currentTime === 0) return;
      const at = from.currentTime;
      const playing = !from.paused;
      from.pause();
      to.muted = from.muted;
      to.volume = from.volume;
      const resume = () => {
        to.currentTime = at;
        if (playing) void to.play();
      };
      if (to.readyState >= HTMLMediaElement.HAVE_METADATA) resume();
      else {
        to.addEventListener("loadedmetadata", resume, { once: true });
        to.load();
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  // The button plays whichever player the theme shows. The players get their
  // controls once the film has started, so the poster stays clean.
  const play = () => {
    const shown = [light.current, dark.current].find((v) => v && v.offsetParent !== null);
    void shown?.play();
  };

  return (
    <div className="film-frame">
      {(["light", "dark"] as const).map((theme) => {
        const name = theme === "dark" ? `${BASE}-dark` : BASE;
        return (
          <video
            key={theme}
            ref={theme === "dark" ? dark : light}
            className={`film-video only-${theme}`}
            controls={started}
            preload="none"
            playsInline
            width={1920}
            height={1080}
            poster={`${name}-poster.webp`}
            onPlay={() => setStarted(true)}
            onClick={started ? undefined : play}
          >
            <source src={`${name}.webm`} type="video/webm" />
            <source src={`${name}.mp4`} type="video/mp4" />
            <track kind="captions" src={`${BASE}.en.vtt`} srcLang="en" label="English" default />
          </video>
        );
      })}
      {!started && (
        <button type="button" className="film-play" onClick={play}>
          <span className="film-play-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
            </svg>
          </span>
          Watch the film
          <span className="film-play-time">2:38</span>
        </button>
      )}
    </div>
  );
}
