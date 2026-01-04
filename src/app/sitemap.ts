// REVIEWED

import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseURL =
    process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseURL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseURL}/a-human-but-from-gaza`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseURL}/humans-but-from-gaza`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseURL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseURL}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseURL}/support`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  return staticRoutes;
}
