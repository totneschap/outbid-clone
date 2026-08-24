import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";

export const metadata: Metadata = {
  title: "Privacy — ontop",
  description: "How ontop.business handles your data.",
};

export default function PrivacyPage() {
  return (
    <main>
      <SiteHeader />
      <h1>Privacy Policy</h1>

      <div className="prose">
        <p>Last updated 24 August 2026.</p>

        <h2>Who we are</h2>
        <p>
          Ontop Business, based in the United Kingdom, operates
          ontop.business and is the data controller for the personal data
          described below. We&apos;re registered under UK data protection
          law and this policy is written to comply with UK GDPR.
        </p>

        <h2>What we collect</h2>
        <p>
          <strong>Listings.</strong> The URL or @handle, category, and bid
          amount you submit. This is published on the public leaderboard by
          design — don&apos;t submit anything you don&apos;t want public.
        </p>
        <p>
          <strong>Visitor counter.</strong> A random ID stored in a cookie so
          we can show a live &quot;online now&quot; and total visitor count.
          It isn&apos;t tied to your name, email, or any other identifying
          information — it&apos;s just a number that lets us tell one browser
          apart from another.
        </p>
        <p>
          <strong>Click counts.</strong> We count clicks on each listing as
          an aggregate number. We don&apos;t log who clicked or when for any
          individual visitor.
        </p>
        <p>
          <strong>Payment.</strong> Payments are handled entirely by Stripe
          on their own hosted checkout page. We never receive or store your
          card number or other payment details — only confirmation that a
          payment succeeded.
        </p>

        <h2>Cookies</h2>
        <p>
          We set one cookie — a random visitor ID used only for the counter
          described above. We don&apos;t use advertising or third-party
          analytics cookies.
        </p>

        <h2>Who we share data with</h2>
        <p>
          Stripe processes payments on our behalf. Our hosting provider
          (Vercel) and database provider (Neon) process technical data —
          things like IP addresses and request logs — as a normal part of
          running the site. All three may process data outside the UK; where
          they do, they provide their own safeguards for that transfer
          (Stripe and Vercel are both certified under the EU-U.S. and
          UK-U.S. Data Privacy Framework).
        </p>

        <h2>How long we keep it</h2>
        <p>
          Listing and bid data is kept for as long as the leaderboard
          operates, since it&apos;s the public record the site is built
          around. Visitor counter data is kept for as long as the service
          runs. You can ask us to delete data tied to you at any time — see
          below.
        </p>

        <h2>Your rights</h2>
        <p>
          Under UK GDPR you can ask us to access, correct, or delete your
          personal data, or object to how we use it. Email{" "}
          <a href="mailto:hello@ontop.business">hello@ontop.business</a> and
          we&apos;ll act on it. You can also complain to the UK
          Information Commissioner&apos;s Office (ico.org.uk) if you think
          we&apos;ve got something wrong.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy as the service changes. Material changes
          will be reflected here with an updated date at the top.
        </p>

        <h2>Contact</h2>
        <p>
          <a href="mailto:hello@ontop.business">hello@ontop.business</a>
        </p>
      </div>
      <SiteFooter />
    </main>
  );
}
