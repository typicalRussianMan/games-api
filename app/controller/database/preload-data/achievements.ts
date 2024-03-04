import { Achievement, AchievementType } from '../../../models/achievement';
import { User } from '../../../models/user';

/** Type to achievement. */
export const MAP_TYPE_TO_ACHIEVEMENT: Record<AchievementType, Achievement> = {
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

const falsyPromise = (): Promise<boolean> => new Promise(res => {
  res(false);
});

const trulyPromise = (): Promise<boolean> => new Promise(res => {
  res(true);
});

/** Conditions whether if can give achievement to the user. */
export const ACHIEVEMENT_CONDITION: Record<AchievementType, (user: User) => Promise<boolean>> = {
  [AchievementType.FirstTimeVisited]: trulyPromise,
  [AchievementType.BestUser1]: falsyPromise,
  [AchievementType.BestUser2]: falsyPromise,
  [AchievementType.BestUser3]: falsyPromise,
  async [AchievementType.Player1](user) {
    const stats = await User.getStatistic(user);
    return stats.gamesPlayed >= 1;
  },
  async [AchievementType.Player2](user) {
    const stats = await User.getStatistic(user);
    return stats.gamesPlayed >= 10;
  },
  async [AchievementType.Player3](user) {
    const stats = await User.getStatistic(user);
    return stats.gamesPlayed >= 100;
  },
};

/** Adds achievements to the database. */
export async function addAchievements(): Promise<void> {
  for (const key in MAP_TYPE_TO_ACHIEVEMENT) {
    // eslint-disable-next-line no-await-in-loop
    await Achievement.addToDatabase(MAP_TYPE_TO_ACHIEVEMENT[key as AchievementType]);
  }
}
