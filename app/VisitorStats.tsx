"use client";

import { useEffect, useState } from "react";

const HEARTBEAT_MS = 20_000;

export default function VisitorStats() {
  const [stats, setStats] = useState<{ online: number; total: number } | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function ping() {
      try {
        const res = await fetch("/api/visit", { method: "POST" });
        const data = await res.json();
        if (!cancelled) setStats(data);
      } catch {
        // best-effort — the counter just stays stale until the next ping
      }
    }

    ping();
    const interval = setInterval(ping, HEARTBEAT_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (!stats) return null;

  return (
    <p className="visitor-stats">
      <span className="online-dot" aria-hidden="true" />
      {stats.online.toLocaleString()} online &middot; {stats.total.toLocaleString()}{" "}
      visitors since launch
    </p>
  );
}
