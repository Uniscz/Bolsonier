import { PrismaClient } from "@prisma/client";
import {
  sectionSeed,
  mentorshipSeed,
  courseSeed,
  projectSeed,
  episodeSeed,
  testimonialSeed,
  characterSeed,
  timelineSeed,
  initialWallPosts,
  initialPoll
} from "../src/lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  for (const section of sectionSeed) {
    await prisma.siteSection.upsert({
      where: { page_key: { page: section.page, key: section.key } },
      update: section,
      create: section
    });
  }

  await prisma.mentorshipOffer.upsert({
    where: { slug: mentorshipSeed.slug },
    update: mentorshipSeed,
    create: mentorshipSeed
  });

  for (const course of courseSeed) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: course,
      create: course
    });
  }

  for (const project of projectSeed) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project
    });
  }

  for (const episode of episodeSeed) {
    await prisma.episode.upsert({
      where: { slug: episode.slug },
      update: episode,
      create: episode
    });
  }

  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({ data: testimonialSeed });

  for (const character of characterSeed) {
    await prisma.bastilhaCharacter.upsert({
      where: { slug: character.slug },
      update: character,
      create: character
    });
  }

  for (const event of timelineSeed) {
    await prisma.timelineEvent.upsert({
      where: { slug: event.slug },
      update: event,
      create: event
    });
  }

  await prisma.wallPost.deleteMany();
  await prisma.wallPost.createMany({ data: initialWallPosts });

  const existingPoll = await prisma.poll.findFirst();

  if (!existingPoll) {
    await prisma.poll.create({
      data: {
        title: initialPoll.title,
        description: initialPoll.description,
        isActive: true,
        options: {
          create: initialPoll.options.map((label, index) => ({
            label,
            sortOrder: index + 1
          }))
        }
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
