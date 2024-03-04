import { ACHIEVEMENTS, Achievement, AchievementType, MAP_TYPE_TO_ACHIEVEMENT } from '../../../models/achievement';

/**
 * Achievement sorting function.
 * @param a Achievement type.
 * @param b Achievement type.
 */
function sortAchievements(a: AchievementType, b: AchievementType): number {
  return MAP_TYPE_TO_ACHIEVEMENT[a].id - MAP_TYPE_TO_ACHIEVEMENT[b].id;
}

/** Adds achievements to the database. */
export async function addAchievements(): Promise<void> {
  for (const achievement of [...ACHIEVEMENTS].sort(sortAchievements)) {
    // eslint-disable-next-line no-await-in-loop
    await Achievement.addToDatabase(MAP_TYPE_TO_ACHIEVEMENT[achievement]);
  }
}
