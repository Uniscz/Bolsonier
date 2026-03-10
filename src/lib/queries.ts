import { prisma } from "@/lib/prisma";
import { sectionSeed } from "@/lib/seed-data";

export async function getSections(page: string) {
  const sections = await prisma.siteSection.findMany({
    where: { page },
    orderBy: { order: "asc" }
  });

  if (sections.length > 0) return sections;

  return sectionSeed.filter((section) => section.page === page);
}

export async function getSection(page: string, key: string) {
  const section = await prisma.siteSection.findUnique({
    where: { page_key: { page, key } }
  });

  if (section) return section;
  return sectionSeed.find((item) => item.page === page && item.key === key) || null;
}
