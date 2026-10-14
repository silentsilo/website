/**
 * A screenshot of the app in the site's own theme. Both are in the page and
 * CSS shows one (`.only-light`, `.only-dark`), so switching the theme swaps
 * the picture at once. Lazy, so the hidden one is never fetched.
 *
 * `base` is the path without theme and size: `/shots/files` stands for
 * `/shots/files-light-1200.webp` and the other three. Phone shots are
 * narrower and come in 540 and 1080 (`widths`).
 */
export function ThemedImg({
  base,
  alt,
  width,
  height,
  sizes,
  large = false,
  widths = [1200, 2400],
  className,
  onClick,
}: {
  base: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  /** The larger file alone, for the lightbox. */
  large?: boolean;
  /** The two widths the files come in, small then large. */
  widths?: [number, number];
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <>
      {(["light", "dark"] as const).map((theme) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${base}-${theme}`}
          className={`only-${theme}${className ? ` ${className}` : ""}`}
          src={`${base}-${theme}-${large ? widths[1] : widths[0]}.webp`}
          srcSet={
            large
              ? undefined
              : `${base}-${theme}-${widths[0]}.webp ${widths[0]}w, ${base}-${theme}-${widths[1]}.webp ${widths[1]}w`
          }
          sizes={large ? undefined : sizes}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onClick={onClick}
        />
      ))}
    </>
  );
}
