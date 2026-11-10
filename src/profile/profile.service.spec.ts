import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  it('retrieves the public profile through the repository', async () => {
    const profile = {
      id: 'public',
      name: 'Test',
      headline: 'Engineer',
      description: 'Description',
      location: null,
    };
    const repository = { findPublicProfile: jest.fn().mockResolvedValue(profile) };
    const service = new ProfileService(repository as unknown as ProfileRepository);
    expect(await service.getPublicProfile()).toEqual(profile);
    expect(repository.findPublicProfile).toHaveBeenCalledTimes(1);
  });
});
