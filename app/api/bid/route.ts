import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { stripe, isStripeEnabled } from "@/lib/stripe";
import { normalizeLabel, validateBid } from "@/lib/rules";
import { isValidCategory } from "@/lib/categories";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const label = typeof body?.label === "string" ? normalizeLabel(body.label) : "";
  const targetTotal = Number(body?.amount);
  const category = body?.category;

  if (!label) {
    return NextResponse.json({ error: "Enter a URL or handle." }, { status: 400 });
  }
  if (!Number.isFinite(targetTotal)) {
    return NextResponse.json({ error: "Enter a bid amount." }, { status: 400 });
  }
  if (!isValidCategory(category)) {
    return NextResponse.json({ error: "Choose a category." }, { status: 400 });
  }

  const existing = await prisma.listing.findUnique({ where: { label } });
  const currentTotal = existing?.totalPaid ?? 0;

  const result = validateBid(targetTotal, currentTotal);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  // SIMULATE MODE: no Stripe keys configured, so apply the bid immediately.
  // This exists purely so the demo runs with zero setup — a real deployment
  // should always go through the Checkout branch below.
  if (!isStripeEnabled) {
    const listing = await prisma.listing.upsert({
      where: { label },
      update: { totalPaid: targetTotal, category },
      create: { label, totalPaid: targetTotal, category },
    });
    return NextResponse.json({ simulated: true, listing });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const session = await stripe!.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: result.chargeAmount * 100,
          product_data: {
            name:
              currentTotal === 0
                ? `List "${label}" at #${targetTotal}`
                : `Raise "${label}" to $${targetTotal}`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      label,
      targetTotal: String(targetTotal),
      category,
    },
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/`,
  });

  return NextResponse.json({ simulated: false, url: session.url });
}
