import { Database } from 'sqlite3';

import { TABLES } from './tables';
import { addUsers } from './preload-data/users';
import { addGameCategories } from './preload-data/game-categories';

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
  addGameCategories(database);
}
