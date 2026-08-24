import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";

export const metadata: Metadata = {
  title: "Rules — ontop",
  description: "How bidding, categories, and payment work on ontop.",
};

export default function RulesPage() {
  return (
    <main>
      <SiteHeader />
      <h1>Rules</h1>

      <div className="prose">
        <h2>How a spot is won</h2>
        <p>
          A new listing needs at least $5. Raising a listing you already have
          on the board costs at least $1 more than its current total — you
          only pay the difference, not the full amount again. Bids top out at
          $999,999. If two listings ever land on the exact same total, the
          one that reached it first ranks higher.
        </p>

        <h2>What you can list</h2>
        <p>
          Any real business, product, tool, or profile — pick whichever
          category fits best, or Other if nothing does. Each URL or @handle
          gets one entry: submit the same one again to raise it rather than
          creating a duplicate.
        </p>
        <p>Not allowed: illegal content, adult content, link shorteners,
          bare invite links with no real destination behind them (Telegram,
          Discord, WhatsApp), or anything impersonating a business that
          isn&apos;t yours.</p>

        <h2>Categories</h2>
        <p>
          Categories only filter what&apos;s shown. There&apos;s one
          leaderboard and one #1 — picking a category narrows the view, it
          doesn&apos;t start a separate competition.
        </p>

        <h2>Today vs. all-time</h2>
        <p>
          The main board ranks by lifetime total paid. The Today view ranks
          only by bids placed since midnight UTC — a listing with a huge
          lifetime total but no bids today won&apos;t appear there at all.
        </p>

        <h2>After payment</h2>
        <p>
          A listing goes live the moment payment is confirmed. Every charge
          is one-time and non-refundable — bids don&apos;t expire, decay, or
          get returned. You keep whatever rank your total can hold for as
          long as it holds it.
        </p>
      </div>
      <SiteFooter />
    </main>
  );
}
