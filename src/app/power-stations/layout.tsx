import { Metadata } from "next";

export const metadata: Metadata = {
  title: "10 LiFePO4 Portable Power Stations Compared | WattSizer",
  description:
    "Specs for 10 popular EcoFlow, Jackery, Anker SOLIX and BLUETTI power stations: capacity, output, surge, solar input, weight and expandability.",
  alternates: { canonical: "/power-stations" },
};

export default function PowerStationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
