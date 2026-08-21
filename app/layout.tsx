import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import { CipherField } from "./CipherField";
import { SiteHeader } from "./SiteHeader";
import { IconGitHub } from "./Icons";
import { DOC_CRYPTO, DOC_FORMATS, RELEASED, RELEASES, REPO } from "./links";

export const metadata: Metadata = {
  title: {
    default: "SilentSilo: an encrypted vault with no account and no server",
    template: "%s · SilentSilo",
  },
  description:
    "A local-first, end-to-end encrypted vault for files and passwords. Unlocked with a hardware security key or Windows Hello. Optional sync to storage you already control.",
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
  operatingSystem: "Windows 10, Windows 11",
  license: "https://www.gnu.org/licenses/agpl-3.0.html",
  url: "https://silentsilo.com",
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "Software Hive S.R.L." },
};

export const viewport: Viewport = {
  themeColor: "#05070e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }}
        />
        <div className="aurora" aria-hidden />
        <CipherField />
        <SiteHeader />

        {children}

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
                  own machine and answers to nobody else.
                </p>
                <a className="footer-gh" href={REPO}>
                  <IconGitHub size={16} />
                  <span>silentsilo/desktop</span>
                </a>
              </div>

              <div className="footer-cols">
                <div className="footer-col">
                  <h2>Read</h2>
                  <Link href="/security/">Security</Link>
                  <Link href="/faq/">Questions</Link>
                  <Link href="/principles/">Principles</Link>
                  <Link href="/privacy/">Privacy</Link>
                  <Link href="/who/">Who makes this</Link>
                </div>
                <div className="footer-col">
                  <h2>Get it</h2>
                  {/* Same rule as the hero: nothing here says Download until
                      there is something to download. The releases page is
                      empty, so the word was a promise the link could not
                      keep. */}
                  {RELEASED ? (
                    <a href={RELEASES}>Download</a>
                  ) : (
                    <a href={REPO}>Source</a>
                  )}
                  <a href={DOC_FORMATS}>Format spec</a>
                  <a href={DOC_CRYPTO}>Crypto spec</a>
                </div>
                <div className="footer-col">
                  <h2>Contact</h2>
                  <a href="mailto:contact@silentsilo.com">
                    contact@silentsilo.com
                  </a>
                  <a href="mailto:security@silentsilo.com">
                    security@silentsilo.com
                  </a>
                  <span className="footer-meta">
                    Software Hive S.R.L., Romania
                  </span>
                  <span className="footer-meta">AGPL-3.0</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
