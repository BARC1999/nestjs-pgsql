/** Transport-agnostic read models. The Prisma client is not exposed to GraphQL. */
export interface ProfileRecord {
  id: string;
  name: string;
  headline: string;
  description: string;
  location: string | null;
}

export interface SkillRecord {
  id: string;
  profileId: string;
  name: string;
  category: string | null;
}

export interface ExperienceRecord {
  id: string;
  profileId: string;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  summary: string | null;
  achievements: string[];
}

export interface ProjectRecord {
  id: string;
  profileId: string;
  name: string;
  description: string | null;
  url: string;
  repositoryUrl: string | null;
  technologies: string[];
}

export interface LinkRecord {
  id: string;
  profileId: string;
  label: string;
  url: string;
}
