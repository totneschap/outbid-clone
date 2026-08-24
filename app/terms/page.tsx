import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";

export const metadata: Metadata = {
  title: "Terms — ontop",
  description: "Terms of service for ontop.business.",
};

export default function TermsPage() {
  return (
    <main>
      <SiteHeader />
      <h1>Terms of Service</h1>

      <div className="prose">
        <p>Last updated 24 August 2026.</p>

        <h2>Who we are</h2>
        <p>
          ontop.business (&quot;ontop&quot;, &quot;we&quot;, &quot;us&quot;)
          is operated by Ontop Business, based in the United Kingdom. These
          terms govern your use of the site. By submitting a listing or
          placing a bid, you agree to them.
        </p>

        <h2>The service</h2>
        <p>
          ontop is a public leaderboard: anyone can list a URL or @handle
          under a category and pay to rank it. Rank is determined solely by
          amount paid — there is no editorial review of ranking, and no
          guarantee of traffic, visibility outcomes, or business results from
          being listed.
        </p>

        <h2>Bidding and payment</h2>
        <p>
          Full bidding mechanics — minimums, increments, and how &quot;Today&quot;
          differs from the all-time board — are set out on the{" "}
          <a href="/rules">rules page</a>, which forms part of these terms.
          In short: every charge is one-time and non-refundable, bids do not
          expire, and payments are processed by Stripe. We never see or store
          your card details.
        </p>

        <h2>What you can list</h2>
        <p>
          Listings must follow the restrictions on the{" "}
          <a href="/rules">rules page</a>. We may remove a listing that
          breaks them, or that we reasonably believe is illegal, fraudulent,
          or infringes someone else&apos;s rights, without refunding any
          amount paid for it.
        </p>

        <h2>Third-party links</h2>
        <p>
          Listings link to third-party sites and services we don&apos;t
          control and aren&apos;t responsible for. Visiting a listed link is
          at your own risk.
        </p>

        <h2>No warranty</h2>
        <p>
          The service is provided &quot;as is&quot;, without warranty of any
          kind. We don&apos;t guarantee the site will be uninterrupted,
          error-free, or available at all times.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, we aren&apos;t liable for
          any indirect, incidental, or consequential loss arising from your
          use of the service, including loss of rank, listing removal, or
          business outcomes. Nothing in these terms limits liability that
          can&apos;t lawfully be limited, such as for fraud.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continuing to use the
          site after a change means you accept the updated terms.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of England and Wales, and any
          dispute is subject to the exclusive jurisdiction of the courts of
          England and Wales.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms: <a href="mailto:hello@ontop.business">hello@ontop.business</a>.
        </p>
      </div>
      <SiteFooter />
    </main>
  );
}
