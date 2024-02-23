import { database } from '../../database.controller';

/**
 * Runs SQL script async.
 * @param sql SQL script.
 * @param options Arguments.
 */
export function runAsync(sql: string, options?: unknown[]): Promise<void> {
  return new Promise((res, rej) => {
    const resultCallback = (err: Error | null): void => {
      if (err) {
        rej(err);
      } else {
        res();
      }
    };

    let args: Parameters<typeof database.run>;

    if (options !== undefined) {
      args = [sql, options, resultCallback];
    } else {
      args = [sql, resultCallback];
    }

    database.run(...args);
  });
}
