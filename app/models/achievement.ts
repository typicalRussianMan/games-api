import { insertAchievement } from '../controller/database/sql';
import { runAsync } from '../controller/database/utils/run-async';

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
