import { CompanyDb } from '../database-models/company.db';
import { GameCategoryDb } from '../database-models/game-category.db';
import { GameDb } from '../database-models/game.db';
import { Game } from '../models/game';

import { companyMapper } from './company.mapper';
import { gameCategoryMapper } from './game-category.mapper';

import { IMapperToModel } from './mapper';

/** Game mapper. */
class GameMapper implements IMapperToModel<Game, GameDb> {

  /** @inheritdoc */
  public toModel(data: GameDb): Game {
    const company = typeof data.company === 'string' ?
      JSON.parse(data.company) as CompanyDb :
      data.company;

    const category = typeof data.category === 'string' ?
      JSON.parse(data.category) as GameCategoryDb :
      data.category;

    return new Game({
      company: companyMapper.toModel(company),
      id: data.id,
      category: gameCategoryMapper.toModel(category),
      name: data.name,
      playCount: data.play_count,
      posterUrl: data.poster_url,
      previewUrl: data.preview_url,
    });
  }
}

/** Game mapper instance. */
export const gameMapper = new GameMapper();
