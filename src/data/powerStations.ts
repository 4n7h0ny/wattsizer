export type PowerBrand = "EcoFlow" | "Jackery" | "Anker SOLIX" | "BLUETTI";

/**
 * Product data notes (last reviewed Nov 2026):
 * - Specs come from manufacturer-published figures cross-checked against independent
 *   reviews. Cycle-life ratings use each brand's own test basis (70% vs 80% capacity).
 * - DO NOT add prices, star ratings, review counts, "Prime", "best seller", or coupon
 *   claims to anything that gets rendered. The Amazon Associates Operating Agreement only
 *   allows prices/ratings pulled live from the Product Advertising API.
 * - `amazonAsin` is only set when the ASIN was independently confirmed. When it is null,
 *   links fall back to a tagged Amazon search (never a dead page, still earns commission).
 *   You can replace these with exact product links from Amazon SiteStripe at any time.
 */
export interface PowerStation {
  id: string;
  slug: string;
  brand: PowerBrand;
  name: string;
  shortName: string;
  capacityWh: number;
  continuousWatts: number;
  surgeWatts: number;
  solarInputMaxWatts: number;
  batteryChemistry: "LiFePO4 (LFP)";
  /** Manufacturer-rated cycle life (test basis varies by brand). */
  cycleLife: number;
  weightLbs: number;
  acOutlets: number;
  expandableMaxWh: number | null;
  /**
   * INTERNAL ONLY. Rough list price used solely to order recommendations.
   * Never render this value anywhere on the site.
   */
  approxListPriceUsd: number;
  amazonAsin: string | null;
  amazonSearchQuery: string;
  solarBundleSearchQuery: string;
  tierBadge: string;
  bestFor: string;
  summary: string;
  pros: string[];
  cons: string[];
}

export interface ComparisonPair {
  slug: string;
  stationAId: string;
  stationBId: string;
  title: string;
  subtitle: string;
  verdictSummary: string;
  winnerForBlackouts: string;
  winnerForPortability: string;
  overallEdge: string;
}

export const POWER_STATIONS: PowerStation[] = [
  {
    id: "jackery-300-plus",
    slug: "jackery-explorer-300-plus",
    brand: "Jackery",
    name: "Jackery Explorer 300 Plus",
    shortName: "Jackery 300 Plus",
    capacityWh: 288,
    continuousWatts: 300,
    surgeWatts: 600,
    solarInputMaxWatts: 100,
    batteryChemistry: "LiFePO4 (LFP)",
    cycleLife: 3000,
    weightLbs: 8.27,
    acOutlets: 1,
    expandableMaxWh: null,
    approxListPriceUsd: 299,
    amazonAsin: null,
    amazonSearchQuery: "Jackery Explorer 300 Plus portable power station",
    solarBundleSearchQuery: "Jackery Solar Generator 300 Plus solar panel",
    tierBadge: "Lightest Pick (Under 10 lbs)",
    bestFor: "CPAP (on DC), Wi-Fi router backup, phones, laptops & LED lights",
    summary:
      "A small 288Wh LiFePO4 unit that weighs just over 8 lbs. Good for phones, laptops, Wi-Fi routers, lights and CPAP machines (best run on DC power), not for kitchen appliances.",
    pros: [
      "Very light at 8.27 lbs",
      "One 100W USB-C PD port can charge most laptops directly",
      "LiFePO4 battery rated for 3,000 cycles",
    ],
    cons: [
      "300W inverter (600W surge) can't start a full-size fridge or run kitchen appliances",
      "Only one AC outlet",
      "100W max solar input",
    ],
  },
  {
    id: "ecoflow-river-2-pro",
    slug: "ecoflow-river-2-pro",
    brand: "EcoFlow",
    name: "EcoFlow RIVER 2 Pro",
    shortName: "EcoFlow RIVER 2 Pro",
    capacityWh: 768,
    continuousWatts: 800,
    surgeWatts: 1600,
    solarInputMaxWatts: 220,
    batteryChemistry: "LiFePO4 (LFP)",
    cycleLife: 3000,
    weightLbs: 17.2,
    acOutlets: 4,
    expandableMaxWh: null,
    approxListPriceUsd: 449,
    amazonAsin: "B0BVLPGS79",
    amazonSearchQuery: "EcoFlow RIVER 2 Pro portable power station 768Wh",
    solarBundleSearchQuery: "EcoFlow RIVER 2 Pro solar generator solar panel",
    tierBadge: "Mid-Size Pick",
    bestFor: "Multi-night CPAP, 12V camping fridges, Starlink & short fridge backup",
    summary:
      "Sits between small camping batteries and full home-backup units. 768Wh is enough for several CPAP nights or a 12V camping fridge for more than a day.",
    pros: [
      "768Wh capacity with 4 AC outlets at 17.2 lbs",
      "0–100% wall recharge in about 70 minutes (EcoFlow spec)",
      "EPS backup mode with <30ms switchover for routers and CPAPs",
    ],
    cons: [
      "800W inverter is too small for microwaves, coffee makers and most sump pumps",
      "Not expandable",
      "220W max solar input",
    ],
  },
  {
    id: "ecoflow-delta-2",
    slug: "ecoflow-delta-2",
    brand: "EcoFlow",
    name: "EcoFlow DELTA 2",
    shortName: "EcoFlow DELTA 2",
    capacityWh: 1024,
    continuousWatts: 1800,
    surgeWatts: 2700,
    solarInputMaxWatts: 500,
    batteryChemistry: "LiFePO4 (LFP)",
    cycleLife: 3000,
    weightLbs: 27.0,
    acOutlets: 6,
    expandableMaxWh: 3040,
    approxListPriceUsd: 649,
    amazonAsin: null,
    amazonSearchQuery: "EcoFlow DELTA 2 portable power station 1024Wh",
    solarBundleSearchQuery: "EcoFlow DELTA 2 solar generator solar panel bundle",
    tierBadge: "Best All-Round 1kWh Pick",
    bestFor: "Full-size refrigerators, coffee makers, microwaves & 1-day home blackouts",
    summary:
      "A balanced 1kWh-class unit: a 1,800W inverter (2,700W surge) covers most single household appliances, it weighs 27 lbs, and it can expand to 3,040Wh later with an extra battery.",
    pros: [
      "1,800W continuous / 2,700W surge handles fridges, coffee makers and microwaves (one at a time)",
      "0–80% wall charge in about 50 minutes (EcoFlow spec)",
      "Expandable to 3,040Wh with an extra battery",
      "6 AC outlets, app control and a 5-year warranty",
    ],
    cons: [
      "30ms EPS switchover suits most devices but isn't a true online UPS for sensitive desktop PCs",
      "500W max solar input is lower than the Anker SOLIX C1000 (600W)",
    ],
  },
  {
    id: "jackery-1000-v2",
    slug: "jackery-explorer-1000-v2",
    brand: "Jackery",
    name: "Jackery Explorer 1000 v2",
    shortName: "Jackery 1000 v2",
    capacityWh: 1070,
    continuousWatts: 1500,
    surgeWatts: 3000,
    solarInputMaxWatts: 400,
    batteryChemistry: "LiFePO4 (LFP)",
    cycleLife: 4000,
    weightLbs: 23.8,
    acOutlets: 3,
    expandableMaxWh: null,
    approxListPriceUsd: 649,
    amazonAsin: "B0D7PPG25F",
    amazonSearchQuery: "Jackery Explorer 1000 v2 portable power station",
    solarBundleSearchQuery: "Jackery Solar Generator 1000 v2 solar panel",
    tierBadge: "Lightest 1kWh-Class Pick",
    bestFor: "Easy-to-carry home backup, refrigerators, CPAP & family camping",
    summary:
      "The lightest 1kWh-class unit on our list at 23.8 lbs. Its 3,000W surge rating gives good headroom for starting motors like fridge compressors.",
    pros: [
      "Lightest 1kWh-class unit on our list (23.8 lbs)",
      "Rated 4,000 cycles to 70% capacity",
      "3,000W surge rating, the highest in the 1kWh class on our list",
    ],
    cons: [
      "Only 3 AC outlets",
      "1,500W continuous output is lower than the DELTA 2, C1000 and AC180 (1,800W)",
      "Not expandable",
    ],
  },
  {
    id: "anker-solix-c1000",
    slug: "anker-solix-c1000",
    brand: "Anker SOLIX",
    name: "Anker SOLIX C1000",
    shortName: "Anker SOLIX C1000",
    capacityWh: 1056,
    continuousWatts: 1800,
    surgeWatts: 2400,
    solarInputMaxWatts: 600,
    batteryChemistry: "LiFePO4 (LFP)",
    cycleLife: 3000,
    weightLbs: 28.4,
    acOutlets: 6,
    expandableMaxWh: 2112,
    approxListPriceUsd: 649,
    amazonAsin: null,
    amazonSearchQuery: "Anker SOLIX C1000 portable power station",
    solarBundleSearchQuery: "Anker SOLIX C1000 solar generator solar panel",
    tierBadge: "Fastest Solar Charging (1kWh Class)",
    bestFor: "Solar recharging, kitchen appliances & expandable home backup",
    summary:
      "A 1,056Wh unit with the highest solar input in its class on our list (600W), UPS switchover under 20ms, and expansion to 2,112Wh with Anker's BP1000 battery.",
    pros: [
      "600W max solar input, the highest of the 1kWh-class units on our list",
      "UPS mode with <20ms switchover",
      "Expandable to 2,112Wh with the BP1000 expansion battery",
      "6 AC outlets",
    ],
    cons: [
      "2,400W surge is lower than the DELTA 2 (2,700W) and Jackery 1000 v2 (3,000W)",
      "28.4 lbs, heavier than the DELTA 2 and Jackery 1000 v2",
    ],
  },
  {
    id: "bluetti-ac180",
    slug: "bluetti-ac180",
    brand: "BLUETTI",
    name: "BLUETTI AC180",
    shortName: "BLUETTI AC180",
    capacityWh: 1152,
    continuousWatts: 1800,
    surgeWatts: 2700,
    solarInputMaxWatts: 500,
    batteryChemistry: "LiFePO4 (LFP)",
    cycleLife: 3500,
    weightLbs: 35.3,
    acOutlets: 4,
    expandableMaxWh: null,
    approxListPriceUsd: 599,
    amazonAsin: "B0C1SMJTDT",
    amazonSearchQuery: "BLUETTI AC180 portable power station",
    solarBundleSearchQuery: "BLUETTI AC180 solar generator solar panel",
    tierBadge: "Most Capacity (1kWh Class)",
    bestFor: "Maximum runtime in the 1kWh class & off-grid cabins",
    summary:
      "Has the most capacity of the 1kWh-class units on our list (1,152Wh), with an 1,800W inverter. The trade-off is weight: it's the heaviest unit in its class here.",
    pros: [
      "1,152Wh, about 10% more than 1,024–1,070Wh rivals",
      "1,800W continuous / 2,700W surge",
      "Rated 3,500+ cycles",
    ],
    cons: [
      "Heaviest 1kWh-class unit on our list (35.3 lbs)",
      "4 AC outlets vs. 6 on the DELTA 2 and C1000",
    ],
  },
  {
    id: "ecoflow-delta-2-max",
    slug: "ecoflow-delta-2-max",
    brand: "EcoFlow",
    name: "EcoFlow DELTA 2 Max",
    shortName: "EcoFlow DELTA 2 Max",
    capacityWh: 2048,
    continuousWatts: 2400,
    surgeWatts: 4800,
    solarInputMaxWatts: 1000,
    batteryChemistry: "LiFePO4 (LFP)",
    cycleLife: 3000,
    weightLbs: 50.0,
    acOutlets: 6,
    expandableMaxWh: 6144,
    approxListPriceUsd: 1399,
    amazonAsin: "B0C4DW17PD",
    amazonSearchQuery: "EcoFlow DELTA 2 Max portable power station 2048Wh",
    solarBundleSearchQuery: "EcoFlow DELTA 2 Max solar generator solar panel",
    tierBadge: "Best 2kWh Home Backup Pick",
    bestFor: "Multi-day fridge + freezer, sump pumps, window AC & power tools",
    summary:
      "2,048Wh with a 2,400W inverter (4,800W surge) and up to 1,000W of solar input. At about 50 lbs it's the lightest 2kWh unit on our list, and it expands to 6,144Wh.",
    pros: [
      "2,400W continuous / 4,800W surge for motor loads like sump pumps",
      "Up to 1,000W solar input",
      "Expandable to 6,144Wh with two extra batteries",
      "Lightest 2kWh unit on our list (~50 lbs) with 6 AC outlets",
    ],
    cons: [
      "No wheels; it's a two-handle carry",
      "Too heavy for casual camping carry",
    ],
  },
  {
    id: "anker-solix-f2000",
    slug: "anker-solix-f2000",
    brand: "Anker SOLIX",
    name: "Anker SOLIX F2000 (PowerHouse 767)",
    shortName: "Anker SOLIX F2000",
    capacityWh: 2048,
    continuousWatts: 2400,
    surgeWatts: 3600,
    solarInputMaxWatts: 1000,
    batteryChemistry: "LiFePO4 (LFP)",
    cycleLife: 3000,
    weightLbs: 67.3,
    acOutlets: 4,
    expandableMaxWh: 4096,
    approxListPriceUsd: 1399,
    amazonAsin: "B09XM7WDZ2",
    amazonSearchQuery: "Anker SOLIX F2000 PowerHouse 767 portable power station",
    solarBundleSearchQuery: "Anker SOLIX F2000 solar generator solar panel",
    tierBadge: "Best Wheeled / RV Pick",
    bestFor: "RVs (TT-30 outlet), easy rolling mobility & whole-room backup",
    summary:
      "A 2,048Wh unit with wheels and a telescoping handle, plus a NEMA TT-30 RV outlet alongside 4 household AC outlets.",
    pros: [
      "Wheels and telescoping handle; no lifting needed on flat ground",
      "NEMA TT-30 RV outlet plus 4 household AC outlets",
      "2,400W continuous / 3,600W surge",
      "Expandable to 4,096Wh with Anker's expansion battery",
    ],
    cons: [
      "67.3 lbs, the heaviest 2kWh unit on our list",
      "3,600W surge is lower than the DELTA 2 Max (4,800W) and Jackery 2000 Plus (6,000W)",
    ],
  },
  {
    id: "jackery-2000-plus",
    slug: "jackery-explorer-2000-plus",
    brand: "Jackery",
    name: "Jackery Explorer 2000 Plus",
    shortName: "Jackery 2000 Plus",
    capacityWh: 2042,
    continuousWatts: 3000,
    surgeWatts: 6000,
    solarInputMaxWatts: 1400,
    batteryChemistry: "LiFePO4 (LFP)",
    cycleLife: 4000,
    weightLbs: 61.5,
    acOutlets: 4,
    expandableMaxWh: 12000,
    approxListPriceUsd: 1499,
    amazonAsin: null,
    amazonSearchQuery: "Jackery Explorer 2000 Plus portable power station",
    solarBundleSearchQuery: "Jackery Solar Generator 2000 Plus solar panel",
    tierBadge: "Highest Output (2kWh Class)",
    bestFor: "Well pumps, sump pumps, power tools & modular whole-home expansion",
    summary:
      "The highest-output 2kWh unit on our list: 3,000W continuous and 6,000W surge, on wheels, with expansion to about 12kWh using add-on battery packs.",
    pros: [
      "3,000W continuous / 6,000W surge, the highest in the 2kWh class on our list",
      "Up to 1,400W solar input",
      "Rated 4,000 cycles to 70% capacity",
      "Built-in wheels; expandable to ~12kWh",
    ],
    cons: [
      "61.5 lbs",
      "Uses Jackery's own solar connectors, so third-party panels may need an adapter",
    ],
  },
  {
    id: "ecoflow-delta-pro",
    slug: "ecoflow-delta-pro",
    brand: "EcoFlow",
    name: "EcoFlow DELTA Pro (3,600Wh)",
    shortName: "EcoFlow DELTA Pro",
    capacityWh: 3600,
    continuousWatts: 3600,
    surgeWatts: 7200,
    solarInputMaxWatts: 1600,
    batteryChemistry: "LiFePO4 (LFP)",
    cycleLife: 3500,
    weightLbs: 99.0,
    acOutlets: 5,
    expandableMaxWh: 10800,
    approxListPriceUsd: 2399,
    amazonAsin: null,
    amazonSearchQuery: "EcoFlow DELTA Pro portable power station 3600Wh",
    solarBundleSearchQuery: "EcoFlow DELTA Pro solar generator solar panel",
    tierBadge: "Largest Capacity on Our List",
    bestFor: "Multi-day outages, transfer-switch home backup & off-grid cabins",
    summary:
      "3,600Wh with a 3,600W inverter (7,200W surge) and up to 1,600W of solar input. Expandable to 10.8kWh, but at 99 lbs it's built to roll, not carry.",
    pros: [
      "3,600Wh, the largest capacity on our list",
      "3,600W continuous / 7,200W surge",
      "Up to 1,600W solar input; expandable to 10.8kWh with two extra batteries",
      "Rated 3,500 cycles to 80% capacity",
    ],
    cons: [
      "99 lbs; it has wheels but isn't stair-friendly",
      "Older generation, so compare it with EcoFlow's newer DELTA Pro 3 before buying",
    ],
  },
];

export const COMPARISON_PAIRS: ComparisonPair[] = [
  {
    slug: "ecoflow-delta-2-vs-jackery-1000-v2",
    stationAId: "ecoflow-delta-2",
    stationBId: "jackery-1000-v2",
    title: "EcoFlow DELTA 2 vs. Jackery Explorer 1000 v2",
    subtitle:
      "Two popular 1kWh-class LiFePO4 power stations compared on output, weight, outlets and expandability.",
    verdictSummary:
      "Choose the EcoFlow DELTA 2 if you want 6 AC outlets, higher 1,800W continuous output, and the option to add an expansion battery later. Choose the Jackery Explorer 1000 v2 if you want the lighter unit (23.8 lbs vs. 27 lbs), a higher 3,000W surge rating, and a 4,000-cycle battery rating.",
    winnerForBlackouts: "EcoFlow DELTA 2 (expandable to 3,040Wh, 6 AC outlets)",
    winnerForPortability: "Jackery Explorer 1000 v2 (3.2 lbs lighter)",
    overallEdge: "Depends on your needs: DELTA 2 for flexibility, Jackery for carry weight",
  },
  {
    slug: "anker-solix-c1000-vs-bluetti-ac180",
    stationAId: "anker-solix-c1000",
    stationBId: "bluetti-ac180",
    title: "Anker SOLIX C1000 vs. BLUETTI AC180",
    subtitle:
      "600W solar charging and expandability vs. the most base capacity in the 1kWh class.",
    verdictSummary:
      "Pick the Anker SOLIX C1000 if you want the lighter unit (28.4 vs. 35.3 lbs), faster 600W solar input, UPS switchover under 20ms, and expansion to 2,112Wh. Pick the BLUETTI AC180 if you want about 9% more base capacity (1,152Wh) in a standalone unit.",
    winnerForBlackouts: "Anker SOLIX C1000 (<20ms UPS + expandable to 2,112Wh)",
    winnerForPortability: "Anker SOLIX C1000 (about 7 lbs lighter)",
    overallEdge: "BLUETTI AC180 for base capacity; Anker C1000 for solar and expansion",
  },
  {
    slug: "ecoflow-delta-2-max-vs-anker-solix-f2000",
    stationAId: "ecoflow-delta-2-max",
    stationBId: "anker-solix-f2000",
    title: "EcoFlow DELTA 2 Max vs. Anker SOLIX F2000 (767)",
    subtitle:
      "2,048Wh head-to-head: a ~50 lb two-handle carry vs. a wheeled unit with a TT-30 RV outlet.",
    verdictSummary:
      "Get the Anker SOLIX F2000 if you have an RV (TT-30 outlet) or want wheels and a telescoping handle. Get the EcoFlow DELTA 2 Max if you need to carry it up stairs (about 17 lbs lighter), want a higher 4,800W surge rating for motor loads, or want to expand to 6,144Wh.",
    winnerForBlackouts: "EcoFlow DELTA 2 Max (4,800W surge + 6,144Wh expansion)",
    winnerForPortability: "Anker SOLIX F2000 on flat ground (wheels); DELTA 2 Max on stairs",
    overallEdge: "Same 2,048Wh capacity; choose by how you'll move it",
  },
  {
    slug: "ecoflow-delta-2-vs-anker-solix-c1000",
    stationAId: "ecoflow-delta-2",
    stationBId: "anker-solix-c1000",
    title: "EcoFlow DELTA 2 vs. Anker SOLIX C1000",
    subtitle:
      "Two 1,800W, 6-outlet power stations compared on surge, solar input, UPS speed and expansion.",
    verdictSummary:
      "Both deliver 1,800W continuous and 6 AC outlets. The Anker SOLIX C1000 has faster solar input (600W vs. 500W) and faster UPS switchover (<20ms vs. 30ms). The EcoFlow DELTA 2 has a higher surge rating (2,700W vs. 2,400W), a higher expansion ceiling (3,040Wh vs. 2,112Wh), and is slightly lighter.",
    winnerForBlackouts: "Anker SOLIX C1000 for UPS speed; DELTA 2 for expansion ceiling",
    winnerForPortability: "EcoFlow DELTA 2 (1.4 lbs lighter)",
    overallEdge: "Very close; pick by solar (Anker) vs. expansion and surge (EcoFlow)",
  },
  {
    slug: "jackery-2000-plus-vs-ecoflow-delta-pro",
    stationAId: "jackery-2000-plus",
    stationBId: "ecoflow-delta-pro",
    title: "Jackery Explorer 2000 Plus vs. EcoFlow DELTA Pro",
    subtitle:
      "A modular 2,042Wh wheeled station vs. a 3,600Wh whole-home backup unit.",
    verdictSummary:
      "The Jackery Explorer 2000 Plus is about 37 lbs lighter and still has a 3,000W inverter with 6,000W surge. The EcoFlow DELTA Pro suits homeowners who want 3,600Wh in a single box for multi-day outages or a transfer-switch setup.",
    winnerForBlackouts: "EcoFlow DELTA Pro (3,600Wh base capacity, ~75% more out of the box)",
    winnerForPortability: "Jackery Explorer 2000 Plus (61.5 lbs vs. 99 lbs)",
    overallEdge: "Jackery for output per pound; DELTA Pro for raw capacity",
  },
  {
    slug: "jackery-1000-v2-vs-anker-solix-c1000",
    stationAId: "jackery-1000-v2",
    stationBId: "anker-solix-c1000",
    title: "Jackery Explorer 1000 v2 vs. Anker SOLIX C1000",
    subtitle:
      "A 23.8 lb unit with a 4,000-cycle rating vs. 1,800W output, 600W solar and 6 outlets.",
    verdictSummary:
      "Choose the Jackery Explorer 1000 v2 if weight matters most (4.6 lbs lighter) or you want the higher 3,000W surge rating. Choose the Anker SOLIX C1000 if you need 6 AC outlets, 1,800W continuous output, 50% faster solar input (600W vs. 400W), and expansion.",
    winnerForBlackouts: "Anker SOLIX C1000 (1,800W, 6 outlets, expandable to 2,112Wh)",
    winnerForPortability: "Jackery Explorer 1000 v2 (23.8 lbs)",
    overallEdge: "Anker for features; Jackery for weight and surge headroom",
  },
  {
    slug: "ecoflow-delta-2-vs-bluetti-ac180",
    stationAId: "ecoflow-delta-2",
    stationBId: "bluetti-ac180",
    title: "EcoFlow DELTA 2 vs. BLUETTI AC180",
    subtitle:
      "A 27 lb expandable unit vs. a 1,152Wh standalone unit with more base capacity.",
    verdictSummary:
      "The EcoFlow DELTA 2 is about 8 lbs lighter, has 6 AC outlets (vs. 4), and can expand to 3,040Wh. The BLUETTI AC180 gives you 128Wh more base capacity with the same 1,800W / 2,700W inverter ratings.",
    winnerForBlackouts: "EcoFlow DELTA 2 (expandable to 3,040Wh)",
    winnerForPortability: "EcoFlow DELTA 2 (27 lbs vs. 35.3 lbs)",
    overallEdge: "AC180 for base capacity; DELTA 2 for weight, outlets and expansion",
  },
  {
    slug: "jackery-1000-v2-vs-bluetti-ac180",
    stationAId: "jackery-1000-v2",
    stationBId: "bluetti-ac180",
    title: "Jackery Explorer 1000 v2 vs. BLUETTI AC180",
    subtitle:
      "Jackery's 23.8 lb 1,070Wh unit vs. BLUETTI's 1,152Wh AC180.",
    verdictSummary:
      "At 23.8 lbs, the Jackery 1000 v2 is about 11.5 lbs lighter than the BLUETTI AC180, which makes it much easier to carry. The AC180 has higher continuous output (1,800W vs. 1,500W) and slightly more capacity; the Jackery has the higher surge rating (3,000W vs. 2,700W).",
    winnerForBlackouts: "BLUETTI AC180 (1,800W continuous + 1,152Wh)",
    winnerForPortability: "Jackery Explorer 1000 v2 (about 11.5 lbs lighter)",
    overallEdge: "Close; choose by weight (Jackery) vs. capacity and output (BLUETTI)",
  },
  {
    slug: "jackery-300-plus-vs-ecoflow-river-2-pro",
    stationAId: "jackery-300-plus",
    stationBId: "ecoflow-river-2-pro",
    title: "Jackery Explorer 300 Plus vs. EcoFlow RIVER 2 Pro",
    subtitle:
      "An 8 lb ultralight vs. a 768Wh weekend camping and CPAP unit.",
    verdictSummary:
      "The Jackery Explorer 300 Plus suits backpacking and desk backup, where 8 lbs matters most. The EcoFlow RIVER 2 Pro gives you about 2.7x the capacity (768Wh vs. 288Wh), 4 AC outlets and an 800W inverter, at roughly twice the weight.",
    winnerForBlackouts: "EcoFlow RIVER 2 Pro (2.7x capacity + 800W inverter)",
    winnerForPortability: "Jackery Explorer 300 Plus (8.27 lbs)",
    overallEdge: "RIVER 2 Pro unless weight is your top priority",
  },
  {
    slug: "ecoflow-delta-2-max-vs-jackery-2000-plus",
    stationAId: "ecoflow-delta-2-max",
    stationBId: "jackery-2000-plus",
    title: "EcoFlow DELTA 2 Max vs. Jackery Explorer 2000 Plus",
    subtitle:
      "A 2,048Wh two-handle home backup vs. a 3,000W wheeled unit.",
    verdictSummary:
      "Choose the EcoFlow DELTA 2 Max if you want a ~50 lb unit you can carry up stairs, with 6 AC outlets. Choose the Jackery Explorer 2000 Plus if you want wheels, higher 3,000W / 6,000W output, a 4,000-cycle rating, and larger expansion (~12kWh).",
    winnerForBlackouts: "Jackery Explorer 2000 Plus (3,000W / 6,000W surge)",
    winnerForPortability: "EcoFlow DELTA 2 Max on stairs (11.5 lbs lighter); Jackery on flat ground (wheels)",
    overallEdge: "Jackery for heavy motor loads; DELTA 2 Max for carry weight",
  },
  {
    slug: "anker-solix-f2000-vs-jackery-2000-plus",
    stationAId: "anker-solix-f2000",
    stationBId: "jackery-2000-plus",
    title: "Anker SOLIX F2000 vs. Jackery Explorer 2000 Plus",
    subtitle:
      "Two wheeled 2kWh power stations compared.",
    verdictSummary:
      "Both have wheels. The Anker SOLIX F2000 adds a dedicated TT-30 RV outlet. The Jackery 2000 Plus offers higher output (3,000W vs. 2,400W continuous; 6,000W vs. 3,600W surge), more solar input (1,400W vs. 1,000W), and much larger expansion.",
    winnerForBlackouts: "Jackery Explorer 2000 Plus (higher output + ~12kWh expansion)",
    winnerForPortability: "Jackery Explorer 2000 Plus (about 6 lbs lighter)",
    overallEdge: "Jackery on specs; Anker if you specifically need the TT-30 RV outlet",
  },
  {
    slug: "ecoflow-delta-2-max-vs-ecoflow-delta-pro",
    stationAId: "ecoflow-delta-2-max",
    stationBId: "ecoflow-delta-pro",
    title: "EcoFlow DELTA 2 Max vs. EcoFlow DELTA Pro",
    subtitle:
      "Should you get the 2,048Wh DELTA 2 Max or step up to the 3,600Wh DELTA Pro?",
    verdictSummary:
      "The DELTA 2 Max (~50 lbs) covers most homeowners: it runs refrigerators, freezers and sump pumps and can still be carried by hand. Step up to the 99 lb wheeled DELTA Pro if you want 3,600Wh in one box or plan to feed a home transfer switch through its 30A outlet.",
    winnerForBlackouts: "EcoFlow DELTA Pro (3,600Wh + 3,600W)",
    winnerForPortability: "EcoFlow DELTA 2 Max (half the weight)",
    overallEdge: "DELTA 2 Max for most homes; DELTA Pro for multi-day whole-home backup",
  },
  {
    slug: "ecoflow-river-2-pro-vs-ecoflow-delta-2",
    stationAId: "ecoflow-river-2-pro",
    stationBId: "ecoflow-delta-2",
    title: "EcoFlow RIVER 2 Pro vs. EcoFlow DELTA 2",
    subtitle:
      "A 768Wh camping and CPAP unit vs. a 1,024Wh unit that can handle kitchen appliances.",
    verdictSummary:
      "If you only need to power a CPAP, Starlink, Wi-Fi router or 12V car cooler, the 17.2 lb RIVER 2 Pro is enough. If you want to back up a full-size refrigerator, coffee maker or microwave, the DELTA 2's 1,800W inverter is the safer choice.",
    winnerForBlackouts: "EcoFlow DELTA 2 (1,800W inverter runs kitchen appliances)",
    winnerForPortability: "EcoFlow RIVER 2 Pro (nearly 10 lbs lighter)",
    overallEdge: "DELTA 2 for home backup; RIVER 2 Pro for light loads and travel",
  },
  {
    slug: "anker-solix-c1000-vs-anker-solix-f2000",
    stationAId: "anker-solix-c1000",
    stationBId: "anker-solix-f2000",
    title: "Anker SOLIX C1000 vs. Anker SOLIX F2000",
    subtitle:
      "Anker's compact 1,056Wh C1000 vs. the wheeled 2,048Wh F2000.",
    verdictSummary:
      "The Anker SOLIX C1000 (28.4 lbs) is easy to carry and can roughly match the F2000's capacity if you add the BP1000 expansion battery. Choose the F2000 if you need a 2,400W inverter, wheels and a 30A RV outlet.",
    winnerForBlackouts: "Anker SOLIX F2000 (double the base capacity + 2,400W)",
    winnerForPortability: "Anker SOLIX C1000 (about 39 lbs lighter)",
    overallEdge: "C1000 + expansion for flexibility; F2000 for RVs",
  },
  {
    slug: "jackery-1000-v2-vs-jackery-2000-plus",
    stationAId: "jackery-1000-v2",
    stationBId: "jackery-2000-plus",
    title: "Jackery Explorer 1000 v2 vs. Jackery Explorer 2000 Plus",
    subtitle:
      "A portable 1,070Wh unit vs. an expandable 2,042Wh wheeled home backup.",
    verdictSummary:
      "The Explorer 1000 v2 is a grab-and-go 23.8 lb unit for 1-day blackouts and camping. The Explorer 2000 Plus roughly doubles capacity (2,042Wh) and continuous output (3,000W) on wheels, for sump pumps, well pumps and multi-day outages.",
    winnerForBlackouts: "Jackery Explorer 2000 Plus (2x capacity + 3,000W)",
    winnerForPortability: "Jackery Explorer 1000 v2 (23.8 lbs vs. 61.5 lbs)",
    overallEdge: "1000 v2 for most single-appliance needs; 2000 Plus for heavy loads",
  },
];
