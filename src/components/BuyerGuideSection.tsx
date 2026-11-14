import React from "react";
import { BuyerGuide, BuyerGuideOption } from "@/data/appliances";
import {
  AFFILIATE_DISCLOSURE,
  SITE_CONFIG,
  getAmazonProductUrl,
} from "@/config/affiliate";
import { ExternalLink } from "lucide-react";

const INVERTER_IDLE_WATTS = 8;

function estimatedRuntime(option: BuyerGuideOption): string {
  if (!option.sourceWh) return "Varies by model";
  const usableWh = option.sourceWh * SITE_CONFIG.defaultInverterEfficiency;
  const draw = option.drawWatts + (option.usesInverter ? INVERTER_IDLE_WATTS : 0);
  const hours = usableWh / draw;
  return `~${hours >= 10 ? Math.round(hours) : hours.toFixed(1)} hours`;
}

export default function BuyerGuideSection({ guide }: { guide: BuyerGuide }) {
  return (
    <section className="mt-12">
      <div className="mb-5 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          {guide.eyebrow}
        </span>
        <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
          {guide.heading}
        </h2>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          {guide.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {guide.options.map((option, i) => (
          <div
            key={option.name}
            className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
          >
            <div>
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400 text-xs font-black text-slate-950">
                  {i + 1}
                </span>
                <h3 className="text-base font-bold text-white leading-snug">
                  {option.name}
                </h3>
              </div>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                <strong className="text-slate-100">Best for:</strong>{" "}
                {option.bestFor}
              </p>

              <dl className="mt-4 grid grid-cols-2 gap-2.5 text-xs">
                <div className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-3">
                  <dt className="text-slate-400">Typical draw</dt>
                  <dd className="mt-0.5 text-sm font-bold text-white">
                    ~{option.drawWatts}W
                  </dd>
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-3">
                  <dt className="text-slate-400">
                    {option.powerSource
                      ? `On a ${option.powerSource}`
                      : "Built-in battery"}
                  </dt>
                  <dd className="mt-0.5 text-sm font-bold text-emerald-400">
                    {estimatedRuntime(option)}
                  </dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                {option.note}
              </p>
            </div>

            <a
              href={getAmazonProductUrl(null, option.amazonSearchQuery)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 px-4 py-2.5 text-xs font-extrabold text-slate-950 transition"
            >
              {option.linkLabel}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
        {guide.footnote} Paid links. {AFFILIATE_DISCLOSURE}
      </p>
    </section>
  );
}
