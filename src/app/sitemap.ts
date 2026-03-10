import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

const routes = [
  "",
  "/sobre",
  "/bastilha",
  "/bastilha/personagens",
  "/bastilha/cronologia",
  "/bastilha/mural",
  "/mentoria",
  "/cursos",
  "/episodios",
  "/projetos",
  "/feedbacks",
  "/contato"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
    lastModified: new Date()
  }));
}
