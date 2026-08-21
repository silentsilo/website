/**
 * One icon set, one optical weight.
 *
 * All stroke-based at 1.6 on a 24 grid with round caps and joins, so nothing
 * reads heavier than its neighbour. Mixing filled and outlined marks is the
 * fastest way to make a page look assembled rather than designed.
 */

type Props = { size?: number; className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function IconShield({ size = 18, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M12 2.8 4.8 5.9v5.4c0 4.3 3 8.3 7.2 9.9 4.2-1.6 7.2-5.6 7.2-9.9V5.9Z" />
      <path d="M9.4 12.2l1.9 1.9 3.4-3.9" />
    </svg>
  );
}

export function IconEyeOff({ size = 18, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M10.7 5.2a10.6 10.6 0 0 1 11.2 6.5 1 1 0 0 1 0 .7 10.8 10.8 0 0 1-1.5 2.5" />
      <path d="M14.1 14.2a3 3 0 0 1-4.2-4.3" />
      <path d="M17.5 17.5A10.7 10.7 0 0 1 2.1 12.3a1 1 0 0 1 0-.7 10.7 10.7 0 0 1 4.4-5.1" />
      <path d="m2 2 20 20" />
    </svg>
  );
}

/** An open book, for the tutorials. */
export function IconBook({ size = 18, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M3.2 5.2a1 1 0 0 1 1-1h5a2.8 2.8 0 0 1 2.8 2.8v11a2.2 2.2 0 0 0-2.2-2.2H3.2Z" />
      <path d="M20.8 5.2a1 1 0 0 0-1-1h-5A2.8 2.8 0 0 0 12 7v11a2.2 2.2 0 0 1 2.2-2.2h6.6Z" />
    </svg>
  );
}

export function IconCompass({ size = 18, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="m15.4 8.6-1.8 5-5 1.8 1.8-5Z" />
    </svg>
  );
}

export function IconPerson({ size = 18, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="8.4" r="3.6" />
      <path d="M4.8 20.2a7.4 7.4 0 0 1 14.4 0" />
    </svg>
  );
}

/** The official mark, so it is recognised rather than approximated. */
export function IconGitHub({ size = 18, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.9 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
    </svg>
  );
}

export function IconKey({ size = 20, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="m15.6 7.4 2.3-2.3a1 1 0 0 1 1.4 0l1.1 1.1a1 1 0 0 1 0 1.4L18 10" />
      <path d="m21 2-9.6 9.6" />
      <circle cx="7.4" cy="15.6" r="5.4" />
    </svg>
  );
}

export function IconFolder({ size = 20, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M4 6.6A2.6 2.6 0 0 1 6.6 4H11l2 2h4.4A2.6 2.6 0 0 1 20 8.6v8.8A2.6 2.6 0 0 1 17.4 20H6.6A2.6 2.6 0 0 1 4 17.4Z" />
    </svg>
  );
}

export function IconSync({ size = 20, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M21.4 3.2v5.2h-5.2M2.6 20.8v-5.2h5.2" />
      <path d="M4.1 10.2a8.2 8.2 0 0 1 13.6-3.4l3.7 3.4M19.9 13.8a8.2 8.2 0 0 1-13.6 3.4l-3.7-3.4" />
    </svg>
  );
}

export function IconVault({ size = 20, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <rect x="3" y="4.2" width="18" height="15.6" rx="2.6" />
      <circle cx="12" cy="12" r="3.3" />
      <path d="M12 4.6v2.1M12 17.3v2.1" />
    </svg>
  );
}

export function IconDownload({ size = 18, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M12 3.4v11.4" />
      <path d="m7.6 10.6 4.4 4.4 4.4-4.4" />
      <path d="M4.2 17.2v1.4a2 2 0 0 0 2 2h11.6a2 2 0 0 0 2-2v-1.4" />
    </svg>
  );
}

export function IconArrowRight({ size = 16, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M4.5 12h14M13 6.5l5.5 5.5L13 17.5" />
    </svg>
  );
}

export function IconHelp({ size = 18, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M9.5 9.4a2.6 2.6 0 0 1 5 .9c0 1.7-2.5 2.1-2.5 3.7" />
      <path d="M12 17.2h.01" />
    </svg>
  );
}

export function IconCheck({ size = 18, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="m4.8 12.4 4.6 4.6L19.2 7.2" />
    </svg>
  );
}

export function IconTerminal({ size = 18, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <rect x="3" y="4.4" width="18" height="15.2" rx="2.4" />
      <path d="m7.6 9.4 3 2.8-3 2.8M13 15.4h3.6" />
    </svg>
  );
}

export function IconDisk({ size = 18, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <ellipse cx="12" cy="6.6" rx="7.6" ry="3" />
      <path d="M4.4 6.6v10.8c0 1.7 3.4 3 7.6 3s7.6-1.3 7.6-3V6.6" />
      <path d="M4.4 12c0 1.7 3.4 3 7.6 3s7.6-1.3 7.6-3" />
    </svg>
  );
}

export function IconClock({ size = 18, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.6v4.4l3 1.8" />
    </svg>
  );
}

export function IconSwap({ size = 18, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M7.2 4.2 3.4 8l3.8 3.8M3.4 8h13.2" />
      <path d="m16.8 12.2 3.8 3.8-3.8 3.8M20.6 16H7.4" />
    </svg>
  );
}

export function IconLayers({ size = 18, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="m12 3.4 8.6 4.8L12 13 3.4 8.2Z" />
      <path d="m3.4 12.6 8.6 4.8 8.6-4.8" />
      <path d="m3.4 17 8.6 4.8 8.6-4.8" />
    </svg>
  );
}

export function IconPointer({ size = 18, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="m4.6 4.6 7.2 15.8 1.9-6.7 6.7-1.9Z" />
    </svg>
  );
}

export function IconLock({ size = 18, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <rect x="5" y="10.6" width="14" height="9.6" rx="2.4" />
      <path d="M8.4 10.6V8a3.6 3.6 0 0 1 7.2 0v2.6" />
    </svg>
  );
}

export function IconClipboard({ size = 18, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <rect x="5.6" y="4.6" width="12.8" height="16" rx="2.2" />
      <path d="M9 4.6V4a1.4 1.4 0 0 1 1.4-1.4h3.2A1.4 1.4 0 0 1 15 4v.6" />
      <path d="M9 11.2h6M9 14.8h4" />
    </svg>
  );
}

export function IconServer({ size = 18, className }: Props) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <rect x="3.6" y="4.6" width="16.8" height="6.2" rx="1.8" />
      <rect x="3.6" y="13.2" width="16.8" height="6.2" rx="1.8" />
      <path d="M7 7.7h1M7 16.3h1" />
    </svg>
  );
}
