import { Context, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProfileRecord } from '../domain/models';
import { ProfileLoaders } from '../loaders/profile.loaders';
import { ProfileService } from '../profile.service';
import {
  ExperienceType,
  ProfessionalLinkType,
  ProfileType,
  ProjectType,
  SkillType,
} from './profile.types';

/** GraphQL presentation layer: no SQL, no Prisma imports. */
@Resolver(() => ProfileType)
export class ProfileResolver {
  constructor(private readonly service: ProfileService) {}

  @Query(() => ProfileType, {
    name: 'profile',
    nullable: true,
    description: 'Public professional profile with lazily resolved nested collections.',
  })
  profile(): Promise<ProfileRecord | null> {
    return this.service.getPublicProfile();
  }

  @ResolveField(() => [SkillType])
  skills(@Parent() profile: ProfileRecord, @Context('loaders') loaders: ProfileLoaders) {
    return loaders.skills.load(profile.id);
  }

  @ResolveField(() => [ExperienceType])
  experience(@Parent() profile: ProfileRecord, @Context('loaders') loaders: ProfileLoaders) {
    return loaders.experience.load(profile.id);
  }

  @ResolveField(() => [ProjectType])
  projects(@Parent() profile: ProfileRecord, @Context('loaders') loaders: ProfileLoaders) {
    return loaders.projects.load(profile.id);
  }

  @ResolveField(() => [ProfessionalLinkType])
  links(@Parent() profile: ProfileRecord, @Context('loaders') loaders: ProfileLoaders) {
    return loaders.links.load(profile.id);
  }
}
