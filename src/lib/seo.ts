import { Appliance } from "@/data/appliances";
import { PowerStation } from "@/data/powerStations";
import { calculateApplianceRuntime } from "@/lib/calculator";

/**
 * Model × appliance pages are generated from one template. To avoid looking like
 * mass-produced thin content, only the pairings people actually search for (and that
 * the station can actually run) are indexed and listed in the sitemap. All other
 * combinations stay live for visitors but are marked noindex.
 */
export const INDEXED_COMBO_APPLIANCE_SLUGS = new Set([
  "refrigerator",
  "cpap-machine",
  "sump-pump",
  "starlink",
]);

export function isIndexableCombo(
  station: PowerStation,
  appliance: Appliance
): boolean {
  if (!INDEXED_COMBO_APPLIANCE_SLUGS.has(appliance.slug)) return false;
  return calculateApplianceRuntime(station, appliance).canRun;
}


export function breadcrumbJsonLd(
  base: string,
  crumbs: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${base}${c.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Appends the brand only when the result still fits in a search result (~62 chars). */
export function pageTitle(title: string): string {
  const branded = `${title} | WattSizer`;
  return branded.length <= 62 ? branded : title;
}

/** Trims a meta description to ~155 chars, preferring a sentence end, else a word break. */
export function metaDescription(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentenceEnd = Math.max(
    cut.lastIndexOf(". "),
    cut.lastIndexOf("? "),
    cut.lastIndexOf("! ")
  );
  if (sentenceEnd > 80) return cut.slice(0, sentenceEnd + 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—–-]$/, "") + "…";
}
