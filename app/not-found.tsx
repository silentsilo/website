import Link from "next/link";
import { IconArrowRight } from "./Icons";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="wrap notfound">
      <span className="notfound-code">404</span>
      <h1>There is nothing at this address</h1>
      <p>
        The page may have been renamed, or the link may be wrong. Everything
        this site has is one click away.
      </p>
      <div className="notfound-links">
        <Link href="/">Home</Link>
        <Link href="/security/">Security</Link>
        <Link href="/faq/">FAQ</Link>
        <Link href="/principles/">Principles</Link>
        <Link href="/privacy/">Privacy</Link>
        <Link href="/who/">Who makes this</Link>
      </div>
      <Link className="btn btn-primary" href="/">
        Back to the start
        <IconArrowRight />
      </Link>
    </main>
  );
}
