import { Database } from 'sqlite3';

import { insertGameCategory } from '../sql';

const GAME_CATEGORIES: string[][] = [
  ['Arcade'],
  ['Quiz'],
  ['Puzzles'],
  ['Racing'],
  ['Casino'],
  ['Casual'],
  ['Card'],
  ['Music'],
  ['Board games'],
  ['Training'],
  ['Adventure'],
  ['Role playing'],
  ['Simulator'],
  ['Word games'],
  ['Sports games'],
  ['Strategies'],
  ['Action'],
];

/**
 * Adds game categories to database.
 * @param db Database instance.
 */
export async function addGameCategories(db: Database): Promise<void> {
  for (const category of GAME_CATEGORIES) {

    // eslint-disable-next-line no-await-in-loop
    await new Promise(res => {
      db.run(insertGameCategory, category, () => {
        res(undefined);
      });
    });
  }
}
