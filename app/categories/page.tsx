import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/categories";
import SiteHeader from "../SiteHeader";

export const metadata: Metadata = {
  title: "Categories — ontop",
  description: "Browse the ontop leaderboard by category.",
};

export default function CategoriesPage() {
  return (
    <main>
      <SiteHeader />
      <h1>Categories</h1>
      <p className="tagline">
        Pick a category to see who&apos;s on top there — the ranking is the
        same sitewide leaderboard, just narrowed to that category.
      </p>

      <ol className="category-grid">
        {CATEGORIES.map((c) => (
          <li key={c.id}>
            <Link href={`/?category=${c.id}`} className="category-card">
              {c.label}
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
