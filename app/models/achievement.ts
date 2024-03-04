import { insertAchievement } from '../controller/database/sql';
import { runAsync } from '../controller/database/utils/run-async';

import { User } from './user';

/** Achievement type. */
export enum AchievementType {

  FirstTimeVisited = 'FirstTimeVisited',

  Player1 = 'Player1',
  Player2 = 'Player2',
  Player3 = 'Player3',

  BestUser1 = 'BestUser1',
  BestUser2 = 'BestUser2',
  BestUser3 = 'BestUser3',
}

/** Achievements. */
export const ACHIEVEMENTS: readonly AchievementType[] = [
  AchievementType.FirstTimeVisited,
  AchievementType.BestUser1,
  AchievementType.BestUser2,
  AchievementType.BestUser3,
  AchievementType.Player1,
  AchievementType.Player2,
  AchievementType.Player3,
];

/** Achievement. */
export class Achievement {

  /** ID. */
  public readonly id: number;

  /** Title. */
  public readonly title: string;

  /** */
  public readonly description: string;

  public constructor(data: Achievement) {
    this.description = data.description;
    this.id = data.id;
    this.title = data.title;
  }

  /**
   * Creates new achievement.
   * @param achievement Achievement.
   */
  public static addToDatabase(achievement: Achievement): Promise<void> {
    return runAsync(insertAchievement, [achievement.title, achievement.description]);
  }
}

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
