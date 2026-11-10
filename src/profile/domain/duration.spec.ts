import { formatExperienceDuration } from './duration';

describe('formatExperienceDuration', () => {
  it('returns a human-readable interval for a completed role', () => {
    expect(
      formatExperienceDuration(new Date('2022-01-01Z'), new Date('2024-04-01Z')),
    ).toBe('2 years, 3 months');
  });

  it('uses today for an ongoing role', () => {
    expect(
      formatExperienceDuration(new Date('2025-01-01Z'), null, new Date('2026-11-10Z')),
    ).toBe('1 year, 10 months');
  });

  it('handles a role that started this month', () => {
    expect(
      formatExperienceDuration(new Date('2026-11-05Z'), null, new Date('2026-11-10Z')),
    ).toBe('Less than 1 month');
  });
});
