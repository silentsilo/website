/**
 * The whole product on one picture: devices around the storage the user owns,
 * nothing of ours in between, and a change going round them: made on one
 * device, sealed there, stored, and pulled by the others. Drawn inline rather than shipped as an image, so
 * the text stays sharp, reads to a screen reader and changes with a release.
 *
 * Windows, macOS, Linux and Android are live. The other platforms are drawn, dimmed and
 * labelled for what they are, so the picture does not promise more than the download does.
 * Two layouts, because one drawing scaled to a phone turns its labels to dust.
 */

type Platform = {
  name: string;
  state: string;
  /** The state on the narrow cards of the tall drawing. */
  short?: string;
  unlock: string;
  live: boolean;
  kind: "desktop" | "phone";
};

const WINDOWS: Platform = {
  name: "Windows",
  state: "Available now",
  unlock: "Windows Hello · security key",
  live: true,
  kind: "desktop",
};
const MACOS: Platform = {
  name: "macOS",
  state: "Available now",
  unlock: "Touch ID · security key",
  live: true,
  kind: "desktop",
};
const LINUX: Platform = {
  name: "Linux",
  state: "Available now",
  unlock: "Security key",
  live: true,
  kind: "desktop",
};
const ANDROID: Platform = {
  name: "Android",
  state: "Available now",
  unlock: "Fingerprint · security key",
  live: true,
  kind: "phone",
};
const IOS: Platform = {
  name: "iOS",
  state: "Planned",
  unlock: "Face ID · security key",
  live: false,
  kind: "phone",
};

/** The storage kinds, grouped as the app's own picker groups them. */
const STORE_GROUPS: [string, string[]][] = [
  ["An account you have", ["OneDrive", "Google Drive", "Dropbox", "kDrive"]],
  ["Storage you run or rent", ["S3 bucket", "WebDAV", "SFTP server", "Folder or USB"]],
];

/** One loop of the drawing, and when each thing in it happens, as fractions
 *  of the loop. Two changes per loop, as a real silo sees them: one made on
 *  the phone, one on a computer. Each is sealed where it was made, written to
 *  storage as a new object, then pulled by every other device. */
const CYCLE = "14s";
type Act = {
  /** The change shows on its device, in the clear. */
  edit: number;
  /** It is sealed there: the text scrambles into an object name. */
  seal: number;
  /** Carried up to storage. */
  up: [number, number];
  /** Pulled down by every other device. */
  down: [number, number];
};
const ACTS: Record<"phone" | "desk", Act> = {
  phone: { edit: 0.02, seal: 0.1, up: [0.15, 0.23], down: [0.27, 0.36] },
  desk: { edit: 0.52, seal: 0.6, up: [0.65, 0.73], down: [0.77, 0.86] },
};

/** SMIL values and keyTimes from (time, value) points, held at the first
 *  value before them and at the last after them. */
function track(points: [number, number | string][]) {
  const pts = points.map(([t, v]): [number, number | string] => [Math.min(t, 1), v]);
  if (pts[0][0] > 0) pts.unshift([0, pts[0][1]]);
  if (pts[pts.length - 1][0] < 1) pts.push([1, pts[pts.length - 1][1]]);
  return {
    values: pts.map((pt) => pt[1]).join(";"),
    keyTimes: pts.map((pt) => +pt[0].toFixed(4)).join(";"),
  };
}

function Fade({
  points,
  discrete = false,
}: {
  points: [number, number][];
  discrete?: boolean;
}) {
  const t = track(points);
  return (
    <animate
      attributeName="opacity"
      dur={CYCLE}
      repeatCount="indefinite"
      calcMode={discrete ? "discrete" : "linear"}
      values={t.values}
      keyTimes={t.keyTimes}
    />
  );
}

/** Shown from `a` to `b`, with a short fade at both ends. */
const shown = (a: number, b: number, fade = 0.012): [number, number][] => [
  [a, 0],
  [a + fade, 1],
  [b, 1],
  [b + fade, 0],
];

/** What a provider's listing looks like: names that say nothing, sealed bytes. */
const OBJECTS = [
  ["ops/", "9f3c…e1a7", "4 KB"],
  ["blobs/", "2b71…07dd", "38 MB"],
  ["blobs/", "c45e…9a02", "1.2 MB"],
];

/** The object each change lands as, named as its sealed note ends. */
const LANDS = {
  phone: ["ops/", "7a1d…c3f0", "4 KB"],
  desk: ["blobs/", "e08b…41f6", "2.4 MB"],
};

function DeviceIcon({
  kind,
  x,
  y,
}: {
  kind: Platform["kind"];
  x: number;
  y: number;
}) {
  return kind === "desktop" ? (
    <g transform={`translate(${x} ${y})`} className="how-glyph">
      <rect x="0" y="0" width="42" height="28" rx="4" />
      <path d="M15 35h12M21 28v7" />
      <path className="how-glyph-fine" d="M5 6h14M5 11h22" />
    </g>
  ) : (
    <g transform={`translate(${x + 9} ${y - 4})`} className="how-glyph">
      <rect x="0" y="0" width="24" height="40" rx="5.5" />
      <path d="M9 35h6" />
      <path className="how-glyph-fine" d="M5 8h10M5 13h14" />
    </g>
  );
}

function KeyGlyph({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} className="how-glyph how-glyph-key">
      <circle cx="4" cy="4" r="3.6" />
      <path d="M7.4 4H15M12 4v3M14.6 4v2.4" />
    </g>
  );
}

function Device({
  p,
  x,
  y,
  w,
  h,
}: {
  p: Platform;
  x: number;
  y: number;
  w: number;
  h: number;
}) {
  return (
    <g className={p.live ? "how-device is-live" : "how-device is-planned"}>
      <rect className="how-card" x={x} y={y} width={w} height={h} rx="20" />
      <DeviceIcon kind={p.kind} x={x + 22} y={y + 26} />
      <text className="how-name" x={x + 82} y={y + 40}>
        {p.name}
      </text>
      {p.live && (
        <circle className="how-live-dot" cx={x + 86} cy={y + 58} r="3.5" />
      )}
      <text className="how-state" x={x + (p.live ? 96 : 82)} y={y + 62}>
        {p.state}
      </text>
      <line
        className="how-card-rule"
        x1={x + 18}
        y1={y + h - 38}
        x2={x + w - 18}
        y2={y + h - 38}
      />
      <KeyGlyph x={x + 22} y={y + h - 23} />
      <text className="how-unlock" x={x + 46} y={y + h - 15}>
        {p.unlock}
      </text>
    </g>
  );
}

function Objects({
  rows,
  x,
  y,
  w,
}: {
  rows: string[][];
  x: number;
  y: number;
  w: number;
}) {
  return (
    <>
      {rows.map(([dir, name, size], i) => (
        <g key={name} className="how-object">
          <text x={x + 34} y={y + 24 + i * 24}>
            <tspan className="how-object-dir">{dir}</tspan>
            <tspan>{name}</tspan>
          </text>
          <text
            className="how-object-size"
            x={x + w - 34}
            y={y + 24 + i * 24}
            textAnchor="end"
          >
            {size}
          </text>
        </g>
      ))}
    </>
  );
}

/** The height of the storage card, which everything below it hangs from. */
const HUB_H = 442;

function Hub({ id, x, y, w }: { id: string; x: number; y: number; w: number }) {
  const cx = x + w / 2;
  const chipW = (w - 52) / 2;
  const listY = y + 338;
  return (
    <g className="how-hub">
      <rect
        className="how-hub-glow"
        x={x - 22}
        y={y - 22}
        width={w + 44}
        height={HUB_H + 44}
        rx="46"
      />
      <rect className="how-hub-box" x={x} y={y} width={w} height={HUB_H} rx="28" />
      <g
        className="how-glyph how-glyph-hub"
        transform={`translate(${cx - 19} ${y + 22})`}
      >
        <ellipse cx="19" cy="5.5" rx="19" ry="5.5" />
        <path d="M0 5.5v24c0 3 8.5 5.5 19 5.5s19-2.5 19-5.5v-24" />
        <path d="M0 17.5c0 3 8.5 5.5 19 5.5s19-2.5 19-5.5" />
      </g>
      <text className="how-hub-title" x={cx} y={y + 90} textAnchor="middle">
        Your storage
      </text>
      <text className="how-hub-sub" x={cx} y={y + 111} textAnchor="middle">
        Your account, your bill, your choice
      </text>
      {STORE_GROUPS.map(([tag, stores], g) => {
        const groupY = y + 142 + g * 98;
        return (
          <g key={tag}>
            <text className="how-store-tag" x={cx} y={groupY} textAnchor="middle">
              {tag}
            </text>
            {stores.map((label, i) => {
              const chipX = x + 20 + (i % 2) * (chipW + 12);
              const chipY = groupY + 10 + Math.floor(i / 2) * 36;
              return (
                <g key={label}>
                  <rect
                    className="how-chip"
                    x={chipX}
                    y={chipY}
                    width={chipW}
                    height={28}
                    rx="14"
                  />
                  <text
                    className="how-chip-text"
                    x={chipX + chipW / 2}
                    y={chipY + 18.5}
                    textAnchor="middle"
                  >
                    {label}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
      <rect
        className="how-hub-pulse"
        x={x}
        y={y}
        width={w}
        height={HUB_H}
        rx="28"
        opacity="0"
      >
        <Fade
          points={[
            ...shown(ACTS.phone.up[1], ACTS.phone.up[1] + 0.06, 0.01),
            ...shown(ACTS.desk.up[1], ACTS.desk.up[1] + 0.06, 0.01),
          ]}
        />
      </rect>
      <rect
        className="how-listing"
        x={x + 20}
        y={listY}
        width={w - 40}
        height={88}
        rx="12"
      />
      <clipPath id={`${id}-list`}>
        <rect x={x + 20} y={listY + 6} width={w - 40} height={78} />
      </clipPath>
      <g clipPath={`url(#${id}-list)`}>
        {/* The row a change lands as, lit while it is new. */}
        <rect
          className="how-landed"
          x={x + 26}
          y={listY + 7}
          width={w - 52}
          height={24}
          rx="7"
          opacity="0"
        >
          <Fade
            points={[
              ...shown(ACTS.phone.up[1] + 0.02, ACTS.phone.up[1] + 0.15),
              ...shown(ACTS.desk.up[1] + 0.02, ACTS.desk.up[1] + 0.15),
            ]}
          />
        </rect>
        {/* Each new object pushes the listing down a row. With motion off
            the listing stands still. */}
        <g className="how-rows-live">
          <animateTransform
            attributeName="transform"
            type="translate"
            dur={CYCLE}
            repeatCount="indefinite"
            {...track([
              [0, "0 -48"],
              [ACTS.phone.up[1], "0 -48"],
              [ACTS.phone.up[1] + 0.025, "0 -24"],
              [ACTS.desk.up[1], "0 -24"],
              [ACTS.desk.up[1] + 0.025, "0 0"],
            ])}
          />
          <Fade points={[[0, 0], [0.02, 1], [0.96, 1], [0.99, 0]]} />
          <Objects rows={[LANDS.desk, LANDS.phone, ...OBJECTS]} x={x} y={listY} w={w} />
        </g>
        <g className="how-rows-static">
          <Objects rows={OBJECTS} x={x} y={listY} w={w} />
        </g>
      </g>
    </g>
  );
}

/** A sealed change carried along a link between `span[0]` and `span[1]`,
 *  easing out of one end and into the other. */
function Packet({ path, span: [a, b] }: { path: string; span: [number, number] }) {
  return (
    <g className="how-packet" opacity="0">
      <rect x="-15" y="-9" width="30" height="18" rx="9" />
      <rect className="how-packet-lock" x="-4" y="-1.5" width="8" height="6" rx="1.4" />
      <path className="how-packet-lock" d="M-2.4 -1.5v-2a2.4 2.4 0 0 1 4.8 0v2" />
      <animateMotion
        dur={CYCLE}
        repeatCount="indefinite"
        path={path}
        calcMode="spline"
        keyPoints="0;0;1;1"
        keyTimes={`0;${a};${b};1`}
        keySplines="0 0 1 1;0.55 0 0.25 1;0 0 1 1"
      />
      <Fade points={[[a, 0], [a + 0.006, 1], [b - 0.006, 1], [b, 0]]} />
    </g>
  );
}

type Box = { x: number; y: number; w: number; h: number; rx: number };

/** A card's outline lighting up: in the accent where a change is made, in
 *  green where one arrives. */
function Ring({
  box,
  points,
  origin = false,
}: {
  box: Box;
  points: [number, number][];
  origin?: boolean;
}) {
  return (
    <rect
      className={origin ? "how-origin" : "how-arrive"}
      x={box.x}
      y={box.y}
      width={box.w}
      height={box.h}
      rx={box.rx}
      opacity="0"
    >
      <Fade points={points} />
    </rect>
  );
}

const arrived = (at: number): [number, number][] => [
  [at, 0],
  [at + 0.01, 1],
  [at + 0.12, 0],
];

/** "Synced", on the top edge of a card a change has just reached. */
function Synced({ box, at }: { box: Box; at: number }) {
  const x = box.x + box.w - 96;
  const y = box.y - 11;
  return (
    <g className="how-synced" opacity="0">
      <rect x={x} y={y} width="74" height="22" rx="11" />
      <path d={`M${x + 11} ${y + 11.5}l3 3 6-6.5`} />
      <text x={x + 26} y={y + 15.5}>
        Synced
      </text>
      <Fade points={shown(at, at + 0.1)} />
    </g>
  );
}

/** The change itself, beside the device that made it: in the clear while it
 *  is made, scrambled as it is sealed, then only an object name. */
function Note({
  x,
  y,
  w,
  act,
  plain,
  scrambled,
  sealed,
}: {
  x: number;
  y: number;
  w: number;
  act: Act;
  plain: string;
  scrambled: [string, string];
  sealed: string;
}) {
  const s1 = act.seal + 0.014;
  const s2 = act.seal + 0.028;
  return (
    <g className="how-note" opacity="0">
      <Fade points={shown(act.edit, act.up[0] + 0.02, 0.015)} />
      <animateTransform
        attributeName="transform"
        type="translate"
        dur={CYCLE}
        repeatCount="indefinite"
        {...track([
          [act.edit, "0 8"],
          [act.edit + 0.02, "0 0"],
        ])}
      />
      <rect className="how-note-box" x={x} y={y} width={w} height={32} rx={16} />
      <g>
        <Fade discrete points={[[0, 1], [act.seal, 0]]} />
        <g className="how-note-icon" transform={`translate(${x + 14} ${y + 9})`}>
          <path d="M2 12l1-4 8-8 3 3-8 8z" />
          <path d="M9 2l3 3" />
        </g>
        <text className="how-note-plain" x={x + 36} y={y + 21}>
          {plain}
        </text>
      </g>
      {scrambled.map((text, i) => (
        <text key={text} className="how-note-scramble" x={x + 36} y={y + 21} opacity="0">
          <Fade
            discrete
            points={[
              [0, 0],
              [i === 0 ? act.seal : s1, 1],
              [i === 0 ? s1 : s2, 0],
            ]}
          />
          {text}
        </text>
      ))}
      <g opacity="0">
        <Fade discrete points={[[0, 0], [s2, 1]]} />
        <g className="how-note-lock" transform={`translate(${x + 15} ${y + 8})`}>
          <rect x="0" y="6" width="12" height="9" rx="2" />
          <path d="M2.5 6V4a3.5 3.5 0 0 1 7 0v2" />
        </g>
        <text className="how-note-sealed" x={x + 36} y={y + 21}>
          {sealed}
        </text>
      </g>
    </g>
  );
}

/** Says in words what the moving parts show, and stays when motion is off. */
function FlowCaption({ cx, y }: { cx: number; y: number }) {
  return (
    <text className="how-flow" x={cx} y={y} textAnchor="middle">
      <tspan x={cx}>A change made on one device is sealed there,</tspan>
      <tspan x={cx} dy="22">
        stored, and pulled by every other one.
      </tspan>
    </text>
  );
}

/* Stacked in the tall drawing: at the size a phone needs, one of these
   lines is wider than the 400 units the drawing has. */
function Sees({
  x,
  y,
  anchor = "start",
  stack = false,
}: {
  x: number;
  y: number;
  anchor?: "start" | "middle";
  stack?: boolean;
}) {
  if (stack) {
    return (
      <g className="how-sees">
        <text className="how-sees-label" x={x} y={y} textAnchor={anchor}>
          Storage sees
        </text>
        <text x={x} y={y + 21} textAnchor={anchor}>
          sizes, times, key labels, content hashes
        </text>
        <text className="how-never-label" x={x} y={y + 50} textAnchor={anchor}>
          Cannot read
        </text>
        <text x={x} y={y + 71} textAnchor={anchor}>
          file names, contents, passwords
        </text>
      </g>
    );
  }
  return (
    <g className="how-sees">
      <text x={x} y={y} textAnchor={anchor}>
        <tspan className="how-sees-label">Storage sees </tspan>
        <tspan>sizes, times, key labels, content hashes</tspan>
      </text>
      <text x={x} y={y + 22} textAnchor={anchor}>
        <tspan className="how-never-label">Cannot read </tspan>
        <tspan>file names, contents, passwords</tspan>
      </text>
    </g>
  );
}

function Keys({ x, y }: { x: number; y: number }) {
  return (
    <g className="how-keys" transform={`translate(${x} ${y})`}>
      <g className="how-glyph how-glyph-key">
        <rect x="0" y="4" width="30" height="16" rx="5" />
        <circle cx="23" cy="12" r="3" />
        <path d="M30 10h5v4h-5" />
      </g>
      <text x="46" y="17">
        Security key
      </text>
      <g className="how-glyph how-glyph-paper" transform="translate(152 0)">
        <path d="M0 0h18l6 6v18H0z" />
        <path d="M18 0v6h6M5 12h14M5 17h10" />
      </g>
      <text x="186" y="17">
        Recovery code on paper
      </text>
    </g>
  );
}

function Defs({
  id,
  from,
  to,
  from2,
  to2,
}: {
  id: string;
  from: [number, number];
  to: [number, number];
  /** The Android link, which runs elsewhere and needs a gradient of its own. */
  from2: [number, number];
  to2: [number, number];
}) {
  return (
    <defs>
      {/* Colours from the theme: a stop's colour takes a custom property only
          through style, not through the attribute. */}
      <linearGradient id={`${id}-hub`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" style={{ stopColor: "var(--how-hub-1)" }} />
        <stop offset="0.55" style={{ stopColor: "var(--how-hub-2)" }} />
        <stop offset="1" style={{ stopColor: "var(--how-hub-3)" }} />
      </linearGradient>
      {/* In user space: a straight line has an empty bounding box, and a
          bounding-box gradient on it draws nothing at all. */}
      <linearGradient
        id={`${id}-link`}
        gradientUnits="userSpaceOnUse"
        x1={from[0]}
        y1={from[1]}
        x2={to[0]}
        y2={to[1]}
      >
        <stop offset="0" style={{ stopColor: "var(--how-link-1)" }} />
        <stop offset="1" style={{ stopColor: "var(--how-link-2)" }} />
      </linearGradient>
      <linearGradient
        id={`${id}-link2`}
        gradientUnits="userSpaceOnUse"
        x1={from2[0]}
        y1={from2[1]}
        x2={to2[0]}
        y2={to2[1]}
      >
        <stop offset="0" style={{ stopColor: "var(--how-link-1)" }} />
        <stop offset="1" style={{ stopColor: "var(--how-link-2)" }} />
      </linearGradient>
      <radialGradient id={`${id}-halo`}>
        <stop offset="0" style={{ stopColor: "var(--how-halo)" }} />
        <stop offset="1" style={{ stopColor: "var(--how-halo)", stopOpacity: 0 }} />
      </radialGradient>
    </defs>
  );
}

/** The browser extension: it talks to the desktop app on the same computer,
 *  never to the storage, and fills passwords only. Dimmed where it has not
 *  shipped. */
function Extension({
  x,
  y,
  w,
  state,
  browsers = "Chrome · Edge · Brave · Firefox",
  live = false,
}: {
  x: number;
  y: number;
  w: number;
  state: string;
  browsers?: string;
  live?: boolean;
}) {
  return (
    <g className={`how-device how-extension ${live ? "is-live" : "is-planned"}`}>
      <rect className="how-card" x={x} y={y} width={w} height={92} rx="18" />
      <g transform={`translate(${x + 22} ${y + 18})`} className="how-glyph">
        <rect x="0" y="0" width="34" height="26" rx="4" />
        <path d="M0 8h34M5 4h4M11 4h4" />
      </g>
      <text className="how-name how-name-sm" x={x + 70} y={y + 30}>
        Browser extension
      </text>
      {live && <circle className="how-live-dot" cx={x + 74} cy={y + 45} r="3.5" />}
      <text className="how-state" x={x + (live ? 84 : 70)} y={y + 49}>
        {state}
      </text>
      <text className="how-unlock" x={x + 22} y={y + 76}>
        {browsers}
      </text>
    </g>
  );
}

/** The browsers the extension installs in. */
const LIVE_BROWSERS = "Chrome, Edge, Brave, Firefox";

const DESC =
  "Each device encrypts on its own and writes to storage you choose: your OneDrive, Google Drive or Dropbox, an S3 " +
  "bucket, WebDAV, an SFTP server or a folder. The storage holds only encrypted objects; it sees sizes, times, key labels, content hashes and the silo folder's name, but cannot read your file names, contents " +
  "or passwords. A change made on one device is sealed there, stored, and pulled by every other device; there is no " +
  "SilentSilo server in between. You unlock with a security key or the device's biometrics, and a " +
  "recovery code on paper is the fallback. Windows, macOS, Linux and Android are available now, and iOS is planned. " +
  "The browser extension for Chrome, Edge, Brave and Firefox works with the desktop app on Windows, Linux and macOS: it fills passwords through the desktop app, never from storage.";

function Wide() {
  // Symmetric round the storage: the computers in a row above it, the
  // phones on either side, the extension over the computer row only. Each
  // live link both ways: into the storage, and back out of it.
  const deskUp = "M290 308 C 290 334, 450 326, 450 350";
  const toDesk = "M450 350 C 450 326, 290 334, 290 308";
  const phoneUp = "M300 571 C 345 571, 345 571, 390 571";
  const toPhone = "M390 571 C 345 571, 345 571, 300 571";
  const toLinux = "M560 350 V 308";
  const macUp = "M830 308 C 830 334, 670 326, 670 350";
  const toMac = "M670 350 C 670 326, 830 334, 830 308";
  const win: Box = { x: 165, y: 196, w: 250, h: 112, rx: 20 };
  const linux: Box = { x: 435, y: 196, w: 250, h: 112, rx: 20 };
  const mac: Box = { x: 705, y: 196, w: 250, h: 112, rx: 20 };
  const phone: Box = { x: 50, y: 507, w: 250, h: 128, rx: 20 };
  const { phone: first, desk: second } = ACTS;
  return (
    <svg
      className="how-svg how-wide"
      viewBox="0 0 1120 920"
      role="img"
      aria-labelledby="how-title-w how-desc-w"
    >
      <title id="how-title-w">How SilentSilo works</title>
      <desc id="how-desc-w">{DESC}</desc>
      <Defs id="w" from={[290, 308]} to={[450, 350]} from2={[300, 571]} to2={[390, 571]} />
      <style>{`.how-wide .how-hub-box{fill:url(#w-hub)} .how-wide .how-link.is-live{stroke:url(#w-link)} .how-wide .how-link.is-live.how-link-2{stroke:url(#w-link2)} .how-wide .how-halo{fill:url(#w-halo)}`}</style>

      <ellipse className="how-halo" cx="560" cy="571" rx="430" ry="280" />
      <ellipse className="how-orbit" cx="560" cy="571" rx="465" ry="240" />
      <ellipse
        className="how-orbit how-orbit-inner"
        cx="560"
        cy="571"
        rx="310"
        ry="190"
      />

      <FlowCaption cx={560} y={26} />

      {/* The extension over the computer row: live to every computer,
          never to a phone. */}
      <path className="how-link is-live" d="M560 162 V 180 H 290 V 196" />
      <path className="how-link is-live" d="M560 180 H 830 V 196" />
      <path className="how-link is-live" d="M560 180 V 196" />
      <Extension x={435} y={70} w={250} state="With the desktop app" browsers={LIVE_BROWSERS} live />

      <path className="how-link is-live" d={deskUp} />
      <path className="how-link is-live how-link-2" d={phoneUp} />
      <path className="how-link is-live" d="M560 308 V 350" />
      <path className="how-link is-live" d={macUp} />
      <path className="how-link is-planned" d="M820 571 H 730" />

      <Hub id="w" x={390} y={350} w={340} />

      <Device p={WINDOWS} x={165} y={196} w={250} h={112} />
      <Device p={LINUX} x={435} y={196} w={250} h={112} />
      <Device p={MACOS} x={705} y={196} w={250} h={112} />
      <Device p={ANDROID} x={50} y={507} w={250} h={128} />
      <Device p={IOS} x={820} y={507} w={250} h={128} />

      {/* A password changed on the phone, pulled by the three computers. */}
      <Ring box={phone} points={shown(first.edit, first.up[0])} origin />
      <Packet path={phoneUp} span={first.up} />
      <Packet path={toDesk} span={first.down} />
      <Packet path={toLinux} span={first.down} />
      <Packet path={toMac} span={first.down} />
      {[win, linux, mac].map((box) => (
        <g key={box.x}>
          <Ring box={box} points={arrived(first.down[1])} />
          <Synced box={box} at={first.down[1]} />
        </g>
      ))}

      {/* A file added on the Mac, pulled by the other computers and the phone. */}
      <Ring box={mac} points={shown(second.edit, second.up[0])} origin />
      <Packet path={macUp} span={second.up} />
      <Packet path={toDesk} span={second.down} />
      <Packet path={toLinux} span={second.down} />
      <Packet path={toPhone} span={second.down} />
      {[win, linux, phone].map((box) => (
        <g key={box.x}>
          <Ring box={box} points={arrived(second.down[1])} />
          <Synced box={box} at={second.down[1]} />
        </g>
      ))}

      <Note
        x={60}
        y={646}
        w={214}
        act={first}
        plain="Bank: password changed"
        scrambled={["B#nk: p@5sw%rd ch4ng*d", "7a#1: d9@c%w3f0 c4*g"]}
        sealed="sealed · 7a1d…c3f0"
      />
      <Note
        x={846}
        y={318}
        w={214}
        act={second}
        plain="Passport.pdf added"
        scrambled={["P@ssp#rt.p%f a6d*d", "e0#b4…1f@6 a%8*d"]}
        sealed="sealed · e08b…41f6"
      />

      <Sees x={560} y={840} anchor="middle" />
      <Keys x={392} y={888} />
    </svg>
  );
}

function Tall() {
  // In the group below: the computer above the storage, the phone under it.
  const deskUp = "M200 150 V 222";
  const toDesk = "M200 222 V 150";
  const top = 222 + HUB_H;
  const cards = top + 72;
  // The row under it: computers first, then phones; Android is the live one.
  const phoneUp = `M249 ${cards} C 249 ${cards - 32}, 235 ${cards - 32}, 235 ${top}`;
  const toPhone = `M235 ${top} C 235 ${cards - 32}, 249 ${cards - 32}, 249 ${cards}`;
  const toLinux = `M90 ${top} C 90 ${cards - 32}, 52 ${cards - 32}, 52 ${cards}`;
  const toMac = `M165 ${top} C 165 ${cards - 32}, 151 ${cards - 32}, 151 ${cards}`;
  const win: Box = { x: 70, y: 22, w: 260, h: 128, rx: 20 };
  const small = (cx: number): Box => ({ x: cx - 46, y: cards, w: 92, h: 104, rx: 18 });
  const { phone: first, desk: second } = ACTS;
  return (
    <svg
      className="how-svg how-tall"
      viewBox={`0 0 400 ${174 + cards + 290}`}
      role="img"
      aria-labelledby="how-title-t how-desc-t"
    >
      <title id="how-title-t">How SilentSilo works</title>
      <desc id="how-desc-t">{DESC}</desc>
      <Defs id="t" from={[200, 150]} to={[200, 222]} from2={[249, cards]} to2={[235, top]} />
      <style>{`.how-tall .how-hub-box{fill:url(#t-hub)} .how-tall .how-link.is-live{stroke:url(#t-link)} .how-tall .how-link.is-live.how-link-2{stroke:url(#t-link2)} .how-tall .how-halo{fill:url(#t-halo)}`}</style>

      <FlowCaption cx={200} y={18} />
      <Extension x={70} y={62} w={260} state="With the desktop app" browsers={LIVE_BROWSERS} live />
      <path className="how-link is-live" d="M200 154 V 196" />
      <g transform="translate(0 174)">
        {/* Inside the viewBox: the drawing runs to the edge of a phone
            screen, and the halo has nowhere to bleed into. */}
        <ellipse className="how-halo" cx="200" cy="420" rx="196" ry="330" />

        <Device p={WINDOWS} x={70} y={22} w={260} h={128} />
        <path className="how-link is-live" d={deskUp} />
        <text className="how-caption how-caption-live" x={222} y={190}>
          encrypted
        </text>

        <Hub id="t" x={40} y={222} w={320} />

        <path className="how-link is-live how-link-2" d={phoneUp} />
        <path className="how-link is-live" d={toLinux} />
        <path className="how-link is-live" d={toMac} />
        <path className="how-link is-planned" d={`M310 ${top} C 310 ${cards - 32}, 348 ${cards - 32}, 348 ${cards}`} />

        <g>
          {[
            { p: LINUX, cx: 52 },
            { p: MACOS, cx: 151 },
            { p: ANDROID, cx: 249 },
            { p: IOS, cx: 348 },
          ].map(({ p, cx }) => (
            <g
              key={p.name}
              className={p.live ? "how-device is-live" : "how-device is-planned"}
            >
              <rect
                className="how-card"
                x={cx - 46}
                y={cards}
                width="92"
                height="104"
                rx="18"
              />
              <DeviceIcon kind={p.kind} x={cx - 21} y={cards + 18} />
              <text
                className="how-name how-name-sm"
                x={cx}
                y={cards + 76}
                textAnchor="middle"
              >
                {p.name}
              </text>
              {/* "Available now" is wider than a 92-unit card. */}
              <text className="how-state" x={cx} y={cards + 93} textAnchor="middle">
                {p.live ? "Available" : (p.short ?? p.state)}
              </text>
            </g>
          ))}
        </g>
        {/* From the phone to the computers, then from Windows to the rest. */}
        <Ring box={small(249)} points={shown(first.edit, first.up[0])} origin />
        <Packet path={phoneUp} span={first.up} />
        <Packet path={toDesk} span={first.down} />
        <Packet path={toLinux} span={first.down} />
        <Packet path={toMac} span={first.down} />
        <Ring box={win} points={arrived(first.down[1])} />
        <Synced box={win} at={first.down[1]} />
        <Ring box={small(52)} points={arrived(first.down[1])} />
        <Ring box={small(151)} points={arrived(first.down[1])} />

        <Ring box={win} points={shown(second.edit, second.up[0])} origin />
        <Packet path={deskUp} span={second.up} />
        <Packet path={toLinux} span={second.down} />
        <Packet path={toMac} span={second.down} />
        <Packet path={toPhone} span={second.down} />
        <Ring box={small(52)} points={arrived(second.down[1])} />
        <Ring box={small(151)} points={arrived(second.down[1])} />
        <Ring box={small(249)} points={arrived(second.down[1])} />

        <Sees x={200} y={cards + 150} anchor="middle" stack />
        <Keys x={30} y={cards + 250} />
      </g>
    </svg>
  );
}

export function HowItWorks() {
  return (
    <div className="how">
      <Wide />
      <Tall />
      <ul className="how-points">
        <li>
          <strong>Your devices</strong>
          <span>
            encrypt everything before it leaves them, and only your keys can
            open it.
          </span>
        </li>
        <li>
          <strong>Your storage</strong>
          <span>
            on an account you own, holding sealed objects it cannot read.
          </span>
        </li>
        <li>
          <strong>Your keys</strong>
          <span>
            a security key or the device&apos;s own biometrics, and a recovery
            code on paper.
          </span>
        </li>
      </ul>
    </div>
  );
}
