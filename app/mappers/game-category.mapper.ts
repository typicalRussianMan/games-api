import { GameCategoryDb } from '../database-models/game-category.db';
import { GameCategory } from '../models/game-category';

import { IMapperToModel } from './mapper';

/** Game category mapper. */
class GameCategoryMapper implements IMapperToModel<GameCategory, GameCategoryDb> {

  /** @inheritdoc */
  public toModel(data: GameCategoryDb): GameCategory {
    return new GameCategory({
      id: data.id,
      name: data.name,
    });
  }
}

/** Game category mapper instance. */
export const gameCategoryMapper = new GameCategoryMapper();
