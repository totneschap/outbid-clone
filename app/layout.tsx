import type { Metadata } from "next";
import "./globals.css";

const title = "ontop — is your business on top?";
const description =
  "The public leaderboard where paying the most gets you to #1. No algorithm, no subscriptions — just outbid everyone else.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ontop.business"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://ontop.business",
    siteName: "ontop",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
