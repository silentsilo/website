/**
 * The whole product on one picture: devices around the storage the user owns,
 * nothing of ours in between. Drawn inline rather than shipped as an image, so
 * the text stays sharp, reads to a screen reader and changes with a release.
 *
 * Only Windows is live. The other platforms are drawn, dimmed and labelled for
 * what they are, so the picture does not promise more than the download does.
 * Two layouts, because one drawing scaled to a phone turns its labels to dust.
 */

type Platform = {
  name: string;
  state: string;
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
  state: "Planned",
  unlock: "Touch ID · security key",
  live: false,
  kind: "desktop",
};
const ANDROID: Platform = {
  name: "Android",
  state: "Coming soon",
  unlock: "Fingerprint · NFC key",
  live: false,
  kind: "phone",
};
const IOS: Platform = {
  name: "iOS",
  state: "Planned",
  unlock: "Face ID · security key",
  live: false,
  kind: "phone",
};

const STORES = ["S3 bucket", "WebDAV", "SFTP server", "Folder or USB"];

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

/** A sealed packet travelling the live link: what leaves is already encrypted. */
function Packet({
  path,
  dur,
  begin,
}: {
  path: string;
  dur: string;
  begin: string;
}) {
  return (
    <g className="how-packet">
      <rect x="-15" y="-9" width="30" height="18" rx="9" />
      <rect
        className="how-packet-lock"
        x="-4"
        y="-1.5"
        width="8"
        height="6"
        rx="1.4"
      />
      <path
        className="how-packet-lock"
        d="M-2.4 -1.5v-2a2.4 2.4 0 0 1 4.8 0v2"
      />
      <animateMotion
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
        path={path}
        keyPoints="0;1"
        keyTimes="0;1"
      />
    </g>
  );
}

function Hub({ x, y, w }: { x: number; y: number; w: number }) {
  const cx = x + w / 2;
  const chipW = (w - 52) / 2;
  const h = 318;
  return (
    <g className="how-hub">
      <rect
        className="how-hub-glow"
        x={x - 22}
        y={y - 22}
        width={w + 44}
        height={h + 44}
        rx="46"
      />
      <rect className="how-hub-box" x={x} y={y} width={w} height={h} rx="28" />
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
      {STORES.map((label, i) => {
        const chipX = x + 20 + (i % 2) * (chipW + 12);
        const chipY = y + 128 + Math.floor(i / 2) * 38;
        return (
          <g key={label}>
            <rect
              className="how-chip"
              x={chipX}
              y={chipY}
              width={chipW}
              height={29}
              rx="14.5"
            />
            <text
              className="how-chip-text"
              x={chipX + chipW / 2}
              y={chipY + 19}
              textAnchor="middle"
            >
              {label}
            </text>
          </g>
        );
      })}
      <rect
        className="how-listing"
        x={x + 20}
        y={y + 212}
        width={w - 40}
        height={88}
        rx="12"
      />
      {OBJECTS.map(([dir, name, size], i) => (
        <g key={name} className="how-object">
          <text x={x + 34} y={y + 236 + i * 24}>
            <tspan className="how-object-dir">{dir}</tspan>
            <tspan>{name}</tspan>
          </text>
          <text
            className="how-object-size"
            x={x + w - 34}
            y={y + 236 + i * 24}
            textAnchor="end"
          >
            {size}
          </text>
        </g>
      ))}
    </g>
  );
}

function NoServer({ cx, y }: { cx: number; y: number }) {
  return (
    <g className="how-noserver">
      <rect x={cx - 118} y={y} width="236" height="34" rx="17" />
      <g
        transform={`translate(${cx - 94} ${y + 17})`}
        className="how-glyph how-glyph-dim"
      >
        <path d="M-9 4h14a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4-1.5A4 4 0 0 0-9 4z" />
        <path className="how-strike" d="M-11 8 9 -9" />
      </g>
      <text x={cx + 12} y={y + 21.5} textAnchor="middle">
        No SilentSilo server
      </text>
    </g>
  );
}

function Sees({
  x,
  y,
  anchor = "start",
}: {
  x: number;
  y: number;
  anchor?: "start" | "middle";
}) {
  return (
    <g className="how-sees">
      <text x={x} y={y} textAnchor={anchor}>
        <tspan className="how-sees-label">Storage sees </tspan>
        <tspan>sizes, times, key labels, content hashes</tspan>
      </text>
      <text x={x} y={y + 22} textAnchor={anchor}>
        <tspan className="how-never-label">Never sees </tspan>
        <tspan>names, contents, passwords</tspan>
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
}: {
  id: string;
  from: [number, number];
  to: [number, number];
}) {
  return (
    <defs>
      <linearGradient id={`${id}-hub`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.22" />
        <stop offset="0.55" stopColor="#12182a" stopOpacity="0.9" />
        <stop offset="1" stopColor="#34d399" stopOpacity="0.1" />
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
        <stop offset="0" stopColor="#a78bfa" />
        <stop offset="1" stopColor="#34d399" />
      </linearGradient>
      <radialGradient id={`${id}-halo`}>
        <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.16" />
        <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

/** The browser extension: it talks to the desktop app on the same computer,
 *  never to the storage, and fills passwords only. Dimmed until it ships. */
function Extension({ x, y, w, state = "Coming soon" }: { x: number; y: number; w: number; state?: string }) {
  return (
    <g className="how-device is-planned how-extension">
      <rect className="how-card" x={x} y={y} width={w} height={92} rx="18" />
      <g transform={`translate(${x + 22} ${y + 18})`} className="how-glyph">
        <rect x="0" y="0" width="34" height="26" rx="4" />
        <path d="M0 8h34M5 4h4M11 4h4" />
      </g>
      <text className="how-name how-name-sm" x={x + 70} y={y + 30}>
        Browser extension
      </text>
      <text className="how-state" x={x + 70} y={y + 49}>
        {state}
      </text>
      <text className="how-unlock" x={x + 22} y={y + 76}>
        Chrome · Edge · Brave · Firefox
      </text>
    </g>
  );
}

const DESC =
  "Each device encrypts on its own and writes to storage you choose: an S3 bucket, WebDAV, an SFTP server or a " +
  "folder. The storage holds only encrypted objects; it sees sizes, times, key labels and content hashes, never names, contents " +
  "or passwords. There is no SilentSilo server. You unlock with a security key or the device's biometrics, and a " +
  "recovery code on paper is the fallback. Windows is available now, Android is coming soon, macOS and iOS are planned. " +
  "A browser extension for Chrome, Edge, Brave and Firefox is coming soon on Windows, and with the macOS app later: it fills passwords through the desktop app, never from storage.";

function Wide() {
  const live = "M300 182 C 360 182, 370 262, 430 262";
  return (
    <svg
      className="how-svg how-wide"
      viewBox="0 0 1120 600"
      role="img"
      aria-labelledby="how-title-w how-desc-w"
    >
      <title id="how-title-w">How SilentSilo works</title>
      <desc id="how-desc-w">{DESC}</desc>
      <Defs id="w" from={[300, 182]} to={[430, 262]} />
      <style>{`.how-wide .how-hub-box{fill:url(#w-hub)} .how-wide .how-link.is-live{stroke:url(#w-link)} .how-wide .how-halo{fill:url(#w-halo)}`}</style>

      <ellipse className="how-halo" cx="560" cy="300" rx="420" ry="260" />
      <ellipse className="how-orbit" cx="560" cy="300" rx="455" ry="220" />
      <ellipse
        className="how-orbit how-orbit-inner"
        cx="560"
        cy="300"
        rx="300"
        ry="170"
      />

      <NoServer cx={560} y={28} />

      <path className="how-link is-live" d={live} />
      <path
        className="how-link is-planned"
        d="M300 418 C 360 418, 370 338, 430 338"
      />
      <path
        className="how-link is-planned"
        d="M820 182 C 760 182, 750 262, 690 262"
      />
      <path
        className="how-link is-planned"
        d="M820 418 C 760 418, 750 338, 690 338"
      />
      <Packet path={live} dur="2.6s" begin="0s" />
      <Packet path={live} dur="2.6s" begin="-1.3s" />

      <Hub x={430} y={141} w={260} />

      <Extension x={50} y={8} w={250} />
      <path className="how-link is-planned" d="M175 100 V 118" />
      <Extension x={820} y={8} w={250} state="Planned, with macOS" />
      <path className="how-link is-planned" d="M945 100 V 118" />
      <Device p={WINDOWS} x={50} y={118} w={250} h={128} />
      <Device p={ANDROID} x={50} y={354} w={250} h={128} />
      <Device p={MACOS} x={820} y={118} w={250} h={128} />
      <Device p={IOS} x={820} y={354} w={250} h={128} />

      <text
        className="how-caption how-caption-live"
        x={175}
        y={278}
        textAnchor="middle"
      >
        Encrypted before it leaves
      </text>

      <Sees x={560} y={500} anchor="middle" />
      <Keys x={392} y={554} />
    </svg>
  );
}

function Tall() {
  const live = "M200 150 V 222";
  return (
    <svg
      className="how-svg how-tall"
      viewBox="0 0 400 1062"
      role="img"
      aria-labelledby="how-title-t how-desc-t"
    >
      <title id="how-title-t">How SilentSilo works</title>
      <desc id="how-desc-t">{DESC}</desc>
      <Defs id="t" from={[200, 150]} to={[200, 222]} />
      <style>{`.how-tall .how-hub-box{fill:url(#t-hub)} .how-tall .how-link.is-live{stroke:url(#t-link)} .how-tall .how-halo{fill:url(#t-halo)}`}</style>

      <NoServer cx={200} y={0} />
      <Extension x={70} y={50} w={260} />
      <path className="how-link is-planned" d="M200 142 V 184" />
      <g transform="translate(0 162)">
        <ellipse className="how-halo" cx="200" cy="390" rx="210" ry="300" />

        <Device p={WINDOWS} x={70} y={22} w={260} h={128} />
        <path className="how-link is-live" d={live} />
        <Packet path={live} dur="1.8s" begin="0s" />
        <text className="how-caption how-caption-live" x={222} y={190}>
          encrypted
        </text>

        <Hub x={40} y={222} w={320} />

        <path
          className="how-link is-planned"
          d="M110 540 C 110 580, 70 580, 70 612"
        />
        <path className="how-link is-planned" d="M200 540 V 612" />
        <path
          className="how-link is-planned"
          d="M290 540 C 290 580, 330 580, 330 612"
        />

        <g className="how-device is-planned">
          {[
            { p: ANDROID, cx: 70 },
            { p: MACOS, cx: 200 },
            { p: IOS, cx: 330 },
          ].map(({ p, cx }) => (
            <g key={p.name}>
              <rect
                className="how-card"
                x={cx - 60}
                y={612}
                width="120"
                height="104"
                rx="18"
              />
              <DeviceIcon kind={p.kind} x={cx - 21} y={630} />
              <text
                className="how-name how-name-sm"
                x={cx}
                y={688}
                textAnchor="middle"
              >
                {p.name}
              </text>
              <text className="how-state" x={cx} y={705} textAnchor="middle">
                {p.state}
              </text>
            </g>
          ))}
        </g>

        <Sees x={200} y={762} anchor="middle" />
        <Keys x={30} y={818} />
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
