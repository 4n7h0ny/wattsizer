import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { APPLIANCES } from "@/data/appliances";
import { POWER_STATIONS } from "@/data/powerStations";
import {
  calculateApplianceRuntime,
  getSizerRecommendations,
} from "@/lib/calculator";
import PowerStationCard from "@/components/PowerStationCard";
import { getAmazonProductUrl } from "@/config/affiliate";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  ShieldAlert,
  Zap,
} from "lucide-react";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return APPLIANCES.map((app) => ({ slug: app.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const app = APPLIANCES.find((a) => a.slug === params.slug);
  if (!app) return {};
  return {
    title: `${app.seoTitle} | WattSizer Runtime Estimates`,
    description: `${app.seoSubtitle} Compare estimated runtime for ${app.name} (${app.runningWatts}W running / ${app.surgeWatts}W surge) across EcoFlow, Jackery, Anker SOLIX, and BLUETTI.`,
  };
}

export default function ApplianceRuntimePage({ params }: PageProps) {
  const appliance = APPLIANCES.find((a) => a.slug === params.slug);
  if (!appliance) {
    notFound();
  }

  const effectiveHourlyWatts = Math.round(
    appliance.runningWatts * appliance.dutyCycle
  );
  const dailyConsumptionWh = Math.round(
    effectiveHourlyWatts * appliance.defaultHoursPerDay
  );

  const recommendations = getSizerRecommendations({
    dailyConsumptionWh: Math.max(250, dailyConsumptionWh),
    outageDays: 1,
    peakRunningWatts: appliance.runningWatts,
    peakSurgeWatts: appliance.surgeWatts,
    solarReload: false,
  });

  const stationRuntimes = POWER_STATIONS.map((station) => ({
    station,
    runtime: calculateApplianceRuntime(station, appliance),
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/can-it-run"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-amber-400 mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to All Appliance Sizing Guides
      </Link>

      {/* SEO Hero & Wattage Telemetry */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-300">
          <Zap className="h-3.5 w-3.5" />
          <span>{appliance.category} • Estimated Runtimes</span>
        </div>

        <h1 className="mt-3 text-2xl sm:text-4xl font-black text-white">
          {appliance.seoTitle}
        </h1>
        <p className="mt-3 max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed">
          {appliance.seoSubtitle}
        </p>

        {/* 4 key metrics for this appliance */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="text-xs text-slate-400">Active Running Watts</div>
            <div className="mt-1 text-2xl font-black text-white">
              {appliance.runningWatts}W
            </div>
            <div className="mt-0.5 text-[11px] text-slate-400">
              Continuous inverter load
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="text-xs text-slate-400">Peak Startup Surge</div>
            <div className="mt-1 text-2xl font-black text-amber-400">
              {appliance.surgeWatts}W
            </div>
            <div className="mt-0.5 text-[11px] text-slate-400">
              Split-second motor spike
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="text-xs text-slate-400">
              Effective Hourly Draw ({Math.round(appliance.dutyCycle * 100)}% Cycle)
            </div>
            <div className="mt-1 text-2xl font-black text-emerald-400">
              ~{effectiveHourlyWatts} Wh/hr
            </div>
            <div className="mt-0.5 text-[11px] text-slate-400">
              Real-world average drain
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4">
            <div className="text-xs font-semibold text-amber-200">
              Daily Energy ({appliance.defaultHoursPerDay} hrs/day)
            </div>
            <div className="mt-1 text-2xl font-black text-white">
              {dailyConsumptionWh.toLocaleString()} Wh
            </div>
            <div className="mt-0.5 text-[11px] text-amber-200/80">
              Min. {recommendations.recommendedRatedWh}Wh battery recommended
            </div>
          </div>
        </div>

        {/* Pro Tip & Common Mistake Callout Boxes */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Lightbulb className="h-4 w-4" />
              Pro Sizing Tip for {appliance.shortName}
            </div>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
              {appliance.buyingTip}
            </p>
          </div>

          <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
              <AlertTriangle className="h-4 w-4" />
              #1 Buyer Mistake to Avoid
            </div>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
              {appliance.commonMistake}
            </p>
          </div>
        </div>
      </div>

      {/* Top 3 Recommended Power Stations for This Appliance */}
      <section className="mt-12">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Top 3 Matches by Spec
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
            Best Portable Power Stations for a {appliance.shortName}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Each unit below is rated above the estimated {appliance.surgeWatts}W
            startup surge, based on manufacturer specs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <PowerStationCard
            station={recommendations.bestValue}
            rankLabel={`Best Budget for ${appliance.shortName}`}
            rankColor="emerald"
            dailyLoadWh={dailyConsumptionWh}
            peakWatts={appliance.runningWatts}
          />
          <PowerStationCard
            station={recommendations.bestOverall}
            rankLabel={`Best Overall for ${appliance.shortName}`}
            rankColor="amber"
            dailyLoadWh={dailyConsumptionWh}
            peakWatts={appliance.runningWatts}
          />
          <PowerStationCard
            station={recommendations.heavyDutyUpgrade}
            rankLabel="Multi-Day / Heavy-Duty Pick"
            rankColor="blue"
            dailyLoadWh={dailyConsumptionWh}
            peakWatts={appliance.runningWatts}
          />
        </div>
      </section>

      {/* Complete Runtime Chart Across All 10 Power Stations */}
      <section className="mt-16">
        <div className="mb-5">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Complete Runtime Comparison Table
          </span>
          <h2 className="mt-1 text-2xl font-black text-white">
            How Many Hours Will Each Power Station Run a {appliance.shortName}?
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Calculated using 85% real-world AC inverter efficiency and a{" "}
            {Math.round(appliance.dutyCycle * 100)}% duty cycle (~
            {effectiveHourlyWatts}W average hourly consumption).
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/90 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4">Power Station</th>
                <th className="py-3.5 px-4">Battery Capacity</th>
                <th className="py-3.5 px-4">Inverter Output</th>
                <th className="py-3.5 px-4">
                  Estimated {appliance.shortName} Runtime
                </th>
                <th className="py-3.5 px-4 text-right">Amazon Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {stationRuntimes.map(({ station, runtime }) => (
                <tr key={station.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                    <div>{station.name}</div>
                    <div className="text-[11px] font-normal text-slate-400">
                      {station.tierBadge}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-200 whitespace-nowrap">
                    <strong>{station.capacityWh.toLocaleString()} Wh</strong>
                    <span className="ml-1 text-xs text-slate-400">
                      ({Math.round(station.capacityWh * 0.85)}Wh usable)
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-200 whitespace-nowrap">
                    {station.continuousWatts}W{" "}
                    <span className="text-xs text-slate-400">
                      ({station.surgeWatts}W surge)
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {runtime.canRun ? (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-xs font-extrabold text-emerald-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        {runtime.daysFormatted}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-rose-500/15 border border-rose-500/30 px-2.5 py-1 text-xs font-semibold text-rose-300">
                        <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
                        {runtime.overloadReason}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <a
                      href={getAmazonProductUrl(
                        station.amazonAsin,
                        station.amazonSearchQuery
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

      {/* Internal Links to Other Appliances */}
      <section className="mt-16">
        <h3 className="text-lg font-bold text-white mb-4">
          Check Runtime Charts for Other Common Appliances
        </h3>
        <div className="flex flex-wrap gap-2">
          {APPLIANCES.filter((a) => a.id !== appliance.id).map((other) => (
            <Link
              key={other.id}
              href={`/can-it-run/${other.slug}`}
              className="rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:border-amber-500/50 hover:text-amber-300 transition"
            >
              {other.shortName} ({other.runningWatts}W) →
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

