import Link from "next/link";

export default function Success() {
  return (
    <main>
      <h1>Payment received</h1>
      <p className="tagline">
        Stripe will confirm the payment via webhook, then your bid will show
        up on the board within a few seconds.
      </p>
      <Link href="/" style={{ color: "#9be89b" }}>
        &larr; back to the board
      </Link>
    </main>
  );
}
