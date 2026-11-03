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
  /** Whether to generate dedicated /runtime/[station]-for-[appliance] pages */
  isTopComboTarget?: boolean;
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
    isTopComboTarget: true,
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
    isTopComboTarget: true,
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
    isTopComboTarget: true,
    description:
      "ResMed AirSense 10/11 or Philips CPAP running overnight. Uses ~45W with humidifier/heated tubing on, or just 15W–20W with humidifier off on 12V DC.",
    seoTitle: "Best Portable Power Station for a CPAP Machine (2026 Runtime Chart)",
    seoSubtitle:
      "Sleep peacefully through power outages and camping trips. Compare exact overnight runtimes with heated humidifier ON vs. OFF.",
    buyingTip:
      "Look for a power station with UPS/EPS (<20ms Auto-Switchover) like the Jackery 1000 v2, Anker SOLIX C1000, or EcoFlow DELTA 2. You plug the power station into the wall and your CPAP into the power station—if the grid goes down at 2:00 AM, your CPAP stays on without skipping a breath.",
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
    isTopComboTarget: true,
    description:
      "Standard 1/3 HP residential sump pump. High 1,800W motor startup surge, but only runs intermittently when the float switch triggers (~15% duty cycle during storms).",
    seoTitle: "What Size Portable Power Station Runs a Basement Sump Pump?",
    seoSubtitle:
      "Prevent $10,000+ basement floods during severe thunderstorms. Here is the exact surge wattage and battery capacity you need.",
    buyingTip:
      "Sump pumps are all about STARTING SURGE. A 1/3 HP pump draws 800W while pumping, but demands 1,600W–2,000W for a split second to spin up the impeller against water pressure. Never use a power station rated below 1,800W continuous / 2,400W+ surge.",
    commonMistake:
      "Sizing only for running watts (800W) and buying a 1,000W inverter that trips an overload error the first time the float switch triggers in the middle of a storm.",
  },
  {
    id: "pellet-stove",
    slug: "pellet-stove",
    name: "Wood Pellet Stove (Auger, Blower & Igniter)",
    shortName: "Pellet Stove",
    category: "Home Safety & Climate",
    runningWatts: 135,
    surgeWatts: 450,
    dutyCycle: 0.85,
    defaultHoursPerDay: 12,
    iconName: "Flame",
    isTopComboTarget: true,
    description:
      "Harman, Quadra-Fire, or ComfortBilt pellet stove. Pulls ~400W–450W for 10 minutes during startup ignition, then settles to ~135W continuous for the convection fan and auger.",
    seoTitle: "Best Portable Power Station for a Pellet Stove (Winter Blackout Guide)",
    seoSubtitle:
      "Keep your pellet stove heating your home all night during winter ice storms. Exact runtime hours, pure sine wave requirements, and UPS switchover math.",
    buyingTip:
      "Pellet stoves have sensitive circuit boards and variable-speed combustion blowers that REQUIRE a 100% Pure Sine Wave inverter (all 10 LiFePO4 stations in our database are Pure Sine Wave). A 1,024Wh unit runs a pellet stove for ~7–8 hours; a 2,048Wh unit runs it for 14–16+ hours through the coldest night.",
    commonMistake:
      "Using a cheap modified-sine-wave battery backup, which causes pellet stove exhaust blowers to hum, overheat, and burn out their control board.",
  },
  {
    id: "gas-furnace-blower",
    slug: "gas-furnace-blower",
    name: "Gas / Propane Home Furnace Blower Motor",
    shortName: "Gas Furnace Blower",
    category: "Home Safety & Climate",
    runningWatts: 550,
    surgeWatts: 1200,
    dutyCycle: 0.4,
    defaultHoursPerDay: 16,
    iconName: "ThermometerSun",
    isTopComboTarget: true,
    description:
      "Central natural gas or propane forced-air furnace. Even though gas creates the heat, the 120V blower fan & igniter need ~550W (cycling ~40% of the time) to heat your house!",
    seoTitle: "What Size Portable Power Station Runs a Gas Furnace in a Blackout?",
    seoSubtitle:
      "Your gas furnace won't work in a winter power outage without electricity for the blower fan. See how to power your central furnace safely with a LiFePO4 battery.",
    buyingTip:
      "By installing a simple $95 single-circuit EZ Generator Switch next to your furnace, you can plug a 1,800W–2,400W portable power station directly into your gas furnace during a winter blackout. Because the furnace thermostat cycles the blower on ~40% of the time (~220W average hourly draw), a 2,048Wh station keeps your whole house warm for 8–10+ hours!",
    commonMistake:
      "Forgetting that modern ECM/PSC furnace blower motors have a 1,000W–1,300W startup surge and require proper neutral-ground bonding on some furnace flame sensors.",
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
    isTopComboTarget: true,
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
    isTopComboTarget: true,
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
    id: "electric-blanket",
    slug: "electric-blanket",
    name: "Heated Electric Blanket / Mattress Pad",
    shortName: "Electric Blanket",
    category: "Camping & Outdoors",
    runningWatts: 65,
    surgeWatts: 75,
    dutyCycle: 0.7,
    defaultHoursPerDay: 8,
    iconName: "Flame",
    description:
      "Queen/Twin heated throw or electric mattress pad on Medium setting. Pulls just ~45W average—using 25x LESS battery than a space heater!",
    seoTitle: "Best Portable Power Station for an Electric Blanket (Winter Camping & Outages)",
    seoSubtitle:
      "The #1 winter survival secret: Why a 65W electric blanket + 1,000Wh power station keeps you warm for 2 full nights while a space heater dies in 40 minutes.",
    buyingTip:
      "Instead of trying to heat all the air in a freezing room with a 1,500W space heater, put an electric blanket or heated mattress pad under your comforter. It draws ~45W average and runs for 16–20 hours on a single 1,000Wh power station!",
    commonMistake:
      "Buying a cheap 12V car blanket that barely gets warm when a standard 120V household electric blanket runs effortlessly on any 500Wh–1,000Wh pure sine wave station.",
  },
  {
    id: "well-pump",
    slug: "well-pump",
    name: "Residential Well Water Pump (1/2 HP 120V Jet Pump)",
    shortName: "Well Pump (1/2 HP)",
    category: "Home Safety & Climate",
    runningWatts: 950,
    surgeWatts: 2200,
    dutyCycle: 0.15,
    defaultHoursPerDay: 6,
    iconName: "Droplets",
    description:
      "1/2 HP shallow/convertible 120V jet well pump filling a pressure tank. High 2,200W startup surge, but only runs a few minutes per hour when water is used.",
    seoTitle: "What Size Portable Power Station Runs a Well Pump? (Surge & Capacity)",
    seoSubtitle:
      "Keep running water and flushing toilets working during rural grid outages. Check 120V vs. 240V well pump requirements.",
    buyingTip:
      "Even though a well pump only runs for 15–30 minutes total per day to repressurize your water tank (~850Wh/day), it demands 2,000W–2,800W of starting surge watts! Choose a 2,400W–3,600W station like the EcoFlow DELTA 2 Max, Jackery 2000 Plus, or EcoFlow DELTA Pro.",
    commonMistake:
      "Not checking whether your well pump is wired for 120V (3-prong) or 240V split-phase before a storm hits.",
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
      "Ceramic space heater on Low (750W) setting with thermostat cycling. Note: Resistive heating uses massive battery capacity—electric blankets (65W) are 15x more efficient!",
    seoTitle: "Can a Portable Power Station Run a Space Heater? (Honest Math)",
    seoSubtitle:
      "We do the real watt-hour math on running 750W and 1,500W space heaters on battery power—plus the smart alternative that lasts 15x longer.",
    buyingTip:
      "A 1,500W space heater on High will drain a $650 1,000Wh power station in 38 minutes flat! If you want to run a space heater for 3–5 hours in one room, you need a 2,048Wh–3,600Wh unit (like EcoFlow DELTA 2 Max or DELTA Pro) AND you should run the heater on its 750W Low setting.",
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
      "Unlike gas generators, LiFePO4 battery power stations produce zero carbon monoxide and can sit safely right next to the bed indoors. Because an oxygen concentrator draws ~320W continuously without cycling off, you need ~2,000Wh–3,600Wh for a full night.",
    commonMistake:
      "Confusing a 40W portable pulse-dose concentrator with a 320W stationary home concentrator when sizing battery capacity.",
  },
  {
    id: "air-fryer",
    slug: "air-fryer",
    name: "Countertop Air Fryer / Toaster Oven (1,500W)",
    shortName: "Air Fryer / Toaster Oven",
    category: "Kitchen & Food",
    runningWatts: 1500,
    surgeWatts: 1650,
    dutyCycle: 0.85,
    defaultHoursPerDay: 0.4,
    iconName: "Flame",
    description:
      "Ninja, Cosori, or Breville air fryer / convection toaster oven. High 1,500W draw while cooking, but cooks meals in just 15–20 minutes (~425Wh per meal).",
    seoTitle: "Can a Portable Power Station Run an Air Fryer or Toaster Oven?",
    seoSubtitle:
      "Cook hot meals without propane or open flames during a blackout. See which 1,800W+ LiFePO4 power stations handle air fryers easily.",
    buyingTip:
      "An air fryer is actually one of the most efficient ways to cook on battery power because it preheats in 2 minutes and cooks in 15 minutes (~380Wh total). Just make sure your power station has at least an **1,800W continuous AC inverter** (EcoFlow DELTA 2, Anker SOLIX C1000, or BLUETTI AC180).",
    commonMistake:
      "Plugging both a coffee maker (1,200W) and an air fryer (1,500W) into a 1,800W power station at the exact same time—run high-wattage kitchen appliances one at a time!",
  },
  {
    id: "portable-induction-cooktop",
    slug: "portable-induction-cooktop",
    name: "Portable Induction Cooktop Burner (Medium-High)",
    shortName: "Induction Cooktop",
    category: "Kitchen & Food",
    runningWatts: 1300,
    surgeWatts: 1600,
    dutyCycle: 0.9,
    defaultHoursPerDay: 0.5,
    iconName: "Flame",
    description:
      "Single-burner Duxtop or NuWave induction hot plate. 90% energy transfer directly into the pan makes it far more battery-friendly than electric coil burners.",
    seoTitle: "Best Portable Power Station for an Induction Cooktop (Vanlife & Blackouts)",
    seoSubtitle:
      "How many meals can you cook on an EcoFlow, Jackery, or Anker SOLIX using a 120V portable induction burner?",
    buyingTip:
      "Set your induction cooktop to power level 6 or 7 (~1,200W–1,300W) instead of Max Boost (1,800W). Your food cooks just as fast, and you put far less thermal stress on the battery inverter.",
    commonMistake:
      "Using non-magnetic aluminum pans that won't trigger the induction coil.",
  },
  {
    id: "aquarium-heater-filter",
    slug: "aquarium-heater-filter",
    name: "Aquarium / Reef Tank Heater, Canister Filter & Air Pump",
    shortName: "Aquarium Heater & Filter",
    category: "Home Safety & Climate",
    runningWatts: 180,
    surgeWatts: 250,
    dutyCycle: 0.45,
    defaultHoursPerDay: 24,
    iconName: "Droplets",
    description:
      "50–100 gallon freshwater or saltwater reef tank (150W submersible heater cycling ~40% + 30W continuous filter/wavemaker/air pump).",
    seoTitle: "Best Battery Backup Power Station for Aquariums & Reef Tanks",
    seoSubtitle:
      "Save thousands of dollars in fish and coral during winter outages with automatic <20ms UPS battery switchover.",
    buyingTip:
      "Tank oxygen drops to fatal levels within 3–4 hours if filters stop circulating water, and winter room temperatures kill tropical fish overnight. Plug your canister filter, air pump, and heater into a 1,000Wh+ power station with **<20ms UPS mode** so the tank stays running automatically even if power fails while you're at work.",
    commonMistake:
      "Leaving high-wattage aquarium reef lighting turned on during a power outage—only back up the circulation pump, air stone, and heater!",
  },
  {
    id: "garage-door-opener",
    slug: "garage-door-opener",
    name: "Residential Garage Door Opener (1/2 to 3/4 HP)",
    shortName: "Garage Door Opener",
    category: "Home Safety & Climate",
    runningWatts: 550,
    surgeWatts: 1100,
    dutyCycle: 1.0,
    defaultHoursPerDay: 0.1,
    iconName: "Zap",
    description:
      "Chamberlain / LiftMaster overhead garage door motor. Pulls ~550W (1,100W surge) for just 15 seconds per open/close cycle (<5Wh per day!).",
    seoTitle: "What Size Portable Power Station Can Open a Garage Door?",
    seoSubtitle:
      "Don't get your car trapped inside a heavy garage door during a blackout. See the surge wattage needed to lift a 2-car garage door.",
    buyingTip:
      "Opening a garage door takes almost zero battery capacity (about 3 Watt-hours per lift!), but the motor needs ~1,100W of starting surge for 1 second to lift the heavy door springs. Any 800W–1,800W power station can open a garage door 100+ times on a single charge.",
    commonMistake:
      "Pulling the manual red emergency release cord while the garage door is raised—if a spring is weak, the door can slam shut.",
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

export const TOP_COMBO_APPLIANCES = APPLIANCES.filter(
  (a) => a.isTopComboTarget
);

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
    id: "winter-heating-outage",
    name: "Winter Freeze & Pellet Stove Backup",
    badge: "Winter Storm",
    description: "Run a wood pellet stove (or electric blankets), refrigerator, and Wi-Fi through a freezing winter night.",
    outageDays: 1,
    solarReload: false,
    items: [
      { applianceId: "pellet-stove", hoursPerDay: 12, quantity: 1 },
      { applianceId: "refrigerator", hoursPerDay: 24, quantity: 1 },
      { applianceId: "electric-blanket", hoursPerDay: 8, quantity: 1 },
      { applianceId: "led-lights-phones", hoursPerDay: 6, quantity: 1 },
    ],
  },
  {
    id: "cpap-sleep",
    name: "CPAP & Bedroom Night Backup",
    badge: "Medical & Sleep",
    description: "Uninterrupted overnight backup for a CPAP machine, heated blanket, bedside lamp, and phone charger.",
    outageDays: 2,
    solarReload: false,
    items: [
      { applianceId: "cpap-machine", hoursPerDay: 8, quantity: 1 },
      { applianceId: "electric-blanket", hoursPerDay: 8, quantity: 1 },
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
