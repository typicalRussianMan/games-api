import { Database } from "sqlite3";
import { TABLES } from "./tables";
import { addUsers } from "./preload-data/users";
import { addGameCategories } from "./preload-data/game-categories";

/** Init database. */
export function initDatabase(database: Database): void {
  console.log('-- Init tables');

  for (const tableSeed of TABLES) {
    database.run(tableSeed, err => {
      if (err) console.error(err);
    });
  }

  console.log('-- Fulfil tables');

  addUsers(database);
  addGameCategories(database);
}