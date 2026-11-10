import { Injectable } from '@nestjs/common';
import {
  ExperienceRecord,
  LinkRecord,
  ProfileRecord,
  ProjectRecord,
  SkillRecord,
} from './domain/models';
import { ProfileRepository } from './profile.repository';

/** Application-level use cases: the resolvers never call Prisma directly. */
@Injectable()
export class ProfileService {
  constructor(private readonly repository: ProfileRepository) {}

  getPublicProfile(): Promise<ProfileRecord | null> {
    return this.repository.findPublicProfile();
  }

  getSkillsForProfiles(ids: readonly string[]): Promise<SkillRecord[]> {
    return this.repository.findSkills(ids);
  }

  getExperienceForProfiles(ids: readonly string[]): Promise<ExperienceRecord[]> {
    return this.repository.findExperience(ids);
  }

  getProjectsForProfiles(ids: readonly string[]): Promise<ProjectRecord[]> {
    return this.repository.findProjects(ids);
  }

  getLinksForProfiles(ids: readonly string[]): Promise<LinkRecord[]> {
    return this.repository.findLinks(ids);
  }
}
