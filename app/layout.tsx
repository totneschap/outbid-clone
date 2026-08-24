import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ontop — is your business on top?",
  description:
    "The public leaderboard where paying the most gets you to #1. No algorithm, no subscriptions — just outbid everyone else.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
