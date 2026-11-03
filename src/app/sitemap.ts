import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/affiliate";
import { APPLIANCES, TOP_COMBO_APPLIANCES } from "@/data/appliances";
import { COMPARISON_PAIRS, POWER_STATIONS } from "@/data/powerStations";
import { isIndexableCombo } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.domain;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/can-it-run`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/runtime`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/power-stations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/how-we-calculate`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const applianceRoutes: MetadataRoute.Sitemap = APPLIANCES.map((app) => ({
    url: `${base}/can-it-run/${app.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const compareRoutes: MetadataRoute.Sitemap = COMPARISON_PAIRS.map((pair) => ({
    url: `${base}/compare/${pair.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const reviewRoutes: MetadataRoute.Sitemap = POWER_STATIONS.map((station) => ({
    url: `${base}/reviews/${station.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const comboRoutes: MetadataRoute.Sitemap = [];
  for (const station of POWER_STATIONS) {
    for (const app of TOP_COMBO_APPLIANCES) {
      if (!isIndexableCombo(station, app)) continue;
      comboRoutes.push({
        url: `${base}/runtime/${station.slug}-for-${app.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return [
    ...staticRoutes,
    ...applianceRoutes,
    ...compareRoutes,
    ...reviewRoutes,
    ...comboRoutes,
  ];
}
