import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { POWER_STATIONS } from "@/data/powerStations";
import { APPLIANCES, TOP_COMBO_APPLIANCES } from "@/data/appliances";
import { calculateApplianceRuntime } from "@/lib/calculator";
import PowerStationCard from "@/components/PowerStationCard";
import { getAmazonBundleUrl, getAmazonProductUrl } from "@/config/affiliate";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Sun,
  XCircle,
  Zap,
} from "lucide-react";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return POWER_STATIONS.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const station = POWER_STATIONS.find((s) => s.slug === params.slug);
  if (!station) return {};
  return {
    title: `${station.name} Review & 22-Appliance Runtime Chart (2026) | WattSizer`,
    description: `How long will the ${station.name} (${station.capacityWh}Wh LiFePO4, ${station.continuousWatts}W / ${station.surgeWatts}W surge) run a refrigerator, CPAP, pellet stove, sump pump, and Starlink? Full specs and Amazon price check.`,
  };
}

export default function StationReviewPage({ params }: PageProps) {
  const station = POWER_STATIONS.find((s) => s.slug === params.slug);
  if (!station) {
    notFound();
  }

  const usableWh = Math.round(station.capacityWh * 0.85);
  const amazonUrl = getAmazonProductUrl(
    station.amazonAsin,
    station.amazonSearchQuery
  );
  const bundleUrl = getAmazonBundleUrl(station.solarBundleSearchQuery);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/power-stations"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-amber-400 mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to All LiFePO4 Power Stations
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-8">
            <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-300">
              {station.tierBadge} • {station.batteryChemistry}
            </span>
            <h1 className="mt-3 text-2xl sm:text-4xl font-black text-white">
              {station.name}: Engineering Review &amp; Appliance Runtime Chart
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              {station.summary}
            </p>

            {/* Pros & Cons */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  Why Buy the {station.shortName}
                </div>
                <ul className="space-y-2 text-xs text-slate-200">
                  {station.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">
                  Limitations to Know
                </div>
                <ul className="space-y-2 text-xs text-slate-200">
                  {station.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <XCircle className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3.5 text-xs sm:text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-110 transition"
              >
                Check {station.shortName} Price on Amazon (~$
                {station.typicalAmazonPrice})
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href={bundleUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-5 py-3.5 text-xs sm:text-sm font-bold text-amber-300 hover:bg-amber-500/20 transition"
              >
                <Sun className="h-4 w-4 text-amber-400" />
                View +Solar Panel Bundle (~${station.typicalBundlePrice})
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <PowerStationCard
            station={station}
            rankLabel={station.tierBadge}
            rankColor="amber"
          />
        </div>
      </div>

      {/* 22-Appliance Runtime Table */}
      <section className="mt-14">
        <h2 className="text-2xl font-black text-white mb-2">
          Complete {station.name} Appliance Runtime Chart (All 22 Loads)
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mb-5">
          Calculated using {usableWh.toLocaleString()}Wh net usable AC capacity
          (85% inverter efficiency) and real compressor/thermostat duty cycles.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4">Appliance</th>
                <th className="py-3.5 px-4">Running / Surge Watts</th>
                <th className="py-3.5 px-4">Avg Hourly Draw</th>
                <th className="py-3.5 px-4">
                  {station.shortName} Estimated Runtime
                </th>
                <th className="py-3.5 px-4 text-right">Detailed Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {APPLIANCES.map((app) => {
                const rt = calculateApplianceRuntime(station, app);
                const hasDedicatedCombo = Boolean(app.isTopComboTarget);
                return (
                  <tr key={app.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-bold text-white">
                      {app.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {app.runningWatts}W ({app.surgeWatts}W Surge)
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      ~{rt.effectiveHourlyWatts} Wh/hr
                    </td>
                    <td className="py-3.5 px-4 font-bold">
                      {rt.canRun ? (
                        <span className="text-emerald-400">
                          {rt.daysFormatted}
                        </span>
                      ) : (
                        <span className="text-rose-400 text-xs">
                          {rt.overloadReason}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={
                          hasDedicatedCombo
                            ? `/runtime/${station.slug}-for-${app.slug}`
                            : `/can-it-run/${app.slug}`
                        }
                        className="text-xs font-bold text-amber-400 hover:underline"
                      >
                        Math Breakdown →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

