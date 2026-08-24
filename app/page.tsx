import { prisma } from "@/lib/db";
import { isStripeEnabled } from "@/lib/stripe";
import Board from "./Board";
import VisitorStats from "./VisitorStats";
import Logo from "./Logo";

export const dynamic = "force-dynamic";

export default async function Home() {
  const listings = await prisma.listing.findMany({
    orderBy: { totalPaid: "desc" },
  });

  return (
    <main>
      <Logo />
      <VisitorStats />
      <h1>
        Get your business <em>on top.</em>
      </h1>
      <p className="tagline">
        The public leaderboard where paying the most gets you to #1. No
        algorithm, no subscriptions — just outbid everyone else.
      </p>

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
