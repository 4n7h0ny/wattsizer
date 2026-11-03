import { Appliance } from "@/data/appliances";
import { POWER_STATIONS, PowerStation } from "@/data/powerStations";
import { SITE_CONFIG } from "@/config/affiliate";

export interface RuntimeResult {
  canRun: boolean;
  overloadReason: string | null;
  effectiveHourlyWatts: number;
  continuousHours: number;
  daysFormatted: string;
}

/**
 * Calculates how long a specific PowerStation can run a single Appliance.
 * Includes real-world 85% inverter efficiency and appliance duty cycle.
 */
export function calculateApplianceRuntime(
  station: PowerStation,
  appliance: Appliance
): RuntimeResult {
  const effectiveHourlyWatts = Math.round(
    appliance.runningWatts * appliance.dutyCycle
  );

  if (station.continuousWatts < appliance.runningWatts) {
    return {
      canRun: false,
      overloadReason: `Requires ${appliance.runningWatts}W continuous (Station max: ${station.continuousWatts}W)`,
      effectiveHourlyWatts,
      continuousHours: 0,
      daysFormatted: "Overload",
    };
  }

  if (station.surgeWatts < appliance.surgeWatts) {
    return {
      canRun: false,
      overloadReason: `Requires ${appliance.surgeWatts}W startup surge (Station max: ${station.surgeWatts}W)`,
      effectiveHourlyWatts,
      continuousHours: 0,
      daysFormatted: "Surge Exceeded",
    };
  }

  const usableWh = station.capacityWh * SITE_CONFIG.defaultInverterEfficiency;
  // Add small ~8W AC inverter idle overhead for realistic multi-hour runtime
  const totalDrawWatts = effectiveHourlyWatts + 8;
  const continuousHours = Number((usableWh / totalDrawWatts).toFixed(1));

  let daysFormatted = `${continuousHours} hrs`;
  if (continuousHours >= 24) {
    const days = (continuousHours / 24).toFixed(1);
    daysFormatted = `${continuousHours} hrs (~${days} days)`;
  }

  return {
    canRun: true,
    overloadReason: null,
    effectiveHourlyWatts,
    continuousHours,
    daysFormatted,
  };
}

export interface RecommendationsOutput {
  dailyConsumptionWh: number;
  totalRequiredUsableWh: number;
  recommendedRatedWh: number;
  peakRunningWatts: number;
  peakSurgeWatts: number;
  recommendedSolarWatts: number;
  bestValue: PowerStation;
  bestOverall: PowerStation;
  heavyDutyUpgrade: PowerStation;
  allCompatible: PowerStation[];
}

export function getSizerRecommendations(params: {
  dailyConsumptionWh: number;
  outageDays: number;
  peakRunningWatts: number;
  peakSurgeWatts: number;
  solarReload: boolean;
}): RecommendationsOutput {
  const {
    dailyConsumptionWh,
    outageDays,
    peakRunningWatts,
    peakSurgeWatts,
    solarReload,
  } = params;

  // If user plans to recharge daily with solar panels, battery only needs to hold ~1.15 days of load;
  // otherwise it must hold the full multi-day load.
  const effectiveDays = solarReload ? Math.min(outageDays, 1.15) : outageDays;
  const totalRequiredUsableWh = Math.round(dailyConsumptionWh * effectiveDays);

  // Account for 85% usable AC inverter efficiency
  const recommendedRatedWh = Math.max(
    250,
    Math.round(totalRequiredUsableWh / SITE_CONFIG.defaultInverterEfficiency)
  );

  // Solar panel sizing: replenish dailyWh in ~4.2 peak sun hours (with 80% solar weather factor)
  const rawSolarWatts = Math.ceil(dailyConsumptionWh / (4.2 * 0.8));
  const recommendedSolarWatts =
    rawSolarWatts <= 100
      ? 100
      : rawSolarWatts <= 220
      ? 200
      : rawSolarWatts <= 440
      ? 400
      : 800;

  // Filter stations that can physically run the peak running + surge load
  const inverterCompatible = POWER_STATIONS.filter(
    (s) =>
      s.continuousWatts >= peakRunningWatts && s.surgeWatts >= peakSurgeWatts
  );

  const pool =
    inverterCompatible.length > 0
      ? inverterCompatible
      : [POWER_STATIONS[POWER_STATIONS.length - 1]];

  // Sort by capacity ascending, then price ascending
  const sortedByCap = [...pool].sort(
    (a, b) => a.capacityWh - b.capacityWh || a.approxListPriceUsd - b.approxListPriceUsd
  );

  // Find stations that meet at least 85% of the recommendedRatedWh
  const capacityMatches = sortedByCap.filter(
    (s) => s.capacityWh >= recommendedRatedWh * 0.85
  );

  let bestValue: PowerStation;
  let bestOverall: PowerStation;
  let heavyDutyUpgrade: PowerStation;

  if (capacityMatches.length >= 3) {
    // Sort the first few capacity matches by price to find Best Value
    const firstTier = capacityMatches.slice(0, 3);
    bestValue = [...firstTier].sort(
      (a, b) => a.approxListPriceUsd - b.approxListPriceUsd
    )[0];

    // Best Overall: Prefer EcoFlow DELTA 2, Anker SOLIX C1000, or EcoFlow DELTA 2 Max if in range
    const preferredOverall = capacityMatches.find(
      (s) =>
        s.id !== bestValue.id &&
        (s.id === "ecoflow-delta-2" ||
          s.id === "anker-solix-c1000" ||
          s.id === "ecoflow-delta-2-max" ||
          s.id === "jackery-1000-v2")
    );
    bestOverall =
      preferredOverall ||
      capacityMatches.find((s) => s.id !== bestValue.id) ||
      capacityMatches[1];

    // Heavy Duty Upgrade: A station with significantly larger capacity or output
    heavyDutyUpgrade =
      capacityMatches.find(
        (s) =>
          s.id !== bestValue.id &&
          s.id !== bestOverall.id &&
          s.capacityWh > bestOverall.capacityWh * 1.35
      ) ||
      capacityMatches[capacityMatches.length - 1];
  } else if (capacityMatches.length > 0) {
    bestValue = capacityMatches[0];
    bestOverall = capacityMatches[Math.min(1, capacityMatches.length - 1)];
    heavyDutyUpgrade = sortedByCap[sortedByCap.length - 1];
  } else {
    // Very large multi-day load (>3,600Wh): recommend our top 3 largest expandable stations
    const topThree = sortedByCap.slice(-3);
    bestValue = topThree[0] || sortedByCap[0];
    bestOverall = topThree[1] || bestValue;
    heavyDutyUpgrade = topThree[2] || bestOverall;
  }

  // Ensure all 3 cards show distinct models whenever possible
  const usedIds = new Set<string>([bestOverall.id]);
  if (usedIds.has(bestValue.id)) {
    const alt = sortedByCap.find((s) => !usedIds.has(s.id));
    if (alt) bestValue = alt;
  }
  usedIds.add(bestValue.id);
  if (usedIds.has(heavyDutyUpgrade.id)) {
    const alt = [...sortedByCap].reverse().find((s) => !usedIds.has(s.id));
    if (alt) heavyDutyUpgrade = alt;
  }

  return {
    dailyConsumptionWh,
    totalRequiredUsableWh,
    recommendedRatedWh,
    peakRunningWatts,
    peakSurgeWatts,
    recommendedSolarWatts,
    bestValue,
    bestOverall,
    heavyDutyUpgrade,
    allCompatible: sortedByCap,
  };
}

