import DataLoader from 'dataloader';
import {
  ExperienceRecord,
  LinkRecord,
  ProjectRecord,
  SkillRecord,
} from '../domain/models';
import { ProfileService } from '../profile.service';

/**
 * Reassemble batches in the exact input key order (DataLoader contract).
 * Multiple parents => one SQL query per requested relation, not N queries.
 */
export function groupByProfile<T extends { profileId: string }>(
  rows: readonly T[],
  keys: readonly string[],
): T[][] {
  const grouped = new Map<string, T[]>();
  for (const row of rows) {
    const items = grouped.get(row.profileId) ?? [];
    items.push(row);
    grouped.set(row.profileId, items);
  }
  return keys.map((key) => grouped.get(key) ?? []);
}

/** A NEW instance must be created for EACH GraphQL request. */
export class ProfileLoaders {
  readonly skills: DataLoader<string, SkillRecord[]>;
  readonly experience: DataLoader<string, ExperienceRecord[]>;
  readonly projects: DataLoader<string, ProjectRecord[]>;
  readonly links: DataLoader<string, LinkRecord[]>;

  constructor(service: ProfileService) {
    this.skills = new DataLoader(async (keys) =>
      groupByProfile(await service.getSkillsForProfiles(keys), keys),
    );
    this.experience = new DataLoader(async (keys) =>
      groupByProfile(await service.getExperienceForProfiles(keys), keys),
    );
    this.projects = new DataLoader(async (keys) =>
      groupByProfile(await service.getProjectsForProfiles(keys), keys),
    );
    this.links = new DataLoader(async (keys) =>
      groupByProfile(await service.getLinksForProfiles(keys), keys),
    );
  }
}
