import { prisma } from "@/lib/db";
import { isStripeEnabled } from "@/lib/stripe";
import Board from "./Board";

export const dynamic = "force-dynamic";

export default async function Home() {
  const listings = await prisma.listing.findMany({
    orderBy: { totalPaid: "desc" },
  });

  return (
    <main>
      <h1>outbid (clone)</h1>
      <p className="tagline">Pay to rank. Whoever bids highest sits on top.</p>

      {!isStripeEnabled && (
        <div className="banner">
          Running in SIMULATE mode — no Stripe keys are set, so bids apply
          instantly with no real payment. Set STRIPE_SECRET_KEY and
          STRIPE_WEBHOOK_SECRET in .env to switch on real Checkout.
        </div>
      )}

      <Board initialListings={listings} />

      <footer>
        $5 minimum &middot; $1 increments &middot; $999,999 cap &middot; bids
        never expire or refund.
      </footer>
    </main>
  );
}
