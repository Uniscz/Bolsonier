import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

const routes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/obra/a-bastilha-de-bolsonier", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/bastilha", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/bastilha/personagens", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/episodios", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/bastilha/cronologia", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/bastilha/mural", priority: 0.75, changeFrequency: "daily" as const },
  { path: "/sobre", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contato", priority: 0.5, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    lastModified: new Date()
  }));
}
