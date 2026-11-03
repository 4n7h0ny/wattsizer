import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { APPLIANCES } from "@/data/appliances";
import { ArrowRight, Calculator, Zap } from "lucide-react";

export const metadata: Metadata = {
  title:
    "Appliance Runtime & Sizing Guides | What Size Power Station Do I Need?",
  description:
    "See estimated portable power station runtimes, running watts, and startup surge requirements for refrigerators, CPAP machines, sump pumps, Starlink, microwaves, space heaters, and more.",
};

export default function CanItRunIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Appliance-by-Appliance Runtime Charts
        </span>
        <h1 className="mt-1 text-3xl sm:text-4xl font-black text-white">
          What Size Portable Power Station Runs Your Appliance?
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
          Select any household, medical, or camping appliance below to see its
          typical hourly watt draw, motor startup surge, and estimated runtime
          hours across Jackery, EcoFlow, Anker SOLIX, and BLUETTI battery backups.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {APPLIANCES.map((app) => {
          const effectiveW = Math.round(app.runningWatts * app.dutyCycle);
          const dailyWh = Math.round(effectiveW * app.defaultHoursPerDay);
          return (
            <Link
              key={app.id}
              href={`/can-it-run/${app.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-6 hover:border-amber-500/60 hover:bg-slate-900 transition"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-slate-800 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-300">
                    {app.category}
                  </span>
                  <span className="rounded-md bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 text-xs font-bold text-amber-300">
                    {app.runningWatts}W Run / {app.surgeWatts}W Surge
                  </span>
                </div>
                <h2 className="mt-3 text-xl font-bold text-white group-hover:text-amber-300 transition">
                  {app.name}
                </h2>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  {app.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400">Typical Daily Need: </span>
                  <strong className="text-white">{dailyWh} Wh/day</strong>
                </div>
                <span className="inline-flex items-center gap-1 font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                  View Runtime Chart
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">
            Running Multiple Appliances at the Same Time?
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            Use our interactive multi-appliance blackout calculator to combine your refrigerator, Wi-Fi router, CPAP, and lights into a single sizing plan.
          </p>
        </div>
        <Link
          href="/#calculator"
          className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 px-5 py-3 text-xs font-extrabold text-slate-950 transition shadow"
        >
          <Calculator className="h-4 w-4" />
          Open Multi-Appliance Calculator
        </Link>
      </div>
    </div>
  );
}

