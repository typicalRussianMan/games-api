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
export function addGameCategories(db: Database): void {
  for (const category of GAME_CATEGORIES) {
    db.run(insertGameCategory, category);
  }
}
