"use client";

import React, { useMemo, useState } from "react";
import { POWER_STATIONS, PowerBrand } from "@/data/powerStations";
import PowerStationCard from "@/components/PowerStationCard";
import { Filter, Sparkles } from "lucide-react";

const BRANDS: ("All" | PowerBrand)[] = [
  "All",
  "EcoFlow",
  "Jackery",
  "Anker SOLIX",
  "BLUETTI",
];

const TIERS = [
  { id: "all", label: "All Capacities" },
  { id: "compact", label: "Compact (< 800Wh)" },
  { id: "1000wh", label: "1,000Wh Class (Most Popular)" },
  { id: "2000wh", label: "2,000Wh–3,600Wh+ (Whole Home / RV)" },
];

export default function AllPowerStationsPage() {
  const [selectedBrand, setSelectedBrand] = useState<"All" | PowerBrand>("All");
  const [selectedTier, setSelectedTier] = useState<string>("all");

  const filtered = useMemo(() => {
    return POWER_STATIONS.filter((s) => {
      if (selectedBrand !== "All" && s.brand !== selectedBrand) return false;
      if (selectedTier === "compact" && s.capacityWh >= 800) return false;
      if (
        selectedTier === "1000wh" &&
        (s.capacityWh < 800 || s.capacityWh > 1500)
      )
        return false;
      if (selectedTier === "2000wh" && s.capacityWh < 1500) return false;
      return true;
    });
  }, [selectedBrand, selectedTier]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          LiFePO4 Power Station Directory
        </span>
        <h1 className="mt-1 text-3xl sm:text-4xl font-black text-white">
          Best Portable Power Stations &amp; Solar Generators on Amazon (2026)
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300">
          Filter by brand or battery capacity tier. Every model below uses safe
          LiFePO4 battery chemistry (3,000–6,500+ cycles) and includes a 1-click
          toggle to compare standalone vs. Solar Panel Bundle pricing on Amazon.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Filter by Brand
          </div>
          <div className="flex flex-wrap gap-1.5">
            {BRANDS.map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => setSelectedBrand(brand)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  selectedBrand === brand
                    ? "bg-amber-400 text-slate-950"
                    : "bg-slate-950 text-slate-300 border border-slate-800 hover:text-white"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Filter by Capacity Class
          </div>
          <div className="flex flex-wrap gap-1.5">
            {TIERS.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTier(tier.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  selectedTier === tier.id
                    ? "bg-emerald-400 text-slate-950"
                    : "bg-slate-950 text-slate-300 border border-slate-800 hover:text-white"
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((station) => (
          <div key={station.id} id={station.slug}>
            <PowerStationCard
              station={station}
              rankLabel={station.tierBadge}
              rankColor={
                station.id === "ecoflow-delta-2"
                  ? "amber"
                  : station.capacityWh >= 2000
                  ? "blue"
                  : "emerald"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

