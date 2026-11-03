export type ApplianceCategory =
  | "Kitchen & Food"
  | "Medical & Sleep"
  | "Home Safety & Climate"
  | "Work & Internet"
  | "Camping & Outdoors";

export interface Appliance {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: ApplianceCategory;
  runningWatts: number;
  surgeWatts: number;
  /**
   * Duty cycle between 0.1 and 1.0.
   * E.g., a refrigerator compressor runs ~38% of the time over a 24h period.
   * Effective average draw = runningWatts * dutyCycle
   */
  dutyCycle: number;
  defaultHoursPerDay: number;
  iconName: string;
  description: string;
  seoTitle: string;
  seoSubtitle: string;
  buyingTip: string;
  commonMistake: string;
}

export interface ScenarioPreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  outageDays: number;
  solarReload: boolean;
  items: { applianceId: string; hoursPerDay: number; quantity: number }[];
}

export const APPLIANCES: Appliance[] = [
  {
    id: "refrigerator",
    slug: "refrigerator",
    name: "Full-Size Kitchen Refrigerator (Energy Star)",
    shortName: "Full-Size Fridge",
    category: "Kitchen & Food",
    runningWatts: 160,
    surgeWatts: 650,
    dutyCycle: 0.38,
    defaultHoursPerDay: 24,
    iconName: "Refrigerator",
    description:
      "Modern full-size kitchen fridge/freezer combo. Compressor cycles on ~38% of the time (~61W average hourly draw, 160W active compressor draw, 650W startup surge).",
    seoTitle: "What Size Portable Power Station Runs a Refrigerator?",
    seoSubtitle:
      "Exact runtime calculations, surge wattage requirements, and the best LiFePO4 battery backups to keep your food from spoiling during a blackout.",
    buyingTip:
      "Never multiply a refrigerator's 160W sticker rating by 24 hours straight! Because the insulated cabinet holds cold air, the compressor only cycles on about 35%–40% of the time (~1,450Wh per 24 hours). However, your power station MUST handle the 600W–800W startup compressor surge.",
    commonMistake:
      "Buying a small 300Wh–500Wh camping unit. While it may start the fridge, inverter standby drain (~15W/hr) will eat 35% of the battery before the day is even halfway over. Aim for at least 1,000Wh for 15–18 hours, or 2,000Wh+ for multi-day protection.",
  },
  {
    id: "chest-freezer",
    slug: "chest-freezer",
    name: "Chest Freezer / Deep Freezer (7–15 cu. ft.)",
    shortName: "Chest Freezer",
    category: "Kitchen & Food",
    runningWatts: 120,
    surgeWatts: 550,
    dutyCycle: 0.32,
    defaultHoursPerDay: 24,
    iconName: "Snowflake",
    description:
      "Garage or basement chest freezer. Thick insulation means the compressor only runs ~32% of the time (~38W effective hourly draw).",
    seoTitle: "Best Portable Power Station for a Chest Freezer (Blackout Guide)",
    seoSubtitle:
      "Protect $500–$1,500 worth of frozen meat and groceries with the right battery capacity and surge rating.",
    buyingTip:
      "Chest freezers trap cold air at the bottom, making them 25% more energy-efficient than upright refrigerators. A 1,024Wh power station (like the EcoFlow DELTA 2 or Jackery 1000 v2) can keep a chest freezer frozen for 20+ hours continuously—or up to 48 hours if you cycle it on for 4 hours every 8 hours.",
    commonMistake:
      "Opening the lid during a power outage or forgetting that garage temperatures in summer increase compressor duty cycles by 20%.",
  },
  {
    id: "cpap-machine",
    slug: "cpap-machine",
    name: "CPAP / BiPAP Machine (Standard Mode)",
    shortName: "CPAP Machine",
    category: "Medical & Sleep",
    runningWatts: 45,
    surgeWatts: 60,
    dutyCycle: 1.0,
    defaultHoursPerDay: 8,
    iconName: "HeartPulse",
    description:
      "ResMed AirSense 10/11 or Philips CPAP running overnight. Uses ~45W with humidifier/heated tubing on, or just 15W–20W with humidifier off on 12V DC.",
    seoTitle: "Best Portable Power Station for a CPAP Machine (2026 Runtime Chart)",
    seoSubtitle:
      "Sleep peacefully through power outages and camping trips. Compare exact overnight runtimes with heated humidifier ON vs. OFF.",
    buyingTip:
      " look for a power station with USP/EPS (<20ms Auto-Switchover) like the EcoFlow RIVER 2 Pro or DELTA 2. You plug the power station into the wall and your CPAP into the power station—if the grid goes down at 2:00 AM, your CPAP stays on without skipping a breath.",
    commonMistake:
      "Running a CPAP on the 120V AC plug during a multi-day camping trip with the heated humidifier turned all the way up. Using a $25 12V DC converter cord and turning off the heating plate triples your battery runtime!",
  },
  {
    id: "sump-pump",
    slug: "sump-pump",
    name: "Basement Sump Pump (1/3 HP Submersible)",
    shortName: "Sump Pump (1/3 HP)",
    category: "Home Safety & Climate",
    runningWatts: 800,
    surgeWatts: 1800,
    dutyCycle: 0.15,
    defaultHoursPerDay: 12,
    iconName: "Droplets",
    description:
      "Standard 1/3 HP residential sump pump. High 1,800W motor startup surge, but only runs intermittently when the float switch triggers (~15% duty cycle during storms).",
    seoTitle: "What Size Portable Power Station Runs a Basement Sump Pump?",
    seoSubtitle:
      "Prevent $10,000+ basement floods during severe thunderstorms. Here is the exact surge wattage and battery capacity you need.",
    buyingTip:
      "Sump pumps are all about STARTING SURGE. A 1/3 HP pump draws 800W while pumping, but demands 1,600W–2,000W for a split second to spin up the impeller against water pressure. Never use a power station rated below 1,800W continuous / 3,000W surge.",
    commonMistake:
      "Sizing only for running watts (800W) and buying a 1,000W inverter that trips an overload error the first time the float switch triggers in the middle of a storm.",
  },
  {
    id: "starlink",
    slug: "starlink",
    name: "Starlink Satellite Dish & Wi-Fi Router",
    shortName: "Starlink Internet",
    category: "Work & Internet",
    runningWatts: 65,
    surgeWatts: 110,
    dutyCycle: 1.0,
    defaultHoursPerDay: 10,
    iconName: "Wifi",
    description:
      "Standard Starlink Gen 2 / Gen 3 terminal & router (snow melt off). Averages 55W–75W continuous draw while working remotely or streaming.",
    seoTitle: "Best Portable Power Station for Starlink (Off-Grid & Outage Guide)",
    seoSubtitle:
      "How many hours will Jackery, EcoFlow, and Anker SOLIX run Starlink Gen 3 and Starlink Mini for remote work and emergencies?",
    buyingTip:
      "For an 8–10 hour workday on Starlink + two laptops, you need roughly 750Wh–900Wh per day. Pairing a 1,000Wh power station with a single 200W portable solar panel creates an infinite daytime work setup.",
    commonMistake:
      "Leaving Starlink's 'Snow Melt / Pre-Heat' feature set to Automatic while running on battery—that setting spikes power consumption from 65W up to 145W+!",
  },
  {
    id: "wifi-router",
    slug: "wifi-router",
    name: "Home Fiber/Cable Modem + Wi-Fi 6 Router",
    shortName: "Wi-Fi Router & Modem",
    category: "Work & Internet",
    runningWatts: 25,
    surgeWatts: 35,
    dutyCycle: 1.0,
    defaultHoursPerDay: 16,
    iconName: "Router",
    description:
      "Standard ISP gateway or cable modem + mesh Wi-Fi router. Keeps fiber/cable internet live when your neighborhood loses electrical power.",
    seoTitle: "Best Battery Backup & Power Station for Wi-Fi Routers (All-Day Internet)",
    seoSubtitle:
      "Why standard $60 UPS bricks die in 90 minutes—and how a LiFePO4 portable power station keeps your home Wi-Fi online for 24 to 72 hours.",
    buyingTip:
      "When neighborhood power goes out, fiber and cable lines usually still have power from the central office! A compact 300Wh–768Wh power station with <20ms UPS auto-switchover will keep your home Wi-Fi alive for 12 to 30+ hours instead of the 45 minutes you get from a cheap lead-acid UPS.",
    commonMistake:
      "Plugging the router into the main building's power strip without backing up the separate fiber ONT box in the garage or closet.",
  },
  {
    id: "microwave",
    slug: "microwave",
    name: "Countertop Microwave Oven (1,000W Cooking)",
    shortName: "Microwave Oven",
    category: "Kitchen & Food",
    runningWatts: 1500,
    surgeWatts: 1800,
    dutyCycle: 1.0,
    defaultHoursPerDay: 0.4,
    iconName: "Flame",
    description:
      "A '1,000W cooking power' microwave actually pulls ~1,500W from the wall outlet! Used for 15–25 minutes total per day to heat meals.",
    seoTitle: "What Size Portable Power Station Can Run a Microwave?",
    seoSubtitle:
      "Don't get fooled by '1,000W cooking watts'—here is why a microwave actually draws 1,500W from the outlet and which power stations handle it effortlessly.",
    buyingTip:
      "Microwaves are high-wattage, short-duration loads. Running a 1,500W microwave for 15 minutes a day only uses ~375Wh of battery capacity—less than 40% of a 1,000Wh battery! You just need a unit with an **1,800W continuous pure sine wave inverter**.",
    commonMistake:
      "Assuming a 1,000W microwave only needs a 1,000W inverter. Because magnetron efficiency is ~65%, a 1,000W microwave draws 1,450W–1,600W from the AC outlet.",
  },
  {
    id: "coffee-maker",
    slug: "coffee-maker",
    name: "Drip Coffee Maker / Keurig Single-Serve",
    shortName: "Coffee Maker / Keurig",
    category: "Kitchen & Food",
    runningWatts: 1200,
    surgeWatts: 1450,
    dutyCycle: 1.0,
    defaultHoursPerDay: 0.3,
    iconName: "Coffee",
    description:
      "Heating element pulls 1,000W–1,450W while brewing for 5–10 minutes each morning (~250Wh–350Wh per pot).",
    seoTitle: "Best Portable Power Stations That Can Run a Coffee Maker or Keurig",
    seoSubtitle:
      "Brew hot coffee during a blackout or at the campsite without tripping an overload alarm.",
    buyingTip:
      "A single Keurig cup takes 3 minutes at 1,400W—that's only 70Wh of energy (about 7% of a 1,000Wh power station)! Just make sure your power station has at least a 1,500W–1,800W AC inverter.",
    commonMistake:
      "Leaving the hot plate turned on underneath a glass carafe after brewing. Pour your coffee into an insulated thermos immediately to save 400Wh of wasted battery!",
  },
  {
    id: "portable-car-fridge",
    slug: "portable-car-fridge",
    name: "12V Portable Camping Fridge / Cooler (45L)",
    shortName: "12V Camping Fridge",
    category: "Camping & Outdoors",
    runningWatts: 45,
    surgeWatts: 90,
    dutyCycle: 0.35,
    defaultHoursPerDay: 24,
    iconName: "Compass",
    description:
      "12V compressor cooler (ICECO, BougeRV, Dometic). Runs directly off the 12V car socket port at ~16W average hourly draw.",
    seoTitle: "Best Portable Power Station for a 12V Car Fridge & Overlanding",
    seoSubtitle:
      "Ditch messy melted ice forever. See exact multi-day runtimes for Dometic, BougeRV, and ICECO 12V compressor coolers.",
    buyingTip:
      "Always plug your portable camping fridge into the **12V regulated DC cigarette lighter port** on your power station, NOT the 120V AC wall outlet! Using 12V DC avoids inverter conversion losses and extends runtime by 25%–30%.",
    commonMistake:
      "Putting warm drinks into the cooler while running on battery. Pre-chill your cooler and food on home wall power before leaving for your trip.",
  },
  {
    id: "space-heater",
    slug: "space-heater",
    name: "Portable Electric Space Heater (Low Setting 750W)",
    shortName: "Space Heater (Low 750W)",
    category: "Home Safety & Climate",
    runningWatts: 750,
    surgeWatts: 850,
    dutyCycle: 0.75,
    defaultHoursPerDay: 3,
    iconName: "ThermometerSun",
    description:
      "Ceramic space heater on Low (750W) setting with thermostat cycling. Note: Resistive heating uses massive battery capacity—electric blankets (60W) are 10x more efficient!",
    seoTitle: "Can a Portable Power Station Run a Space Heater? (Honest Math)",
    seoSubtitle:
      "We do the real watt-hour math on running 750W and 1,500W space heaters on battery power—plus the smart alternative that lasts 12x longer.",
    buyingTip:
      "A 1,500W space heater on High will drain a $700 1,000Wh power station in 38 minutes flat! If you want to run a space heater for a few hours in one room, you need a 2,000Wh–3,600Wh unit (like EcoFlow DELTA 2 Max or DELTA Pro) AND you should run the heater on its 750W Low setting—or pair a heated blanket (60W) with a mid-size battery.",
    commonMistake:
      "Expecting an entry-level power station to heat a whole room overnight. Resistive heating is the heaviest continuous load in any home.",
  },
  {
    id: "window-ac",
    slug: "window-ac",
    name: "Window / Portable Air Conditioner (5,000–8,000 BTU)",
    shortName: "Window AC (6,000 BTU)",
    category: "Home Safety & Climate",
    runningWatts: 550,
    surgeWatts: 1400,
    dutyCycle: 0.6,
    defaultHoursPerDay: 6,
    iconName: "Wind",
    description:
      "Small bedroom window AC or inverter AC unit. Pulls ~550W when cooling and cycles ~60% of the time once the room cools down.",
    seoTitle: "What Size Solar Generator Can Run a Window Air Conditioner?",
    seoSubtitle:
      "Survive summer hurricane and heatwave blackouts. See which 2,000Wh+ solar generators can run a bedroom AC unit.",
    buyingTip:
      "If you live in hurricane or summer blackout country, pair a 2,048Wh+ power station (like the Anker SOLIX F2000 or EcoFlow DELTA 2 Max) with 400W of solar panels so the sun replenishes the battery during peak afternoon heat.",
    commonMistake:
      "Trying to run an older 12,000 BTU non-inverter AC without checking its LRA (Locked Rotor Amps) startup surge.",
  },
  {
    id: "oxygen-concentrator",
    slug: "oxygen-concentrator",
    name: "Home Medical Oxygen Concentrator (5L Continuous)",
    shortName: "Oxygen Concentrator",
    category: "Medical & Sleep",
    runningWatts: 320,
    surgeWatts: 500,
    dutyCycle: 1.0,
    defaultHoursPerDay: 8,
    iconName: "ShieldAlert",
    description:
      "Stationary 5L home oxygen concentrator (e.g., Invacare / Philips Respironics). Continuous 300W–350W medical load.",
    seoTitle: "Best Battery Backup Power Stations for Home Oxygen Concentrators",
    seoSubtitle:
      "Reliable, fume-free indoor LiFePO4 battery backup for stationary 300W–400W oxygen concentrators during utility outages.",
    buyingTip:
      "Unlike gas generators, LiFePO4 battery power stations produce zero carbon monoxide and can sit safely right next to the bed indoors. Because an oxygen concentrator draws ~320W continuously without cycling off, you need ~2,500Wh–3,000Wh for a full 8-hour night.",
    commonMistake:
      "Confusing a 40W portable pulse-dose concentrator with a 320W stationary home concentrator when sizing battery capacity.",
  },
  {
    id: "laptop-workstation",
    slug: "laptop-workstation",
    name: "Laptop + External Monitor Charging",
    shortName: "Laptop + Monitor",
    category: "Work & Internet",
    runningWatts: 85,
    surgeWatts: 120,
    dutyCycle: 0.85,
    defaultHoursPerDay: 8,
    iconName: "Laptop",
    description:
      "MacBook/Windows laptop plugged into USB-C PD + 27-inch external monitor for remote work.",
    seoTitle: "Best Portable Power Station for Home Office & Remote Work Outages",
    seoSubtitle:
      "Never drop a Zoom call or miss a deadline when the grid goes down.",
    buyingTip:
      "Plug your laptop directly into the power station's **100W USB-C PD port** instead of using the chunky AC wall brick—you'll save ~15% battery capacity immediately.",
    commonMistake:
      "Using an old modified-sine-wave battery that makes monitor power supplies buzz or overheat.",
  },
  {
    id: "led-lights-phones",
    slug: "led-lights-phones",
    name: "4x LED Lamps + 3x Smartphones + Box Fan",
    shortName: "Lights, Phones & Fan",
    category: "Home Safety & Climate",
    runningWatts: 75,
    surgeWatts: 110,
    dutyCycle: 1.0,
    defaultHoursPerDay: 8,
    iconName: "Lightbulb",
    description:
      "Essential room lighting (4x 9W LED bulbs), family phone/tablet charging, and a 35W circulating room fan.",
    seoTitle: "Best Entry-Level Portable Power Station for Lights, Phones & Fans",
    seoSubtitle:
      "Affordable under-$350 LiFePO4 power stations that keep your family comfortable, cool, and connected during storms.",
    buyingTip:
      "Even a compact 300Wh–512Wh power station will run LED lights, fans, and charge phones for an entire weekend.",
    commonMistake:
      "Using old 60W incandescent bulbs instead of 9W LED bulbs during an outage—4 incandescent bulbs drain 6x more power for the exact same light!",
  },
];

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: "home-blackout",
    name: "24-Hr Home Blackout Essentials",
    badge: "Most Popular",
    description: "Keep your kitchen refrigerator cold, Wi-Fi online, and room lights/phones powered for a full day.",
    outageDays: 1,
    solarReload: false,
    items: [
      { applianceId: "refrigerator", hoursPerDay: 24, quantity: 1 },
      { applianceId: "wifi-router", hoursPerDay: 16, quantity: 1 },
      { applianceId: "led-lights-phones", hoursPerDay: 6, quantity: 1 },
      { applianceId: "coffee-maker", hoursPerDay: 0.25, quantity: 1 },
    ],
  },
  {
    id: "cpap-sleep",
    name: "CPAP & Bedroom Night Backup",
    badge: "Medical & Sleep",
    description: "Uninterrupted overnight backup for a CPAP machine, bedside lamp, phone charger, and box fan.",
    outageDays: 2,
    solarReload: false,
    items: [
      { applianceId: "cpap-machine", hoursPerDay: 8, quantity: 1 },
      { applianceId: "led-lights-phones", hoursPerDay: 4, quantity: 1 },
    ],
  },
  {
    id: "camping-overland",
    name: "Weekend Camping & Overlanding",
    badge: "Outdoor / RV",
    description: "Run a 12V portable car fridge 24/7, brew morning coffee, and charge cameras/phones off-grid.",
    outageDays: 2,
    solarReload: true,
    items: [
      { applianceId: "portable-car-fridge", hoursPerDay: 24, quantity: 1 },
      { applianceId: "coffee-maker", hoursPerDay: 0.2, quantity: 1 },
      { applianceId: "led-lights-phones", hoursPerDay: 5, quantity: 1 },
    ],
  },
  {
    id: "remote-work-starlink",
    name: "Starlink & Work-From-Home Backup",
    badge: "Remote Work",
    description: "Stay online all workday with Starlink satellite internet, laptop + external monitor, and hot coffee.",
    outageDays: 1,
    solarReload: true,
    items: [
      { applianceId: "starlink", hoursPerDay: 9, quantity: 1 },
      { applianceId: "laptop-workstation", hoursPerDay: 8, quantity: 1 },
      { applianceId: "coffee-maker", hoursPerDay: 0.2, quantity: 1 },
    ],
  },
  {
    id: "storm-fortress",
    name: "Severe Storm & Sump Pump Fortress",
    badge: "Heavy Duty",
    description: "Full-size fridge, chest freezer, basement sump pump protection, microwave, and emergency Wi-Fi.",
    outageDays: 1,
    solarReload: true,
    items: [
      { applianceId: "refrigerator", hoursPerDay: 24, quantity: 1 },
      { applianceId: "chest-freezer", hoursPerDay: 24, quantity: 1 },
      { applianceId: "sump-pump", hoursPerDay: 12, quantity: 1 },
      { applianceId: "microwave", hoursPerDay: 0.3, quantity: 1 },
      { applianceId: "wifi-router", hoursPerDay: 16, quantity: 1 },
    ],
  },
];

