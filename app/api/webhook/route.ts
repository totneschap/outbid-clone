import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 400 });
  }

  const signature = req.headers.get("stripe-signature");
  const payload = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const label = session.metadata?.label as string | undefined;
    const targetTotal = Number(session.metadata?.targetTotal);

    if (label && Number.isFinite(targetTotal)) {
      const existing = await prisma.listing.findUnique({ where: { label } });

      // Someone else already pushed this label's total past what this
      // payment was targeting (e.g. two people racing for #1) — the charge
      // already went through, so keep the higher total and flag this
      // payment for a manual refund rather than silently losing the money.
      if (existing && existing.totalPaid >= targetTotal) {
        console.warn(
          `[webhook] ${label} already at $${existing.totalPaid}, ` +
            `session ${session.id} targeted $${targetTotal} — needs refund`
        );
      } else {
        await prisma.listing.upsert({
          where: { label },
          update: { totalPaid: targetTotal },
          create: { label, totalPaid: targetTotal },
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
