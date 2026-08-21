"use client";

import { useEffect, useRef } from "react";

/*
 * The backdrop acts out what the product does. A field of faint glyphs
 * covers the page: some readable, like stray characters from filenames and
 * logins, most already reduced to hex bytes. Every few seconds a wave
 * spreads out from the hero, where the silo sits, and whatever readable
 * fragment it touches flickers and settles as ciphertext.
 *
 * It is scenery, not content, so everything stays close to the background
 * colour, each cell sits at its own depth, and the canvas is blurred and
 * masked from CSS. With reduced motion the field renders once and holds
 * still.
 */

const PLAIN_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789.@_-:/";
const HEX_CHARS = "0123456789abcdef";

const CELL_X = 44;
const CELL_Y = 34;
const FPS = 30;
const WAVE_SPEED = 260; // px per second
const WAVE_BAND = 80; // width of the shimmer around the front
const WAVE_REST_MIN = 5000; // ms between waves
const WAVE_REST_MAX = 9000;
const REVERT_TAU_S = 60; // average seconds before a cell turns readable again

type Cell = {
  x: number;
  y: number;
  ch: string;
  depth: number; // 0.55 to 1.25, scales the cell's alpha
  phase: number; // offset for the slow twinkle
  cipher: boolean;
  scramble: number; // ms of flicker left before the cell settles as hex
  glow: number; // 1 right after encrypting, decays to 0
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = (s: string) => s[(Math.random() * s.length) | 0];
const hexByte = () => pick(HEX_CHARS) + pick(HEX_CHARS);

export function CipherField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let cells: Cell[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let elapsed = 0;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = '11px ui-monospace, "Cascadia Mono", Consolas, monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      cells = [];
      for (let y = CELL_Y / 2; y < h + CELL_Y / 2; y += CELL_Y) {
        for (let x = CELL_X / 2; x < w + CELL_X / 2; x += CELL_X) {
          const cipher = Math.random() < 0.72;
          cells.push({
            x: x + rand(-5, 5),
            y: y + rand(-4, 4),
            ch: cipher ? hexByte() : pick(PLAIN_CHARS),
            depth: rand(0.55, 1.25),
            phase: rand(0, Math.PI * 2),
            cipher,
            scramble: 0,
            glow: 0,
          });
        }
      }
    };

    /* The wave starts around the hero, so encryption visibly radiates from
       the silo rather than washing in from nowhere. */
    let waveX = 0;
    let waveY = 0;
    let waveR = 0;
    let waveMax = 0;
    let waveRest = 900;

    const startWave = () => {
      waveX = w * rand(0.35, 0.65);
      waveY = h * rand(0.18, 0.4);
      waveR = 0;
      waveMax =
        Math.hypot(Math.max(waveX, w - waveX), Math.max(waveY, h - waveY)) +
        WAVE_BAND;
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (const c of cells) {
        const a = (c.cipher ? 0.12 : 0.1) * c.depth;
        ctx.fillStyle = c.cipher
          ? `rgba(167, 139, 250, ${a.toFixed(3)})`
          : `rgba(154, 165, 196, ${a.toFixed(3)})`;
        ctx.fillText(c.ch, c.x, c.y);
      }
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      elapsed += dt;

      const waving = waveR < waveMax;
      if (waving) {
        waveR += WAVE_SPEED * dt;
      } else {
        waveRest -= dt * 1000;
        if (waveRest <= 0) {
          startWave();
          waveRest = rand(WAVE_REST_MIN, WAVE_REST_MAX);
        }
      }

      /* Cells drift back to plaintext one by one, standing in for new data
         arriving, so the next wave always has something left to seal. */
      const revertP = 1 - Math.exp(-dt / REVERT_TAU_S);

      for (const c of cells) {
        let front = 0;
        if (waving) {
          const d = Math.hypot(c.x - waveX, c.y - waveY);
          front = 1 - Math.abs(d - waveR) / WAVE_BAND;
          if (front < 0) front = 0;
          if (!c.cipher && c.scramble === 0 && d < waveR) {
            c.scramble = rand(140, 380);
          }
        }

        if (c.scramble > 0) {
          c.scramble -= dt * 1000;
          c.ch = hexByte();
          if (c.scramble <= 0) {
            c.scramble = 0;
            c.cipher = true;
            c.glow = 1;
          }
        } else if (c.cipher) {
          if (c.glow > 0.004) {
            c.glow *= Math.exp(-dt * 2.1);
          } else {
            c.glow = 0;
            if (Math.random() < revertP) {
              c.cipher = false;
              c.ch = pick(PLAIN_CHARS);
            }
          }
        }

        /* A slow per-cell breathing keeps the field alive between waves
           without any element moving. */
        const twinkle = 0.85 + 0.15 * Math.sin(elapsed * 0.7 + c.phase);

        if (c.scramble > 0) {
          const a = 0.38 * c.depth;
          ctx.fillStyle = `rgba(52, 211, 153, ${a.toFixed(3)})`;
        } else if (c.cipher) {
          const t = c.glow;
          const r = Math.round(167 - 115 * t);
          const g = Math.round(139 + 72 * t);
          const b = Math.round(250 - 97 * t);
          const a = (0.12 * twinkle + 0.26 * t + 0.12 * front) * c.depth;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
        } else {
          const a = (0.1 * twinkle + 0.14 * front) * c.depth;
          ctx.fillStyle = `rgba(154, 165, 196, ${a.toFixed(3)})`;
        }
        ctx.fillText(c.ch, c.x, c.y);
      }
    };

    let last = 0;
    let acc = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      acc += dt;
      if (acc < 1 / FPS) return;
      draw(acc);
      acc = 0;
    };

    const start = () => {
      cancelAnimationFrame(raf);
      /* Nothing to lay out yet. The observer below calls again once the
         canvas has a size, so there is no need to poll for one. */
      if (!canvas.clientWidth || !canvas.clientHeight) return;
      build();
      if (reduced.matches) {
        drawStatic();
        return;
      }
      waveR = 0;
      waveMax = 0;
      waveRest = 900;
      elapsed = 0;
      last = performance.now();
      acc = 0;
      raf = requestAnimationFrame(frame);
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(start, 150);
    };

    /* The canvas can be laid out at zero while the tab is still hidden, and
       a hidden tab gets no animation frames, so a rebuild driven from the
       frame loop would never arrive. This is the signal that does. */
    const sizer = new ResizeObserver(() => {
      if (canvas.clientWidth !== w || canvas.clientHeight !== h) onResize();
    });
    sizer.observe(canvas);

    start();
    window.addEventListener("resize", onResize);
    reduced.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      reduced.removeEventListener("change", start);
      sizer.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="cipher-field" aria-hidden />;
}
