import React from "react";
import { SITE_CONFIG, getAmazonProductUrl } from "@/config/affiliate";
import { APPLIANCES } from "@/data/appliances";
import { COMPARISON_PAIRS, POWER_STATIONS } from "@/data/powerStations";
import {
  CheckCircle2,
  DollarSign,
  ExternalLink,
  FileCode,
  Globe,
  Rocket,
  Search,
  ShieldCheck,
} from "lucide-react";

export default function OwnerGuidePage() {
  const sampleLink = getAmazonProductUrl(
    POWER_STATIONS[2].amazonAsin,
    POWER_STATIONS[2].amazonSearchQuery
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/30 via-slate-900 to-slate-950 p-6 sm:p-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-bold text-emerald-300">
          <Rocket className="h-3.5 w-3.5" />
          Site Owner Dashboard &amp; Passive Income Setup Guide
        </span>

        <h1 className="mt-3 text-2xl sm:text-4xl font-black text-white">
          How to Launch &amp; Monetize WattSizer in 3 Steps ($0 Hosting)
        </h1>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          This page is hidden from Google (<code className="text-amber-300">disallow: /owner-guide</code> in{" "}
          <code>robots.txt</code>) and serves as your personal cheat-sheet for
          plugging in your single Amazon Associates tag.
        </p>

        {/* Live Config Status Box */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/90 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Amazon Associates Tag
              </div>
              <div className="mt-1 text-xl font-black text-amber-400 font-mono">
                {SITE_CONFIG.amazonAssociateTag}
              </div>
            </div>
            <span className="rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 text-xs font-bold text-emerald-300">
              ✓ Auto-Injected Into All {POWER_STATIONS.length * 2} Product &amp;
              Solar Bundle Links
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-400 break-all">
            <strong className="text-slate-200">Sample Live Link:</strong>{" "}
            <a
              href={sampleLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 underline"
            >
              {sampleLink}
            </a>
          </div>
        </div>

        {/* 3 Step Checklist */}
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex items-center gap-2 text-base font-bold text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-xs font-black text-slate-950">
                1
              </span>
              Deploy for $0/Month on Vercel (Before Applying to Amazon)
            </div>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Amazon Associates asks for your live website URL when you sign up.
              Push this folder to a free GitHub repository, then log into{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 underline"
              >
                Vercel.com
              </a>{" "}
              (Hobby tier is 100% free forever) and click{" "}
              <strong>Add New Project → Import Git Repository</strong>. Your
              site will be live on a public URL in ~60 seconds.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex items-center gap-2 text-base font-bold text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-xs font-black text-slate-950">
                2
              </span>
              Get Your Free Amazon Associates Tag &amp; Paste It in 1 Place
            </div>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Sign up at{" "}
              <a
                href="https://affiliate-program.amazon.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 underline"
              >
                affiliate-program.amazon.com
              </a>{" "}
              using your live URL. Once Amazon gives you your Tracking ID (e.g.,{" "}
              <code className="text-emerald-300">yourname-20</code>), either:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-300">
              <li>
                Open <code className="text-amber-300">src/config/affiliate.ts</code>{" "}
                and change <code className="text-amber-300">&quot;wattsizer-20&quot;</code>{" "}
                to your tag, <strong>OR</strong>
              </li>
              <li>
                Add{" "}
                <code className="text-amber-300">
                  NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=yourname-20
                </code>{" "}
                in your Vercel Project Environment Variables.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex items-center gap-2 text-base font-bold text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-xs font-black text-slate-950">
                3
              </span>
              Let Organic Search Traffic Come to You (Zero Customer Hunting)
            </div>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your site already auto-generates{" "}
              <strong className="text-white">
                {APPLIANCES.length} Appliance Runtime Landing Pages
              </strong>{" "}
              (<code className="text-amber-300">/can-it-run/refrigerator</code>,{" "}
              <code className="text-amber-300">/can-it-run/cpap-machine</code>,{" "}
              <code className="text-amber-300">/can-it-run/sump-pump</code>, etc.)
              and{" "}
              <strong className="text-white">
                {COMPARISON_PAIRS.length} Head-to-Head VS Pages
              </strong>{" "}
              plus an automatic <code className="text-amber-300">/sitemap.xml</code>.
              Submit <code className="text-amber-300">https://your-domain.com/sitemap.xml</code>{" "}
              to Google Search Console and Bing Webmaster Tools so buyers searching
              for blackout sizing land directly on your calculator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

