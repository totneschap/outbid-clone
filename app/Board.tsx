"use client";

import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, categoryLabel } from "@/lib/categories";

type Listing = {
  id: string;
  label: string;
  category: string;
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
  const [activeCategory, setActiveCategory] = useState("all");
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
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
        body: JSON.stringify({ label, amount: Number(amount), category }),
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
        setCategory("");
      } else if (data.url) {
        window.location.href = data.url;
      }
    } finally {
      setSubmitting(false);
    }
  }

  const top = listings[0]?.totalPaid ?? 0;

  // Rank reflects each listing's position in the one shared, sitewide
  // competition — filtering by category narrows what's shown, it doesn't
  // start a separate #1 for that category.
  const ranked = useMemo(
    () => listings.map((listing, i) => ({ ...listing, rank: i + 1 })),
    [listings]
  );
  const visible =
    activeCategory === "all"
      ? ranked
      : ranked.filter((l) => l.category === activeCategory);

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
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            Choose a category
          </option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
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

      <div className="cat-tabs">
        <button
          type="button"
          className={`cat-tab${activeCategory === "all" ? " active" : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`cat-tab${activeCategory === c.id ? " active" : ""}`}
            onClick={() => setActiveCategory(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="empty">No bids yet. Be the first.</p>
      ) : (
        <ol>
          {visible.map((listing) => {
            const href = toHref(listing.label);
            return (
              <li className={`row${listing.rank === 1 ? " first" : ""}`} key={listing.id}>
                <span className="rank">{listing.rank}</span>
                <div className="info">
                  {href ? (
                    <a className="label" href={href} target="_blank" rel="noreferrer">
                      {listing.label}
                    </a>
                  ) : (
                    <span className="label">{listing.label}</span>
                  )}
                  <span className="category-tag">{categoryLabel(listing.category)}</span>
                </div>
                <span className="amount">${listing.totalPaid.toLocaleString()}</span>
                <button
                  type="button"
                  className="outbid-btn"
                  onClick={() => {
                    setLabel(listing.label);
                    setAmount(String(listing.totalPaid + 1));
                    setCategory(listing.category);
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
