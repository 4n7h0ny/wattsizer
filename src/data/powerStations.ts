export type PowerBrand = "EcoFlow" | "Jackery" | "Anker SOLIX" | "BLUETTI";

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
  cycleLife: number;
  weightLbs: number;
  acChargeMinutes80: number;
  upsSwitchoverMs: number;
  acOutlets: number;
  expandableMaxWh: number | null;
  typicalAmazonPrice: number;
  typicalBundlePrice: number;
  recommendedSolarPanelText: string;
  amazonCouponHint: string;
  amazonAsin: string;
  amazonSearchQuery: string;
  solarBundleSearchQuery: string;
  rating: number;
  reviewCountText: string;
  tierBadge: string;
  bestFor: string;
  summary: string;
  pros: string[];
  cons: string[];
  accentColor: string;
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
  winnerForValue: string;
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
    acChargeMinutes80: 80,
    upsSwitchoverMs: 20,
    acOutlets: 1,
    expandableMaxWh: null,
    typicalAmazonPrice: 249,
    typicalBundlePrice: 349,
    recommendedSolarPanelText: "+ 40W or 100W Foldable Solar Panel Bundle",
    amazonCouponHint: "Frequently has $30–$50 clip coupon on Amazon",
    amazonAsin: "B0C9L9T9T3",
    amazonSearchQuery: "Jackery Explorer 300 Plus Portable Power Station LiFePO4",
    solarBundleSearchQuery:
      "Jackery Solar Generator 300 Plus with Solar Panel",
    rating: 4.7,
    reviewCountText: "2,400+ Amazon ratings",
    tierBadge: "Best Ultralight Under $300",
    bestFor: "CPAP camping, Wi-Fi router backup, phones, laptops & LED lights",
    summary:
      "At just 8.2 lbs, the Jackery Explorer 300 Plus fits in a backpack while offering a 10-year LiFePO4 battery for routers, CPAPs (DC mode), and weekend camping.",
    pros: [
      "Featherweight 8.27 lbs — lightest LiFePO4 unit in class",
      "100W dual USB-C PD ports charge MacBooks directly without bricks",
      "Whisper-quiet cooling fan & 3,000-cycle 10-year battery life",
    ],
    cons: [
      "300W inverter cannot run kitchen appliances or full-size refrigerators",
      "Only 1 AC wall outlet",
    ],
    accentColor: "#f97316",
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
    acChargeMinutes80: 56,
    upsSwitchoverMs: 30,
    acOutlets: 4,
    expandableMaxWh: null,
    typicalAmazonPrice: 429,
    typicalBundlePrice: 649,
    recommendedSolarPanelText: "+ EcoFlow 160W or 220W Bifacial Solar Panel",
    amazonCouponHint: "Check Amazon page for instant lightning deal / coupon",
    amazonAsin: "B0BVLPGS79",
    amazonSearchQuery: "EcoFlow RIVER 2 Pro Portable Power Station 768Wh LiFePO4",
    solarBundleSearchQuery:
      "EcoFlow RIVER 2 Pro Solar Generator with Solar Panel",
    rating: 4.6,
    reviewCountText: "4,800+ Amazon ratings",
    tierBadge: "Best Mid-Size Value",
    bestFor: "Multi-night CPAP, 12V camping fridges, Starlink & short fridge backup",
    summary:
      "Bridges the gap between small camping batteries and heavy home backups. Recharges 0–100% from a wall outlet in just 70 minutes.",
    pros: [
      "768Wh capacity runs a 12V camping fridge for 35+ hours",
      "Industry-leading 70-minute full AC wall recharge",
      "TÜV Rheinland safety certified with 5-year EcoFlow warranty",
    ],
    cons: [
      "800W native inverter struggles with full-size microwaves and heavy sump pumps",
      "Not expandable with external battery packs",
    ],
    accentColor: "#0ea5e9",
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
    acChargeMinutes80: 50,
    upsSwitchoverMs: 30,
    acOutlets: 6,
    expandableMaxWh: 3040,
    typicalAmazonPrice: 649,
    typicalBundlePrice: 999,
    recommendedSolarPanelText: "+ EcoFlow 220W Bifacial Solar Panel Bundle",
    amazonCouponHint: "#1 Amazon Best Seller — often $150–$300 off MSRP on Amazon",
    amazonAsin: "B0B9XB57XM",
    amazonSearchQuery: "EcoFlow DELTA 2 Portable Power Station 1024Wh LiFePO4",
    solarBundleSearchQuery:
      "EcoFlow DELTA 2 Solar Generator 220W Solar Panel Bundle",
    rating: 4.7,
    reviewCountText: "9,200+ Amazon ratings",
    tierBadge: "#1 Best Seller Overall",
    bestFor: "Full-size refrigerators, coffee makers, microwaves & 24-hr home blackouts",
    summary:
      "The undisputed gold standard in the 1,000Wh class. Its 1,800W inverter (2,700W surge) powers 90% of home appliances while weighing just 27 lbs—and it expands up to 3,040Wh later.",
    pros: [
      "1,800W continuous output runs refrigerators, coffee makers, and microwaves simultaneously",
      "Charges to 80% in just 50 minutes via X-Stream AC charging",
      "Expandable capacity—plug in a DELTA 2 Extra Battery later to double or triple runtime",
      "6 AC outlets + smart phone app monitoring via Wi-Fi & Bluetooth",
    ],
    cons: [
      "Cooling fans are audible when pushing 1,200W+ loads",
      "30ms EPS switchover is great for fridges/routers/CPAPs, though not 0ms server-grade",
    ],
    accentColor: "#3b82f6",
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
    acChargeMinutes80: 45,
    upsSwitchoverMs: 20,
    acOutlets: 3,
    expandableMaxWh: null,
    typicalAmazonPrice: 629,
    typicalBundlePrice: 949,
    recommendedSolarPanelText: "+ Jackery SolarSaga 200W Solar Panel Bundle",
    amazonCouponHint: "Popular Amazon Prime deal with clip-on coupon",
    amazonAsin: "B0D7PPG25F",
    amazonSearchQuery: "Jackery Explorer 1000 v2 Portable Power Station 1070Wh LiFePO4",
    solarBundleSearchQuery:
      "Jackery Solar Generator 1000 v2 with 200W Solar Panel",
    rating: 4.8,
    reviewCountText: "6,100+ Amazon ratings",
    tierBadge: "Lightest 1000Wh Class",
    bestFor: "Easy-to-carry home backup, refrigerators, CPAP (<20ms UPS) & family camping",
    summary:
      "Jackery's completely redesigned v2 packs 1,070Wh and a 4,000-cycle LiFePO4 battery into a 23.8 lb chassis with fold-flat handle and <20ms UPS backup.",
    pros: [
      "Lightest 1,000Wh+ LiFePO4 station on the market at just 23.8 lbs",
      "4,000 charge cycles to 70% capacity (10+ years of daily use)",
      "whisper-quiet <22dB operation under light loads (ideal for bedroom CPAP)",
      "<20ms UPS auto-switchover protects desktop PCs and medical gear",
    ],
    cons: [
      "Only 3 AC outlets compared to 6 on the EcoFlow DELTA 2",
      "Not expandable with external batteries",
    ],
    accentColor: "#ea580c",
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
    acChargeMinutes80: 43,
    upsSwitchoverMs: 20,
    acOutlets: 6,
    expandableMaxWh: 2112,
    typicalAmazonPrice: 649,
    typicalBundlePrice: 999,
    recommendedSolarPanelText: "+ Anker SOLIX 200W Foldable Solar Panel",
    amazonCouponHint: "Anker frequently runs $150–$250 Amazon page coupons",
    amazonAsin: "B0C69273PK",
    amazonSearchQuery: "Anker SOLIX C1000 Portable Power Station 1056Wh LiFePO4",
    solarBundleSearchQuery:
      "Anker SOLIX C1000 Solar Generator with 200W Solar Panel",
    rating: 4.8,
    reviewCountText: "3,900+ Amazon ratings",
    tierBadge: "Fastest Solar & AC Charge",
    bestFor: "Rapid solar recharging (600W input), kitchen appliances & expandable home backup",
    summary:
      "Built like a tank with a full-width LED floodlight bar, 600W solar input (charges in 1.8 hours from sun), and 58-minute UltraFast 100% wall recharge.",
    pros: [
      "600W max solar input—20% faster solar recharging than EcoFlow or Jackery 1000 class",
      "Built-in warm ambient LED light bar illuminates an entire room during blackouts",
      "Doubles to 2,112Wh with the affordable BP1000 expansion battery",
    ],
    cons: [
      "Slightly heavier (28.4 lbs) than Jackery 1000 v2",
    ],
    accentColor: "#10b981",
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
    weightLbs: 35.2,
    acChargeMinutes80: 45,
    upsSwitchoverMs: 20,
    acOutlets: 4,
    expandableMaxWh: 4224,
    typicalAmazonPrice: 599,
    typicalBundlePrice: 899,
    recommendedSolarPanelText: "+ BLUETTI PV200 200W Solar Panel Bundle",
    amazonCouponHint: "Best Wh-per-dollar in the 1100Wh class on Amazon",
    amazonAsin: "B0C1SMJTDT",
    amazonSearchQuery: "BLUETTI AC180 Portable Power Station 1152Wh LiFePO4",
    solarBundleSearchQuery: "BLUETTI AC180 Solar Generator with 200W Solar Panel",
    rating: 4.7,
    reviewCountText: "4,400+ Amazon ratings",
    tierBadge: "Most Capacity Under $650",
    bestFor: "Maximum runtime per dollar, wireless phone charging & off-grid cabins",
    summary:
      "Gives you an extra ~128Wh of capacity over standard 1,024Wh competitors plus a built-in 15W wireless phone charging pad on top.",
    pros: [
      "1,152Wh capacity delivers ~12% longer fridge runtime than 1,024Wh units",
      "15W wireless charging pad on top deck—no cables needed in the dark",
      "3,500+ LiFePO4 life cycles with 20ms UPS mode",
    ],
    cons: [
      "At 35.2 lbs, it is 8–11 lbs heavier than EcoFlow DELTA 2 and Jackery 1000 v2",
    ],
    accentColor: "#6366f1",
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
    weightLbs: 50.7,
    acChargeMinutes80: 53,
    upsSwitchoverMs: 30,
    acOutlets: 6,
    expandableMaxWh: 6144,
    typicalAmazonPrice: 1399,
    typicalBundlePrice: 1899,
    recommendedSolarPanelText: "+ EcoFlow 400W Portable Solar Panel Bundle",
    amazonCouponHint: "High-ticket Amazon savings — check for $200–$400 coupon",
    amazonAsin: "B0C4DW17PD",
    amazonSearchQuery: "EcoFlow DELTA 2 Max Portable Power Station 2048Wh LiFePO4",
    solarBundleSearchQuery:
      "EcoFlow DELTA 2 Max Solar Generator 400W Solar Panel",
    rating: 4.7,
    reviewCountText: "2,900+ Amazon ratings",
    tierBadge: "Best 2000Wh Home Backup",
    bestFor: "Multi-day refrigerator + freezer, basement sump pumps, window AC & power tools",
    summary:
      "With 2,048Wh of capacity, a massive 2,400W inverter (4,800W surge), and dual 1,000W solar inputs, the DELTA 2 Max keeps a full kitchen and sump pump running through multi-day storms.",
    pros: [
      "2,400W continuous / 4,800W surge starts heavy basement sump pumps and window ACs effortlessly",
      "1,000W dual solar input charges 2,048Wh in just 2.3 hours of sunlight",
      "Lightest 2,048Wh power station in its class at 50.7 lbs",
      "Expandable up to 6,144Wh with two extra battery packs",
    ],
    cons: [
      "No built-in wheels (two-person carry handle design for stairs)",
    ],
    accentColor: "#2563eb",
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
    weightLbs: 67.2,
    acChargeMinutes80: 60,
    upsSwitchoverMs: 20,
    acOutlets: 4,
    expandableMaxWh: 4096,
    typicalAmazonPrice: 1399,
    typicalBundlePrice: 1899,
    recommendedSolarPanelText: "+ 2x Anker 200W or 400W Solar Panel Kit",
    amazonCouponHint: "Built-in RV TT-30 port + rolling wheels included",
    amazonAsin: "B09XM7WDZ2",
    amazonSearchQuery: "Anker SOLIX F2000 PowerHouse 767 2048Wh Portable Power Station",
    solarBundleSearchQuery:
      "Anker SOLIX F2000 Solar Generator with Solar Panel",
    rating: 4.7,
    reviewCountText: "2,100+ Amazon ratings",
    tierBadge: "Best Wheeled & RV Ready",
    bestFor: "RVs (built-in TT-30 port), seniors/easy rolling mobility & whole-room backup",
    summary:
      "Features oversized all-terrain wheels, a telescoping luggage handle, and a dedicated 30A RV outlet so anyone can roll 2,048Wh of backup power from the garage to the kitchen.",
    pros: [
      "Heavy-duty wheels & telescoping handle—zero heavy lifting required",
      "Built-in NEMA TT-30R 30-Amp RV port plugs directly into camper shore power",
      "GaNPrime inverter reduces heat waste and extends real-world runtime by ~10%",
    ],
    cons: [
      "67.2 lbs makes lifting into high truck beds a two-person job",
    ],
    accentColor: "#059669",
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
    acChargeMinutes80: 66,
    upsSwitchoverMs: 20,
    acOutlets: 5,
    expandableMaxWh: 12252,
    typicalAmazonPrice: 1499,
    typicalBundlePrice: 2099,
    recommendedSolarPanelText: "+ 2x Jackery SolarSaga 200W Solar Panels",
    amazonCouponHint: "Massive 3,000W / 6,000W surge for well pumps & RVs",
    amazonAsin: "B0C6K9PK53",
    amazonSearchQuery: "Jackery Explorer 2000 Plus Portable Power Station 2042Wh LiFePO4",
    solarBundleSearchQuery:
      "Jackery Solar Generator 2000 Plus with 400W Solar Panels",
    rating: 4.8,
    reviewCountText: "1,850+ Amazon ratings",
    tierBadge: "Highest 3000W Output in Class",
    bestFor: "1/2 HP sump pumps, power tools, RVs & modular whole-home expansion",
    summary:
      "Delivers a beastly 3,000W continuous / 6,000W surge inverter on wheels with a 4,000-cycle LiFePO4 battery that scales up to 12kWh+.",
    pros: [
      "3,000W continuous / 6,000W surge handles high-startup motor loads with ease",
      "Built-in wheels and pull rod for effortless rolling",
      "4,000-cycle battery lifespan + 25A RV outlet",
    ],
    cons: [
      "Proprietary DC solar barrel connectors require Jackery adapter for 3rd-party panels",
    ],
    accentColor: "#f97316",
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
    cycleLife: 6500,
    weightLbs: 99.0,
    acChargeMinutes80: 65,
    upsSwitchoverMs: 20,
    acOutlets: 5,
    expandableMaxWh: 10800,
    typicalAmazonPrice: 2199,
    typicalBundlePrice: 2899,
    recommendedSolarPanelText: "+ EcoFlow 400W Rigid/Portable Solar Array",
    amazonCouponHint: "Flagship Whole-Home Backup — frequent $500+ Amazon markdowns",
    amazonAsin: "B09B2WLRWX",
    amazonSearchQuery: "EcoFlow DELTA Pro Portable Home Battery 3600Wh",
    solarBundleSearchQuery:
      "EcoFlow DELTA Pro Solar Generator with 400W Solar Panel",
    rating: 4.7,
    reviewCountText: "3,400+ Amazon ratings",
    tierBadge: "Ultimate Whole-Home Fortress",
    bestFor: "Multi-day whole-house transfer switch, AC units, sump pumps & off-grid cabins",
    summary:
      "A true gas-generator replacement with 3,600Wh capacity, 3,600W / 7,200W surge output, 1,600W solar input, and EV-station charging capability.",
    pros: [
      "Massive 3,600Wh capacity runs a full-size refrigerator + Wi-Fi + lights for 2 to 3 full days",
      "3,600W continuous / 7,200W surge plugs directly into a home manual transfer switch",
      "6,500-cycle LiFePO4 battery chemistry (15+ year rating)",
      "Can recharge at thousands of Level 2 EV charging stations during widespread grid collapse",
    ],
    cons: [
      "Weighs 99 lbs—designed to roll on its rugged wheels rather than carry up stairs",
    ],
    accentColor: "#1d4ed8",
  },
];

export const COMPARISON_PAIRS: ComparisonPair[] = [
  {
    slug: "ecoflow-delta-2-vs-jackery-1000-v2",
    stationAId: "ecoflow-delta-2",
    stationBId: "jackery-1000-v2",
    title: "EcoFlow DELTA 2 vs. Jackery Explorer 1000 v2",
    subtitle:
      "The two best-selling 1,000Wh LiFePO4 power stations on Amazon go head-to-head on fridge runtime, inverter power, weight, and expandability.",
    verdictSummary:
      "Choose the EcoFlow DELTA 2 if you want 6 AC outlets, a higher 1,800W continuous inverter, and the ability to plug in an expansion battery later. Choose the Jackery Explorer 1000 v2 if you want the lightest carry weight (23.8 lbs), whisper-quiet bedroom CPAP operation, and 4,000 charge cycles.",
    winnerForBlackouts: "EcoFlow DELTA 2 (Expandable up to 3,040Wh + 6 AC outlets)",
    winnerForPortability: "Jackery Explorer 1000 v2 (3.2 lbs lighter with fold-flat handle)",
    winnerForValue: "Tie — Check which one has the bigger clip-on coupon on Amazon today",
  },
  {
    slug: "anker-solix-c1000-vs-bluetti-ac180",
    stationAId: "anker-solix-c1000",
    stationBId: "bluetti-ac180",
    title: "Anker SOLIX C1000 vs. BLUETTI AC180",
    subtitle:
      "600W ultra-fast solar charging and expandability vs. 1,152Wh capacity and built-in wireless charging.",
    verdictSummary:
      "Pick the Anker SOLIX C1000 if you want a lighter 28.4 lb chassis, faster 600W solar input, built-in room floodlight bar, and affordable battery expansion. Pick the BLUETTI AC180 if you want a standalone unit with ~10% more base battery capacity (1,152Wh) and a wireless phone charging deck.",
    winnerForBlackouts: "Anker SOLIX C1000 (Built-in room floodlight + easy 2,112Wh expansion)",
    winnerForPortability: "Anker SOLIX C1000 (Nearly 7 lbs lighter than the AC180)",
    winnerForValue: "BLUETTI AC180 (Lowest price per Watt-hour out of the box)",
  },
  {
    slug: "ecoflow-delta-2-max-vs-anker-solix-f2000",
    stationAId: "ecoflow-delta-2-max",
    stationBId: "anker-solix-f2000",
    title: "EcoFlow DELTA 2 Max vs. Anker SOLIX F2000 (767)",
    subtitle:
      "2,048Wh heavy-duty showdown: Dual-solar 50 lb carry vs. Wheeled suitcase with built-in 30A RV outlet.",
    verdictSummary:
      "Get the Anker SOLIX F2000 if you have an RV (built-in TT-30 port) or want built-in wheels and a telescoping luggage handle so you never have to lift 50+ lbs. Get the EcoFlow DELTA 2 Max if you need to carry the unit up basement stairs (16.5 lbs lighter) or want to expand up to 6,144Wh.",
    winnerForBlackouts: "EcoFlow DELTA 2 Max (Higher 4,800W surge for sump pumps + 6kWh expansion)",
    winnerForPortability: "Anker SOLIX F2000 (Rolls effortlessly on wheels like a suitcase)",
    winnerForValue: "Tie — Both are 2,048Wh LiFePO4 workhorses",
  },
  {
    slug: "ecoflow-delta-2-vs-anker-solix-c1000",
    stationAId: "ecoflow-delta-2",
    stationBId: "anker-solix-c1000",
    title: "EcoFlow DELTA 2 vs. Anker SOLIX C1000",
    subtitle:
      "Comparing Amazon's #1 best seller against Anker's fast-charging 1,056Wh challenger.",
    verdictSummary:
      "Both deliver 1,800W continuous AC output and 6 AC outlets. Anker SOLIX C1000 wins on solar input speed (600W vs 500W), faster 20ms UPS switchover, and a built-in LED light bar. EcoFlow DELTA 2 wins on maximum expansion ceiling (up to 3,040Wh) and slightly lighter weight.",
    winnerForBlackouts: "Anker SOLIX C1000 (Built-in room floodlight + 20ms UPS)",
    winnerForPortability: "EcoFlow DELTA 2 (1.4 lbs lighter with dual side handles)",
    winnerForValue: "Anker SOLIX C1000 (32Wh extra capacity + 600W solar controller)",
  },
  {
    slug: "jackery-2000-plus-vs-ecoflow-delta-pro",
    stationAId: "jackery-2000-plus",
    stationBId: "ecoflow-delta-pro",
    title: "Jackery Explorer 2000 Plus vs. EcoFlow DELTA Pro",
    subtitle:
      "Modular 2,042Wh wheeled station vs. 3,600Wh whole-home backup powerhouse.",
    verdictSummary:
      "The Jackery Explorer 2000 Plus is 37 lbs lighter and starts ~$700 lower on Amazon while still packing a massive 3,000W inverter. The EcoFlow DELTA Pro is for homeowners who want 3,600Wh right out of the box to plug into a home transfer switch for multi-day outages.",
    winnerForBlackouts: "EcoFlow DELTA Pro (3,600Wh base capacity = 75% longer runtime out of the box)",
    winnerForPortability: "Jackery Explorer 2000 Plus (61.5 lbs vs 99 lbs)",
    winnerForValue: "Jackery Explorer 2000 Plus (3,000W inverter under $1,500)",
  },
];

