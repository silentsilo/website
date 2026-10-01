/**
 * A screenshot of the app in the site's own theme. Both are in the page and
 * CSS shows one (`.only-light`, `.only-dark`), so switching the theme swaps
 * the picture at once. Lazy, so the hidden one is never fetched.
 *
 * `base` is the path without theme and size: `/shots/files` stands for
 * `/shots/files-light-1200.webp` and the other three.
 */
export function ThemedImg({
  base,
  alt,
  width,
  height,
  sizes,
  large = false,
  className,
  onClick,
}: {
  base: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  /** The 2400px file alone, for the lightbox. */
  large?: boolean;
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
          src={`${base}-${theme}-${large ? 2400 : 1200}.webp`}
          srcSet={
            large
              ? undefined
              : `${base}-${theme}-1200.webp 1200w, ${base}-${theme}-2400.webp 2400w`
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
