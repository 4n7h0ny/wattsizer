import { Metadata } from "next";
import { POWER_STATIONS } from "@/data/powerStations";

export const metadata: Metadata = {
  title: `${POWER_STATIONS.length} LiFePO4 Portable Power Stations Compared | WattSizer`,
  description:
    "Specs for popular EcoFlow, Jackery, Anker SOLIX and BLUETTI power stations: capacity, output, surge, solar input, weight and expandability.",
  alternates: { canonical: "/power-stations" },
};

export default function PowerStationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
