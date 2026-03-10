"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { parseFaqLines, parseLines } from "@/lib/utils";
import { adminSectionSchema } from "@/lib/validators";
import { clearSession } from "@/lib/auth";
import { CourseStatus, ProjectStatus, type ContactType, type WallPostKind } from "@prisma/client";

function toBool(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

function text(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function logoutAdmin() {
  await clearSession("admin");
  revalidatePath("/admin");
}

export async function saveSection(formData: FormData) {
  const parsed = adminSectionSchema.safeParse({
    page: text(formData.get("page")),
    key: text(formData.get("key")),
    eyebrow: text(formData.get("eyebrow")) || undefined,
    title: text(formData.get("title")),
    body: text(formData.get("body")),
    ctaLabel: text(formData.get("ctaLabel")) || undefined,
    ctaHref: text(formData.get("ctaHref")) || undefined,
    order: formData.get("order")
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Dados inválidos.");
  }

  const sectionId = text(formData.get("id"));

  if (sectionId) {
    await prisma.siteSection.update({
      where: { id: sectionId },
      data: parsed.data
    });
  } else {
    await prisma.siteSection.upsert({
      where: {
        page_key: {
          page: parsed.data.page,
          key: parsed.data.key
        }
      },
      update: parsed.data,
      create: parsed.data
    });
  }

  revalidatePath("/");
  revalidatePath(`/${parsed.data.page}`);
  revalidatePath("/admin/sections");
}

export async function deleteSection(formData: FormData) {
  const id = text(formData.get("id"));
  if (!id) return;
  await prisma.siteSection.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/sections");
}

export async function saveProject(formData: FormData) {
  const id = text(formData.get("id"));
  const data = {
    title: text(formData.get("title")),
    slug: text(formData.get("slug")),
    summary: text(formData.get("summary")),
    body: text(formData.get("body")),
    category: text(formData.get("category")),
    status: (text(formData.get("status")) || "DEVELOPMENT") as ProjectStatus,
    coverImage: text(formData.get("coverImage")) || null,
    accent: text(formData.get("accent")) || null,
    launchLabel: text(formData.get("launchLabel")) || null,
    featured: toBool(formData.get("featured")),
    sortOrder: Number(formData.get("sortOrder") || 0)
  };

  if (id) {
    await prisma.project.update({ where: { id }, data });
  } else {
    await prisma.project.create({ data });
  }

  revalidatePath("/projetos");
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  const id = text(formData.get("id"));
  if (!id) return;
  await prisma.project.delete({ where: { id } });
  revalidatePath("/projetos");
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function saveCourse(formData: FormData) {
  const id = text(formData.get("id"));
  const data = {
    title: text(formData.get("title")),
    slug: text(formData.get("slug")),
    excerpt: text(formData.get("excerpt")),
    description: text(formData.get("description")),
    status: (text(formData.get("status")) || "DRAFT") as CourseStatus,
    thumbnailUrl: text(formData.get("thumbnailUrl")) || null,
    priceLabel: text(formData.get("priceLabel")) || null,
    ctaLabel: text(formData.get("ctaLabel")) || null,
    ctaHref: text(formData.get("ctaHref")) || null,
    waitlistUrl: text(formData.get("waitlistUrl")) || null,
    modules: parseLines(formData.get("modules")),
    bonuses: parseLines(formData.get("bonuses")),
    faq: parseFaqLines(formData.get("faq")),
    featured: toBool(formData.get("featured"))
  };

  if (id) {
    await prisma.course.update({ where: { id }, data });
  } else {
    await prisma.course.create({ data });
  }

  revalidatePath("/cursos");
  revalidatePath("/");
  revalidatePath("/admin/courses");
}

export async function deleteCourse(formData: FormData) {
  const id = text(formData.get("id"));
  if (!id) return;
  await prisma.course.delete({ where: { id } });
  revalidatePath("/cursos");
  revalidatePath("/admin/courses");
}

export async function saveEpisode(formData: FormData) {
  const id = text(formData.get("id"));
  const data = {
    title: text(formData.get("title")),
    slug: text(formData.get("slug")),
    series: text(formData.get("series")),
    season: Number(formData.get("season") || 0) || null,
    actLabel: text(formData.get("actLabel")) || null,
    category: text(formData.get("category")) || null,
    summary: text(formData.get("summary")),
    thumbnailUrl: text(formData.get("thumbnailUrl")) || null,
    externalUrl: text(formData.get("externalUrl")) || null,
    embedUrl: text(formData.get("embedUrl")) || null,
    featured: toBool(formData.get("featured"))
  };

  if (id) {
    await prisma.episode.update({ where: { id }, data });
  } else {
    await prisma.episode.create({ data });
  }

  revalidatePath("/episodios");
  revalidatePath("/");
  revalidatePath("/admin/episodes");
}

export async function deleteEpisode(formData: FormData) {
  const id = text(formData.get("id"));
  if (!id) return;
  await prisma.episode.delete({ where: { id } });
  revalidatePath("/episodios");
  revalidatePath("/admin/episodes");
}

export async function saveTestimonial(formData: FormData) {
  const id = text(formData.get("id"));
  const data = {
    name: text(formData.get("name")),
    role: text(formData.get("role")) || null,
    category: text(formData.get("category")),
    quote: text(formData.get("quote")),
    sourceLabel: text(formData.get("sourceLabel")) || null,
    featured: toBool(formData.get("featured")),
    sortOrder: Number(formData.get("sortOrder") || 0)
  };

  if (id) {
    await prisma.testimonial.update({ where: { id }, data });
  } else {
    await prisma.testimonial.create({ data });
  }

  revalidatePath("/feedbacks");
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  const id = text(formData.get("id"));
  if (!id) return;
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/feedbacks");
  revalidatePath("/admin/testimonials");
}

export async function saveCharacter(formData: FormData) {
  const id = text(formData.get("id"));
  const data = {
    name: text(formData.get("name")),
    slug: text(formData.get("slug")),
    title: text(formData.get("title")) || null,
    allegiance: text(formData.get("allegiance")) || null,
    summary: text(formData.get("summary")),
    imageUrl: text(formData.get("imageUrl")) || null,
    featured: toBool(formData.get("featured")),
    sortOrder: Number(formData.get("sortOrder") || 0)
  };

  if (id) {
    await prisma.bastilhaCharacter.update({ where: { id }, data });
  } else {
    await prisma.bastilhaCharacter.create({ data });
  }

  revalidatePath("/bastilha");
  revalidatePath("/bastilha/personagens");
  revalidatePath("/admin/bastilha");
}

export async function deleteCharacter(formData: FormData) {
  const id = text(formData.get("id"));
  if (!id) return;
  await prisma.bastilhaCharacter.delete({ where: { id } });
  revalidatePath("/bastilha/personagens");
  revalidatePath("/admin/bastilha");
}

export async function saveTimelineEvent(formData: FormData) {
  const id = text(formData.get("id"));
  const data = {
    title: text(formData.get("title")),
    slug: text(formData.get("slug")),
    dateLabel: text(formData.get("dateLabel")),
    body: text(formData.get("body")),
    important: toBool(formData.get("important")),
    sortOrder: Number(formData.get("sortOrder") || 0)
  };

  if (id) {
    await prisma.timelineEvent.update({ where: { id }, data });
  } else {
    await prisma.timelineEvent.create({ data });
  }

  revalidatePath("/bastilha");
  revalidatePath("/bastilha/cronologia");
  revalidatePath("/admin/bastilha");
}

export async function deleteTimelineEvent(formData: FormData) {
  const id = text(formData.get("id"));
  if (!id) return;
  await prisma.timelineEvent.delete({ where: { id } });
  revalidatePath("/bastilha/cronologia");
  revalidatePath("/admin/bastilha");
}

export async function saveWallPost(formData: FormData) {
  const id = text(formData.get("id"));
  const data = {
    kind: (text(formData.get("kind")) || "UPDATE") as WallPostKind,
    title: text(formData.get("title")) || null,
    body: text(formData.get("body")),
    authorName: text(formData.get("authorName")) || "Bolsonier Studios",
    authorKey: text(formData.get("authorKey")) || "studio",
    pinned: toBool(formData.get("pinned")),
    featured: toBool(formData.get("featured"))
  };

  if (id) {
    await prisma.wallPost.update({ where: { id }, data });
  } else {
    await prisma.wallPost.create({ data });
  }

  revalidatePath("/bastilha");
  revalidatePath("/bastilha/mural");
  revalidatePath("/admin/wall");
}

export async function deleteWallPost(formData: FormData) {
  const id = text(formData.get("id"));
  if (!id) return;
  await prisma.wallPost.delete({ where: { id } });
  revalidatePath("/bastilha/mural");
  revalidatePath("/admin/wall");
}

export async function savePoll(formData: FormData) {
  const id = text(formData.get("id"));
  const title = text(formData.get("title"));
  const description = text(formData.get("description")) || null;
  const isActive = toBool(formData.get("isActive"));
  const options = parseLines(formData.get("options"));

  if (id) {
    await prisma.poll.update({
      where: { id },
      data: {
        title,
        description,
        isActive,
        options: {
          deleteMany: {},
          create: options.map((label, index) => ({ label, sortOrder: index + 1 }))
        }
      }
    });
  } else {
    await prisma.poll.create({
      data: {
        title,
        description,
        isActive,
        options: {
          create: options.map((label, index) => ({ label, sortOrder: index + 1 }))
        }
      }
    });
  }

  revalidatePath("/bastilha/mural");
  revalidatePath("/admin/wall");
}

export async function deletePoll(formData: FormData) {
  const id = text(formData.get("id"));
  if (!id) return;
  await prisma.poll.delete({ where: { id } });
  revalidatePath("/bastilha/mural");
  revalidatePath("/admin/wall");
}

export async function markContact(formData: FormData) {
  const id = text(formData.get("id"));
  const status = text(formData.get("status")) || "novo";
  if (!id) return;

  await prisma.contactSubmission.update({
    where: { id },
    data: { status }
  });

  revalidatePath("/admin/contacts");
}
