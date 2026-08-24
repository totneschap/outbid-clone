import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/db";

const COOKIE_NAME = "ontop_visitor";
const ONLINE_WINDOW_MS = 45_000;

export async function POST() {
  const cookieStore = cookies();
  const existingId = cookieStore.get(COOKIE_NAME)?.value;
  const visitorId = existingId ?? randomUUID();

  await prisma.visitor.upsert({
    where: { id: visitorId },
    update: { lastSeenAt: new Date() },
    create: { id: visitorId },
  });

  const [online, total] = await Promise.all([
    prisma.visitor.count({
      where: { lastSeenAt: { gte: new Date(Date.now() - ONLINE_WINDOW_MS) } },
    }),
    prisma.visitor.count(),
  ]);

  const res = NextResponse.json({ online, total });
  if (!existingId) {
    res.cookies.set(COOKIE_NAME, visitorId, {
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }
  return res;
}
