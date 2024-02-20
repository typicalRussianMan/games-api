import { Database } from 'sqlite3';

import { TABLES } from './tables';
import { addUsers } from './preload-data/users';
import { addGameCategories } from './preload-data/game-categories';
import { addCompanies } from './preload-data/companies';
import { addGames } from './preload-data/games';

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
