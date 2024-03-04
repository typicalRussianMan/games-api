import { Achievement, AchievementType } from '../../../models/achievement';

const MAP_TYPE_TO_ACHIEVEMENT: Record<AchievementType, Achievement> = {
  [AchievementType.FirstTimeVisited]: new Achievement({
    description: 'Enter the app for the first time',
    id: 1,
    title: 'First Step',
  }),
  [AchievementType.Player1]: new Achievement({
    description: 'Play 1 game',
    id: 2,
    title: 'Player I',
  }),
  [AchievementType.Player2]: new Achievement({
    description: 'Play 10 games',
    id: 3,
    title: 'Player II',
  }),
  [AchievementType.Player3]: new Achievement({
    description: 'Play 100 games',
    id: 4,
    title: 'Player III',
  }),
  [AchievementType.BestUser1]: new Achievement({
    description: 'Visit this app for 1 day',
    id: 5,
    title: 'Best User I',
  }),
  [AchievementType.BestUser2]: new Achievement({
    description: 'Visit this app every day for 1 month',
    id: 6,
    title: 'Best User II',
  }),
  [AchievementType.BestUser3]: new Achievement({
    description: 'Visit this app every day for 1 year',
    id: 7,
    title: 'Best User III',
  }),
};

/** Adds achievements to the database. */
export async function addAchievements(): Promise<void> {
  for (const key in MAP_TYPE_TO_ACHIEVEMENT) {
    // eslint-disable-next-line no-await-in-loop
    await Achievement.addToDatabase(MAP_TYPE_TO_ACHIEVEMENT[key as AchievementType]);
  }
}
