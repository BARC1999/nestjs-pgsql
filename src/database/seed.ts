import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import {
  PUBLIC_PROFILE_ID,
  seedExperience,
  seedLinks,
  seedProfile,
  seedProjects,
  seedSkills,
} from './seed-data';

const prisma = new PrismaClient();

/**
 * Stable seed IDs + upserts make startup safe to repeat. Existing data added
 * later (e.g. during the live coding interview) is NOT wiped on restart.
 */
export async function seed(): Promise<void> {
  await prisma.$transaction(async (tx) => {
    await tx.profile.upsert({
      where: { id: PUBLIC_PROFILE_ID },
      create: { id: PUBLIC_PROFILE_ID, ...seedProfile },
      update: seedProfile,
    });

    for (const link of seedLinks) {
      await tx.professionalLink.upsert({
        where: { id: link.id },
        create: { ...link, profileId: PUBLIC_PROFILE_ID },
        update: { label: link.label, url: link.url, sortOrder: link.sortOrder },
      });
    }

    for (const skill of seedSkills) {
      await tx.skill.upsert({
        where: { id: skill.id },
        create: { ...skill, profileId: PUBLIC_PROFILE_ID },
        update: { name: skill.name, category: skill.category, sortOrder: skill.sortOrder },
      });
    }

    for (const experience of seedExperience) {
      await tx.experience.upsert({
        where: { id: experience.id },
        create: { ...experience, profileId: PUBLIC_PROFILE_ID },
        update: {
          company: experience.company,
          position: experience.position,
          startDate: experience.startDate,
          endDate: experience.endDate,
          summary: experience.summary,
          achievements: experience.achievements,
          sortOrder: experience.sortOrder,
        },
      });
    }

    for (const project of seedProjects) {
      await tx.project.upsert({
        where: { id: project.id },
        create: { ...project, profileId: PUBLIC_PROFILE_ID },
        update: {
          name: project.name,
          description: project.description,
          url: project.url,
          repositoryUrl: project.repositoryUrl,
          technologies: project.technologies,
          sortOrder: project.sortOrder,
        },
      });
    }
  });
}

seed()
  .then(() => console.log('Portfolio seed completed.'))
  .catch((error: unknown) => {
    console.error('Portfolio seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
