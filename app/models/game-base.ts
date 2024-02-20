import { database } from '../controller/database.controller';
import { insertGame } from '../controller/database/sql';

/** Game base. */
export class GameBase {

  /** Name. */
  public readonly name: string;

  /** Company ID. */
  public readonly companyId: number;

  /** Category ID. */
  public readonly categoryId: number;

  public constructor(data: GameBase) {
    this.categoryId = data.categoryId;
    this.companyId = data.companyId;
    this.name = data.name;
  }

  /**
   * Adds new game to the database.
   * @param game Game.
   */
  public static addToDatabase(game: GameBase): Promise<void> {
    return new Promise((res, rej) => {
      database.run(
        insertGame,
        [game.name, game.companyId, game.categoryId],
        (err: Error | null) => {
          if (err) {
            rej(err);
          }

          res();
        },
      );
    });
  }
}
