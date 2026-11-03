import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { POWER_STATIONS } from "@/data/powerStations";
import { TOP_COMBO_APPLIANCES } from "@/data/appliances";
import { calculateApplianceRuntime } from "@/lib/calculator";
import { ArrowRight, CheckCircle2, ShieldAlert, Zap } from "lucide-react";

export const metadata: Metadata = {
  title:
    "Power Station × Appliance Runtime Matrix (80+ Tested Combinations) | WattSizer",
  description:
    "Browse exact runtime hours and surge compatibility for every EcoFlow, Jackery, Anker SOLIX, and BLUETTI power station paired with refrigerators, pellet stoves, CPAPs, sump pumps, gas furnaces, and Starlink.",
};

export default function RuntimeMatrixIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          80+ Model-by-Appliance Engineering Reports
        </span>
        <h1 className="mt-1 text-3xl sm:text-4xl font-black text-white">
          Power Station × Appliance Runtime Directory
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300">
          Click any specific model + appliance combination below for a dedicated
          engineering breakdown of usable Watt-hours, compressor duty cycles,
          startup surge margins, and solar recharging math.
        </p>
      </div>

      <div className="mt-10 space-y-10">
        {POWER_STATIONS.map((station) => (
          <div
            key={station.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {station.brand} • {station.capacityWh}Wh ({station.continuousWatts}W /{" "}
                  {station.surgeWatts}W Surge)
                </span>
                <h2 className="text-xl font-black text-white mt-0.5">
                  <Link
                    href={`/reviews/${station.slug}`}
                    className="hover:text-amber-400 transition"
                  >
                    {station.name} Runtime Guides →
                  </Link>
                </h2>
              </div>
              <Link
                href={`/reviews/${station.slug}`}
                className="text-xs font-bold text-amber-400 hover:underline"
              >
                Full {station.shortName} Review &amp; 22-Appliance Chart →
              </Link>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {TOP_COMBO_APPLIANCES.map((app) => {
                const rt = calculateApplianceRuntime(station, app);
                const comboSlug = `${station.slug}-for-${app.slug}`;
                return (
                  <Link
                    key={comboSlug}
                    href={`/runtime/${comboSlug}`}
                    className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 hover:border-amber-500/50 transition"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300">
                        {station.shortName} + {app.shortName}
                      </div>
                      <div className="mt-1 text-[11px] text-slate-400">
                        {app.runningWatts}W Run • {app.surgeWatts}W Surge
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      {rt.canRun ? (
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {rt.daysFormatted}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-semibold text-rose-400">
                          <ShieldAlert className="h-3.5 w-3.5" />
                          Overload
                        </span>
                      )}
                      <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

