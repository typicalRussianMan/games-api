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
  public static selectGames({
    limit = 10,
    offset = 0,
  }: SelectGameOptions): Promise<PagedList<Game>> {
    return new Promise(res => {
      res(new PagedList({
        items: [],
        limit,
        offset,
      }));
    });
  }
}
