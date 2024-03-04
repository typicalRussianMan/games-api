import { TABLES } from './tables';
import { addUsers } from './preload-data/users';
import { addGameCategories } from './preload-data/game-categories';
import { addCompanies } from './preload-data/companies';
import { addGames } from './preload-data/games';
import { VIEWS } from './views';
import { runAsync } from './utils/run-async';
import { addAchievements } from './preload-data/achievements';

/**
 * Initializes database.
 * @param database Database instance.
 */
export async function initDatabase(): Promise<void> {
  console.log('-- Init tables');

  for (const tableSeed of TABLES) {
    runAsync(tableSeed).catch(console.error);
  }

  await addUsers();
  console.log('✓ Insert users');
  await addGameCategories();
  console.log('✓ Insert game categories');
  await addCompanies();
  console.log('✓ Insert companies');
  await addGames();
  console.log('✓ Insert mock users');
  await addAchievements();
  console.log('✓ Prepare achievements');
}

/**
 * Initializes views.
 */
export function initViews(): void {
  console.log('-- Init views');

  for (const view of VIEWS) {
    runAsync(view).catch(console.error);
  }
}
