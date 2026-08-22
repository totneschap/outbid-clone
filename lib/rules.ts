export const MIN_BID = 5;
export const MAX_BID = 999_999;
export const INCREMENT = 1;

export function normalizeLabel(raw: string): string {
  return raw.trim().replace(/\s+/g, " ");
}

/**
 * Validates a proposed new *total* bid for a label against the current
 * total already on the board for that label (0 if it's a new entry), and
 * returns the amount that must actually be charged (the full amount for a
 * new listing, just the delta for a raise).
 */
export function validateBid(
  targetTotal: number,
  currentTotal: number
): { ok: true; chargeAmount: number } | { ok: false; error: string } {
  if (!Number.isInteger(targetTotal)) {
    return { ok: false, error: "Bid must be a whole dollar amount." };
  }
  if (targetTotal > MAX_BID) {
    return { ok: false, error: `Bid cannot exceed $${MAX_BID.toLocaleString()}.` };
  }

  if (currentTotal === 0) {
    if (targetTotal < MIN_BID) {
      return { ok: false, error: `New listings need at least $${MIN_BID}.` };
    }
    return { ok: true, chargeAmount: targetTotal };
  }

  if (targetTotal < currentTotal + INCREMENT) {
    return {
      ok: false,
      error: `Raise it by at least $${INCREMENT} — current total is $${currentTotal}.`,
    };
  }

  return { ok: true, chargeAmount: targetTotal - currentTotal };
}
