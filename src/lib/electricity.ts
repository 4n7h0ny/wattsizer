import { Appliance } from "@/data/appliances";

/** Rough US average residential rate. Shown to visitors as an assumption. */
export const ASSUMED_CENTS_PER_KWH = 17;
const HOUSEHOLD_VOLTS = 120;

export interface ElectricityUse {
  runningAmps: number;
  startupAmps: number;
  avgWatts: number;
  kWhPerHour: number;
  kWhPerDay: number;
  kWhPerMonth: number;
  costPerMonth: number;
  /** Same figures if it ran around the clock; null when the typical day is already 24h. */
  nonStop: { kWhPerMonth: number; costPerMonth: number } | null;
  /** Plain-language answer to "does it use a lot of electricity?" */
  verdict: string;
}

/** Grid electricity use for an appliance at its typical hours per day. */
export function getElectricityUse(app: Appliance): ElectricityUse {
  const rate = ASSUMED_CENTS_PER_KWH / 100;
  const avgWatts = app.runningWatts * app.dutyCycle;
  const kWhPerHour = avgWatts / 1000;
  const kWhPerDay = kWhPerHour * app.defaultHoursPerDay;
  const kWhPerMonth = kWhPerDay * 30;
  const nonStopKWh = kWhPerHour * 24 * 30;

  const verdict =
    kWhPerMonth < 10
      ? "very little electricity"
      : kWhPerMonth < 40
      ? "a modest amount of electricity"
      : kWhPerMonth < 120
      ? "a noticeable amount of electricity"
      : "a lot of electricity";

  return {
    runningAmps: app.runningWatts / HOUSEHOLD_VOLTS,
    startupAmps: app.surgeWatts / HOUSEHOLD_VOLTS,
    avgWatts,
    kWhPerHour,
    kWhPerDay,
    kWhPerMonth,
    costPerMonth: kWhPerMonth * rate,
    nonStop:
      app.defaultHoursPerDay >= 6 && app.defaultHoursPerDay < 24
        ? { kWhPerMonth: nonStopKWh, costPerMonth: nonStopKWh * rate }
        : null,
    verdict,
  };
}

export function formatKWh(kWh: number): string {
  if (kWh < 1) return kWh.toFixed(2);
  if (kWh < 10) return kWh.toFixed(1);
  return Math.round(kWh).toLocaleString("en-US");
}

export function formatDollars(amount: number): string {
  return amount < 10 ? `$${amount.toFixed(2)}` : `$${Math.round(amount)}`;
}

export function formatAmps(amps: number): string {
  return amps < 10 ? amps.toFixed(1) : String(Math.round(amps));
}

export function formatHours(hours: number): string {
  if (hours >= 1) return `${hours} hour${hours === 1 ? "" : "s"}`;
  return `${Math.round(hours * 60)} minutes`;
}
