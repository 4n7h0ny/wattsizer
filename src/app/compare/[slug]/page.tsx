import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { metaDescription, pageTitle } from "@/lib/seo";
import { COMPARISON_PAIRS, POWER_STATIONS } from "@/data/powerStations";
import { APPLIANCES } from "@/data/appliances";
import { calculateApplianceRuntime } from "@/lib/calculator";
import PowerStationCard from "@/components/PowerStationCard";
import { ArrowLeft, Award, Scale, ShieldCheck, Trophy } from "lucide-react";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return COMPARISON_PAIRS.map((pair) => ({ slug: pair.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const pair = COMPARISON_PAIRS.find((p) => p.slug === params.slug);
  if (!pair) return {};
  return {
    title: pageTitle(`${pair.title}: Which to Buy?`),
    description: metaDescription(
      `${pair.subtitle} Side-by-side runtime, surge, weight and solar input.`
    ),
    alternates: { canonical: `/compare/${pair.slug}` },
  };
}

export default function ComparisonDetailPage({ params }: PageProps) {
  const pair = COMPARISON_PAIRS.find((p) => p.slug === params.slug);
  if (!pair) {
    notFound();
  }

  const stationA = POWER_STATIONS.find((s) => s.id === pair.stationAId);
  const stationB = POWER_STATIONS.find((s) => s.id === pair.stationBId);

  if (!stationA || !stationB) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/compare"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-amber-400 mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Interactive Comparison Tool
      </Link>

      {/* Hero Verdict Box */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-300">
          <Scale className="h-3.5 w-3.5" />
          <span>Spec-Based Comparison</span>
        </div>

        <h1 className="mt-3 text-2xl sm:text-4xl font-black text-white">
          {pair.title}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl">
          {pair.subtitle}
        </p>

        {/* 3 Category Winners */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Trophy className="h-4 w-4" />
              Winner for Home Blackouts
            </div>
            <div className="mt-1.5 text-sm font-bold text-white">
              {pair.winnerForBlackouts}
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Award className="h-4 w-4" />
              Winner for Portability
            </div>
            <div className="mt-1.5 text-sm font-bold text-white">
              {pair.winnerForPortability}
            </div>
          </div>

          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              Overall Edge
            </div>
            <div className="mt-1.5 text-sm font-bold text-white">
              {pair.overallEdge}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            The 30-Second Bottom Line
          </div>
          <p className="mt-1.5 text-sm text-slate-200 leading-relaxed">
            {pair.verdictSummary}
          </p>
        </div>
      </div>

      {/* Side-by-Side Product Cards with Amazon CTAs */}
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PowerStationCard
          station={stationA}
          rankLabel={stationA.tierBadge}
          rankColor="amber"
        />
        <PowerStationCard
          station={stationB}
          rankLabel={stationB.tierBadge}
          rankColor="emerald"
        />
      </div>

      {/* Appliance Runtime Comparison Table */}
      <section className="mt-14">
        <h2 className="text-2xl font-black text-white mb-4">
          Real-World Appliance Runtime Comparison: {stationA.shortName} vs.{" "}
          {stationB.shortName}
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-5">Household / Off-Grid Appliance</th>
                <th className="py-4 px-5">Wattage (Surge)</th>
                <th className="py-4 px-5 text-amber-400">{stationA.name}</th>
                <th className="py-4 px-5 text-emerald-400">{stationB.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {APPLIANCES.map((app) => {
                const runA = calculateApplianceRuntime(stationA, app);
                const runB = calculateApplianceRuntime(stationB, app);
                return (
                  <tr key={app.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-5 font-bold text-white">
                      <Link
                        href={`/can-it-run/${app.slug}`}
                        className="hover:text-amber-400"
                      >
                        {app.shortName}
                      </Link>
                    </td>
                    <td className="py-3.5 px-5 text-slate-400">
                      {app.runningWatts}W ({app.surgeWatts}W)
                    </td>
                    <td className="py-3.5 px-5 font-bold text-white">
                      {runA.canRun ? (
                        <span className="text-amber-300">
                          {runA.daysFormatted}
                        </span>
                      ) : (
                        <span className="text-rose-400 text-xs">
                          {runA.overloadReason}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 font-bold text-white">
                      {runB.canRun ? (
                        <span className="text-emerald-300">
                          {runB.daysFormatted}
                        </span>
                      ) : (
                        <span className="text-rose-400 text-xs">
                          {runB.overloadReason}
                        </span>
                      )}
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

