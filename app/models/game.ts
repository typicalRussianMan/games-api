import { selectGames, selectGamesCount } from '../controller/database/sql';
import { allAsync } from '../controller/database/utils/all-async';
import { CountDb } from '../database-models/count.db';
import { GameDb } from '../database-models/game.db';
import { gameMapper } from '../mappers/game.mapper';

import { CompanyLite } from './company-lite';
import { GameCategory } from './game-category';
import { MapPoint } from './map-point';
import { PagedList } from './paged-list';

type SelectGameOptions = {

  /** Point. */
  readonly point: MapPoint;

  /** Limit. */
  readonly limit?: number;

  /** Offset. */
  readonly offset?: number;

  /** Distance. */
  readonly distance?: number;
};

/** Game. */
export class Game {

  /** ID. */
  public readonly id: number;

  /** Name. */
  public readonly name: string;

  /** Company. */
  public readonly company: CompanyLite;

  /** Category. */
  public readonly category: GameCategory;

  /** Play count. */
  public readonly playCount: number;

  public constructor(data: Game) {
    this.company = data.company;
    this.id = data.id;
    this.name = data.name;
    this.category = data.category;
    this.playCount = data.playCount;
  }

  /**
   * Selects games.
   * @param param0 Configuration.
   */
  public static async selectGames({
    limit = 10,
    offset = 0,
  }: SelectGameOptions): Promise<PagedList<Game>> {
    const sql = `
      ${selectGames}
      LIMIT = ?
      OFFSET = ?
    `;

    const result = await allAsync<GameDb>(sql, [limit, offset]);
    const [{ count }] = await allAsync<CountDb>(selectGamesCount);

    return new PagedList({
      limit,
      items: result.map(gameMapper.toModel),
      offset,
      totalCount: count,
    });
  }
}
