import { selectGames, selectGamesCount } from '../controller/database/sql';
import { allAsync } from '../controller/database/utils/all-async';
import { runAsync } from '../controller/database/utils/run-async';
import { CountDb } from '../database-models/count.db';
import { GameDb } from '../database-models/game.db';
import { gameMapper } from '../mappers/game.mapper';

import { Address } from './address';
import { AppError } from './app-error';
import { Bounds } from './bounds';
import { CompanyLite } from './company-lite';
import { GameCategory } from './game-category';
import { PagedList } from './paged-list';
import { ServerResponseCode } from './server-response-code';

type SelectGameOptions = {

  /** Point. */
  readonly bounds: Bounds;

  /** Limit. */
  readonly limit?: number;

  /** Offset. */
  readonly offset?: number;
};

type AddressShort = Partial<Pick<Address, 'lat' | 'lng'>>;

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
    bounds,
  }: SelectGameOptions): Promise<PagedList<Game>> {
    const sql = `
      ${selectGames}
      WHERE
      json_extract(c.address, '$.lat')
        BETWEEN ${bounds.bottom} AND ${bounds.top}
        AND
      json_extract(c.address, '$.lng')
        BETWEEN ${bounds.left} AND ${bounds.right}
      GROUP BY g.id
      LIMIT ?
      OFFSET ?
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

  /**
   * Increments game's play count by 1.
   * @param gameId Game ID.
   */
  public static incrementPlayCount(gameId: number): Promise<void> {
    return runAsync(`UPDATE games SET play_count=play_count + 1 WHERE id=${gameId}`);
  }

  /**
   * Gets a game by his ID.
   * @param id ID.
   * @param location Location.
   */
  public static async getGameById(id: number, location: AddressShort): Promise<Game> {
    let sql = `
      ${selectGames}
      WHERE g.id=${id}
    `;

    if (location.lat !== undefined && location.lng !== undefined) {
      // Sorting by distance.
      sql += `
        ORDER BY sqrt(
          power(
            json_extract(c.address, '$.lat') - ${location.lat},
            2
          ) +
          power(
            json_extract(c.address, '$.lng') - ${location.lng},
            2
          )
        )
      `;
    }

    const [game] = await allAsync<GameDb>(sql);

    if (game === undefined) {
      throw new AppError(ServerResponseCode.NotFound, 'Cannot find the game with such id');
    }

    await this.incrementPlayCount(id);

    return gameMapper.toModel(game);
  }
}
