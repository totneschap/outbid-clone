"use client";

import { useEffect, useState } from "react";

type Listing = {
  id: string;
  label: string;
  totalPaid: number;
};

function toHref(label: string): string | null {
  try {
    const url = label.startsWith("http") ? label : `https://${label}`;
    new URL(url);
    return url;
  } catch {
    return null;
  }
}

export default function Board({ initialListings }: { initialListings: Listing[] }) {
  const [listings, setListings] = useState(initialListings);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setListings(data.listings);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  async function submitBid(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/bid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, amount: Number(amount) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      if (data.simulated) {
        setListings((prev) => {
          const next = prev.filter((l) => l.label !== data.listing.label);
          next.push(data.listing);
          return next.sort((a, b) => b.totalPaid - a.totalPaid);
        });
        setLabel("");
        setAmount("");
      } else if (data.url) {
        window.location.href = data.url;
      }
    } finally {
      setSubmitting(false);
    }
  }

  const top = listings[0]?.totalPaid ?? 0;

  return (
    <>
      <form onSubmit={submitBid}>
        <input
          name="label"
          placeholder="yoursite.com or @handle"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />
        <input
          name="amount"
          type="number"
          placeholder={`$${Math.max(5, top + 1)}`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min={1}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "..." : "Bid"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}

      {listings.length === 0 ? (
        <p className="empty">No bids yet. Be the first.</p>
      ) : (
        <ol>
          {listings.map((listing, i) => {
            const href = toHref(listing.label);
            return (
              <li className={`row${i === 0 ? " first" : ""}`} key={listing.id}>
                <span className="rank">{i + 1}</span>
                {href ? (
                  <a className="label" href={href} target="_blank" rel="noreferrer">
                    {listing.label}
                  </a>
                ) : (
                  <span className="label">{listing.label}</span>
                )}
                <span className="amount">${listing.totalPaid.toLocaleString()}</span>
                <button
                  type="button"
                  className="outbid-btn"
                  onClick={() => {
                    setLabel(listing.label);
                    setAmount(String(listing.totalPaid + 1));
                  }}
                >
                  get on top
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
}
