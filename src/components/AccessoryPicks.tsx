import React from "react";
import { getAccessoriesFor } from "@/data/accessories";
import { AFFILIATE_DISCLOSURE, getAmazonProductUrl } from "@/config/affiliate";
import { ExternalLink, Wrench } from "lucide-react";

export default function AccessoryPicks({
  applianceId,
  applianceName,
}: {
  applianceId: string;
  applianceName: string;
}) {
  const accessories = getAccessoriesFor(applianceId);

  return (
    <section className="mt-12">
      <div className="mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Small Extras That Help
        </span>
        <h2 className="mt-1 text-xl sm:text-2xl font-black text-white">
          Inexpensive Add-Ons for Running a {applianceName} on Battery
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {accessories.map((item) => (
          <a
            key={item.label}
            href={getAmazonProductUrl(null, item.amazonSearchQuery)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-5 hover:border-amber-500/50 transition"
          >
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Wrench className="h-4 w-4 text-amber-400 shrink-0" />
                {item.label}
              </div>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {item.why}
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:text-amber-300">
              See options on Amazon
              <ExternalLink className="h-3.5 w-3.5" />
            </span>
          </a>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-slate-500">
        Paid links. {AFFILIATE_DISCLOSURE}
      </p>
    </section>
  );
}
