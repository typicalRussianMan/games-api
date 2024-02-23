import { insertGameCategory } from '../sql';
import { runAsync } from '../utils/run-async';

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
    await runAsync(insertGameCategory, category);
  }
}
