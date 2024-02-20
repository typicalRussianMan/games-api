import { insertGameCategory } from '../sql';
import { database } from '../../database.controller';

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

/** Adds game categories to database. */
export async function addGameCategories(): Promise<void> {
  for (const category of GAME_CATEGORIES) {

    // eslint-disable-next-line no-await-in-loop
    await new Promise(res => {
      database.run(insertGameCategory, category, () => {
        res(undefined);
      });
    });
  }
}
