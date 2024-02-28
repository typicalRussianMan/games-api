import { CompanyDb } from './company.db';
import { GameCategoryDb } from './game-category.db';

/** Game. */
export type GameDb = {

  /** Name. */
  readonly name: string;

  /** ID. */
  readonly id: number;

  /** Play count. */
  readonly play_count: number;

  /** Company. */
  readonly company: string | CompanyDb;

  /** Category. */
  readonly category: string | GameCategoryDb;

  /** Preview URL. */
  readonly preview_url: string;

  /** Poster URL. */
  readonly poster_url: string;
};
