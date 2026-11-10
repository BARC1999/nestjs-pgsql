import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { formatExperienceDuration } from '../domain/duration';
import { ExperienceRecord } from '../domain/models';
import { ExperienceType } from './profile.types';

@Resolver(() => ExperienceType)
export class ExperienceResolver {
  /** Derived field: no additional database call for a human-readable duration. */
  @ResolveField(() => String)
  duration(@Parent() experience: ExperienceRecord): string {
    return formatExperienceDuration(experience.startDate, experience.endDate);
  }
}
