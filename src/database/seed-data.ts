/**
 * PERSONALIZE THIS FILE BEFORE SUBMITTING THE ASSIGNMENT.
 * The examples below are intentionally obvious placeholders, NOT a claim
 * about any actual person's employment or shipped projects.
 */
export const PUBLIC_PROFILE_ID = 'public';

export const seedProfile = {
  name: 'YOUR FULL NAME',
  headline: 'TypeScript / NestJS Backend Developer',
  description:
    'REPLACE ME: Describe your real backend experience, engineering interests, and most relevant achievements in 2–4 sentences.',
  location: null as string | null,
};

export const seedLinks = [
  { id: 'link-github', label: 'GitHub', url: 'https://github.com/YOUR_USERNAME', sortOrder: 10 },
  {
    id: 'link-linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/YOUR_PROFILE',
    sortOrder: 20,
  },
];

export const seedSkills = [
  { id: 'skill-typescript', name: 'TypeScript', category: 'Language', sortOrder: 10 },
  { id: 'skill-node', name: 'Node.js', category: 'Runtime', sortOrder: 20 },
  { id: 'skill-nest', name: 'NestJS', category: 'Framework', sortOrder: 30 },
  { id: 'skill-graphql', name: 'GraphQL', category: 'API', sortOrder: 40 },
  { id: 'skill-prisma', name: 'Prisma', category: 'ORM', sortOrder: 50 },
  { id: 'skill-postgres', name: 'PostgreSQL', category: 'Database', sortOrder: 60 },
  { id: 'skill-docker', name: 'Docker', category: 'Tooling', sortOrder: 70 },
  { id: 'skill-git', name: 'Git', category: 'Tooling', sortOrder: 80 },
];

export const seedExperience = [
  {
    id: 'experience-example',
    company: 'REPLACE: Actual company',
    position: 'REPLACE: Actual job title',
    startDate: new Date('2023-01-01T00:00:00.000Z'),
    endDate: null as Date | null,
    summary: 'REPLACE: Describe your actual responsibilities.',
    achievements: [
      'REPLACE: A measurable contribution you actually made.',
      'REPLACE: A technical improvement you actually delivered.',
    ],
    sortOrder: 10,
  },
];

export const seedProjects = [
  {
    id: 'project-portfolio',
    name: 'Professional Portfolio GraphQL API',
    description: 'NestJS + Prisma + PostgreSQL + GraphQL portfolio backend (this assignment).',
    url: 'https://github.com/YOUR_USERNAME/YOUR_REPOSITORY',
    repositoryUrl: 'https://github.com/YOUR_USERNAME/YOUR_REPOSITORY',
    technologies: ['TypeScript', 'NestJS', 'Prisma', 'GraphQL', 'PostgreSQL', 'Docker'],
    sortOrder: 10,
  },
];
