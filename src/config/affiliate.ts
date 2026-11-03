/**
 * SINGLE-FILE AMAZON ASSOCIATES CONFIGURATION
 * ============================================
 * Your Tracking ID is set below (or via NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG in Vercel).
 * Every product link across the site uses it automatically.
 */

export const SITE_CONFIG = {
  name: "WattSizer",
  tagline: "Portable Power Station & Solar Generator Sizing Calculator",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://wattsizer.vercel.app",
  amazonAssociateTag:
    process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || "wattsizer-20",
  amazonMarketplace: "www.amazon.com",
  defaultInverterEfficiency: 0.85, // assumed usable fraction of rated Wh after AC inverter losses
  defaultSafetyBuffer: 1.15,
};

/** Short affiliate disclosure shown near every block of Amazon links. */
export const AFFILIATE_DISCLOSURE =
  "As an Amazon Associate I earn from qualifying purchases.";

/**
 * Builds an Amazon Associates link.
 * Uses the product page when a confirmed ASIN is available; otherwise a tagged search.
 */
export function getAmazonProductUrl(
  asin: string | null | undefined,
  fallbackQuery: string
): string {
  const tag = encodeURIComponent(SITE_CONFIG.amazonAssociateTag);
  if (asin && /^[A-Z0-9]{10}$/.test(asin)) {
    return `https://${SITE_CONFIG.amazonMarketplace}/dp/${asin}?tag=${tag}`;
  }
  const query = encodeURIComponent(fallbackQuery);
  return `https://${SITE_CONFIG.amazonMarketplace}/s?k=${query}&tag=${tag}`;
}

/** Tagged Amazon search for a power station + solar panel bundle. */
export function getAmazonBundleUrl(bundleQuery: string): string {
  const tag = encodeURIComponent(SITE_CONFIG.amazonAssociateTag);
  const query = encodeURIComponent(bundleQuery);
  return `https://${SITE_CONFIG.amazonMarketplace}/s?k=${query}&tag=${tag}`;
}
