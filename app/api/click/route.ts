import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";

  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  // Fire-and-forget from the client's perspective — a click on a listing
  // that's since been removed shouldn't surface an error.
  await prisma.listing.updateMany({
    where: { id },
    data: { clicks: { increment: 1 } },
  });

  return NextResponse.json({ ok: true });
}
