import { prisma } from "@/lib/db";
import { isStripeEnabled } from "@/lib/stripe";
import { isValidCategory } from "@/lib/categories";
import Board from "./Board";
import VisitorStats from "./VisitorStats";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const listings = await prisma.listing.findMany({
    orderBy: [{ totalPaid: "desc" }, { updatedAt: "asc" }],
  });
  const initialCategory = isValidCategory(searchParams.category)
    ? searchParams.category
    : "all";

  return (
    <main>
      <SiteHeader />
      <VisitorStats />
      <h1 className="home-h1">
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

      <Board initialListings={listings} initialCategory={initialCategory} />

      <SiteFooter />
    </main>
  );
}
