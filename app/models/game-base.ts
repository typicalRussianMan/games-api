import { insertGame } from '../controller/database/sql';
import { runAsync } from '../controller/database/utils/run-async';

/** Game base. */
export class GameBase {

  /** Name. */
  public readonly name: string;

  /** Company ID. */
  public readonly companyId: number;

  /** Category ID. */
  public readonly categoryId: number;

  /** Preview URL. */
  public readonly previewUrl: string;

  /** Poster URL. */
  public readonly posterUrl: string;

  public constructor(data: GameBase) {
    this.categoryId = data.categoryId;
    this.companyId = data.companyId;
    this.name = data.name;
    this.posterUrl = data.posterUrl;
    this.previewUrl = data.previewUrl;
  }

  /**
   * Adds new game to the database.
   * @param game Game.
   */
  public static addToDatabase(game: GameBase): Promise<void> {
    return runAsync(
      insertGame,
      [
        game.name,
        game.companyId,
        game.categoryId,
        game.previewUrl,
        game.posterUrl,
      ],
    );
  }
}
