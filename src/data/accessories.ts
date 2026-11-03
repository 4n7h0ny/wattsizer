/**
 * Low-cost add-ons that genuinely help with a given appliance during an outage.
 * Links are tagged Amazon searches (no hardcoded ASINs, prices or ratings).
 */
export interface Accessory {
  label: string;
  why: string;
  amazonSearchQuery: string;
}

const WATT_METER: Accessory = {
  label: "Plug-in watt meter",
  why: "Measures what your appliance actually draws, so you size from real numbers instead of estimates.",
  amazonSearchQuery: "plug in electricity usage watt meter",
};

const HEAVY_CORD: Accessory = {
  label: "Heavy-duty 12-gauge extension cord",
  why: "Lets the power station sit where it's convenient without voltage drop on motor loads.",
  amazonSearchQuery: "12 gauge heavy duty indoor outdoor extension cord 25 ft",
};

const BY_APPLIANCE: Record<string, Accessory[]> = {
  refrigerator: [
    {
      label: "Fridge & freezer thermometer",
      why: "Tells you when food is still safe (40°F / 0°F) so you only run the fridge when needed.",
      amazonSearchQuery: "refrigerator freezer thermometer",
    },
  ],
  "chest-freezer": [
    {
      label: "Freezer thermometer with alarm",
      why: "Alerts you if the freezer warms up so you can top it up from the battery in short bursts.",
      amazonSearchQuery: "wireless freezer thermometer alarm",
    },
  ],
  "cpap-machine": [
    {
      label: "CPAP DC power cord (match your model)",
      why: "Running a CPAP from the 12V/DC port skips inverter losses and can roughly double runtime.",
      amazonSearchQuery: "CPAP DC power cord converter",
    },
  ],
  "oxygen-concentrator": [
    {
      label: "Pulse oximeter",
      why: "A cheap backup check on oxygen levels while you're on battery power.",
      amazonSearchQuery: "fingertip pulse oximeter",
    },
  ],
  "sump-pump": [
    {
      label: "Water leak alarm",
      why: "Warns you early if water starts rising before the battery or pump gives out.",
      amazonSearchQuery: "basement water leak alarm sensor",
    },
  ],
  "well-pump": [
    {
      label: "Water storage container",
      why: "Fill a few gallons while the pump runs so you can switch the pump off and save battery.",
      amazonSearchQuery: "7 gallon water storage container",
    },
  ],
  "gas-furnace-blower": [
    {
      label: "Furnace generator transfer switch",
      why: "Lets a power station plug into a hardwired furnace. Have an electrician install it.",
      amazonSearchQuery: "furnace generator transfer switch",
    },
  ],
  "pellet-stove": [
    {
      label: "Plug-in carbon monoxide detector with battery backup",
      why: "Any combustion heater should have a working CO alarm, especially during outages.",
      amazonSearchQuery: "plug in carbon monoxide detector battery backup",
    },
  ],
  "space-heater": [
    {
      label: "Low-watt heated blanket",
      why: "Uses a fraction of a space heater's power, so the same battery lasts many times longer.",
      amazonSearchQuery: "low wattage heated electric blanket",
    },
  ],
  "electric-blanket": [
    {
      label: "12V heated blanket",
      why: "Runs from the DC car port, skipping inverter losses for longer runtime.",
      amazonSearchQuery: "12v heated electric blanket",
    },
  ],
  "wifi-router": [
    {
      label: "USB to 12V DC router cable",
      why: "Powers many routers from a USB port instead of the AC inverter, saving battery.",
      amazonSearchQuery: "USB to 12V DC cable router",
    },
  ],
  starlink: [
    {
      label: "Surge-protected power strip",
      why: "Keeps the dish, router and a laptop on one outlet with basic protection.",
      amazonSearchQuery: "surge protector power strip 6 outlet",
    },
  ],
  "portable-car-fridge": [
    {
      label: "12V socket extension cord",
      why: "Lets you run the fridge straight off the station's 12V car port without the inverter.",
      amazonSearchQuery: "12V car socket extension cord heavy duty",
    },
  ],
  "led-lights-phones": [
    {
      label: "Rechargeable LED lantern",
      why: "Charges from USB and lights a room for hours on a few watts.",
      amazonSearchQuery: "rechargeable LED camping lantern USB",
    },
  ],
  "aquarium-heater-filter": [
    {
      label: "Battery-powered aquarium air pump",
      why: "A cheap fallback that keeps water oxygenated if the main battery runs down.",
      amazonSearchQuery: "battery operated aquarium air pump",
    },
  ],
};

/** Up to three useful add-ons for an appliance; always includes a watt meter. */
export function getAccessoriesFor(applianceId: string): Accessory[] {
  const specific = BY_APPLIANCE[applianceId] ?? [];
  return [...specific, WATT_METER, HEAVY_CORD].slice(0, 3);
}
