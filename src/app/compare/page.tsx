"use client";

import React, { useState } from "react";
import Link from "next/link";
import { COMPARISON_PAIRS, POWER_STATIONS } from "@/data/powerStations";
import { APPLIANCES } from "@/data/appliances";
import { calculateApplianceRuntime } from "@/lib/calculator";
import PowerStationCard from "@/components/PowerStationCard";
import { ArrowRight, Scale, Sparkles, Trophy } from "lucide-react";

export default function CompareIndexPage() {
  const [stationAId, setStationAId] = useState("ecoflow-delta-2");
  const [stationBId, setStationBId] = useState("jackery-1000-v2");

  const stationA =
    POWER_STATIONS.find((s) => s.id === stationAId) || POWER_STATIONS[2];
  const stationB =
    POWER_STATIONS.find((s) => s.id === stationBId) || POWER_STATIONS[3];

  const keyAppliances = APPLIANCES.slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Interactive Head-to-Head Lab
        </span>
        <h1 className="mt-1 text-3xl sm:text-4xl font-black text-white">
          Compare Any Two Portable Power Stations Side-by-Side
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300">
          Select any two models below to compare real-world appliance runtimes,
          inverter surge ratings, solar charge speeds, and current Amazon prices.
        </p>
      </div>

      {/* Model Selectors */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Contender #1
          </label>
          <select
            value={stationAId}
            onChange={(e) => setStationAId(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-bold text-white focus:border-amber-400 focus:outline-none"
          >
            {POWER_STATIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.capacityWh}Wh / {s.continuousWatts}W) — ~$
                {s.typicalAmazonPrice}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-sky-400">
            Contender #2
          </label>
          <select
            value={stationBId}
            onChange={(e) => setStationBId(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-bold text-white focus:border-amber-400 focus:outline-none"
          >
            {POWER_STATIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.capacityWh}Wh / {s.continuousWatts}W) — ~$
                {s.typicalAmazonPrice}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Product Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PowerStationCard
          station={stationA}
          rankLabel={
            stationA.capacityWh >= stationB.capacityWh
              ? "Higher / Equal Capacity"
              : "Lighter / Compact Contender"
          }
          rankColor="amber"
        />
        <PowerStationCard
          station={stationB}
          rankLabel={
            stationB.weightLbs < stationA.weightLbs
              ? `Lighter by ${(stationA.weightLbs - stationB.weightLbs).toFixed(1)} lbs`
              : "Heavy-Duty Contender"
          }
          rankColor="blue"
        />
      </div>

      {/* Head-to-Head Spec & Appliance Runtime Table */}
      <div className="mt-12 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950 text-xs font-bold uppercase tracking-wider text-slate-400">
              <th className="py-4 px-5">Spec / Appliance Runtime</th>
              <th className="py-4 px-5 text-amber-400">{stationA.name}</th>
              <th className="py-4 px-5 text-sky-400">{stationB.name}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70">
            <tr>
              <td className="py-3.5 px-5 font-semibold text-slate-300">
                Battery Capacity (Rated)
              </td>
              <td className="py-3.5 px-5 font-bold text-white">
                {stationA.capacityWh.toLocaleString()} Wh
              </td>
              <td className="py-3.5 px-5 font-bold text-white">
                {stationB.capacityWh.toLocaleString()} Wh
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-5 font-semibold text-slate-300">
                Continuous AC Output (Peak Surge)
              </td>
              <td className="py-3.5 px-5 font-bold text-white">
                {stationA.continuousWatts}W ({stationA.surgeWatts}W Surge)
              </td>
              <td className="py-3.5 px-5 font-bold text-white">
                {stationB.continuousWatts}W ({stationB.surgeWatts}W Surge)
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-5 font-semibold text-slate-300">
                Battery Lifespan (LiFePO4 Cycles)
              </td>
              <td className="py-3.5 px-5 text-slate-200">
                {stationA.cycleLife.toLocaleString()} cycles to 70%+
              </td>
              <td className="py-3.5 px-5 text-slate-200">
                {stationB.cycleLife.toLocaleString()} cycles to 70%+
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-5 font-semibold text-slate-300">
                Max Solar Input
              </td>
              <td className="py-3.5 px-5 text-slate-200">
                {stationA.solarInputMaxWatts}W
              </td>
              <td className="py-3.5 px-5 text-slate-200">
                {stationB.solarInputMaxWatts}W
              </td>
            </tr>
            <tr>
              <td className="py-3.5 px-5 font-semibold text-slate-300">
                Weight
              </td>
              <td className="py-3.5 px-5 text-slate-200">
                {stationA.weightLbs} lbs
              </td>
              <td className="py-3.5 px-5 text-slate-200">
                {stationB.weightLbs} lbs
              </td>
            </tr>
            {keyAppliances.map((app) => {
              const runA = calculateApplianceRuntime(stationA, app);
              const runB = calculateApplianceRuntime(stationB, app);
              return (
                <tr key={app.id} className="bg-slate-950/40">
                  <td className="py-3.5 px-5 font-semibold text-slate-300">
                    Runtime: {app.shortName} ({app.runningWatts}W)
                  </td>
                  <td className="py-3.5 px-5 font-bold text-emerald-400">
                    {runA.canRun ? runA.daysFormatted : runA.overloadReason}
                  </td>
                  <td className="py-3.5 px-5 font-bold text-emerald-400">
                    {runB.canRun ? runB.daysFormatted : runB.overloadReason}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Curated Deep-Dive Matchups */}
      <section className="mt-16">
        <h2 className="text-2xl font-black text-white mb-4">
          In-Depth Editor Showdowns
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {COMPARISON_PAIRS.map((pair) => (
            <Link
              key={pair.slug}
              href={`/compare/${pair.slug}`}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-amber-500/50 transition"
            >
              <div className="text-xs font-bold text-amber-400">
                Full Verdict &amp; Runtime Breakdown
              </div>
              <h3 className="mt-1 text-lg font-bold text-white group-hover:text-amber-300">
                {pair.title}
              </h3>
              <p className="mt-1.5 text-xs text-slate-400">{pair.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

