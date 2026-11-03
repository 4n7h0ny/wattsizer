import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONFIG } from "@/config/affiliate";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title:
    "WattSizer | Portable Power Station & Solar Generator Sizer Calculator (2026)",
  description:
    "Estimate the watt-hours and surge wattage needed to run your refrigerator, CPAP, sump pump, Starlink, and home appliances during a blackout. Compare Jackery, EcoFlow, Anker SOLIX, and BLUETTI LiFePO4 power stations.",
  keywords: [
    "portable power station calculator",
    "solar generator sizer",
    "what size power station to run a refrigerator",
    "EcoFlow DELTA 2 vs Jackery 1000 v2",
    "CPAP battery backup calculator",
    "blackout battery backup sizer",
  ],
  openGraph: {
    type: "website",
    siteName: "WattSizer",
    title: "What size power station do you actually need?",
    description:
      "Free calculator: pick your appliances and see watt-hours, startup surge and which power stations can run them.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-amber-400 selection:text-slate-950">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

