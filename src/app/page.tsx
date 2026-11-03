import React from "react";
import Link from "next/link";
import InteractiveSizer from "@/components/InteractiveSizer";
import { APPLIANCES } from "@/data/appliances";
import { COMPARISON_PAIRS, POWER_STATIONS } from "@/data/powerStations";
import { getAmazonProductUrl } from "@/config/affiliate";
import {
  ArrowRight,
  BatteryCharging,
  CheckCircle2,
  ExternalLink,
  Flame,
  Scale,
  ShieldCheck,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Banner */}
      <div className="mb-10 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-950 p-6 sm:p-10 text-center relative overflow-hidden">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-300 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Free Power Station Sizing Calculator</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Pick Your Blackout Appliances.{" "}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              See Which Power Stations Can Run Them.
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Multiplying sticker watts by 24 hours overestimates what you need,
            and ignoring startup surge can leave you with a unit that trips
            when your fridge kicks on. This calculator estimates{" "}
            <strong className="text-white">
              compressor duty cycles, startup surge watts, and ~85% AC
              inverter efficiency
            </strong>{" "}
            and compares the result against published specs for Jackery,
            EcoFlow, Anker SOLIX and BLUETTI units.
          </p>

          {/* What the calculator accounts for */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900/90 border border-slate-800 px-3 py-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Compressor Duty-Cycle Math
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900/90 border border-slate-800 px-3 py-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Peak Motor Surge Check
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900/90 border border-slate-800 px-3 py-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              LiFePO4 Models Only
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900/90 border border-slate-800 px-3 py-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Estimates, Not Lab Tests
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Calculator Component */}
      <InteractiveSizer />

      {/* Section: Quick-Jump Appliance Runtime Guides ("Can It Run X?") */}
      <section className="mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Appliance-Specific Sizing Guides
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
              &ldquo;How Long Will a Power Station Run My...?&rdquo;
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Click any household or off-grid appliance below to see estimated runtimes across 10 popular LiFePO4 power stations.
            </p>
          </div>
          <Link
            href="/can-it-run"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
          >
            View All {APPLIANCES.length} Appliance Charts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {APPLIANCES.slice(0, 8).map((app) => {
            const effectiveWatts = Math.round(app.runningWatts * app.dutyCycle);
            return (
              <Link
                key={app.id}
                href={`/can-it-run/${app.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-amber-500/50 hover:bg-slate-900 transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                      {app.category}
                    </span>
                    <span className="text-xs font-bold text-amber-400">
                      {app.runningWatts}W Run
                    </span>
                  </div>
                  <h3 className="mt-2.5 text-base font-bold text-white group-hover:text-amber-300 transition">
                    {app.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-400 line-clamp-2">
                    {app.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Avg Draw:{" "}
                    <strong className="text-slate-200">{effectiveWatts}W/hr</strong>
                  </span>
                  <span className="font-bold text-amber-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    Runtime Chart →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Section: Head-to-Head Buyer Showdowns */}
      <section className="mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Side-by-Side Spec &amp; Runtime Battles
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
              Popular Solar Generator Showdowns
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Torn between EcoFlow, Jackery, Anker SOLIX, and BLUETTI? Compare estimated runtime, output, weight and expandability.
            </p>
          </div>
          <Link
            href="/compare"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
          >
            Launch Custom VS Comparison Tool
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {COMPARISON_PAIRS.map((pair) => (
            <Link
              key={pair.slug}
              href={`/compare/${pair.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-amber-500/50 hover:bg-slate-900 transition"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-300">
                  <Scale className="h-3 w-3" />
                  Head-to-Head Comparison
                </div>
                <h3 className="mt-2.5 text-lg font-bold text-white group-hover:text-amber-300 transition">
                  {pair.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  {pair.subtitle}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-400">
                <span>See Winner &amp; Runtime Table</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section: Fast Comparison Table of All 10 Top Amazon Models */}
      <section className="mt-20">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Quick Reference
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
            10 Popular LiFePO4 Power Stations Compared
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Every model below uses LiFePO4 battery chemistry, with manufacturer cycle ratings of 3,000 to 4,000 cycles. Specs are from manufacturer listings.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/90 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4">Model</th>
                <th className="py-3.5 px-4">Award / Best For</th>
                <th className="py-3.5 px-4">Capacity</th>
                <th className="py-3.5 px-4">AC Output (Surge)</th>
                <th className="py-3.5 px-4">Max Solar</th>
                <th className="py-3.5 px-4">Weight</th>
                <th className="py-3.5 px-4 text-right">Amazon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {POWER_STATIONS.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-slate-800/40 transition"
                >
                  <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                    <div>{s.name}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block rounded bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[11px] font-bold text-amber-300">
                      {s.tierBadge}
                    </span>
                    <div className="mt-1 text-xs text-slate-400 max-w-xs">
                      {s.bestFor}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                    {s.capacityWh.toLocaleString()} Wh
                    {s.expandableMaxWh && (
                      <div className="text-[10px] font-normal text-sky-400">
                        Expands to {s.expandableMaxWh.toLocaleString()}Wh
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-200 whitespace-nowrap">
                    <strong>{s.continuousWatts}W</strong>{" "}
                    <span className="text-xs text-slate-400">
                      ({s.surgeWatts}W)
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                    {s.solarInputMaxWatts}W
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                    {s.weightLbs} lbs
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <a
                      href={getAmazonProductUrl(
                        s.amazonAsin,
                        s.amazonSearchQuery
                      )}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 px-3.5 py-2 text-xs font-extrabold text-slate-950 transition shadow"
                    >
                      Check Price
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

