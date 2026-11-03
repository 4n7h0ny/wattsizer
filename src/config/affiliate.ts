/**
 * SINGLE-FILE AMAZON ASSOCIATES CONFIGURATION
 * ============================================
 * Once you create your free Amazon Associates account at:
 * https://affiliate-program.amazon.com/
 *
 * Replace "wattsizer-20" below with your own Tracking ID (e.g., "yourname-20"),
 * or set NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG in your .env.local / Vercel Environment Variables.
 * Every single product link, comparison table, calculator recommendation, and solar bundle
 * across the entire site updates automatically!
 */

export const SITE_CONFIG = {
  name: "WattSizer",
  tagline: "Precision Portable Power Station & Solar Generator Sizer",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://wattsizer.vercel.app",
  amazonAssociateTag:
    process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || "wattsizer-20",
  amazonMarketplace: "www.amazon.com",
  defaultInverterEfficiency: 0.85, // 85% real-world AC inverter & DoD usable capacity
  defaultSafetyBuffer: 1.15, // 15% recommended headroom so users don't buy undersized units
};

/**
 * Generates an Amazon Associates tracked product link.
 * Uses direct ASIN product page when available, or high-converting Amazon search query with tag.
 */
export function getAmazonProductUrl(asin: string, fallbackQuery?: string): string {
  const tag = encodeURIComponent(SITE_CONFIG.amazonAssociateTag);
  if (asin && asin.length === 10) {
    return `https://${SITE_CONFIG.amazonMarketplace}/dp/${asin}?tag=${tag}&linkCode=ll1`;
  }
  const query = encodeURIComponent(fallbackQuery || asin);
  return `https://${SITE_CONFIG.amazonMarketplace}/s?k=${query}&tag=${tag}`;
}

/**
 * Generates an Amazon Associates search URL for a Solar Generator Bundle (+Solar Panels)
 * or compatible expansion battery / accessories on Amazon.
 */
export function getAmazonBundleUrl(bundleQuery: string, bundleAsin?: string): string {
  const tag = encodeURIComponent(SITE_CONFIG.amazonAssociateTag);
  if (bundleAsin && bundleAsin.length === 10) {
    return `https://${SITE_CONFIG.amazonMarketplace}/dp/${bundleAsin}?tag=${tag}&linkCode=ll1`;
  }
  const query = encodeURIComponent(bundleQuery);
  return `https://${SITE_CONFIG.amazonMarketplace}/s?k=${query}&tag=${tag}`;
}

