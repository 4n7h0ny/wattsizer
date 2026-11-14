import React from "react";
import { Appliance, applianceNoun } from "@/data/appliances";
import {
  ASSUMED_CENTS_PER_KWH,
  formatAmps,
  formatDollars,
  formatHours,
  formatKWh,
  getElectricityUse,
} from "@/lib/electricity";

/** "How much electricity does it use?" block: watts, amps, kWh and monthly cost. */
export default function ElectricityUse({ appliance }: { appliance: Appliance }) {
  const use = getElectricityUse(appliance);
  const noun = applianceNoun(appliance);
  // Title-case the noun for the heading, leaving small joining words lowercase
  const headingNoun = noun.replace(/\b(?!(?:an?|and|of)\b)[a-z]/g, (c) =>
    c.toUpperCase()
  );
  const hours = formatHours(appliance.defaultHoursPerDay);
  const cycles = appliance.dutyCycle < 1;

  const tiles = [
    {
      label: "Running watts",
      value: `${appliance.runningWatts}W`,
      sub: cycles
        ? `~${Math.round(use.avgWatts)}W averaged over time`
        : `${appliance.surgeWatts}W at startup`,
    },
    {
      label: "Amps at 120V",
      value: `${formatAmps(use.runningAmps)}A`,
      sub: `Up to ${formatAmps(use.startupAmps)}A at startup`,
    },
    {
      label: `Per day (${hours})`,
      value: `${formatKWh(use.kWhPerDay)} kWh`,
      sub: `${formatKWh(use.kWhPerHour)} kWh per hour of use`,
    },
    {
      label: "Per month",
      value: `${formatKWh(use.kWhPerMonth)} kWh`,
      sub: `About ${formatDollars(use.costPerMonth)} at ${ASSUMED_CENTS_PER_KWH}¢/kWh`,
    },
  ];

  return (
    <section className="mt-16">
      <div className="mb-5 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Electricity Use
        </span>
        <h2 className="mt-1 text-2xl font-black text-white">
          How Much Electricity Does {headingNoun} Use?
        </h2>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          A typical {appliance.name.toLowerCase()} draws about{" "}
          <strong className="text-white">{appliance.runningWatts} watts</strong>{" "}
          ({formatAmps(use.runningAmps)} amps on a 120V outlet) while running
          {cycles
            ? `, and averages about ${Math.round(use.avgWatts)} watts because it cycles on and off`
            : ""}
          . Used {hours} a day, that is {use.verdict}: about{" "}
          <strong className="text-white">
            {formatKWh(use.kWhPerMonth)} kWh a month
          </strong>
          , or roughly {formatDollars(use.costPerMonth)} at{" "}
          {ASSUMED_CENTS_PER_KWH}¢ per kWh.
          {use.nonStop
            ? ` Running around the clock it would use about ${formatKWh(
                use.nonStop.kWhPerMonth
              )} kWh a month (roughly ${formatDollars(use.nonStop.costPerMonth)}).`
            : ""}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4"
          >
            <div className="text-xs text-slate-400">{tile.label}</div>
            <div className="mt-1 text-xl sm:text-2xl font-black text-white">
              {tile.value}
            </div>
            <div className="mt-0.5 text-[11px] text-slate-400">{tile.sub}</div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
        Typical values. Your model may differ, so check its label or use a
        plug-in watt meter. {ASSUMED_CENTS_PER_KWH}¢/kWh is close to the US
        average; your rate is on your electric bill.
      </p>
    </section>
  );
}
