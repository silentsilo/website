import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "@fontsource-variable/inter/opsz.css";
import "./globals.css";
import { PageToc } from "./PageToc";
import { SiteHeader } from "./SiteHeader";
import { THEME_SCRIPT } from "./ThemeToggle";
import { IconGitHub } from "./Icons";
import { CORE_REPO, DOC_CRYPTO, DOC_FORMATS, MOBILE_REPO, PLAY_STORE, RELEASED, RELEASES, REPO } from "./links";

export const metadata: Metadata = {
  title: {
    default: "SilentSilo: an encrypted vault with no account and no server",
    template: "%s · SilentSilo",
  },
  description:
    "A local-first, end-to-end encrypted vault for files and passwords. Unlocked with a hardware security key, Windows Hello or a phone fingerprint. For Windows and Android. Optional sync to storage you already control.",
  metadataBase: new URL("https://silentsilo.com"),
  applicationName: "SilentSilo",
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  /* The card itself is drawn by scripts/og-image.mjs into public/og.png, so
     a static host serves it with an image content type. Named explicitly
     rather than left to Next's file convention. */
  openGraph: {
    type: "website",
    siteName: "SilentSilo",
    locale: "en",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

/* Marked up so a search result can say what this is and what it costs. */
const APP_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SilentSilo",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Windows 10, Windows 11, Android 12+",
  license: "https://www.gnu.org/licenses/agpl-3.0.html",
  url: "https://silentsilo.com",
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "Software Hive S.R.L." },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0e16" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The head script sets data-theme before React hydrates, so the server
    // render cannot match it.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline and synchronous, before anything paints. next/script's
            beforeInteractive is queued behind the runtime in a static
            export, which let a chosen theme flash the other one first.
            React logs a warning about it in development only. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }}
        />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />

        {children}
        <PageToc />

        <footer className="site-footer">
          <div className="wrap">
            <div className="footer-top">
              <div className="footer-brand">
                <Link href="/" className="brand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/icon.svg" alt="" width={28} height={28} />
                  <span>SilentSilo</span>
                </Link>
                <p>
                  An encrypted vault for files and passwords that runs on your
                  own computer and phone and answers to nobody else.
                </p>
                <p className="footer-source">
                  <IconGitHub size={15} />
                  <span>
                    Source: <a href={REPO}>desktop</a> · <a href={MOBILE_REPO}>mobile</a> ·{" "}
                    <a href={CORE_REPO}>core</a>
                  </span>
                </p>
              </div>

              <div className="footer-cols">
                <div className="footer-col">
                  <h2>Use it</h2>
                  {/* Same rule as the hero: nothing here says Download until
                      there is something to download. The releases page is
                      empty, so the word was a promise the link could not
                      keep. */}
                  {RELEASED ? (
                    <a href={RELEASES}>Download for Windows</a>
                  ) : (
                    <a href={REPO}>Source</a>
                  )}
                  <a href={PLAY_STORE}>Google Play</a>
                  <Link href="/tutorials/">Tutorials</Link>
                  <Link href="/faq/">Questions</Link>
                  <Link href="/europe/">In the EU</Link>
                </div>
                <div className="footer-col">
                  <h2>Trust</h2>
                  <Link href="/security/">Security</Link>
                  <Link href="/principles/">Principles</Link>
                  <Link href="/privacy/">Privacy</Link>
                  <a href={DOC_FORMATS}>Format spec</a>
                  <a href={DOC_CRYPTO}>Crypto spec</a>
                </div>
                <div className="footer-col">
                  <h2>Contact</h2>
                  <a href="mailto:contact@silentsilo.com">contact@silentsilo.com</a>
                  <a href="mailto:security@silentsilo.com">security@silentsilo.com</a>
                  <Link href="/who/">Who makes this</Link>
                  <Link href="/legal/">Legal notice</Link>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <p>Software Hive S.R.L., Romania · AGPL-3.0</p>
              <p className="footer-marks">
                Microsoft, OneDrive and Windows are trademarks of the Microsoft
                group of companies. Google Drive and Google Play are trademarks
                of Google LLC. Dropbox is a trademark of Dropbox, Inc. kDrive is
                a trademark of Infomaniak Network SA. SilentSilo is not
                affiliated with, sponsored or endorsed by any of these
                companies.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
