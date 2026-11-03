import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/affiliate";
import { APPLIANCES } from "@/data/appliances";
import { COMPARISON_PAIRS } from "@/data/powerStations";

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

  return [...staticRoutes, ...applianceRoutes, ...compareRoutes];
}

