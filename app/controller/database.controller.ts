import { verbose } from 'sqlite3';

import { initDatabase, initViews } from './database/init';
import { runAsync } from './database/utils/run-async';

const sqlite3 = verbose();

/** Database instance. */
export const database = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE);
database.serialize();

(async() => {
  console.log('-------------- Init database --------------');
  await initDatabase();
  initViews();
  console.log('-------------- Database is ready ----------');
  await runAsync('UPDATE games SET play_count=123 WHERE id=1');
  await runAsync('UPDATE games SET play_count=1565 WHERE id=2');
  await runAsync('UPDATE games SET play_count=182483 WHERE id=3');
  await runAsync('UPDATE games SET play_count=999999999 WHERE id=4');
})();
