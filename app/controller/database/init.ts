import { Database } from 'sqlite3';

import { TABLES } from './tables';
import { addUsers } from './preload-data/users';
import { addGameCategories } from './preload-data/game-categories';

/**
 * Initializes database.
 * @param database Database instance.
 */
export function initDatabase(database: Database): void {
  console.log('-- Init tables');

  for (const tableSeed of TABLES) {
    database.run(tableSeed, err => {
      if (err) {
        console.error(err);
      }
    });
  }

  addUsers();
  addGameCategories(database);
}
