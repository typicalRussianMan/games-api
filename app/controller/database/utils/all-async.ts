import { database } from '../../database.controller';

/**
 * Collects all results from database async.
 * @param sql SQL script.
 * @param options Arguments.
 */
export function allAsync<T>(sql: string, options?: unknown[]): Promise<readonly T[]> {
  return new Promise((res, rej) => {
    const resultCallback = (err: Error | null, data: T[]): void => {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    };

    let args: Parameters<typeof database.all>;

    if (options !== undefined) {
      args = [sql, options, resultCallback];
    } else {
      args = [sql, resultCallback];
    }

    database.all(...args);
  });
}
