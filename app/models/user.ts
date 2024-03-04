/* eslint-disable no-await-in-loop */
import { userMapper } from '../mappers/user.mapper';
import { UserDb } from '../database-models/user.db';
import { allAsync } from '../controller/database/utils/all-async';
import { runAsync } from '../controller/database/utils/run-async';
import { ACHIEVEMENT_CONDITION, MAP_TYPE_TO_ACHIEVEMENT } from '../controller/database/preload-data/achievements';
import { statisticMapper } from '../mappers/statistic.mapper';
import { StatisticDb } from '../database-models/statistic.db';
import { insertUserAchievement } from '../controller/database/sql';

import { UserBase } from './user-base';
import { ACHIEVEMENTS, Achievement, AchievementType } from './achievement';
import { Statistic } from './statistic';

/** User. */
export class User extends UserBase {

  /** ID. */
  public readonly id: number;

  public constructor(data: User) {
    super(data);
    this.id = data.id;
  }

  /**
   * Gets user by email.
   * @param email Email.
   */
  public static async getByEmail(email: string): Promise<User | null> {
    const result = await allAsync<UserDb>(`SELECT * from users WHERE email='${email}' LIMIT 1;`);

    const user = result[0];

    return user === undefined ?
      null :
      userMapper.toUser(user);
  }

  /**
   * Gets user by ID.
   * @param id ID.
   */
  public static async getById(id: number): Promise<User | null> {
    const result = await allAsync<UserDb>(`SELECT * from users where id='${id}' LIMIT 1;`);

    const user = result[0];

    return user === undefined ?
      null :
      userMapper.toUser(user);
  }

  /**
   * Increments play count.
   * @param user User.
   */
  public static incrementPlayedGamesCount(user: User): Promise<void> {
    return runAsync(`UPDATE statistics SET games_played = games_played + 1 WHERE user_id=${user.id}`);
  }

  /**
   * Gets statistic for user.
   * @param user User.
   */
  public static async getStatistic(user: User): Promise<Statistic> {
    const [statistic] = await allAsync<StatisticDb>(`SELECT * from statistics WHERE user_id=${user.id} LIMIT 1`);

    return statisticMapper.toModel(statistic);
  }

  /**
   * Checks if the user has on achievement.
   * @param user User.
   * @param achievementType Achievement.
   */
  public static async hasAchievement(user: User, achievementType: AchievementType): Promise<boolean> {
    const achievement = MAP_TYPE_TO_ACHIEVEMENT[achievementType];

    const [val] = await allAsync(`
      SELECT * FROM user_achievement
      WHERE achievement_id=${achievement.id} AND user_id=${user.id}
      LIMIT 1;
    `);

    return val !== undefined;
  }

  /**
   * Gives achievement to user.
   * @param user User.
   * @param achievementType Achievement type.
   */
  public static async giveAchievement(user: User, achievementType: AchievementType): Promise<void> {
    const achievement = MAP_TYPE_TO_ACHIEVEMENT[achievementType];
    await runAsync(insertUserAchievement, [achievement.id, user.id]);
  }

  /**
   * Checks user achievements.
   * @param user User.
   */
  public static async checkAchievements(user: User): Promise<readonly Achievement[]> {
    const newAchievements: Achievement[] = [];

    for (const achievementType of ACHIEVEMENTS) {
      const hasAchievement = await this.hasAchievement(user, achievementType);

      if (!hasAchievement) {
        const canCollect = await ACHIEVEMENT_CONDITION[achievementType](user);

        if (canCollect) {
          await this.giveAchievement(user, achievementType);
          newAchievements.push(MAP_TYPE_TO_ACHIEVEMENT[achievementType]);
        }
      }
    }

    return newAchievements;
  }
}
