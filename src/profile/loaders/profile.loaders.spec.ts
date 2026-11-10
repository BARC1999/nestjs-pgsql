import { ProfileService } from '../profile.service';
import { groupByProfile, ProfileLoaders } from './profile.loaders';

describe('groupByProfile', () => {
  it('groups in input key order, retaining row order and returning empty arrays', () => {
    const grouped = groupByProfile(
      [
        { profileId: 'b', name: 'B1' },
        { profileId: 'a', name: 'A1' },
        { profileId: 'b', name: 'B2' },
      ],
      ['a', 'missing', 'b'],
    );
    expect(grouped).toEqual([
      [{ profileId: 'a', name: 'A1' }],
      [],
      [
        { profileId: 'b', name: 'B1' },
        { profileId: 'b', name: 'B2' },
      ],
    ]);
  });
});

describe('ProfileLoaders', () => {
  it('batches multiple profile IDs into a single service call', async () => {
    const getSkillsForProfiles = jest.fn().mockResolvedValue([
      { id: 's2', profileId: 'b', name: 'SQL', category: 'Database' },
      { id: 's1', profileId: 'a', name: 'TypeScript', category: 'Language' },
    ]);
    const service = { getSkillsForProfiles } as unknown as ProfileService;
    const loaders = new ProfileLoaders(service);

    const results = await Promise.all([loaders.skills.load('a'), loaders.skills.load('b')]);

    expect(getSkillsForProfiles).toHaveBeenCalledTimes(1);
    expect(getSkillsForProfiles).toHaveBeenCalledWith(['a', 'b']);
    expect(results[0].map((skill) => skill.id)).toEqual(['s1']);
    expect(results[1].map((skill) => skill.id)).toEqual(['s2']);
  });

  it('caches repeated loads within a request but not across requests', async () => {
    const getSkillsForProfiles = jest.fn().mockResolvedValue([]);
    const service = { getSkillsForProfiles } as unknown as ProfileService;
    const firstRequest = new ProfileLoaders(service);
    await firstRequest.skills.load('public');
    await firstRequest.skills.load('public');
    expect(getSkillsForProfiles).toHaveBeenCalledTimes(1);

    const secondRequest = new ProfileLoaders(service);
    await secondRequest.skills.load('public');
    expect(getSkillsForProfiles).toHaveBeenCalledTimes(2);
  });
});
