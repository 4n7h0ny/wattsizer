"use client";

import React, { useState } from "react";
import { PowerStation } from "@/data/powerStations";
import { getAmazonBundleUrl, getAmazonProductUrl } from "@/config/affiliate";
import {
  BatteryCharging,
  CheckCircle2,
  ExternalLink,
  Flame,
  ShieldCheck,
  Sparkles,
  Sun,
  Tag,
  Timer,
  Weight,
  Zap,
} from "lucide-react";

interface PowerStationCardProps {
  station: PowerStation;
  rankLabel?: string;
  rankColor?: "amber" | "emerald" | "blue" | "slate";
  dailyLoadWh?: number;
  peakWatts?: number;
  highlightSolarBundle?: boolean;
}

export default function PowerStationCard({
  station,
  rankLabel,
  rankColor = "amber",
  dailyLoadWh,
  peakWatts,
  highlightSolarBundle = false,
}: PowerStationCardProps) {
  const [showSolarBundle, setShowSolarBundle] = useState(highlightSolarBundle);

  const usableWh = Math.round(station.capacityWh * 0.85);
  const estimatedDays =
    dailyLoadWh && dailyLoadWh > 0
      ? (usableWh / dailyLoadWh).toFixed(1)
      : null;
  const estimatedHours =
    dailyLoadWh && dailyLoadWh > 0
      ? Math.round((usableWh / dailyLoadWh) * 24)
      : null;

  const amazonUrl = showSolarBundle
    ? getAmazonBundleUrl(station.solarBundleSearchQuery)
    : getAmazonProductUrl(station.amazonAsin, station.amazonSearchQuery);

  const displayPrice = showSolarBundle
    ? station.typicalBundlePrice
    : station.typicalAmazonPrice;

  const badgeStyles = {
    amber:
      "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20",
    emerald:
      "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold shadow-lg shadow-emerald-500/20",
    blue: "bg-gradient-to-r from-sky-500 to-blue-600 text-white font-extrabold shadow-lg shadow-sky-500/20",
    slate: "bg-slate-800 text-slate-200 font-bold border border-slate-700",
  }[rankColor];

  return (
    <div
      className={`relative flex flex-col justify-between rounded-2xl border bg-slate-900/90 p-6 transition-all duration-200 hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/5 ${
        rankColor === "amber"
          ? "border-amber-500/60 ring-1 ring-amber-500/30"
          : "border-slate-800"
      }`}
    >
      {/* Top Rank Ribbon */}
      {rankLabel && (
        <div className="mb-4 flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs uppercase tracking-wider ${badgeStyles}`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {rankLabel}
          </span>
          <span className="rounded-full bg-slate-800/90 px-2.5 py-1 text-xs font-medium text-slate-300 border border-slate-700">
            ★ {station.rating} ({station.reviewCountText})
          </span>
        </div>
      )}

      <div>
        {/* Brand & Model Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                {station.brand}
              </span>
              <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                {station.batteryChemistry} • {station.cycleLife.toLocaleString()}{" "}
                Cycles
              </span>
            </div>
            <h3 className="mt-1 text-xl font-bold text-white">
              {station.name}
            </h3>
            <p className="mt-1 text-xs text-slate-400">{station.bestFor}</p>
          </div>
        </div>

        {/* Personalized Runtime Banner (when rendered inside Calculator) */}
        {dailyLoadWh && dailyLoadWh > 0 ? (
          <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Your Custom Load Match
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {peakWatts && station.continuousWatts >= peakWatts
                  ? `Handles ${peakWatts}W Peak Safely`
                  : `${station.continuousWatts}W Output`}
              </span>
            </div>
            <div className="mt-1.5 flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-black text-white">
                  ~{estimatedDays} Days
                </span>
                <span className="ml-2 text-xs text-slate-300">
                  ({estimatedHours} hrs total load support)
                </span>
              </div>
              <span className="text-xs font-semibold text-amber-300">
                {usableWh.toLocaleString()}Wh Usable
              </span>
            </div>
          </div>
        ) : null}

        {/* Core 4 Engineering Specs Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <div className="rounded-xl bg-slate-950/80 p-2.5 border border-slate-800/80">
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <BatteryCharging className="h-3.5 w-3.5 text-amber-400" />
              Capacity
            </div>
            <div className="mt-0.5 text-sm font-bold text-white">
              {station.capacityWh.toLocaleString()} Wh
            </div>
          </div>

          <div className="rounded-xl bg-slate-950/80 p-2.5 border border-slate-800/80">
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Zap className="h-3.5 w-3.5 text-sky-400" />
              AC Output
            </div>
            <div className="mt-0.5 text-sm font-bold text-white">
              {station.continuousWatts.toLocaleString()}W{" "}
              <span className="text-[11px] font-normal text-slate-400">
                ({station.surgeWatts}W surge)
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-950/80 p-2.5 border border-slate-800/80">
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Sun className="h-3.5 w-3.5 text-amber-400" />
              Max Solar
            </div>
            <div className="mt-0.5 text-sm font-bold text-white">
              {station.solarInputMaxWatts}W Input
            </div>
          </div>

          <div className="rounded-xl bg-slate-950/80 p-2.5 border border-slate-800/80">
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Weight className="h-3.5 w-3.5 text-slate-400" />
              Weight / 80%
            </div>
            <div className="mt-0.5 text-sm font-bold text-white">
              {station.weightLbs} lbs • {station.acChargeMinutes80}m
            </div>
          </div>
        </div>

        {/* Summary & Top Pros */}
        <p className="mt-3.5 text-sm leading-relaxed text-slate-300">
          {station.summary}
        </p>

        <ul className="mt-3 space-y-1.5">
          {station.pros.slice(0, 3).map((pro, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-xs text-slate-300"
            >
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Monetization & Bundle Switcher Box */}
      <div className="mt-5 pt-4 border-t border-slate-800">
        {/* 1-Click Amazon Bundle Toggle (Boosts Amazon Order Value from ~$650 to ~$1,000+) */}
        <div className="mb-3 flex items-center justify-between rounded-xl bg-slate-950 p-2 border border-slate-800">
          <button
            type="button"
            onClick={() => setShowSolarBundle(false)}
            className={`flex-1 rounded-lg py-1.5 px-2 text-xs font-semibold transition ${
              !showSolarBundle
                ? "bg-slate-800 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Power Station Only (~${station.typicalAmazonPrice})
          </button>
          <button
            type="button"
            onClick={() => setShowSolarBundle(true)}
            className={`flex-1 flex items-center justify-center gap-1 rounded-lg py-1.5 px-2 text-xs font-semibold transition ${
              showSolarBundle
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow"
                : "text-slate-400 hover:text-amber-300"
            }`}
          >
            <Sun className="h-3.5 w-3.5 text-amber-400" />
            +Solar Bundle (~${station.typicalBundlePrice})
          </button>
        </div>

        {showSolarBundle && (
          <p className="mb-2.5 text-center text-[11px] font-medium text-amber-300/90">
            Includes: {station.name} {station.recommendedSolarPanelText} on
            Amazon
          </p>
        )}

        {/* Coupon Curiosity Hook */}
        <div className="mb-3 flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1 font-medium text-emerald-400">
            <Tag className="h-3.5 w-3.5" />
            {station.amazonCouponHint}
          </span>
          <span className="text-slate-400">
            Est.{" "}
            <strong className="text-white text-sm">
              ${displayPrice.toLocaleString()}
            </strong>
          </span>
        </div>

        {/* Primary High-Converting Amazon Associates Button */}
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 px-5 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:brightness-110 active:scale-[0.99]"
        >
          <span>
            {showSolarBundle
              ? `Check Solar Bundle Price on Amazon`
              : `Check Today's Price & Coupons on Amazon`}
          </span>
          <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>

        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-slate-400" /> Prime Eligible &
            Manufacturer Warranty
          </span>
          <span>100% Amazon Checkout</span>
        </div>
      </div>
    </div>
  );
}

