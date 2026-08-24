import Link from "next/link";
import Logo from "./Logo";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Logo />
      <nav className="site-nav">
        <Link href="/categories">Categories</Link>
        <Link href="/about">About</Link>
        <Link href="/rules">Rules</Link>
      </nav>
    </header>
  );
}
