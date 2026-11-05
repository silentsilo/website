import type { Visitor } from "./DownloadButton";

/** The apps the site shows screenshots of. */
export type ShotPlatform = "windows" | "macos" | "android" | "ios";

/** Which app to show first: the one for the system reading the page.
 *  Linux and anything unknown get Windows, which looks the same apart from
 *  the window. */
export function platformFor(visitor: Visitor): ShotPlatform {
  if (visitor === "android") return "android";
  if (visitor === "ios") return "ios";
  if (visitor === "macos") return "macos";
  return "windows";
}

/** A screenshot dressed as its system shows it: a Windows window with its
 *  caption buttons, a Mac window with the three lights, or a phone. */
export function AppFrame({
  platform,
  title,
  className,
  children,
}: {
  platform: ShotPlatform;
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (platform === "android" || platform === "ios") {
    const kind = platform === "ios" ? "phone is-iphone" : "phone";
    return <div className={`${kind}${className ? ` ${className}` : ""}`}>{children}</div>;
  }
  const mac = platform === "macos";
  return (
    <div className={`window${mac ? " is-mac" : ""}${className ? ` ${className}` : ""}`}>
      <div className="window-bar" aria-hidden>
        {mac && (
          <span className="window-lights">
            <i />
            <i />
            <i />
          </span>
        )}
        <span className="window-title">{title}</span>
        {!mac && (
          <span className="window-controls">
            <i />
            <i />
            <i />
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
