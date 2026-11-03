import { OG_SIZE, renderOgImage } from "@/lib/ogImage";

export const alt = "WattSizer power station sizing calculator";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default function Image() {
  return renderOgImage(
    "Power Station Sizing Calculator",
    "What size power station do you actually need?",
    "Pick your appliances, see watt-hours, surge and which units can run them."
  );
}
