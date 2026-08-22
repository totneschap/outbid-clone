import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const listings = await prisma.listing.findMany({
    orderBy: { totalPaid: "desc" },
  });
  return NextResponse.json({ listings });
}
