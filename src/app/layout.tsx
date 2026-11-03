import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "WattSizer | Portable Power Station & Solar Generator Sizer Calculator (2026)",
  description:
    "Calculate exact watt-hours and surge wattage needed to run your refrigerator, CPAP, sump pump, Starlink, and home appliances during a blackout. Compare Jackery, EcoFlow, Anker SOLIX, and BLUETTI LiFePO4 power stations.",
  keywords: [
    "portable power station calculator",
    "solar generator sizer",
    "what size power station to run a refrigerator",
    "EcoFlow DELTA 2 vs Jackery 1000 v2",
    "CPAP battery backup calculator",
    "blackout battery backup sizer",
  ],
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

