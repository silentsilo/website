/**
 * The whole product on one picture: devices around the storage the user owns,
 * nothing of ours in between, and a change going round them: made on one
 * device, sealed there, stored, and pulled by the others. Drawn inline rather than shipped as an image, so
 * the text stays sharp, reads to a screen reader and changes with a release.
 *
 * Windows and Android are live. The other platforms are drawn, dimmed and
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
  state: "Coming soon",
  short: "Soon",
  unlock: "Touch ID · security key",
  live: false,
  kind: "desktop",
};
const LINUX: Platform = {
  name: "Linux",
  state: "Coming soon",
  short: "Soon",
  unlock: "Security key",
  live: false,
  kind: "desktop",
};
const ANDROID: Platform = {
  name: "Android",
  state: "Available now",
  unlock: "Fingerprint · NFC key",
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

/** One trip round the devices, in seconds, and where each leg of it falls,
 *  as fractions of it: up from the phone, down to the computer, then the
 *  other way. */
const CYCLE = "8s";
const LEGS = {
  phoneUp: [0, 0.2],
  toDesk: [0.25, 0.45],
  deskUp: [0.52, 0.72],
  toPhone: [0.77, 0.97],
} as const;
type Leg = keyof typeof LEGS;

/** What a provider's listing looks like: names that say nothing, sealed bytes. */
const OBJECTS = [
  ["ops/", "9f3c…e1a7", "4 KB"],
  ["blobs/", "2b71…07dd", "38 MB"],
  ["blobs/", "c45e…9a02", "1.2 MB"],
];

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

/** The height of the storage card, which everything below it hangs from. */
const HUB_H = 442;

function Hub({ x, y, w }: { x: number; y: number; w: number }) {
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
        className="how-listing"
        x={x + 20}
        y={listY}
        width={w - 40}
        height={88}
        rx="12"
      />
      {/* The row a change lands as: lit when one arrives from either side. */}
      <rect
        className="how-landed"
        x={x + 26}
        y={listY + 7}
        width={w - 52}
        height={24}
        rx="7"
        opacity="0"
      >
        <animate
          attributeName="opacity"
          dur={CYCLE}
          repeatCount="indefinite"
          values="0;0;1;0;0;1;0;0"
          keyTimes={`0;${LEGS.phoneUp[1]};${LEGS.phoneUp[1] + 0.02};${LEGS.toDesk[0] + 0.06};${LEGS.deskUp[1]};${LEGS.deskUp[1] + 0.02};${LEGS.toPhone[0] + 0.06};1`}
        />
      </rect>
      {OBJECTS.map(([dir, name, size], i) => (
        <g key={name} className="how-object">
          <text x={x + 34} y={listY + 24 + i * 24}>
            <tspan className="how-object-dir">{dir}</tspan>
            <tspan>{name}</tspan>
          </text>
          <text
            className="how-object-size"
            x={x + w - 34}
            y={listY + 24 + i * 24}
            textAnchor="end"
          >
            {size}
          </text>
        </g>
      ))}
    </g>
  );
}

/** One sealed change on one leg of the trip: hidden until its leg starts,
 *  carried along the path, gone when it lands. */
function Change({ path, leg }: { path: string; leg: Leg }) {
  const [a, b] = LEGS[leg];
  return (
    <g className="how-packet" opacity="0">
      <rect x="-15" y="-9" width="30" height="18" rx="9" />
      <rect className="how-packet-lock" x="-4" y="-1.5" width="8" height="6" rx="1.4" />
      <path className="how-packet-lock" d="M-2.4 -1.5v-2a2.4 2.4 0 0 1 4.8 0v2" />
      <animateMotion
        dur={CYCLE}
        repeatCount="indefinite"
        path={path}
        calcMode="linear"
        keyPoints={a === 0 ? "0;1;1" : "0;0;1;1"}
        keyTimes={a === 0 ? `0;${b};1` : `0;${a};${b};1`}
      />
      <animate
        attributeName="opacity"
        dur={CYCLE}
        repeatCount="indefinite"
        calcMode="discrete"
        values={a === 0 ? "1;0" : "0;1;0"}
        keyTimes={a === 0 ? `0;${b}` : `0;${a};${b}`}
      />
    </g>
  );
}

/** A device card lighting up as a change reaches it, at the end of `leg`. */
function Arrive({
  x,
  y,
  w,
  h,
  rx,
  leg,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rx: number;
  leg: Leg;
}) {
  const b = LEGS[leg][1];
  return (
    <rect className="how-arrive" x={x} y={y} width={w} height={h} rx={rx} opacity="0">
      <animate
        attributeName="opacity"
        dur={CYCLE}
        repeatCount="indefinite"
        values="0;0;1;0;0"
        keyTimes={`0;${b};${Math.min(b + 0.015, 0.99)};${Math.min(b + 0.12, 0.995)};1`}
      />
    </rect>
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
          Never sees
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
        <tspan className="how-never-label">Never sees </tspan>
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

/** Where the extension can be installed today; the rest follow review. */
const LIVE_BROWSERS = "Chrome, Edge, Brave, Firefox";

const DESC =
  "Each device encrypts on its own and writes to storage you choose: your OneDrive, Google Drive or Dropbox, an S3 " +
  "bucket, WebDAV, an SFTP server or a folder. The storage holds only encrypted objects; it sees sizes, times, key labels, content hashes and the silo folder's name, never your file names, contents " +
  "or passwords. A change made on one device is sealed there, stored, and pulled by every other device; there is no " +
  "SilentSilo server in between. You unlock with a security key or the device's biometrics, and a " +
  "recovery code on paper is the fallback. Windows and Android are available now, Linux and then macOS are coming soon, and iOS is planned. " +
  "The browser extension is available on Windows for Chrome, Edge, Brave and Firefox, and comes with the macOS and Linux apps later: it fills passwords through the desktop app, never from storage.";

function Wide() {
  // Symmetric round the storage: the computers in a row above it, the
  // phones on either side, the extension over the computer row only. Each
  // live link both ways: into the storage, and back out of it.
  const deskUp = "M290 308 C 290 334, 450 326, 450 350";
  const toDesk = "M450 350 C 450 326, 290 334, 290 308";
  const phoneUp = "M300 571 C 345 571, 345 571, 390 571";
  const toPhone = "M390 571 C 345 571, 345 571, 300 571";
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

      {/* The extension over the computer row: live to Windows, coming to
          Linux and macOS, never to a phone. */}
      <path className="how-link is-live" d="M560 162 V 180 H 290 V 196" />
      <path className="how-link is-planned" d="M560 180 H 830 V 196" />
      <path className="how-link is-planned" d="M560 180 V 196" />
      <Extension x={435} y={70} w={250} state="Available on Windows" browsers={LIVE_BROWSERS} live />

      <path className="how-link is-live" d={deskUp} />
      <path className="how-link is-live how-link-2" d={phoneUp} />
      <path className="how-link is-planned" d="M560 308 V 350" />
      <path className="how-link is-planned" d="M830 308 C 830 334, 670 326, 670 350" />
      <path className="how-link is-planned" d="M820 571 H 730" />

      <Hub x={390} y={350} w={340} />

      <Device p={WINDOWS} x={165} y={196} w={250} h={112} />
      <Device p={LINUX} x={435} y={196} w={250} h={112} />
      <Device p={MACOS} x={705} y={196} w={250} h={112} />
      <Device p={ANDROID} x={50} y={507} w={250} h={128} />
      <Device p={IOS} x={820} y={507} w={250} h={128} />
      <Arrive x={165} y={196} w={250} h={112} rx={20} leg="toDesk" />
      <Arrive x={50} y={507} w={250} h={128} rx={20} leg="toPhone" />

      <Change path={phoneUp} leg="phoneUp" />
      <Change path={toDesk} leg="toDesk" />
      <Change path={deskUp} leg="deskUp" />
      <Change path={toPhone} leg="toPhone" />

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
      <Extension x={70} y={62} w={260} state="Available on Windows" browsers={LIVE_BROWSERS} live />
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

        <Hub x={40} y={222} w={320} />

        <path className="how-link is-live how-link-2" d={phoneUp} />
        <path className="how-link is-planned" d={`M90 ${top} C 90 ${cards - 32}, 52 ${cards - 32}, 52 ${cards}`} />
        <path className="how-link is-planned" d={`M165 ${top} C 165 ${cards - 32}, 151 ${cards - 32}, 151 ${cards}`} />
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
        <Arrive x={70} y={22} w={260} h={128} rx={20} leg="toDesk" />
        <Arrive x={203} y={cards} w={92} h={104} rx={18} leg="toPhone" />

        <Change path={phoneUp} leg="phoneUp" />
        <Change path={toDesk} leg="toDesk" />
        <Change path={deskUp} leg="deskUp" />
        <Change path={toPhone} leg="toPhone" />

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
            encrypt everything before it leaves them, and only they can open it.
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
