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

