import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('ProfessionalLink')
export class ProfessionalLinkType {
  @Field(() => ID)
  id!: string;

  @Field()
  label!: string;

  @Field()
  url!: string;
}

@ObjectType('Skill')
export class SkillType {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(() => String, { nullable: true })
  category!: string | null;
}

@ObjectType('Experience')
export class ExperienceType {
  @Field(() => ID)
  id!: string;

  @Field()
  company!: string;

  @Field()
  position!: string;

  @Field(() => GraphQLISODateTime)
  startDate!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate!: Date | null;

  @Field(() => String, { nullable: true })
  summary!: string | null;

  @Field(() => [String])
  achievements!: string[];

  @Field({ description: 'Human-readable employment duration, computed from employment dates.' })
  duration!: string;
}

@ObjectType('Project')
export class ProjectType {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field()
  url!: string;

  @Field(() => String, { nullable: true })
  repositoryUrl!: string | null;

  @Field(() => [String])
  technologies!: string[];
}

@ObjectType('Profile')
export class ProfileType {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  headline!: string;

  @Field()
  description!: string;

  @Field(() => String, { nullable: true })
  location!: string | null;

  // Resolved on demand, using per-request batched loaders.
  @Field(() => [ProfessionalLinkType])
  links!: ProfessionalLinkType[];

  @Field(() => [SkillType])
  skills!: SkillType[];

  @Field(() => [ExperienceType])
  experience!: ExperienceType[];

  @Field(() => [ProjectType])
  projects!: ProjectType[];
}
