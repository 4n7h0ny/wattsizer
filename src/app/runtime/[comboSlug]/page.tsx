import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { POWER_STATIONS } from "@/data/powerStations";
import { APPLIANCES, TOP_COMBO_APPLIANCES } from "@/data/appliances";
import {
  calculateApplianceRuntime,
  getSizerRecommendations,
} from "@/lib/calculator";
import PowerStationCard from "@/components/PowerStationCard";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  isIndexableCombo,
  metaDescription,
  pageTitle,
} from "@/lib/seo";
import { SITE_CONFIG } from "@/config/affiliate";
import AccessoryPicks from "@/components/AccessoryPicks";
import JsonLd from "@/components/JsonLd";
import {
  AlertTriangle,
  ArrowLeft,
  BatteryCharging,
  CheckCircle2,
  Lightbulb,
  ShieldAlert,
  Sun,
  Zap,
} from "lucide-react";

interface PageProps {
  params: { comboSlug: string };
}

function parseComboSlug(comboSlug: string) {
  for (const station of POWER_STATIONS) {
    const prefix = `${station.slug}-for-`;
    if (comboSlug.startsWith(prefix)) {
      const appSlug = comboSlug.slice(prefix.length);
      const appliance = APPLIANCES.find((a) => a.slug === appSlug);
      if (appliance) {
        return { station, appliance };
      }
    }
  }
  return null;
}

export function generateStaticParams() {
  const params: { comboSlug: string }[] = [];
  for (const station of POWER_STATIONS) {
    for (const app of TOP_COMBO_APPLIANCES) {
      params.push({ comboSlug: `${station.slug}-for-${app.slug}` });
    }
  }
  return params;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const parsed = parseComboSlug(params.comboSlug);
  if (!parsed) return {};
  const { station, appliance } = parsed;
  const rt = calculateApplianceRuntime(station, appliance);

  const answerSnippet = rt.canRun
    ? `Yes, ~${Math.round(rt.continuousHours)} hrs`
    : "No";

  return {
    title: pageTitle(`Can the ${station.name} Run a ${appliance.shortName}? ${answerSnippet}`),
    alternates: { canonical: `/runtime/${params.comboSlug}` },
    description: metaDescription(`Estimated runtime for a ${appliance.name} (${appliance.runningWatts}W running / ${appliance.surgeWatts}W surge) on the ${station.name} (${station.capacityWh}Wh LiFePO4), based on manufacturer specs.`),
    // Only high-demand pairings are indexed; the rest stay live for visitors.
    robots: isIndexableCombo(station, appliance)
      ? undefined
      : { index: false, follow: true },
  };
}

export default function ComboRuntimePage({ params }: PageProps) {
  const parsed = parseComboSlug(params.comboSlug);
  if (!parsed) {
    notFound();
  }

  const { station, appliance } = parsed;
  const runtime = calculateApplianceRuntime(station, appliance);
  const usableWh = Math.round(station.capacityWh * 0.85);
  const effectiveHourlyWatts = Math.round(
    appliance.runningWatts * appliance.dutyCycle
  );
  const dailyConsumptionWh = Math.round(
    effectiveHourlyWatts * appliance.defaultHoursPerDay
  );

  // Also get the ideal recommended station for side-by-side comparison or upgrade
  const idealRec = getSizerRecommendations({
    dailyConsumptionWh: Math.max(250, dailyConsumptionWh),
    outageDays: 1,
    peakRunningWatts: appliance.runningWatts,
    peakSurgeWatts: appliance.surgeWatts,
    solarReload: false,
  });

  const comparisonAlternative =
    idealRec.bestOverall.id !== station.id
      ? idealRec.bestOverall
      : idealRec.heavyDutyUpgrade;

  const surgeMarginPct = Math.round(
    (station.surgeWatts / appliance.surgeWatts) * 100
  );

  const faqAnswer = runtime.canRun
    ? `Yes. Based on its specs (${station.capacityWh}Wh, ${station.continuousWatts}W continuous / ${station.surgeWatts}W surge), the ${station.name} should run a ${appliance.name.toLowerCase()} for about ${runtime.continuousHours} hours, assuming ~85% inverter efficiency and a ~${effectiveHourlyWatts}W average draw.`
    : `Probably not. A ${appliance.name.toLowerCase()} typically needs ${appliance.runningWatts}W running and ${appliance.surgeWatts}W at startup, which exceeds the ${station.name}'s ${station.continuousWatts}W / ${station.surgeWatts}W rating.`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={faqJsonLd([
          { q: `Can the ${station.name} run a ${appliance.shortName.toLowerCase()}?`, a: faqAnswer },
        ])}
      />
      <JsonLd
        data={breadcrumbJsonLd(SITE_CONFIG.domain, [
          { name: "Runtime Estimates", path: "/runtime" },
          { name: station.name, path: `/reviews/${station.slug}` },
          { name: appliance.shortName, path: `/runtime/${params.comboSlug}` },
        ])}
      />
      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-400 mb-6">
        <Link
          href={`/can-it-run/${appliance.slug}`}
          className="inline-flex items-center gap-1 hover:text-amber-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All {appliance.shortName} Power Stations
        </Link>
        <span>•</span>
        <Link
          href={`/reviews/${station.slug}`}
          className="hover:text-amber-400"
        >
          {station.name} Specs & Runtimes
        </Link>
      </div>

      {/* Hero Verdict Card */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-300">
            {station.brand} × {appliance.category} Runtime Estimate
          </span>
          {runtime.canRun ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-extrabold text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5" />
              WITHIN SPEC (~{runtime.daysFormatted})
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 px-3 py-1 text-xs font-extrabold text-rose-300">
              <ShieldAlert className="h-3.5 w-3.5" />
              EXCEEDS INVERTER RATING
            </span>
          )}
        </div>

        <h1 className="mt-3 text-2xl sm:text-4xl font-black text-white">
          Can the {station.name} Run a {appliance.shortName}?
        </h1>

        <p className="mt-3 max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed">
          {runtime.canRun ? (
            <>
              <strong className="text-emerald-400">Yes.</strong> With{" "}
              <strong className="text-white">
                {station.capacityWh.toLocaleString()}Wh
              </strong>{" "}
              of LiFePO4 battery capacity ({usableWh.toLocaleString()}Wh usable
              after 85% AC inverter conversion) and a{" "}
              <strong className="text-white">
                {station.continuousWatts}W continuous / {station.surgeWatts}W
                surge
              </strong>{" "}
              pure sine wave inverter, the{" "}
              <strong className="text-white">{station.name}</strong> should run a{" "}
              <strong className="text-white">{appliance.name}</strong> for
              approximately{" "}
              <strong className="text-amber-300">
                {runtime.daysFormatted}
              </strong>{" "}
              on a single charge.
            </>
          ) : (
            <>
              <strong className="text-rose-400">No, this load is too big for it.</strong>{" "}
              A <strong className="text-white">{appliance.name}</strong> requires{" "}
              <strong className="text-white">
                {appliance.runningWatts}W continuous ({appliance.surgeWatts}W
                startup surge)
              </strong>
              , which exceeds the{" "}
              <strong className="text-white">
                {station.continuousWatts}W continuous / {station.surgeWatts}W
                surge
              </strong>{" "}
              rating of the {station.name}. Below is a unit whose specs cover a{" "}
              {appliance.shortName}.
            </>
          )}
        </p>

        {/* 4 key numbers */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="text-xs text-slate-400">Estimated Runtime</div>
            <div
              className={`mt-1 text-xl sm:text-2xl font-black ${
                runtime.canRun ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {runtime.canRun ? runtime.daysFormatted : "Overload"}
            </div>
            <div className="mt-0.5 text-[11px] text-slate-400">
              At ~{effectiveHourlyWatts}W avg hourly draw
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="text-xs text-slate-400">Usable Battery Capacity</div>
            <div className="mt-1 text-xl sm:text-2xl font-black text-white">
              {usableWh.toLocaleString()} Wh
            </div>
            <div className="mt-0.5 text-[11px] text-slate-400">
              85% of {station.capacityWh}Wh rated LFP
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="text-xs text-slate-400">Startup Surge Safety</div>
            <div className="mt-1 text-xl sm:text-2xl font-black text-amber-400">
              {station.surgeWatts}W{" "}
              <span className="text-xs font-normal text-slate-400">
                vs {appliance.surgeWatts}W
              </span>
            </div>
            <div className="mt-0.5 text-[11px] text-slate-400">
              {surgeMarginPct}% surge capacity rating
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="text-xs text-slate-400">Max Solar Recharge</div>
            <div className="mt-1 text-xl sm:text-2xl font-black text-sky-400">
              {station.solarInputMaxWatts}W Max
            </div>
            <div className="mt-0.5 text-[11px] text-slate-400">
              Manufacturer max solar input
            </div>
          </div>
        </div>

        {/* Step-by-Step Formula Breakdown */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/90 p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            How We Estimated This Runtime
          </div>
          <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-slate-300">
            <li>
              <strong className="text-white">Usable Watt-Hours:</strong>{" "}
              The {station.name} holds {station.capacityWh}Wh, which yields{" "}
              about <strong className="text-amber-300">{usableWh}Wh</strong> of
              120V AC power, assuming ~15% DC-to-AC inverter loss.
            </li>
            <li>
              <strong className="text-white">
                {appliance.shortName} Duty Cycle:
              </strong>{" "}
              While active, a {appliance.shortName} pulls{" "}
              {appliance.runningWatts}W (with a {appliance.surgeWatts}W startup
              spike). Over a multi-hour period, its{" "}
              {Math.round(appliance.dutyCycle * 100)}% duty cycle averages{" "}
              <strong className="text-emerald-300">
                ~{effectiveHourlyWatts}W per hour
              </strong>{" "}
              (plus ~8W inverter standby overhead).
            </li>
            <li>
              <strong className="text-white">Tip:</strong>{" "}
              {appliance.buyingTip}
            </li>
          </ol>
        </div>
      </div>

      {/* Side-by-Side: This Model vs Top Recommended Alternative/Upgrade */}
      <section className="mt-12">
        <h2 className="text-2xl font-black text-white mb-6">
          Compare With an Alternative
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PowerStationCard
            station={station}
            rankLabel={
              runtime.canRun
                ? `This Model: ~${runtime.daysFormatted} (est.)`
                : `Undersized for ${appliance.shortName}`
            }
            rankColor={runtime.canRun ? "amber" : "slate"}
            dailyLoadWh={dailyConsumptionWh}
            peakWatts={appliance.runningWatts}
          />
          <PowerStationCard
            station={comparisonAlternative}
            rankLabel={
              runtime.canRun
                ? `Top Alternative / Upgrade for ${appliance.shortName}`
                : `Recommended for a ${appliance.shortName}`
            }
            rankColor="emerald"
            dailyLoadWh={dailyConsumptionWh}
            peakWatts={appliance.runningWatts}
          />
        </div>
      </section>

      <AccessoryPicks
        applianceId={appliance.id}
        applianceName={appliance.shortName}
      />

      {/* Cross-Links to Other Appliances for this Station */}
      <section className="mt-14">
        <h3 className="text-lg font-bold text-white mb-3">
          What Else Can the {station.name} Run?
        </h3>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {TOP_COMBO_APPLIANCES.map((otherApp) => {
            const rt = calculateApplianceRuntime(station, otherApp);
            return (
              <Link
                key={otherApp.id}
                href={`/runtime/${station.slug}-for-${otherApp.slug}`}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 px-3.5 py-2.5 text-xs hover:border-amber-500/50 transition"
              >
                <span className="font-semibold text-slate-200">
                  {station.shortName} + {otherApp.shortName}
                </span>
                <span
                  className={`font-bold ${
                    rt.canRun ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {rt.canRun ? `${rt.continuousHours}h` : "Overload"}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Cross-Links to Other Power Stations for this Appliance */}
      <section className="mt-10">
        <h3 className="text-lg font-bold text-white mb-3">
          Compare {appliance.shortName} Runtime on Other Power Stations
        </h3>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
          {POWER_STATIONS.map((otherStation) => {
            const rt = calculateApplianceRuntime(otherStation, appliance);
            return (
              <Link
                key={otherStation.id}
                href={`/runtime/${otherStation.slug}-for-${appliance.slug}`}
                className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-xs hover:border-amber-500/50 transition"
              >
                <span className="font-bold text-white">
                  {otherStation.shortName}
                </span>
                <span className="text-[11px] text-slate-400">
                  {otherStation.capacityWh}Wh • {otherStation.continuousWatts}W
                </span>
                <span
                  className={`mt-1.5 font-extrabold ${
                    rt.canRun ? "text-amber-400" : "text-rose-400"
                  }`}
                >
                  {rt.canRun ? rt.daysFormatted : "Overload"}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

