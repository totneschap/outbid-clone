import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";

export const metadata: Metadata = {
  title: "About — ontop",
  description: "What ontop is and how it works.",
};

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <h1>About ontop</h1>
      <div className="prose">
        <p>
          ontop is a public leaderboard where rank is bought, not earned by
          an algorithm. Submit your business, product, or profile, name your
          price, and whoever&apos;s paid the most sits at #1 — plain and
          visible to everyone who visits.
        </p>
        <p>
          There&apos;s no subscription, no bidding war hidden behind a
          dashboard, and no way to buy your way to the top quietly. Every bid
          is public, every rank is live, and getting outbid is just part of
          being on a leaderboard.
        </p>
        <p>
          Categories exist to help people browse, not to create separate
          competitions — there&apos;s one board, one price for #1, and
          it&apos;s whatever the market is currently willing to pay.
        </p>
        <p>
          Full mechanics — minimums, increments, refunds — are on the{" "}
          <a href="/rules">rules page</a>.
        </p>
      </div>
    </main>
  );
}
