import { verbose } from 'sqlite3';

import { initDatabase, initViews } from './database/init';

const sqlite3 = verbose();

/** Database instance. */
export const database = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE);
database.serialize();

(async() => {
  console.log('-------------- Init database --------------');
  await initDatabase(database);
  initViews(database);
  console.log('-------------- Database is ready ----------');
})();
