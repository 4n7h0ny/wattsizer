import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Portable Power Stations Side by Side | WattSizer",
  description:
    "Pick any two LiFePO4 power stations and compare capacity, output, surge, solar input, weight and estimated appliance runtimes.",
  alternates: { canonical: "/compare" },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
