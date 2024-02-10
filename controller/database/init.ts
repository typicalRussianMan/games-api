import { Database } from "sqlite3";
import { TABLES } from "./tables";

/** Init database. */
export function initDatabase(database: Database): void {
  console.log('-- Init tables');
  
  for (const tableSeed of TABLES) {
    database.run(tableSeed, err => {
      if (err) console.error(err);
    });
  }
}