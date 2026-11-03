"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  APPLIANCES,
  Appliance,
  ApplianceCategory,
  SCENARIO_PRESETS,
} from "@/data/appliances";
import { getSizerRecommendations } from "@/lib/calculator";
import PowerStationCard from "@/components/PowerStationCard";
import { getAmazonProductUrl } from "@/config/affiliate";
import {
  AlertTriangle,
  Link2,
  BatteryCharging,
  Check,
  ExternalLink,
  Info,
  Layers,
  Plus,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Trash2,
  Zap,
} from "lucide-react";

interface SelectedApplianceState {
  applianceId: string;
  hoursPerDay: number;
  quantity: number;
}

interface CustomApplianceItem {
  id: string;
  name: string;
  watts: number;
  surgeWatts: number;
  hoursPerDay: number;
}

/**
 * Calculator state is mirrored into the URL (?a=id.hours.qty,...&d=days&s=1&c=name~W~h)
 * so people can share their exact setup, e.g. when answering a Reddit question.
 */
function encodeShareQuery(
  items: SelectedApplianceState[],
  custom: CustomApplianceItem[],
  days: number,
  solar: boolean
): string {
  const params = new URLSearchParams();
  if (items.length)
    params.set(
      "a",
      items.map((i) => `${i.applianceId}.${i.hoursPerDay}.${i.quantity}`).join(",")
    );
  if (custom.length)
    params.set(
      "c",
      custom.map((c) => `${c.name.replace(/[~,]/g, " ")}~${c.watts}~${c.hoursPerDay}`).join(",")
    );
  params.set("d", String(days));
  if (solar) params.set("s", "1");
  return params.toString();
}

function decodeShareQuery(search: string) {
  const params = new URLSearchParams(search);
  if (!params.has("a") && !params.has("c")) return null;
  const items: SelectedApplianceState[] = (params.get("a") || "")
    .split(",")
    .map((chunk) => {
      const [applianceId, h, q] = chunk.split(".");
      if (!APPLIANCES.some((a) => a.id === applianceId)) return null;
      return {
        applianceId,
        hoursPerDay: Math.max(0.1, Math.min(24, Number(h) || 1)),
        quantity: Math.max(1, Math.min(10, Math.round(Number(q) || 1))),
      };
    })
    .filter((i): i is SelectedApplianceState => i !== null);
  const custom: CustomApplianceItem[] = (params.get("c") || "")
    .split(",")
    .map((chunk, idx) => {
      const [name, w, h] = chunk.split("~");
      const watts = Number(w);
      const hours = Number(h);
      if (!name || !(watts > 0) || !(hours > 0)) return null;
      return {
        id: `custom-shared-${idx}`,
        name: name.slice(0, 40),
        watts: Math.min(watts, 10000),
        surgeWatts: Math.round(Math.min(watts, 10000) * 1.25),
        hoursPerDay: Math.min(24, hours),
      };
    })
    .filter((c): c is CustomApplianceItem => c !== null);
  const days = Math.max(1, Math.min(5, Number(params.get("d")) || 1));
  return { items, custom, days, solar: params.get("s") === "1" };
}

const CATEGORIES: ("All" | ApplianceCategory)[] = [
  "All",
  "Kitchen & Food",
  "Home Safety & Climate",
  "Medical & Sleep",
  "Work & Internet",
  "Camping & Outdoors",
];

export default function InteractiveSizer() {
  const defaultPreset = SCENARIO_PRESETS[0];
  const [activePresetId, setActivePresetId] = useState<string>(defaultPreset.id);
  const [selectedItems, setSelectedItems] = useState<SelectedApplianceState[]>(
    defaultPreset.items
  );
  const [customItems, setCustomItems] = useState<CustomApplianceItem[]>([]);
  const [outageDays, setOutageDays] = useState<number>(defaultPreset.outageDays);
  const [solarReload, setSolarReload] = useState<boolean>(
    defaultPreset.solarReload
  );
  const [activeCategory, setActiveCategory] = useState<"All" | ApplianceCategory>("All");

  // Custom appliance form state
  const [customName, setCustomName] = useState("");
  const [customWatts, setCustomWatts] = useState("");
  const [customHours, setCustomHours] = useState("2");

  const [linkCopied, setLinkCopied] = useState(false);

  // Mobile: show a sticky "best match" bar while the calculator is on screen,
  // since the results panel sits far below the appliance picker on phones.
  const sectionRef = useRef<HTMLElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [calcInView, setCalcInView] = useState(false);
  const [resultInView, setResultInView] = useState(false);
  useEffect(() => {
    const watch = (el: Element | null, set: (v: boolean) => void) => {
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => set(entry.isIntersecting));
      obs.observe(el);
      return obs;
    };
    const a = watch(sectionRef.current, setCalcInView);
    const b = watch(resultRef.current, setResultInView);
    return () => {
      a?.disconnect();
      b?.disconnect();
    };
  }, []);

  // Restore a shared setup from the URL on first load
  useEffect(() => {
    const shared = decodeShareQuery(window.location.search);
    if (!shared) return;
    setActivePresetId("custom");
    setSelectedItems(shared.items);
    setCustomItems(shared.custom);
    setOutageDays(shared.days);
    setSolarReload(shared.solar);
  }, []);

  const copyShareLink = async () => {
    const query = encodeShareQuery(selectedItems, customItems, outageDays, solarReload);
    const url = `${window.location.origin}/?${query}#calculator`;
    window.history.replaceState(null, "", `/?${query}#calculator`);
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  const applyPreset = (presetId: string) => {
    const found = SCENARIO_PRESETS.find((p) => p.id === presetId);
    if (!found) return;
    setActivePresetId(found.id);
    setSelectedItems([...found.items]);
    setOutageDays(found.outageDays);
    setSolarReload(found.solarReload);
  };

  const toggleAppliance = (appliance: Appliance) => {
    setActivePresetId("custom");
    setSelectedItems((prev) => {
      const exists = prev.find((i) => i.applianceId === appliance.id);
      if (exists) {
        return prev.filter((i) => i.applianceId !== appliance.id);
      }
      return [
        ...prev,
        {
          applianceId: appliance.id,
          hoursPerDay: appliance.defaultHoursPerDay,
          quantity: 1,
        },
      ];
    });
  };

  const updateHours = (applianceId: string, hours: number) => {
    setActivePresetId("custom");
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.applianceId === applianceId
          ? { ...item, hoursPerDay: Math.max(0.1, Math.min(24, hours)) }
          : item
      )
    );
  };

  const updateQuantity = (applianceId: string, quantity: number) => {
    setActivePresetId("custom");
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.applianceId === applianceId
          ? { ...item, quantity: Math.max(1, Math.min(10, quantity)) }
          : item
      )
    );
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const w = Number(customWatts);
    const h = Number(customHours);
    if (!customName.trim() || isNaN(w) || w <= 0 || isNaN(h) || h <= 0) return;
    setCustomItems((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        name: customName.trim(),
        watts: w,
        surgeWatts: Math.round(w * 1.25),
        hoursPerDay: Math.min(24, h),
      },
    ]);
    setCustomName("");
    setCustomWatts("");
    setCustomHours("2");
  };

  const removeCustomItem = (id: string) => {
    setCustomItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Compute daily consumption, compressor duty cycle savings, and peak surge
  const calculationSummary = useMemo(() => {
    let dailyConsumptionWh = 0;
    let naiveUnadjustedWh = 0;
    let peakRunningWatts = 0;
    let peakSurgeWatts = 0;

    const detailedBreakdown = selectedItems
      .map((item) => {
        const app = APPLIANCES.find((a) => a.id === item.applianceId);
        if (!app) return null;
        const effectiveWatts = app.runningWatts * app.dutyCycle * item.quantity;
        const itemDailyWh = Math.round(effectiveWatts * item.hoursPerDay);
        const itemNaiveWh = Math.round(
          app.runningWatts * item.quantity * item.hoursPerDay
        );

        dailyConsumptionWh += itemDailyWh;
        naiveUnadjustedWh += itemNaiveWh;
        peakRunningWatts += app.runningWatts * item.quantity;
        peakSurgeWatts = Math.max(
          peakSurgeWatts,
          peakRunningWatts + (app.surgeWatts - app.runningWatts)
        );

        return {
          ...item,
          appliance: app,
          effectiveWatts: Math.round(effectiveWatts),
          itemDailyWh,
        };
      })
      .filter(Boolean);

    customItems.forEach((c) => {
      const wh = Math.round(c.watts * c.hoursPerDay);
      dailyConsumptionWh += wh;
      naiveUnadjustedWh += wh;
      peakRunningWatts += c.watts;
      peakSurgeWatts = Math.max(
        peakSurgeWatts,
        peakRunningWatts + (c.surgeWatts - c.watts)
      );
    });

    // Guarantee sensible minimum when empty
    const safeDailyWh = Math.max(150, dailyConsumptionWh);
    const safePeakRunning = Math.max(100, peakRunningWatts);
    const safePeakSurge = Math.max(200, peakSurgeWatts);

    const rec = getSizerRecommendations({
      dailyConsumptionWh: safeDailyWh,
      outageDays,
      peakRunningWatts: safePeakRunning,
      peakSurgeWatts: safePeakSurge,
      solarReload,
    });

    return {
      ...rec,
      naiveUnadjustedWh,
      dutyCycleSavedWh: Math.max(0, naiveUnadjustedWh - dailyConsumptionWh),
      detailedBreakdown,
    };
  }, [selectedItems, customItems, outageDays, solarReload]);

  const filteredAppliances = useMemo(() => {
    if (activeCategory === "All") return APPLIANCES;
    return APPLIANCES.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="calculator" ref={sectionRef} className="scroll-mt-20">
      {/* Step 1: 1-Click Scenario Presets */}
      <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Step 1 • Quick-Load Scenarios
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Pick a Blackout or Off-Grid Scenario (or customize your appliances below)
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedItems([]);
              setCustomItems([]);
              setActivePresetId("custom");
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {SCENARIO_PRESETS.map((preset) => {
            const isActive = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.id)}
                className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${
                  isActive
                    ? "border-amber-500 bg-amber-500/10 ring-1 ring-amber-500/40"
                    : "border-slate-800 bg-slate-950/70 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        isActive
                          ? "bg-amber-400 text-slate-950"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {preset.badge}
                    </span>
                    {isActive && (
                      <Check className="h-4 w-4 text-amber-400 shrink-0" />
                    )}
                  </div>
                  <div className="mt-2 font-bold text-sm text-white">
                    {preset.name}
                  </div>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                    {preset.description}
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-semibold text-amber-400/90">
                  {preset.items.length} appliances pre-loaded →
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Calculator 12-Col Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* LEFT COLUMN (7 Cols): Appliance Picker & Hours Sliders */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Step 2 • Select Your Appliances
                </span>
                <h3 className="text-lg font-bold text-white">
                  What do you want to keep running?
                </h3>
              </div>
              <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-300">
                {selectedItems.length + customItems.length} Active Loads
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="mb-5 flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    activeCategory === cat
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Appliances Grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {filteredAppliances.map((appliance) => {
                const selected = selectedItems.find(
                  (i) => i.applianceId === appliance.id
                );
                const isSelected = Boolean(selected);
                const effectiveW = Math.round(
                  appliance.runningWatts * appliance.dutyCycle
                );
                const dailyWh = selected
                  ? Math.round(
                      effectiveW * selected.hoursPerDay * selected.quantity
                    )
                  : 0;

                return (
                  <div
                    key={appliance.id}
                    className={`rounded-xl border p-3.5 transition-all ${
                      isSelected
                        ? "border-amber-500/60 bg-amber-500/5"
                        : "border-slate-800/90 bg-slate-950/60 hover:border-slate-700"
                    }`}
                  >
                    <div
                      onClick={() => toggleAppliance(appliance)}
                      className="flex cursor-pointer items-start justify-between gap-2"
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
                            isSelected
                              ? "border-amber-400 bg-amber-400 text-slate-950"
                              : "border-slate-600 bg-slate-900"
                          }`}
                        >
                          {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white leading-snug">
                            {appliance.shortName}
                          </div>
                          <div className="mt-0.5 text-[11px] text-slate-400">
                            {appliance.runningWatts}W run •{" "}
                            {appliance.dutyCycle < 1
                              ? `~${effectiveW}W avg (${Math.round(
                                  appliance.dutyCycle * 100
                                )}% cycle)`
                              : `${appliance.surgeWatts}W surge`}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="shrink-0 rounded bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-300">
                          {dailyWh} Wh/d
                        </span>
                      )}
                    </div>

                    {/* Expanded Hours & Quantity Controls when Selected */}
                    {selected && (
                      <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-medium">
                            Run Time:{" "}
                            <strong className="text-amber-300">
                              {selected.hoursPerDay} hrs/day
                            </strong>
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-slate-400 text-[11px]">Qty:</span>
                            {[1, 2].map((q) => (
                              <button
                                key={q}
                                type="button"
                                onClick={() => updateQuantity(appliance.id, q)}
                                className={`rounded px-1.5 py-0.5 text-[11px] font-bold ${
                                  selected.quantity === q
                                    ? "bg-amber-400 text-slate-950"
                                    : "bg-slate-800 text-slate-400"
                                }`}
                              >
                                {q}x
                              </button>
                            ))}
                          </div>
                        </div>
                        <input
                          type="range"
                          min={0.2}
                          max={24}
                          step={0.2}
                          value={selected.hoursPerDay}
                          onChange={(e) =>
                            updateHours(appliance.id, parseFloat(e.target.value))
                          }
                          className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Custom Appliance Adder */}
            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center gap-1.5">
                <Plus className="h-3.5 w-3.5 text-amber-400" />
                Add a Custom Device or Power Tool
              </div>
              <form
                onSubmit={handleAddCustom}
                className="grid grid-cols-1 gap-2.5 sm:grid-cols-12"
              >
                <input
                  type="text"
                  placeholder="Device name (e.g. Espresso Machine)"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="sm:col-span-5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Watts (e.g. 400)"
                  value={customWatts}
                  onChange={(e) => setCustomWatts(e.target.value)}
                  className="sm:col-span-3 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
                <input
                  type="number"
                  step="0.5"
                  placeholder="Hrs/day"
                  value={customHours}
                  onChange={(e) => setCustomHours(e.target.value)}
                  className="sm:col-span-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="sm:col-span-2 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 px-3 py-2 text-xs font-bold text-white transition"
                >
                  + Add
                </button>
              </form>

              {customItems.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  {customItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg bg-slate-900 px-3 py-1.5 text-xs"
                    >
                      <span className="font-medium text-white">
                        {item.name} ({item.watts}W × {item.hoursPerDay}h ={" "}
                        <strong className="text-amber-300">
                          {Math.round(item.watts * item.hoursPerDay)} Wh/day
                        </strong>
                        )
                      </span>
                      <button
                        type="button"
                        onClick={() => removeCustomItem(item.id)}
                        className="text-slate-400 hover:text-rose-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Step 3: Outage Days & Solar Recharging */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Step 3 • Backup Duration & Solar Recharging
            </span>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <label className="text-xs font-semibold text-slate-300">
                  How many days of power outage protection?
                </label>
                <div className="mt-2.5 grid grid-cols-4 gap-2">
                  {[1, 2, 3, 5].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setOutageDays(d)}
                      className={`rounded-lg py-2 text-xs font-bold transition ${
                        outageDays === d
                          ? "bg-amber-400 text-slate-950 shadow"
                          : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                      }`}
                    >
                      {d} {d === 1 ? "Day" : "Days"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Sun className="h-4 w-4 text-amber-400" />
                      Recharge Daily with Solar Panels?
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                      Adding a foldable solar panel lets a 1-day battery run
                      indefinitely during multi-day blackouts.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSolarReload(!solarReload)}
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold transition ${
                      solarReload
                        ? "bg-emerald-500 text-slate-950"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {solarReload ? "YES (Solar)" : "NO (Battery Only)"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 Cols): Live Results Readout */}
        <div id="sizer-result" ref={resultRef} className="lg:col-span-5 scroll-mt-24">
          <div className="sticky top-24 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-amber-500/5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  Live Estimate
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">
                  Your Estimated Power Requirements
                </h3>
              </div>
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 text-right">
                <div className="text-[10px] font-bold uppercase text-amber-300">
                  Min. Inverter
                </div>
                <div className="text-sm font-black text-white">
                  {calculationSummary.peakRunningWatts.toLocaleString()}W
                </div>
              </div>
            </div>

            {/* Big Watt-Hours Number */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-950/90 border border-slate-800 p-4">
                <div className="text-xs text-slate-400">
                  Daily Energy Consumption
                </div>
                <div className="mt-1 text-2xl sm:text-3xl font-black text-white">
                  {calculationSummary.dailyConsumptionWh.toLocaleString()}{" "}
                  <span className="text-sm font-bold text-amber-400">
                    Wh/day
                  </span>
                </div>
                {calculationSummary.dutyCycleSavedWh > 0 && (
                  <div className="mt-1 text-[11px] text-emerald-400 font-medium">
                    ✓ Saved {calculationSummary.dutyCycleSavedWh}Wh via
                    compressor cycling math
                  </div>
                )}
              </div>

              <div className="rounded-xl bg-amber-500/10 border border-amber-500/40 p-4">
                <div className="text-xs font-semibold text-amber-200">
                  Recommended Battery Size
                </div>
                <div className="mt-1 text-2xl sm:text-3xl font-black text-amber-400">
                  {calculationSummary.recommendedRatedWh.toLocaleString()}{" "}
                  <span className="text-sm font-bold text-amber-200">Wh+</span>
                </div>
                <div className="mt-1 text-[11px] text-amber-200/80">
                  Includes 15% AC inverter conversion buffer
                </div>
              </div>
            </div>

            {/* Surge & Solar Callouts */}
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3">
                <span className="text-slate-400">Peak Startup Surge:</span>
                <div className="mt-0.5 font-bold text-white text-sm">
                  {calculationSummary.peakSurgeWatts.toLocaleString()} Watts
                </div>
              </div>
              <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3">
                <span className="text-slate-400">Recommended Solar Input:</span>
                <div className="mt-0.5 font-bold text-amber-300 text-sm">
                  {calculationSummary.recommendedSolarWatts}W Foldable Panel
                </div>
              </div>
            </div>

            {/* Top Matched Unit Mini-Preview CTA */}
            <div className="mt-5 rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">
                  Best Overall Match For Your Load
                </span>
                <span className="text-xs font-bold text-white">
                  {calculationSummary.bestOverall.capacityWh}Wh •{" "}
                  {calculationSummary.bestOverall.continuousWatts}W
                </span>
              </div>
              <div className="mt-1 text-lg font-extrabold text-white">
                {calculationSummary.bestOverall.name}
              </div>
              <p className="mt-0.5 text-xs text-slate-300">
                {calculationSummary.bestOverall.bestFor}
              </p>
              <div className="mt-3 flex flex-col sm:flex-row gap-2">
                <a
                  href={getAmazonProductUrl(
                    calculationSummary.bestOverall.amazonAsin,
                    calculationSummary.bestOverall.amazonSearchQuery
                  )}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2.5 text-xs font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-110 transition"
                >
                  Check {calculationSummary.bestOverall.shortName} Price on
                  Amazon
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href="#recommendations"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition"
                >
                  Compare Top 3 ↓
                </a>
              </div>
              <button
                type="button"
                onClick={copyShareLink}
                className="mt-2 w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 hover:border-amber-500/50 hover:text-amber-300 transition"
              >
                {linkCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    Link copied
                  </>
                ) : (
                  <>
                    <Link2 className="h-3.5 w-3.5" />
                    Copy a link to these results
                  </>
                )}
              </button>
            </div>

            {/* Breakdown List */}
            <div className="mt-5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Active Load Breakdown ({calculationSummary.detailedBreakdown.length + customItems.length} items)
              </div>
              <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                {calculationSummary.detailedBreakdown.map((item) =>
                  item ? (
                    <div
                      key={item.applianceId}
                      className="flex items-center justify-between rounded-lg bg-slate-950/80 px-3 py-1.5 text-xs border border-slate-800/80"
                    >
                      <span className="text-slate-200 truncate pr-2">
                        {item.quantity > 1 ? `${item.quantity}x ` : ""}
                        {item.appliance.shortName} ({item.hoursPerDay}h/d)
                      </span>
                      <span className="font-bold text-amber-300 shrink-0">
                        {item.itemDailyWh} Wh
                      </span>
                    </div>
                  ) : null
                )}
                {customItems.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between rounded-lg bg-slate-950/80 px-3 py-1.5 text-xs border border-slate-800/80"
                  >
                    <span className="text-slate-200 truncate pr-2">
                      {c.name} ({c.hoursPerDay}h/d)
                    </span>
                    <span className="font-bold text-amber-300 shrink-0">
                      {Math.round(c.watts * c.hoursPerDay)} Wh
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 4: Top 3 Matched Amazon Recommendations */}
      <div id="recommendations" className="mt-12 scroll-mt-24">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Step 4 • LiFePO4 Matches by Spec
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
              Best Portable Power Stations for Your{" "}
              {calculationSummary.dailyConsumptionWh.toLocaleString()} Wh/Day
              Load
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Every model below safely handles your{" "}
              <strong className="text-slate-200">
                {calculationSummary.peakRunningWatts}W continuous /{" "}
                {calculationSummary.peakSurgeWatts}W surge
              </strong>{" "}
              requirements and uses 10-year LiFePO4 battery cells.
            </p>
          </div>
          <div className="text-xs text-slate-400 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2">
            💡 <strong className="text-amber-300">Pro Tip:</strong> Toggle{" "}
            <strong>+Solar Bundle</strong> on any card to see Amazon&apos;s
            discounted generator + solar panel kit.
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <PowerStationCard
            station={calculationSummary.bestValue}
            rankLabel="Best Value Match"
            rankColor="emerald"
            dailyLoadWh={calculationSummary.dailyConsumptionWh}
            peakWatts={calculationSummary.peakRunningWatts}
            highlightSolarBundle={solarReload}
          />
          <PowerStationCard
            station={calculationSummary.bestOverall}
            rankLabel="Best Overall Pick"
            rankColor="amber"
            dailyLoadWh={calculationSummary.dailyConsumptionWh}
            peakWatts={calculationSummary.peakRunningWatts}
            highlightSolarBundle={solarReload}
          />
          <PowerStationCard
            station={calculationSummary.heavyDutyUpgrade}
            rankLabel="Extended Outage Upgrade"
            rankColor="blue"
            dailyLoadWh={calculationSummary.dailyConsumptionWh}
            peakWatts={calculationSummary.peakRunningWatts}
            highlightSolarBundle={solarReload}
          />
        </div>
      </div>

      {calcInView && !resultInView && (
        <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-amber-500/40 bg-slate-950/95 backdrop-blur px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Best match · ~{calculationSummary.recommendedRatedWh.toLocaleString()}Wh needed
              </div>
              <div className="truncate text-sm font-extrabold text-white">
                {calculationSummary.bestOverall.name}
              </div>
            </div>
            <a
              href="#sizer-result"
              className="shrink-0 rounded-xl bg-amber-400 px-3.5 py-2 text-xs font-extrabold text-slate-950"
            >
              See results ↓
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

