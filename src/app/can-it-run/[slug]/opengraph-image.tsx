import { APPLIANCES } from "@/data/appliances";
import { POWER_STATIONS } from "@/data/powerStations";
import { OG_SIZE, renderOgImage } from "@/lib/ogImage";

export const alt = "Appliance power station runtime estimate";
export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default function Image({ params }: { params: { slug: string } }) {
  const app = APPLIANCES.find((a) => a.slug === params.slug);
  if (!app) return renderOgImage("Appliance Guide", "Can a power station run it?", "");
  return renderOgImage(
    "Can a power station run it?",
    `${app.shortName} on battery power`,
    `${app.runningWatts}W running · ${app.surgeWatts}W startup surge · runtimes for ${POWER_STATIONS.length} models`
  );
}
