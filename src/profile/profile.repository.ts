import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import {
  ExperienceRecord,
  LinkRecord,
  ProfileRecord,
  ProjectRecord,
  SkillRecord,
} from './domain/models';

/** Database access only; no GraphQL decorators or presentation concerns. */
@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  findPublicProfile(): Promise<ProfileRecord | null> {
    return this.prisma.profile.findUnique({
      where: { id: 'public' },
      select: { id: true, name: true, headline: true, description: true, location: true },
    });
  }

  findSkills(profileIds: readonly string[]): Promise<SkillRecord[]> {
    return this.prisma.skill.findMany({
      where: { profileId: { in: [...profileIds] } },
      select: { id: true, profileId: true, name: true, category: true },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
  }

  findExperience(profileIds: readonly string[]): Promise<ExperienceRecord[]> {
    return this.prisma.experience.findMany({
      where: { profileId: { in: [...profileIds] } },
      select: {
        id: true,
        profileId: true,
        company: true,
        position: true,
        startDate: true,
        endDate: true,
        summary: true,
        achievements: true,
      },
      orderBy: [{ sortOrder: 'asc' }, { startDate: 'desc' }],
    });
  }

  findProjects(profileIds: readonly string[]): Promise<ProjectRecord[]> {
    return this.prisma.project.findMany({
      where: { profileId: { in: [...profileIds] } },
      select: {
        id: true,
        profileId: true,
        name: true,
        description: true,
        url: true,
        repositoryUrl: true,
        technologies: true,
      },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
  }

  findLinks(profileIds: readonly string[]): Promise<LinkRecord[]> {
    return this.prisma.professionalLink.findMany({
      where: { profileId: { in: [...profileIds] } },
      select: { id: true, profileId: true, label: true, url: true },
      orderBy: [{ sortOrder: 'asc' }, { label: 'asc' }],
    });
  }
}
