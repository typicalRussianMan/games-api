import { allAsync } from '../controller/database/utils/all-async';
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
  public static async getAll(): Promise<readonly GameCategory[]> {
    const result = await allAsync<GameCategoryDb>('SELECT * FROM game_categories');
    return result.map(gameCategoryMapper.toModel);
  }
}
