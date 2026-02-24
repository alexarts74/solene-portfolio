import type { MetadataRoute } from "next";
import { collections } from "@/lib/data/collections";
import { projects } from "@/lib/data/projects";
import { prints } from "@/lib/data/prints";

const BASE_URL = "https://solennebrianchon.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/collections`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/prints`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const collectionRoutes: MetadataRoute.Sitemap = collections.flatMap((c) => [
    {
      url: `${BASE_URL}/collections/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...c.galleries.map((g) => ({
      url: `${BASE_URL}/collections/${c.slug}/${g.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]);

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const printRoutes: MetadataRoute.Sitemap = prints.map((p) => ({
    url: `${BASE_URL}/prints/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...collectionRoutes, ...projectRoutes, ...printRoutes];
}
