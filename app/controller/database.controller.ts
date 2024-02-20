import { verbose } from 'sqlite3';

import { initDatabase } from './database/init';

const sqlite3 = verbose();

/** Database instance. */
export const database = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE);
database.serialize();

console.log('-------------- Init database --------------');
initDatabase(database);
console.log('-------------- Database is ready ----------');
