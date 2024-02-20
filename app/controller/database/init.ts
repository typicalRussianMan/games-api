import { Database } from 'sqlite3';

import { TABLES } from './tables';
import { addUsers } from './preload-data/users';
import { addGameCategories } from './preload-data/game-categories';
import { addCompanies } from './preload-data/companies';
import { addGames } from './preload-data/games';
import { VIEWS } from './views';

/**
 * Initializes database.
 * @param database Database instance.
 */
export async function initDatabase(database: Database): Promise<void> {
  console.log('-- Init tables');

  for (const tableSeed of TABLES) {
    database.run(tableSeed, err => {
      if (err) {
        console.error(err);
      }
    });
  }

  await addUsers();
  console.log('✓ Insert users');
  await addGameCategories();
  console.log('✓ Insert game categories');
  await addCompanies();
  console.log('✓ Insert companies');
  await addGames();
  console.log('✓ Insert mock users');
}

/**
 * Initializes views.
 * @param database Database instance.
 */
export function initViews(database: Database): void {
  console.log('-- Init views');

  for (const view of VIEWS) {
    database.run(view, err => {
      if (err) {
        console.error(err);
      }
    });
  }
}
