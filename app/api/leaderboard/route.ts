import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const range = new URL(req.url).searchParams.get("range");

  if (range === "today") {
    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);

    const grouped = await prisma.bid.groupBy({
      by: ["listingId"],
      where: { createdAt: { gte: startOfToday } },
      _sum: { amount: true },
      orderBy: { _sum: { amount: "desc" } },
    });

    const listings = await prisma.listing.findMany({
      where: { id: { in: grouped.map((g) => g.listingId) } },
    });
    const byId = new Map(listings.map((l) => [l.id, l]));

    // Rank is driven by today's bid activity — a separate, fresh daily
    // competition — but totalPaid stays the real lifetime figure. Raising a
    // bid always targets the permanent total, so the client needs that
    // regardless of which view it's currently showing.
    const todayListings = grouped
      .map((g) => {
        const listing = byId.get(g.listingId);
        return listing ? { ...listing, todayAmount: g._sum.amount ?? 0 } : null;
      })
      .filter((l): l is NonNullable<typeof l> => l !== null);

    return NextResponse.json({ listings: todayListings });
  }

  const listings = await prisma.listing.findMany({
    orderBy: { totalPaid: "desc" },
  });
  return NextResponse.json({ listings });
}
