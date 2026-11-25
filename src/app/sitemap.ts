
import type { MetadataRoute } from "next";

const BASE_URL = "https://everyday-tools-hub-phi.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/privacy-policy",
    "/terms",
    "/contact",
    "/tools/word-counter",
    "/tools/case-converter",
    "/tools/json-formatter",
    "/tools/remove-extra-spaces",
    "/tools/percentage-calculator",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : route.startsWith("/tools/") ? 0.8 : 0.5,
  }));
}
