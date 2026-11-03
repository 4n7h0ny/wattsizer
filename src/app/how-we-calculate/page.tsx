import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { AFFILIATE_DISCLOSURE } from "@/config/affiliate";

export const metadata: Metadata = {
  title: "How We Calculate Power Station Runtimes | WattSizer",
  alternates: { canonical: "/how-we-calculate" },
  description:
    "The formula, assumptions and data sources behind WattSizer's portable power station runtime estimates, plus what we have and haven't tested.",
};

export default function HowWeCalculatePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
        Methodology
      </span>
      <h1 className="mt-1 text-3xl sm:text-4xl font-black text-white">
        How We Calculate Runtimes
      </h1>
      <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
        Every runtime on this site is a calculated estimate, not a measurement.
        We have not hands-on tested these power stations. Here is exactly how
        the numbers are produced, so you can judge them for yourself.
      </p>

      <section className="mt-8 space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-bold text-white">1. Can it run at all?</h2>
          <p className="mt-2">
            An appliance is marked as compatible only if the power
            station&apos;s rated continuous output is at least the
            appliance&apos;s running watts, <em>and</em> its rated surge output
            is at least the appliance&apos;s typical startup surge. Motors and
            compressors (fridges, pumps, furnace blowers) can briefly draw 2–4×
            their running watts when they start.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-bold text-white">2. Usable capacity</h2>
          <p className="mt-2">
            We assume about <strong className="text-white">85%</strong> of a
            station&apos;s rated watt-hours reach the appliance through the AC
            outlets. The rest is lost in DC-to-AC conversion. Real efficiency
            varies by model and load; very small loads are usually less
            efficient.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-bold text-white">3. Average draw</h2>
          <p className="mt-2">
            Appliances that cycle on and off are averaged using a typical duty
            cycle. For example, a fridge compressor might run about 35–40% of
            the time. We add about 8W for the inverter&apos;s own idle draw.
          </p>
          <p className="mt-3 rounded-xl bg-slate-950 border border-slate-800 p-3 font-mono text-xs sm:text-sm text-amber-300">
            hours ≈ (rated Wh × 0.85) ÷ (running W × duty cycle + 8W)
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-bold text-white">Data sources and limits</h2>
          <ul className="mt-2 list-disc list-inside space-y-1.5">
            <li>
              Power station specs (capacity, output, surge, solar input,
              weight, cycle ratings) come from manufacturer-published figures.
            </li>
            <li>
              Appliance wattages are typical values. Your appliance may differ,
              so check its label or measure it with a plug-in watt meter.
            </li>
            <li>
              Temperature, battery age, and how full the station is charged all
              change real runtime.
            </li>
            <li>
              We don&apos;t list prices or ratings. Check Amazon or the
              manufacturer for current pricing.
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-bold text-white">How this site makes money</h2>
          <p className="mt-2">
            {AFFILIATE_DISCLOSURE} If you buy through a link here, the price is
            the same for you. Recommendations come from the calculator&apos;s
            spec matching, not from which product pays more.
          </p>
        </div>
      </section>

      <div className="mt-8">
        <Link
          href="/#calculator"
          className="inline-flex items-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 px-5 py-3 text-sm font-extrabold text-slate-950 transition shadow"
        >
          Try the Calculator
        </Link>
      </div>
    </div>
  );
}
