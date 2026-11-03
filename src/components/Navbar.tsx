import React from "react";
import Link from "next/link";
import { BatteryCharging, Calculator, Compass, Layers, Sparkles, Zap } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      {/* Top Affiliate / Coupon Announcement Strip */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border-b border-amber-500/20 px-4 py-1.5 text-center text-xs text-amber-200">
        <span className="font-semibold text-amber-400">2026 Blackout Readiness Guide:</span>{" "}
        Calculate your exact appliance wattage in 30 seconds &amp; check live Amazon clip-on coupons for EcoFlow, Jackery &amp; Anker SOLIX.
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20">
            <Zap className="h-5 w-5 fill-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-white">
              Watt<span className="text-amber-400">Sizer</span>
            </span>
            <span className="hidden sm:inline-block ml-2 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-300">
              LiFePO4 Lab
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
          <Link
            href="/#calculator"
            className="flex items-center gap-1.5 hover:text-amber-400 transition"
          >
            <Calculator className="h-4 w-4 text-amber-400" />
            Wattage Calculator
          </Link>
          <Link
            href="/can-it-run"
            className="hover:text-amber-400 transition"
          >
            Appliance Guides
          </Link>
          <Link
            href="/runtime"
            className="hover:text-amber-400 transition"
          >
            Runtime Matrix (80+)
          </Link>
          <Link
            href="/compare"
            className="hover:text-amber-400 transition"
          >
            VS Comparisons
          </Link>
          <Link
            href="/power-stations"
            className="hover:text-amber-400 transition"
          >
            All Power Stations
          </Link>
          <Link
            href="/owner-guide"
            className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-300 hover:bg-emerald-500/20 transition"
          >
            Owner Launch Guide
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#calculator"
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 px-3.5 py-2 text-xs font-extrabold text-slate-950 transition shadow"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Size My Backup
          </Link>
        </div>
      </div>

      {/* Mobile Sub-nav */}
      <div className="flex md:hidden items-center justify-around border-t border-slate-900 bg-slate-950 px-2 py-2 text-[11px] font-semibold text-slate-300 overflow-x-auto">
        <Link href="/#calculator" className="px-2 py-0.5 hover:text-amber-400">
          Calculator
        </Link>
        <Link href="/can-it-run" className="px-2 py-0.5 hover:text-amber-400">
          Appliance Guides
        </Link>
        <Link href="/compare" className="px-2 py-0.5 hover:text-amber-400">
          VS Compare
        </Link>
        <Link href="/power-stations" className="px-2 py-0.5 hover:text-amber-400">
          All Units
        </Link>
        <Link href="/owner-guide" className="px-2 py-0.5 text-emerald-400">
          Setup Guide
        </Link>
      </div>
    </header>
  );
}

