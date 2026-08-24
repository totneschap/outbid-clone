import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer>
      <p className="footer-rules">
        $5 minimum &middot; $1 increments &middot; $999,999 cap &middot; bids
        never expire or refund.
      </p>
      <nav className="footer-nav">
        <Link href="/categories">Categories</Link>
        <Link href="/about">About</Link>
        <Link href="/rules">Rules</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/privacy">Privacy</Link>
      </nav>
    </footer>
  );
}
