# WattSizer — Portable Power Station & Solar Generator Sizer (Amazon Associates Engine)

An interactive, engineering-grade **Portable Power Station & Blackout Sizer** web application built to attract high-intent buyers from Google Search and convert them through **Amazon Associates** (high-ticket items ranging from \$250 to \$2,899+ per order) with **\$0/month hosting cost**.

---

## Key Revenue & Conversion Features

1. **Interactive Blackout & Solar Sizer Calculator (`/`)**
   - 5 one-click blackout/camping/Starlink presets + 14 household appliances + custom device wattage adder.
   - Real-world **compressor duty-cycle math** (e.g., refrigerators cycle ~38% of the time) + **85% AC inverter usable capacity modeling** + **peak motor startup surge checks**.
   - Outputs 3 tailored Amazon recommendations (**Best Value Match**, **#1 Best Overall Pick**, and **Extended Outage Upgrade**) with personalized runtime hours.
   - **1-Click "+Solar Bundle" Toggle**: Visitors can switch any card between standalone Power Station and the Amazon Solar Generator Bundle (+200W/400W Solar Panel), increasing average Amazon cart value from ~\$650 to \$1,000+ using your same single Amazon tag.

2. **Programmatic SEO Appliance Runtime Pages (`/can-it-run/[slug]`)**
   - Auto-generates 14 search-optimized landing pages for queries buyers search right before purchasing:
     - `/can-it-run/refrigerator` (*"What Size Portable Power Station Runs a Refrigerator?"*)
     - `/can-it-run/cpap-machine` (*"Best Portable Power Station for a CPAP Machine"*)
     - `/can-it-run/sump-pump` (*"What Size Portable Power Station Runs a Basement Sump Pump?"*)
     - `/can-it-run/starlink`, `/can-it-run/chest-freezer`, `/can-it-run/microwave`, `/can-it-run/space-heater`, `/can-it-run/window-ac`, and more.

3. **Head-to-Head VS Showdowns (`/compare` & `/compare/[slug]`)**
   - Interactive side-by-side comparison tool where visitors can pit any two models against each other, plus pre-built SEO comparison pages (*EcoFlow DELTA 2 vs. Jackery 1000 v2*, *Anker SOLIX C1000 vs. BLUETTI AC180*, etc.).

4. **Single-Place Amazon Tag Configuration (`src/config/affiliate.ts`)**
   - Change `amazonAssociateTag` in **one place** (`src/config/affiliate.ts` or `.env.local` via `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=yourtag-20`) and every link across the entire site updates automatically.

---

## Running Locally

```bash
npm run dev
```

Then open `http://localhost:3000`.
To view your step-by-step launch instructions inside the app, visit `http://localhost:3000/owner-guide`.

