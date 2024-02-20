import { database } from '../controller/database.controller';
import { GameCategoryDb } from '../database-models/game-category.db';
import { gameCategoryMapper } from '../mappers/game-category.mapper';

/** Game category. */
export class GameCategory {

  /** ID. */
  public readonly id: number;

  /** Name. */
  public readonly name: string;

  public constructor(data: GameCategory) {
    this.id = data.id;
    this.name = data.name;
  }

  /** Gets game categories from DB. */
  public static getAll(): Promise<readonly GameCategory[]> {
    return new Promise((res, rej) => {
      database.all<GameCategoryDb>('SELECT * from game_categories', (err: Error | null, data) => {
        if (err) {
          rej(err);
        }

        res(data.map(gameCategoryMapper.toModel));
      });
    });
  }
}
