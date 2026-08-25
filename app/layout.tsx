import type { Metadata } from "next";
import "./globals.css";

const title = "ontop — is your business on top?";
const description =
  "ontop is the open pay-to-rank leaderboard for businesses. Place your bid, claim #1, outbid competitors, and drive traffic straight to your business.";

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
