/** Full calendar months between the start date and the end (or today). */
export function formatExperienceDuration(start: Date, end: Date | null, today = new Date()): string {
  const until = end ?? today;
  const months = Math.max(
    0,
    (until.getUTCFullYear() - start.getUTCFullYear()) * 12 +
      until.getUTCMonth() -
      start.getUTCMonth() -
      (until.getUTCDate() < start.getUTCDate() ? 1 : 0),
  );
  const years = Math.floor(months / 12);
  const remaining = months % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  if (remaining) parts.push(`${remaining} ${remaining === 1 ? 'month' : 'months'}`);
  return parts.join(', ') || 'Less than 1 month';
}
