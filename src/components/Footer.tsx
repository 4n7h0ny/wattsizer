import React from "react";
import Link from "next/link";
import { APPLIANCES } from "@/data/appliances";
import { COMPARISON_PAIRS, POWER_STATIONS } from "@/data/powerStations";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-800/80 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Amazon Associates Disclosure */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-slate-950">
                <Zap className="h-4 w-4 fill-slate-950" />
              </div>
              <span className="text-lg font-black text-white">
                Watt<span className="text-amber-400">Sizer</span>
              </span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              A free portable power station &amp; solar generator sizing
              calculator. Runtimes are estimates based on manufacturer specs,
              typical appliance wattages and an assumed 85% inverter efficiency.
              We have not hands-on tested these products.
            </p>
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-[11px] leading-relaxed text-slate-400">
              <strong className="text-slate-200">
                Amazon Associates Disclosure:
              </strong>{" "}
              As an Amazon Associate, WattSizer earns from qualifying purchases.
              Links to Amazon are paid links. Check Amazon for current prices
              and availability.
            </div>
          </div>

          {/* Column 2: Popular Appliance Runtime Guides (SEO Internal Links) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Appliance Runtime Guides
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              {APPLIANCES.slice(0, 8).map((app) => (
                <li key={app.id}>
                  <Link
                    href={`/can-it-run/${app.slug}`}
                    className="hover:text-amber-400 transition"
                  >
                    Power Station for {app.shortName} ({app.runningWatts}W)
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/can-it-run"
                  className="font-semibold text-amber-400 hover:underline"
                >
                  View All {APPLIANCES.length} Appliance Runtime Charts →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Head-to-Head Comparisons */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Head-to-Head Showdowns
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              {COMPARISON_PAIRS.map((pair) => (
                <li key={pair.slug}>
                  <Link
                    href={`/compare/${pair.slug}`}
                    className="hover:text-amber-400 transition"
                  >
                    {pair.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/compare"
                  className="font-semibold text-amber-400 hover:underline"
                >
                  Custom Side-by-Side Comparison Tool →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Top Power Stations & Site Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Top Rated LiFePO4 Models
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              {POWER_STATIONS.slice(0, 8).map((station) => (
                <li key={station.id}>
                  <Link
                    href={`/reviews/${station.slug}`}
                    className="hover:text-amber-400 transition"
                  >
                    {station.name} Review ({station.capacityWh}Wh)
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/runtime"
                  className="font-semibold text-amber-400 hover:underline"
                >
                  Model × Appliance Runtime Matrix →
                </Link>
              </li>
              <li>
                <Link href="/how-we-calculate" className="hover:text-amber-400">
                  How We Calculate Runtimes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} WattSizer. Estimates only; always check your appliance&apos;s label and the manufacturer&apos;s specs.</p>
          <div className="mt-2 sm:mt-0 flex gap-4">
            <Link href="/#calculator" className="hover:text-slate-300">
              Calculator
            </Link>
            <Link href="/can-it-run" className="hover:text-slate-300">
              Appliance Sizer
            </Link>
            <Link href="/compare" className="hover:text-slate-300">
              Compare
            </Link>
            <Link href="/how-we-calculate" className="hover:text-slate-300">
              How We Calculate
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

