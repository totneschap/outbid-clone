"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, categoryLabel } from "@/lib/categories";

type Listing = {
  id: string;
  label: string;
  category: string;
  totalPaid: number;
  clicks: number;
  todayAmount?: number;
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

function trackClick(id: string) {
  const payload = new Blob([JSON.stringify({ id })], { type: "application/json" });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/click", payload);
  } else {
    fetch("/api/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true,
    }).catch(() => {});
  }
}

export default function Board({
  initialListings,
  initialCategory,
}: {
  initialListings: Listing[];
  initialCategory?: string;
}) {
  const [listings, setListings] = useState(initialListings);
  const [todayListings, setTodayListings] = useState<Listing[]>([]);
  const [range, setRange] = useState<"all" | "today">("all");
  const [activeCategory, setActiveCategory] = useState(initialCategory ?? "all");
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function refresh() {
      const [allRes, todayRes] = await Promise.all([
        fetch("/api/leaderboard"),
        fetch("/api/leaderboard?range=today"),
      ]);
      setListings((await allRes.json()).listings);
      setTodayListings((await todayRes.json()).listings);
    }
    refresh();
    const interval = setInterval(refresh, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeTabRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeCategory]);

  function bumpClicksLocally(id: string) {
    const bump = (l: Listing) => (l.id === id ? { ...l, clicks: l.clicks + 1 } : l);
    setListings((prev) => prev.map(bump));
    setTodayListings((prev) => prev.map(bump));
  }

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
  const defaultClaim = Math.max(5, top + 1);
  // The steppers and the form's amount field are the same value — adjusting
  // one is just a shortcut for typing into the other.
  const claimPrice = amount === "" ? defaultClaim : Number(amount) || defaultClaim;

  function bumpClaim(delta: number) {
    setAmount(String(Math.max(5, claimPrice + delta)));
  }

  // Rank reflects each listing's position in whichever competition is
  // active (all-time or today) — filtering by category narrows what's
  // shown, it doesn't start a separate #1 for that category.
  const activeListings = range === "today" ? todayListings : listings;
  const ranked = useMemo(
    () => activeListings.map((listing, i) => ({ ...listing, rank: i + 1 })),
    [activeListings]
  );
  const visible =
    activeCategory === "all"
      ? ranked
      : ranked.filter((l) => l.category === activeCategory);

  return (
    <>
      <div className="claim">
        <button
          type="button"
          className="claim-step"
          onClick={() => bumpClaim(-1)}
          aria-label="Lower by one dollar"
        >
          &minus;
        </button>
        <span className="claim-text">
          Claim #1 for <span className="claim-price">${claimPrice.toLocaleString()}</span>
        </span>
        <button
          type="button"
          className="claim-step"
          onClick={() => bumpClaim(1)}
          aria-label="Raise by one dollar"
        >
          +
        </button>
      </div>
      <p className="claim-note">
        <span className="claim-note-highlight">New spots start at $5.</span> Paying
        less than the #1 price still puts you on the board at whatever place
        that bid can take.
      </p>

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

      <div className="range-toggle">
        <div className="range-toggle-inner">
          <button
            type="button"
            className={`range-btn${range === "all" ? " active" : ""}`}
            onClick={() => setRange("all")}
          >
            All-time
          </button>
          <button
            type="button"
            className={`range-btn${range === "today" ? " active" : ""}`}
            onClick={() => setRange("today")}
          >
            Today
          </button>
        </div>
      </div>

      <div className="cat-tabs">
        <button
          type="button"
          ref={activeCategory === "all" ? activeTabRef : undefined}
          className={`cat-tab${activeCategory === "all" ? " active" : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            ref={activeCategory === c.id ? activeTabRef : undefined}
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
                    <a
                      className="label"
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => {
                        trackClick(listing.id);
                        bumpClicksLocally(listing.id);
                      }}
                    >
                      {listing.label}
                    </a>
                  ) : (
                    <span className="label">{listing.label}</span>
                  )}
                  <span className="category-tag">
                    {categoryLabel(listing.category)} &middot;{" "}
                    {listing.clicks.toLocaleString()}{" "}
                    {listing.clicks === 1 ? "click" : "clicks"}
                  </span>
                </div>
                <span className="amount">
                  $
                  {(range === "today"
                    ? listing.todayAmount ?? 0
                    : listing.totalPaid
                  ).toLocaleString()}
                </span>
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
