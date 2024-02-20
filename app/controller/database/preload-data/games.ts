import { GameBase } from '../../../models/game-base';

const GAMES: readonly GameBase[] = [
  new GameBase({
    categoryId: 3,
    companyId: 0,
    name: 'Doodle Green',
  }),
  new GameBase({
    categoryId: 5,
    companyId: 0,
    name: 'Green House Game',
  }),
  new GameBase({
    categoryId: 1,
    companyId: 1,
    name: 'Benedict Game',
  }),
  new GameBase({
    categoryId: 10,
    companyId: 1,
    name: 'Catch Burger',
  }),
];

/** Adds games to the database. */
export async function addGames(): Promise<void> {
  for (const game of GAMES) {

    // eslint-disable-next-line no-await-in-loop
    await GameBase.addToDatabase(game);
  }
}
